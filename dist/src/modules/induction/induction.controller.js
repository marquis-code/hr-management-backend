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
exports.InductionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const induction_service_1 = require("./induction.service");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const user_entity_1 = require("../auth/entities/user.entity");
const induction_dto_1 = require("./dto/induction.dto");
let InductionController = class InductionController {
    inductionService;
    constructor(inductionService) {
        this.inductionService = inductionService;
    }
    async createProgram(dto, user) {
        return this.inductionService.createProgram(dto, user.id);
    }
    async findAllPrograms() {
        return this.inductionService.findAllPrograms();
    }
    async findProgram(id) {
        return this.inductionService.findProgramById(id);
    }
    async updateProgram(id, dto) {
        return this.inductionService.updateProgram(id, dto);
    }
    async publishProgram(id) {
        return this.inductionService.publishProgram(id);
    }
    async deleteProgram(id) {
        return this.inductionService.deleteProgram(id);
    }
    async addModule(programId, dto) {
        return this.inductionService.addModule(programId, dto);
    }
    async deleteModule(id) {
        return this.inductionService.deleteModule(id);
    }
    async addLesson(moduleId, dto) {
        return this.inductionService.addLesson(moduleId, dto);
    }
    async deleteLesson(id) {
        return this.inductionService.deleteLesson(id);
    }
    async addQuestion(moduleId, dto) {
        return this.inductionService.addQuestion(moduleId, dto);
    }
    async deleteQuestion(id) {
        return this.inductionService.deleteQuestion(id);
    }
    async enrollEmployee(body) {
        return this.inductionService.enrollEmployee(body.employeeId, body.programId);
    }
    async getDashboard() {
        return this.inductionService.getEnrollmentDashboard();
    }
    async getMyInduction(user) {
        return this.inductionService.getMyInduction(user.employeeId || user.id);
    }
    async markLessonWatched(user, dto) {
        return this.inductionService.markLessonWatched(user.employeeId || user.id, dto);
    }
    async submitAssessment(user, dto) {
        return this.inductionService.submitModuleAssessment(user.employeeId || user.id, dto);
    }
};
exports.InductionController = InductionController;
__decorate([
    (0, common_1.Post)('programs'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create induction program with optional nested modules/lessons/questions' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [induction_dto_1.CreateInductionProgramDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "createProgram", null);
__decorate([
    (0, common_1.Get)('programs'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List all induction programs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "findAllPrograms", null);
__decorate([
    (0, common_1.Get)('programs/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get induction program details' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "findProgram", null);
__decorate([
    (0, common_1.Patch)('programs/:id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update induction program' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, induction_dto_1.UpdateInductionProgramDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "updateProgram", null);
__decorate([
    (0, common_1.Patch)('programs/:id/publish'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Publish an induction program' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "publishProgram", null);
__decorate([
    (0, common_1.Delete)('programs/:id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an induction program' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "deleteProgram", null);
__decorate([
    (0, common_1.Post)('programs/:programId/modules'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add module to program' }),
    __param(0, (0, common_1.Param)('programId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, induction_dto_1.AddModuleDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "addModule", null);
__decorate([
    (0, common_1.Delete)('modules/:id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a module' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "deleteModule", null);
__decorate([
    (0, common_1.Post)('modules/:moduleId/lessons'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add lesson to module' }),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, induction_dto_1.AddLessonDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "addLesson", null);
__decorate([
    (0, common_1.Delete)('lessons/:id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lesson' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "deleteLesson", null);
__decorate([
    (0, common_1.Post)('modules/:moduleId/questions'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add question to module' }),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, induction_dto_1.AddQuestionDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Delete)('questions/:id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a question' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Post)('enroll'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Manually enroll an employee into an induction program' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "enrollEmployee", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get induction enrollment dashboard for all employees' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('my-induction'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current employee induction program and progress' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "getMyInduction", null);
__decorate([
    (0, common_1.Post)('mark-watched'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a lesson as watched' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, induction_dto_1.MarkLessonWatchedDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "markLessonWatched", null);
__decorate([
    (0, common_1.Post)('submit-assessment'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit answers for a module assessment' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, induction_dto_1.SubmitModuleAssessmentDto]),
    __metadata("design:returntype", Promise)
], InductionController.prototype, "submitAssessment", null);
exports.InductionController = InductionController = __decorate([
    (0, swagger_1.ApiTags)('Induction'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Controller)('induction'),
    __metadata("design:paramtypes", [induction_service_1.InductionService])
], InductionController);
//# sourceMappingURL=induction.controller.js.map