# Ghana Scholarship Finder — Claude Code Instructions

## Mission

Build a production-ready scholarship discovery platform for Ghanaian students.

The platform should help students find relevant scholarships, understand eligibility requirements, and access the official application process.

Work autonomously. Read all project context files and inspect the repository before coding.

Do not wait for approval for ordinary engineering decisions. Make sensible, reversible decisions and continue working.

Only ask Augustine when an action genuinely requires his involvement, such as account credentials, domain configuration, paid services, or important business decisions.

If blocked by an owner-only action, continue everything else and document it in `NEXT_STEPS.md`.

## Read First

Read these files before implementation:

- `CLAUDE.md`
- `PRODUCT.md`
- `TECHNICAL_SPEC.md`
- `MONETIZATION.md`
- `SEO.md`
- `NEXT_STEPS.md`

Inspect the existing repository and preserve any useful implementation already present.

## Product Priorities

1. Accurate scholarship information
2. Useful search and filtering
3. Clear eligibility requirements
4. Reliable application links
5. Mobile usability
6. Fast performance
7. SEO
8. Sustainable monetization

The product's primary value is helping students discover genuine opportunities.

## Scholarship Accuracy

Never invent scholarships, deadlines, eligibility requirements, award amounts, or application links.

Do not describe an opportunity as open unless its status and deadline have been verified.

Distinguish clearly between: Open, Upcoming, Closed, Ongoing or recurring, Unverified.

Every scholarship listing should include its source and last-verified date where available.

Prefer official scholarship-provider sources. If information is incomplete, label it clearly instead of guessing. Do not guarantee that a student will qualify or receive an award.

## User Experience

The platform should be mobile-first and easy to use. Students should be able to:

1. Browse scholarships
2. Search by keyword
3. Filter by education level, location, field, and status
4. Open a scholarship
5. Review eligibility and requirements
6. Visit the official application page

Avoid unnecessary registration, complicated navigation, excessive animation, and intrusive advertising.

## Content and Data

Keep scholarship records structured and separate from UI components. Make it easy to add, update, verify, archive, and remove listings. Do not hardcode scholarship records throughout the application.

## Privacy and Security

Collect as little personal information as possible. Browsing should not require an account. Never commit API keys, passwords, tokens, or database credentials. Do not expose private information in logs or analytics.

## Engineering

Prefer Next.js, TypeScript, React, Tailwind CSS, Zod, and a simple maintainable architecture. Use the existing stack if it is already reasonable. Avoid unnecessary microservices, complex authentication, and premature infrastructure.

## SEO

SEO is a core acquisition channel. Build useful public pages for scholarship discovery and related educational information. Use accurate titles, descriptions, canonical URLs, sitemap, robots, and internal links. Do not generate thin pages simply to target keywords.

## Monetization

The initial business model is free scholarship discovery supported by advertising. Ads must never resemble application buttons or interfere with scholarship information. Do not charge students to access basic scholarship listings or official application links.

## Testing

Test scholarship filtering, search, sorting, status handling, eligibility display, missing or incomplete data, application link behavior, mobile layouts, and empty and error states.

Run lint, type checking, tests, and the production build. Fix failures before completion.

## Git and Documentation

Review the repository and Git diff before finishing. Do not commit secrets or unnecessary files. Commit meaningful completed work and push if the environment permits. Keep `README.md` and `NEXT_STEPS.md` updated.

`NEXT_STEPS.md` must have these sections: Owner must do, Optional improvements, Completed. Only verified work belongs in Completed.

## Definition of Done

The MVP should include scholarship listing pages, search and filters, individual scholarship details, eligibility and requirements, application links, status and verification information, responsive mobile experience, useful SEO pages, sitemap and robots, tests, successful production build, and updated README and NEXT_STEPS.

Perform a final review for accuracy, usability, accessibility, performance, SEO, privacy, and monetization placement.

@AGENTS.md
