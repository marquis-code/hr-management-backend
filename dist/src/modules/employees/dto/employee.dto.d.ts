import { Gender, MaritalStatus, EmploymentType, WorkLocation } from '../../../common/enums';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    middleName?: string;
    personalEmail: string;
    workEmail?: string;
    phone: string;
    dateOfBirth: Date;
    gender: Gender;
    maritalStatus: MaritalStatus;
    nationality: string;
    employmentType: EmploymentType;
    jobTitle: string;
    departmentId: string;
    positionId?: string;
    managerId?: string;
    hireDate: Date;
    workLocation: WorkLocation;
    address?: any;
    bankDetails?: any;
    emergencyContact?: any;
}
export declare class UpdateEmployeeDto extends CreateEmployeeDto {
}
export declare class CreateDepartmentDto {
    name: string;
    code: string;
    description?: string;
    headId?: string;
    parentDepartmentId?: string;
}
export declare class CreatePositionDto {
    title: string;
    code: string;
    departmentId: string;
    minSalary?: number;
    maxSalary?: number;
    responsibilities?: string[];
    requirements?: string[];
}
