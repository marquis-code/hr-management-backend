import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import {
  RequisitionStatus,
  RequisitionType,
  Urgency,
  JobPostingStatus,
  JobLocationType,
  ApplicationSource,
  ApplicationStage,
  ApplicationStatus,
  InterviewType,
  InterviewStatus,
  InterviewRecommendation,
  OfferStatus,
} from '../../../common/enums';

@Entity('job_requisitions')
export class JobRequisition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  departmentId: string;

  @Column()
  positionId: string;

  @Column()
  requestedBy: string;

  @Column({ type: 'enum', enum: RequisitionType, default: RequisitionType.NEW_HIRE })
  type: RequisitionType;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'enum', enum: Urgency, default: Urgency.MEDIUM })
  urgency: Urgency;

  @Column({ type: 'int' })
  numberOfOpenings: number;

  @Column({ type: 'date' })
  targetStartDate: Date;

  @Column({ type: 'enum', enum: RequisitionStatus, default: RequisitionStatus.DRAFT })
  status: RequisitionStatus;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ type: 'text', nullable: true })
  jobDescription: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  salaryMin: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  salaryMax: number;

  @Column({ default: false })
  isConfidential: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('applicants')
export class Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  portfolioUrl: string;

  @Column({ nullable: true })
  resumeUrl: string;

  @Column({ nullable: true })
  coverLetterUrl: string;

  @Column({ type: 'enum', enum: ApplicationSource, default: ApplicationSource.WEBSITE })
  source: ApplicationSource;

  @Column({ nullable: true })
  referredBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requisitionId: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  requirements: string;

  @Column({ type: 'text', nullable: true })
  benefits: string;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'enum', enum: JobLocationType, default: JobLocationType.ONSITE })
  type: JobLocationType;

  @Column({ nullable: true })
  salaryDisplay: string;

  @Column({ type: 'enum', enum: JobPostingStatus, default: JobPostingStatus.DRAFT })
  status: JobPostingStatus;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  closedAt: Date;

  @Column({ type: 'date', nullable: true })
  applicationDeadline: Date;

  @Column({ type: 'int', default: 0 })
  totalApplications: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  jobPostingId: string;

  @ManyToOne(() => JobPosting)
  @JoinColumn({ name: 'jobPostingId' })
  jobPosting: JobPosting;

  @Column()
  applicantId: string;

  @ManyToOne(() => Applicant)
  @JoinColumn({ name: 'applicantId' })
  applicant: Applicant;

  @Column({ type: 'enum', enum: ApplicationStage, default: ApplicationStage.APPLIED })
  stage: ApplicationStage;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.ACTIVE })
  status: ApplicationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  currentStageEnteredAt: Date;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  applicationId: string;

  @Column({ type: 'enum', enum: InterviewType, default: InterviewType.PHONE })
  type: InterviewType;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ nullable: true })
  locationOrLink: string;

  @Column({ type: 'uuid', array: true, nullable: true })
  interviewers: string[];

  @Column({ type: 'enum', enum: InterviewStatus, default: InterviewStatus.SCHEDULED })
  status: InterviewStatus;

  @Column({ type: 'jsonb', nullable: true })
  feedback: any;

  @Column({ type: 'int', nullable: true })
  overallRating: number;

  @Column({ type: 'enum', enum: InterviewRecommendation, nullable: true })
  overallRecommendation: InterviewRecommendation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('offer_letters')
export class OfferLetter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  applicationId: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  salary: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  position: string;

  @Column()
  department: string;

  @Column({ type: 'text', nullable: true })
  benefits: string;

  @Column({ type: 'enum', enum: OfferStatus, default: OfferStatus.DRAFT })
  status: OfferStatus;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  documentUrl: string;

  @Column({ nullable: true })
  signedDocumentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
