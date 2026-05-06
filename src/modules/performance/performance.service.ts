import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  ReviewCycle, 
  Goal, 
  PerformanceReview, 
  ReviewSection, 
  Competency, 
  DevelopmentPlan, 
  Feedback 
} from './entities/performance.entity';
import { GoalStatus, ReviewStatus } from '../../common/enums';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(ReviewCycle)
    private cycleRepository: Repository<ReviewCycle>,
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
    @InjectRepository(PerformanceReview)
    private reviewRepository: Repository<PerformanceReview>,
  ) {}

  async createGoal(employeeId: string, dto: any, creatorId: string) {
    const goal = this.goalRepository.create({
      ...dto,
      employeeId,
      createdBy: creatorId,
      status: GoalStatus.NOT_STARTED,
    });
    return this.goalRepository.save(goal);
  }

  async updateGoalProgress(goalId: string, currentValue: number) {
    const goal = await this.goalRepository.findOne({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');

    goal.currentValue = currentValue;
    if (currentValue >= goal.targetValue) {
      goal.status = GoalStatus.COMPLETED;
    } else {
      goal.status = GoalStatus.IN_PROGRESS;
    }

    return this.goalRepository.save(goal);
  }

  async getMyGoals(employeeId: string) {
    return this.goalRepository.find({ where: { employeeId } });
  }

  async submitReview(reviewId: string, rating: number, feedback: any) {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');

    review.overallRating = rating;
    review.status = ReviewStatus.SUBMITTED;
    review.submittedAt = new Date();
    
    return this.reviewRepository.save(review);
  }
}
