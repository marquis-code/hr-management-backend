import { Repository } from 'typeorm';
import { PayrollPeriod, PayrollEntry, EmployeeSalary, TaxBracket, SalaryGrade } from './entities/payroll.entity';
import { Employee } from '../employees/entities/employee.entity';
export declare class PayrollService {
    private periodRepository;
    private entryRepository;
    private salaryRepository;
    private employeeRepository;
    private taxRepository;
    private salaryGradeRepository;
    constructor(periodRepository: Repository<PayrollPeriod>, entryRepository: Repository<PayrollEntry>, salaryRepository: Repository<EmployeeSalary>, employeeRepository: Repository<Employee>, taxRepository: Repository<TaxBracket>, salaryGradeRepository: Repository<SalaryGrade>);
    initiatePeriod(data: {
        subsidiaryId: string;
        month: string;
        year: number;
        cycle: string;
    }, creatorId: string): Promise<PayrollPeriod[]>;
    calculatePAYE(taxableIncome: number): Promise<number>;
    processPayroll(periodId: string, processorId: string): Promise<PayrollPeriod>;
    getPeriods(): Promise<PayrollPeriod[]>;
    getEntries(periodId: string): Promise<PayrollEntry[]>;
    bulkCreateSalaryGrades(records: any[]): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkCreateTaxBrackets(records: any[]): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    getSalaryGrades(): Promise<SalaryGrade[]>;
    getTaxBrackets(): Promise<TaxBracket[]>;
}
