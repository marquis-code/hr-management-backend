import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  JobRequisition, 
  Applicant, 
  JobPosting, 
  Application, 
  Interview, 
  OfferLetter 
} from './entities';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [
    OnboardingModule,
    TypeOrmModule.forFeature([
      JobRequisition, 
      Applicant, 
      JobPosting, 
      Application, 
      Interview, 
      OfferLetter
    ])
  ],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
  exports: [RecruitmentService],
})
export class RecruitmentModule {}
