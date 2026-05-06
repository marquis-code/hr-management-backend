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
exports.PublicHoliday = exports.EmployeeSchedule = exports.WorkSchedule = exports.AttendanceRecord = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let AttendanceRecord = class AttendanceRecord {
    id;
    employeeId;
    date;
    checkInTime;
    checkOutTime;
    checkInLocation;
    checkOutLocation;
    checkInMethod;
    workHours;
    overtimeHours;
    status;
    notes;
    isManuallyAdjusted;
    adjustedBy;
    adjustmentReason;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.AttendanceRecord = AttendanceRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "checkOutTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AttendanceRecord.prototype, "checkInLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AttendanceRecord.prototype, "checkOutLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.CheckInMethod, default: enums_1.CheckInMethod.WEB }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "checkInMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], AttendanceRecord.prototype, "workHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], AttendanceRecord.prototype, "overtimeHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.AttendanceStatus, default: enums_1.AttendanceStatus.PRESENT }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AttendanceRecord.prototype, "isManuallyAdjusted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "adjustedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "adjustmentReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AttendanceRecord.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "updatedBy", void 0);
exports.AttendanceRecord = AttendanceRecord = __decorate([
    (0, typeorm_1.Entity)('attendance_records')
], AttendanceRecord);
let WorkSchedule = class WorkSchedule {
    id;
    name;
    type;
    workDays;
    startTime;
    endTime;
    breakDuration;
    gracePeriodsMinutes;
    overtimeThresholdMinutes;
    isDefault;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.WorkSchedule = WorkSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkSchedule.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ScheduleType, default: enums_1.ScheduleType.FIXED }),
    __metadata("design:type", String)
], WorkSchedule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', array: true, default: [1, 2, 3, 4, 5] }),
    __metadata("design:type", Array)
], WorkSchedule.prototype, "workDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: '09:00' }),
    __metadata("design:type", String)
], WorkSchedule.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', default: '17:00' }),
    __metadata("design:type", String)
], WorkSchedule.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 60 }),
    __metadata("design:type", Number)
], WorkSchedule.prototype, "breakDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 15 }),
    __metadata("design:type", Number)
], WorkSchedule.prototype, "gracePeriodsMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 30 }),
    __metadata("design:type", Number)
], WorkSchedule.prototype, "overtimeThresholdMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkSchedule.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkSchedule.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], WorkSchedule.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkSchedule.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkSchedule.prototype, "updatedBy", void 0);
exports.WorkSchedule = WorkSchedule = __decorate([
    (0, typeorm_1.Entity)('work_schedules')
], WorkSchedule);
let EmployeeSchedule = class EmployeeSchedule {
    id;
    employeeId;
    scheduleId;
    effectiveFrom;
    effectiveTo;
    createdAt;
    updatedAt;
};
exports.EmployeeSchedule = EmployeeSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeSchedule.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeSchedule.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EmployeeSchedule.prototype, "effectiveFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeSchedule.prototype, "effectiveTo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSchedule.prototype, "updatedAt", void 0);
exports.EmployeeSchedule = EmployeeSchedule = __decorate([
    (0, typeorm_1.Entity)('employee_schedules')
], EmployeeSchedule);
let PublicHoliday = class PublicHoliday {
    id;
    name;
    date;
    type;
    isRecurringYearly;
    description;
    createdAt;
    updatedAt;
    deletedAt;
    createdBy;
    updatedBy;
};
exports.PublicHoliday = PublicHoliday;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PublicHoliday.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PublicHoliday.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PublicHoliday.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.HolidayType, default: enums_1.HolidayType.COMPANY }),
    __metadata("design:type", String)
], PublicHoliday.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PublicHoliday.prototype, "isRecurringYearly", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PublicHoliday.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PublicHoliday.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PublicHoliday.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], PublicHoliday.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PublicHoliday.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PublicHoliday.prototype, "updatedBy", void 0);
exports.PublicHoliday = PublicHoliday = __decorate([
    (0, typeorm_1.Entity)('public_holidays')
], PublicHoliday);
//# sourceMappingURL=attendance.entity.js.map