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
exports.LoanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_entity_1 = require("./entities/payroll.entity");
const enums_1 = require("../../common/enums");
let LoanService = class LoanService {
    loanRepository;
    salaryRepository;
    deductionRepository;
    constructor(loanRepository, salaryRepository, deductionRepository) {
        this.loanRepository = loanRepository;
        this.salaryRepository = salaryRepository;
        this.deductionRepository = deductionRepository;
    }
    async requestLoan(employeeId, amount, tenureMonths, reason) {
        const salary = await this.salaryRepository.findOne({ where: { employeeId }, order: { effectiveDate: 'DESC' } });
        if (!salary)
            throw new common_1.BadRequestException('Employee salary not set');
        const maxAllowed = salary.grossSalary * 0.7 * 3;
        if (amount > maxAllowed) {
            throw new common_1.BadRequestException(`Requested amount exceeds maximum allowed limit (₦${maxAllowed.toLocaleString()})`);
        }
        const loan = this.loanRepository.create({
            employeeId,
            principalAmount: amount,
            interestRate: 0,
            tenure: tenureMonths,
            monthlyDeduction: amount / tenureMonths,
            outstandingBalance: amount,
            reason,
            status: enums_1.LoanStatus.PENDING,
        });
        return this.loanRepository.save(loan);
    }
    async approveLoan(loanId, approvedBy) {
        const loan = await this.loanRepository.findOne({ where: { id: loanId } });
        if (!loan)
            throw new common_1.NotFoundException('Loan not found');
        loan.status = enums_1.LoanStatus.APPROVED;
        loan.approvedBy = approvedBy;
        loan.disbursementDate = new Date();
        const savedLoan = await this.loanRepository.save(loan);
        await this.deductionRepository.save({
            employeeId: loan.employeeId,
            type: enums_1.DeductionType.LOAN_REPAYMENT,
            amount: loan.monthlyDeduction,
            isRecurring: true,
            remainingMonths: loan.tenure,
            loanId: loan.id,
            startDate: new Date(),
            applyFromPeriod: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
        });
        return savedLoan;
    }
    async getMyLoans(employeeId) {
        return this.loanRepository.find({ where: { employeeId } });
    }
    async getPendingLoans() {
        return this.loanRepository.find({ where: { status: enums_1.LoanStatus.PENDING }, relations: ['employee'] });
    }
};
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_entity_1.LoanAdvance)),
    __param(1, (0, typeorm_1.InjectRepository)(payroll_entity_1.EmployeeSalary)),
    __param(2, (0, typeorm_1.InjectRepository)(payroll_entity_1.PayrollDeduction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LoanService);
//# sourceMappingURL=loan.service.js.map