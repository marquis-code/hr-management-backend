import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, Role, Permission } from '../src/modules/auth/entities';
import { Employee } from '../src/modules/employees/entities/employee.entity';
import { Department, Position } from '../src/modules/employees/entities/department.entity';
import { Subsidiary } from '../src/modules/employees/entities/subsidiary.entity';
import { AttendanceRecord } from '../src/modules/attendance/entities/attendance.entity';
import { LeaveRequest, LeaveBalance, LeaveType } from '../src/modules/leave/entities/leave.entity';
import { PayrollPeriod, PayrollEntry, SalaryGrade, TaxBracket } from '../src/modules/payroll/entities/payroll.entity';
import { Applicant, Application, JobPosting, JobRequisition } from '../src/modules/recruitment/entities/recruitment.entity';
import { 
  UserRole, 
  EmploymentType, 
  EmploymentStatus, 
  Gender, 
  MaritalStatus, 
  ApplicableGender,
  ApplicationStage,
  ApplicationStatus,
  JobPostingStatus
} from '../src/common/enums';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    User, Role, Permission, Employee, Department, Position, Subsidiary, 
    AttendanceRecord, LeaveRequest, LeaveBalance, LeaveType,
    PayrollPeriod, PayrollEntry, SalaryGrade, TaxBracket,
    Applicant, Application, JobPosting, JobRequisition
  ],
  synchronize: true,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Database initialized for seeding');

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);
  const permissionRepository = AppDataSource.getRepository(Permission);
  const employeeRepository = AppDataSource.getRepository(Employee);
  const departmentRepository = AppDataSource.getRepository(Department);
  const positionRepository = AppDataSource.getRepository(Position);
  const subsidiaryRepository = AppDataSource.getRepository(Subsidiary);
  const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
  const leaveBalanceRepository = AppDataSource.getRepository(LeaveBalance);
  const salaryGradeRepository = AppDataSource.getRepository(SalaryGrade);
  const applicantRepository = AppDataSource.getRepository(Applicant);
  const applicationRepository = AppDataSource.getRepository(Application);
  const jobPostingRepository = AppDataSource.getRepository(JobPosting);

  // 1. Create Permissions
  const permissionsData = [
    { name: 'view_dashboard', description: 'Can view main dashboard' },
    { name: 'manage_employees', description: 'Can create/edit employees' },
    { name: 'process_payroll', description: 'Can process payroll' },
    { name: 'manage_leave', description: 'Can approve/reject leave' },
    { name: 'view_audit_logs', description: 'Can view system audit logs' },
    { name: 'manage_roles', description: 'Can manage system roles and permissions' },
    { name: 'manage_system', description: 'Can manage system configuration' },
    { name: 'manage_approvals', description: 'Can manage system-wide approvals' },
    { name: 'manage_recruitment', description: 'Can manage recruitment processes' },
  ];

  const permissions: Permission[] = [];
  for (const p of permissionsData) {
    let perm = await permissionRepository.findOne({ where: { name: p.name } });
    if (!perm) {
      perm = permissionRepository.create(p);
      await permissionRepository.save(perm);
    }
    permissions.push(perm);
  }

  // 2. Create Roles
  const rolesData = [
    { name: 'Administrator', permissions: permissions },
    { name: 'HR Manager', permissions: permissions.filter(p => ['view_dashboard', 'manage_employees', 'manage_leave', 'manage_recruitment'].includes(p.name)) },
    { name: 'Finance Officer', permissions: permissions.filter(p => ['view_dashboard', 'process_payroll'].includes(p.name)) },
    { name: 'Standard Employee', permissions: permissions.filter(p => ['view_dashboard'].includes(p.name)) },
  ];

  const roles: Role[] = [];
  for (const r of rolesData) {
    let role = await roleRepository.findOne({ where: { name: r.name }, relations: ['permissions'] });
    if (!role) {
      role = roleRepository.create(r);
      await roleRepository.save(role);
    }
    roles.push(role);
  }

  // 3. Create Subsidiary
  let subsidiary = await subsidiaryRepository.findOne({ where: { name: 'Capital Field Group' } });
  if (!subsidiary) {
    subsidiary = subsidiaryRepository.create({
      name: 'Capital Field Group',
      code: 'CFG',
      address: 'Lagos, Nigeria'
    });
    await subsidiaryRepository.save(subsidiary);
  }

  // 4. Create Departments
  const deptData = [
    { name: 'Engineering', code: 'ENG' },
    { name: 'Human Resources', code: 'HR' },
    { name: 'Finance', code: 'FIN' },
    { name: 'Operations', code: 'OPS' }
  ];
  
  const departments: Department[] = [];
  for (const d of deptData) {
    let dept = await departmentRepository.findOne({ where: { code: d.code } });
    if (!dept) {
      dept = departmentRepository.create({ ...d });
      await departmentRepository.save(dept);
    }
    departments.push(dept);
  }

  // 5. Create Positions
  const posData = [
    { title: 'Software Engineer', code: 'SWE', departmentId: departments[0].id },
    { title: 'HR Manager', code: 'HRM', departmentId: departments[1].id },
    { title: 'Accountant', code: 'ACC', departmentId: departments[2].id },
    { title: 'Operations Lead', code: 'OPL', departmentId: departments[3].id }
  ];

  const positions: Position[] = [];
  for (const p of posData) {
    let pos = await positionRepository.findOne({ where: { title: p.title } });
    if (!pos) {
      pos = positionRepository.create(p);
      await positionRepository.save(pos);
    }
    positions.push(pos);
  }

  // 6. Create Job Postings
  const jobPostingsData = [
    { title: 'Senior Product Designer', slug: 'senior-product-designer', status: JobPostingStatus.PUBLISHED, description: 'Design things', requirements: 'Expertise' },
    { title: 'Frontend Developer (Vue.js)', slug: 'frontend-developer-vuejs', status: JobPostingStatus.PUBLISHED, description: 'Build things', requirements: 'Vue.js' },
  ];

  const jobPostings: JobPosting[] = [];
  for (const jp of jobPostingsData) {
    let posting = await jobPostingRepository.findOne({ where: { slug: jp.slug } });
    if (!posting) {
      posting = jobPostingRepository.create({ ...jp, requisitionId: 'req-001' });
      await jobPostingRepository.save(posting);
    }
    jobPostings.push(posting);
  }

  // 7. Create Applicants and Applications
  const applicantsData = [
    { firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', phone: '1234567890', stage: ApplicationStage.APPLIED },
    { firstName: 'Bob', lastName: 'Smith', email: 'bob.s@example.com', phone: '0987654321', stage: ApplicationStage.SCREENING },
    { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.b@example.com', phone: '1122334455', stage: ApplicationStage.INTERVIEW_1 },
    { firstName: 'David', lastName: 'Wilson', email: 'david.w@example.com', phone: '5566778899', stage: ApplicationStage.OFFER },
  ];

  for (const a of applicantsData) {
    let applicant = await applicantRepository.findOne({ where: { email: a.email } });
    if (!applicant) {
      applicant = applicantRepository.create({
        firstName: a.firstName,
        lastName: a.lastName,
        email: a.email,
        phone: a.phone
      });
      await applicantRepository.save(applicant);

      const application = applicationRepository.create({
        applicantId: applicant.id,
        jobPostingId: jobPostings[Math.floor(Math.random() * jobPostings.length)].id,
        stage: a.stage,
        status: ApplicationStatus.ACTIVE,
        appliedAt: new Date()
      });
      await applicationRepository.save(application);
    }
  }

  // 8. Create Admin User
  const passwordHash = await bcrypt.hash('password123', 10);
  let adminUser = await userRepository.findOne({ where: { email: 'admin@capitalfield.com' } });
  if (!adminUser) {
    adminUser = userRepository.create({
      email: 'admin@capitalfield.com',
      passwordHash,
      systemRole: UserRole.SUPER_ADMIN,
      roleId: roles[0].id,
      isActive: true
    });
    await userRepository.save(adminUser);
  }

  // 9. Create Employees and linked Users
  const empData = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@capitalfield.com', systemRole: UserRole.HR_ADMIN, roleIdx: 1, deptIdx: 1, posIdx: 1 },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@capitalfield.com', systemRole: UserRole.EMPLOYEE, roleIdx: 3, deptIdx: 0, posIdx: 0 },
    { firstName: 'Robert', lastName: 'Brown', email: 'robert.b@capitalfield.com', systemRole: UserRole.EMPLOYEE, roleIdx: 2, deptIdx: 2, posIdx: 2 }
  ];

  for (const e of empData) {
    let user = await userRepository.findOne({ where: { email: e.email } });
    if (!user) {
      user = userRepository.create({
        email: e.email,
        passwordHash,
        systemRole: e.systemRole,
        roleId: roles[e.roleIdx].id,
        isActive: true
      });
      await userRepository.save(user);

      const employee = employeeRepository.create({
        firstName: e.firstName,
        lastName: e.lastName,
        workEmail: e.email,
        employeeNumber: `CF-2026-${Math.floor(Math.random() * 900) + 100}`,
        departmentId: departments[e.deptIdx].id,
        positionId: positions[e.posIdx].id,
        employmentType: EmploymentType.FULL_TIME,
        employmentStatus: EmploymentStatus.ACTIVE,
        hireDate: new Date(),
        userId: user.id,
        gender: Gender.MALE,
        maritalStatus: MaritalStatus.SINGLE
      });
      await employeeRepository.save(employee);

      user.employeeId = employee.id;
      await userRepository.save(user);

      // Create Leave Balance
      const leaveTypeRepository = AppDataSource.getRepository(LeaveType);
      const leaveTypes = await leaveTypeRepository.find();
      if (leaveTypes.length > 0) {
        const balance = leaveBalanceRepository.create({
          employeeId: employee.id,
          leaveTypeId: leaveTypes[0].id,
          allocatedDays: 20,
          usedDays: 0,
          pendingDays: 0,
          year: 2026
        });
        await leaveBalanceRepository.save(balance);
      }
    }
  }

  console.log('Seeding completed successfully');
  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
