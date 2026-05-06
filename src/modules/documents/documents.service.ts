import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, Policy, PolicyAcknowledgement, ContractTemplate } from './entities/document.entity';
import { PolicyStatus } from '../../common/enums';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(PolicyAcknowledgement)
    private ackRepository: Repository<PolicyAcknowledgement>,
  ) {}

  async uploadDocument(dto: any, userId: string) {
    const doc = this.documentRepository.create({
      ...dto,
      uploadedBy: userId,
    });
    return this.documentRepository.save(doc);
  }

  async getMyDocuments(employeeId: string) {
    return this.documentRepository.find({ where: { employeeId } });
  }

  async publishPolicy(policyId: string, userId: string) {
    const policy = await this.policyRepository.findOne({ where: { id: policyId } });
    if (!policy) throw new NotFoundException('Policy not found');

    policy.status = PolicyStatus.PUBLISHED;
    policy.publishedBy = userId;
    policy.publishedAt = new Date();
    
    return this.policyRepository.save(policy);
  }

  async acknowledgePolicy(policyId: string, employeeId: string, signature: string, ip: string) {
    const ack = this.ackRepository.create({
      policyId,
      employeeId,
      signature,
      ipAddress: ip,
      acknowledgedAt: new Date(),
    });
    return this.ackRepository.save(ack);
  }
}
