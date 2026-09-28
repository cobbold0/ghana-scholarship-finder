import type { Metadata } from "next";
import Link from "next/link";
import { ScholarshipGrid } from "@/components/scholarships/scholarship-card";
import { SearchFilters } from "@/components/search/search-filters";
import { getScholarships, todayISO } from "@/lib/scholarships";
import {
  filterScholarships,
  getFilterOptions,
  hasActiveFilters,
  parseFilters,
  sortScholarships,
} from "@/lib/scholarships/filter";

export const metadata: Metadata = {
  title: "Scholarships for Ghanaian students",
  description:
    "Search and filter scholarships open to Ghanaian students by education level, study location and funding. See deadlines, eligibility and official application links.",
  alternates: { canonical: "/scholarships" },
};

export default async function ScholarshipsPage({ searchParams }: PageProps<"/scholarships">) {
  const filters = parseFilters(await searchParams);
  const today = todayISO();
  const all = getScholarships();
  const results = sortScholarships(filterScholarships(all, filters, today), filters.sort, today);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Scholarships for Ghanaian students</h1>
        <p className="text-slate-700">
          Always confirm deadlines and eligibility on the official website — listings marked{" "}
          <strong>Unverified</strong> have not yet been checked against the provider&apos;s own page.
        </p>
      </header>

      <SearchFilters filters={filters} options={getFilterOptions(all, today)} />

      <section aria-labelledby="results-heading" className="space-y-4">
        <h2 id="results-heading" className="text-lg font-semibold" aria-live="polite">
          {results.length} {results.length === 1 ? "scholarship" : "scholarships"}
          {hasActiveFilters(filters) ? " match your search" : ""}
        </h2>
        {results.length ? (
          <ScholarshipGrid scholarships={results} today={today} />
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="font-medium">No scholarships match your search.</p>
            <p className="mt-1 text-sm text-slate-600">Try fewer words or remove a filter.</p>
            <Link href="/scholarships" className="mt-3 inline-block font-semibold text-emerald-800 underline">
              Reset filters
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
