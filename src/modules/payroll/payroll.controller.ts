import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { User } from '../auth/entities/user.entity';
import { ProcessPayrollDto } from './dto';

@ApiTags('Payroll Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}
  
  @Post('initiate')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Initiate a new payroll period' })
  async initiate(@Body() dto: { subsidiaryId: string; month: string; year: number; cycle: string }, @CurrentUser() user: User) {
    return this.payrollService.initiatePeriod(dto, user.id);
  }

  @Get('periods')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'List all payroll periods' })
  async getPeriods() {
    return this.payrollService.getPeriods();
  }

  @Get('periods/:id/entries')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'List all entries for a specific payroll period' })
  async getEntries(@Param('id') id: string) {
    return this.payrollService.getEntries(id);
  }

  @Post('process')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Trigger payroll processing for a period' })
  async process(@Body() dto: ProcessPayrollDto, @CurrentUser() user: User) {
    return this.payrollService.processPayroll(dto.periodId, user.id);
  }

  // Bulk Imports
  @Post('salary-grades/bulk-import')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk import salary grades' })
  async bulkImportSalaryGrades(@Body() body: { records: any[] }) {
    return this.payrollService.bulkCreateSalaryGrades(body.records);
  }

  @Post('tax-brackets/bulk-import')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk import tax brackets' })
  async bulkImportTaxBrackets(@Body() body: { records: any[] }) {
    return this.payrollService.bulkCreateTaxBrackets(body.records);
  }

  // Exports
  @Get('salary-grades/export')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Export all salary grades' })
  async exportSalaryGrades() {
    // Assuming a method exists or use generic repository find
    return this.payrollService.getSalaryGrades();
  }

  @Get('tax-brackets/export')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Export all tax brackets' })
  async exportTaxBrackets() {
    return this.payrollService.getTaxBrackets();
  }
}
