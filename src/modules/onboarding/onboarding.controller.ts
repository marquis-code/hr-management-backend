import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole, OnboardingTaskStatus } from '../../common/enums';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Patch('tasks/:id/status')
  @ApiOperation({ summary: 'Update the status of an onboarding task' })
  async updateTask(@Param('id') id: string, @Body('status') status: OnboardingTaskStatus) {
    return this.onboardingService.updateTaskStatus(id, status);
  }
}
