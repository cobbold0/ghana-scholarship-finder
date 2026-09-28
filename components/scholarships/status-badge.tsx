import { STATUS_LABELS, type ScholarshipStatus } from "@/lib/scholarships";

const STYLES: Record<ScholarshipStatus, string> = {
  open: "bg-emerald-100 text-emerald-900 ring-emerald-300",
  upcoming: "bg-sky-100 text-sky-900 ring-sky-300",
  ongoing: "bg-indigo-100 text-indigo-900 ring-indigo-300",
  closed: "bg-slate-200 text-slate-800 ring-slate-300",
  unverified: "bg-amber-100 text-amber-900 ring-amber-300",
};

export function StatusBadge({ status }: { status: ScholarshipStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[status]}`}>
      <span className="sr-only">Status: </span>
      {STATUS_LABELS[status]}
    </span>
  );
}
