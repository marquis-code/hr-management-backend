import { User } from '../../auth/entities/user.entity';
export declare enum NotificationType {
    SYSTEM = "SYSTEM",
    LEAVE_REQUEST = "LEAVE_REQUEST",
    PAYROLL = "PAYROLL",
    RECRUITMENT = "RECRUITMENT",
    PERFORMANCE = "PERFORMANCE"
}
export declare class Notification {
    id: string;
    userId: string;
    user: User;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    metadata: any;
    createdAt: Date;
}
