import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { getCategories, getCategoryScholarships } from "@/lib/scholarships/categories";

export const metadata: Metadata = {
  title: "Scholarship categories",
  description: "Browse scholarships for Ghanaian students by category: undergraduate, postgraduate, PhD and fully funded.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Scholarship categories</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {getCategories().map((c) => (
          <li key={c.slug}>
            <Link href={`/categories/${c.slug}`} className="block h-full rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
              <h2 className="font-semibold text-emerald-800">{c.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{c.description}</p>
              <p className="mt-2 text-sm text-slate-600">{getCategoryScholarships(c).length} listings</p>
            </Link>
          </li>
        ))}
      </ul>
      <AdSlot />
    </div>
  );
}
