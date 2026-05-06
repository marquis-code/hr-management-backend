import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType, LeaveBalance, LeaveRequest, LeaveApprovalFlow } from './entities';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { PublicHoliday } from '../attendance/entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeaveType, 
      LeaveBalance, 
      LeaveRequest, 
      LeaveApprovalFlow,
      PublicHoliday
    ])
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
  exports: [LeaveService],
})
export class LeaveModule {}
