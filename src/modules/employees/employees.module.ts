import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee, Department, Position, EmploymentHistory, Subsidiary } from './entities';
import { InductionModule } from '../induction/induction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Department, Position, EmploymentHistory, Subsidiary]),
    InductionModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
