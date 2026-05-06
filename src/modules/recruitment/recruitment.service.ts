import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  JobRequisition, 
  Applicant, 
  JobPosting, 
  Application, 
  Interview, 
  OfferLetter 
} from './entities/recruitment.entity';
import { CreateRequisitionDto, CreateApplicationDto } from './dto';
import { RequisitionStatus, ApplicationStage, ApplicationStatus } from '../../common/enums';
import { OnboardingService } from '../onboarding/onboarding.service';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(JobRequisition)
    private requisitionRepository: Repository<JobRequisition>,
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
    @InjectRepository(JobPosting)
    private postingRepository: Repository<JobPosting>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private onboardingService: OnboardingService,
  ) {}

  async createRequisition(dto: CreateRequisitionDto, userId: string) {
    const requisition = this.requisitionRepository.create({
      ...dto,
      requestedBy: userId,
      status: RequisitionStatus.PENDING_APPROVAL,
    });
    return this.requisitionRepository.save(requisition);
  }

  async getAllRequisitions() {
    return this.requisitionRepository.find();
  }

  async applyToJob(postingId: string, dto: CreateApplicationDto) {
    let applicant = await this.applicantRepository.findOne({ where: { email: dto.email } });
    if (!applicant) {
      applicant = this.applicantRepository.create(dto);
      applicant = await this.applicantRepository.save(applicant);
    }

    const application = this.applicationRepository.create({
      jobPostingId: postingId,
      applicantId: applicant.id,
      stage: ApplicationStage.APPLIED,
    });

    return this.applicationRepository.save(application);
  }

  async updateStage(applicationId: string, stage: ApplicationStage) {
    const application = await this.applicationRepository.findOne({ where: { id: applicationId } });
    if (!application) throw new NotFoundException('Application not found');

    application.stage = stage;
    application.currentStageEnteredAt = new Date();
    const saved = await this.applicationRepository.save(application);

    if (stage === ApplicationStage.HIRED) {
      // Trigger onboarding (abstracted)
      // await this.onboardingService.initiate(application.id);
    }

    return saved;
  }

  async getPipelineData() {
    const applications = await this.applicationRepository.find({
      relations: ['applicant', 'jobPosting'],
      order: { appliedAt: 'DESC' } as any,
    });

    // Group by stage
    const stages = Object.values(ApplicationStage);
    const pipeline = stages.map(stage => ({
      id: stage,
      name: stage.replace(/_/g, ' '),
      applicants: applications
        .filter(app => app.stage === stage)
        .map(app => ({
          id: app.id,
          name: `${(app as any).applicant?.firstName} ${(app as any).applicant?.lastName}`,
          jobTitle: (app as any).jobPosting?.title || 'Unknown Position',
          timeInStage: this.calculateTimeInStage(app.currentStageEnteredAt || app.appliedAt),
          initials: `${(app as any).applicant?.firstName?.[0]}${(app as any).applicant?.lastName?.[0]}`,
          email: (app as any).applicant?.email,
        }))
    }));

    return pipeline;
  }

  private calculateTimeInStage(date: Date) {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days}d`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h`;
  }

  async addCandidate(dto: any) {
    let applicant = await this.applicantRepository.findOne({ where: { email: dto.email } });
    if (!applicant) {
      applicant = this.applicantRepository.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
      });
      applicant = await this.applicantRepository.save(applicant);
    }

    const application = this.applicationRepository.create({
      jobPostingId: dto.jobPostingId,
      applicantId: applicant.id,
      stage: dto.stage || ApplicationStage.APPLIED,
    });

    return this.applicationRepository.save(application);
  }

  async getPostings() {
    return this.postingRepository.find({
      select: ['id', 'title', 'slug', 'status'],
      where: { status: 'PUBLISHED' as any }
    });
  }
}
