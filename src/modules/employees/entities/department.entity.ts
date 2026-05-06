import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  headId: string;

  @Column({ nullable: true })
  parentDepartmentId: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'parentDepartmentId' })
  parentDepartment: Department;

  @OneToMany(() => Department, (dept) => dept.parentDepartment)
  childDepartments: Department[];

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

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ nullable: true })
  gradeLevel: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  minSalary: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  maxSalary: number;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  responsibilities: string[];

  @Column({ type: 'text', array: true, nullable: true })
  requirements: string[];

  @Column({ default: true })
  isActive: boolean;

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

@Entity('employment_history')
export class EmploymentHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  type: string;

  @Column({ type: 'jsonb', nullable: true })
  fromValue: any;

  @Column({ type: 'jsonb', nullable: true })
  toValue: any;

  @Column({ type: 'date' })
  effectiveDate: Date;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ nullable: true })
  notes: string;

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
