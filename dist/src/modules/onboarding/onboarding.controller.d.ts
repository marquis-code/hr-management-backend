import { OnboardingService } from './onboarding.service';
import { OnboardingTaskStatus } from '../../common/enums';
export declare class OnboardingController {
    private readonly onboardingService;
    constructor(onboardingService: OnboardingService);
    updateTask(id: string, status: OnboardingTaskStatus): Promise<void>;
}
