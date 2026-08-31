# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript) as of the third build pass. First pass: static HTML/CSS/JS. Second pass: ported to Next.js/JavaScript. Third pass: converted to TypeScript. All three passes were hand-authored without ever running `npm install`, `next dev`, `next build`, or `tsc` in this session — this session's shell (Bash/PowerShell) has been broken at the environment level throughout; the user runs those themselves and reports back any errors (including type errors, never checked by a compiler here). Public content lives in `lib/portfolioData.ts` (typed via `lib/types.ts`); the curation screen is at `/admin`; photos live in `public/fotos/`. The TypeScript pass left the old `.js`/`.jsx` files in place (same filenames minus extension) since this session can't delete files — see README's cleanup command; until the user runs it, the project won't build (duplicate route/module names).

## Users

- **Site visitors (public portfolio):** people scouting a photographer for weddings, personal/family portrait sessions, or fashion/editorial work — including models and people wanting striking, attention-grabbing images. They land on the site to judge her work and decide whether to reach out.
- **The photographer (owner):** uses a private curation screen (`/admin`) to choose which photos from her shoots appear on the public portfolio, organize them by category, mark favorites, and set captions/order.

## Product Purpose

A personal portfolio site for a photographer to promote her work ("divulgar o trabalho dela") and generate contact from prospective clients. Success = a visitor understands her range across three specialties within seconds and knows how to reach her; the photographer can update what's shown without needing a developer.

## Positioning

She shoots across three registers — casamentos (weddings), retratos/ensaios (portraits), and editorial/moda (fashion) — with a specific pull toward striking, editorial-feeling images even outside fashion work ("modelos e pessoas que chamam atenção"). The site should read as production-grade and editorial-confident, not as a generic soft/romantic wedding-photographer template.

## Operating Context

- The photographer will drop real photo files into `public/fotos/` (organized by category subfolder) and reference them from `lib/portfolioData.js`; until then the site ships with clearly labeled placeholder tiles instead of fabricated stock imagery.
- She curates via `/admin`, a private (not publicly linked in main nav) route. It is not truly access-controlled — no auth/backend exists — so real privacy has to come from the host (e.g. Vercel password protection, or middleware the user adds later), documented in the project README rather than faked with a client-side password.

## Capabilities and Constraints

- No database — content lives in `lib/portfolioData.js`, hand-edited or regenerated via the admin screen's export. Next.js gives a real build/deploy pipeline now, but there's still no server-side persistence for curation edits.
- The admin screen edits a local draft (`localStorage`) and can export an updated `lib/portfolioData.js` file for the photographer to save over the old one before redeploying — this is the closest the current setup gets to a real CMS.
- Undecided/open: real name, bio, contact details, location, social handles, and actual photographs — all currently placeholders explicitly marked as such.

## Brand Commitments

Visual world is pinned by the user via a reference image (a Canva "About Me" scrapbook-style template screenshot: pink/cream palette, calligraphy script headlines, heart-cropped photos, ribbon/washi-tape/pearl motifs). This replaced an earlier "Backstage" (film-production-set) direction the user had picked first — the pinned reference is now the binding visual authority; see DESIGN.md for the built system ("Diário de Set").

## Evidence on Hand

None. No real photographs, bio copy, or contact details were provided. All imagery ships as explicitly labeled placeholder tiles; all identity/contact copy ships as clearly marked placeholder text for the photographer to replace.

## Product Principles

1. The photos are the argument — layout and system serve them, never compete with them.
2. Honor the user's pinned visual reference (currently the "Diário de Set" scrapbook world — see DESIGN.md) rather than defaulting to generic "photographer portfolio" tropes.
3. Never fabricate claims, numbers, or testimonials to make the placeholder feel more finished — mark every gap plainly for the photographer to fill in.
4. Keep the photographer able to change what's shown herself, without needing a developer for day-to-day content changes, even without a database.
