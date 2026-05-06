import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDate, IsNumber, IsUUID, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CheckInMethod, AttendanceStatus, LeaveRequestStatus } from '../../../common/enums';

export class CheckInDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  location?: { lat: number, lng: number, address: string };

  @ApiProperty({ enum: CheckInMethod })
  @IsEnum(CheckInMethod)
  method: CheckInMethod;
}

export class CreateLeaveRequestDto {
  @ApiProperty()
  @IsUUID()
  leaveTypeId: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  handoverEmployeeId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  handoverNote?: string;
}

export class LeaveActionDto {
  @ApiProperty({ enum: LeaveRequestStatus })
  @IsEnum(LeaveRequestStatus)
  status: LeaveRequestStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  comment?: string;
}
