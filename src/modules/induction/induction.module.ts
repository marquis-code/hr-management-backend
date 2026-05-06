import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  InductionProgram, 
  InductionSection, 
  InductionLesson, 
  InductionQuestion, 
  EmployeeInduction, 
  SectionProgress 
} from './entities/induction.entity';
import { Employee } from '../employees/entities/employee.entity';
import { InductionService } from './induction.service';
import { InductionController } from './induction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InductionProgram,
      InductionSection,
      InductionLesson,
      InductionQuestion,
      EmployeeInduction,
      SectionProgress,
      Employee
    ])
  ],
  controllers: [InductionController],
  providers: [InductionService],
  exports: [InductionService],
})
export class InductionModule {}
