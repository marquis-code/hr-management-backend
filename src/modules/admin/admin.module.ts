import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User, AuditLog, Role, Permission } from '../auth/entities';
import { Subsidiary } from '../employees/entities/subsidiary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuditLog, Subsidiary, Role, Permission]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
