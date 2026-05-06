"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../auth/entities");
const subsidiary_entity_1 = require("../employees/entities/subsidiary.entity");
let AdminService = class AdminService {
    userRepository;
    auditLogRepository;
    subsidiaryRepository;
    roleRepository;
    permissionRepository;
    constructor(userRepository, auditLogRepository, subsidiaryRepository, roleRepository, permissionRepository) {
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
        this.subsidiaryRepository = subsidiaryRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
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
    async toggleUserStatus(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.isActive = !user.isActive;
        return this.userRepository.save(user);
    }
    async getAuditLogs(params) {
        const { skip = 0, take = 50 } = params;
        return this.auditLogRepository.find({
            skip,
            take,
            order: { timestamp: 'DESC' },
        });
    }
    async getRoles() {
        return this.roleRepository.find({ relations: ['permissions'] });
    }
    async createRole(data) {
        const role = this.roleRepository.create(data);
        return this.roleRepository.save(role);
    }
    async updateRole(id, data) {
        await this.roleRepository.update(id, data);
        return this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    }
    async deleteRole(id) {
        return this.roleRepository.delete(id);
    }
    async getPermissions() {
        return this.permissionRepository.find();
    }
    async createPermission(data) {
        const permission = this.permissionRepository.create(data);
        return this.permissionRepository.save(permission);
    }
    async assignPermissionsToRole(roleId, permissionIds) {
        const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        const permissions = await this.permissionRepository.findByIds(permissionIds);
        role.permissions = permissions;
        return this.roleRepository.save(role);
    }
    async assignRoleToUser(userId, roleId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        user.roleId = roleId;
        return this.userRepository.save(user);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.AuditLog)),
    __param(2, (0, typeorm_1.InjectRepository)(subsidiary_entity_1.Subsidiary)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.Role)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map