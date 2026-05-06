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
import {
  ReviewCycleType,
  ReviewCycleStatus,
  GoalCategory,
  GoalStatus,
  ReviewType,
  ReviewStatus,
  ReviewSectionType,
  FeedbackType,
  FeedbackVisibility,
} from '../../../common/enums';

@Entity('review_cycles')
export class ReviewCycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ReviewCycleType, default: ReviewCycleType.ANNUAL })
  type: ReviewCycleType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'date' })
  selfReviewDeadline: Date;

  @Column({ type: 'date' })
  managerReviewDeadline: Date;

  @Column({ type: 'enum', enum: ReviewCycleStatus, default: ReviewCycleStatus.DRAFT })
  status: ReviewCycleStatus;

  @Column({ type: 'enum', enum: ['ALL', 'DEPARTMENT', 'GRADE'], default: 'ALL' })
  applicableTo: string;

  @Column({ type: 'uuid', array: true, nullable: true })
  applicableIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ nullable: true })
  cycleId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: GoalCategory, default: GoalCategory.INDIVIDUAL })
  category: GoalCategory;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  targetValue: number;

  @Column()
  unit: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  currentValue: number;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: GoalStatus, default: GoalStatus.NOT_STARTED })
  status: GoalStatus;

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('performance_reviews')
export class PerformanceReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cycleId: string;

  @Column()
  employeeId: string;

  @Column()
  reviewerId: string;

  @Column({ type: 'enum', enum: ReviewType, default: ReviewType.SELF })
  type: ReviewType;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'int', nullable: true })
  overallRating: number;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  acknowledgedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('review_sections')
export class ReviewSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reviewId: string;

  @Column({ type: 'enum', enum: ReviewSectionType, default: ReviewSectionType.COMPETENCY })
  type: ReviewSectionType;

  @Column({ type: 'jsonb' })
  questions: any;

  @Column({ type: 'int', nullable: true })
  sectionRating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('competencies')
export class Competency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  behavioralIndicators: string[];

  @Column()
  category: string;

  @Column({ type: 'text', array: true, nullable: true })
  applicableLevels: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('development_plans')
export class DevelopmentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ nullable: true })
  cycleId: string;

  @Column()
  goal: string;

  @Column({ type: 'jsonb' })
  actions: any;

  @Column({ type: 'date', nullable: true })
  targetCompletionDate: Date;

  @Column({ default: 'IN_PROGRESS' })
  status: string;

  @Column({ nullable: true })
  reviewedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fromEmployeeId: string;

  @Column()
  toEmployeeId: string;

  @Column({ type: 'enum', enum: FeedbackType, default: FeedbackType.NOTE })
  type: FeedbackType;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ type: 'enum', enum: FeedbackVisibility, default: FeedbackVisibility.PRIVATE })
  visibility: FeedbackVisibility;

  @CreateDateColumn()
  createdAt: Date;
}
