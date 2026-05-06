import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { Notification, NotificationType } from './entities/notification.entity';
import { User } from '../auth/entities/user.entity';
import { UserRole } from '../../common/enums';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private resend: Resend;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly gateway: NotificationsGateway,
  ) {
    const apiKey = this.configService.get<string>('email.resendApiKey');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn('Resend API key missing. Email notifications will not be sent.');
    }
  }

  async create(payload: {
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
    metadata?: any;
    sendEmail?: boolean;
    emailSubject?: string;
  }) {
    const { userId, title, message, type, metadata, sendEmail, emailSubject } = payload;

    const notification = this.notificationRepository.create({
      userId,
      title,
      message,
      type: type || NotificationType.SYSTEM,
      metadata,
    });
    await this.notificationRepository.save(notification);

    this.gateway.sendToUser(userId, 'notification', notification);

    if (sendEmail && this.resend) {
      try {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user && user.email) {
          await this.resend.emails.send({
            from: this.configService.get<string>('email.from') || 'HRMS <notifications@hrms.com>',
            to: user.email,
            subject: emailSubject || title,
            html: `<h3>${title}</h3><p>${message}</p>`,
          });
        }
      } catch (error) {
        this.logger.error(`Failed to send email to user ${userId}: ${error.message}`);
      }
    }

    return notification;
  }

  async notifyAdmins(payload: {
    title: string;
    message: string;
    type?: NotificationType;
    metadata?: any;
  }) {
    const admins = await this.userRepository.find({
      where: [
        { systemRole: UserRole.SUPER_ADMIN },
        { systemRole: UserRole.HR_ADMIN }
      ]
    });

    for (const admin of admins) {
      await this.create({
        userId: admin.id,
        ...payload,
      });
    }
  }

  async findAll(userId: string) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' as any },
    });
  }

  async markAsRead(id: string) {
    await this.notificationRepository.update(id, { isRead: true });
    return { success: true };
  }
}
