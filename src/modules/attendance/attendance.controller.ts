import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';
import { User } from '../auth/entities/user.entity';
import { CheckInDto } from '../leave/dto/leave.dto';

@ApiTags('Attendance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @ApiOperation({ summary: 'Clock in for the day' })
  async checkIn(@CurrentUser() user: User, @Body() dto: CheckInDto) {
    if (!user.employeeId) throw new Error('User not linked to employee');
    return this.attendanceService.checkIn(user.employeeId, dto);
  }

  @Post('check-out')
  @ApiOperation({ summary: 'Clock out for the day' })
  async checkOut(@CurrentUser() user: User, @Body() dto: any) {
    if (!user.employeeId) throw new Error('User not linked to employee');
    return this.attendanceService.checkOut(user.employeeId, dto.location);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my attendance history' })
  async getMyRecords(@CurrentUser() user: User) {
    if (!user.employeeId) return [];
    return this.attendanceService.getMyRecords(user.employeeId);
  }
}
