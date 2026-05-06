import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsUUID, IsInt, IsArray, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RequisitionType, Urgency, JobLocationType, ApplicationSource } from '../../../common/enums';

export class CreateRequisitionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsUUID()
  departmentId: string;

  @ApiProperty()
  @IsUUID()
  positionId: string;

  @ApiProperty({ enum: RequisitionType })
  @IsEnum(RequisitionType)
  type: RequisitionType;

  @ApiProperty({ enum: Urgency })
  @IsEnum(Urgency)
  urgency: Urgency;

  @ApiProperty()
  @IsInt()
  numberOfOpenings: number;

  @ApiProperty()
  @IsString()
  targetStartDate: string;
}

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  resumeUrl?: string;

  @ApiProperty({ enum: ApplicationSource })
  @IsEnum(ApplicationSource)
  source: ApplicationSource;
}
