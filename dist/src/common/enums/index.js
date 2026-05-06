"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InductionStatus = exports.InductionProgramStatus = exports.DeductionType = exports.ApplicableGender = exports.NotificationType = exports.ContractType = exports.PolicyStatus = exports.DocumentStatus = exports.DocumentCategory = exports.FeedbackVisibility = exports.FeedbackType = exports.ReviewSectionType = exports.ReviewStatus = exports.ReviewType = exports.GoalStatus = exports.GoalCategory = exports.ReviewCycleStatus = exports.ReviewCycleType = exports.LoanStatus = exports.LoanType = exports.PayrollEntryStatus = exports.PayrollPeriodStatus = exports.OnboardingPlanStatus = exports.OnboardingTaskStatus = exports.OnboardingTaskCategory = exports.OfferStatus = exports.InterviewRecommendation = exports.InterviewStatus = exports.InterviewType = exports.ApplicationStatus = exports.ApplicationStage = exports.ApplicationSource = exports.JobLocationType = exports.JobPostingStatus = exports.Urgency = exports.RequisitionType = exports.RequisitionStatus = exports.LeaveRequestStatus = exports.HolidayType = exports.ScheduleType = exports.CheckInMethod = exports.AttendanceStatus = exports.EmploymentHistoryType = exports.WorkLocation = exports.EmploymentStatus = exports.EmploymentType = exports.MaritalStatus = exports.Gender = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["HR_ADMIN"] = "HR_ADMIN";
    UserRole["HR_MANAGER"] = "HR_MANAGER";
    UserRole["DEPARTMENT_HEAD"] = "DEPARTMENT_HEAD";
    UserRole["EMPLOYEE"] = "EMPLOYEE";
})(UserRole || (exports.UserRole = UserRole = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "SINGLE";
    MaritalStatus["MARRIED"] = "MARRIED";
    MaritalStatus["DIVORCED"] = "DIVORCED";
    MaritalStatus["WIDOWED"] = "WIDOWED";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["FULL_TIME"] = "FULL_TIME";
    EmploymentType["PART_TIME"] = "PART_TIME";
    EmploymentType["CONTRACT"] = "CONTRACT";
    EmploymentType["INTERN"] = "INTERN";
})(EmploymentType || (exports.EmploymentType = EmploymentType = {}));
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["ACTIVE"] = "ACTIVE";
    EmploymentStatus["ON_LEAVE"] = "ON_LEAVE";
    EmploymentStatus["SUSPENDED"] = "SUSPENDED";
    EmploymentStatus["TERMINATED"] = "TERMINATED";
})(EmploymentStatus || (exports.EmploymentStatus = EmploymentStatus = {}));
var WorkLocation;
(function (WorkLocation) {
    WorkLocation["ONSITE"] = "ONSITE";
    WorkLocation["REMOTE"] = "REMOTE";
    WorkLocation["HYBRID"] = "HYBRID";
})(WorkLocation || (exports.WorkLocation = WorkLocation = {}));
var EmploymentHistoryType;
(function (EmploymentHistoryType) {
    EmploymentHistoryType["PROMOTION"] = "PROMOTION";
    EmploymentHistoryType["TRANSFER"] = "TRANSFER";
    EmploymentHistoryType["DEMOTION"] = "DEMOTION";
    EmploymentHistoryType["SALARY_CHANGE"] = "SALARY_CHANGE";
    EmploymentHistoryType["STATUS_CHANGE"] = "STATUS_CHANGE";
})(EmploymentHistoryType || (exports.EmploymentHistoryType = EmploymentHistoryType = {}));
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "PRESENT";
    AttendanceStatus["ABSENT"] = "ABSENT";
    AttendanceStatus["LATE"] = "LATE";
    AttendanceStatus["HALF_DAY"] = "HALF_DAY";
    AttendanceStatus["ON_LEAVE"] = "ON_LEAVE";
    AttendanceStatus["HOLIDAY"] = "HOLIDAY";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
