import { InductionProgramStatus } from '../../../common/enums';
export declare class CreateInductionLessonDto {
    title: string;
    description?: string;
    videoUrl?: string;
    durationMinutes?: number;
    sortOrder?: number;
}
export declare class CreateInductionQuestionDto {
    question: string;
    options: string[];
    correctOptionIndex: number;
    sortOrder?: number;
}
export declare class CreateInductionModuleDto {
    title: string;
    description?: string;
    sortOrder?: number;
    lessons?: CreateInductionLessonDto[];
    questions?: CreateInductionQuestionDto[];
}
export declare class CreateInductionProgramDto {
    title: string;
    description?: string;
    subsidiaryId?: string;
    passingScore?: number;
    modules?: CreateInductionModuleDto[];
}
export declare class UpdateInductionProgramDto {
    title?: string;
    description?: string;
    subsidiaryId?: string;
    passingScore?: number;
    status?: InductionProgramStatus;
}
export declare class SubmitModuleAssessmentDto {
    moduleId: string;
    answers: number[];
}
export declare class MarkLessonWatchedDto {
    lessonId: string;
}
export declare class AddModuleDto {
    title: string;
    description?: string;
    sortOrder?: number;
}
export declare class AddLessonDto {
    title: string;
    description?: string;
    videoUrl?: string;
    durationMinutes?: number;
    sortOrder?: number;
}
export declare class AddQuestionDto {
    question: string;
    options: string[];
    correctOptionIndex: number;
    sortOrder?: number;
}
