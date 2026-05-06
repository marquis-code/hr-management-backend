import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import * as crypto from 'crypto';
import { Employee, Department, Position, EmploymentHistory, Subsidiary } from './entities';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';
import { CreateEmployeeDto, UpdateEmployeeDto, CreateDepartmentDto, CreatePositionDto } from './dto';
import { EmploymentHistoryType } from '../../common/enums';
import { InductionService } from '../induction/induction.service';

@Injectable()
export class EmployeesService {
  private readonly encryptionKey = crypto.scryptSync(process.env.JWT_SECRET || 'secret', 'salt', 32);
  private readonly iv = crypto.randomBytes(16);

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(EmploymentHistory)
    private historyRepository: Repository<EmploymentHistory>,
    @InjectRepository(Subsidiary)
    private subsidiaryRepository: Repository<Subsidiary>,
    private inductionService: InductionService,
  ) {}

  async findAllSubsidiaries() {
    return this.subsidiaryRepository.find();
  }

  async createSubsidiary(data: { name: string; code: string; country?: string }) {
    const subsidiary = this.subsidiaryRepository.create(data);
    return this.subsidiaryRepository.save(subsidiary);
  }

  private encrypt(text: string): string | null {
    if (!text) return null;
    const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, this.iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decrypt(hash: string): string | null {
    if (!hash) return null;
    const [ivHex, contentHex] = hash.split(':');
    const decipher = crypto.createDecipheriv('aes-256-ctr', this.encryptionKey, Buffer.from(ivHex, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(contentHex, 'hex')), decipher.final()]);
    return decrypted.toString();
  }

  async generateEmployeeNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const lastEmployee = await this.employeeRepository.findOne({
      where: { employeeNumber: Like(`CF-${year}-%`) },
      order: { employeeNumber: 'DESC' },
    });

    let sequence = 1;
    if (lastEmployee) {
      const lastSeq = parseInt(lastEmployee.employeeNumber.split('-')[2], 10);
      sequence = lastSeq + 1;
    }

    return `CF-${year}-${sequence.toString().padStart(3, '0')}`;
  }

  async create(createEmployeeDto: CreateEmployeeDto, creatorId: string) {
    const employeeNumber = await this.generateEmployeeNumber();
    
    // Encrypt bank details if present
    if (createEmployeeDto.bankDetails?.accountNumber) {
      createEmployeeDto.bankDetails.accountNumber = this.encrypt(createEmployeeDto.bankDetails.accountNumber);
    }

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      employeeNumber,
      createdBy: creatorId,
    });

    const savedEmployee = await this.employeeRepository.save(employee);

    // Auto-enroll in induction if subsidiary is set
    if (savedEmployee.subsidiaryId) {
      await this.inductionService.autoEnrollNewEmployee(savedEmployee.id, savedEmployee.subsidiaryId);
    }

    // Initial history record
    await this.historyRepository.save({
      employeeId: savedEmployee.id,
      type: EmploymentHistoryType.STATUS_CHANGE,
      toValue: { status: savedEmployee.employmentStatus },
      effectiveDate: savedEmployee.hireDate,
      reason: 'Initial Hiring',
      createdBy: creatorId,
    });

    return savedEmployee;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC', search } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.employeeRepository.createQueryBuilder('employee');
    queryBuilder.leftJoinAndSelect('employee.manager', 'manager');

    if (search) {
      queryBuilder.where(
        '(employee.firstName ILIKE :search OR employee.lastName ILIKE :search OR employee.employeeNumber ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    queryBuilder
      .orderBy(`employee.${sortBy}`, sortOrder)
      .skip(skip)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();
    return new PaginatedResult(items, total, page, limit);
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['manager', 'subordinates'],
    });

    if (!employee) throw new NotFoundException('Employee not found');
    
    // Decrypt bank details for display
    if (employee.bankDetails?.accountNumber) {
      employee.bankDetails.accountNumber = this.decrypt(employee.bankDetails.accountNumber) || '';
    }

    return employee;
  }

  async getOrgChart() {
    const employees = await this.employeeRepository.find({
      select: ['id', 'firstName', 'lastName', 'jobTitle', 'managerId', 'profilePhoto'],
      where: { employmentStatus: In(['ACTIVE', 'ON_LEAVE']) }
    });

    const map: Record<string, any> = {};
    employees.forEach(emp => { map[emp.id] = { ...emp, children: [] }; });
    
    const roots: any[] = [];
    employees.forEach(emp => {
      if (emp.managerId && map[emp.managerId]) {
        map[emp.managerId].children.push(map[emp.id]);
      } else {
        roots.push(map[emp.id]);
      }
    });

    return roots;
  }

  // Department methods
  async createDepartment(dto: CreateDepartmentDto) {
    const dept = this.departmentRepository.create(dto);
    return this.departmentRepository.save(dept);
  }

  async findAllDepartments() {
    return this.departmentRepository.find({ relations: ['parentDepartment'] });
  }

  // Position methods
  async createPosition(dto: CreatePositionDto) {
    const pos = this.positionRepository.create(dto);
    return this.positionRepository.save(pos);
  }

  async findAllPositions() {
    return this.positionRepository.find();
  }

  // Bulk import methods
  async bulkCreateEmployees(records: any[], creatorId: string) {
    const results = { created: 0, skipped: 0, errors: [] as string[] };

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
      } catch (err: any) {
        results.skipped++;
        results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
      }
    }

    return results;
  }

  async bulkCreateDepartments(records: any[]) {
    const results = { created: 0, skipped: 0, errors: [] as string[] };

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
      } catch (err: any) {
        results.skipped++;
        results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
      }
    }

    return results;
  }

  async bulkCreatePositions(records: any[]) {
    const results = { created: 0, skipped: 0, errors: [] as string[] };

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
        } as any);
        await this.positionRepository.save(pos);
        results.created++;
      } catch (err: any) {
        results.skipped++;
        results.errors.push(`Row ${results.created + results.skipped}: ${err.message}`);
      }
    }

    return results;
  }
}