var CheckInMethod;
(function (CheckInMethod) {
    CheckInMethod["WEB"] = "WEB";
    CheckInMethod["MOBILE"] = "MOBILE";
    CheckInMethod["BIOMETRIC"] = "BIOMETRIC";
    CheckInMethod["MANUAL"] = "MANUAL";
})(CheckInMethod || (exports.CheckInMethod = CheckInMethod = {}));
var ScheduleType;
(function (ScheduleType) {
    ScheduleType["FIXED"] = "FIXED";
    ScheduleType["FLEXIBLE"] = "FLEXIBLE";
    ScheduleType["SHIFT"] = "SHIFT";
})(ScheduleType || (exports.ScheduleType = ScheduleType = {}));
var HolidayType;
(function (HolidayType) {
    HolidayType["NATIONAL"] = "NATIONAL";
    HolidayType["COMPANY"] = "COMPANY";
})(HolidayType || (exports.HolidayType = HolidayType = {}));
var LeaveRequestStatus;
(function (LeaveRequestStatus) {
    LeaveRequestStatus["PENDING"] = "PENDING";
    LeaveRequestStatus["APPROVED"] = "APPROVED";
    LeaveRequestStatus["REJECTED"] = "REJECTED";
    LeaveRequestStatus["CANCELLED"] = "CANCELLED";
    LeaveRequestStatus["RECALLED"] = "RECALLED";
})(LeaveRequestStatus || (exports.LeaveRequestStatus = LeaveRequestStatus = {}));
var RequisitionStatus;
(function (RequisitionStatus) {
    RequisitionStatus["DRAFT"] = "DRAFT";
    RequisitionStatus["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    RequisitionStatus["APPROVED"] = "APPROVED";
    RequisitionStatus["OPEN"] = "OPEN";
    RequisitionStatus["CLOSED"] = "CLOSED";
    RequisitionStatus["CANCELLED"] = "CANCELLED";
})(RequisitionStatus || (exports.RequisitionStatus = RequisitionStatus = {}));
var RequisitionType;
(function (RequisitionType) {
    RequisitionType["NEW_HIRE"] = "NEW_HIRE";
    RequisitionType["REPLACEMENT"] = "REPLACEMENT";
})(RequisitionType || (exports.RequisitionType = RequisitionType = {}));
var Urgency;
(function (Urgency) {
    Urgency["LOW"] = "LOW";
    Urgency["MEDIUM"] = "MEDIUM";
    Urgency["HIGH"] = "HIGH";
})(Urgency || (exports.Urgency = Urgency = {}));
var JobPostingStatus;
(function (JobPostingStatus) {
    JobPostingStatus["DRAFT"] = "DRAFT";
    JobPostingStatus["PUBLISHED"] = "PUBLISHED";
    JobPostingStatus["CLOSED"] = "CLOSED";
})(JobPostingStatus || (exports.JobPostingStatus = JobPostingStatus = {}));
var JobLocationType;
(function (JobLocationType) {
    JobLocationType["ONSITE"] = "ONSITE";
    JobLocationType["REMOTE"] = "REMOTE";
    JobLocationType["HYBRID"] = "HYBRID";
})(JobLocationType || (exports.JobLocationType = JobLocationType = {}));
var ApplicationSource;
(function (ApplicationSource) {
    ApplicationSource["WEBSITE"] = "WEBSITE";
    ApplicationSource["REFERRAL"] = "REFERRAL";
    ApplicationSource["LINKEDIN"] = "LINKEDIN";
    ApplicationSource["AGENCY"] = "AGENCY";
    ApplicationSource["OTHER"] = "OTHER";
})(ApplicationSource || (exports.ApplicationSource = ApplicationSource = {}));
var ApplicationStage;
(function (ApplicationStage) {
    ApplicationStage["APPLIED"] = "APPLIED";
    ApplicationStage["SCREENING"] = "SCREENING";
    ApplicationStage["INTERVIEW_1"] = "INTERVIEW_1";
    ApplicationStage["INTERVIEW_2"] = "INTERVIEW_2";
    ApplicationStage["TECHNICAL"] = "TECHNICAL";
    ApplicationStage["OFFER"] = "OFFER";
    ApplicationStage["HIRED"] = "HIRED";
    ApplicationStage["REJECTED"] = "REJECTED";
    ApplicationStage["WITHDRAWN"] = "WITHDRAWN";
})(ApplicationStage || (exports.ApplicationStage = ApplicationStage = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["ACTIVE"] = "ACTIVE";
    ApplicationStatus["REJECTED"] = "REJECTED";
    ApplicationStatus["WITHDRAWN"] = "WITHDRAWN";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var InterviewType;
(function (InterviewType) {
    InterviewType["PHONE"] = "PHONE";
    InterviewType["VIDEO"] = "VIDEO";
    InterviewType["ONSITE"] = "ONSITE";
    InterviewType["TECHNICAL"] = "TECHNICAL";
})(InterviewType || (exports.InterviewType = InterviewType = {}));
var InterviewStatus;
(function (InterviewStatus) {
    InterviewStatus["SCHEDULED"] = "SCHEDULED";
    InterviewStatus["COMPLETED"] = "COMPLETED";
    InterviewStatus["CANCELLED"] = "CANCELLED";
    InterviewStatus["NO_SHOW"] = "NO_SHOW";
})(InterviewStatus || (exports.InterviewStatus = InterviewStatus = {}));
var InterviewRecommendation;
(function (InterviewRecommendation) {
    InterviewRecommendation["STRONG_YES"] = "STRONG_YES";
    InterviewRecommendation["YES"] = "YES";
    InterviewRecommendation["MAYBE"] = "MAYBE";
    InterviewRecommendation["NO"] = "NO";
    InterviewRecommendation["STRONG_NO"] = "STRONG_NO";
})(InterviewRecommendation || (exports.InterviewRecommendation = InterviewRecommendation = {}));
var OfferStatus;
(function (OfferStatus) {
    OfferStatus["DRAFT"] = "DRAFT";
    OfferStatus["SENT"] = "SENT";
    OfferStatus["ACCEPTED"] = "ACCEPTED";
    OfferStatus["REJECTED"] = "REJECTED";
    OfferStatus["EXPIRED"] = "EXPIRED";
})(OfferStatus || (exports.OfferStatus = OfferStatus = {}));
var OnboardingTaskCategory;
(function (OnboardingTaskCategory) {
    OnboardingTaskCategory["DOCUMENTS"] = "DOCUMENTS";
    OnboardingTaskCategory["IT_SETUP"] = "IT_SETUP";
    OnboardingTaskCategory["TRAINING"] = "TRAINING";
    OnboardingTaskCategory["MEET_TEAM"] = "MEET_TEAM";
    OnboardingTaskCategory["POLICIES"] = "POLICIES";
})(OnboardingTaskCategory || (exports.OnboardingTaskCategory = OnboardingTaskCategory = {}));
var OnboardingTaskStatus;
(function (OnboardingTaskStatus) {
    OnboardingTaskStatus["PENDING"] = "PENDING";
    OnboardingTaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OnboardingTaskStatus["COMPLETED"] = "COMPLETED";
    OnboardingTaskStatus["SKIPPED"] = "SKIPPED";
})(OnboardingTaskStatus || (exports.OnboardingTaskStatus = OnboardingTaskStatus = {}));
var OnboardingPlanStatus;
(function (OnboardingPlanStatus) {
    OnboardingPlanStatus["NOT_STARTED"] = "NOT_STARTED";
    OnboardingPlanStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OnboardingPlanStatus["COMPLETED"] = "COMPLETED";
})(OnboardingPlanStatus || (exports.OnboardingPlanStatus = OnboardingPlanStatus = {}));
var PayrollPeriodStatus;
(function (PayrollPeriodStatus) {
    PayrollPeriodStatus["DRAFT"] = "DRAFT";
    PayrollPeriodStatus["PROCESSING"] = "PROCESSING";
    PayrollPeriodStatus["REVIEW"] = "REVIEW";
    PayrollPeriodStatus["APPROVED"] = "APPROVED";
    PayrollPeriodStatus["PAID"] = "PAID";
    PayrollPeriodStatus["ARCHIVED"] = "ARCHIVED";
})(PayrollPeriodStatus || (exports.PayrollPeriodStatus = PayrollPeriodStatus = {}));
var PayrollEntryStatus;
(function (PayrollEntryStatus) {
    PayrollEntryStatus["DRAFT"] = "DRAFT";
    PayrollEntryStatus["REVIEWED"] = "REVIEWED";
    PayrollEntryStatus["APPROVED"] = "APPROVED";
})(PayrollEntryStatus || (exports.PayrollEntryStatus = PayrollEntryStatus = {}));
var LoanType;
(function (LoanType) {
    LoanType["LOAN"] = "LOAN";
    LoanType["ADVANCE"] = "ADVANCE";
})(LoanType || (exports.LoanType = LoanType = {}));
var LoanStatus;
(function (LoanStatus) {
    LoanStatus["PENDING"] = "PENDING";
    LoanStatus["APPROVED"] = "APPROVED";
    LoanStatus["ACTIVE"] = "ACTIVE";
    LoanStatus["COMPLETED"] = "COMPLETED";
    LoanStatus["REJECTED"] = "REJECTED";
})(LoanStatus || (exports.LoanStatus = LoanStatus = {}));
var ReviewCycleType;
(function (ReviewCycleType) {
    ReviewCycleType["ANNUAL"] = "ANNUAL";
    ReviewCycleType["BI_ANNUAL"] = "BI_ANNUAL";
    ReviewCycleType["QUARTERLY"] = "QUARTERLY";
    ReviewCycleType["PROBATION"] = "PROBATION";
})(ReviewCycleType || (exports.ReviewCycleType = ReviewCycleType = {}));
var ReviewCycleStatus;
(function (ReviewCycleStatus) {
    ReviewCycleStatus["DRAFT"] = "DRAFT";
    ReviewCycleStatus["ACTIVE"] = "ACTIVE";
    ReviewCycleStatus["SELF_REVIEW"] = "SELF_REVIEW";
    ReviewCycleStatus["MANAGER_REVIEW"] = "MANAGER_REVIEW";
    ReviewCycleStatus["CALIBRATION"] = "CALIBRATION";
    ReviewCycleStatus["COMPLETED"] = "COMPLETED";
})(ReviewCycleStatus || (exports.ReviewCycleStatus = ReviewCycleStatus = {}));
var GoalCategory;
(function (GoalCategory) {
    GoalCategory["INDIVIDUAL"] = "INDIVIDUAL";
    GoalCategory["TEAM"] = "TEAM";
    GoalCategory["COMPANY"] = "COMPANY";
})(GoalCategory || (exports.GoalCategory = GoalCategory = {}));
var GoalStatus;
(function (GoalStatus) {
    GoalStatus["NOT_STARTED"] = "NOT_STARTED";
    GoalStatus["IN_PROGRESS"] = "IN_PROGRESS";
    GoalStatus["AT_RISK"] = "AT_RISK";
    GoalStatus["COMPLETED"] = "COMPLETED";
    GoalStatus["CANCELLED"] = "CANCELLED";
})(GoalStatus || (exports.GoalStatus = GoalStatus = {}));
var ReviewType;
(function (ReviewType) {
    ReviewType["SELF"] = "SELF";
    ReviewType["MANAGER"] = "MANAGER";
    ReviewType["PEER"] = "PEER";
    ReviewType["SKIP_LEVEL"] = "SKIP_LEVEL";
})(ReviewType || (exports.ReviewType = ReviewType = {}));
var ReviewStatus;
(function (ReviewStatus) {
    ReviewStatus["PENDING"] = "PENDING";
    ReviewStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ReviewStatus["SUBMITTED"] = "SUBMITTED";
    ReviewStatus["ACKNOWLEDGED"] = "ACKNOWLEDGED";
})(ReviewStatus || (exports.ReviewStatus = ReviewStatus = {}));
var ReviewSectionType;
(function (ReviewSectionType) {
    ReviewSectionType["GOAL_ACHIEVEMENT"] = "GOAL_ACHIEVEMENT";
    ReviewSectionType["COMPETENCY"] = "COMPETENCY";
    ReviewSectionType["VALUES"] = "VALUES";
    ReviewSectionType["DEVELOPMENT"] = "DEVELOPMENT";
})(ReviewSectionType || (exports.ReviewSectionType = ReviewSectionType = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType["COMMENDATION"] = "COMMENDATION";
    FeedbackType["IMPROVEMENT"] = "IMPROVEMENT";
    FeedbackType["NOTE"] = "NOTE";
})(FeedbackType || (exports.FeedbackType = FeedbackType = {}));
var FeedbackVisibility;
(function (FeedbackVisibility) {
    FeedbackVisibility["PRIVATE"] = "PRIVATE";
    FeedbackVisibility["MANAGER_VISIBLE"] = "MANAGER_VISIBLE";
    FeedbackVisibility["PUBLIC"] = "PUBLIC";
})(FeedbackVisibility || (exports.FeedbackVisibility = FeedbackVisibility = {}));
var DocumentCategory;
(function (DocumentCategory) {
    DocumentCategory["CONTRACT"] = "CONTRACT";
    DocumentCategory["POLICY"] = "POLICY";
    DocumentCategory["CERTIFICATE"] = "CERTIFICATE";
    DocumentCategory["ID"] = "ID";
    DocumentCategory["PAYSLIP"] = "PAYSLIP";
    DocumentCategory["OFFER_LETTER"] = "OFFER_LETTER";
    DocumentCategory["OTHER"] = "OTHER";
})(DocumentCategory || (exports.DocumentCategory = DocumentCategory = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["ACTIVE"] = "ACTIVE";
    DocumentStatus["ARCHIVED"] = "ARCHIVED";
    DocumentStatus["EXPIRED"] = "EXPIRED";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus["DRAFT"] = "DRAFT";
    PolicyStatus["PUBLISHED"] = "PUBLISHED";
    PolicyStatus["ARCHIVED"] = "ARCHIVED";
})(PolicyStatus || (exports.PolicyStatus = PolicyStatus = {}));
var ContractType;
(function (ContractType) {
    ContractType["FULL_TIME"] = "FULL_TIME";
    ContractType["CONTRACT"] = "CONTRACT";
    ContractType["INTERN"] = "INTERN";
    ContractType["CONSULTANT"] = "CONSULTANT";
})(ContractType || (exports.ContractType = ContractType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["LEAVE_APPROVED"] = "LEAVE_APPROVED";
    NotificationType["LEAVE_REJECTED"] = "LEAVE_REJECTED";
    NotificationType["PAYROLL_PROCESSED"] = "PAYROLL_PROCESSED";
    NotificationType["REVIEW_DUE"] = "REVIEW_DUE";
    NotificationType["DOCUMENT_EXPIRING"] = "DOCUMENT_EXPIRING";
    NotificationType["INTERVIEW_SCHEDULED"] = "INTERVIEW_SCHEDULED";
    NotificationType["OFFER_RECEIVED"] = "OFFER_RECEIVED";
    NotificationType["GENERAL"] = "GENERAL";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var ApplicableGender;
(function (ApplicableGender) {
    ApplicableGender["ALL"] = "ALL";
    ApplicableGender["MALE"] = "MALE";
    ApplicableGender["FEMALE"] = "FEMALE";
})(ApplicableGender || (exports.ApplicableGender = ApplicableGender = {}));
var DeductionType;
(function (DeductionType) {
    DeductionType["TAX"] = "TAX";
    DeductionType["PENSION"] = "PENSION";
    DeductionType["LOAN_REPAYMENT"] = "LOAN_REPAYMENT";
    DeductionType["HEALTH_INSURANCE"] = "HEALTH_INSURANCE";
    DeductionType["OTHER"] = "OTHER";
})(DeductionType || (exports.DeductionType = DeductionType = {}));
var InductionProgramStatus;
(function (InductionProgramStatus) {
    InductionProgramStatus["DRAFT"] = "DRAFT";
    InductionProgramStatus["PUBLISHED"] = "PUBLISHED";
    InductionProgramStatus["ARCHIVED"] = "ARCHIVED";
})(InductionProgramStatus || (exports.InductionProgramStatus = InductionProgramStatus = {}));
var InductionStatus;
(function (InductionStatus) {
    InductionStatus["NOT_STARTED"] = "NOT_STARTED";
    InductionStatus["IN_PROGRESS"] = "IN_PROGRESS";
    InductionStatus["COMPLETED"] = "COMPLETED";
    InductionStatus["FAILED"] = "FAILED";
})(InductionStatus || (exports.InductionStatus = InductionStatus = {}));
//# sourceMappingURL=index.js.map