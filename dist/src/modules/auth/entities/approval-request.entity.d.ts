export declare enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class ApprovalRequest {
    id: string;
    targetEntity: string;
    targetId: string;
    action: string;
    payload: any;
    status: ApprovalStatus;
    makerId: string;
    checkerId: string;
    checkerComment: string;
    subsidiaryId: string;
    processedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
