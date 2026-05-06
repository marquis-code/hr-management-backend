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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("./entities/document.entity");
const enums_1 = require("../../common/enums");
let DocumentsService = class DocumentsService {
    documentRepository;
    policyRepository;
    ackRepository;
    constructor(documentRepository, policyRepository, ackRepository) {
        this.documentRepository = documentRepository;
        this.policyRepository = policyRepository;
        this.ackRepository = ackRepository;
    }
    async uploadDocument(dto, userId) {
        const doc = this.documentRepository.create({
            ...dto,
            uploadedBy: userId,
        });
        return this.documentRepository.save(doc);
    }
    async getMyDocuments(employeeId) {
        return this.documentRepository.find({ where: { employeeId } });
    }
    async publishPolicy(policyId, userId) {
        const policy = await this.policyRepository.findOne({ where: { id: policyId } });
        if (!policy)
            throw new common_1.NotFoundException('Policy not found');
        policy.status = enums_1.PolicyStatus.PUBLISHED;
        policy.publishedBy = userId;
        policy.publishedAt = new Date();
        return this.policyRepository.save(policy);
    }
    async acknowledgePolicy(policyId, employeeId, signature, ip) {
        const ack = this.ackRepository.create({
            policyId,
            employeeId,
            signature,
            ipAddress: ip,
            acknowledgedAt: new Date(),
        });
        return this.ackRepository.save(ack);
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(document_entity_1.Policy)),
    __param(2, (0, typeorm_1.InjectRepository)(document_entity_1.PolicyAcknowledgement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map