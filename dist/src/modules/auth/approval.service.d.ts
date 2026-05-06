import { Repository, DataSource } from 'typeorm';
import { ApprovalRequest, ApprovalStatus } from './entities/approval-request.entity';
export declare class ApprovalService {
    private approvalRepository;
    private dataSource;
    constructor(approvalRepository: Repository<ApprovalRequest>, dataSource: DataSource);
    createRequest(makerId: string, subsidiaryId: string, entity: string, action: string, payload: any, targetId?: string): Promise<ApprovalRequest>;
    processRequest(requestId: string, checkerId: string, status: ApprovalStatus, comment?: string): Promise<ApprovalRequest>;
    private executeApprovedAction;
    getPendingRequests(subsidiaryId?: string): Promise<ApprovalRequest[]>;
}
