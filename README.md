# Ghana Scholarship Finder

A free, mobile-first directory that helps Ghanaian students discover scholarships, understand eligibility, and reach the official application page. No account required.

Project context: [`CLAUDE.md`](CLAUDE.md), [`PRODUCT.md`](PRODUCT.md), [`TECHNICAL_SPEC.md`](TECHNICAL_SPEC.md), [`MONETIZATION.md`](MONETIZATION.md), [`SEO.md`](SEO.md), [`NEXT_STEPS.md`](NEXT_STEPS.md).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod · Vitest + Testing Library.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc` |
| `npm test` | Unit and component tests |
| `npm run build` / `npm start` | Production build / server |

## Structure

```
app/                     Routes: home, /scholarships, /scholarships/[slug], /categories, /guides, /saved, /about, sitemap, robots
components/              layout, scholarships (card, status, deadline, save), search (filters form), ads
data/scholarships/       scholarships.json — the scholarship records
data/guides.ts           Guide content
lib/scholarships/        Zod schema, data access, status logic, search/filter/sort, categories
lib/storage/saved.ts     localStorage-backed saved scholarships
tests/                   Vitest tests
```

## Managing scholarship data

Records live in `data/scholarships/scholarships.json` and are validated against `lib/scholarships/schema.ts` at build time — an invalid record or duplicate slug fails the build.

- **Add:** append a record with a unique `id` and `slug`. Only include facts from a source; leave unknown fields out (the UI labels them as missing).
- **Verify:** after checking the official page, set `lastVerifiedAt`, set `status` (`open`, `upcoming`, `closed`, `ongoing`), and set `deadlineVerified: true` if the deadline was confirmed. Update `updatedAt`.
- **Unverified:** keep `status: "unverified"` and `deadlineVerified: false`. Reported deadlines are shown as "Reported deadline — not yet verified".
- **Archive:** set `archived: true` to hide a listing without deleting it. **Remove:** delete the record.

Rules enforced in code and tests:

- A status is never inferred as open. A verified deadline that has passed shows an `open`/`upcoming` listing as closed.
- Non-`unverified` statuses and verified deadlines require `lastVerifiedAt`.
- Filters with fewer than two distinct values are hidden; categories with fewer than three listings are not published.

## Search and filters

`/scholarships` reads filters from URL query params (`q`, `level`, `location`, `field`, `funding`, `status`, `deadline`, `sort`), validated with Zod — invalid values are ignored. The form works without JavaScript; with JS, `next/form` navigates client-side.

## Analytics

Google Analytics 4 loads only when `NEXT_PUBLIC_GA_ID` is set (via `@next/third-parties`). Page views cover scholarship views and filter usage (filters are URL params). Keep GA4 **Enhanced measurement** on in the GA admin so outbound clicks (official application links) and site search (`q` param) are tracked automatically. The only custom event is `scholarship_saved` (`scholarship_id` param). No personal data is sent.

## Advertising

`components/ads/ad-slot.tsx` renders a labelled AdSense unit only when `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_SLOT_ID` are set. It is placed on the home, category and guide pages only — never on scholarship detail pages or near application links. Do not enable AdSense Auto ads, which would place ads on detail pages.

## Deployment

Any Next.js host works; Vercel is the simplest:

1. Import the repository into Vercel (framework preset: Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://yourdomain.com`).
3. Deploy, then add the custom domain and submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

Pages are statically generated and revalidated daily; `/scholarships` renders per request because it depends on search params.
