import { InductionProgramStatus, InductionStatus } from '../../../common/enums';
export declare class InductionProgram {
    id: string;
    title: string;
    description: string;
    subsidiaryId: string;
    status: InductionProgramStatus;
    passingScore: number;
    sections: InductionSection[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class InductionSection {
    id: string;
    programId: string;
    program: InductionProgram;
    title: string;
    description: string;
    sortOrder: number;
    lessons: InductionLesson[];
    questions: InductionQuestion[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class InductionLesson {
    id: string;
    sectionId: string;
    section: InductionSection;
    title: string;
    description: string;
    videoUrl: string;
    durationMinutes: number;
    sortOrder: number;
    createdAt: Date;
}
export declare class InductionQuestion {
    id: string;
    sectionId: string;
    section: InductionSection;
    question: string;
    options: string[];
    correctOptionIndex: number;
    sortOrder: number;
}
export declare class EmployeeInduction {
    id: string;
    employeeId: string;
    programId: string;
    program: InductionProgram;
    status: InductionStatus;
    progressPercentage: number;
    assessmentScore: number;
    startedAt: Date;
    completedAt: Date;
    sectionProgress: SectionProgress[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class SectionProgress {
    id: string;
    enrollmentId: string;
    enrollment: EmployeeInduction;
    sectionId: string;
    section: InductionSection;
    watchedLessonIds: string[];
    allLessonsWatched: boolean;
    assessmentCompleted: boolean;
    assessmentScore: number;
    assessmentPassed: boolean;
    answers: number[];
    completedAt: Date;
    updatedAt: Date;
}
