"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recruitment_entity_1 = require("./entities/recruitment.entity");
const enums_1 = require("../../common/enums");
const onboarding_service_1 = require("../onboarding/onboarding.service");
let RecruitmentService = class RecruitmentService {
    requisitionRepository;
    applicantRepository;
    postingRepository;
    applicationRepository;
    onboardingService;
    constructor(requisitionRepository, applicantRepository, postingRepository, applicationRepository, onboardingService) {
        this.requisitionRepository = requisitionRepository;
        this.applicantRepository = applicantRepository;
        this.postingRepository = postingRepository;
        this.applicationRepository = applicationRepository;
        this.onboardingService = onboardingService;
    }
    async createRequisition(dto, userId) {
        const requisition = this.requisitionRepository.create({
            ...dto,
            requestedBy: userId,
            status: enums_1.RequisitionStatus.PENDING_APPROVAL,
        });
        return this.requisitionRepository.save(requisition);
    }
    async getAllRequisitions() {
        return this.requisitionRepository.find();
    }
    async applyToJob(postingId, dto) {
        let applicant = await this.applicantRepository.findOne({ where: { email: dto.email } });
        if (!applicant) {
            applicant = this.applicantRepository.create(dto);
            applicant = await this.applicantRepository.save(applicant);
        }
        const application = this.applicationRepository.create({
            jobPostingId: postingId,
            applicantId: applicant.id,
            stage: enums_1.ApplicationStage.APPLIED,
        });
        return this.applicationRepository.save(application);
    }
    async updateStage(applicationId, stage) {
        const application = await this.applicationRepository.findOne({ where: { id: applicationId } });
        if (!application)
            throw new common_1.NotFoundException('Application not found');
        application.stage = stage;
        application.currentStageEnteredAt = new Date();
        const saved = await this.applicationRepository.save(application);
        if (stage === enums_1.ApplicationStage.HIRED) {
        }
        return saved;
    }
    async getPipelineData() {
        const applications = await this.applicationRepository.find({
            relations: ['applicant', 'jobPosting'],
            order: { appliedAt: 'DESC' },
        });
        const stages = Object.values(enums_1.ApplicationStage);
        const pipeline = stages.map(stage => ({
            id: stage,
            name: stage.replace(/_/g, ' '),
            applicants: applications
                .filter(app => app.stage === stage)
                .map(app => ({
                id: app.id,
                name: `${app.applicant?.firstName} ${app.applicant?.lastName}`,
                jobTitle: app.jobPosting?.title || 'Unknown Position',
                timeInStage: this.calculateTimeInStage(app.currentStageEnteredAt || app.appliedAt),
                initials: `${app.applicant?.firstName?.[0]}${app.applicant?.lastName?.[0]}`,
                email: app.applicant?.email,
            }))
        }));
        return pipeline;
    }
    calculateTimeInStage(date) {
        const diff = new Date().getTime() - new Date(date).getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days > 0)
            return `${days}d`;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return `${hours}h`;
    }
    async addCandidate(dto) {
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
            stage: dto.stage || enums_1.ApplicationStage.APPLIED,
        });
        return this.applicationRepository.save(application);
    }
    async getPostings() {
        return this.postingRepository.find({
            select: ['id', 'title', 'slug', 'status'],
            where: { status: 'PUBLISHED' }
        });
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recruitment_entity_1.JobRequisition)),
    __param(1, (0, typeorm_1.InjectRepository)(recruitment_entity_1.Applicant)),
    __param(2, (0, typeorm_1.InjectRepository)(recruitment_entity_1.JobPosting)),
    __param(3, (0, typeorm_1.InjectRepository)(recruitment_entity_1.Application)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        onboarding_service_1.OnboardingService])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map