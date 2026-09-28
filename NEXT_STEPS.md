# Ghana Scholarship Finder — Next Steps

## Owner must do

- **Verify every scholarship listing before public launch.** The build environment could not reach official provider websites, so all 9 listings are marked **Unverified**. Their details come from well-known programme information and search-result summaries of official pages. For each record in `data/scholarships/scholarships.json`:
  - open `officialUrl` and `sourceUrl`, confirm the links work and point to the right page;
  - confirm eligibility, funding coverage, application steps and the current deadline;
  - then set `lastVerifiedAt`, `status`, `deadline` and `deadlineVerified: true` (see README → Managing scholarship data).
- Listings and reported deadlines to check first:
  - Chevening — reported 2027/28 deadline 6 October 2026.
  - Commonwealth Master's — reported CSC deadline 20 October 2026; confirm the Ghana nominating agency and its earlier internal deadline.
  - Gates Cambridge — reported 8 December 2026 / 6 January 2027 depending on course.
  - Rhodes West Africa (reported closed 27 Aug 2026), Mandela Rhodes (reported closed 14 Apr 2026), Stipendium Hungaricum (last reported deadline 15 Jan 2026) — confirm next-cycle dates.
  - Mastercard Foundation at KNUST and Ashesi — confirm the current call for applications.
  - Stipendium Hungaricum — confirm Ghana's partner-country status and the Ghana sending partner.
- Add `ghanascholarshipfinder.cobbold.dev` to Google Search Console and submit `https://ghanascholarshipfinder.cobbold.dev/sitemap.xml`.
- Delete the unused `NEXT_PUBLIC_GA_MEASUREMENT_ID` variable in the Vercel project (the code reads `NEXT_PUBLIC_GA_ID`).
- In GA admin, keep Enhanced measurement on (outbound clicks, site search with the `q` parameter).
- If serving EU/UK visitors, add a Google-certified cookie consent tool (Google requires this for GA/AdSense in the EEA/UK).
- Review the privacy policy at `/privacy`; it is a plain-language summary, not legal advice.
- Apply for Google AdSense when the site has verified content. `NEXT_PUBLIC_ADSENSE_SLOT_ID` is already set; after approval also set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (`ca-pub-…`) and add `public/ads.txt`. Do not enable Auto ads.

## Optional improvements

- Add more verified scholarships (e.g. Fulbright, DAAD, MEXT, Australia Awards, Ghana government scholarships), enabling more categories and the field-of-study and status filters
- Add a "Study in Ghana" category once it has at least three listings (already defined; published automatically)
- Explicit analytics events for `filter_applied` and `application_link_clicked` if Enhanced measurement proves insufficient
- Build an admin scholarship-management interface
- Add bulk import and duplicate detection
- Scheduled check that flags listings whose `lastVerifiedAt` is older than N months
- Add scholarship deadline reminders
- Add application tracking
- Add personalized scholarship matching
- Add email alerts
- Add scholarship-provider submissions
- Add sponsored listings with clear disclosure
- Expand to other African countries
- Add a mobile application
- Open Graph image for social sharing

## Completed

- Next.js 16 + TypeScript + Tailwind app scaffolded; lint, type check, 30 tests and production build pass
- Zod-validated scholarship data model in `data/scholarships/`, separate from UI, with archive support
- 9 starter listings with official links, all clearly labelled Unverified with reported deadlines flagged
- Mobile-first homepage with search, listings, categories and how-it-works
- Scholarship directory with keyword search, combined filters (level, location, field, funding, status, deadline), sorting, reset and empty state
- Detail pages with status, deadline, eligibility, funding, documents, application steps, prominent official link, source and verification info, and honest labels for missing data; 404 for unknown slugs
- Saved scholarships in localStorage (no account), resilient to corrupt/unavailable storage
- Category pages (undergraduate, postgraduate, PhD, fully funded) and four guides, with internal linking
- Metadata, canonical URLs, Open Graph, breadcrumb structured data, sitemap and robots (`/saved` excluded)
- Environment-gated, labelled ad slots on home, category and guide pages only
- Deployed to Vercel (project `ghana-scholarship-finder`, auto-deploys from `main`) at https://ghanascholarshipfinder.cobbold.dev (`www` redirects to it); `NEXT_PUBLIC_SITE_URL` set, canonical URLs and robots verified on the live site
- Google Analytics 4 live (`G-4991P4SN8B` via `NEXT_PUBLIC_GA_ID`) with a `scholarship_saved` event; tag verified on the live site
- Privacy policy page (`/privacy`) covering local storage, analytics, advertising (when enabled) and hosting, with contact email; linked from footer and About page, included in sitemap
- Contact email for listing corrections on the About page
- Mobile layout checked at 375px width (no horizontal overflow) and save → saved page flow checked in Chromium
