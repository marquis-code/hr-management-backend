import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingPlan, OnboardingTask, OnboardingTemplate, OnboardingCourse, OnboardingLesson, OnboardingAssessment, OnboardingProgress } from './entities/onboarding.entity';
import { OnboardingTaskStatus, OnboardingPlanStatus } from '../../common/enums';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingPlan)
    private planRepository: Repository<OnboardingPlan>,
    @InjectRepository(OnboardingTask)
    private taskRepository: Repository<OnboardingTask>,
    @InjectRepository(OnboardingTemplate)
    private templateRepository: Repository<OnboardingTemplate>,
    @InjectRepository(OnboardingCourse)
    private courseRepository: Repository<OnboardingCourse>,
    @InjectRepository(OnboardingLesson)
    private lessonRepository: Repository<OnboardingLesson>,
    @InjectRepository(OnboardingAssessment)
    private assessmentRepository: Repository<OnboardingAssessment>,
    @InjectRepository(OnboardingProgress)
    private progressRepository: Repository<OnboardingProgress>,
  ) {}

  async initiate(employeeId: string, templateId?: string) {
    const plan = this.planRepository.create({
      employeeId,
      templateId,
      startDate: new Date(),
      status: OnboardingPlanStatus.IN_PROGRESS,
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
            status: OnboardingTaskStatus.PENDING,
            assignedTo: t.assignedTo,
          });
        }
      }
    }

    return savedPlan;
  }

  async updateTaskStatus(taskId: string, status: OnboardingTaskStatus) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    task.status = status;
    if (status === OnboardingTaskStatus.COMPLETED) {
      task.completedAt = new Date();
    }
    
    await this.taskRepository.save(task);
    
    // Update plan percentage
    const allTasks = await this.taskRepository.find({ where: { planId: task.planId } });
    const completed = allTasks.filter(t => t.status === OnboardingTaskStatus.COMPLETED).length;
    const percentage = (completed / allTasks.length) * 100;

    await this.planRepository.update(task.planId, {
      completionPercentage: parseFloat(percentage.toFixed(2)),
      status: percentage === 100 ? OnboardingPlanStatus.COMPLETED : OnboardingPlanStatus.IN_PROGRESS
    });
  }

  async createCourse(dto: any) {
    const course = this.courseRepository.create(dto);
    return this.courseRepository.save(course);
  }

  async addLesson(courseId: string, dto: any) {
    const lesson = this.lessonRepository.create({ ...dto, courseId });
    return this.lessonRepository.save(lesson);
  }

  async addAssessment(courseId: string, dto: any) {
    const assessment = this.assessmentRepository.create({ ...dto, courseId });
    return this.assessmentRepository.save(assessment);
  }

  async getCourses(departmentId?: string) {
    const where = departmentId ? { departmentId, isActive: true } : { isActive: true };
    return this.courseRepository.find({
      where,
      relations: ['lessons', 'assessments']
    });
  }

  async submitAssessment(employeeId: string, courseId: string, answers: number[]) {
    const assessments = await this.assessmentRepository.find({ where: { courseId } });
    if (!assessments.length) throw new NotFoundException('No assessment found for this course');

    let score = 0;
    assessments.forEach((a, index) => {
      if (answers[index] === a.correctOptionIndex) score++;
    });

    const passThreshold = 0.7; // 70% to pass
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
}
