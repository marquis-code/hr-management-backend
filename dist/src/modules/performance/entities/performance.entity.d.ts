import { ReviewCycleType, ReviewCycleStatus, GoalCategory, GoalStatus, ReviewType, ReviewStatus, ReviewSectionType, FeedbackType, FeedbackVisibility } from '../../../common/enums';
export declare class ReviewCycle {
    id: string;
    name: string;
    type: ReviewCycleType;
    startDate: Date;
    endDate: Date;
    selfReviewDeadline: Date;
    managerReviewDeadline: Date;
    status: ReviewCycleStatus;
    applicableTo: string;
    applicableIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class Goal {
    id: string;
    employeeId: string;
    cycleId: string;
    title: string;
    description: string;
    category: GoalCategory;
    weight: number;
    targetValue: number;
    unit: string;
    currentValue: number;
    dueDate: Date;
    status: GoalStatus;
    createdBy: string;
    approvedBy: string;
    approvedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PerformanceReview {
    id: string;
    cycleId: string;
    employeeId: string;
    reviewerId: string;
    type: ReviewType;
    status: ReviewStatus;
    overallRating: number;
    submittedAt: Date;
    acknowledgedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ReviewSection {
    id: string;
    reviewId: string;
    type: ReviewSectionType;
    questions: any;
    sectionRating: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Competency {
    id: string;
    name: string;
    description: string;
    behavioralIndicators: string[];
    category: string;
    applicableLevels: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class DevelopmentPlan {
    id: string;
    employeeId: string;
    cycleId: string;
    goal: string;
    actions: any;
    targetCompletionDate: Date;
    status: string;
    reviewedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Feedback {
    id: string;
    fromEmployeeId: string;
    toEmployeeId: string;
    type: FeedbackType;
    content: string;
    isAnonymous: boolean;
    visibility: FeedbackVisibility;
    createdAt: Date;
}
