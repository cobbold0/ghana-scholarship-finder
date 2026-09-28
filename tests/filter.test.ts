import { describe, expect, it } from "vitest";
import {
  filterScholarships,
  getFilterOptions,
  hasActiveFilters,
  matchesQuery,
  parseFilters,
  sortScholarships,
} from "@/lib/scholarships/filter";
import { makeScholarship } from "./fixtures";

const TODAY = "2026-09-28";

const list = [
  makeScholarship({ id: "uk", title: "Chevening Scholarships", hostCountries: ["United Kingdom"], educationLevels: ["masters"], deadline: "2026-10-06" }),
  makeScholarship({ id: "hu", title: "Stipendium Hungaricum", hostCountries: ["Hungary"], educationLevels: ["undergraduate", "masters", "phd"], deadline: "2026-01-15" }),
  makeScholarship({ id: "gh", title: "KNUST Program", studyLocation: "ghana", educationLevels: ["undergraduate"], fundingType: "partial", fieldsOfStudy: ["Engineering"] }),
  makeScholarship({ id: "open", title: "Open One", status: "open", deadline: "2026-12-01", deadlineVerified: true, lastVerifiedAt: "2026-09-01" }),
];

describe("parseFilters", () => {
  it("drops invalid values and takes the first of repeated params", () => {
    const f = parseFilters({ q: ["uk", "x"], level: "nonsense", status: "open", sort: "bogus", deadline: "7" });
    expect(f).toEqual({ q: "uk", level: undefined, location: undefined, field: undefined, funding: undefined, status: "open", deadline: undefined, sort: "deadline" });
  });

  it("treats empty strings as unset", () => {
    expect(hasActiveFilters(parseFilters({ q: "", level: "" }))).toBe(false);
  });
});

describe("search", () => {
  it("is case, accent and plural insensitive and ignores stopwords", () => {
    const s = list[0];
    expect(matchesQuery(s, "CHEVENING")).toBe(true);
    expect(matchesQuery(s, "scholarships in the united kingdom")).toBe(true);
    expect(matchesQuery(s, "masters")).toBe(true);
    expect(matchesQuery(s, "chévening")).toBe(true);
    expect(matchesQuery(s, "hungary")).toBe(false);
  });

  it("matches on country and provider fields", () => {
    expect(filterScholarships(list, parseFilters({ q: "hungary" }), TODAY).map((s) => s.id)).toEqual(["hu"]);
  });

  it("returns everything for a blank or stopword-only query", () => {
    expect(filterScholarships(list, parseFilters({ q: "the scholarships" }), TODAY)).toHaveLength(list.length);
  });
});

describe("filters", () => {
  it("combines filters", () => {
    const f = parseFilters({ level: "undergraduate", location: "ghana" });
    expect(filterScholarships(list, f, TODAY).map((s) => s.id)).toEqual(["gh"]);
  });

  it("treats postgraduate as master's or PhD", () => {
    const ids = filterScholarships(list, parseFilters({ level: "postgraduate" }), TODAY).map((s) => s.id);
    expect(ids).toEqual(["uk", "hu", "open"]);
  });

  it("filters by field and funding, skipping records with missing fields", () => {
    expect(filterScholarships(list, parseFilters({ field: "Engineering" }), TODAY).map((s) => s.id)).toEqual(["gh"]);
    expect(filterScholarships(list, parseFilters({ funding: "partial" }), TODAY).map((s) => s.id)).toEqual(["gh"]);
  });

  it("filters by deadline window, excluding missing and passed deadlines", () => {
    expect(filterScholarships(list, parseFilters({ deadline: "30" }), TODAY).map((s) => s.id)).toEqual(["uk"]);
    expect(filterScholarships(list, parseFilters({ deadline: "90" }), TODAY).map((s) => s.id)).toEqual(["uk", "open"]);
  });

  it("filters by status", () => {
    expect(filterScholarships(list, parseFilters({ status: "open" }), TODAY).map((s) => s.id)).toEqual(["open"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterScholarships(list, parseFilters({ q: "zzzz" }), TODAY)).toEqual([]);
  });
});

describe("sorting", () => {
  it("sorts by soonest upcoming deadline, then no deadline, then passed", () => {
    expect(sortScholarships(list, "deadline", TODAY).map((s) => s.id)).toEqual(["uk", "open", "gh", "hu"]);
  });

  it("sorts by title and by most recently updated/verified", () => {
    expect(sortScholarships(list, "title", TODAY)[0].id).toBe("uk");
    expect(sortScholarships(list, "updated", TODAY)[0].id).toBe("open");
  });
});

describe("getFilterOptions", () => {
  it("only offers filters backed by at least two distinct values", () => {
    const o = getFilterOptions(list, TODAY);
    expect(o.levels).toEqual(["undergraduate", "masters", "phd"]);
    expect(o.fields).toEqual([]);
    expect(o.funding).toEqual(["full", "partial"]);
    expect(o.statuses).toEqual(["open", "unverified"]);
    expect(o.hasDeadlines).toBe(true);
  });
});
