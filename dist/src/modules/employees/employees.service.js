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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crypto = __importStar(require("crypto"));
const entities_1 = require("./entities");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const enums_1 = require("../../common/enums");
const induction_service_1 = require("../induction/induction.service");
let EmployeesService = class EmployeesService {
    employeeRepository;
    departmentRepository;
    positionRepository;
    historyRepository;
    subsidiaryRepository;
    inductionService;
    encryptionKey = crypto.scryptSync(process.env.JWT_SECRET || 'secret', 'salt', 32);
    iv = crypto.randomBytes(16);
    constructor(employeeRepository, departmentRepository, positionRepository, historyRepository, subsidiaryRepository, inductionService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.positionRepository = positionRepository;
        this.historyRepository = historyRepository;
        this.subsidiaryRepository = subsidiaryRepository;
        this.inductionService = inductionService;
    }
    async findAllSubsidiaries() {
        return this.subsidiaryRepository.find();
    }
    async createSubsidiary(data) {
        const subsidiary = this.subsidiaryRepository.create(data);
        return this.subsidiaryRepository.save(subsidiary);
    }
    encrypt(text) {
        if (!text)
            return null;
        const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(hash) {
        if (!hash)
            return null;
        const [ivHex, contentHex] = hash.split(':');
        const decipher = crypto.createDecipheriv('aes-256-ctr', this.encryptionKey, Buffer.from(ivHex, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(contentHex, 'hex')), decipher.final()]);
        return decrypted.toString();
    }
    async generateEmployeeNumber() {
        const year = new Date().getFullYear();
        const lastEmployee = await this.employeeRepository.findOne({
            where: { employeeNumber: (0, typeorm_2.Like)(`CF-${year}-%`) },
            order: { employeeNumber: 'DESC' },
        });
        let sequence = 1;
        if (lastEmployee) {
            const lastSeq = parseInt(lastEmployee.employeeNumber.split('-')[2], 10);
            sequence = lastSeq + 1;
        }
        return `CF-${year}-${sequence.toString().padStart(3, '0')}`;
    }
    async create(createEmployeeDto, creatorId) {
        const employeeNumber = await this.generateEmployeeNumber();
        if (createEmployeeDto.bankDetails?.accountNumber) {
            createEmployeeDto.bankDetails.accountNumber = this.encrypt(createEmployeeDto.bankDetails.accountNumber);
        }
        const employee = this.employeeRepository.create({
            ...createEmployeeDto,
            employeeNumber,
            createdBy: creatorId,
        });
        const savedEmployee = await this.employeeRepository.save(employee);
        if (savedEmployee.subsidiaryId) {
            await this.inductionService.autoEnrollNewEmployee(savedEmployee.id, savedEmployee.subsidiaryId);
        }
        await this.historyRepository.save({
            employeeId: savedEmployee.id,
            type: enums_1.EmploymentHistoryType.STATUS_CHANGE,
            toValue: { status: savedEmployee.employmentStatus },
            effectiveDate: savedEmployee.hireDate,
            reason: 'Initial Hiring',
            createdBy: creatorId,
        });
        return savedEmployee;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', search } = paginationDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.employeeRepository.createQueryBuilder('employee');
        queryBuilder.leftJoinAndSelect('employee.manager', 'manager');
        if (search) {
            queryBuilder.where('(employee.firstName ILIKE :search OR employee.lastName ILIKE :search OR employee.employeeNumber ILIKE :search)', { search: `%${search}%` });
        }
        queryBuilder
            .orderBy(`employee.${sortBy}`, sortOrder)
            .skip(skip)
            .take(limit);
        const [items, total] = await queryBuilder.getManyAndCount();
        return new pagination_dto_1.PaginatedResult(items, total, page, limit);
    }
    async findOne(id) {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['manager', 'subordinates'],
        });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        if (employee.bankDetails?.accountNumber) {
            employee.bankDetails.accountNumber = this.decrypt(employee.bankDetails.accountNumber) || '';
        }
        return employee;
    }
    async getOrgChart() {
        const employees = await this.employeeRepository.find({
            select: ['id', 'firstName', 'lastName', 'jobTitle', 'managerId', 'profilePhoto'],
            where: { employmentStatus: (0, typeorm_2.In)(['ACTIVE', 'ON_LEAVE']) }
        });
        const map = {};
        employees.forEach(emp => { map[emp.id] = { ...emp, children: [] }; });
        const roots = [];
        employees.forEach(emp => {
            if (emp.managerId && map[emp.managerId]) {
                map[emp.managerId].children.push(map[emp.id]);
            }
            else {
                roots.push(map[emp.id]);
            }
        });
        return roots;
    }
    async createDepartment(dto) {
        const dept = this.departmentRepository.create(dto);
        return this.departmentRepository.save(dept);
    }
    async findAllDepartments() {
        return this.departmentRepository.find({ relations: ['parentDepartment'] });
    }
    async createPosition(dto) {
        const pos = this.positionRepository.create(dto);
        return this.positionRepository.save(pos);
    }
    async findAllPositions() {
        return this.positionRepository.find();
    }
    async bulkCreateEmployees(records, creatorId) {
        const results = { created: 0, skipped: 0, errors: [] };
        for (const record of records) {
            try {
                const employeeNumber = await this.generateEmployeeNumber();
                const employee = this.employeeRepository.create({
                    employeeNumber,
                    firstName: record.firstName,
                    lastName: record.lastName,
                    middleName: record.middleName || null,
                    personalEmail: record.personalEmail || null,
                    workEmail: record.workEmail || null,
                    phone: record.phone || null,
                    gender: record.gender || null,
                    dateOfBirth: record.dateOfBirth || null,
                    nationality: record.nationality || null,
                    jobTitle: record.jobTitle || null,
                    employmentType: record.employmentType || 'FULL_TIME',
                    employmentStatus: record.employmentStatus || 'ACTIVE',
                    hireDate: record.hireDate || null,
                    gradeLevel: record.gradeLevel || null,
                    departmentId: record.departmentId || null,
                    subsidiaryId: record.subsidiaryId || null,
                    createdBy: creatorId,
                });
                const saved = await this.employeeRepository.save(employee);
                if (saved.subsidiaryId) {
                    await this.inductionService.autoEnrollNewEmployee(saved.id, saved.subsidiaryId);
                }
                results.created++;
            }
            catch (err) {
                results.skipped++;
                results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
            }
        }
        return results;
    }
    async bulkCreateDepartments(records) {
        const results = { created: 0, skipped: 0, errors: [] };
        for (const record of records) {
            try {
                const existing = await this.departmentRepository.findOne({ where: { code: record.code } });
                if (existing) {
                    results.skipped++;
                    continue;
                }
                const dept = this.departmentRepository.create({
                    name: record.name,
                    code: record.code,
                    description: record.description || null,
                    isActive: true,
                });
                await this.departmentRepository.save(dept);
                results.created++;
            }
            catch (err) {
                results.skipped++;
                results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
            }
        }
        return results;
    }
    async bulkCreatePositions(records) {
        const results = { created: 0, skipped: 0, errors: [] };
        for (const record of records) {
            try {
                const existing = await this.positionRepository.findOne({ where: { code: record.code } });
                if (existing) {
                    results.skipped++;
                    continue;
                }
                const pos = this.positionRepository.create({
                    title: record.title,
                    code: record.code,
                    gradeLevel: record.gradeLevel || null,
                    minSalary: record.minSalary ? parseFloat(record.minSalary) : null,
                    maxSalary: record.maxSalary ? parseFloat(record.maxSalary) : null,
                    description: record.description || null,
                    isActive: true,
                });
                await this.positionRepository.save(pos);
                results.created++;
            }
            catch (err) {
                results.skipped++;
                results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
            }
        }
        return results;
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Position)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.EmploymentHistory)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.Subsidiary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        induction_service_1.InductionService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map