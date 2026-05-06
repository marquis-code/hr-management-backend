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
import { LeaveRequestStatus, ApplicableGender } from '../../../common/enums';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'int' })
  maxDaysPerYear: number;

  @Column({ default: false })
  carryOverAllowed: boolean;

  @Column({ type: 'int', default: 0 })
  carryOverMaxDays: number;

  @Column({ type: 'int', nullable: true })
  carryOverExpiryMonths: number;

  @Column({ default: true })
  isPaid: boolean;

  @Column({ default: false })
  requiresDocument: boolean;

  @Column({ type: 'int', default: 0 })
  minNoticeDays: number;

  @Column({ type: 'int', nullable: true })
  maxConsecutiveDays: number;

  @Column({ type: 'enum', enum: ApplicableGender, default: ApplicableGender.ALL })
  applicableGender: ApplicableGender;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('leave_balances')
export class LeaveBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  leaveTypeId: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  allocatedDays: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  usedDays: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  pendingDays: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  carryOverDays: number;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  leaveTypeId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  numberOfDays: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.PENDING })
  status: LeaveRequestStatus;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ type: 'text', nullable: true })
  handoverNote: string;

  @Column({ nullable: true })
  handoverEmployeeId: string;

  @Column({ nullable: true })
  supportingDocumentUrl: string;

  @Column({ default: false })
  isUrgent: boolean;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity('leave_approval_flows')
export class LeaveApprovalFlow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  leaveRequestId: string;

  @Column({ type: 'int' })
  approverLevel: number;

  @Column()
  approverId: string;

  @Column({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.PENDING })
  status: LeaveRequestStatus;

  @Column({ type: 'timestamp', nullable: true })
  actedAt: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
