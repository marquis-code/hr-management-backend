import { Repository } from 'typeorm';
import { Document, Policy, PolicyAcknowledgement } from './entities/document.entity';
export declare class DocumentsService {
    private documentRepository;
    private policyRepository;
    private ackRepository;
    constructor(documentRepository: Repository<Document>, policyRepository: Repository<Policy>, ackRepository: Repository<PolicyAcknowledgement>);
    uploadDocument(dto: any, userId: string): Promise<Document[]>;
    getMyDocuments(employeeId: string): Promise<Document[]>;
    publishPolicy(policyId: string, userId: string): Promise<Policy>;
    acknowledgePolicy(policyId: string, employeeId: string, signature: string, ip: string): Promise<PolicyAcknowledgement>;
}
