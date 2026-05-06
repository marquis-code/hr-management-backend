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
exports.PerformanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const performance_entity_1 = require("./entities/performance.entity");
const enums_1 = require("../../common/enums");
let PerformanceService = class PerformanceService {
    cycleRepository;
    goalRepository;
    reviewRepository;
    constructor(cycleRepository, goalRepository, reviewRepository) {
        this.cycleRepository = cycleRepository;
        this.goalRepository = goalRepository;
        this.reviewRepository = reviewRepository;
    }
    async createGoal(employeeId, dto, creatorId) {
        const goal = this.goalRepository.create({
            ...dto,
            employeeId,
            createdBy: creatorId,
            status: enums_1.GoalStatus.NOT_STARTED,
        });
        return this.goalRepository.save(goal);
    }
    async updateGoalProgress(goalId, currentValue) {
        const goal = await this.goalRepository.findOne({ where: { id: goalId } });
        if (!goal)
            throw new common_1.NotFoundException('Goal not found');
        goal.currentValue = currentValue;
        if (currentValue >= goal.targetValue) {
            goal.status = enums_1.GoalStatus.COMPLETED;
        }
        else {
            goal.status = enums_1.GoalStatus.IN_PROGRESS;
        }
        return this.goalRepository.save(goal);
    }
    async getMyGoals(employeeId) {
        return this.goalRepository.find({ where: { employeeId } });
    }
    async submitReview(reviewId, rating, feedback) {
        const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        review.overallRating = rating;
        review.status = enums_1.ReviewStatus.SUBMITTED;
        review.submittedAt = new Date();
        return this.reviewRepository.save(review);
    }
};
exports.PerformanceService = PerformanceService;
exports.PerformanceService = PerformanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(performance_entity_1.ReviewCycle)),
    __param(1, (0, typeorm_1.InjectRepository)(performance_entity_1.Goal)),
    __param(2, (0, typeorm_1.InjectRepository)(performance_entity_1.PerformanceReview)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PerformanceService);
//# sourceMappingURL=performance.service.js.map