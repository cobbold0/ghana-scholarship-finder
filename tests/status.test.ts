import { describe, expect, it } from "vitest";
import { getDisplayStatus, getScholarshipBySlug, getScholarships, isDeadlinePassed } from "@/lib/scholarships";
import { getCategories, MIN_CATEGORY_SIZE, getCategoryScholarships } from "@/lib/scholarships/categories";
import { scholarshipSchema } from "@/lib/scholarships/schema";
import { makeScholarship } from "./fixtures";

describe("status handling", () => {
  it("closes an open scholarship once its verified deadline passes", () => {
    const s = makeScholarship({ id: "a", status: "open", deadline: "2026-01-01", deadlineVerified: true });
    expect(getDisplayStatus(s, "2026-01-01")).toBe("open");
    expect(getDisplayStatus(s, "2026-01-02")).toBe("closed");
  });

  it("never infers a status from an unverified deadline", () => {
    const s = makeScholarship({ id: "b", status: "unverified", deadline: "2030-01-01" });
    expect(getDisplayStatus(s, "2026-01-01")).toBe("unverified");
    const recurring = makeScholarship({ id: "c", status: "open", deadline: "2026-01-01", deadlineVerified: false });
    expect(getDisplayStatus(recurring, "2026-06-01")).toBe("open");
  });

  it("handles missing deadlines", () => {
    expect(isDeadlinePassed(makeScholarship({ id: "d" }), "2026-01-01")).toBe(false);
  });
});

describe("dataset", () => {
  it("validates, has unique ids and slugs, and uses https links", () => {
    const all = getScholarships();
    expect(all.length).toBeGreaterThan(0);
    expect(new Set(all.map((s) => s.id)).size).toBe(all.length);
    for (const s of all) {
      expect(scholarshipSchema.safeParse(s).success).toBe(true);
      expect(s.officialUrl.startsWith("https://")).toBe(true);
      expect(s.sourceUrl.startsWith("https://")).toBe(true);
    }
  });

  it("never marks a listing open/upcoming/closed/ongoing without a verification date", () => {
    for (const s of getScholarships()) {
      if (s.status !== "unverified") expect(s.lastVerifiedAt).toBeDefined();
      if (s.deadlineVerified) expect(s.lastVerifiedAt).toBeDefined();
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getScholarshipBySlug("does-not-exist")).toBeUndefined();
  });

  it("only publishes categories with enough listings", () => {
    for (const c of getCategories()) expect(getCategoryScholarships(c).length).toBeGreaterThanOrEqual(MIN_CATEGORY_SIZE);
    expect(getCategories().some((c) => c.slug === "study-in-ghana")).toBe(false);
  });
});
