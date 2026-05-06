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
exports.SectionProgress = exports.EmployeeInduction = exports.InductionQuestion = exports.InductionLesson = exports.InductionSection = exports.InductionProgram = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
let InductionProgram = class InductionProgram {
    id;
    title;
    description;
    subsidiaryId;
    status;
    passingScore;
    sections;
    createdBy;
    createdAt;
    updatedAt;
};
exports.InductionProgram = InductionProgram;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InductionProgram.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionProgram.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InductionProgram.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InductionProgram.prototype, "subsidiaryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.InductionProgramStatus, default: enums_1.InductionProgramStatus.DRAFT }),
    __metadata("design:type", String)
], InductionProgram.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 70 }),
    __metadata("design:type", Number)
], InductionProgram.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InductionSection, (sec) => sec.program, { cascade: true }),
    __metadata("design:type", Array)
], InductionProgram.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InductionProgram.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InductionProgram.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InductionProgram.prototype, "updatedAt", void 0);
exports.InductionProgram = InductionProgram = __decorate([
    (0, typeorm_1.Entity)('induction_programs')
], InductionProgram);
let InductionSection = class InductionSection {
    id;
    programId;
    program;
    title;
    description;
    sortOrder;
    lessons;
    questions;
    createdAt;
    updatedAt;
};
exports.InductionSection = InductionSection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InductionSection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionSection.prototype, "programId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InductionProgram, (prog) => prog.sections, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'programId' }),
    __metadata("design:type", InductionProgram)
], InductionSection.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionSection.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InductionSection.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], InductionSection.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InductionLesson, (lesson) => lesson.section, { cascade: true }),
    __metadata("design:type", Array)
], InductionSection.prototype, "lessons", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InductionQuestion, (q) => q.section, { cascade: true }),
    __metadata("design:type", Array)
], InductionSection.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InductionSection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InductionSection.prototype, "updatedAt", void 0);
exports.InductionSection = InductionSection = __decorate([
    (0, typeorm_1.Entity)('induction_sections')
], InductionSection);
let InductionLesson = class InductionLesson {
    id;
    sectionId;
    section;
    title;
    description;
    videoUrl;
    durationMinutes;
    sortOrder;
    createdAt;
};
exports.InductionLesson = InductionLesson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InductionLesson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionLesson.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InductionSection, (sec) => sec.lessons, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sectionId' }),
    __metadata("design:type", InductionSection)
], InductionLesson.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionLesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InductionLesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InductionLesson.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], InductionLesson.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], InductionLesson.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InductionLesson.prototype, "createdAt", void 0);
exports.InductionLesson = InductionLesson = __decorate([
    (0, typeorm_1.Entity)('induction_lessons')
], InductionLesson);
let InductionQuestion = class InductionQuestion {
    id;
    sectionId;
    section;
    question;
    options;
    correctOptionIndex;
    sortOrder;
};
exports.InductionQuestion = InductionQuestion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InductionQuestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InductionQuestion.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InductionSection, (sec) => sec.questions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sectionId' }),
    __metadata("design:type", InductionSection)
], InductionQuestion.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], InductionQuestion.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Array)
], InductionQuestion.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], InductionQuestion.prototype, "correctOptionIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], InductionQuestion.prototype, "sortOrder", void 0);
exports.InductionQuestion = InductionQuestion = __decorate([
    (0, typeorm_1.Entity)('induction_questions')
], InductionQuestion);
let EmployeeInduction = class EmployeeInduction {
    id;
    employeeId;
    programId;
    program;
    status;
    progressPercentage;
    assessmentScore;
    startedAt;
    completedAt;
    sectionProgress;
    createdAt;
    updatedAt;
};
exports.EmployeeInduction = EmployeeInduction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EmployeeInduction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeInduction.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeInduction.prototype, "programId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InductionProgram),
    (0, typeorm_1.JoinColumn)({ name: 'programId' }),
    __metadata("design:type", InductionProgram)
], EmployeeInduction.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.InductionStatus, default: enums_1.InductionStatus.NOT_STARTED }),
    __metadata("design:type", String)
], EmployeeInduction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], EmployeeInduction.prototype, "progressPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], EmployeeInduction.prototype, "assessmentScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EmployeeInduction.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], EmployeeInduction.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SectionProgress, (sp) => sp.enrollment, { cascade: true }),
    __metadata("design:type", Array)
], EmployeeInduction.prototype, "sectionProgress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeInduction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EmployeeInduction.prototype, "updatedAt", void 0);
exports.EmployeeInduction = EmployeeInduction = __decorate([
    (0, typeorm_1.Entity)('employee_inductions')
], EmployeeInduction);
let SectionProgress = class SectionProgress {
    id;
    enrollmentId;
    enrollment;
    sectionId;
    section;
    watchedLessonIds;
    allLessonsWatched;
    assessmentCompleted;
    assessmentScore;
    assessmentPassed;
    answers;
    completedAt;
    updatedAt;
};
exports.SectionProgress = SectionProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SectionProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SectionProgress.prototype, "enrollmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeInduction, (ei) => ei.sectionProgress, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'enrollmentId' }),
    __metadata("design:type", EmployeeInduction)
], SectionProgress.prototype, "enrollment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SectionProgress.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InductionSection),
    (0, typeorm_1.JoinColumn)({ name: 'sectionId' }),
    __metadata("design:type", InductionSection)
], SectionProgress.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], SectionProgress.prototype, "watchedLessonIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SectionProgress.prototype, "allLessonsWatched", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SectionProgress.prototype, "assessmentCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], SectionProgress.prototype, "assessmentScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SectionProgress.prototype, "assessmentPassed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], SectionProgress.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SectionProgress.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SectionProgress.prototype, "updatedAt", void 0);
exports.SectionProgress = SectionProgress = __decorate([
    (0, typeorm_1.Entity)('induction_section_progress')
], SectionProgress);
//# sourceMappingURL=induction.entity.js.map