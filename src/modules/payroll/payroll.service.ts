import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { 
  PayrollPeriod, 
  PayrollEntry, 
  EmployeeSalary, 
  TaxBracket, 
  LoanAdvance, 
  PayrollDeduction,
  SalaryGrade
} from './entities/payroll.entity';
import { Employee } from '../employees/entities/employee.entity';
import { PayrollPeriodStatus, PayrollEntryStatus, EmploymentStatus } from '../../common/enums';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(PayrollPeriod)
    private periodRepository: Repository<PayrollPeriod>,
    @InjectRepository(PayrollEntry)
    private entryRepository: Repository<PayrollEntry>,
    @InjectRepository(EmployeeSalary)
    private salaryRepository: Repository<EmployeeSalary>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(TaxBracket)
    private taxRepository: Repository<TaxBracket>,
    @InjectRepository(SalaryGrade)
    private salaryGradeRepository: Repository<SalaryGrade>,
  ) {}

  async initiatePeriod(data: { subsidiaryId: string; month: string; year: number; cycle: string }, creatorId: string) {
    const existing = await this.periodRepository.findOne({
      where: { 
        subsidiaryId: data.subsidiaryId, 
        month: data.month as any, 
        year: data.year 
      }
    });

    if (existing) {
      throw new BadRequestException('Payroll period already exists for this entity, month and year.');
    }

    const period = this.periodRepository.create({
      ...data,
      month: data.month as any,
      status: PayrollPeriodStatus.DRAFT,
      createdBy: creatorId,
    });

    return this.periodRepository.save(period);
  }

  async calculatePAYE(taxableIncome: number): Promise<number> {
    // Nigeria Progressive Tax 2024
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
      if (remainingIncome <= 0) break;
      const amountInBracket = Math.min(remainingIncome, bracket.limit);
      tax += amountInBracket * bracket.rate;
      remainingIncome -= amountInBracket;
    }

    return tax / 12; // Monthly tax
  }

  async processPayroll(periodId: string, processorId: string) {
    const period = await this.periodRepository.findOne({ where: { id: periodId } });
    if (!period) throw new NotFoundException('Period not found');
    if (period.status !== PayrollPeriodStatus.DRAFT) throw new BadRequestException('Payroll already processed');

    const employees = await this.employeeRepository.find({
      where: { employmentStatus: EmploymentStatus.ACTIVE }
    });

    for (const employee of employees) {
      const salary = await this.salaryRepository.findOne({
        where: { employeeId: employee.id },
        order: { effectiveDate: 'DESC' }
      });

      if (!salary) continue;

      const gross = parseFloat(salary.grossSalary.toString());
      const basic = gross * 0.5; // Example split: 50% basic
      const housing = gross * 0.3;
      const transport = gross * 0.2;

      // Deductions
      const pensionEE = (basic + housing + transport) * 0.08;
      const nhf = basic * 0.025;
      
      // Consolidated Relief Allowance (CRA)
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
        status: PayrollEntryStatus.DRAFT,
        workingDays: 22, // Static for now
        daysWorked: 22,
      });
    }

    period.status = PayrollPeriodStatus.PROCESSING;
    period.processedAt = new Date();
    period.processedBy = processorId;
    return this.periodRepository.save(period);
  }

  async getPeriods() {
    return this.periodRepository.find({ order: { year: 'DESC', month: 'DESC' } });
  }

  async getEntries(periodId: string) {
    return this.entryRepository.find({
      where: { periodId },
      relations: ['employee']
    });
  }

  // Bulk import methods
  async bulkCreateSalaryGrades(records: any[]) {
    const results = { created: 0, skipped: 0, errors: [] as string[] };
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
      } catch (err: any) {
        results.skipped++;
        results.errors.push(`Level ${record.level}: ${err.message}`);
      }
    }
    return results;
  }

  async bulkCreateTaxBrackets(records: any[]) {
    const results = { created: 0, skipped: 0, errors: [] as string[] };
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
      } catch (err: any) {
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
}
