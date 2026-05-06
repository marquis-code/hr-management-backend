import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';
import { AttendanceStatus, CheckInMethod, ScheduleType, HolidayType } from '../../../common/enums';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkInTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOutTime: Date;

  @Column({ type: 'jsonb', nullable: true })
  checkInLocation: { lat: number; lng: number; address: string };

  @Column({ type: 'jsonb', nullable: true })
  checkOutLocation: { lat: number; lng: number; address: string };

  @Column({ type: 'enum', enum: CheckInMethod, default: CheckInMethod.WEB })
  checkInMethod: CheckInMethod;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  workHours: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  overtimeHours: number;

  @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  status: AttendanceStatus;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: false })
  isManuallyAdjusted: boolean;

  @Column({ nullable: true })
  adjustedBy: string;

  @Column({ nullable: true })
  adjustmentReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}

@Entity('work_schedules')
export class WorkSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ScheduleType, default: ScheduleType.FIXED })
  type: ScheduleType;

  @Column({ type: 'int', array: true, default: [1, 2, 3, 4, 5] })
  workDays: number[];

  @Column({ type: 'time', default: '09:00' })
  startTime: string;

  @Column({ type: 'time', default: '17:00' })
  endTime: string;

  @Column({ type: 'int', default: 60 })
  breakDuration: number;

  @Column({ type: 'int', default: 15 })
  gracePeriodsMinutes: number;

  @Column({ type: 'int', default: 30 })
  overtimeThresholdMinutes: number;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}

@Entity('employee_schedules')
export class EmployeeSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  scheduleId: string;

  @Column({ type: 'date' })
  effectiveFrom: Date;

  @Column({ type: 'date', nullable: true })
  effectiveTo: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('public_holidays')
export class PublicHoliday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'enum', enum: HolidayType, default: HolidayType.COMPANY })
  type: HolidayType;

  @Column({ default: false })
  isRecurringYearly: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}
