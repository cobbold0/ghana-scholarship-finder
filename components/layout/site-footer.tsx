import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 text-sm text-slate-600">
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-8">
        <p>
          {SITE_NAME} is an independent directory. We are not a scholarship provider and cannot guarantee eligibility or
          awards. Always confirm details on the provider&apos;s official website before applying.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li><Link className="underline hover:text-slate-900" href="/about">About &amp; verification</Link></li>
            <li><Link className="underline hover:text-slate-900" href="/guides">Guides</Link></li>
            <li><Link className="underline hover:text-slate-900" href="/categories">Categories</Link></li>
            <li><Link className="underline hover:text-slate-900" href="/privacy">Privacy</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
