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
exports.OnboardingProgress = exports.OnboardingAssessment = exports.OnboardingLesson = exports.OnboardingCourse = exports.OnboardingTemplate = exports.OnboardingTask = exports.OnboardingPlan = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let OnboardingPlan = class OnboardingPlan {
    id;
    employeeId;
    templateId;
    startDate;
    targetCompletionDate;
    status;
    completionPercentage;
    createdAt;
    updatedAt;
};
exports.OnboardingPlan = OnboardingPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingPlan.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingPlan.prototype, "templateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], OnboardingPlan.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], OnboardingPlan.prototype, "targetCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OnboardingPlanStatus, default: enums_1.OnboardingPlanStatus.NOT_STARTED }),
    __metadata("design:type", String)
], OnboardingPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OnboardingPlan.prototype, "completionPercentage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingPlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingPlan.prototype, "updatedAt", void 0);
exports.OnboardingPlan = OnboardingPlan = __decorate([
    (0, typeorm_1.Entity)('onboarding_plans')
], OnboardingPlan);
let OnboardingTask = class OnboardingTask {
    id;
    planId;
    title;
    description;
    category;
    assignedTo;
    dueDate;
    completedAt;
    status;
    isRequired;
    notes;
    attachmentUrl;
    createdAt;
    updatedAt;
};
exports.OnboardingTask = OnboardingTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingTask.prototype, "planId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingTask.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OnboardingTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OnboardingTaskCategory, default: enums_1.OnboardingTaskCategory.DOCUMENTS }),
    __metadata("design:type", String)
], OnboardingTask.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingTask.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], OnboardingTask.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OnboardingTask.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.OnboardingTaskStatus, default: enums_1.OnboardingTaskStatus.PENDING }),
    __metadata("design:type", String)
], OnboardingTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OnboardingTask.prototype, "isRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OnboardingTask.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingTask.prototype, "attachmentUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingTask.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingTask.prototype, "updatedAt", void 0);
exports.OnboardingTask = OnboardingTask = __decorate([
    (0, typeorm_1.Entity)('onboarding_tasks')
], OnboardingTask);
let OnboardingTemplate = class OnboardingTemplate {
    id;
    name;
    description;
    tasks;
    isActive;
    createdAt;
    updatedAt;
};
exports.OnboardingTemplate = OnboardingTemplate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingTemplate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OnboardingTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], OnboardingTemplate.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OnboardingTemplate.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingTemplate.prototype, "updatedAt", void 0);
exports.OnboardingTemplate = OnboardingTemplate = __decorate([
    (0, typeorm_1.Entity)('onboarding_templates')
], OnboardingTemplate);
let OnboardingCourse = class OnboardingCourse {
    id;
    title;
    description;
    departmentId;
    lessons;
    assessments;
    isActive;
    createdAt;
    updatedAt;
};
exports.OnboardingCourse = OnboardingCourse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingCourse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingCourse.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OnboardingCourse.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingCourse.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OnboardingLesson, lesson => lesson.course),
    __metadata("design:type", Array)
], OnboardingCourse.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OnboardingAssessment, assessment => assessment.course),
    __metadata("design:type", Array)
], OnboardingCourse.prototype, "assessments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OnboardingCourse.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingCourse.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingCourse.prototype, "updatedAt", void 0);
exports.OnboardingCourse = OnboardingCourse = __decorate([
    (0, typeorm_1.Entity)('onboarding_courses')
], OnboardingCourse);
let OnboardingLesson = class OnboardingLesson {
    id;
    courseId;
    course;
    title;
    content;
    videoUrl;
    order;
};
exports.OnboardingLesson = OnboardingLesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingLesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingLesson.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OnboardingCourse, course => course.lessons),
    __metadata("design:type", OnboardingCourse)
], OnboardingLesson.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingLesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OnboardingLesson.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingLesson.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OnboardingLesson.prototype, "order", void 0);
exports.OnboardingLesson = OnboardingLesson = __decorate([
    (0, typeorm_1.Entity)('onboarding_lessons')
], OnboardingLesson);
let OnboardingAssessment = class OnboardingAssessment {
    id;
    courseId;
    course;
    question;
    options;
    correctOptionIndex;
};
exports.OnboardingAssessment = OnboardingAssessment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingAssessment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingAssessment.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OnboardingCourse, course => course.assessments),
    __metadata("design:type", OnboardingCourse)
], OnboardingAssessment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingAssessment.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], OnboardingAssessment.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OnboardingAssessment.prototype, "correctOptionIndex", void 0);
exports.OnboardingAssessment = OnboardingAssessment = __decorate([
    (0, typeorm_1.Entity)('onboarding_assessments')
], OnboardingAssessment);
let OnboardingProgress = class OnboardingProgress {
    id;
    employeeId;
    courseId;
    completionPercentage;
    assessmentScore;
    isAssessmentPassed;
    updatedAt;
};
exports.OnboardingProgress = OnboardingProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OnboardingProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingProgress.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingProgress.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], OnboardingProgress.prototype, "completionPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], OnboardingProgress.prototype, "assessmentScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OnboardingProgress.prototype, "isAssessmentPassed", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingProgress.prototype, "updatedAt", void 0);
exports.OnboardingProgress = OnboardingProgress = __decorate([
    (0, typeorm_1.Entity)('onboarding_progress')
], OnboardingProgress);
//# sourceMappingURL=onboarding.entity.js.map