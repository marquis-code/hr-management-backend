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
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const approval_request_entity_1 = require("./entities/approval-request.entity");
let ApprovalService = class ApprovalService {
    approvalRepository;
    dataSource;
    constructor(approvalRepository, dataSource) {
        this.approvalRepository = approvalRepository;
        this.dataSource = dataSource;
    }
    async createRequest(makerId, subsidiaryId, entity, action, payload, targetId) {
        const request = this.approvalRepository.create({
            makerId,
            subsidiaryId,
            targetEntity: entity,
            action,
            payload,
            targetId,
            status: approval_request_entity_1.ApprovalStatus.PENDING,
        });
        return this.approvalRepository.save(request);
    }
    async processRequest(requestId, checkerId, status, comment) {
        const request = await this.approvalRepository.findOne({ where: { id: requestId } });
        if (!request)
            throw new common_1.NotFoundException('Approval request not found');
        if (request.status !== approval_request_entity_1.ApprovalStatus.PENDING)
            throw new common_1.BadRequestException('Request already processed');
        request.status = status;
        request.checkerId = checkerId;
        request.checkerComment = comment || '';
        request.processedAt = new Date();
        if (status === approval_request_entity_1.ApprovalStatus.APPROVED) {
            await this.executeApprovedAction(request);
        }
        return this.approvalRepository.save(request);
    }
    async executeApprovedAction(request) {
        const { targetEntity, action, payload, targetId } = request;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const repository = queryRunner.manager.getRepository(targetEntity);
            if (action === 'CREATE') {
                const entity = repository.create(payload);
                await repository.save(entity);
            }
            else if (action === 'UPDATE') {
                await repository.update(targetId, payload);
            }
            else if (action === 'DELETE') {
                await repository.softDelete(targetId);
            }
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(`Failed to execute approved action: ${err.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async getPendingRequests(subsidiaryId) {
        const where = subsidiaryId ? { status: approval_request_entity_1.ApprovalStatus.PENDING, subsidiaryId } : { status: approval_request_entity_1.ApprovalStatus.PENDING };
        return this.approvalRepository.find({ where, order: { createdAt: 'DESC' } });
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(approval_request_entity_1.ApprovalRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map