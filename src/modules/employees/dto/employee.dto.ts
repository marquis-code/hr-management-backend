import { IsString, IsEmail, IsEnum, IsOptional, IsDate, IsObject, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Gender, MaritalStatus, EmploymentType, EmploymentStatus, WorkLocation } from '../../../common/enums';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty()
  @IsEmail()
  personalEmail: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  workEmail?: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ enum: MaritalStatus })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty({ enum: EmploymentType })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @ApiProperty()
  @IsString()
  jobTitle: string;

  @ApiProperty()
  @IsString()
  departmentId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  positionId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  managerId?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  hireDate: Date;

  @ApiProperty({ enum: WorkLocation })
  @IsEnum(WorkLocation)
  workLocation: WorkLocation;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  address?: any;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  bankDetails?: any;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  emergencyContact?: any;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {}

export class CreateDepartmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  headId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentDepartmentId?: string;
}

export class CreatePositionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  departmentId: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  minSalary?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  maxSalary?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  responsibilities?: string[];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  requirements?: string[];
}
