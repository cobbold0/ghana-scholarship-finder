import { formatDate, isDeadlinePassed, todayISO, type Scholarship } from "@/lib/scholarships";

/** Deadline text that never presents an unverified date as confirmed. */
export function DeadlineInfo({ scholarship: s, today = todayISO(), detailed = false }: { scholarship: Scholarship; today?: string; detailed?: boolean }) {
  if (!s.deadline) {
    return (
      <div>
        <p className="font-medium text-slate-900">No confirmed deadline</p>
        {detailed && s.deadlineNote && <p className="mt-1 text-sm text-slate-600">{s.deadlineNote}</p>}
      </div>
    );
  }
  const passed = isDeadlinePassed(s, today);
  const label = s.deadlineVerified ? "Deadline" : "Reported deadline";
  return (
    <div>
      <p className="font-medium text-slate-900">
        {label}: <time dateTime={s.deadline}>{formatDate(s.deadline)}</time>
        {passed && <span className="ml-1 font-normal text-slate-600">(passed)</span>}
      </p>
      {!s.deadlineVerified && <p className="text-sm text-amber-800">Not yet verified — confirm on the official website.</p>}
      {detailed && s.deadlineNote && <p className="mt-1 text-sm text-slate-600">{s.deadlineNote}</p>}
    </div>
  );
}
