import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        totalUsers: number;
        totalSubsidiaries: number;
        employeeCount: number;
        departmentCount: number;
        positionCount: number;
        auditCount: number;
        systemStatus: string;
    }>;
    getUsers(): Promise<import("../auth/entities").User[]>;
    toggleUser(id: string): Promise<import("../auth/entities").User>;
    getLogs(query: any): Promise<import("../auth/entities").AuditLog[]>;
    getRoles(): Promise<import("../auth/entities").Role[]>;
    createRole(data: any): Promise<import("../auth/entities").Role[]>;
    updateRole(id: string, data: any): Promise<import("../auth/entities").Role | null>;
    getPermissions(): Promise<import("../auth/entities").Permission[]>;
    createPermission(data: any): Promise<import("../auth/entities").Permission[]>;
    assignPermissions(id: string, body: {
        permissionIds: string[];
    }): Promise<import("../auth/entities").Role>;
    assignRole(id: string, body: {
        roleId: string;
    }): Promise<import("../auth/entities").User>;
}
