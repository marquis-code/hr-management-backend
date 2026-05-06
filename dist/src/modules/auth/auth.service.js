"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const speakeasy = __importStar(require("speakeasy"));
const QRCode = __importStar(require("qrcode"));
const entities_1 = require("./entities");
const enums_1 = require("../../common/enums");
const notifications_service_1 = require("../notifications/notifications.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    userRepository;
    auditLogRepository;
    jwtService;
    configService;
    notificationsService;
    constructor(userRepository, auditLogRepository, jwtService, configService, notificationsService) {
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.notificationsService = notificationsService;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    async comparePasswords(password, hash) {
        return bcrypt.compare(password, hash);
    }
    async createAuditLog(userId, action, entity, entityId, previousValue = null, newValue = null, ipAddress, userAgent) {
        const log = this.auditLogRepository.create({
            userId,
            action,
            entity,
            entityId,
            previousValue,
            newValue,
            ipAddress,
            userAgent,
        });
        return this.auditLogRepository.save(log);
    }
    async generateTokens(user) {
        const permissions = user.role?.permissions?.map(p => p.name) || [];
        const payload = { sub: user.id, email: user.email, role: user.systemRole, permissions };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('jwt.refreshSecret'),
            expiresIn: this.configService.get('jwt.refreshTokenTtl'),
        });
        user.refreshToken = await this.hashPassword(refreshToken);
        await this.userRepository.save(user);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.systemRole,
                employeeId: user.employeeId,
                permissions,
            },
        };
    }
    async register(registerDto) {
        const { email, password, role } = registerDto;
        const userCount = await this.userRepository.count();
        const finalRole = userCount === 0 ? enums_1.UserRole.SUPER_ADMIN : (role || enums_1.UserRole.EMPLOYEE);
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const passwordHash = await this.hashPassword(password);
        const user = this.userRepository.create({
            email,
            passwordHash,
            systemRole: finalRole,
        });
        const savedUser = await this.userRepository.save(user);
        await this.createAuditLog(savedUser.id, 'REGISTER', 'User', savedUser.id, null, { email, role: finalRole });
        return this.generateTokens(savedUser);
    }
    async login(loginDto, ip, userAgent) {
        const { email, password, twoFactorCode } = loginDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw new common_1.UnauthorizedException(`Account is locked. Try again after ${user.lockedUntil.toLocaleTimeString()}`);
        }
        const isPasswordValid = await this.comparePasswords(password, user.passwordHash);
        if (!isPasswordValid) {
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= 5) {
                user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
            }
            await this.userRepository.save(user);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.isTwoFactorEnabled) {
            if (!twoFactorCode) {
                return { requires2FA: true, userId: user.id };
            }
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: twoFactorCode,
            });
            if (!verified) {
                throw new common_1.UnauthorizedException('Invalid 2FA code');
            }
        }
        user.failedLoginAttempts = 0;
        user.lockedUntil = null;
        user.lastLoginAt = new Date();
        await this.userRepository.save(user);
        await this.createAuditLog(user.id, 'LOGIN', 'User', user.id, null, null, ip, userAgent);
        return this.generateTokens(user);
    }
    async refreshTokens(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('jwt.refreshSecret'),
            });
            const user = await this.userRepository.findOne({ where: { id: payload.sub } });
            if (!user || !user.refreshToken) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const isTokenMatch = await this.comparePasswords(refreshToken, user.refreshToken);
            if (!isTokenMatch) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            return this.generateTokens(user);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async setup2FA(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const secret = speakeasy.generateSecret({ name: `CapitalField HR (${user.email})` });
        user.twoFactorSecret = secret.base32;
        await this.userRepository.save(user);
        const qrCode = await QRCode.toDataURL(secret.otpauth_url);
        return { qrCode, secret: secret.base32 };
    }
    async verifyAndEnable2FA(userId, token) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
        });
        if (!verified)
            throw new common_1.UnauthorizedException('Invalid verification token');
        user.isTwoFactorEnabled = true;
        await this.userRepository.save(user);
        return { success: true };
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { success: true, message: 'If an account exists with this email, a reset link has been sent.' };
        }
        const resetToken = (0, uuid_1.v4)();
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 3600000);
        await this.userRepository.save(user);
        const resetUrl = `${this.configService.get('frontendUrl')}/auth/reset-password?token=${resetToken}`;
        await this.notificationsService.create({
            userId: user.id,
            title: 'Password Reset Request',
            message: `You requested a password reset. Click here to reset: ${resetUrl}`,
            sendEmail: true,
            emailSubject: 'Password Reset Request - Capital Field HR',
        });
        return { success: true, message: 'Reset link sent to your email.' };
    }
    async resetPassword(resetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        const user = await this.userRepository.findOne({
            where: {
                passwordResetToken: token,
            },
        });
        if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        user.passwordHash = await this.hashPassword(newPassword);
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await this.userRepository.save(user);
        await this.notificationsService.create({
            userId: user.id,
            title: 'Password Reset Successful',
            message: 'Your password has been successfully reset.',
            sendEmail: true,
        });
        return { success: true, message: 'Password reset successful.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        notifications_service_1.NotificationsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map