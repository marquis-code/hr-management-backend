"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resend_1 = require("resend");
const config_1 = require("@nestjs/config");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const enums_1 = require("../../common/enums");
const notifications_gateway_1 = require("./notifications.gateway");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    notificationRepository;
    userRepository;
    configService;
    gateway;
    logger = new common_1.Logger(NotificationsService_1.name);
    resend;
    constructor(notificationRepository, userRepository, configService, gateway) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.configService = configService;
        this.gateway = gateway;
        const apiKey = this.configService.get('email.resendApiKey');
        if (apiKey) {
            this.resend = new resend_1.Resend(apiKey);
        }
        else {
            this.logger.warn('Resend API key missing. Email notifications will not be sent.');
        }
    }
    async create(payload) {
        const { userId, title, message, type, metadata, sendEmail, emailSubject } = payload;
        const notification = this.notificationRepository.create({
            userId,
            title,
            message,
            type: type || notification_entity_1.NotificationType.SYSTEM,
            metadata,
        });
        await this.notificationRepository.save(notification);
        this.gateway.sendToUser(userId, 'notification', notification);
        if (sendEmail && this.resend) {
            try {
                const user = await this.userRepository.findOne({ where: { id: userId } });
                if (user && user.email) {
                    await this.resend.emails.send({
                        from: this.configService.get('email.from') || 'HRMS <notifications@hrms.com>',
                        to: user.email,
                        subject: emailSubject || title,
                        html: `<h3>${title}</h3><p>${message}</p>`,
                    });
                }
            }
            catch (error) {
                this.logger.error(`Failed to send email to user ${userId}: ${error.message}`);
            }
        }
        return notification;
    }
    async notifyAdmins(payload) {
        const admins = await this.userRepository.find({
            where: [
                { systemRole: enums_1.UserRole.SUPER_ADMIN },
                { systemRole: enums_1.UserRole.HR_ADMIN }
            ]
        });
        for (const admin of admins) {
            await this.create({
                userId: admin.id,
                ...payload,
            });
        }
    }
    async findAll(userId) {
        return this.notificationRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async markAsRead(id) {
        await this.notificationRepository.update(id, { isRead: true });
        return { success: true };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map