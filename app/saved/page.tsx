import type { Metadata } from "next";
import { SavedList } from "@/components/scholarships/saved-list";
import { getScholarships } from "@/lib/scholarships";

export const metadata: Metadata = {
  title: "Saved scholarships",
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Saved scholarships</h1>
        <p className="text-slate-700">Saved on this device only. No account needed, and nothing is sent to us.</p>
      </header>
      <SavedList scholarships={getScholarships()} />
    </div>
  );
}
