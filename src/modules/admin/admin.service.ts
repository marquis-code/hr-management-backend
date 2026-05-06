import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, AuditLog, Role, Permission } from '../auth/entities';
import { Subsidiary } from '../employees/entities/subsidiary.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    @InjectRepository(Subsidiary)
    private subsidiaryRepository: Repository<Subsidiary>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async getGlobalStats() {
    const totalUsers = await this.userRepository.count();
    const totalSubsidiaries = await this.subsidiaryRepository.count();
    const employeeCount = await this.userRepository.manager.count('employees');
    const departmentCount = await this.userRepository.manager.count('departments');
    const positionCount = await this.userRepository.manager.count('positions');
    const auditCount = await this.auditLogRepository.count();

    return {
      totalUsers,
      totalSubsidiaries,
      employeeCount,
      departmentCount,
      positionCount,
      auditCount,
      systemStatus: 'HEALTHY',
    };
  }

  async getAllUsers() {
    return this.userRepository.find({
      select: ['id', 'email', 'systemRole', 'isActive', 'lastLoginAt'],
      relations: ['role']
    });
  }

  async toggleUserStatus(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.isActive = !user.isActive;
    return this.userRepository.save(user);
  }

  async getAuditLogs(params: any) {
    const { skip = 0, take = 50 } = params;
    return this.auditLogRepository.find({
      skip,
      take,
      order: { timestamp: 'DESC' } as any,
    });
  }

  // Role Management
  async getRoles() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async createRole(data: any) {
    const role = this.roleRepository.create(data);
    return this.roleRepository.save(role);
  }

  async updateRole(id: string, data: any) {
    await this.roleRepository.update(id, data);
    return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
  }

  async deleteRole(id: string) {
    return this.roleRepository.delete(id);
  }

  // Permission Management
  async getPermissions() {
    return this.permissionRepository.find();
  }

  async createPermission(data: any) {
    const permission = this.permissionRepository.create(data);
    return this.permissionRepository.save(permission);
  }

  async assignPermissionsToRole(roleId: string, permissionIds: string[]) {
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
    if (!role) throw new NotFoundException('Role not found');
    
    const permissions = await this.permissionRepository.findByIds(permissionIds);
    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async assignRoleToUser(userId: string, roleId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    user.roleId = roleId;
    return this.userRepository.save(user);
  }
}
