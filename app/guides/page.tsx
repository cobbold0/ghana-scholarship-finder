import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Scholarship guides",
  description: "Practical guides for Ghanaian students on finding scholarships, preparing documents, writing personal statements and applying.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Scholarship guides</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="block h-full rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
              <h2 className="font-semibold text-emerald-800">{g.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{g.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <AdSlot />
    </div>
  );
}
