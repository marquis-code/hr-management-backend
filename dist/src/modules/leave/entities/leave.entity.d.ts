import { LeaveRequestStatus, ApplicableGender } from '../../../common/enums';
import { Employee } from '../../employees/entities/employee.entity';
export declare class LeaveType {
    id: string;
    name: string;
    code: string;
    maxDaysPerYear: number;
    carryOverAllowed: boolean;
    carryOverMaxDays: number;
    carryOverExpiryMonths: number;
    isPaid: boolean;
    requiresDocument: boolean;
    minNoticeDays: number;
    maxConsecutiveDays: number;
    applicableGender: ApplicableGender;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class LeaveBalance {
    id: string;
    employeeId: string;
    leaveTypeId: string;
    year: number;
    allocatedDays: number;
    usedDays: number;
    pendingDays: number;
    carryOverDays: number;
    leaveType: LeaveType;
    employee: Employee;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LeaveRequest {
    id: string;
    employeeId: string;
    leaveTypeId: string;
    startDate: Date;
    endDate: Date;
    numberOfDays: number;
    reason: string;
    status: LeaveRequestStatus;
    approvedBy: string;
    approvedAt: Date;
    rejectionReason: string;
    handoverNote: string;
    handoverEmployeeId: string;
    supportingDocumentUrl: string;
    isUrgent: boolean;
    leaveType: LeaveType;
    employee: Employee;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class LeaveApprovalFlow {
    id: string;
    leaveRequestId: string;
    approverLevel: number;
    approverId: string;
    status: LeaveRequestStatus;
    actedAt: Date;
    comment: string;
    createdAt: Date;
}
