import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('jwt.secret') || 'default-secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    const user = await this.userRepository.findOne({ 
      where: { id, isActive: true },
      relations: ['role', 'role.permissions']
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      permissions: user.role?.permissions?.map(p => p.name) || []
    };
  }
}
