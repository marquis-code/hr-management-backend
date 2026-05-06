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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InductionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const induction_entity_1 = require("./entities/induction.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const enums_1 = require("../../common/enums");
let InductionService = class InductionService {
    programRepo;
    sectionRepo;
    lessonRepo;
    questionRepo;
    enrollmentRepo;
    progressRepo;
    employeeRepo;
    constructor(programRepo, sectionRepo, lessonRepo, questionRepo, enrollmentRepo, progressRepo, employeeRepo) {
        this.programRepo = programRepo;
        this.sectionRepo = sectionRepo;
        this.lessonRepo = lessonRepo;
        this.questionRepo = questionRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.progressRepo = progressRepo;
        this.employeeRepo = employeeRepo;
    }
    async createProgram(dto, creatorId) {
        const program = this.programRepo.create({
            title: dto.title,
            description: dto.description,
            subsidiaryId: dto.subsidiaryId,
            passingScore: dto.passingScore || 70,
            createdBy: creatorId,
        });
        const saved = await this.programRepo.save(program);
        if (dto.modules?.length) {
            for (const modDto of dto.modules) {
                const sec = this.sectionRepo.create({
                    programId: saved.id,
                    title: modDto.title,
                    description: modDto.description,
                    sortOrder: modDto.sortOrder || 0,
                });
                const savedSec = await this.sectionRepo.save(sec);
                if (modDto.lessons?.length) {
                    for (const lessonDto of modDto.lessons) {
                        await this.lessonRepo.save(this.lessonRepo.create({
                            sectionId: savedSec.id,
                            ...lessonDto,
                        }));
                    }
                }
                if (modDto.questions?.length) {
                    for (const qDto of modDto.questions) {
                        await this.questionRepo.save(this.questionRepo.create({
                            sectionId: savedSec.id,
                            ...qDto,
                        }));
                    }
                }
            }
        }
        return this.findProgramById(saved.id);
    }
    async findAllPrograms() {
        return this.programRepo.find({
            relations: ['sections', 'sections.lessons', 'sections.questions'],
            order: { createdAt: 'DESC' },
        });
    }
    async findProgramById(id) {
        const program = await this.programRepo.findOne({
            where: { id },
            relations: ['sections', 'sections.lessons', 'sections.questions'],
        });
        if (!program)
            throw new common_1.NotFoundException('Induction program not found');
        return program;
    }
    async findProgramsBySubsidiary(subsidiaryId) {
        return this.programRepo.find({
            where: { subsidiaryId, status: enums_1.InductionProgramStatus.PUBLISHED },
            relations: ['sections', 'sections.lessons', 'sections.questions'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateProgram(id, dto) {
        const program = await this.findProgramById(id);
        Object.assign(program, dto);
        await this.programRepo.save(program);
        return this.findProgramById(id);
    }
    async publishProgram(id) {
        const program = await this.findProgramById(id);
        if (!program.sections?.length) {
            throw new common_1.BadRequestException('Cannot publish a program with no sections');
        }
        program.status = enums_1.InductionProgramStatus.PUBLISHED;
        await this.programRepo.save(program);
        return program;
    }
    async deleteProgram(id) {
        const program = await this.findProgramById(id);
        await this.programRepo.remove(program);
    }
    async addModule(programId, dto) {
        await this.findProgramById(programId);
        const sec = this.sectionRepo.create({ ...dto, programId });
        return this.sectionRepo.save(sec);
    }
    async addLesson(sectionId, dto) {
        const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
        if (!sec)
            throw new common_1.NotFoundException('Section not found');
        const lesson = this.lessonRepo.create({ ...dto, sectionId });
        return this.lessonRepo.save(lesson);
    }
    async addQuestion(sectionId, dto) {
        const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
        if (!sec)
            throw new common_1.NotFoundException('Section not found');
        const question = this.questionRepo.create({ ...dto, sectionId });
        return this.questionRepo.save(question);
    }
    async deleteModule(sectionId) {
        const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
        if (!sec)
            throw new common_1.NotFoundException('Section not found');
        await this.sectionRepo.remove(sec);
    }
    async deleteLesson(lessonId) {
        const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        await this.lessonRepo.remove(lesson);
    }
    async deleteQuestion(questionId) {
        const q = await this.questionRepo.findOne({ where: { id: questionId } });
        if (!q)
            throw new common_1.NotFoundException('Question not found');
        await this.questionRepo.remove(q);
    }
    async enrollEmployee(employeeId, programId) {
        const employee = await this.employeeRepo.findOne({ where: { id: employeeId } });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        const program = await this.findProgramById(programId);
        if (program.status !== enums_1.InductionProgramStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Program is not published yet');
        }
        const existing = await this.enrollmentRepo.findOne({
            where: { employeeId, programId },
        });
        if (existing)
            return existing;
        const enrollment = this.enrollmentRepo.create({
            employeeId,
            programId,
            status: enums_1.InductionStatus.NOT_STARTED,
        });
        const saved = await this.enrollmentRepo.save(enrollment);
        for (const sec of program.sections) {
            await this.progressRepo.save(this.progressRepo.create({
                enrollmentId: saved.id,
                sectionId: sec.id,
                watchedLessonIds: [],
            }));
        }
        await this.employeeRepo.update(employeeId, {
            inductionStatus: enums_1.InductionStatus.NOT_STARTED,
        });
        const refreshed = await this.getEnrollmentDetails(saved.id);
        if (!refreshed)
            throw new Error('Failed to load enrollment details');
        return refreshed;
    }
    async autoEnrollNewEmployee(employeeId, subsidiaryId) {
        if (!subsidiaryId)
            return null;
        const programs = await this.findProgramsBySubsidiary(subsidiaryId);
        if (!programs.length)
            return null;
        return this.enrollEmployee(employeeId, programs[0].id);
    }
    async getEnrollmentDashboard() {
        const enrollments = await this.enrollmentRepo.find({
            relations: ['program', 'sectionProgress', 'sectionProgress.section'],
            order: { createdAt: 'DESC' },
        });
        const enriched = [];
        for (const enrollment of enrollments) {
            const employee = await this.employeeRepo.findOne({ where: { id: enrollment.employeeId } });
            enriched.push({
                ...enrollment,
                employee: employee ? {
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    employeeNumber: employee.employeeNumber,
                    jobTitle: employee.jobTitle,
                    subsidiaryId: employee.subsidiaryId,
                } : null,
            });
        }
        return enriched;
    }
    async getMyInduction(employeeId) {
        const enrollment = await this.enrollmentRepo.findOne({
            where: { employeeId },
            relations: ['program', 'program.sections', 'program.sections.lessons', 'program.sections.questions', 'sectionProgress'],
            order: { createdAt: 'DESC' },
        });
        return enrollment;
    }
    async markLessonWatched(employeeId, dto) {
        const lesson = await this.lessonRepo.findOne({ where: { id: dto.lessonId } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        const enrollment = await this.enrollmentRepo.findOne({
            where: { employeeId },
            relations: ['sectionProgress'],
        });
        if (!enrollment)
            throw new common_1.NotFoundException('You are not enrolled in any induction program');
        let progress = enrollment.sectionProgress.find(sp => sp.sectionId === lesson.sectionId);
        if (!progress)
            throw new common_1.BadRequestException('Section progress record not found');
        if (!progress.watchedLessonIds.includes(dto.lessonId)) {
            progress.watchedLessonIds = [...progress.watchedLessonIds, dto.lessonId];
        }
        const allLessons = await this.lessonRepo.find({ where: { sectionId: lesson.sectionId } });
        progress.allLessonsWatched = allLessons.every(l => progress.watchedLessonIds.includes(l.id));
        await this.progressRepo.save(progress);
        if (enrollment.status === enums_1.InductionStatus.NOT_STARTED) {
            enrollment.status = enums_1.InductionStatus.IN_PROGRESS;
            enrollment.startedAt = new Date();
            await this.enrollmentRepo.save(enrollment);
            await this.employeeRepo.update(employeeId, {
                inductionStatus: enums_1.InductionStatus.IN_PROGRESS,
            });
        }
        await this.recalculateProgress(enrollment.id);
        return progress;
    }
    async submitModuleAssessment(employeeId, dto) {
        const enrollment = await this.enrollmentRepo.findOne({
            where: { employeeId },
            relations: ['program', 'sectionProgress'],
        });
        if (!enrollment)
            throw new common_1.NotFoundException('You are not enrolled in any induction program');
        const progress = enrollment.sectionProgress.find(sp => sp.sectionId === dto.moduleId);
        if (!progress)
            throw new common_1.BadRequestException('Section progress record not found');
        if (!progress.allLessonsWatched) {
            throw new common_1.BadRequestException('You must watch all lessons in this section before taking the assessment');
        }
        const questions = await this.questionRepo.find({
            where: { sectionId: dto.moduleId },
            order: { sortOrder: 'ASC' },
        });
        if (!questions.length) {
            progress.assessmentCompleted = true;
            progress.assessmentPassed = true;
            progress.assessmentScore = 100;
            progress.completedAt = new Date();
            progress.answers = dto.answers;
            await this.progressRepo.save(progress);
            await this.recalculateProgress(enrollment.id);
            return progress;
        }
        let correct = 0;
        questions.forEach((q, index) => {
            if (dto.answers[index] === q.correctOptionIndex)
                correct++;
        });
        const score = (correct / questions.length) * 100;
        const passingScore = enrollment.program?.passingScore || 70;
        progress.assessmentCompleted = true;
        progress.assessmentScore = parseFloat(score.toFixed(2));
        progress.assessmentPassed = score >= passingScore;
        progress.answers = dto.answers;
        if (progress.assessmentPassed) {
            progress.completedAt = new Date();
        }
        await this.progressRepo.save(progress);
        await this.recalculateProgress(enrollment.id);
        return progress;
    }
    async recalculateProgress(enrollmentId) {
        const enrollment = await this.enrollmentRepo.findOne({
            where: { id: enrollmentId },
            relations: ['sectionProgress'],
        });
        if (!enrollment)
            return;
        const total = enrollment.sectionProgress.length;
        if (total === 0)
            return;
        const completed = enrollment.sectionProgress.filter(sp => sp.allLessonsWatched && sp.assessmentPassed).length;
        const progressPct = parseFloat(((completed / total) * 100).toFixed(2));
        enrollment.progressPercentage = progressPct;
        const scored = enrollment.sectionProgress.filter(sp => sp.assessmentScore !== null && sp.assessmentScore !== undefined);
        if (scored.length > 0) {
            const avgScore = scored.reduce((sum, sp) => sum + Number(sp.assessmentScore), 0) / scored.length;
            enrollment.assessmentScore = parseFloat(avgScore.toFixed(2));
        }
        if (progressPct === 100) {
            enrollment.status = enums_1.InductionStatus.COMPLETED;
            enrollment.completedAt = new Date();
            await this.enrollmentRepo.save(enrollment);
            await this.employeeRepo.update(enrollment.employeeId, {
                inductionStatus: enums_1.InductionStatus.COMPLETED,
            });
        }
        else {
            await this.enrollmentRepo.save(enrollment);
        }
    }
    async getEnrollmentDetails(enrollmentId) {
        return this.enrollmentRepo.findOne({
            where: { id: enrollmentId },
            relations: ['program', 'sectionProgress', 'sectionProgress.section'],
        });
    }
};
exports.InductionService = InductionService;
exports.InductionService = InductionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(induction_entity_1.InductionProgram)),
    __param(1, (0, typeorm_1.InjectRepository)(induction_entity_1.InductionSection)),
    __param(2, (0, typeorm_1.InjectRepository)(induction_entity_1.InductionLesson)),
    __param(3, (0, typeorm_1.InjectRepository)(induction_entity_1.InductionQuestion)),
    __param(4, (0, typeorm_1.InjectRepository)(induction_entity_1.EmployeeInduction)),
    __param(5, (0, typeorm_1.InjectRepository)(induction_entity_1.SectionProgress)),
    __param(6, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InductionService);
//# sourceMappingURL=induction.service.js.map