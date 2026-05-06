import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  ReviewCycle, 
  Goal, 
  PerformanceReview, 
  ReviewSection, 
  Competency, 
  DevelopmentPlan, 
  Feedback 
} from './entities';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewCycle, 
      Goal, 
      PerformanceReview, 
      ReviewSection, 
      Competency, 
      DevelopmentPlan, 
      Feedback
    ])
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService],
  exports: [PerformanceService],
})
export class PerformanceModule {}
