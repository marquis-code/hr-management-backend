import { Repository } from 'typeorm';
import { User, AuditLog, Role, Permission } from '../auth/entities';
import { Subsidiary } from '../employees/entities/subsidiary.entity';
export declare class AdminService {
    private userRepository;
    private auditLogRepository;
    private subsidiaryRepository;
    private roleRepository;
    private permissionRepository;
    constructor(userRepository: Repository<User>, auditLogRepository: Repository<AuditLog>, subsidiaryRepository: Repository<Subsidiary>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    getGlobalStats(): Promise<{
        totalUsers: number;
        totalSubsidiaries: number;
        employeeCount: number;
        departmentCount: number;
        positionCount: number;
        auditCount: number;
        systemStatus: string;
    }>;
    getAllUsers(): Promise<User[]>;
    toggleUserStatus(userId: string): Promise<User>;
    getAuditLogs(params: any): Promise<AuditLog[]>;
    getRoles(): Promise<Role[]>;
    createRole(data: any): Promise<Role[]>;
    updateRole(id: string, data: any): Promise<Role | null>;
    deleteRole(id: string): Promise<import("typeorm").DeleteResult>;
    getPermissions(): Promise<Permission[]>;
    createPermission(data: any): Promise<Permission[]>;
    assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<Role>;
    assignRoleToUser(userId: string, roleId: string): Promise<User>;
}
