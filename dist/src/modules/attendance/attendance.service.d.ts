import { Repository } from 'typeorm';
import { AttendanceRecord, WorkSchedule } from './entities/attendance.entity';
export declare class AttendanceService {
    private recordRepository;
    private scheduleRepository;
    constructor(recordRepository: Repository<AttendanceRecord>, scheduleRepository: Repository<WorkSchedule>);
    checkIn(employeeId: string, dto: any): Promise<AttendanceRecord>;
    checkOut(employeeId: string, location?: any): Promise<AttendanceRecord>;
    getMyRecords(employeeId: string): Promise<AttendanceRecord[]>;
}
