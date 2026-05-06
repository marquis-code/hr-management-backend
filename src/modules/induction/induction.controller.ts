import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query,
  UseGuards, ParseUUIDPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InductionService } from './induction.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { User } from '../auth/entities/user.entity';
import {
  CreateInductionProgramDto, UpdateInductionProgramDto,
  SubmitModuleAssessmentDto, MarkLessonWatchedDto,
  AddModuleDto, AddLessonDto, AddQuestionDto
} from './dto/induction.dto';

@ApiTags('Induction')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('induction')
export class InductionController {
  constructor(private readonly inductionService: InductionService) {}

  // ──────────────────────────────────────────
  // ADMIN ENDPOINTS
  // ──────────────────────────────────────────

  @Post('programs')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Create induction program with optional nested modules/lessons/questions' })
  async createProgram(@Body() dto: CreateInductionProgramDto, @CurrentUser() user: User) {
    return this.inductionService.createProgram(dto, user.id);
  }

  @Get('programs')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'List all induction programs' })
  async findAllPrograms() {
    return this.inductionService.findAllPrograms();
  }

  @Get('programs/:id')
  @ApiOperation({ summary: 'Get induction program details' })
  async findProgram(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.findProgramById(id);
  }

  @Patch('programs/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Update induction program' })
  async updateProgram(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateInductionProgramDto) {
    return this.inductionService.updateProgram(id, dto);
  }

  @Patch('programs/:id/publish')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Publish an induction program' })
  async publishProgram(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.publishProgram(id);
  }

  @Delete('programs/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Delete an induction program' })
  async deleteProgram(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.deleteProgram(id);
  }

  // Module management
  @Post('programs/:programId/modules')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Add module to program' })
  async addModule(@Param('programId', ParseUUIDPipe) programId: string, @Body() dto: AddModuleDto) {
    return this.inductionService.addModule(programId, dto);
  }

  @Delete('modules/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Delete a module' })
  async deleteModule(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.deleteModule(id);
  }

  // Lesson management
  @Post('modules/:moduleId/lessons')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Add lesson to module' })
  async addLesson(@Param('moduleId', ParseUUIDPipe) moduleId: string, @Body() dto: AddLessonDto) {
    return this.inductionService.addLesson(moduleId, dto);
  }

  @Delete('lessons/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Delete a lesson' })
  async deleteLesson(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.deleteLesson(id);
  }

  // Question management
  @Post('modules/:moduleId/questions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Add question to module' })
  async addQuestion(@Param('moduleId', ParseUUIDPipe) moduleId: string, @Body() dto: AddQuestionDto) {
    return this.inductionService.addQuestion(moduleId, dto);
  }

  @Delete('questions/:id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Delete a question' })
  async deleteQuestion(@Param('id', ParseUUIDPipe) id: string) {
    return this.inductionService.deleteQuestion(id);
  }

  // Enrollment
  @Post('enroll')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Manually enroll an employee into an induction program' })
  async enrollEmployee(@Body() body: { employeeId: string; programId: string }) {
    return this.inductionService.enrollEmployee(body.employeeId, body.programId);
  }

  @Get('dashboard')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Get induction enrollment dashboard for all employees' })
  async getDashboard() {
    return this.inductionService.getEnrollmentDashboard();
  }

  // ──────────────────────────────────────────
  // EMPLOYEE ENDPOINTS
  // ──────────────────────────────────────────

  @Get('my-induction')
  @ApiOperation({ summary: 'Get current employee induction program and progress' })
  async getMyInduction(@CurrentUser() user: User) {
    // The user's employee record is linked via userId
    return this.inductionService.getMyInduction(user.employeeId || user.id);
  }

  @Post('mark-watched')
  @ApiOperation({ summary: 'Mark a lesson as watched' })
  async markLessonWatched(@CurrentUser() user: User, @Body() dto: MarkLessonWatchedDto) {
    return this.inductionService.markLessonWatched(user.employeeId || user.id, dto);
  }

  @Post('submit-assessment')
  @ApiOperation({ summary: 'Submit answers for a module assessment' })
  async submitAssessment(@CurrentUser() user: User, @Body() dto: SubmitModuleAssessmentDto) {
    return this.inductionService.submitModuleAssessment(user.employeeId || user.id, dto);
  }
}
