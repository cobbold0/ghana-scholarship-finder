import { z } from "zod";

export const STATUSES = ["open", "upcoming", "closed", "ongoing", "unverified"] as const;
export const EDUCATION_LEVELS = ["secondary", "undergraduate", "masters", "phd"] as const;
export const FUNDING_TYPES = ["full", "partial", "varies"] as const;
export const STUDY_LOCATIONS = ["ghana", "africa", "international"] as const;

const isoDate = z.iso.date();

export const scholarshipSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  provider: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  eligibleCountries: z.array(z.string()).min(1),
  educationLevels: z.array(z.enum(EDUCATION_LEVELS)).min(1),
  fieldsOfStudy: z.array(z.string()).default([]),
  studyLocation: z.enum(STUDY_LOCATIONS),
  hostCountries: z.array(z.string()).default([]),
  fundingType: z.enum(FUNDING_TYPES),
  fundingCoverage: z.array(z.string()).default([]),
  eligibility: z.array(z.string()).default([]),
  requirements: z.array(z.string()).default([]),
  applicationInstructions: z.array(z.string()).default([]),
  // Only set when the date comes from a source. `deadlineVerified` says whether it was checked on the official site.
  deadline: isoDate.optional(),
  deadlineVerified: z.boolean().default(false),
  deadlineNote: z.string().optional(),
  status: z.enum(STATUSES),
  officialUrl: z.url(),
  sourceUrl: z.url(),
  lastVerifiedAt: isoDate.optional(),
  archived: z.boolean().default(false),
  createdAt: isoDate,
  updatedAt: isoDate,
});

export type Scholarship = z.infer<typeof scholarshipSchema>;
export type ScholarshipStatus = (typeof STATUSES)[number];
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];
export type FundingType = (typeof FUNDING_TYPES)[number];
export type StudyLocation = (typeof STUDY_LOCATIONS)[number];

export const STATUS_LABELS: Record<ScholarshipStatus, string> = {
  open: "Open",
  upcoming: "Upcoming",
  closed: "Closed",
  ongoing: "Ongoing / recurring",
  unverified: "Unverified",
};

export const LEVEL_LABELS: Record<EducationLevel, string> = {
  secondary: "Secondary",
  undergraduate: "Undergraduate",
  masters: "Master's",
  phd: "PhD",
};

export const FUNDING_LABELS: Record<FundingType, string> = {
  full: "Fully funded",
  partial: "Partial funding",
  varies: "Funding varies",
};

export const LOCATION_LABELS: Record<StudyLocation, string> = {
  ghana: "Study in Ghana",
  africa: "Study elsewhere in Africa",
  international: "Study outside Africa",
};
