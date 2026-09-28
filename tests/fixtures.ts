import { scholarshipSchema, type Scholarship } from "@/lib/scholarships/schema";

export function makeScholarship(overrides: Partial<Scholarship> & { id: string }): Scholarship {
  return scholarshipSchema.parse({
    slug: overrides.id,
    title: `Title ${overrides.id}`,
    provider: "Provider",
    summary: "Summary",
    eligibleCountries: ["Ghana"],
    educationLevels: ["masters"],
    studyLocation: "international",
    fundingType: "full",
    status: "unverified",
    officialUrl: "https://example.org/apply",
    sourceUrl: "https://example.org/source",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
    ...overrides,
  });
}
