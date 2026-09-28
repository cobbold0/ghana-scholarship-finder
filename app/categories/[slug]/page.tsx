import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { ScholarshipGrid } from "@/components/scholarships/scholarship-card";
import { getGuide } from "@/data/guides";
import { getCategories, getCategory, getCategoryScholarships } from "@/lib/scholarships/categories";
import { sortScholarships } from "@/lib/scholarships/filter";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/categories/${c.slug}` },
    openGraph: { title: c.title, description: c.description, url: `/categories/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const scholarships = sortScholarships(getCategoryScholarships(c), "deadline");
  const guides = c.guideSlugs.map(getGuide).filter((g) => g !== undefined);

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/categories" className="text-emerald-800 underline">← All categories</Link>
      </nav>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{c.title}</h1>
        <p className="max-w-3xl text-slate-700">{c.intro}</p>
      </header>
      <ScholarshipGrid scholarships={scholarships} />
      <AdSlot />
      {guides.length > 0 && (
        <section aria-labelledby="guides-heading" className="space-y-2">
          <h2 id="guides-heading" className="text-xl font-semibold">Helpful guides</h2>
          <ul className="list-disc space-y-1 pl-5">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-emerald-800 underline">{g.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
