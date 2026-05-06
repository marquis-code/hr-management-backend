export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  HR_ADMIN = 'HR_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  DEPARTMENT_HEAD = 'DEPARTMENT_HEAD',
  EMPLOYEE = 'EMPLOYEE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
}

export enum EmploymentStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export enum WorkLocation {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export enum EmploymentHistoryType {
  PROMOTION = 'PROMOTION',
  TRANSFER = 'TRANSFER',
  DEMOTION = 'DEMOTION',
  SALARY_CHANGE = 'SALARY_CHANGE',
  STATUS_CHANGE = 'STATUS_CHANGE',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  HALF_DAY = 'HALF_DAY',
  ON_LEAVE = 'ON_LEAVE',
  HOLIDAY = 'HOLIDAY',
}

export enum CheckInMethod {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  BIOMETRIC = 'BIOMETRIC',
  MANUAL = 'MANUAL',
}

export enum ScheduleType {
  FIXED = 'FIXED',
  FLEXIBLE = 'FLEXIBLE',
  SHIFT = 'SHIFT',
}

export enum HolidayType {
  NATIONAL = 'NATIONAL',
  COMPANY = 'COMPANY',
}

export enum LeaveRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  RECALLED = 'RECALLED',
}

export enum RequisitionStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum RequisitionType {
  NEW_HIRE = 'NEW_HIRE',
  REPLACEMENT = 'REPLACEMENT',
}

export enum Urgency {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum JobPostingStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
}

export enum JobLocationType {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
}

export enum ApplicationSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  LINKEDIN = 'LINKEDIN',
  AGENCY = 'AGENCY',
  OTHER = 'OTHER',
}

export enum ApplicationStage {
  APPLIED = 'APPLIED',
  SCREENING = 'SCREENING',
  INTERVIEW_1 = 'INTERVIEW_1',
  INTERVIEW_2 = 'INTERVIEW_2',
  TECHNICAL = 'TECHNICAL',
  OFFER = 'OFFER',
  HIRED = 'HIRED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum ApplicationStatus {
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum InterviewType {
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
  ONSITE = 'ONSITE',
  TECHNICAL = 'TECHNICAL',
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum InterviewRecommendation {
  STRONG_YES = 'STRONG_YES',
  YES = 'YES',
  MAYBE = 'MAYBE',
  NO = 'NO',
  STRONG_NO = 'STRONG_NO',
}

export enum OfferStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum OnboardingTaskCategory {
  DOCUMENTS = 'DOCUMENTS',
  IT_SETUP = 'IT_SETUP',
  TRAINING = 'TRAINING',
  MEET_TEAM = 'MEET_TEAM',
  POLICIES = 'POLICIES',
}

export enum OnboardingTaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  SKIPPED = 'SKIPPED',
}

export enum OnboardingPlanStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum PayrollPeriodStatus {
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  REVIEW = 'REVIEW',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  ARCHIVED = 'ARCHIVED',
}

export enum PayrollEntryStatus {
  DRAFT = 'DRAFT',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
}

export enum LoanType {
  LOAN = 'LOAN',
  ADVANCE = 'ADVANCE',
}

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export enum ReviewCycleType {
  ANNUAL = 'ANNUAL',
  BI_ANNUAL = 'BI_ANNUAL',
  QUARTERLY = 'QUARTERLY',
  PROBATION = 'PROBATION',
}

export enum ReviewCycleStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SELF_REVIEW = 'SELF_REVIEW',
  MANAGER_REVIEW = 'MANAGER_REVIEW',
  CALIBRATION = 'CALIBRATION',
  COMPLETED = 'COMPLETED',
}

export enum GoalCategory {
  INDIVIDUAL = 'INDIVIDUAL',
  TEAM = 'TEAM',
  COMPANY = 'COMPANY',
}

export enum GoalStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  AT_RISK = 'AT_RISK',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ReviewType {
  SELF = 'SELF',
  MANAGER = 'MANAGER',
  PEER = 'PEER',
  SKIP_LEVEL = 'SKIP_LEVEL',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
}

export enum ReviewSectionType {
  GOAL_ACHIEVEMENT = 'GOAL_ACHIEVEMENT',
  COMPETENCY = 'COMPETENCY',
  VALUES = 'VALUES',
  DEVELOPMENT = 'DEVELOPMENT',
}

export enum FeedbackType {
  COMMENDATION = 'COMMENDATION',
  IMPROVEMENT = 'IMPROVEMENT',
  NOTE = 'NOTE',
}

export enum FeedbackVisibility {
  PRIVATE = 'PRIVATE',
  MANAGER_VISIBLE = 'MANAGER_VISIBLE',
  PUBLIC = 'PUBLIC',
}

export enum DocumentCategory {
  CONTRACT = 'CONTRACT',
  POLICY = 'POLICY',
  CERTIFICATE = 'CERTIFICATE',
  ID = 'ID',
  PAYSLIP = 'PAYSLIP',
  OFFER_LETTER = 'OFFER_LETTER',
  OTHER = 'OTHER',
}

export enum DocumentStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  EXPIRED = 'EXPIRED',
}

export enum PolicyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ContractType {
  FULL_TIME = 'FULL_TIME',
  CONTRACT = 'CONTRACT',
  INTERN = 'INTERN',
  CONSULTANT = 'CONSULTANT',
}

export enum NotificationType {
  LEAVE_APPROVED = 'LEAVE_APPROVED',
  LEAVE_REJECTED = 'LEAVE_REJECTED',
  PAYROLL_PROCESSED = 'PAYROLL_PROCESSED',
  REVIEW_DUE = 'REVIEW_DUE',
  DOCUMENT_EXPIRING = 'DOCUMENT_EXPIRING',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  OFFER_RECEIVED = 'OFFER_RECEIVED',
  GENERAL = 'GENERAL',
}

export enum ApplicableGender {
  ALL = 'ALL',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum DeductionType {
  TAX = 'TAX',
  PENSION = 'PENSION',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  OTHER = 'OTHER',
}

export enum InductionProgramStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum InductionStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
