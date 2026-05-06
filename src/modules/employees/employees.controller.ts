import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles, CurrentUser } from '../../common/decorators';
import { UserRole } from '../../common/enums';
import { CreateEmployeeDto, UpdateEmployeeDto, CreateDepartmentDto, CreatePositionDto } from './dto';
import { User } from '../auth/entities/user.entity';

@ApiTags('Employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('subsidiaries')
  @ApiOperation({ summary: 'List all subsidiaries/entities' })
  async findAllSubsidiaries() {
    return this.employeesService.findAllSubsidiaries();
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'List all employees with pagination and filtering' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.employeesService.findAll(paginationDto);
  }

  @Get('org-chart')
  @ApiOperation({ summary: 'Get hierarchical organizational chart' })
  async getOrgChart() {
    return this.employeesService.getOrgChart();
  }


  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Create new employee' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @CurrentUser() user: User) {
    return this.employeesService.create(createEmployeeDto, user.id);
  }

  // Department Endpoints
  @Get('departments')
  @ApiOperation({ summary: 'List all departments' })
  async findAllDepartments() {
    return this.employeesService.findAllDepartments();
  }

  @Post('departments')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Create new department' })
  async createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.employeesService.createDepartment(dto);
  }

  // Position Endpoints
  @Get('positions')
  @ApiOperation({ summary: 'List all positions' })
  async findAllPositions() {
    return this.employeesService.findAllPositions();
  }

  @Post('positions')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Create new position' })
  async createPosition(@Body() dto: CreatePositionDto) {
    return this.employeesService.createPosition(dto);
  }

  // Bulk Import Endpoints
  @Post('bulk-import')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk import employees from CSV data' })
  async bulkImportEmployees(@Body() body: { records: any[] }, @CurrentUser() user: User) {
    return this.employeesService.bulkCreateEmployees(body.records, user.id);
  }

  @Post('departments/bulk-import')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk import departments from CSV data' })
  async bulkImportDepartments(@Body() body: { records: any[] }) {
    return this.employeesService.bulkCreateDepartments(body.records);
  }

  @Post('positions/bulk-import')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Bulk import positions from CSV data' })
  async bulkImportPositions(@Body() body: { records: any[] }) {
    return this.employeesService.bulkCreatePositions(body.records);
  }

  // Export Endpoints
  @Get('export')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Export all employees as JSON for CSV generation' })
  async exportEmployees() {
    return this.employeesService.findAll({ page: 1, limit: 10000 });
  }

  @Get('departments/export')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Export all departments' })
  async exportDepartments() {
    return this.employeesService.findAllDepartments();
  }

  @Get('positions/export')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN)
  @ApiOperation({ summary: 'Export all positions' })
  async exportPositions() {
    return this.employeesService.findAllPositions();
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Get employee profile' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.findOne(id);
  }
}
