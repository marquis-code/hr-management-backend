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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const employees_service_1 = require("./employees.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const enums_1 = require("../../common/enums");
const dto_1 = require("./dto");
const user_entity_1 = require("../auth/entities/user.entity");
let EmployeesController = class EmployeesController {
    employeesService;
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async findAllSubsidiaries() {
        return this.employeesService.findAllSubsidiaries();
    }
    async findAll(paginationDto) {
        return this.employeesService.findAll(paginationDto);
    }
    async getOrgChart() {
        return this.employeesService.getOrgChart();
    }
    async create(createEmployeeDto, user) {
        return this.employeesService.create(createEmployeeDto, user.id);
    }
    async findAllDepartments() {
        return this.employeesService.findAllDepartments();
    }
    async createDepartment(dto) {
        return this.employeesService.createDepartment(dto);
    }
    async findAllPositions() {
        return this.employeesService.findAllPositions();
    }
    async createPosition(dto) {
        return this.employeesService.createPosition(dto);
    }
    async bulkImportEmployees(body, user) {
        return this.employeesService.bulkCreateEmployees(body.records, user.id);
    }
    async bulkImportDepartments(body) {
        return this.employeesService.bulkCreateDepartments(body.records);
    }
    async bulkImportPositions(body) {
        return this.employeesService.bulkCreatePositions(body.records);
    }
    async exportEmployees() {
        return this.employeesService.findAll({ page: 1, limit: 10000 });
    }
    async exportDepartments() {
        return this.employeesService.findAllDepartments();
    }
    async exportPositions() {
        return this.employeesService.findAllPositions();
    }
    async findOne(id) {
        return this.employeesService.findOne(id);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Get)('subsidiaries'),
    (0, swagger_1.ApiOperation)({ summary: 'List all subsidiaries/entities' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAllSubsidiaries", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List all employees with pagination and filtering' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('org-chart'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hierarchical organizational chart' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getOrgChart", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new employee' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEmployeeDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({ summary: 'List all departments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAllDepartments", null);
__decorate([
    (0, common_1.Post)('departments'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new department' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.Get)('positions'),
    (0, swagger_1.ApiOperation)({ summary: 'List all positions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAllPositions", null);
__decorate([
    (0, common_1.Post)('positions'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create new position' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePositionDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createPosition", null);
__decorate([
    (0, common_1.Post)('bulk-import'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import employees from CSV data' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "bulkImportEmployees", null);
__decorate([
    (0, common_1.Post)('departments/bulk-import'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import departments from CSV data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "bulkImportDepartments", null);
__decorate([
    (0, common_1.Post)('positions/bulk-import'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import positions from CSV data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "bulkImportPositions", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Export all employees as JSON for CSV generation' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "exportEmployees", null);
__decorate([
    (0, common_1.Get)('departments/export'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Export all departments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "exportDepartments", null);
__decorate([
    (0, common_1.Get)('positions/export'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Export all positions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "exportPositions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Roles)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee profile' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)('Employees'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map