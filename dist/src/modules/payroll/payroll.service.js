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
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_entity_1 = require("./entities/payroll.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const enums_1 = require("../../common/enums");
let PayrollService = class PayrollService {
    periodRepository;
    entryRepository;
    salaryRepository;
    employeeRepository;
    taxRepository;
    salaryGradeRepository;
    constructor(periodRepository, entryRepository, salaryRepository, employeeRepository, taxRepository, salaryGradeRepository) {
        this.periodRepository = periodRepository;
        this.entryRepository = entryRepository;
        this.salaryRepository = salaryRepository;
        this.employeeRepository = employeeRepository;
        this.taxRepository = taxRepository;
        this.salaryGradeRepository = salaryGradeRepository;
    }
    async initiatePeriod(data, creatorId) {
        const existing = await this.periodRepository.findOne({
            where: {
                subsidiaryId: data.subsidiaryId,
                month: data.month,
                year: data.year
            }
        });
        if (existing) {
            throw new common_1.BadRequestException('Payroll period already exists for this entity, month and year.');
        }
        const period = this.periodRepository.create({
            ...data,
            month: data.month,
            status: enums_1.PayrollPeriodStatus.DRAFT,
            createdBy: creatorId,
        });
        return this.periodRepository.save(period);
    }
    async calculatePAYE(taxableIncome) {
        const brackets = [
            { limit: 300000, rate: 0.07 },
            { limit: 300000, rate: 0.11 },
            { limit: 500000, rate: 0.15 },
            { limit: 500000, rate: 0.19 },
            { limit: 1600000, rate: 0.21 },
            { limit: Infinity, rate: 0.24 },
        ];
        let tax = 0;
        let remainingIncome = taxableIncome;
        for (const bracket of brackets) {
            if (remainingIncome <= 0)
                break;
            const amountInBracket = Math.min(remainingIncome, bracket.limit);
            tax += amountInBracket * bracket.rate;
            remainingIncome -= amountInBracket;
        }
        return tax / 12;
    }
    async processPayroll(periodId, processorId) {
        const period = await this.periodRepository.findOne({ where: { id: periodId } });
        if (!period)
            throw new common_1.NotFoundException('Period not found');
        if (period.status !== enums_1.PayrollPeriodStatus.DRAFT)
            throw new common_1.BadRequestException('Payroll already processed');
        const employees = await this.employeeRepository.find({
            where: { employmentStatus: enums_1.EmploymentStatus.ACTIVE }
        });
        for (const employee of employees) {
            const salary = await this.salaryRepository.findOne({
                where: { employeeId: employee.id },
                order: { effectiveDate: 'DESC' }
            });
            if (!salary)
                continue;
            const gross = parseFloat(salary.grossSalary.toString());
            const basic = gross * 0.5;
            const housing = gross * 0.3;
            const transport = gross * 0.2;
            const pensionEE = (basic + housing + transport) * 0.08;
            const nhf = basic * 0.025;
            const cra = Math.max(200000, gross * 0.01) + (gross * 0.2);
            const taxableIncome = Math.max(0, gross * 12 - cra - (pensionEE * 12) - (nhf * 12));
            const paye = await this.calculatePAYE(taxableIncome);
            const totalDeductions = pensionEE + nhf + paye;
            const net = gross - totalDeductions;
            await this.entryRepository.save({
                periodId,
                employeeId: employee.id,
                grossSalary: gross,
                basicSalary: basic,
                totalEarnings: gross,
                totalDeductions,
                netSalary: net,
                earnings: { basic, housing, transport },
                deductions: { paye, pension: pensionEE, nhf },
                status: enums_1.PayrollEntryStatus.DRAFT,
                workingDays: 22,
                daysWorked: 22,
            });
        }
        period.status = enums_1.PayrollPeriodStatus.PROCESSING;
        period.processedAt = new Date();
        period.processedBy = processorId;
        return this.periodRepository.save(period);
    }
    async getPeriods() {
        return this.periodRepository.find({ order: { year: 'DESC', month: 'DESC' } });
    }
    async getEntries(periodId) {
        return this.entryRepository.find({
            where: { periodId },
            relations: ['employee']
        });
    }
    async bulkCreateSalaryGrades(records) {
        const results = { created: 0, skipped: 0, errors: [] };
        for (const record of records) {
            try {
                const grade = this.salaryGradeRepository.create({
                    level: record.level,
                    minSalary: parseFloat(record.minSalary),
                    maxSalary: parseFloat(record.maxSalary),
                    currency: record.currency || 'NGN',
                });
                await this.salaryGradeRepository.save(grade);
                results.created++;
            }
            catch (err) {
                results.skipped++;
                results.errors.push(`Level ${record.level}: ${err.message}`);
            }
        }
        return results;
    }
    async bulkCreateTaxBrackets(records) {
        const results = { created: 0, skipped: 0, errors: [] };
        for (const record of records) {
            try {
                const bracket = this.taxRepository.create({
                    year: parseInt(record.year),
                    fromAmount: parseFloat(record.fromAmount),
                    toAmount: parseFloat(record.toAmount),
                    rate: parseFloat(record.rate),
                    country: record.country || 'Nigeria',
                });
                await this.taxRepository.save(bracket);
                results.created++;
            }
            catch (err) {
                results.skipped++;
                results.errors.push(`Year ${record.year}: ${err.message}`);
            }
        }
        return results;
    }
    async getSalaryGrades() {
        return this.salaryGradeRepository.find({ order: { level: 'ASC' } });
    }
    async getTaxBrackets() {
        return this.taxRepository.find({ order: { year: 'DESC', fromAmount: 'ASC' } });
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_entity_1.PayrollPeriod)),
    __param(1, (0, typeorm_1.InjectRepository)(payroll_entity_1.PayrollEntry)),
    __param(2, (0, typeorm_1.InjectRepository)(payroll_entity_1.EmployeeSalary)),
    __param(3, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(4, (0, typeorm_1.InjectRepository)(payroll_entity_1.TaxBracket)),
    __param(5, (0, typeorm_1.InjectRepository)(payroll_entity_1.SalaryGrade)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map