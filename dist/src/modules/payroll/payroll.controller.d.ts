import { PayrollService } from './payroll.service';
import { User } from '../auth/entities/user.entity';
import { ProcessPayrollDto } from './dto';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    initiate(dto: {
        subsidiaryId: string;
        month: string;
        year: number;
        cycle: string;
    }, user: User): Promise<import("./entities").PayrollPeriod[]>;
    getPeriods(): Promise<import("./entities").PayrollPeriod[]>;
    getEntries(id: string): Promise<import("./entities").PayrollEntry[]>;
    process(dto: ProcessPayrollDto, user: User): Promise<import("./entities").PayrollPeriod>;
    bulkImportSalaryGrades(body: {
        records: any[];
    }): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkImportTaxBrackets(body: {
        records: any[];
    }): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    exportSalaryGrades(): Promise<import("./entities").SalaryGrade[]>;
    exportTaxBrackets(): Promise<import("./entities").TaxBracket[]>;
}
