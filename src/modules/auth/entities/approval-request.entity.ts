import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '../../../common/enums';

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('approval_requests')
export class ApprovalRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  targetEntity: string; // e.g., 'Employee', 'Salary', 'Leave'

  @Column({ nullable: true })
  targetId: string; // ID of the record if it exists (for updates/deletes)

  @Column()
  action: string; // 'CREATE', 'UPDATE', 'DELETE'

  @Column({ type: 'jsonb' })
  payload: any; // The proposed changes

  @Column({ type: 'enum', enum: ApprovalStatus, default: ApprovalStatus.PENDING })
  status: ApprovalStatus;

  @Column()
  makerId: string;

  @Column({ nullable: true })
  checkerId: string;

  @Column({ nullable: true })
  checkerComment: string;

  @Column()
  subsidiaryId: string;

  @Column({ type: 'timestamp', nullable: true })
  processedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
