import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeadlineInfo } from "@/components/scholarships/deadline-info";
import { SaveButton } from "@/components/scholarships/save-button";
import { StatusBadge } from "@/components/scholarships/status-badge";
import {
  FUNDING_LABELS,
  LEVEL_LABELS,
  LOCATION_LABELS,
  STATUS_LABELS,
  formatDate,
  getDisplayStatus,
  getScholarshipBySlug,
  getScholarships,
  todayISO,
} from "@/lib/scholarships";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;
// Re-render daily so "deadline passed" labels stay current.
export const revalidate = 86400;

export function generateStaticParams() {
  return getScholarships().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/scholarships/[slug]">): Promise<Metadata> {
  const s = getScholarshipBySlug((await params).slug);
  if (!s) return {};
  const title = `${s.title} — eligibility, deadline & how to apply`;
  return {
    title,
    description: s.summary,
    alternates: { canonical: `/scholarships/${s.slug}` },
    openGraph: { title, description: s.summary, url: `/scholarships/${s.slug}`, type: "article" },
  };
}

function ListOrMissing({ items, missing }: { items: string[]; missing: string }) {
  if (!items.length) return <p className="text-slate-600">{missing}</p>;
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function ScholarshipPage({ params }: PageProps<"/scholarships/[slug]">) {
  const s = getScholarshipBySlug((await params).slug);
  if (!s) notFound();

  const today = todayISO();
  const status = getDisplayStatus(s, today);
  const verified = !!s.lastVerifiedAt;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Scholarships", item: `${SITE_URL}/scholarships` },
      { "@type": "ListItem", position: 2, name: s.title, item: `${SITE_URL}/scholarships/${s.slug}` },
    ],
  };

  return (
    <article className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/scholarships" className="text-emerald-800 underline">← All scholarships</Link>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={status} />
          <span className="text-sm text-slate-600">{FUNDING_LABELS[s.fundingType]}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight">{s.title}</h1>
        <p className="text-slate-700">
          Provided by <strong>{s.provider}</strong>
        </p>
      </header>

      {!verified && (
        <div role="note" className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">These details have not yet been verified against the official source.</p>
          <p className="mt-1">
            They are based on publicly reported information and may be incomplete or out of date. Check the official
            website before you apply.
          </p>
        </div>
      )}

      <section aria-labelledby="key-facts" className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
        <h2 id="key-facts" className="sr-only">Key facts</h2>
        <DeadlineInfo scholarship={s} today={today} detailed />
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-600">Status</dt>
            <dd className="font-medium">{STATUS_LABELS[status]}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Education level</dt>
            <dd className="font-medium">{s.educationLevels.map((l) => LEVEL_LABELS[l]).join(", ")}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Eligible nationality</dt>
            <dd className="font-medium">{s.eligibleCountries.join("; ")}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Where you study</dt>
            <dd className="font-medium">
              {s.hostCountries.join(", ") || "Not specified"} ({LOCATION_LABELS[s.studyLocation]})
            </dd>
          </div>
          <div>
            <dt className="text-slate-600">Field of study</dt>
            <dd className="font-medium">{s.fieldsOfStudy.join(", ") || "Not restricted to specific fields in our records — check the official page"}</dd>
          </div>
          <div>
            <dt className="text-slate-600">Last verified</dt>
            <dd className="font-medium">{s.lastVerifiedAt ? formatDate(s.lastVerifiedAt) : "Not yet verified"}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={s.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-md bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800"
          >
            Visit official website<span aria-hidden="true">&nbsp;↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <SaveButton id={s.id} title={s.title} />
        </div>
        <p className="text-xs text-slate-600">
          You apply directly with the provider. We are not affiliated with {s.provider} and never charge for applications.
        </p>
      </section>

      <section aria-labelledby="overview" className="space-y-2">
        <h2 id="overview" className="text-xl font-semibold">Overview</h2>
        <p>{s.summary}</p>
        {s.description && <p>{s.description}</p>}
      </section>

      <section aria-labelledby="eligibility" className="space-y-2">
        <h2 id="eligibility" className="text-xl font-semibold">Eligibility</h2>
        <ListOrMissing items={s.eligibility} missing="Eligibility details have not been recorded yet. See the official website." />
        <p className="text-sm text-slate-600">Meeting these criteria does not guarantee selection.</p>
      </section>

      <section aria-labelledby="funding" className="space-y-2">
        <h2 id="funding" className="text-xl font-semibold">What the scholarship covers</h2>
        <ListOrMissing items={s.fundingCoverage} missing="Funding details have not been recorded yet. See the official website." />
      </section>

      <section aria-labelledby="documents" className="space-y-2">
        <h2 id="documents" className="text-xl font-semibold">Required documents</h2>
        <ListOrMissing
          items={s.requirements}
          missing="The document list has not been recorded yet. Check the official website for the full list of required documents."
        />
        <p className="text-sm">
          <Link href="/guides/scholarship-application-documents" className="text-emerald-800 underline">
            Guide: documents commonly needed for scholarship applications
          </Link>
        </p>
      </section>

      <section aria-labelledby="how-to-apply" className="space-y-2">
        <h2 id="how-to-apply" className="text-xl font-semibold">How to apply</h2>
        {s.applicationInstructions.length ? (
          <ol className="list-decimal space-y-1 pl-5">
            {s.applicationInstructions.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : (
          <p className="text-slate-600">Application steps have not been recorded yet. See the official website.</p>
        )}
        <p className="text-sm">
          <Link href="/guides/how-to-apply" className="text-emerald-800 underline">Guide: how to apply for a scholarship</Link>
          {" · "}
          <Link href="/guides/personal-statement" className="text-emerald-800 underline">Guide: writing a personal statement</Link>
        </p>
      </section>

      <section aria-labelledby="source" className="space-y-1 border-t border-slate-200 pt-4 text-sm text-slate-700">
        <h2 id="source" className="font-semibold">Source and verification</h2>
        <p>
          Source:{" "}
          <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="break-all text-emerald-800 underline">
            {s.sourceUrl}
          </a>
        </p>
        <p>{s.lastVerifiedAt ? `Last verified on ${formatDate(s.lastVerifiedAt)}.` : "Not yet verified against this source."}</p>
        <p>Listing updated on {formatDate(s.updatedAt)}.</p>
      </section>
    </article>
  );
}
