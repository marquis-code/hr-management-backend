"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const performance_service_1 = require("./performance.service");
const performance_controller_1 = require("./performance.controller");
let PerformanceModule = class PerformanceModule {
};
exports.PerformanceModule = PerformanceModule;
exports.PerformanceModule = PerformanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.ReviewCycle,
                entities_1.Goal,
                entities_1.PerformanceReview,
                entities_1.ReviewSection,
                entities_1.Competency,
                entities_1.DevelopmentPlan,
                entities_1.Feedback
            ])
        ],
        controllers: [performance_controller_1.PerformanceController],
        providers: [performance_service_1.PerformanceService],
        exports: [performance_service_1.PerformanceService],
    })
], PerformanceModule);
//# sourceMappingURL=performance.module.js.map