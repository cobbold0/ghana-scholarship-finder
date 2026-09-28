import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ScholarshipPage from "@/app/scholarships/[slug]/page";

// A minimal record with every optional field missing.
vi.mock("@/data/scholarships/scholarships.json", () => ({
  default: [
    {
      id: "sparse",
      slug: "sparse",
      title: "Sparse Scholarship",
      provider: "Provider",
      summary: "Summary",
      eligibleCountries: ["Ghana"],
      educationLevels: ["masters"],
      studyLocation: "international",
      fundingType: "varies",
      status: "unverified",
      officialUrl: "https://example.org/apply",
      sourceUrl: "https://example.org/source",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    },
  ],
}));

describe("detail page with incomplete data", () => {
  it("labels every missing field instead of guessing", async () => {
    render(await ScholarshipPage({ params: Promise.resolve({ slug: "sparse" }) } as PageProps<"/scholarships/[slug]">));
    expect(screen.getByText("No confirmed deadline")).toBeTruthy();
    expect(screen.getByText(/Eligibility details have not been recorded/)).toBeTruthy();
    expect(screen.getByText(/Funding details have not been recorded/)).toBeTruthy();
    expect(screen.getByText(/document list has not been recorded/)).toBeTruthy();
    expect(screen.getByText(/Application steps have not been recorded/)).toBeTruthy();
    expect(screen.getAllByText("Not yet verified").length).toBeGreaterThan(0);
    expect(screen.getByText("Not specified (Study outside Africa)")).toBeTruthy();
  });
});
