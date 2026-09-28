import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE_NAME} handles data: no accounts, locally saved scholarships, analytics and advertising cookies.`,
  alternates: { canonical: "/privacy" },
};

const UPDATED = "29 September 2026";
const analytics = !!process.env.NEXT_PUBLIC_GA_ID;
const ads = !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

const linkClass = "text-emerald-800 underline";

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Privacy policy</h1>
        <p className="text-sm text-slate-600">Last updated {UPDATED}</p>
      </header>

      <p>
        {SITE_NAME} is a free scholarship directory. You can use it without an account, and we do not ask for your name,
        contact details or documents. This page explains what data is involved when you use the site.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Saved scholarships</h2>
        <p>
          When you save a scholarship, its ID is stored in your browser&apos;s local storage on your device. It is not sent
          to us. You can remove saved scholarships on the <Link href="/saved" className={linkClass}>Saved</Link> page or by
          clearing your browser&apos;s site data.
        </p>
      </section>

      {analytics && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p>
            We use Google Analytics to understand how the site is used — for example which pages are viewed, what people
            search for, which scholarships are saved and which official links are opened. Google Analytics uses cookies
            and collects information such as your approximate location, device and browser. We do not send your name,
            contact details or documents to Google.
          </p>
          <p>
            You can block analytics with your browser&apos;s privacy settings or the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className={linkClass} rel="noopener noreferrer" target="_blank">
              Google Analytics opt-out add-on
            </a>
            .
          </p>
        </section>
      )}

      {ads && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Advertising</h2>
          <p>
            We show ads from Google AdSense on some pages to keep the site free. Google and its partners use cookies to
            serve ads based on your visits to this and other websites. You can turn off personalised advertising in{" "}
            <a href="https://adssettings.google.com" className={linkClass} rel="noopener noreferrer" target="_blank">
              Google Ads Settings
            </a>
            .
          </p>
        </section>
      )}

      {(analytics || ads) && (
        <p>
          Learn more about{" "}
          <a href="https://policies.google.com/technologies/partner-sites" className={linkClass} rel="noopener noreferrer" target="_blank">
            how Google uses information from sites that use its services
          </a>
          .
        </p>
      )}

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Hosting</h2>
        <p>
          The site is hosted by Vercel, which processes standard request information (such as IP address and browser type)
          to deliver pages and protect the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Links to other websites</h2>
        <p>
          Scholarship listings link to providers&apos; official websites. When you apply, you share information directly
          with that provider under its own privacy policy.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          Questions about privacy, or corrections to a listing:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </article>
  );
}
