import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    private configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: any): Promise<{
        permissions: string[];
        id: string;
        email: string;
        passwordHash: string;
        systemRole: import("../../../common/enums").UserRole;
        roleId: string;
        role: import("../entities").Role;
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
    }>;
}
export {};
