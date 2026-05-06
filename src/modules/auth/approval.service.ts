import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ApprovalRequest, ApprovalStatus } from './entities/approval-request.entity';

@Injectable()
export class ApprovalService {
  constructor(
    @InjectRepository(ApprovalRequest)
    private approvalRepository: Repository<ApprovalRequest>,
    private dataSource: DataSource,
  ) {}

  async createRequest(makerId: string, subsidiaryId: string, entity: string, action: string, payload: any, targetId?: string) {
    const request = this.approvalRepository.create({
      makerId,
      subsidiaryId,
      targetEntity: entity,
      action,
      payload,
      targetId,
      status: ApprovalStatus.PENDING,
    });
    return this.approvalRepository.save(request);
  }

  async processRequest(requestId: string, checkerId: string, status: ApprovalStatus, comment?: string) {
    const request = await this.approvalRepository.findOne({ where: { id: requestId } });
    if (!request) throw new NotFoundException('Approval request not found');
    if (request.status !== ApprovalStatus.PENDING) throw new BadRequestException('Request already processed');

    request.status = status;
    request.checkerId = checkerId;
    request.checkerComment = comment || '';
    request.processedAt = new Date();

    if (status === ApprovalStatus.APPROVED) {
      // DYNAMIC EXECUTION ENGINE
      // This part uses TypeORM to dynamically apply the payload to the actual tables
      await this.executeApprovedAction(request);
    }

    return this.approvalRepository.save(request);
  }

  private async executeApprovedAction(request: ApprovalRequest) {
    const { targetEntity, action, payload, targetId } = request;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const repository = queryRunner.manager.getRepository(targetEntity);
      
      if (action === 'CREATE') {
        const entity = repository.create(payload);
        await repository.save(entity);
      } else if (action === 'UPDATE') {
        await repository.update(targetId, payload);
      } else if (action === 'DELETE') {
        await repository.softDelete(targetId);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Failed to execute approved action: ${err.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  async getPendingRequests(subsidiaryId?: string) {
    const where = subsidiaryId ? { status: ApprovalStatus.PENDING, subsidiaryId } : { status: ApprovalStatus.PENDING };
    return this.approvalRepository.find({ where, order: { createdAt: 'DESC' } });
  }
}
