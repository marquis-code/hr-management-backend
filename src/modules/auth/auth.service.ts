import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { User, AuditLog } from './entities';
import { UserRole } from '../../common/enums';
import { RegisterDto, LoginDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { NotificationsService } from '../notifications/notifications.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private notificationsService: NotificationsService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createAuditLog(
    userId: string,
    action: string,
    entity: string,
    entityId: string,
    previousValue: any = null,
    newValue: any = null,
    ipAddress?: string | null,
    userAgent?: string | null,
  ) {
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

  async generateTokens(user: User) {
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

  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;
    
    // Check if first user (SUPER_ADMIN)
    const userCount = await this.userRepository.count();
    const finalRole = userCount === 0 ? UserRole.SUPER_ADMIN : (role || UserRole.EMPLOYEE);
    
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
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

  async login(loginDto: LoginDto, ip: string, userAgent: string) {
    const { email, password, twoFactorCode } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check account lock
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException(`Account is locked. Try again after ${user.lockedUntil.toLocaleTimeString()}`);
    }

    const isPasswordValid = await this.comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 mins lock
      }
      await this.userRepository.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check 2FA
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
        throw new UnauthorizedException('Invalid 2FA code');
      }
    }

    // Reset login status
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    await this.createAuditLog(user.id, 'LOGIN', 'User', user.id, null, null, ip, userAgent);

    return this.generateTokens(user);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('jwt.refreshSecret'),
      });
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isTokenMatch = await this.comparePasswords(refreshToken, user.refreshToken);
      if (!isTokenMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async setup2FA(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const secret = speakeasy.generateSecret({ name: `CapitalField HR (${user.email})` });
    user.twoFactorSecret = secret.base32;
    await this.userRepository.save(user);

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);
    return { qrCode, secret: secret.base32 };
  }

  async verifyAndEnable2FA(userId: string, token: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
    });

    if (!verified) throw new UnauthorizedException('Invalid verification token');

    user.isTwoFactorEnabled = true;
    await this.userRepository.save(user);
    return { success: true };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // For security reasons, don't reveal if user exists
      return { success: true, message: 'If an account exists with this email, a reset link has been sent.' };
    }

    const resetToken = uuidv4();
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
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

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findOne({
      where: {
        passwordResetToken: token,
      },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
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
}
