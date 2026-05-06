import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { LeaveType, LeaveBalance, LeaveRequest, LeaveApprovalFlow } from './entities/leave.entity';
import { PublicHoliday } from '../attendance/entities/attendance.entity';
import { CreateLeaveRequestDto, LeaveActionDto } from './dto';
import { LeaveRequestStatus, UserRole } from '../../common/enums';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveType)
    private leaveTypeRepository: Repository<LeaveType>,
    @InjectRepository(LeaveBalance)
    private leaveBalanceRepository: Repository<LeaveBalance>,
    @InjectRepository(LeaveRequest)
    private leaveRequestRepository: Repository<LeaveRequest>,
    @InjectRepository(PublicHoliday)
    private holidayRepository: Repository<PublicHoliday>,
  ) {}

  async calculateBusinessDays(startDate: Date, endDate: Date): Promise<number> {
    const holidays = await this.holidayRepository.find();
    const holidayDates = holidays.map(h => new Date(h.date).toDateString());
    
    let count = 0;
    const curDate = new Date(startDate);
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = holidayDates.includes(curDate.toDateString());
      
      if (!isWeekend && !isHoliday) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  async getBalances(employeeId: string) {
    return this.leaveBalanceRepository.find({
      where: { employeeId },
      relations: ['leaveType'],
    });
  }

  async getRequests(user: any) {
    const isHrOrAdmin = [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.HR_MANAGER].includes(user.systemRole);

    if (isHrOrAdmin) {
      return this.leaveRequestRepository.find({
        relations: ['leaveType', 'employee'],
        order: { createdAt: 'DESC' }
      });
    }

    if (!user.employeeId) return [];

    return this.leaveRequestRepository.find({
      where: { employeeId: user.employeeId },
      relations: ['leaveType'],
      order: { createdAt: 'DESC' }
    });
  }

  async submitRequest(employeeId: string, dto: CreateLeaveRequestDto) {
    const days = await this.calculateBusinessDays(dto.startDate, dto.endDate);
    if (days <= 0) throw new BadRequestException('Leave period contains no working days');

    const balance = await this.leaveBalanceRepository.findOne({
      where: { employeeId, leaveTypeId: dto.leaveTypeId, year: new Date().getFullYear() }
    });

    if (!balance || (balance.allocatedDays + balance.carryOverDays - balance.usedDays - balance.pendingDays) < days) {
      throw new BadRequestException('Insufficient leave balance');
    }

    const overlap = await this.leaveRequestRepository.findOne({
      where: [
        { employeeId, startDate: Between(dto.startDate, dto.endDate), status: LeaveRequestStatus.APPROVED },
        { employeeId, endDate: Between(dto.startDate, dto.endDate), status: LeaveRequestStatus.APPROVED }
      ]
    });

    if (overlap) throw new BadRequestException('Request overlaps with an existing approved leave');

    const request = this.leaveRequestRepository.create({
      ...dto,
      employeeId,
      numberOfDays: days,
      status: LeaveRequestStatus.PENDING,
    });

    balance.pendingDays += days;
    await this.leaveBalanceRepository.save(balance);
    
    return this.leaveRequestRepository.save(request);
  }

  async handleAction(requestId: string, approverId: string, dto: LeaveActionDto) {
    const request = await this.leaveRequestRepository.findOne({ where: { id: requestId } });
    if (!request) throw new NotFoundException('Leave request not found');

    if (dto.status === LeaveRequestStatus.APPROVED) {
      request.status = LeaveRequestStatus.APPROVED;
      request.approvedBy = approverId;
      request.approvedAt = new Date();

      const balance = await this.leaveBalanceRepository.findOne({
        where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year: new Date().getFullYear() }
      });
      if (balance) {
        balance.pendingDays -= request.numberOfDays;
        balance.usedDays += request.numberOfDays;
        await this.leaveBalanceRepository.save(balance);
      }
    } else if (dto.status === LeaveRequestStatus.REJECTED) {
      request.status = LeaveRequestStatus.REJECTED;
      request.rejectionReason = dto.comment || '';

      const balance = await this.leaveBalanceRepository.findOne({
        where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year: new Date().getFullYear() }
      });
      if (balance) {
        balance.pendingDays -= request.numberOfDays;
        await this.leaveBalanceRepository.save(balance);
      }
    }

    return this.leaveRequestRepository.save(request);
  }
}
