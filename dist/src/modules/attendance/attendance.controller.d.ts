import { AttendanceService } from './attendance.service';
import { User } from '../auth/entities/user.entity';
import { CheckInDto } from '../leave/dto/leave.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(user: User, dto: CheckInDto): Promise<import("./entities").AttendanceRecord>;
    checkOut(user: User, dto: any): Promise<import("./entities").AttendanceRecord>;
    getMyRecords(user: User): Promise<import("./entities").AttendanceRecord[]>;
}
