export declare class Department {
    id: string;
    name: string;
    code: string;
    description: string;
    headId: string;
    parentDepartmentId: string;
    isActive: boolean;
    parentDepartment: Department;
    childDepartments: Department[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
export declare class Position {
    id: string;
    title: string;
    code: string;
    departmentId: string;
    gradeLevel: string;
    minSalary: number;
    maxSalary: number;
    description: string;
    responsibilities: string[];
    requirements: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
export declare class EmploymentHistory {
    id: string;
    employeeId: string;
    type: string;
    fromValue: any;
    toValue: any;
    effectiveDate: Date;
    reason: string;
    approvedBy: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
