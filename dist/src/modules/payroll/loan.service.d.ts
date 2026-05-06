import { Repository } from 'typeorm';
import { LoanAdvance, EmployeeSalary, PayrollDeduction } from './entities/payroll.entity';
export declare class LoanService {
    private loanRepository;
    private salaryRepository;
    private deductionRepository;
    constructor(loanRepository: Repository<LoanAdvance>, salaryRepository: Repository<EmployeeSalary>, deductionRepository: Repository<PayrollDeduction>);
    requestLoan(employeeId: string, amount: number, tenureMonths: number, reason: string): Promise<LoanAdvance>;
    approveLoan(loanId: string, approvedBy: string): Promise<LoanAdvance>;
    getMyLoans(employeeId: string): Promise<LoanAdvance[]>;
    getPendingLoans(): Promise<LoanAdvance[]>;
}
