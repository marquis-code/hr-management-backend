import { Repository } from 'typeorm';
import { OnboardingPlan, OnboardingTask, OnboardingTemplate, OnboardingCourse, OnboardingLesson, OnboardingAssessment, OnboardingProgress } from './entities/onboarding.entity';
import { OnboardingTaskStatus } from '../../common/enums';
export declare class OnboardingService {
    private planRepository;
    private taskRepository;
    private templateRepository;
    private courseRepository;
    private lessonRepository;
    private assessmentRepository;
    private progressRepository;
    constructor(planRepository: Repository<OnboardingPlan>, taskRepository: Repository<OnboardingTask>, templateRepository: Repository<OnboardingTemplate>, courseRepository: Repository<OnboardingCourse>, lessonRepository: Repository<OnboardingLesson>, assessmentRepository: Repository<OnboardingAssessment>, progressRepository: Repository<OnboardingProgress>);
    initiate(employeeId: string, templateId?: string): Promise<OnboardingPlan>;
    updateTaskStatus(taskId: string, status: OnboardingTaskStatus): Promise<void>;
    createCourse(dto: any): Promise<OnboardingCourse[]>;
    addLesson(courseId: string, dto: any): Promise<OnboardingLesson[]>;
    addAssessment(courseId: string, dto: any): Promise<OnboardingAssessment[]>;
    getCourses(departmentId?: string): Promise<OnboardingCourse[]>;
    submitAssessment(employeeId: string, courseId: string, answers: number[]): Promise<OnboardingProgress>;
}
