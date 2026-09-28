import { z } from "zod";
import records from "@/data/scholarships/scholarships.json";
import { scholarshipSchema, type Scholarship, type ScholarshipStatus } from "./schema";

export * from "./schema";

// Validate at load time so a malformed record fails the build instead of rendering bad data.
const all = z.array(scholarshipSchema).parse(records);

const slugs = new Set<string>();
for (const s of all) {
  if (slugs.has(s.slug)) throw new Error(`Duplicate scholarship slug: ${s.slug}`);
  slugs.add(s.slug);
}

export function getScholarships(): Scholarship[] {
  return all.filter((s) => !s.archived);
}

export function getScholarshipBySlug(slug: string): Scholarship | undefined {
  return getScholarships().find((s) => s.slug === slug);
}

export function todayISO(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** A verified deadline that has passed overrides an "open"/"upcoming" status. Nothing is ever inferred as open. */
export function getDisplayStatus(s: Scholarship, today = todayISO()): ScholarshipStatus {
  if ((s.status === "open" || s.status === "upcoming") && s.deadline && s.deadlineVerified && s.deadline < today) {
    return "closed";
  }
  return s.status;
}

export function isDeadlinePassed(s: Scholarship, today = todayISO()): boolean {
  return !!s.deadline && s.deadline < today;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
