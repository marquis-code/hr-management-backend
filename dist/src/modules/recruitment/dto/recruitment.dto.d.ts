import { RequisitionType, Urgency, ApplicationSource } from '../../../common/enums';
export declare class CreateRequisitionDto {
    title: string;
    departmentId: string;
    positionId: string;
    type: RequisitionType;
    urgency: Urgency;
    numberOfOpenings: number;
    targetStartDate: string;
}
export declare class CreateApplicationDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    resumeUrl?: string;
    source: ApplicationSource;
}
