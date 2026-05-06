import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { User } from '../auth/entities/user.entity';

@ApiTags('Performance Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get('goals/my')
  @ApiOperation({ summary: 'Get current user goals' })
  async getMyGoals(@CurrentUser() user: User) {
    if (!user.employeeId) return [];
    return this.performanceService.getMyGoals(user.employeeId);
  }

  @Post('goals')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER, UserRole.DEPARTMENT_HEAD)
  @ApiOperation({ summary: 'Create a new performance goal' })
  async createGoal(@Body() dto: any, @CurrentUser() user: User) {
    return this.performanceService.createGoal(dto.employeeId, dto, user.id);
  }

  @Patch('goals/:id/progress')
  @ApiOperation({ summary: 'Update goal progress' })
  async updateProgress(@Param('id') id: string, @Body('currentValue') value: number) {
    return this.performanceService.updateGoalProgress(id, value);
  }
}
