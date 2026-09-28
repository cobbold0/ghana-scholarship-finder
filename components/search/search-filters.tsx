import Form from "next/form";
import Link from "next/link";
import {
  FUNDING_LABELS,
  LEVEL_LABELS,
  LOCATION_LABELS,
  STATUS_LABELS,
} from "@/lib/scholarships";
import { getFilterOptions, hasActiveFilters, type Filters } from "@/lib/scholarships/filter";

type Options = ReturnType<typeof getFilterOptions>;

const selectClass =
  "mt-1 block min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900";

function Select({ name, label, value, children }: { name: string; label: string; value?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`filter-${name}`} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <select id={`filter-${name}`} name={name} defaultValue={value ?? ""} className={selectClass}>
        {children}
      </select>
    </div>
  );
}

export function SearchFilters({ filters, options }: { filters: Filters; options: Options }) {
  return (
    <Form action="/scholarships" role="search" aria-label="Search and filter scholarships" className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <label htmlFor="filter-q" className="block text-sm font-medium text-slate-800">
          Search
        </label>
        <input
          id="filter-q"
          type="search"
          name="q"
          defaultValue={filters.q}
          maxLength={100}
          placeholder="Name, provider, country or keyword"
          className="mt-1 block min-h-11 w-full rounded-md border border-slate-300 px-3 text-base"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.levels.length > 0 && (
          <Select name="level" label="Education level" value={filters.level}>
            <option value="">Any level</option>
            {options.levels.map((l) => (
              <option key={l} value={l}>{LEVEL_LABELS[l]}</option>
            ))}
            {options.hasPostgraduate && <option value="postgraduate">Postgraduate (Master&apos;s or PhD)</option>}
          </Select>
        )}
        {options.locations.length > 0 && (
          <Select name="location" label="Where you study" value={filters.location}>
            <option value="">Anywhere</option>
            {options.locations.map((l) => (
              <option key={l} value={l}>{LOCATION_LABELS[l]}</option>
            ))}
          </Select>
        )}
        {options.fields.length > 0 && (
          <Select name="field" label="Field of study" value={filters.field}>
            <option value="">Any field</option>
            {options.fields.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </Select>
        )}
        {options.funding.length > 0 && (
          <Select name="funding" label="Funding" value={filters.funding}>
            <option value="">Any funding</option>
            {options.funding.map((f) => (
              <option key={f} value={f}>{FUNDING_LABELS[f]}</option>
            ))}
          </Select>
        )}
        {options.statuses.length > 0 && (
          <Select name="status" label="Status" value={filters.status}>
            <option value="">Any status</option>
            {options.statuses.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </Select>
        )}
        {options.hasDeadlines && (
          <Select name="deadline" label="Deadline" value={filters.deadline}>
            <option value="">Any time</option>
            <option value="30">Within 30 days</option>
            <option value="90">Within 90 days</option>
          </Select>
        )}
        <Select name="sort" label="Sort by" value={filters.sort}>
          <option value="deadline">Deadline (soonest first)</option>
          <option value="updated">Recently updated</option>
          <option value="title">Name (A–Z)</option>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="min-h-11 rounded-md bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800">
          Search
        </button>
        {hasActiveFilters(filters) && (
          <Link href="/scholarships" className="min-h-11 content-center px-2 text-sm font-medium text-slate-700 underline">
            Reset filters
          </Link>
        )}
      </div>
    </Form>
  );
}
