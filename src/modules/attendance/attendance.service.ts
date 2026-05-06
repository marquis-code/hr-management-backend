import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord, WorkSchedule, EmployeeSchedule } from './entities/attendance.entity';
import { CheckInDto } from '../leave/dto/leave.dto'; // Reusing location/method DTO
import { AttendanceStatus } from '../../common/enums';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private recordRepository: Repository<AttendanceRecord>,
    @InjectRepository(WorkSchedule)
    private scheduleRepository: Repository<WorkSchedule>,
  ) {}

  async checkIn(employeeId: string, dto: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.recordRepository.findOne({
      where: { employeeId, date: today }
    });

    if (existing) throw new BadRequestException('Already checked in for today');

    const record = this.recordRepository.create({
      employeeId,
      date: today,
      checkInTime: new Date(),
      checkInMethod: dto.method,
      checkInLocation: dto.location,
      status: AttendanceStatus.PRESENT,
    });

    return this.recordRepository.save(record);
  }

  async checkOut(employeeId: string, location?: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await this.recordRepository.findOne({
      where: { employeeId, date: today }
    });

    if (!record) throw new BadRequestException('Not checked in today');
    if (record.checkOutTime) throw new BadRequestException('Already checked out');

    record.checkOutTime = new Date();
    record.checkOutLocation = location;

    // Calculate hours
    const diff = record.checkOutTime.getTime() - record.checkInTime.getTime();
    record.workHours = parseFloat((diff / (1000 * 60 * 60)).toFixed(2));

    return this.recordRepository.save(record);
  }

  async getMyRecords(employeeId: string) {
    return this.recordRepository.find({
      where: { employeeId },
      order: { date: 'DESC' }
    });
  }
}
