import { DocumentCategory, DocumentStatus, PolicyStatus, ContractType } from '../../../common/enums';
export declare class Document {
    id: string;
    title: string;
    description: string;
    category: DocumentCategory;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    version: string;
    employeeId: string;
    uploadedBy: string;
    expiryDate: Date;
    isConfidential: boolean;
    tags: string[];
    status: DocumentStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class Policy {
    id: string;
    title: string;
    category: string;
    content: string;
    version: string;
    effectiveDate: Date;
    acknowledgementRequired: boolean;
    status: PolicyStatus;
    publishedBy: string;
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class PolicyAcknowledgement {
    id: string;
    policyId: string;
    employeeId: string;
    acknowledgedAt: Date;
    signature: string;
    ipAddress: string;
    createdAt: Date;
}
export declare class ContractTemplate {
    id: string;
    name: string;
    type: ContractType;
    content: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
