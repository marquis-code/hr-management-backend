import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, AuditLog } from './entities';
import { UserRole } from '../../common/enums';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AuthService {
    private userRepository;
    private auditLogRepository;
    private jwtService;
    private configService;
    private notificationsService;
    constructor(userRepository: Repository<User>, auditLogRepository: Repository<AuditLog>, jwtService: JwtService, configService: ConfigService, notificationsService: NotificationsService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hash: string): Promise<boolean>;
    createAuditLog(userId: string, action: string, entity: string, entityId: string, previousValue?: any, newValue?: any, ipAddress?: string | null, userAgent?: string | null): Promise<AuditLog>;
    generateTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            employeeId: string;
            permissions: string[];
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            employeeId: string;
            permissions: string[];
        };
    }>;
    login(loginDto: LoginDto, ip: string, userAgent: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            employeeId: string;
            permissions: string[];
        };
    } | {
        requires2FA: boolean;
        userId: string;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: UserRole;
            employeeId: string;
            permissions: string[];
        };
    }>;
    setup2FA(userId: string): Promise<{
        qrCode: string;
        secret: any;
    }>;
    verifyAndEnable2FA(userId: string, token: string): Promise<{
        success: boolean;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
