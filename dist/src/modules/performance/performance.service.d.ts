import { Repository } from 'typeorm';
import { ReviewCycle, Goal, PerformanceReview } from './entities/performance.entity';
export declare class PerformanceService {
    private cycleRepository;
    private goalRepository;
    private reviewRepository;
    constructor(cycleRepository: Repository<ReviewCycle>, goalRepository: Repository<Goal>, reviewRepository: Repository<PerformanceReview>);
    createGoal(employeeId: string, dto: any, creatorId: string): Promise<Goal[]>;
    updateGoalProgress(goalId: string, currentValue: number): Promise<Goal>;
    getMyGoals(employeeId: string): Promise<Goal[]>;
    submitReview(reviewId: string, rating: number, feedback: any): Promise<PerformanceReview>;
}
