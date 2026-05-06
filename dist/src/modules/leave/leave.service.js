"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_entity_1 = require("./entities/leave.entity");
const attendance_entity_1 = require("../attendance/entities/attendance.entity");
const enums_1 = require("../../common/enums");
let LeaveService = class LeaveService {
    leaveTypeRepository;
    leaveBalanceRepository;
    leaveRequestRepository;
    holidayRepository;
    constructor(leaveTypeRepository, leaveBalanceRepository, leaveRequestRepository, holidayRepository) {
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.holidayRepository = holidayRepository;
    }
    async calculateBusinessDays(startDate, endDate) {
        const holidays = await this.holidayRepository.find();
        const holidayDates = holidays.map(h => new Date(h.date).toDateString());
        let count = 0;
        const curDate = new Date(startDate);
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isHoliday = holidayDates.includes(curDate.toDateString());
            if (!isWeekend && !isHoliday)
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }
    async getBalances(employeeId) {
        return this.leaveBalanceRepository.find({
            where: { employeeId },
            relations: ['leaveType'],
        });
    }
    async getRequests(user) {
        const isHrOrAdmin = [enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.HR_ADMIN, enums_1.UserRole.HR_MANAGER].includes(user.systemRole);
        if (isHrOrAdmin) {
            return this.leaveRequestRepository.find({
                relations: ['leaveType', 'employee'],
                order: { createdAt: 'DESC' }
            });
        }
        if (!user.employeeId)
            return [];
        return this.leaveRequestRepository.find({
            where: { employeeId: user.employeeId },
            relations: ['leaveType'],
            order: { createdAt: 'DESC' }
        });
    }
    async submitRequest(employeeId, dto) {
        const days = await this.calculateBusinessDays(dto.startDate, dto.endDate);
        if (days <= 0)
            throw new common_1.BadRequestException('Leave period contains no working days');
        const balance = await this.leaveBalanceRepository.findOne({
            where: { employeeId, leaveTypeId: dto.leaveTypeId, year: new Date().getFullYear() }
        });
        if (!balance || (balance.allocatedDays + balance.carryOverDays - balance.usedDays - balance.pendingDays) < days) {
            throw new common_1.BadRequestException('Insufficient leave balance');
        }
        const overlap = await this.leaveRequestRepository.findOne({
            where: [
                { employeeId, startDate: (0, typeorm_2.Between)(dto.startDate, dto.endDate), status: enums_1.LeaveRequestStatus.APPROVED },
                { employeeId, endDate: (0, typeorm_2.Between)(dto.startDate, dto.endDate), status: enums_1.LeaveRequestStatus.APPROVED }
            ]
        });
        if (overlap)
            throw new common_1.BadRequestException('Request overlaps with an existing approved leave');
        const request = this.leaveRequestRepository.create({
            ...dto,
            employeeId,
            numberOfDays: days,
            status: enums_1.LeaveRequestStatus.PENDING,
        });
        balance.pendingDays += days;
        await this.leaveBalanceRepository.save(balance);
        return this.leaveRequestRepository.save(request);
    }
    async handleAction(requestId, approverId, dto) {
        const request = await this.leaveRequestRepository.findOne({ where: { id: requestId } });
        if (!request)
            throw new common_1.NotFoundException('Leave request not found');
        if (dto.status === enums_1.LeaveRequestStatus.APPROVED) {
            request.status = enums_1.LeaveRequestStatus.APPROVED;
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
        }
        else if (dto.status === enums_1.LeaveRequestStatus.REJECTED) {
            request.status = enums_1.LeaveRequestStatus.REJECTED;
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
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_entity_1.LeaveType)),
    __param(1, (0, typeorm_1.InjectRepository)(leave_entity_1.LeaveBalance)),
    __param(2, (0, typeorm_1.InjectRepository)(leave_entity_1.LeaveRequest)),
    __param(3, (0, typeorm_1.InjectRepository)(attendance_entity_1.PublicHoliday)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LeaveService);
//# sourceMappingURL=leave.service.js.map