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
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const onboarding_entity_1 = require("./entities/onboarding.entity");
const enums_1 = require("../../common/enums");
let OnboardingService = class OnboardingService {
    planRepository;
    taskRepository;
    templateRepository;
    courseRepository;
    lessonRepository;
    assessmentRepository;
    progressRepository;
    constructor(planRepository, taskRepository, templateRepository, courseRepository, lessonRepository, assessmentRepository, progressRepository) {
        this.planRepository = planRepository;
        this.taskRepository = taskRepository;
        this.templateRepository = templateRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.assessmentRepository = assessmentRepository;
        this.progressRepository = progressRepository;
    }
    async initiate(employeeId, templateId) {
        const plan = this.planRepository.create({
            employeeId,
            templateId,
            startDate: new Date(),
            status: enums_1.OnboardingPlanStatus.IN_PROGRESS,
        });
        const savedPlan = await this.planRepository.save(plan);
        if (templateId) {
            const template = await this.templateRepository.findOne({ where: { id: templateId } });
            if (template && template.tasks) {
                for (const t of template.tasks) {
                    await this.taskRepository.save({
                        planId: savedPlan.id,
                        title: t.title,
                        description: t.description,
                        category: t.category,
                        status: enums_1.OnboardingTaskStatus.PENDING,
                        assignedTo: t.assignedTo,
                    });
                }
            }
        }
        return savedPlan;
    }
    async updateTaskStatus(taskId, status) {
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        task.status = status;
        if (status === enums_1.OnboardingTaskStatus.COMPLETED) {
            task.completedAt = new Date();
        }
        await this.taskRepository.save(task);
        const allTasks = await this.taskRepository.find({ where: { planId: task.planId } });
        const completed = allTasks.filter(t => t.status === enums_1.OnboardingTaskStatus.COMPLETED).length;
        const percentage = (completed / allTasks.length) * 100;
        await this.planRepository.update(task.planId, {
            completionPercentage: parseFloat(percentage.toFixed(2)),
            status: percentage === 100 ? enums_1.OnboardingPlanStatus.COMPLETED : enums_1.OnboardingPlanStatus.IN_PROGRESS
        });
    }
    async createCourse(dto) {
        const course = this.courseRepository.create(dto);
        return this.courseRepository.save(course);
    }
    async addLesson(courseId, dto) {
        const lesson = this.lessonRepository.create({ ...dto, courseId });
        return this.lessonRepository.save(lesson);
    }
    async addAssessment(courseId, dto) {
        const assessment = this.assessmentRepository.create({ ...dto, courseId });
        return this.assessmentRepository.save(assessment);
    }
    async getCourses(departmentId) {
        const where = departmentId ? { departmentId, isActive: true } : { isActive: true };
        return this.courseRepository.find({
            where,
            relations: ['lessons', 'assessments']
        });
    }
    async submitAssessment(employeeId, courseId, answers) {
        const assessments = await this.assessmentRepository.find({ where: { courseId } });
        if (!assessments.length)
            throw new common_1.NotFoundException('No assessment found for this course');
        let score = 0;
        assessments.forEach((a, index) => {
            if (answers[index] === a.correctOptionIndex)
                score++;
        });
        const passThreshold = 0.7;
        const isPassed = (score / assessments.length) >= passThreshold;
        let progress = await this.progressRepository.findOne({ where: { employeeId, courseId } });
        if (!progress) {
            progress = this.progressRepository.create({ employeeId, courseId });
        }
        progress.assessmentScore = score;
        progress.isAssessmentPassed = isPassed;
        progress.completionPercentage = 100;
        return this.progressRepository.save(progress);
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingTask)),
    __param(2, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingTemplate)),
    __param(3, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingCourse)),
    __param(4, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingLesson)),
    __param(5, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingAssessment)),
    __param(6, (0, typeorm_1.InjectRepository)(onboarding_entity_1.OnboardingProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map