import { z } from "zod";
import {
  EDUCATION_LEVELS,
  FUNDING_TYPES,
  FUNDING_LABELS,
  LEVEL_LABELS,
  STATUSES,
  STUDY_LOCATIONS,
  getDisplayStatus,
  todayISO,
  type Scholarship,
} from "./index";

export const DEADLINE_WINDOWS = { "30": 30, "90": 90 } as const;
export const SORTS = ["deadline", "updated", "title"] as const;

const optional = <T extends z.ZodType>(schema: T) => schema.optional().catch(undefined);

export const filtersSchema = z.object({
  q: optional(z.string().trim().max(100)),
  level: optional(z.enum([...EDUCATION_LEVELS, "postgraduate"])),
  location: optional(z.enum(STUDY_LOCATIONS)),
  field: optional(z.string().max(100)),
  funding: optional(z.enum(FUNDING_TYPES)),
  status: optional(z.enum(STATUSES)),
  deadline: optional(z.enum(["30", "90"])),
  sort: z.enum(SORTS).catch("deadline"),
});

export type Filters = z.infer<typeof filtersSchema>;

/** Parses untrusted URL search params; invalid values are dropped rather than erroring. */
export function parseFilters(params: Record<string, string | string[] | undefined>): Filters {
  const single = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, (Array.isArray(v) ? v[0] : v) || undefined]),
  );
  return filtersSchema.parse(single);
}

export function hasActiveFilters(f: Filters): boolean {
  return !!(f.q || f.level || f.location || f.field || f.funding || f.status || f.deadline);
}

const STOPWORDS = new Set(["a", "an", "and", "for", "in", "of", "the", "to", "scholarship", "scholarships"]);

const normalize = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function haystack(s: Scholarship): string {
  return normalize(
    [
      s.title,
      s.provider,
      s.summary,
      s.description,
      ...s.eligibleCountries,
      ...s.hostCountries,
      ...s.fieldsOfStudy,
      ...s.educationLevels.map((l) => LEVEL_LABELS[l]),
      FUNDING_LABELS[s.fundingType],
    ].join(" "),
  );
}

export function matchesQuery(s: Scholarship, query: string): boolean {
  const tokens = normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOPWORDS.has(t));
  if (!tokens.length) return true;
  const text = haystack(s);
  // Every token must match; a trailing plural "s" is optional ("masters" matches "master's").
  return tokens.every((t) => text.includes(t) || (t.length > 3 && t.endsWith("s") && text.includes(t.slice(0, -1))));
}

function daysBetween(from: string, to: string): number {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000;
}

export function filterScholarships(list: Scholarship[], f: Filters, today = todayISO()): Scholarship[] {
  return list.filter((s) => {
    if (f.q && !matchesQuery(s, f.q)) return false;
    if (f.level === "postgraduate") {
      if (!s.educationLevels.some((l) => l === "masters" || l === "phd")) return false;
    } else if (f.level && !s.educationLevels.includes(f.level)) return false;
    if (f.location && s.studyLocation !== f.location) return false;
    if (f.field && !s.fieldsOfStudy.includes(f.field)) return false;
    if (f.funding && s.fundingType !== f.funding) return false;
    if (f.status && getDisplayStatus(s, today) !== f.status) return false;
    if (f.deadline) {
      if (!s.deadline) return false;
      const days = daysBetween(today, s.deadline);
      if (days < 0 || days > DEADLINE_WINDOWS[f.deadline]) return false;
    }
    return true;
  });
}

export function sortScholarships(list: Scholarship[], sort: Filters["sort"], today = todayISO()): Scholarship[] {
  const copy = [...list];
  if (sort === "title") return copy.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "updated") {
    return copy.sort((a, b) =>
      (b.lastVerifiedAt ?? b.updatedAt).localeCompare(a.lastVerifiedAt ?? a.updatedAt),
    );
  }
  // Deadline: upcoming (soonest first), then no deadline, then passed (most recent first).
  const rank = (s: Scholarship) => (!s.deadline ? 1 : s.deadline >= today ? 0 : 2);
  return copy.sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r || !a.deadline || !b.deadline) return r || a.title.localeCompare(b.title);
    return rank(a) === 0 ? a.deadline.localeCompare(b.deadline) : b.deadline.localeCompare(a.deadline);
  });
}

/** Filter options backed by data. A filter with fewer than two distinct values is not useful and is omitted. */
export function getFilterOptions(list: Scholarship[], today = todayISO()) {
  const distinct = <T,>(values: T[]) => [...new Set(values)];
  const levels = distinct(list.flatMap((s) => s.educationLevels));
  const keep = <T,>(values: T[]) => (values.length > 1 ? values : []);
  return {
    levels: keep(EDUCATION_LEVELS.filter((l) => levels.includes(l))),
    hasPostgraduate: levels.includes("masters") || levels.includes("phd"),
    locations: keep(STUDY_LOCATIONS.filter((l) => list.some((s) => s.studyLocation === l))),
    fields: keep(distinct(list.flatMap((s) => s.fieldsOfStudy)).sort()),
    funding: keep(FUNDING_TYPES.filter((t) => list.some((s) => s.fundingType === t))),
    statuses: keep(STATUSES.filter((st) => list.some((s) => getDisplayStatus(s, today) === st))),
    hasDeadlines: list.some((s) => s.deadline && s.deadline >= today),
  };
}
