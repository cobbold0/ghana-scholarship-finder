import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { getGuide, guides } from "@/data/guides";
import { formatDate } from "@/lib/scholarships";
import { getCategory } from "@/lib/scholarships/categories";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, url: `/guides/${g.slug}`, type: "article" },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const categories = g.categorySlugs.map(getCategory).filter((c) => c !== undefined);

  return (
    <article className="max-w-3xl space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/guides" className="text-emerald-800 underline">← All guides</Link>
      </nav>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold leading-tight">{g.title}</h1>
        <p className="text-lg text-slate-700">{g.description}</p>
        <p className="text-sm text-slate-600">Updated {formatDate(g.updatedAt)}</p>
      </header>
      {g.sections.map((section, i) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
          {section.list && (
            <ul className="list-disc space-y-1 pl-5">
              {section.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {i === 1 && <AdSlot />}
        </section>
      ))}
      <section aria-labelledby="next-heading" className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
        <h2 id="next-heading" className="text-lg font-semibold">Find scholarships</h2>
        <ul className="list-disc space-y-1 pl-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/categories/${c.slug}`} className="text-emerald-800 underline">{c.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/scholarships" className="text-emerald-800 underline">Search all scholarships</Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
