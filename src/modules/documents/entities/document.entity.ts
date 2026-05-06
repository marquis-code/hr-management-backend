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
import { DocumentCategory, DocumentStatus, PolicyStatus, ContractType } from '../../../common/enums';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: DocumentCategory, default: DocumentCategory.OTHER })
  category: DocumentCategory;

  @Column()
  fileUrl: string;

  @Column()
  fileName: string;

  @Column({ type: 'int' })
  fileSize: number;

  @Column()
  mimeType: string;

  @Column({ default: '1.0' })
  version: string;

  @Column({ nullable: true })
  employeeId: string;

  @Column()
  uploadedBy: string;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ default: false })
  isConfidential: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  tags: string[];

  @Column({ type: 'enum', enum: DocumentStatus, default: DocumentStatus.ACTIVE })
  status: DocumentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: '1.0' })
  version: string;

  @Column({ type: 'date', nullable: true })
  effectiveDate: Date;

  @Column({ default: true })
  acknowledgementRequired: boolean;

  @Column({ type: 'enum', enum: PolicyStatus, default: PolicyStatus.DRAFT })
  status: PolicyStatus;

  @Column({ nullable: true })
  publishedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('policy_acknowledgements')
export class PolicyAcknowledgement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  policyId: string;

  @Column()
  employeeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  acknowledgedAt: Date;

  @Column({ type: 'text', nullable: true })
  signature: string;

  @Column({ nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('contract_templates')
export class ContractTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ContractType, default: ContractType.FULL_TIME })
  type: ContractType;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
