import { InductionService } from './induction.service';
import { User } from '../auth/entities/user.entity';
import { CreateInductionProgramDto, UpdateInductionProgramDto, SubmitModuleAssessmentDto, MarkLessonWatchedDto, AddModuleDto, AddLessonDto, AddQuestionDto } from './dto/induction.dto';
export declare class InductionController {
    private readonly inductionService;
    constructor(inductionService: InductionService);
    createProgram(dto: CreateInductionProgramDto, user: User): Promise<import("./entities/induction.entity").InductionProgram>;
    findAllPrograms(): Promise<import("./entities/induction.entity").InductionProgram[]>;
    findProgram(id: string): Promise<import("./entities/induction.entity").InductionProgram>;
    updateProgram(id: string, dto: UpdateInductionProgramDto): Promise<import("./entities/induction.entity").InductionProgram>;
    publishProgram(id: string): Promise<import("./entities/induction.entity").InductionProgram>;
    deleteProgram(id: string): Promise<void>;
    addModule(programId: string, dto: AddModuleDto): Promise<import("./entities/induction.entity").InductionSection>;
    deleteModule(id: string): Promise<void>;
    addLesson(moduleId: string, dto: AddLessonDto): Promise<import("./entities/induction.entity").InductionLesson>;
    deleteLesson(id: string): Promise<void>;
    addQuestion(moduleId: string, dto: AddQuestionDto): Promise<import("./entities/induction.entity").InductionQuestion>;
    deleteQuestion(id: string): Promise<void>;
    enrollEmployee(body: {
        employeeId: string;
        programId: string;
    }): Promise<import("./entities/induction.entity").EmployeeInduction>;
    getDashboard(): Promise<any[]>;
    getMyInduction(user: User): Promise<import("./entities/induction.entity").EmployeeInduction | null>;
    markLessonWatched(user: User, dto: MarkLessonWatchedDto): Promise<import("./entities/induction.entity").SectionProgress>;
    submitAssessment(user: User, dto: SubmitModuleAssessmentDto): Promise<import("./entities/induction.entity").SectionProgress>;
}
