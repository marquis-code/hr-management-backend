import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OnboardingTaskCategory, OnboardingTaskStatus, OnboardingPlanStatus } from '../../../common/enums';

@Entity('onboarding_plans')
export class OnboardingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ nullable: true })
  templateId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  targetCompletionDate: Date;

  @Column({ type: 'enum', enum: OnboardingPlanStatus, default: OnboardingPlanStatus.NOT_STARTED })
  status: OnboardingPlanStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  completionPercentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('onboarding_tasks')
export class OnboardingTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  planId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: OnboardingTaskCategory, default: OnboardingTaskCategory.DOCUMENTS })
  category: OnboardingTaskCategory;

  @Column()
  assignedTo: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'enum', enum: OnboardingTaskStatus, default: OnboardingTaskStatus.PENDING })
  status: OnboardingTaskStatus;

  @Column({ default: true })
  isRequired: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('onboarding_templates')
export class OnboardingTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  tasks: any;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('onboarding_courses')
export class OnboardingCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  departmentId: string;

  @OneToMany(() => OnboardingLesson, lesson => lesson.course)
  lessons: OnboardingLesson[];

  @OneToMany(() => OnboardingAssessment, assessment => assessment.course)
  assessments: OnboardingAssessment[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('onboarding_lessons')
export class OnboardingLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @ManyToOne(() => OnboardingCourse, course => course.lessons)
  course: OnboardingCourse;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ default: 0 })
  order: number;
}

@Entity('onboarding_assessments')
export class OnboardingAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @ManyToOne(() => OnboardingCourse, course => course.assessments)
  course: OnboardingCourse;

  @Column()
  question: string;

  @Column({ type: 'jsonb' })
  options: string[];

  @Column()
  correctOptionIndex: number;
}

@Entity('onboarding_progress')
export class OnboardingProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  courseId: string;

  @Column({ type: 'integer', default: 0 })
  completionPercentage: number;

  @Column({ type: 'integer', nullable: true })
  assessmentScore: number;

  @Column({ default: false })
  isAssessmentPassed: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
