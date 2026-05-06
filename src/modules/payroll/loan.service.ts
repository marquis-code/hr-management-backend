import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanAdvance, EmployeeSalary, PayrollDeduction } from './entities/payroll.entity';
import { LoanStatus, DeductionType } from '../../common/enums';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanAdvance)
    private loanRepository: Repository<LoanAdvance>,
    @InjectRepository(EmployeeSalary)
    private salaryRepository: Repository<EmployeeSalary>,
    @InjectRepository(PayrollDeduction)
    private deductionRepository: Repository<PayrollDeduction>,
  ) {}

  async requestLoan(employeeId: string, amount: number, tenureMonths: number, reason: string) {
    const salary = await this.salaryRepository.findOne({ where: { employeeId }, order: { effectiveDate: 'DESC' } });
    if (!salary) throw new BadRequestException('Employee salary not set');

    // Max loan rule: 3x monthly net salary
    const maxAllowed = salary.grossSalary * 0.7 * 3; // Rough net 70%
    if (amount > maxAllowed) {
      throw new BadRequestException(`Requested amount exceeds maximum allowed limit (₦${maxAllowed.toLocaleString()})`);
    }

    const loan = this.loanRepository.create({
      employeeId,
      principalAmount: amount,
      interestRate: 0,
      tenure: tenureMonths,
      monthlyDeduction: amount / tenureMonths,
      outstandingBalance: amount,
      reason,
      status: LoanStatus.PENDING,
    });

    return this.loanRepository.save(loan);
  }

  async approveLoan(loanId: string, approvedBy: string) {
    const loan = await this.loanRepository.findOne({ where: { id: loanId } });
    if (!loan) throw new NotFoundException('Loan not found');

    loan.status = LoanStatus.APPROVED;
    loan.approvedBy = approvedBy;
    loan.disbursementDate = new Date();
    
    const savedLoan = await this.loanRepository.save(loan);

    // Create a recurring deduction for payroll
    await this.deductionRepository.save({
      employeeId: loan.employeeId,
      type: DeductionType.LOAN_REPAYMENT,
      amount: loan.monthlyDeduction,
      isRecurring: true,
      remainingMonths: loan.tenure,
      loanId: loan.id,
      startDate: new Date(),
      applyFromPeriod: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
    });

    return savedLoan;
  }

  async getMyLoans(employeeId: string) {
    return this.loanRepository.find({ where: { employeeId } });
  }

  async getPendingLoans() {
    return this.loanRepository.find({ where: { status: LoanStatus.PENDING }, relations: ['employee'] });
  }
}
