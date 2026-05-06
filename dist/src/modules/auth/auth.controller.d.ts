import type { Request } from 'express';
import { AuthService } from './auth.service';
import { UserRole } from '../../common/enums';
import { User } from './entities/user.entity';
import { RegisterDto, LoginDto, RefreshTokenDto, TwoFactorVerifyDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginDto: LoginDto, req: Request): Promise<{
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
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
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
    setup2FA(user: User): Promise<{
        qrCode: string;
        secret: any;
    }>;
    verify2FA(user: User, verifyDto: TwoFactorVerifyDto): Promise<{
        success: boolean;
    }>;
    getMe(user: User): Promise<User>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
