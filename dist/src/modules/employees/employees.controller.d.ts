import { EmployeesService } from './employees.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateEmployeeDto, CreateDepartmentDto, CreatePositionDto } from './dto';
import { User } from '../auth/entities/user.entity';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    findAllSubsidiaries(): Promise<import("./entities").Subsidiary[]>;
    findAll(paginationDto: PaginationDto): Promise<import("../../common/dto/pagination.dto").PaginatedResult<import("./entities").Employee>>;
    getOrgChart(): Promise<any[]>;
    create(createEmployeeDto: CreateEmployeeDto, user: User): Promise<import("./entities").Employee>;
    findAllDepartments(): Promise<import("./entities").Department[]>;
    createDepartment(dto: CreateDepartmentDto): Promise<import("./entities").Department>;
    findAllPositions(): Promise<import("./entities").Position[]>;
    createPosition(dto: CreatePositionDto): Promise<import("./entities").Position>;
    bulkImportEmployees(body: {
        records: any[];
    }, user: User): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkImportDepartments(body: {
        records: any[];
    }): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    bulkImportPositions(body: {
        records: any[];
    }): Promise<{
        created: number;
        skipped: number;
        errors: string[];
    }>;
    exportEmployees(): Promise<import("../../common/dto/pagination.dto").PaginatedResult<import("./entities").Employee>>;
    exportDepartments(): Promise<import("./entities").Department[]>;
    exportPositions(): Promise<import("./entities").Position[]>;
    findOne(id: string): Promise<import("./entities").Employee>;
}
