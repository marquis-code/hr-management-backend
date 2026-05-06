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
exports.Feedback = exports.DevelopmentPlan = exports.Competency = exports.ReviewSection = exports.PerformanceReview = exports.Goal = exports.ReviewCycle = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let ReviewCycle = class ReviewCycle {
    id;
    name;
    type;
    startDate;
    endDate;
    selfReviewDeadline;
    managerReviewDeadline;
    status;
    applicableTo;
    applicableIds;
    createdAt;
    updatedAt;
};
exports.ReviewCycle = ReviewCycle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReviewCycle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewCycle.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReviewCycleType, default: enums_1.ReviewCycleType.ANNUAL }),
    __metadata("design:type", String)
], ReviewCycle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "selfReviewDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "managerReviewDeadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReviewCycleStatus, default: enums_1.ReviewCycleStatus.DRAFT }),
    __metadata("design:type", String)
], ReviewCycle.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['ALL', 'DEPARTMENT', 'GRADE'], default: 'ALL' }),
    __metadata("design:type", String)
], ReviewCycle.prototype, "applicableTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', array: true, nullable: true }),
    __metadata("design:type", Array)
], ReviewCycle.prototype, "applicableIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReviewCycle.prototype, "updatedAt", void 0);
exports.ReviewCycle = ReviewCycle = __decorate([
    (0, typeorm_1.Entity)('review_cycles')
], ReviewCycle);
let Goal = class Goal {
    id;
    employeeId;
    cycleId;
    title;
    description;
    category;
    weight;
    targetValue;
    unit;
    currentValue;
    dueDate;
    status;
    createdBy;
    approvedBy;
    approvedAt;
    createdAt;
    updatedAt;
};
exports.Goal = Goal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Goal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Goal.prototype, "cycleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Goal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.GoalCategory, default: enums_1.GoalCategory.INDIVIDUAL }),
    __metadata("design:type", String)
], Goal.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Goal.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Goal.prototype, "targetValue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Goal.prototype, "currentValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Goal.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.GoalStatus, default: enums_1.GoalStatus.NOT_STARTED }),
    __metadata("design:type", String)
], Goal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Goal.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Goal.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Goal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Goal.prototype, "updatedAt", void 0);
exports.Goal = Goal = __decorate([
    (0, typeorm_1.Entity)('goals')
], Goal);
let PerformanceReview = class PerformanceReview {
    id;
    cycleId;
    employeeId;
    reviewerId;
    type;
    status;
    overallRating;
    submittedAt;
    acknowledgedAt;
    createdAt;
    updatedAt;
};
exports.PerformanceReview = PerformanceReview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PerformanceReview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PerformanceReview.prototype, "cycleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PerformanceReview.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PerformanceReview.prototype, "reviewerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReviewType, default: enums_1.ReviewType.SELF }),
    __metadata("design:type", String)
], PerformanceReview.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReviewStatus, default: enums_1.ReviewStatus.PENDING }),
    __metadata("design:type", String)
], PerformanceReview.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], PerformanceReview.prototype, "overallRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PerformanceReview.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PerformanceReview.prototype, "acknowledgedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PerformanceReview.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PerformanceReview.prototype, "updatedAt", void 0);
exports.PerformanceReview = PerformanceReview = __decorate([
    (0, typeorm_1.Entity)('performance_reviews')
], PerformanceReview);
let ReviewSection = class ReviewSection {
    id;
    reviewId;
    type;
    questions;
    sectionRating;
    createdAt;
    updatedAt;
};
exports.ReviewSection = ReviewSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReviewSection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewSection.prototype, "reviewId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.ReviewSectionType, default: enums_1.ReviewSectionType.COMPETENCY }),
    __metadata("design:type", String)
], ReviewSection.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], ReviewSection.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], ReviewSection.prototype, "sectionRating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReviewSection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReviewSection.prototype, "updatedAt", void 0);
exports.ReviewSection = ReviewSection = __decorate([
    (0, typeorm_1.Entity)('review_sections')
], ReviewSection);
let Competency = class Competency {
    id;
    name;
    description;
    behavioralIndicators;
    category;
    applicableLevels;
    createdAt;
    updatedAt;
};
exports.Competency = Competency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Competency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Competency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Competency.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Competency.prototype, "behavioralIndicators", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Competency.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, nullable: true }),
    __metadata("design:type", Array)
], Competency.prototype, "applicableLevels", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Competency.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Competency.prototype, "updatedAt", void 0);
exports.Competency = Competency = __decorate([
    (0, typeorm_1.Entity)('competencies')
], Competency);
let DevelopmentPlan = class DevelopmentPlan {
    id;
    employeeId;
    cycleId;
    goal;
    actions;
    targetCompletionDate;
    status;
    reviewedBy;
    createdAt;
    updatedAt;
};
exports.DevelopmentPlan = DevelopmentPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "cycleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], DevelopmentPlan.prototype, "actions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], DevelopmentPlan.prototype, "targetCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'IN_PROGRESS' }),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DevelopmentPlan.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DevelopmentPlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DevelopmentPlan.prototype, "updatedAt", void 0);
exports.DevelopmentPlan = DevelopmentPlan = __decorate([
    (0, typeorm_1.Entity)('development_plans')
], DevelopmentPlan);
let Feedback = class Feedback {
    id;
    fromEmployeeId;
    toEmployeeId;
    type;
    content;
    isAnonymous;
    visibility;
    createdAt;
};
exports.Feedback = Feedback;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Feedback.prototype, "fromEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Feedback.prototype, "toEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.FeedbackType, default: enums_1.FeedbackType.NOTE }),
    __metadata("design:type", String)
], Feedback.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Feedback.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Feedback.prototype, "isAnonymous", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.FeedbackVisibility, default: enums_1.FeedbackVisibility.PRIVATE }),
    __metadata("design:type", String)
], Feedback.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Feedback.prototype, "createdAt", void 0);
exports.Feedback = Feedback = __decorate([
    (0, typeorm_1.Entity)('feedbacks')
], Feedback);
//# sourceMappingURL=performance.entity.js.map