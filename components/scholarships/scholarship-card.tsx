import Link from "next/link";
import {
  FUNDING_LABELS,
  LEVEL_LABELS,
  getDisplayStatus,
  todayISO,
  type Scholarship,
} from "@/lib/scholarships";
import { DeadlineInfo } from "./deadline-info";
import { SaveButton } from "./save-button";
import { StatusBadge } from "./status-badge";

export function ScholarshipCard({ scholarship: s, today = todayISO() }: { scholarship: Scholarship; today?: string }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={getDisplayStatus(s, today)} />
        <span className="text-xs text-slate-600">{FUNDING_LABELS[s.fundingType]}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/scholarships/${s.slug}`} className="text-emerald-800 underline-offset-2 hover:underline">
            {s.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600">{s.provider}</p>
      </div>
      <p className="text-sm text-slate-700">{s.summary}</p>
      <dl className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
        <div>
          <dt className="inline text-slate-600">Level: </dt>
          <dd className="inline">{s.educationLevels.map((l) => LEVEL_LABELS[l]).join(", ")}</dd>
        </div>
        <div>
          <dt className="inline text-slate-600">Study in: </dt>
          <dd className="inline">{s.hostCountries.join(", ") || "Not specified"}</dd>
        </div>
      </dl>
      <div className="text-sm">
        <DeadlineInfo scholarship={s} today={today} />
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <Link
          href={`/scholarships/${s.slug}`}
          className="inline-flex min-h-11 items-center rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          View details<span className="sr-only">: {s.title}</span>
        </Link>
        <SaveButton id={s.id} title={s.title} />
      </div>
    </article>
  );
}

export function ScholarshipGrid({ scholarships, today }: { scholarships: Scholarship[]; today?: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {scholarships.map((s) => (
        <li key={s.id}>
          <ScholarshipCard scholarship={s} today={today} />
        </li>
      ))}
    </ul>
  );
}
