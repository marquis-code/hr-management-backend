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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const recruitment_service_1 = require("./recruitment.service");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const user_entity_1 = require("../auth/entities/user.entity");
const dto_1 = require("./dto");
let RecruitmentController = class RecruitmentController {
    recruitmentService;
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    async createRequisition(dto, user) {
        return this.recruitmentService.createRequisition(dto, user.id);
    }
    async apply(postingId, dto) {
        return this.recruitmentService.applyToJob(postingId, dto);
    }
    async updateStage(id, stage) {
        return this.recruitmentService.updateStage(id, stage);
    }
    async getPipeline() {
        return this.recruitmentService.getPipelineData();
    }
    async addCandidate(dto) {
        return this.recruitmentService.addCandidate(dto);
    }
    async getPostings() {
        return this.recruitmentService.getPostings();
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Post)('requisitions'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER, enums_1.UserRole.DEPARTMENT_HEAD),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job requisition' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRequisitionDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "createRequisition", null);
__decorate([
    (0, common_1.Post)('postings/:id/apply'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a job application (Public)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateApplicationDto]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "apply", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Patch)('applications/:id/stage'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Move application to a different stage' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('stage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateStage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Get)('pipeline'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get recruitment pipeline data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getPipeline", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Post)('candidates'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Manually add a candidate' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "addCandidate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Get)('postings'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all job postings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "getPostings", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, swagger_1.ApiTags)('Recruitment'),
    (0, common_1.Controller)('recruitment'),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map