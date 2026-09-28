import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About and how we verify listings",
  description: `How ${SITE_NAME} collects, verifies and labels scholarship information, and how we handle your privacy.`,
  alternates: { canonical: "/about" },
};

const STATUS_HELP = [
  ["Open", "Applications are open, confirmed on the provider's official website."],
  ["Upcoming", "The provider has announced that applications will open soon."],
  ["Closed", "The application window has ended."],
  ["Ongoing / recurring", "Applications are accepted on a rolling basis, as confirmed by the provider."],
  ["Unverified", "We have not yet confirmed the details on the official website. Treat them as a starting point only."],
];

export default function AboutPage() {
  return (
    <article className="max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">About {SITE_NAME}</h1>
      <p>
        {SITE_NAME} is a free, independent directory that helps Ghanaian students discover scholarships and find the
        official way to apply. We are not a scholarship provider, we do not process applications, and we cannot
        guarantee that you will qualify or receive an award.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">How we verify listings</h2>
        <p>
          Each listing links to the provider&apos;s official website and records its source. When we have checked the
          details against that source, we show the date it was last verified. We only mark a scholarship as open when
          the provider&apos;s own website confirms it — never just because it ran in previous years.
        </p>
        <p>Deadlines we have not confirmed are labelled as “reported” and are never shown as countdowns.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">What each status means</h2>
        <dl className="space-y-2">
          {STATUS_HELP.map(([term, text]) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="text-slate-700">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Advertising</h2>
        <p>
          The site may show clearly labelled advertising on content pages to keep it free. Ads are never placed within
          scholarship details or next to official application links, and advertisers do not influence listings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p>
          You don&apos;t need an account. Scholarships you save are stored only in your browser on this device. We do not
          ask for personal documents or personal details.
        </p>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <p>
            We use Google Analytics, which sets cookies, to understand how the site is used — for example which pages
            are viewed, what people search for and which scholarships are saved. We don&apos;t send your name, contact
            details or documents to Google.
          </p>
        )}
        <p>
          Read the full <Link href="/privacy" className="text-emerald-800 underline">privacy policy</Link>.
        </p>
      </section>

      <p>
        Spotted an error or out-of-date listing? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-800 underline">{CONTACT_EMAIL}</a>. Always rely on the
        provider&apos;s official website before applying.
      </p>
    </article>
  );
}
