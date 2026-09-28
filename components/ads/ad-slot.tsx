"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT as CLIENT_ID } from "@/lib/consent";

const SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

/**
 * Manual AdSense unit, clearly labelled. Renders nothing until AdSense is configured. Ads show whether or
 * not the visitor consents; without consent they are non-personalised (see lib/consent.ts).
 * Only place on content pages (home, guides, categories) — never on scholarship detail pages or next to application links.
 */
export function AdSlot() {
  useEffect(() => {
    if (!CLIENT_ID || !SLOT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or script failures must never break the page.
    }
  }, []);

  if (!CLIENT_ID || !SLOT_ID) return null;
  return (
    <aside aria-label="Advertisement" className="my-8 border-y border-slate-200 py-3">
      <p className="mb-1 text-xs uppercase tracking-wide text-slate-500">Advertisement</p>
      <ins
        className="adsbygoogle block min-h-[100px]"
        data-ad-client={CLIENT_ID}
        data-ad-slot={SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
