"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InductionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const induction_entity_1 = require("./entities/induction.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const induction_service_1 = require("./induction.service");
const induction_controller_1 = require("./induction.controller");
let InductionModule = class InductionModule {
};
exports.InductionModule = InductionModule;
exports.InductionModule = InductionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                induction_entity_1.InductionProgram,
                induction_entity_1.InductionSection,
                induction_entity_1.InductionLesson,
                induction_entity_1.InductionQuestion,
                induction_entity_1.EmployeeInduction,
                induction_entity_1.SectionProgress,
                employee_entity_1.Employee
            ])
        ],
        controllers: [induction_controller_1.InductionController],
        providers: [induction_service_1.InductionService],
        exports: [induction_service_1.InductionService],
    })
], InductionModule);
//# sourceMappingURL=induction.module.js.map