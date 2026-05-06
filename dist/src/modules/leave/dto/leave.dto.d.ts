import { CheckInMethod, LeaveRequestStatus } from '../../../common/enums';
export declare class CheckInDto {
    location?: {
        lat: number;
        lng: number;
        address: string;
    };
    method: CheckInMethod;
}
export declare class CreateLeaveRequestDto {
    leaveTypeId: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    handoverEmployeeId?: string;
    handoverNote?: string;
}
export declare class LeaveActionDto {
    status: LeaveRequestStatus;
    comment?: string;
}
