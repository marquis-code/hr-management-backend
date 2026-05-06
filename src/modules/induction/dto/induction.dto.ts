import { IsString, IsOptional, IsArray, IsNumber, IsEnum, ValidateNested, IsUUID, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InductionProgramStatus } from '../../../common/enums';

export class CreateInductionLessonDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() videoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() durationMinutes?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;
}

export class CreateInductionQuestionDto {
  @ApiProperty() @IsString() question: string;
  @ApiProperty() @IsArray() options: string[];
  @ApiProperty() @IsNumber() correctOptionIndex: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;
}

export class CreateInductionModuleDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;

  @ApiPropertyOptional({ type: [CreateInductionLessonDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateInductionLessonDto)
  lessons?: CreateInductionLessonDto[];

  @ApiPropertyOptional({ type: [CreateInductionQuestionDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateInductionQuestionDto)
  questions?: CreateInductionQuestionDto[];
}

export class CreateInductionProgramDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() subsidiaryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(100) passingScore?: number;

  @ApiPropertyOptional({ type: [CreateInductionModuleDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateInductionModuleDto)
  modules?: CreateInductionModuleDto[];
}

export class UpdateInductionProgramDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() subsidiaryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(100) passingScore?: number;
  @ApiPropertyOptional() @IsOptional() @IsEnum(InductionProgramStatus) status?: InductionProgramStatus;
}

export class SubmitModuleAssessmentDto {
  @ApiProperty() @IsUUID() moduleId: string;
  @ApiProperty() @IsArray() answers: number[];
}

export class MarkLessonWatchedDto {
  @ApiProperty() @IsUUID() lessonId: string;
}

export class AddModuleDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;
}

export class AddLessonDto {
  @ApiProperty() @IsString() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() videoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() durationMinutes?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;
}

export class AddQuestionDto {
  @ApiProperty() @IsString() question: string;
  @ApiProperty() @IsArray() options: string[];
  @ApiProperty() @IsNumber() correctOptionIndex: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() sortOrder?: number;
}
