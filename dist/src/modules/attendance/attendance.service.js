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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const enums_1 = require("../../common/enums");
let AttendanceService = class AttendanceService {
    recordRepository;
    scheduleRepository;
    constructor(recordRepository, scheduleRepository) {
        this.recordRepository = recordRepository;
        this.scheduleRepository = scheduleRepository;
    }
    async checkIn(employeeId, dto) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existing = await this.recordRepository.findOne({
            where: { employeeId, date: today }
        });
        if (existing)
            throw new common_1.BadRequestException('Already checked in for today');
        const record = this.recordRepository.create({
            employeeId,
            date: today,
            checkInTime: new Date(),
            checkInMethod: dto.method,
            checkInLocation: dto.location,
            status: enums_1.AttendanceStatus.PRESENT,
        });
        return this.recordRepository.save(record);
    }
    async checkOut(employeeId, location) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const record = await this.recordRepository.findOne({
            where: { employeeId, date: today }
        });
        if (!record)
            throw new common_1.BadRequestException('Not checked in today');
        if (record.checkOutTime)
            throw new common_1.BadRequestException('Already checked out');
        record.checkOutTime = new Date();
        record.checkOutLocation = location;
        const diff = record.checkOutTime.getTime() - record.checkInTime.getTime();
        record.workHours = parseFloat((diff / (1000 * 60 * 60)).toFixed(2));
        return this.recordRepository.save(record);
    }
    async getMyRecords(employeeId) {
        return this.recordRepository.find({
            where: { employeeId },
            order: { date: 'DESC' }
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.AttendanceRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(attendance_entity_1.WorkSchedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map