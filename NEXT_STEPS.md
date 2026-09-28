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
- Optional: add a custom domain in Vercel, then update `NEXT_PUBLIC_SITE_URL` in the Vercel project to match and redeploy.
- Confirm the site loads in a private/incognito window (Vercel deployment protection is on for preview URLs; the production domain should be public).
- Submit the sitemap to Google Search Console.
- Create a GA4 property, then set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`) for Production in the Vercel project and redeploy. In GA admin, keep Enhanced measurement on (outbound clicks, site search with the `q` parameter).
- Before enabling GA: publish a privacy policy and, if serving EU/UK visitors, add cookie consent.
- Apply for Google AdSense when the site has verified content; then set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_SLOT_ID`. Do not enable Auto ads.
- Review privacy and legal requirements (privacy policy/cookie notice, especially once ads or analytics are enabled).
- Add a contact method for reporting errors in listings (email or form) — needs an owner-controlled address.

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
- Deployed to Vercel (project `ghana-scholarship-finder`, auto-deploys from `main`) at https://ghana-scholarship-finder.vercel.app with `NEXT_PUBLIC_SITE_URL` set; canonical URLs and robots verified on the live site
- Google Analytics 4 integration (env-gated, off until `NEXT_PUBLIC_GA_ID` is set) with a `scholarship_saved` event; About page privacy text shown when GA is enabled
- Mobile layout checked at 375px width (no horizontal overflow) and save → saved page flow checked in Chromium
