import Link from "next/link";

export default function ScholarshipNotFound() {
  return (
    <div className="space-y-3 py-12 text-center">
      <h1 className="text-2xl font-bold">Scholarship not found</h1>
      <p className="text-slate-700">This listing may have been removed or the link may be wrong.</p>
      <Link href="/scholarships" className="inline-block font-semibold text-emerald-800 underline">
        Browse all scholarships
      </Link>
    </div>
  );
}
