import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsUUID, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PayrollPeriodStatus } from '../../../common/enums';

export class CreatePayrollPeriodDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty()
  @IsInt()
  @Min(2020)
  year: number;
}

export class ProcessPayrollDto {
  @ApiProperty()
  @IsUUID()
  periodId: string;
}

export class SalaryUpdateDto {
  @ApiProperty()
  @IsNumber()
  grossSalary: number;

  @ApiProperty()
  @IsString()
  effectiveDate: string;
}
