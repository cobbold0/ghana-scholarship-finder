import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScholarshipPage from "@/app/scholarships/[slug]/page";
import { DeadlineInfo } from "@/components/scholarships/deadline-info";
import { getScholarships } from "@/lib/scholarships";
import { makeScholarship } from "./fixtures";

const notFound = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }));
vi.mock("next/navigation", () => ({ notFound }));

afterEach(cleanup);

const renderPage = async (slug: string) =>
  render(await ScholarshipPage({ params: Promise.resolve({ slug }) } as PageProps<"/scholarships/[slug]">));

describe("scholarship detail page", () => {
  it("renders details, eligibility and a safe official link", async () => {
    const s = getScholarships()[0];
    await renderPage(s.slug);
    expect(screen.getByRole("heading", { level: 1, name: s.title })).toBeTruthy();
    const link = screen.getByRole("link", { name: /visit official website/i });
    expect(link.getAttribute("href")).toBe(s.officialUrl);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    const eligibility = screen.getByRole("heading", { name: "Eligibility" }).parentElement!;
    for (const item of s.eligibility) expect(within(eligibility).getByText(item)).toBeTruthy();
    expect(screen.getByText(/have not yet been verified/i)).toBeTruthy();
  });

  it("calls notFound for invalid slugs", async () => {
    await expect(renderPage("nope")).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});

describe("incomplete data", () => {
  it("labels a missing deadline", () => {
    render(<DeadlineInfo scholarship={makeScholarship({ id: "sparse" })} today="2026-09-28" />);
    expect(screen.getByText("No confirmed deadline")).toBeTruthy();
  });

  it("labels unverified and passed deadlines", () => {
    const s = makeScholarship({ id: "x", deadline: "2026-01-15" });
    render(<DeadlineInfo scholarship={s} today="2026-09-28" />);
    expect(screen.getByText(/Reported deadline/)).toBeTruthy();
    expect(screen.getByText("(passed)")).toBeTruthy();
    expect(screen.getByText(/Not yet verified/)).toBeTruthy();
  });
});
