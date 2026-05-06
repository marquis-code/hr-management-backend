import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Notification, NotificationType } from './entities/notification.entity';
import { User } from '../auth/entities/user.entity';
import { NotificationsGateway } from './notifications.gateway';
export declare class NotificationsService {
    private readonly notificationRepository;
    private readonly userRepository;
    private readonly configService;
    private readonly gateway;
    private readonly logger;
    private resend;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>, configService: ConfigService, gateway: NotificationsGateway);
    create(payload: {
        userId: string;
        title: string;
        message: string;
        type?: NotificationType;
        metadata?: any;
        sendEmail?: boolean;
        emailSubject?: string;
    }): Promise<Notification>;
    notifyAdmins(payload: {
        title: string;
        message: string;
        type?: NotificationType;
        metadata?: any;
    }): Promise<void>;
    findAll(userId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<{
        success: boolean;
    }>;
}
