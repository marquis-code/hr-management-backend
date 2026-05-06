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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveApprovalFlow = exports.LeaveRequest = exports.LeaveBalance = exports.LeaveType = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const employee_entity_1 = require("../../employees/entities/employee.entity");
let LeaveType = class LeaveType {
    id;
    name;
    code;
    maxDaysPerYear;
    carryOverAllowed;
    carryOverMaxDays;
    carryOverExpiryMonths;
    isPaid;
    requiresDocument;
    minNoticeDays;
    maxConsecutiveDays;
    applicableGender;
    isActive;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.LeaveType = LeaveType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LeaveType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], LeaveType.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LeaveType.prototype, "maxDaysPerYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "carryOverAllowed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LeaveType.prototype, "carryOverMaxDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], LeaveType.prototype, "carryOverExpiryMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "requiresDocument", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LeaveType.prototype, "minNoticeDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], LeaveType.prototype, "maxConsecutiveDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApplicableGender, default: enums_1.ApplicableGender.ALL }),
    __metadata("design:type", String)
], LeaveType.prototype, "applicableGender", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], LeaveType.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaveType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LeaveType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], LeaveType.prototype, "deletedAt", void 0);
exports.LeaveType = LeaveType = __decorate([
    (0, typeorm_1.Entity)('leave_types')
], LeaveType);
let LeaveBalance = class LeaveBalance {
    id;
    employeeId;
    leaveTypeId;
    year;
    allocatedDays;
    usedDays;
    pendingDays;
    carryOverDays;
    leaveType;
    employee;
    createdAt;
    updatedAt;
};
exports.LeaveBalance = LeaveBalance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LeaveBalance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveBalance.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveBalance.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "allocatedDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "usedDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "pendingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LeaveBalance.prototype, "carryOverDays", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LeaveType),
    (0, typeorm_1.JoinColumn)({ name: 'leaveTypeId' }),
    __metadata("design:type", LeaveType)
], LeaveBalance.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], LeaveBalance.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaveBalance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LeaveBalance.prototype, "updatedAt", void 0);
exports.LeaveBalance = LeaveBalance = __decorate([
    (0, typeorm_1.Entity)('leave_balances')
], LeaveBalance);
let LeaveRequest = class LeaveRequest {
    id;
    employeeId;
    leaveTypeId;
    startDate;
    endDate;
    numberOfDays;
    reason;
    status;
    approvedBy;
    approvedAt;
    rejectionReason;
    handoverNote;
    handoverEmployeeId;
    supportingDocumentUrl;
    isUrgent;
    leaveType;
    employee;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.LeaveRequest = LeaveRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LeaveRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveRequest.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveRequest.prototype, "leaveTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "numberOfDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LeaveRequestStatus, default: enums_1.LeaveRequestStatus.PENDING }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "handoverNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "handoverEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "supportingDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LeaveRequest.prototype, "isUrgent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => LeaveType),
    (0, typeorm_1.JoinColumn)({ name: 'leaveTypeId' }),
    __metadata("design:type", LeaveType)
], LeaveRequest.prototype, "leaveType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], LeaveRequest.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "deletedAt", void 0);
exports.LeaveRequest = LeaveRequest = __decorate([
    (0, typeorm_1.Entity)('leave_requests')
], LeaveRequest);
let LeaveApprovalFlow = class LeaveApprovalFlow {
    id;
    leaveRequestId;
    approverLevel;
    approverId;
    status;
    actedAt;
    comment;
    createdAt;
};
exports.LeaveApprovalFlow = LeaveApprovalFlow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LeaveApprovalFlow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveApprovalFlow.prototype, "leaveRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LeaveApprovalFlow.prototype, "approverLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LeaveApprovalFlow.prototype, "approverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LeaveRequestStatus, default: enums_1.LeaveRequestStatus.PENDING }),
    __metadata("design:type", String)
], LeaveApprovalFlow.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LeaveApprovalFlow.prototype, "actedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeaveApprovalFlow.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaveApprovalFlow.prototype, "createdAt", void 0);
exports.LeaveApprovalFlow = LeaveApprovalFlow = __decorate([
    (0, typeorm_1.Entity)('leave_approval_flows')
], LeaveApprovalFlow);
//# sourceMappingURL=leave.entity.js.map