import { RequisitionStatus, RequisitionType, Urgency, JobPostingStatus, JobLocationType, ApplicationSource, ApplicationStage, ApplicationStatus, InterviewType, InterviewStatus, InterviewRecommendation, OfferStatus } from '../../../common/enums';
export declare class JobRequisition {
    id: string;
    title: string;
    departmentId: string;
    positionId: string;
    requestedBy: string;
    type: RequisitionType;
    reason: string;
    urgency: Urgency;
    numberOfOpenings: number;
    targetStartDate: Date;
    status: RequisitionStatus;
    approvedBy: string;
    approvedAt: Date;
    jobDescription: string;
    requirements: string;
    salaryMin: number;
    salaryMax: number;
    isConfidential: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class Applicant {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    portfolioUrl: string;
    resumeUrl: string;
    coverLetterUrl: string;
    source: ApplicationSource;
    referredBy: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class JobPosting {
    id: string;
    requisitionId: string;
    title: string;
    slug: string;
    description: string;
    requirements: string;
    benefits: string;
    location: string;
    type: JobLocationType;
    salaryDisplay: string;
    status: JobPostingStatus;
    publishedAt: Date;
    closedAt: Date;
    applicationDeadline: Date;
    totalApplications: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Application {
    id: string;
    jobPostingId: string;
    jobPosting: JobPosting;
    applicantId: string;
    applicant: Applicant;
    stage: ApplicationStage;
    status: ApplicationStatus;
    appliedAt: Date;
    currentStageEnteredAt: Date;
    rejectionReason: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Interview {
    id: string;
    applicationId: string;
    type: InterviewType;
    scheduledAt: Date;
    duration: number;
    locationOrLink: string;
    interviewers: string[];
    status: InterviewStatus;
    feedback: any;
    overallRating: number;
    overallRecommendation: InterviewRecommendation;
    createdAt: Date;
    updatedAt: Date;
}
export declare class OfferLetter {
    id: string;
    applicationId: string;
    employeeId: string;
    salary: number;
    startDate: Date;
    position: string;
    department: string;
    benefits: string;
    status: OfferStatus;
    sentAt: Date;
    acceptedAt: Date;
    expiresAt: Date;
    documentUrl: string;
    signedDocumentUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
