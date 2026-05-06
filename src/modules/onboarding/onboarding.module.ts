import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingPlan, OnboardingTask, OnboardingTemplate, OnboardingCourse, OnboardingLesson, OnboardingAssessment, OnboardingProgress } from './entities/onboarding.entity';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    OnboardingPlan, 
    OnboardingTask, 
    OnboardingTemplate,
    OnboardingCourse,
    OnboardingLesson,
    OnboardingAssessment,
    OnboardingProgress
  ])],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
