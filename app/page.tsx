import Form from "next/form";
import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { ScholarshipGrid } from "@/components/scholarships/scholarship-card";
import { getScholarships } from "@/lib/scholarships";
import { getCategories, getCategoryScholarships } from "@/lib/scholarships/categories";
import { sortScholarships } from "@/lib/scholarships/filter";

export const revalidate = 86400;

export default function Home() {
  const scholarships = getScholarships();
  const verified = scholarships.filter((s) => s.lastVerifiedAt);
  const featured = sortScholarships(verified.length ? verified : scholarships, "deadline").slice(0, 4);
  const categories = getCategories(scholarships);

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find scholarships. Explore your opportunities.</h1>
        <p className="max-w-2xl text-lg text-slate-700">
          A free directory of scholarships open to Ghanaian students — in Ghana, across Africa and abroad. Check
          eligibility and deadlines, then apply on the provider&apos;s official website.
        </p>
        <Form action="/scholarships" role="search" className="flex max-w-xl flex-col gap-2 sm:flex-row">
          <label htmlFor="home-q" className="sr-only">Search scholarships</label>
          <input
            id="home-q"
            type="search"
            name="q"
            maxLength={100}
            placeholder="e.g. master's UK, Mastercard, Hungary"
            className="min-h-12 flex-1 rounded-md border border-slate-300 bg-white px-3 text-base"
          />
          <button type="submit" className="min-h-12 rounded-md bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800">
            Search
          </button>
        </Form>
        <Link href="/scholarships" className="inline-block font-semibold text-emerald-800 underline">
          Browse all {scholarships.length} scholarships →
        </Link>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-4">
        <h2 id="featured-heading" className="text-2xl font-semibold">
          {verified.length ? "Recently verified opportunities" : "Scholarships in our directory"}
        </h2>
        {!verified.length && (
          <p className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Listings are still being checked against official sources. Details marked unverified may be out of date —
            always confirm on the provider&apos;s website.
          </p>
        )}
        <ScholarshipGrid scholarships={featured} />
      </section>

      {categories.length > 0 && (
        <section aria-labelledby="categories-heading" className="space-y-4">
          <h2 id="categories-heading" className="text-2xl font-semibold">Browse by category</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
                  <span className="font-semibold text-emerald-800">{c.title}</span>
                  <span className="block text-sm text-slate-600">{getCategoryScholarships(c, scholarships).length} listings</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AdSlot />

      <section aria-labelledby="how-heading" className="space-y-4">
        <h2 id="how-heading" className="text-2xl font-semibold">How it works</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            ["Discover", "Search by name, provider or country, and filter by level, location and funding."],
            ["Check eligibility", "Read the eligibility rules, funding details and deadline for each scholarship."],
            ["Apply officially", "Go straight to the provider's official page. We never charge for listings or links."],
          ].map(([title, text], i) => (
            <li key={title} className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="font-semibold">{i + 1}. {title}</p>
              <p className="mt-1 text-sm text-slate-700">{text}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm text-slate-700">
          New to scholarship applications? Start with our{" "}
          <Link href="/guides/how-to-apply" className="text-emerald-800 underline">step-by-step application guide</Link>.
        </p>
      </section>
    </div>
  );
}
