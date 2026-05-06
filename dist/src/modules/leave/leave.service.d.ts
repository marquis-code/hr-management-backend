import { Repository } from 'typeorm';
import { LeaveType, LeaveBalance, LeaveRequest } from './entities/leave.entity';
import { PublicHoliday } from '../attendance/entities/attendance.entity';
import { CreateLeaveRequestDto, LeaveActionDto } from './dto';
export declare class LeaveService {
    private leaveTypeRepository;
    private leaveBalanceRepository;
    private leaveRequestRepository;
    private holidayRepository;
    constructor(leaveTypeRepository: Repository<LeaveType>, leaveBalanceRepository: Repository<LeaveBalance>, leaveRequestRepository: Repository<LeaveRequest>, holidayRepository: Repository<PublicHoliday>);
    calculateBusinessDays(startDate: Date, endDate: Date): Promise<number>;
    getBalances(employeeId: string): Promise<LeaveBalance[]>;
    getRequests(user: any): Promise<LeaveRequest[]>;
    submitRequest(employeeId: string, dto: CreateLeaveRequestDto): Promise<LeaveRequest>;
    handleAction(requestId: string, approverId: string, dto: LeaveActionDto): Promise<LeaveRequest>;
}
