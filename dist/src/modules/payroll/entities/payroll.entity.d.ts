import { PayrollPeriodStatus, PayrollEntryStatus, LoanType, LoanStatus } from '../../../common/enums';
export declare class SalaryGrade {
    id: string;
    level: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class EmployeeSalary {
    id: string;
    employeeId: string;
    grossSalary: number;
    currency: string;
    components: any;
    effectiveDate: Date;
    endDate: Date;
    approvedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PayrollPeriod {
    id: string;
    month: number;
    year: number;
    startDate: Date;
    endDate: Date;
    status: PayrollPeriodStatus;
    totalGross: number;
    totalDeductions: number;
    totalNet: number;
    employeeCount: number;
    processedAt: Date;
    processedBy: string;
    approvedAt: Date;
    approvedBy: string;
    paidAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PayrollEntry {
    id: string;
    periodId: string;
    employeeId: string;
    grossSalary: number;
    basicSalary: number;
    earnings: any;
    deductions: any;
    totalEarnings: number;
    totalDeductions: number;
    netSalary: number;
    workingDays: number;
    daysWorked: number;
    daysAbsent: number;
    prorationFactor: number;
    status: PayrollEntryStatus;
    payslipUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class TaxBracket {
    id: string;
    year: number;
    fromAmount: number;
    toAmount: number;
    rate: number;
    country: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LoanAdvance {
    id: string;
    employeeId: string;
    type: LoanType;
    principalAmount: number;
    interestRate: number;
    tenure: number;
    monthlyDeduction: number;
    totalPaid: number;
    outstandingBalance: number;
    reason: string;
    disbursementDate: Date;
    status: LoanStatus;
    approvedBy: string;
    approvedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PayrollDeduction {
    id: string;
    employeeId: string;
    loanId: string;
    type: string;
    amount: number;
    description: string;
    startDate: Date;
    applyFromPeriod: string;
    applyToPeriod: string;
    isRecurring: boolean;
    remainingMonths: number;
    createdAt: Date;
    updatedAt: Date;
}
