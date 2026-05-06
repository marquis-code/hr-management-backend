import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enums';

@ApiTags('System Administration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get global system metrics' })
  async getStats() {
    return this.adminService.getGlobalStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'Manage all platform users' })
  async getUsers() {
    return this.adminService.getAllUsers();
  }

  @Patch('users/:id/toggle')
  @ApiOperation({ summary: 'Enable or disable a user account' })
  async toggleUser(@Param('id') id: string) {
    return this.adminService.toggleUserStatus(id);
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Explore system-wide audit logs' })
  async getLogs(@Query() query: any) {
    return this.adminService.getAuditLogs(query);
  }

  // Role & Permission Management
  @Get('roles')
  @ApiOperation({ summary: 'List all roles' })
  async getRoles() {
    return this.adminService.getRoles();
  }

  @Post('roles')
  @ApiOperation({ summary: 'Create a new role' })
  async createRole(@Body() data: any) {
    return this.adminService.createRole(data);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Update a role' })
  async updateRole(@Param('id') id: string, @Body() data: any) {
    return this.adminService.updateRole(id, data);
  }

  @Get('permissions')
  @ApiOperation({ summary: 'List all permissions' })
  async getPermissions() {
    return this.adminService.getPermissions();
  }

  @Post('permissions')
  @ApiOperation({ summary: 'Create a new permission' })
  async createPermission(@Body() data: any) {
    return this.adminService.createPermission(data);
  }

  @Post('roles/:id/assign-permissions')
  @ApiOperation({ summary: 'Assign permissions to a role' })
  async assignPermissions(@Param('id') id: string, @Body() body: { permissionIds: string[] }) {
    return this.adminService.assignPermissionsToRole(id, body.permissionIds);
  }

  @Post('users/:id/assign-role')
  @ApiOperation({ summary: 'Assign a role to a user' })
  async assignRole(@Param('id') id: string, @Body() body: { roleId: string }) {
    return this.adminService.assignRoleToUser(id, body.roleId);
  }
}
