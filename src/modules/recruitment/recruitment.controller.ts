import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecruitmentService } from './recruitment.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole, ApplicationStage } from '../../common/enums';
import { User } from '../auth/entities/user.entity';
import { CreateRequisitionDto, CreateApplicationDto } from './dto';

@ApiTags('Recruitment')
@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('requisitions')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER, UserRole.DEPARTMENT_HEAD)
  @ApiOperation({ summary: 'Create a new job requisition' })
  async createRequisition(@Body() dto: CreateRequisitionDto, @CurrentUser() user: User) {
    return this.recruitmentService.createRequisition(dto, user.id);
  }

  @Post('postings/:id/apply')
  @ApiOperation({ summary: 'Submit a job application (Public)' })
  async apply(@Param('id') postingId: string, @Body() dto: CreateApplicationDto) {
    return this.recruitmentService.applyToJob(postingId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('applications/:id/stage')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Move application to a different stage' })
  async updateStage(@Param('id') id: string, @Body('stage') stage: ApplicationStage) {
    return this.recruitmentService.updateStage(id, stage);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pipeline')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Get recruitment pipeline data' })
  async getPipeline() {
    return this.recruitmentService.getPipelineData();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('candidates')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Manually add a candidate' })
  async addCandidate(@Body() dto: any) {
    return this.recruitmentService.addCandidate(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('postings')
  @Roles(UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Get all job postings' })
  async getPostings() {
    return this.recruitmentService.getPostings();
  }
}
