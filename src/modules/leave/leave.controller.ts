import { Controller, Get, Post, Body, Patch, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveService } from './leave.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { User } from '../auth/entities/user.entity';
import { CreateLeaveRequestDto, LeaveActionDto } from './dto';

@ApiTags('Leave Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get('balances')
  @ApiOperation({ summary: 'Get my leave balances' })
  async getMyBalances(@CurrentUser() user: User) {
    if (!user.employeeId) return [];
    return this.leaveService.getBalances(user.employeeId);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get leave requests' })
  async getRequests(@CurrentUser() user: User) {
    return this.leaveService.getRequests(user);
  }

  @Post('requests')
  @ApiOperation({ summary: 'Submit a new leave request' })
  async submit(@CurrentUser() user: User, @Body() dto: CreateLeaveRequestDto) {
    if (!user.employeeId) throw new BadRequestException('User is not linked to an employee');
    return this.leaveService.submitRequest(user.employeeId, dto);
  }

  @Patch('requests/:id/action')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Approve or reject a leave request' })
  async handleAction(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: LeaveActionDto
  ) {
    return this.leaveService.handleAction(id, user.id, dto);
  }
}
