import { RecruitmentService } from './recruitment.service';
import { ApplicationStage } from '../../common/enums';
import { User } from '../auth/entities/user.entity';
import { CreateRequisitionDto, CreateApplicationDto } from './dto';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    createRequisition(dto: CreateRequisitionDto, user: User): Promise<import("./entities").JobRequisition>;
    apply(postingId: string, dto: CreateApplicationDto): Promise<import("./entities").Application>;
    updateStage(id: string, stage: ApplicationStage): Promise<import("./entities").Application>;
    getPipeline(): Promise<{
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
    addCandidate(dto: any): Promise<import("./entities").Application>;
    getPostings(): Promise<import("./entities").JobPosting[]>;
}
