import type { Request } from 'express';
import { DocumentsService } from './documents.service';
import { User } from '../auth/entities/user.entity';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    getMyDocuments(user: User): Promise<import("./entities").Document[]>;
    acknowledge(id: string, user: User, signature: string, req: Request): Promise<import("./entities").PolicyAcknowledgement>;
    publish(id: string, user: User): Promise<import("./entities").Policy>;
}
