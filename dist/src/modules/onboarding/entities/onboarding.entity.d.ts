import { OnboardingTaskCategory, OnboardingTaskStatus, OnboardingPlanStatus } from '../../../common/enums';
export declare class OnboardingPlan {
    id: string;
    employeeId: string;
    templateId: string;
    startDate: Date;
    targetCompletionDate: Date;
    status: OnboardingPlanStatus;
    completionPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OnboardingTask {
    id: string;
    planId: string;
    title: string;
    description: string;
    category: OnboardingTaskCategory;
    assignedTo: string;
    dueDate: Date;
    completedAt: Date;
    status: OnboardingTaskStatus;
    isRequired: boolean;
    notes: string;
    attachmentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OnboardingTemplate {
    id: string;
    name: string;
    description: string;
    tasks: any;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OnboardingCourse {
    id: string;
    title: string;
    description: string;
    departmentId: string;
    lessons: OnboardingLesson[];
    assessments: OnboardingAssessment[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OnboardingLesson {
    id: string;
    courseId: string;
    course: OnboardingCourse;
    title: string;
    content: string;
    videoUrl: string;
    order: number;
}
export declare class OnboardingAssessment {
    id: string;
    courseId: string;
    course: OnboardingCourse;
    question: string;
    options: string[];
    correctOptionIndex: number;
}
export declare class OnboardingProgress {
    id: string;
    employeeId: string;
    courseId: string;
    completionPercentage: number;
    assessmentScore: number;
    isAssessmentPassed: boolean;
    updatedAt: Date;
}
