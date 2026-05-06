"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const auth_module_1 = require("./modules/auth/auth.module");
const employees_module_1 = require("./modules/employees/employees.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const leave_module_1 = require("./modules/leave/leave.module");
const payroll_module_1 = require("./modules/payroll/payroll.module");
const recruitment_module_1 = require("./modules/recruitment/recruitment.module");
const onboarding_module_1 = require("./modules/onboarding/onboarding.module");
const performance_module_1 = require("./modules/performance/performance.module");
const documents_module_1 = require("./modules/documents/documents.module");
const filters_1 = require("./common/filters");
const core_1 = require("@nestjs/core");
const interceptors_1 = require("./common/interceptors");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const admin_module_1 = require("./modules/admin/admin.module");
const induction_module_1 = require("./modules/induction/induction.module");
const database_module_1 = require("./database/database.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => configService.get('database'),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            employees_module_1.EmployeesModule,
            attendance_module_1.AttendanceModule,
            leave_module_1.LeaveModule,
            payroll_module_1.PayrollModule,
            recruitment_module_1.RecruitmentModule,
            onboarding_module_1.OnboardingModule,
            performance_module_1.PerformanceModule,
            documents_module_1.DocumentsModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
            induction_module_1.InductionModule,
            database_module_1.DatabaseModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.GlobalExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map