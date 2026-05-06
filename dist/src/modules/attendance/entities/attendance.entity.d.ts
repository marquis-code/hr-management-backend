import { AttendanceStatus, CheckInMethod, ScheduleType, HolidayType } from '../../../common/enums';
export declare class AttendanceRecord {
    id: string;
    employeeId: string;
    date: Date;
    checkInTime: Date;
    checkOutTime: Date;
    checkInLocation: {
        lat: number;
        lng: number;
        address: string;
    };
    checkOutLocation: {
        lat: number;
        lng: number;
        address: string;
    };
    checkInMethod: CheckInMethod;
    workHours: number;
    overtimeHours: number;
    status: AttendanceStatus;
    notes: string;
    isManuallyAdjusted: boolean;
    adjustedBy: string;
    adjustmentReason: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
export declare class WorkSchedule {
    id: string;
    name: string;
    type: ScheduleType;
    workDays: number[];
    startTime: string;
    endTime: string;
    breakDuration: number;
    gracePeriodsMinutes: number;
    overtimeThresholdMinutes: number;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
export declare class EmployeeSchedule {
    id: string;
    employeeId: string;
    scheduleId: string;
    effectiveFrom: Date;
    effectiveTo: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PublicHoliday {
    id: string;
    name: string;
    date: Date;
    type: HolidayType;
    isRecurringYearly: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
}
