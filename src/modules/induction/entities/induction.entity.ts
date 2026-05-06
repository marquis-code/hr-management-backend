import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { InductionProgramStatus, InductionStatus } from '../../../common/enums';

/**
 * An InductionProgram is a collection of sections configured per subsidiary.
 * HR Admin creates one program per subsidiary, and all new hires in that
 * subsidiary are automatically enrolled.
 */
@Entity('induction_programs')
export class InductionProgram {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  subsidiaryId: string;

  @Column({ type: 'enum', enum: InductionProgramStatus, default: InductionProgramStatus.DRAFT })
  status: InductionProgramStatus;

  @Column({ type: 'integer', default: 70 })
  passingScore: number; // Minimum % to pass assessments

  @OneToMany(() => InductionSection, (sec) => sec.program, { cascade: true })
  sections: InductionSection[];

  @Column({ nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/**
 * An InductionSection is a chapter within a program.
 */
@Entity('induction_sections')
export class InductionSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  programId: string;

  @ManyToOne(() => InductionProgram, (prog) => prog.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'programId' })
  program: InductionProgram;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @OneToMany(() => InductionLesson, (lesson) => lesson.section, { cascade: true })
  lessons: InductionLesson[];

  @OneToMany(() => InductionQuestion, (q) => q.section, { cascade: true })
  questions: InductionQuestion[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/**
 * An InductionLesson is a single video + optional text content within a section.
 */
@Entity('induction_lessons')
export class InductionLesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sectionId: string;

  @ManyToOne(() => InductionSection, (sec) => sec.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectionId' })
  section: InductionSection;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ type: 'integer', nullable: true })
  durationMinutes: number;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;
}

/**
 * An InductionQuestion is a quiz question tied to a section.
 */
@Entity('induction_questions')
export class InductionQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sectionId: string;

  @ManyToOne(() => InductionSection, (sec) => sec.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sectionId' })
  section: InductionSection;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'jsonb' })
  options: string[];

  @Column({ type: 'integer' })
  correctOptionIndex: number;

  @Column({ type: 'integer', default: 0 })
  sortOrder: number;
}

/**
 * EmployeeInduction tracks each employee's enrollment and overall progress
 */
@Entity('employee_inductions')
export class EmployeeInduction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  programId: string;

  @ManyToOne(() => InductionProgram)
  @JoinColumn({ name: 'programId' })
  program: InductionProgram;

  @Column({ type: 'enum', enum: InductionStatus, default: InductionStatus.NOT_STARTED })
  status: InductionStatus;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPercentage: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  assessmentScore: number;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @OneToMany(() => SectionProgress, (sp) => sp.enrollment, { cascade: true })
  sectionProgress: SectionProgress[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/**
 * SectionProgress tracks per-section completion for an employee.
 */
@Entity('induction_section_progress')
export class SectionProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enrollmentId: string;

  @ManyToOne(() => EmployeeInduction, (ei) => ei.sectionProgress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: EmployeeInduction;

  @Column()
  sectionId: string;

  @ManyToOne(() => InductionSection)
  @JoinColumn({ name: 'sectionId' })
  section: InductionSection;

  @Column({ type: 'jsonb', default: [] })
  watchedLessonIds: string[];

  @Column({ default: false })
  allLessonsWatched: boolean;

  @Column({ default: false })
  assessmentCompleted: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  assessmentScore: number;

  @Column({ default: false })
  assessmentPassed: boolean;

  @Column({ type: 'jsonb', nullable: true })
  answers: number[];

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
