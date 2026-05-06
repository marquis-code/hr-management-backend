import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PayrollPeriodStatus, PayrollEntryStatus, LoanType, LoanStatus } from '../../../common/enums';

@Entity('salary_grades')
export class SalaryGrade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  minSalary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  maxSalary: number;

  @Column({ default: 'NGN' })
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('employee_salaries')
export class EmployeeSalary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  grossSalary: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column({ type: 'jsonb' })
  components: any;

  @Column({ type: 'date' })
  effectiveDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column()
  approvedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('payroll_periods')
export class PayrollPeriod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'enum', enum: PayrollPeriodStatus, default: PayrollPeriodStatus.DRAFT })
  status: PayrollPeriodStatus;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalGross: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalDeductions: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalNet: number;

  @Column({ type: 'int', default: 0 })
  employeeCount: number;

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date;

  @Column({ nullable: true })
  processedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('payroll_entries')
export class PayrollEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  periodId: string;

  @Column()
  employeeId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  grossSalary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  basicSalary: number;

  @Column({ type: 'jsonb' })
  earnings: any;

  @Column({ type: 'jsonb' })
  deductions: any;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalEarnings: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalDeductions: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  netSalary: number;

  @Column({ type: 'int' })
  workingDays: number;

  @Column({ type: 'int' })
  daysWorked: number;

  @Column({ type: 'int', default: 0 })
  daysAbsent: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 1 })
  prorationFactor: number;

  @Column({ type: 'enum', enum: PayrollEntryStatus, default: PayrollEntryStatus.DRAFT })
  status: PayrollEntryStatus;

  @Column({ nullable: true })
  payslipUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('tax_brackets')
export class TaxBracket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  fromAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  toAmount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  rate: number;

  @Column({ default: 'Nigeria' })
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('loan_advances')
export class LoanAdvance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ type: 'enum', enum: LoanType, default: LoanType.LOAN })
  type: LoanType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  principalAmount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interestRate: number;

  @Column({ type: 'int' })
  tenure: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monthlyDeduction: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalPaid: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  outstandingBalance: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'timestamp', nullable: true })
  disbursementDate: Date;

  @Column({ type: 'enum', enum: LoanStatus, default: LoanStatus.PENDING })
  status: LoanStatus;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('payroll_deductions')
export class PayrollDeduction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ nullable: true })
  loanId: string;

  @Column()
  type: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column()
  applyFromPeriod: string;

  @Column({ nullable: true })
  applyToPeriod: string;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ type: 'int', nullable: true })
  remainingMonths: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
