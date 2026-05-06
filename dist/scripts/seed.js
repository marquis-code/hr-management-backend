"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../src/modules/auth/entities");
const employee_entity_1 = require("../src/modules/employees/entities/employee.entity");
const department_entity_1 = require("../src/modules/employees/entities/department.entity");
const subsidiary_entity_1 = require("../src/modules/employees/entities/subsidiary.entity");
const attendance_entity_1 = require("../src/modules/attendance/entities/attendance.entity");
const leave_entity_1 = require("../src/modules/leave/entities/leave.entity");
const payroll_entity_1 = require("../src/modules/payroll/entities/payroll.entity");
const recruitment_entity_1 = require("../src/modules/recruitment/entities/recruitment.entity");
const enums_1 = require("../src/common/enums");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
        entities_1.User, entities_1.Role, entities_1.Permission, employee_entity_1.Employee, department_entity_1.Department, department_entity_1.Position, subsidiary_entity_1.Subsidiary,
        attendance_entity_1.AttendanceRecord, leave_entity_1.LeaveRequest, leave_entity_1.LeaveBalance, leave_entity_1.LeaveType,
        payroll_entity_1.PayrollPeriod, payroll_entity_1.PayrollEntry, payroll_entity_1.SalaryGrade, payroll_entity_1.TaxBracket,
        recruitment_entity_1.Applicant, recruitment_entity_1.Application, recruitment_entity_1.JobPosting, recruitment_entity_1.JobRequisition
    ],
    synchronize: true,
    ssl: { rejectUnauthorized: false }
});
async function seed() {
    await AppDataSource.initialize();
    console.log('Database initialized for seeding');
    const userRepository = AppDataSource.getRepository(entities_1.User);
    const roleRepository = AppDataSource.getRepository(entities_1.Role);
    const permissionRepository = AppDataSource.getRepository(entities_1.Permission);
    const employeeRepository = AppDataSource.getRepository(employee_entity_1.Employee);
    const departmentRepository = AppDataSource.getRepository(department_entity_1.Department);
    const positionRepository = AppDataSource.getRepository(department_entity_1.Position);
    const subsidiaryRepository = AppDataSource.getRepository(subsidiary_entity_1.Subsidiary);
    const leaveTypeRepository = AppDataSource.getRepository(leave_entity_1.LeaveType);
    const leaveBalanceRepository = AppDataSource.getRepository(leave_entity_1.LeaveBalance);
    const salaryGradeRepository = AppDataSource.getRepository(payroll_entity_1.SalaryGrade);
    const applicantRepository = AppDataSource.getRepository(recruitment_entity_1.Applicant);
    const applicationRepository = AppDataSource.getRepository(recruitment_entity_1.Application);
    const jobPostingRepository = AppDataSource.getRepository(recruitment_entity_1.JobPosting);
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
    const permissions = [];
    for (const p of permissionsData) {
        let perm = await permissionRepository.findOne({ where: { name: p.name } });
        if (!perm) {
            perm = permissionRepository.create(p);
            await permissionRepository.save(perm);
        }
        permissions.push(perm);
    }
    const rolesData = [
        { name: 'Administrator', permissions: permissions },
        { name: 'HR Manager', permissions: permissions.filter(p => ['view_dashboard', 'manage_employees', 'manage_leave', 'manage_recruitment'].includes(p.name)) },
        { name: 'Finance Officer', permissions: permissions.filter(p => ['view_dashboard', 'process_payroll'].includes(p.name)) },
        { name: 'Standard Employee', permissions: permissions.filter(p => ['view_dashboard'].includes(p.name)) },
    ];
    const roles = [];
    for (const r of rolesData) {
        let role = await roleRepository.findOne({ where: { name: r.name }, relations: ['permissions'] });
        if (!role) {
            role = roleRepository.create(r);
            await roleRepository.save(role);
        }
        roles.push(role);
    }
    let subsidiary = await subsidiaryRepository.findOne({ where: { name: 'Capital Field Group' } });
    if (!subsidiary) {
        subsidiary = subsidiaryRepository.create({
            name: 'Capital Field Group',
            code: 'CFG',
            address: 'Lagos, Nigeria'
        });
        await subsidiaryRepository.save(subsidiary);
    }
    const deptData = [
        { name: 'Engineering', code: 'ENG' },
        { name: 'Human Resources', code: 'HR' },
        { name: 'Finance', code: 'FIN' },
        { name: 'Operations', code: 'OPS' }
    ];
    const departments = [];
    for (const d of deptData) {
        let dept = await departmentRepository.findOne({ where: { code: d.code } });
        if (!dept) {
            dept = departmentRepository.create({ ...d });
            await departmentRepository.save(dept);
        }
        departments.push(dept);
    }
    const posData = [
        { title: 'Software Engineer', code: 'SWE', departmentId: departments[0].id },
        { title: 'HR Manager', code: 'HRM', departmentId: departments[1].id },
        { title: 'Accountant', code: 'ACC', departmentId: departments[2].id },
        { title: 'Operations Lead', code: 'OPL', departmentId: departments[3].id }
    ];
    const positions = [];
    for (const p of posData) {
        let pos = await positionRepository.findOne({ where: { title: p.title } });
        if (!pos) {
            pos = positionRepository.create(p);
            await positionRepository.save(pos);
        }
        positions.push(pos);
    }
    const jobPostingsData = [
        { title: 'Senior Product Designer', slug: 'senior-product-designer', status: enums_1.JobPostingStatus.PUBLISHED, description: 'Design things', requirements: 'Expertise' },
        { title: 'Frontend Developer (Vue.js)', slug: 'frontend-developer-vuejs', status: enums_1.JobPostingStatus.PUBLISHED, description: 'Build things', requirements: 'Vue.js' },
    ];
    const jobPostings = [];
    for (const jp of jobPostingsData) {
        let posting = await jobPostingRepository.findOne({ where: { slug: jp.slug } });
        if (!posting) {
            posting = jobPostingRepository.create({ ...jp, requisitionId: 'req-001' });
            await jobPostingRepository.save(posting);
        }
        jobPostings.push(posting);
    }
    const applicantsData = [
        { firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', phone: '1234567890', stage: enums_1.ApplicationStage.APPLIED },
        { firstName: 'Bob', lastName: 'Smith', email: 'bob.s@example.com', phone: '0987654321', stage: enums_1.ApplicationStage.SCREENING },
        { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.b@example.com', phone: '1122334455', stage: enums_1.ApplicationStage.INTERVIEW_1 },
        { firstName: 'David', lastName: 'Wilson', email: 'david.w@example.com', phone: '5566778899', stage: enums_1.ApplicationStage.OFFER },
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
                status: enums_1.ApplicationStatus.ACTIVE,
                appliedAt: new Date()
            });
            await applicationRepository.save(application);
        }
    }
    const passwordHash = await bcrypt.hash('password123', 10);
    let adminUser = await userRepository.findOne({ where: { email: 'admin@capitalfield.com' } });
    if (!adminUser) {
        adminUser = userRepository.create({
            email: 'admin@capitalfield.com',
            passwordHash,
            systemRole: enums_1.UserRole.SUPER_ADMIN,
            roleId: roles[0].id,
            isActive: true
        });
        await userRepository.save(adminUser);
    }
    const empData = [
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@capitalfield.com', systemRole: enums_1.UserRole.HR_ADMIN, roleIdx: 1, deptIdx: 1, posIdx: 1 },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@capitalfield.com', systemRole: enums_1.UserRole.EMPLOYEE, roleIdx: 3, deptIdx: 0, posIdx: 0 },
        { firstName: 'Robert', lastName: 'Brown', email: 'robert.b@capitalfield.com', systemRole: enums_1.UserRole.EMPLOYEE, roleIdx: 2, deptIdx: 2, posIdx: 2 }
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
                employmentType: enums_1.EmploymentType.FULL_TIME,
                employmentStatus: enums_1.EmploymentStatus.ACTIVE,
                hireDate: new Date(),
                userId: user.id,
                gender: enums_1.Gender.MALE,
                maritalStatus: enums_1.MaritalStatus.SINGLE
            });
            await employeeRepository.save(employee);
            user.employeeId = employee.id;
            await userRepository.save(user);
            const leaveTypeRepository = AppDataSource.getRepository(leave_entity_1.LeaveType);
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
//# sourceMappingURL=seed.js.map