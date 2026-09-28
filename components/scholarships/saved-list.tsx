"use client";

import Link from "next/link";
import { useSavedIds, writeSaved } from "@/lib/storage/saved";
import type { Scholarship } from "@/lib/scholarships/schema";
import { ScholarshipGrid } from "./scholarship-card";

export function SavedList({ scholarships }: { scholarships: Scholarship[] }) {
  const ids = useSavedIds();
  const saved = scholarships.filter((s) => ids.includes(s.id));
  const missing = ids.length - saved.length;

  if (!ids.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
        <p className="font-medium">You haven&apos;t saved any scholarships yet.</p>
        <p className="mt-1 text-sm text-slate-600">Use the Save button on any scholarship to keep it here.</p>
        <Link href="/scholarships" className="mt-3 inline-block font-semibold text-emerald-800 underline">
          Browse scholarships
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {missing > 0 && (
        <p className="text-sm text-slate-600">
          {missing} saved {missing === 1 ? "listing is" : "listings are"} no longer available.
        </p>
      )}
      <ScholarshipGrid scholarships={saved} />
      <button
        type="button"
        onClick={() => writeSaved([])}
        className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium hover:bg-slate-50"
      >
        Clear all saved
      </button>
    </div>
  );
}
