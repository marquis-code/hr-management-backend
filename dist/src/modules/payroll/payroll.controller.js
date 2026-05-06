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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payroll_service_1 = require("./payroll.service");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const user_entity_1 = require("../auth/entities/user.entity");
const dto_1 = require("./dto");
let PayrollController = class PayrollController {
    payrollService;
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async initiate(dto, user) {
        return this.payrollService.initiatePeriod(dto, user.id);
    }
    async getPeriods() {
        return this.payrollService.getPeriods();
    }
    async getEntries(id) {
        return this.payrollService.getEntries(id);
    }
    async process(dto, user) {
        return this.payrollService.processPayroll(dto.periodId, user.id);
    }
    async bulkImportSalaryGrades(body) {
        return this.payrollService.bulkCreateSalaryGrades(body.records);
    }
    async bulkImportTaxBrackets(body) {
        return this.payrollService.bulkCreateTaxBrackets(body.records);
    }
    async exportSalaryGrades() {
        return this.payrollService.getSalaryGrades();
    }
    async exportTaxBrackets() {
        return this.payrollService.getTaxBrackets();
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Post)('initiate'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Initiate a new payroll period' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "initiate", null);
__decorate([
    (0, common_1.Get)('periods'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List all payroll periods' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getPeriods", null);
__decorate([
    (0, common_1.Get)('periods/:id/entries'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List all entries for a specific payroll period' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getEntries", null);
__decorate([
    (0, common_1.Post)('process'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger payroll processing for a period' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProcessPayrollDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "process", null);
__decorate([
    (0, common_1.Post)('salary-grades/bulk-import'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import salary grades' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "bulkImportSalaryGrades", null);
__decorate([
    (0, common_1.Post)('tax-brackets/bulk-import'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import tax brackets' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "bulkImportTaxBrackets", null);
__decorate([
    (0, common_1.Get)('salary-grades/export'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Export all salary grades' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "exportSalaryGrades", null);
__decorate([
    (0, common_1.Get)('tax-brackets/export'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Export all tax brackets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "exportTaxBrackets", null);
exports.PayrollController = PayrollController = __decorate([
    (0, swagger_1.ApiTags)('Payroll Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map