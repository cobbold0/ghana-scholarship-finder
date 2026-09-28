import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3 py-12 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-slate-700">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/scholarships" className="inline-block font-semibold text-emerald-800 underline">
        Browse scholarships
      </Link>
    </div>
  );
}
