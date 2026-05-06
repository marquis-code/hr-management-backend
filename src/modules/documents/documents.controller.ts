import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { User } from '../auth/entities/user.entity';

@ApiTags('Document Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('my')
  @ApiOperation({ summary: 'Get documents belonging to the current user' })
  async getMyDocuments(@CurrentUser() user: User) {
    if (!user.employeeId) return [];
    return this.documentsService.getMyDocuments(user.employeeId);
  }

  @Post('policies/:id/acknowledge')
  @ApiOperation({ summary: 'Acknowledge a policy' })
  async acknowledge(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body('signature') signature: string,
    @Req() req: Request
  ) {
    if (!user.employeeId) throw new BadRequestException('User not linked to employee');
    return this.documentsService.acknowledgePolicy(id, user.employeeId, signature, req.ip || '');
  }

  @Post('policies/:id/publish')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Publish a draft policy' })
  async publish(@Param('id') id: string, @CurrentUser() user: User) {
    return this.documentsService.publishPolicy(id, user.id);
  }
}
