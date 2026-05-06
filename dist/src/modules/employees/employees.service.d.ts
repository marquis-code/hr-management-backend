import { Repository } from 'typeorm';
import { Employee, Department, Position, EmploymentHistory, Subsidiary } from './entities';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';
import { CreateEmployeeDto, CreateDepartmentDto, CreatePositionDto } from './dto';
import { InductionService } from '../induction/induction.service';
export declare class EmployeesService {
    private employeeRepository;
    private departmentRepository;
    private positionRepository;
    private historyRepository;
    private subsidiaryRepository;
    private inductionService;
    private readonly encryptionKey;
    private readonly iv;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>, positionRepository: Repository<Position>, historyRepository: Repository<EmploymentHistory>, subsidiaryRepository: Repository<Subsidiary>, inductionService: InductionService);
    findAllSubsidiaries(): Promise<Subsidiary[]>;
    createSubsidiary(data: {
        name: string;
        code: string;
        country?: string;
    }): Promise<Subsidiary>;
    private encrypt;
    private decrypt;
    generateEmployeeNumber(): Promise<string>;
    create(createEmployeeDto: CreateEmployeeDto, creatorId: string): Promise<Employee>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Employee>>;
    findOne(id: string): Promise<Employee>;
    getOrgChart(): Promise<any[]>;
    createDepartment(dto: CreateDepartmentDto): Promise<Department>;
    findAllDepartments(): Promise<Department[]>;
    createPosition(dto: CreatePositionDto): Promise<Position>;
    findAllPositions(): Promise<Position[]>;
    bulkCreateEmployees(records: any[], creatorId: string): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkCreateDepartments(records: any[]): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkCreatePositions(records: any[]): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
}
