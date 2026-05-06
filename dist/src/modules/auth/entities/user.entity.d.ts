import { UserRole } from '../../../common/enums';
import { Role } from './role.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    systemRole: UserRole;
    roleId: string;
    role: Role;
    isActive: boolean;
    lastLoginAt: Date;
    refreshToken: string | null;
    twoFactorSecret: string;
    isTwoFactorEnabled: boolean;
    employeeId: string;
    failedLoginAttempts: number;
    lockedUntil: Date | null;
    passwordResetToken: string | null;
    passwordResetExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
