import { Repository } from 'typeorm';
import { JobRequisition, Applicant, JobPosting, Application } from './entities/recruitment.entity';
import { CreateRequisitionDto, CreateApplicationDto } from './dto';
import { ApplicationStage } from '../../common/enums';
import { OnboardingService } from '../onboarding/onboarding.service';
export declare class RecruitmentService {
    private requisitionRepository;
    private applicantRepository;
    private postingRepository;
    private applicationRepository;
    private onboardingService;
    constructor(requisitionRepository: Repository<JobRequisition>, applicantRepository: Repository<Applicant>, postingRepository: Repository<JobPosting>, applicationRepository: Repository<Application>, onboardingService: OnboardingService);
    createRequisition(dto: CreateRequisitionDto, userId: string): Promise<JobRequisition>;
    getAllRequisitions(): Promise<JobRequisition[]>;
    applyToJob(postingId: string, dto: CreateApplicationDto): Promise<Application>;
    updateStage(applicationId: string, stage: ApplicationStage): Promise<Application>;
    getPipelineData(): Promise<{
        id: ApplicationStage;
        name: string;
        applicants: {
            id: string;
            name: string;
            jobTitle: any;
            timeInStage: string;
            initials: string;
            email: any;
        }[];
    }[]>;
    private calculateTimeInStage;
    addCandidate(dto: any): Promise<Application>;
    getPostings(): Promise<JobPosting[]>;
}
