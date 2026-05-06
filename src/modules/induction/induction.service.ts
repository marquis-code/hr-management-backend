import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  InductionProgram, InductionSection, InductionLesson,
  InductionQuestion, EmployeeInduction, SectionProgress
} from './entities/induction.entity';
import { Employee } from '../employees/entities/employee.entity';
import { InductionProgramStatus, InductionStatus } from '../../common/enums';
import {
  CreateInductionProgramDto, UpdateInductionProgramDto,
  SubmitModuleAssessmentDto, MarkLessonWatchedDto,
  AddModuleDto, AddLessonDto, AddQuestionDto
} from './dto/induction.dto';

@Injectable()
export class InductionService {
  constructor(
    @InjectRepository(InductionProgram)
    private programRepo: Repository<InductionProgram>,
    @InjectRepository(InductionSection)
    private sectionRepo: Repository<InductionSection>,
    @InjectRepository(InductionLesson)
    private lessonRepo: Repository<InductionLesson>,
    @InjectRepository(InductionQuestion)
    private questionRepo: Repository<InductionQuestion>,
    @InjectRepository(EmployeeInduction)
    private enrollmentRepo: Repository<EmployeeInduction>,
    @InjectRepository(SectionProgress)
    private progressRepo: Repository<SectionProgress>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  // ──────────────────────────────────────────
  // ADMIN: Program CRUD
  // ──────────────────────────────────────────

  async createProgram(dto: CreateInductionProgramDto, creatorId: string): Promise<InductionProgram> {
    const program = this.programRepo.create({
      title: dto.title,
      description: dto.description,
      subsidiaryId: dto.subsidiaryId,
      passingScore: dto.passingScore || 70,
      createdBy: creatorId,
    });
    const saved = await this.programRepo.save(program);

    if (dto.modules?.length) {
      for (const modDto of dto.modules) {
        const sec = this.sectionRepo.create({
          programId: saved.id,
          title: modDto.title,
          description: modDto.description,
          sortOrder: modDto.sortOrder || 0,
        });
        const savedSec = await this.sectionRepo.save(sec);

        if (modDto.lessons?.length) {
          for (const lessonDto of modDto.lessons) {
            await this.lessonRepo.save(this.lessonRepo.create({
              sectionId: savedSec.id,
              ...lessonDto,
            }));
          }
        }

        if (modDto.questions?.length) {
          for (const qDto of modDto.questions) {
            await this.questionRepo.save(this.questionRepo.create({
              sectionId: savedSec.id,
              ...qDto,
            }));
          }
        }
      }
    }

    return this.findProgramById(saved.id);
  }

  async findAllPrograms(): Promise<InductionProgram[]> {
    return this.programRepo.find({
      relations: ['sections', 'sections.lessons', 'sections.questions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findProgramById(id: string): Promise<InductionProgram> {
    const program = await this.programRepo.findOne({
      where: { id },
      relations: ['sections', 'sections.lessons', 'sections.questions'],
    });
    if (!program) throw new NotFoundException('Induction program not found');
    return program;
  }

  async findProgramsBySubsidiary(subsidiaryId: string): Promise<InductionProgram[]> {
    return this.programRepo.find({
      where: { subsidiaryId, status: InductionProgramStatus.PUBLISHED },
      relations: ['sections', 'sections.lessons', 'sections.questions'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateProgram(id: string, dto: UpdateInductionProgramDto): Promise<InductionProgram> {
    const program = await this.findProgramById(id);
    Object.assign(program, dto);
    await this.programRepo.save(program);
    return this.findProgramById(id);
  }

  async publishProgram(id: string): Promise<InductionProgram> {
    const program = await this.findProgramById(id);
    if (!program.sections?.length) {
      throw new BadRequestException('Cannot publish a program with no sections');
    }
    program.status = InductionProgramStatus.PUBLISHED;
    await this.programRepo.save(program);
    return program;
  }

  async deleteProgram(id: string): Promise<void> {
    const program = await this.findProgramById(id);
    await this.programRepo.remove(program);
  }

  // ──────────────────────────────────────────
  // ADMIN: Section / Lesson / Question CRUD
  // ──────────────────────────────────────────

  async addModule(programId: string, dto: AddModuleDto): Promise<InductionSection> {
    await this.findProgramById(programId);
    const sec = this.sectionRepo.create({ ...dto, programId });
    return this.sectionRepo.save(sec);
  }

  async addLesson(sectionId: string, dto: AddLessonDto): Promise<InductionLesson> {
    const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
    if (!sec) throw new NotFoundException('Section not found');
    const lesson = this.lessonRepo.create({ ...dto, sectionId });
    return this.lessonRepo.save(lesson);
  }

  async addQuestion(sectionId: string, dto: AddQuestionDto): Promise<InductionQuestion> {
    const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
    if (!sec) throw new NotFoundException('Section not found');
    const question = this.questionRepo.create({ ...dto, sectionId });
    return this.questionRepo.save(question);
  }

  async deleteModule(sectionId: string): Promise<void> {
    const sec = await this.sectionRepo.findOne({ where: { id: sectionId } });
    if (!sec) throw new NotFoundException('Section not found');
    await this.sectionRepo.remove(sec);
  }

  async deleteLesson(lessonId: string): Promise<void> {
    const lesson = await this.lessonRepo.findOne({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    await this.lessonRepo.remove(lesson);
  }

  async deleteQuestion(questionId: string): Promise<void> {
    const q = await this.questionRepo.findOne({ where: { id: questionId } });
    if (!q) throw new NotFoundException('Question not found');
    await this.questionRepo.remove(q);
  }

  // ──────────────────────────────────────────
  // ADMIN: Enrollment & Dashboard
  // ──────────────────────────────────────────

  async enrollEmployee(employeeId: string, programId: string): Promise<EmployeeInduction> {
    const employee = await this.employeeRepo.findOne({ where: { id: employeeId } });
    if (!employee) throw new NotFoundException('Employee not found');

    const program = await this.findProgramById(programId);
    if (program.status !== InductionProgramStatus.PUBLISHED) {
      throw new BadRequestException('Program is not published yet');
    }

    const existing = await this.enrollmentRepo.findOne({
      where: { employeeId, programId },
    });
    if (existing) return existing;

    const enrollment = this.enrollmentRepo.create({
      employeeId,
      programId,
      status: InductionStatus.NOT_STARTED,
    });
    const saved = await this.enrollmentRepo.save(enrollment);

    for (const sec of program.sections) {
      await this.progressRepo.save(this.progressRepo.create({
        enrollmentId: saved.id,
        sectionId: sec.id,
        watchedLessonIds: [],
      }));
    }

    await this.employeeRepo.update(employeeId, {
      inductionStatus: InductionStatus.NOT_STARTED,
    });

    const refreshed = await this.getEnrollmentDetails(saved.id);
    if (!refreshed) throw new Error('Failed to load enrollment details');
    return refreshed;
  }

  async autoEnrollNewEmployee(employeeId: string, subsidiaryId: string): Promise<EmployeeInduction | null> {
    if (!subsidiaryId) return null;

    const programs = await this.findProgramsBySubsidiary(subsidiaryId);
    if (!programs.length) return null;

    return this.enrollEmployee(employeeId, programs[0].id);
  }

  async getEnrollmentDashboard(): Promise<any[]> {
    const enrollments = await this.enrollmentRepo.find({
      relations: ['program', 'sectionProgress', 'sectionProgress.section'],
      order: { createdAt: 'DESC' },
    });

    const enriched: any[] = [];
    for (const enrollment of enrollments) {
      const employee = await this.employeeRepo.findOne({ where: { id: enrollment.employeeId } });
      enriched.push({
        ...enrollment,
        employee: employee ? {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          employeeNumber: employee.employeeNumber,
          jobTitle: employee.jobTitle,
          subsidiaryId: employee.subsidiaryId,
        } : null,
      });
    }

    return enriched;
  }

  // ──────────────────────────────────────────
  // EMPLOYEE: Self-service induction flow
  // ──────────────────────────────────────────

  async getMyInduction(employeeId: string): Promise<EmployeeInduction | null> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { employeeId },
      relations: ['program', 'program.sections', 'program.sections.lessons', 'program.sections.questions', 'sectionProgress'],
      order: { createdAt: 'DESC' },
    });

    return enrollment;
  }

  async markLessonWatched(employeeId: string, dto: MarkLessonWatchedDto): Promise<SectionProgress> {
    const lesson = await this.lessonRepo.findOne({ where: { id: dto.lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const enrollment = await this.enrollmentRepo.findOne({
      where: { employeeId },
      relations: ['sectionProgress'],
    });
    if (!enrollment) throw new NotFoundException('You are not enrolled in any induction program');

    let progress = enrollment.sectionProgress.find(sp => sp.sectionId === lesson.sectionId);
    if (!progress) throw new BadRequestException('Section progress record not found');

    if (!progress.watchedLessonIds.includes(dto.lessonId)) {
      progress.watchedLessonIds = [...progress.watchedLessonIds, dto.lessonId];
    }

    const allLessons = await this.lessonRepo.find({ where: { sectionId: lesson.sectionId } });
    progress.allLessonsWatched = allLessons.every(l => progress.watchedLessonIds.includes(l.id));

    await this.progressRepo.save(progress);

    if (enrollment.status === InductionStatus.NOT_STARTED) {
      enrollment.status = InductionStatus.IN_PROGRESS;
      enrollment.startedAt = new Date();
      await this.enrollmentRepo.save(enrollment);

      await this.employeeRepo.update(employeeId, {
        inductionStatus: InductionStatus.IN_PROGRESS,
      });
    }

    await this.recalculateProgress(enrollment.id);

    return progress;
  }

  async submitModuleAssessment(employeeId: string, dto: SubmitModuleAssessmentDto): Promise<SectionProgress> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { employeeId },
      relations: ['program', 'sectionProgress'],
    });
    if (!enrollment) throw new NotFoundException('You are not enrolled in any induction program');

    const progress = enrollment.sectionProgress.find(sp => sp.sectionId === dto.moduleId);
    if (!progress) throw new BadRequestException('Section progress record not found');

    if (!progress.allLessonsWatched) {
      throw new BadRequestException('You must watch all lessons in this section before taking the assessment');
    }

    const questions = await this.questionRepo.find({
      where: { sectionId: dto.moduleId },
      order: { sortOrder: 'ASC' },
    });

    if (!questions.length) {
      progress.assessmentCompleted = true;
      progress.assessmentPassed = true;
      progress.assessmentScore = 100;
      progress.completedAt = new Date();
      progress.answers = dto.answers;
      await this.progressRepo.save(progress);
      await this.recalculateProgress(enrollment.id);
      return progress;
    }

    let correct = 0;
    questions.forEach((q, index) => {
      if (dto.answers[index] === q.correctOptionIndex) correct++;
    });

    const score = (correct / questions.length) * 100;
    const passingScore = enrollment.program?.passingScore || 70;

    progress.assessmentCompleted = true;
    progress.assessmentScore = parseFloat(score.toFixed(2));
    progress.assessmentPassed = score >= passingScore;
    progress.answers = dto.answers;
    if (progress.assessmentPassed) {
      progress.completedAt = new Date();
    }

    await this.progressRepo.save(progress);
    await this.recalculateProgress(enrollment.id);

    return progress;
  }

  private async recalculateProgress(enrollmentId: string): Promise<void> {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id: enrollmentId },
      relations: ['sectionProgress'],
    });
    if (!enrollment) return;

    const total = enrollment.sectionProgress.length;
    if (total === 0) return;

    const completed = enrollment.sectionProgress.filter(
      sp => sp.allLessonsWatched && sp.assessmentPassed
    ).length;

    const progressPct = parseFloat(((completed / total) * 100).toFixed(2));
    enrollment.progressPercentage = progressPct;

    const scored = enrollment.sectionProgress.filter(sp => sp.assessmentScore !== null && sp.assessmentScore !== undefined);
    if (scored.length > 0) {
      const avgScore = scored.reduce((sum, sp) => sum + Number(sp.assessmentScore), 0) / scored.length;
      enrollment.assessmentScore = parseFloat(avgScore.toFixed(2));
    }

    if (progressPct === 100) {
      enrollment.status = InductionStatus.COMPLETED;
      enrollment.completedAt = new Date();
      await this.enrollmentRepo.save(enrollment);

      await this.employeeRepo.update(enrollment.employeeId, {
        inductionStatus: InductionStatus.COMPLETED,
      });
    } else {
      await this.enrollmentRepo.save(enrollment);
    }
  }

  private async getEnrollmentDetails(enrollmentId: string): Promise<EmployeeInduction | null> {
    return this.enrollmentRepo.findOne({
      where: { id: enrollmentId },
      relations: ['program', 'sectionProgress', 'sectionProgress.section'],
    });
  }
}
