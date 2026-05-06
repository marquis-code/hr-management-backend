import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  SalaryGrade, 
  EmployeeSalary, 
  PayrollPeriod, 
  PayrollEntry, 
  TaxBracket, 
  LoanAdvance, 
  PayrollDeduction 
} from './entities';
import { PayrollService } from './payroll.service';
import { LoanService } from './loan.service';
import { PayrollController } from './payroll.controller';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SalaryGrade, 
      EmployeeSalary, 
      PayrollPeriod, 
      PayrollEntry, 
      TaxBracket, 
      LoanAdvance, 
      PayrollDeduction,
      Employee
    ])
  ],
  controllers: [PayrollController],
  providers: [PayrollService, LoanService],
  exports: [PayrollService, LoanService],
})
export class PayrollModule {}
