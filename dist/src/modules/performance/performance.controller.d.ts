import { PerformanceService } from './performance.service';
import { User } from '../auth/entities/user.entity';
export declare class PerformanceController {
    private readonly performanceService;
    constructor(performanceService: PerformanceService);
    getMyGoals(user: User): Promise<import("./entities").Goal[]>;
    createGoal(dto: any, user: User): Promise<import("./entities").Goal[]>;
    updateProgress(id: string, value: number): Promise<import("./entities").Goal>;
}
