export declare class AuditLog {
    id: string;
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    previousValue: any;
    newValue: any;
    ipAddress: string | null;
    userAgent: string | null;
    timestamp: Date;
}
