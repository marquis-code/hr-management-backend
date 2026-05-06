import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { Gender, MaritalStatus, EmploymentType, EmploymentStatus, WorkLocation, InductionStatus } from '../../../common/enums';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  employeeNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  preferredName: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'enum', enum: MaritalStatus, nullable: true })
  maritalStatus: MaritalStatus;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  religion: string;

  @Column({ nullable: true })
  personalEmail: string;

  @Column({ nullable: true })
  workEmail: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  alternatePhone: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ type: 'jsonb', nullable: true })
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    bankCode: string;
  };

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  pensionId: string;

  @Column({ nullable: true })
  nationalId: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME })
  employmentType: EmploymentType;

  @Column({ type: 'enum', enum: EmploymentStatus, default: EmploymentStatus.ACTIVE })
  employmentStatus: EmploymentStatus;

  @Column({ type: 'date', nullable: true })
  hireDate: Date;

  @Column({ type: 'date', nullable: true })
  confirmationDate: Date;

  @Column({ type: 'date', nullable: true })
  terminationDate: Date;

  @Column({ nullable: true })
  terminationReason: string;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ nullable: true })
  positionId: string;

  @Column({ nullable: true })
  managerId: string;

  @Column({ nullable: true })
  gradeLevel: string;

  @Column({ nullable: true })
  salaryBand: string;

  @Column({ type: 'enum', enum: WorkLocation, default: WorkLocation.ONSITE })
  workLocation: WorkLocation;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  subsidiaryId: string;

  @Column({ type: 'enum', enum: InductionStatus, default: InductionStatus.NOT_STARTED })
  inductionStatus: InductionStatus;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: Employee;

  @OneToMany(() => Employee, (emp) => emp.manager)
  subordinates: Employee[];

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
