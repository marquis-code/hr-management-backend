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
exports.PayrollDeduction = exports.LoanAdvance = exports.TaxBracket = exports.PayrollEntry = exports.PayrollPeriod = exports.EmployeeSalary = exports.SalaryGrade = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let SalaryGrade = class SalaryGrade {
    id;
    level;
    minSalary;
    maxSalary;
    currency;
    createdAt;
    updatedAt;
};
exports.SalaryGrade = SalaryGrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SalaryGrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalaryGrade.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], SalaryGrade.prototype, "minSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], SalaryGrade.prototype, "maxSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NGN' }),
    __metadata("design:type", String)
], SalaryGrade.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SalaryGrade.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SalaryGrade.prototype, "updatedAt", void 0);
exports.SalaryGrade = SalaryGrade = __decorate([
    (0, typeorm_1.Entity)('salary_grades')
], SalaryGrade);
let EmployeeSalary = class EmployeeSalary {
    id;
    employeeId;
    grossSalary;
    currency;
    components;
    effectiveDate;
    endDate;
    approvedBy;
    createdAt;
    updatedAt;
};
exports.EmployeeSalary = EmployeeSalary;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeSalary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeSalary.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], EmployeeSalary.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NGN' }),
    __metadata("design:type", String)
], EmployeeSalary.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], EmployeeSalary.prototype, "components", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], EmployeeSalary.prototype, "effectiveDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmployeeSalary.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeSalary.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSalary.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeSalary.prototype, "updatedAt", void 0);
exports.EmployeeSalary = EmployeeSalary = __decorate([
    (0, typeorm_1.Entity)('employee_salaries')
], EmployeeSalary);
let PayrollPeriod = class PayrollPeriod {
    id;
    month;
    year;
    startDate;
    endDate;
    status;
    totalGross;
    totalDeductions;
    totalNet;
    employeeCount;
    processedAt;
    processedBy;
    approvedAt;
    approvedBy;
    paidAt;
    createdAt;
    updatedAt;
};
exports.PayrollPeriod = PayrollPeriod;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollPeriod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.PayrollPeriodStatus, default: enums_1.PayrollPeriodStatus.DRAFT }),
    __metadata("design:type", String)
], PayrollPeriod.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "totalGross", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "totalDeductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "totalNet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollPeriod.prototype, "employeeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "processedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollPeriod.prototype, "processedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollPeriod.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PayrollPeriod.prototype, "updatedAt", void 0);
exports.PayrollPeriod = PayrollPeriod = __decorate([
    (0, typeorm_1.Entity)('payroll_periods')
], PayrollPeriod);
let PayrollEntry = class PayrollEntry {
    id;
    periodId;
    employeeId;
    grossSalary;
    basicSalary;
    earnings;
    deductions;
    totalEarnings;
    totalDeductions;
    netSalary;
    workingDays;
    daysWorked;
    daysAbsent;
    prorationFactor;
    status;
    payslipUrl;
    createdAt;
    updatedAt;
};
exports.PayrollEntry = PayrollEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollEntry.prototype, "periodId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollEntry.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "basicSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], PayrollEntry.prototype, "earnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], PayrollEntry.prototype, "deductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "totalEarnings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "totalDeductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "netSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "workingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "daysWorked", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "daysAbsent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 4, default: 1 }),
    __metadata("design:type", Number)
], PayrollEntry.prototype, "prorationFactor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.PayrollEntryStatus, default: enums_1.PayrollEntryStatus.DRAFT }),
    __metadata("design:type", String)
], PayrollEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollEntry.prototype, "payslipUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PayrollEntry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PayrollEntry.prototype, "updatedAt", void 0);
exports.PayrollEntry = PayrollEntry = __decorate([
    (0, typeorm_1.Entity)('payroll_entries')
], PayrollEntry);
let TaxBracket = class TaxBracket {
    id;
    year;
    fromAmount;
    toAmount;
    rate;
    country;
    createdAt;
    updatedAt;
};
exports.TaxBracket = TaxBracket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TaxBracket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "fromAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "toAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], TaxBracket.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Nigeria' }),
    __metadata("design:type", String)
], TaxBracket.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TaxBracket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TaxBracket.prototype, "updatedAt", void 0);
exports.TaxBracket = TaxBracket = __decorate([
    (0, typeorm_1.Entity)('tax_brackets')
], TaxBracket);
let LoanAdvance = class LoanAdvance {
    id;
    employeeId;
    type;
    principalAmount;
    interestRate;
    tenure;
    monthlyDeduction;
    totalPaid;
    outstandingBalance;
    reason;
    disbursementDate;
    status;
    approvedBy;
    approvedAt;
    createdAt;
    updatedAt;
};
exports.LoanAdvance = LoanAdvance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LoanAdvance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LoanAdvance.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LoanType, default: enums_1.LoanType.LOAN }),
    __metadata("design:type", String)
], LoanAdvance.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "principalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "tenure", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "monthlyDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "totalPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], LoanAdvance.prototype, "outstandingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LoanAdvance.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LoanAdvance.prototype, "disbursementDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.LoanStatus, default: enums_1.LoanStatus.PENDING }),
    __metadata("design:type", String)
], LoanAdvance.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LoanAdvance.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], LoanAdvance.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LoanAdvance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LoanAdvance.prototype, "updatedAt", void 0);
exports.LoanAdvance = LoanAdvance = __decorate([
    (0, typeorm_1.Entity)('loan_advances')
], LoanAdvance);
let PayrollDeduction = class PayrollDeduction {
    id;
    employeeId;
    loanId;
    type;
    amount;
    description;
    startDate;
    applyFromPeriod;
    applyToPeriod;
    isRecurring;
    remainingMonths;
    createdAt;
    updatedAt;
};
exports.PayrollDeduction = PayrollDeduction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "loanId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], PayrollDeduction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], PayrollDeduction.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "applyFromPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "applyToPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PayrollDeduction.prototype, "isRecurring", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], PayrollDeduction.prototype, "remainingMonths", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PayrollDeduction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PayrollDeduction.prototype, "updatedAt", void 0);
exports.PayrollDeduction = PayrollDeduction = __decorate([
    (0, typeorm_1.Entity)('payroll_deductions')
], PayrollDeduction);
//# sourceMappingURL=payroll.entity.js.map