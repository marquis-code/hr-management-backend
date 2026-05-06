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
exports.PerformanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const performance_service_1 = require("./performance.service");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const user_entity_1 = require("../auth/entities/user.entity");
let PerformanceController = class PerformanceController {
    performanceService;
    constructor(performanceService) {
        this.performanceService = performanceService;
    }
    async getMyGoals(user) {
        if (!user.employeeId)
            return [];
        return this.performanceService.getMyGoals(user.employeeId);
    }
    async createGoal(dto, user) {
        return this.performanceService.createGoal(dto.employeeId, dto, user.id);
    }
    async updateProgress(id, value) {
        return this.performanceService.updateGoalProgress(id, value);
    }
};
exports.PerformanceController = PerformanceController;
__decorate([
    (0, common_1.Get)('goals/my'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user goals' }),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "getMyGoals", null);
__decorate([
    (0, common_1.Post)('goals'),
    (0, decorators_1.Roles)(enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER, enums_1.UserRole.DEPARTMENT_HEAD),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new performance goal' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "createGoal", null);
__decorate([
    (0, common_1.Patch)('goals/:id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update goal progress' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('currentValue')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PerformanceController.prototype, "updateProgress", null);
exports.PerformanceController = PerformanceController = __decorate([
    (0, swagger_1.ApiTags)('Performance Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Controller)('performance'),
    __metadata("design:paramtypes", [performance_service_1.PerformanceService])
], PerformanceController);
//# sourceMappingURL=performance.controller.js.map