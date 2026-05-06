"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferLetter = exports.Interview = exports.Application = exports.JobPosting = exports.Applicant = exports.JobRequisition = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let JobRequisition = class JobRequisition {
    id;
    title;
    departmentId;
    positionId;
    requestedBy;
    type;
    reason;
    urgency;
    numberOfOpenings;
    targetStartDate;
    status;
    approvedBy;
    approvedAt;
    jobDescription;
    requirements;
    salaryMin;
    salaryMax;
    isConfidential;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.JobRequisition = JobRequisition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobRequisition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobRequisition.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobRequisition.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobRequisition.prototype, "positionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobRequisition.prototype, "requestedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.RequisitionType, default: enums_1.RequisitionType.NEW_HIRE }),
    __metadata("design:type", String)
], JobRequisition.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JobRequisition.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Urgency, default: enums_1.Urgency.MEDIUM }),
    __metadata("design:type", String)
], JobRequisition.prototype, "urgency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], JobRequisition.prototype, "numberOfOpenings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], JobRequisition.prototype, "targetStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.RequisitionStatus, default: enums_1.RequisitionStatus.DRAFT }),
    __metadata("design:type", String)
], JobRequisition.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobRequisition.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JobRequisition.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobRequisition.prototype, "jobDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobRequisition.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], JobRequisition.prototype, "salaryMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], JobRequisition.prototype, "salaryMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], JobRequisition.prototype, "isConfidential", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobRequisition.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobRequisition.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], JobRequisition.prototype, "deletedAt", void 0);
exports.JobRequisition = JobRequisition = __decorate([
    (0, typeorm_1.Entity)('job_requisitions')
], JobRequisition);
let Applicant = class Applicant {
    id;
    firstName;
    lastName;
    email;
    phone;
    linkedinUrl;
    portfolioUrl;
    resumeUrl;
    coverLetterUrl;
    source;
    referredBy;
    createdAt;
    updatedAt;
};
exports.Applicant = Applicant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Applicant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Applicant.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Applicant.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Applicant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Applicant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Applicant.prototype, "linkedinUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Applicant.prototype, "portfolioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Applicant.prototype, "resumeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Applicant.prototype, "coverLetterUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApplicationSource, default: enums_1.ApplicationSource.WEBSITE }),
    __metadata("design:type", String)
], Applicant.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Applicant.prototype, "referredBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Applicant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Applicant.prototype, "updatedAt", void 0);
exports.Applicant = Applicant = __decorate([
    (0, typeorm_1.Entity)('applicants')
], Applicant);
let JobPosting = class JobPosting {
    id;
    requisitionId;
    title;
    slug;
    description;
    requirements;
    benefits;
    location;
    type;
    salaryDisplay;
    status;
    publishedAt;
    closedAt;
    applicationDeadline;
    totalApplications;
    createdAt;
    updatedAt;
};
exports.JobPosting = JobPosting;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JobPosting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPosting.prototype, "requisitionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobPosting.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JobPosting.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], JobPosting.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.JobLocationType, default: enums_1.JobLocationType.ONSITE }),
    __metadata("design:type", String)
], JobPosting.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JobPosting.prototype, "salaryDisplay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.JobPostingStatus, default: enums_1.JobPostingStatus.DRAFT }),
    __metadata("design:type", String)
], JobPosting.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JobPosting.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JobPosting.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], JobPosting.prototype, "applicationDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], JobPosting.prototype, "totalApplications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobPosting.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobPosting.prototype, "updatedAt", void 0);
exports.JobPosting = JobPosting = __decorate([
    (0, typeorm_1.Entity)('job_postings')
], JobPosting);
let Application = class Application {
    id;
    jobPostingId;
    jobPosting;
    applicantId;
    applicant;
    stage;
    status;
    appliedAt;
    currentStageEnteredAt;
    rejectionReason;
    notes;
    createdAt;
    updatedAt;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "jobPostingId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JobPosting),
    (0, typeorm_1.JoinColumn)({ name: 'jobPostingId' }),
    __metadata("design:type", JobPosting)
], Application.prototype, "jobPosting", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "applicantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Applicant),
    (0, typeorm_1.JoinColumn)({ name: 'applicantId' }),
    __metadata("design:type", Applicant)
], Application.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApplicationStage, default: enums_1.ApplicationStage.APPLIED }),
    __metadata("design:type", String)
], Application.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ApplicationStatus, default: enums_1.ApplicationStatus.ACTIVE }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Application.prototype, "appliedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Application.prototype, "currentStageEnteredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications')
], Application);
let Interview = class Interview {
    id;
    applicationId;
    type;
    scheduledAt;
    duration;
    locationOrLink;
    interviewers;
    status;
    feedback;
    overallRating;
    overallRecommendation;
    createdAt;
    updatedAt;
};
exports.Interview = Interview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Interview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Interview.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.InterviewType, default: enums_1.InterviewType.PHONE }),
    __metadata("design:type", String)
], Interview.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Interview.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Interview.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Interview.prototype, "locationOrLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', array: true, nullable: true }),
    __metadata("design:type", Array)
], Interview.prototype, "interviewers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.InterviewStatus, default: enums_1.InterviewStatus.SCHEDULED }),
    __metadata("design:type", String)
], Interview.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Interview.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Interview.prototype, "overallRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.InterviewRecommendation, nullable: true }),
    __metadata("design:type", String)
], Interview.prototype, "overallRecommendation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Interview.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Interview.prototype, "updatedAt", void 0);
exports.Interview = Interview = __decorate([
    (0, typeorm_1.Entity)('interviews')
], Interview);
let OfferLetter = class OfferLetter {
    id;
    applicationId;
    employeeId;
    salary;
    startDate;
    position;
    department;
    benefits;
    status;
    sentAt;
    acceptedAt;
    expiresAt;
    documentUrl;
    signedDocumentUrl;
    createdAt;
    updatedAt;
};
exports.OfferLetter = OfferLetter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OfferLetter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OfferLetter.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OfferLetter.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], OfferLetter.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], OfferLetter.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OfferLetter.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OfferLetter.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OfferLetter.prototype, "benefits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OfferStatus, default: enums_1.OfferStatus.DRAFT }),
    __metadata("design:type", String)
], OfferLetter.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OfferLetter.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OfferLetter.prototype, "acceptedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OfferLetter.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OfferLetter.prototype, "documentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OfferLetter.prototype, "signedDocumentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OfferLetter.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OfferLetter.prototype, "updatedAt", void 0);
exports.OfferLetter = OfferLetter = __decorate([
    (0, typeorm_1.Entity)('offer_letters')
], OfferLetter);
//# sourceMappingURL=recruitment.entity.js.map