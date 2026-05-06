import { LeaveService } from './leave.service';
import { User } from '../auth/entities/user.entity';
import { CreateLeaveRequestDto, LeaveActionDto } from './dto';
export declare class LeaveController {
    private readonly leaveService;
    constructor(leaveService: LeaveService);
    getMyBalances(user: User): Promise<import("./entities").LeaveBalance[]>;
    getRequests(user: User): Promise<import("./entities").LeaveRequest[]>;
    submit(user: User, dto: CreateLeaveRequestDto): Promise<import("./entities").LeaveRequest>;
    handleAction(id: string, user: User, dto: LeaveActionDto): Promise<import("./entities").LeaveRequest>;
}
