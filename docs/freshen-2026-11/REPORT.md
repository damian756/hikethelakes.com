# Hike The Lakes: November 2026 report

Internal report. The work was done on 11 Nov 2026 on `main`. Screenshots are in `docs/freshen-2026-11/screens/` and the sources in `docs/freshen-2026-11/sources/`, all fetched on 11 Nov 2026. The playbook is `C:\Projects\lakes-guide\docs\GUIDE-SITES-PLAYBOOK-2026-11.md` (section 9 covers the Lakes sites).

## Commits

**Stage 1** (live 17:04 UTC): `566a62e`, the contact form.

**Stage 2:**
- `a8ad494`: page counts; Vercel Analytics and Clarity removed.
- `ff84631`: the freshen-up.
- `8924976`: two posts.
- `8eca131`: screenshots.
- `39931cb`: sources.

**Review fixes:**
- `2b1c9e3`: `/api/p` removed.
- `4ab1365`: the fixes.
- `b50ac2a`: screenshots.

**Improvements:**
- `e325103`: icons.
- `bb2db1d`: feed, sitemap and share images.
- `e2fb655`: accessibility.
- `3c48437`: internal links.
- `16c53d1`: screenshots.

**Second review fixes:**
- `47ee206`: Wainwright books.
- `a45a664` and `5d3e084`: blog search and footer hover.
- `c416635`: screenshots.

**Dependency upgrade:** `07bf8fa`.

**This report**, then the **privacy and terms commits, last**: `4a4a610` and `3a4e946`. They are held for Damian to read before they go live.

## Stage 1: contact form, no email address

- **Found:** the site had no form and no mail code. `/contact` and `/privacy` printed damian@churchtownmedia.co.uk, and the footer printed hello@thelakes.network.
- **Changed (`566a62e`):**
  - The form posts to `POST /api/contact`. It requires `name` (max 200), `email` (validated, used as reply-to) and `message` (max 5000).
  - `type` must be one of General enquiry, Route or data correction, Featured listing, Advertising or Press or media. Anything else becomes General enquiry.
  - A hidden honeypot field, `website`, catches bots.
  - Every typed value is escaped.
  - Mail is sent through Resend's HTTP API from "Hike The Lakes <noreply@southportguide.co.uk>" (a verified domain) to damian@churchtownmedia.co.uk.
  - If the key is missing or Resend refuses, the route answers 502 with a plain message and logs only the error's name and message.
  - Addresses were removed from the contact page, the privacy page and the footer.
  - A stray "TheOpen.com" link (left over from the golf site) was removed.
- **Proven live** by the coordinating chat: a marked test arrived in the inbox.
- **Test:** `tests/contact.test.mjs` (`npm run test:contact`), 10 checks.

## 1. What was found (ranked)

1. **`/conditions` showed false safety information.** March 2026 "Good" and "Clear" statuses sat under today's date as the day's conditions, labelled "updated manually each morning". 196 fells defaulted to "Good". One Open-Meteo wind reading was printed on every fell card.
2. **193 of the 214 fell pages showed template routes, times and difficulty.** For example, "Patterdale, 5-6 miles, 700m, 4-6 hours" appeared on 34 fells. The fell heights were correct: the ten highest match the National Park's list.
3. **Wrong details:**
   - Home cards linked to the wrong pages.
   - "20 Fells Featured".
   - "All fells are open access".
   - "90 min from Manchester Airport", with no source.
   - Hero alt text said Lake District on an Alpine photo.
   - The ODG postcode was LA22 9JX; its own site says 9JY.
   - The YHA and Bridge Hotel URLs had moved.
   - Prices with no source.
   - George Fisher, a shop, was listed as dining.
4. **Visit logging.** The stage 2 agent concluded that production never wrote page views, because the insert in `proxy.ts` was not awaited. That was wrong (see section 8): production did write. The switch to plain counts was kept anyway, for the right reason.
5. **The privacy page named Plausible (never loaded) and Clarity (no project id on the live site).** It left out Ahrefs, Vercel Analytics and the `NEXT_LOCALE` cookie.
6. **Booking.com affiliate links** were in the nav, on the home page, on all 214 fell pages, on the itineraries and on the accommodation page (one link carried a placeholder `aid=123456`). Affiliate disclaimers and sections were in the privacy and terms pages.
7. **Unprovable claims:** "definitive", "complete", "curated", "Written From the Inside", "for decades", criticism of the official tourism sites, and the author bio.
8. **19 rankings or judgements of named businesses**, in fell tips, itineraries, the Scafell post and the accommodation page.
9. **90 em dashes in `lib/fells.ts`.**
10. **Stale:** the legal pages said "February 2026", and the last post was dated 3 Mar 2026.
11. **Golf leftovers:**
    - empty untracked folders `the-open-2026`, `tee-times` and `scorecard` (404, unlinked);
    - unused golf images still publicly served;
    - `courses` strings;
    - golf icons and comments.
12. **`/feed` returned 404** live, because of the proxy matcher.

## 2. What changed

**Conditions page.** The statuses and date are gone. It says it has no live conditions and links MWIS, the Met Office and Weatherline. The wind point is described as one model point about 540 m up, about 4 km west of Grasmere. (`before/after-conditions-*`)

**Placeholder fells.** Each one says no route guide is written yet (`hasRouteGuide()`), and its card says "View fell page". The list link reads "All 214 fells". (`after-fells-scafell-*`, `after-fell-log-*`)

**Fell coordinates (JSON-LD).** These are kept only where they agree with the fell's grid reference to within 200 m, by an OSGB36 to WGS84 conversion checked against the Ordnance Survey's worked example:

| Fell | Distance from grid ref |
|---|---|
| Scafell Pike | 40 m |
| Helvellyn | 38 m |
| Blencathra | 57 m |
| Great Gable | 43 m |
| Coniston Old Man | 24 m |

The other 16 guide fells were 267 m to 4.6 km out and lost their coordinates; the placeholder fells have none.

**Wainwright books.** 13 fells were filed under the wrong book and are corrected, checked against Wikipedia's List of Wainwrights (linked from the National Park's facts page) and each fell's grid reference:

| Fell | Corrected book |
|---|---|
| Harrison Stickle | Central (3) |
| Pike o'Stickle | Central (3) |
| Knott | Northern (5) |
| Hartsop Dodd | Far Eastern (2) |
| Knott Rigg | North Western (6) |
| Rannerdale Knotts | North Western (6) |
| Barrow | North Western (6) |
| Grey Knotts | Western (7) |
| Starling Dodd | Western (7) |
| Yewbarrow | Western (7) |
| Buckbarrow | Western (7) |
| Bowfell | Southern (4) |
| Crinkle Crags | Southern (4) |

The Wainwright Society publishes no public list.

**Home page:**
- labels fixed;
- "21 route guides";
- four tools per row;
- nine featured fells (Bowfell and Fairfield added so the grid is even);
- the editorial text taken from the National Park's facts page;
- the duplicate difficulty pill removed.

**Accommodation.** Named places are described from their own sites, and the postcodes, links and prices are fixed.

**Affiliate links removed** from:
- the nav;
- the home "Book" block and its disclaimer;
- all fell pages;
- both itinerary pages;
- the accommodation page (including the placeholder `aid=123456`).

YHA, ODG and Bridge Hotel now have plain "Visit website" links. The OS Maps link stays as a plain link to osmaps.com (it had been a 404). No `rel="sponsored"` remains.

**Claims changed:**
- "The definitive guide…" (meta, footer, JSON-LD) became "Lake District fell guides: heights and grid references for the 214 Wainwrights…".
- "The complete guide" became "All 214 Wainwright fells… route guides for 21".
- "Written From the Inside / visitor for decades" became "Lake District Fell Walking Blog / by Damian Roche of Churchtown Media".
- Removed:
  - "People travel from Japan…", from the home page and from a post;
  - the criticism of the official tourism sites;
  - "The Honest Account" (the title changed, the slug is kept), and the "honest" phrases;
  - the Scafell Pike trig pillar sentence, which contradicted the site's own post;
  - the Travellers Rest sentence (wrong postcode area and direction) and "I have done it a dozen times".
- 19 judgements of named businesses removed.
- The author bio now says only what churchtownmedia.co.uk/about says.

**Other changes:**
- **Analytics:** Clarity and Vercel Analytics removed. Ahrefs is the only analytics script.
- **Images:** `images.qualities` is set, alt text describes the photos, and the 12 blog index images load through `/_next/image` rather than straight from Unsplash.
- **Em dashes:** fixed throughout.

## 3. The two new posts

### The Helvellyn Fell Top Report: Reading Weatherline in Winter
- **Slug:** `helvellyn-fell-top-report-weatherline`
- **Live URL:** https://www.hikethelakes.com/blog/helvellyn-fell-top-report-weatherline
- **Search term:** "Helvellyn conditions" or "fell top report". Chosen because the reports start in December.
- **Internal links:** `/fells/helvellyn`, `/conditions`, `/blog/reading-the-fell-forecast-mwis-guide`, `/blog/winter-fell-walking-lake-district`.

**Sources** (all accessed 11 Nov 2026):
- **LDNPA weather page**, https://lakedistrict.gov.uk/explore/plan-your-visit/lake-district-weather/:
  - Fell Top Assessors record daily summit conditions from December to April, and usually work December to March.
  - What the reports contain, and the readings they give.
  - When the reports are published.
  - The Met Office forecast is written in Aberdeen and updated twice a day.
  - The glossary and the wind table (gale 55 mph, storm 64 mph).
  - Snow falls between November and March, on about 20 days a year.
  - Winter skills courses.
- **LDNPA Weatherline page**, https://www.lakedistrict.gov.uk/explore/plan-your-visit/lake-district-weather/weatherline/: where the reports are published; the assessors return in December 2026.
- **LDNPA facts and figures**, https://www.lakedistrict.gov.uk/learning/factsandfigures: Helvellyn is 950 m, the third highest.
- **MWIS Lake District**, https://www.mwis.org.uk/forecasts/english-and-welsh/lake-district: summit wind, cloud and freezing level.

### How to Call Mountain Rescue in the Lake District
- **Slug:** `how-to-call-mountain-rescue-lake-district`
- **Live URL:** https://www.hikethelakes.com/blog/how-to-call-mountain-rescue-lake-district
- **Search term:** "mountain rescue Lake District". An evergreen safety subject the site did not cover.
- **Internal links:** `/fells/scafell-pike`, `/blog/sharp-edge-blencathra-underrated-ridge`, `/blog/striding-edge-what-no-one-tells-you`, `/conditions`.

**Sources** (all accessed 11 Nov 2026):
- **Mountain Rescue England and Wales, Getting help**, https://www.mountain.rescue.org.uk/getting-help/: what to note, the call procedure, battery advice, and what to put in an emergencySMS text.
- **Mountain Rescue England and Wales, home page**, https://www.mountain.rescue.org.uk/: 48 teams; in 2025, 3,968 calls and 3,175 deployments; free to the casualty; carry a torch and a spare.
- **LDSAMRA**, https://www.ldsamra.org.uk/: 12 teams cover the National Park and Cumbria; it is a charity.
- **Relay UK**, https://www.relayuk.bt.com/how-to-use-relay-uk/contact-999-using-relay-uk.html: who emergencySMS is for; how to register; use it only if there is no other option, because it takes longer; don't assume a message has arrived until you get a reply.
- **AdventureSmart**, https://www.adventuresmart.uk/lake-district-cumbria/: the hotspots.

**Both posts:**
- They use stock photos already on the site.
- They contain no first-person content.
- They appear in `lib/blog.ts`, the sitemap, the blog index and the feed.
- Screenshots: `post-*`.

## 4. Independent review and what was done

### First pass (`566a62e..d934eb9`)
The reviewer changed nothing and re-fetched every source; none differed from the saved copy. Every number, date, time and phone or text number in the two posts matched its source. The new `/conditions` page is true.

| # | Severity | Finding | Done |
|---|---|---|---|
| 1 | Must | `app/api/p` was an open endpoint writing PageView rows | Deleted |
| 2 | Must | `/blog` loaded 12 card images from Unsplash in the visitor's browser | `next/image` |
| 3 | Should | Made-up coordinates in fell JSON-LD for 193 placeholder fells (one in the Scottish Borders) | Kept only within 200 m of the grid ref (5 fells) |
| 4 | Should | All 214 cards said "View guide" | "View fell page" for placeholders |
| 5 | Should | Weatherline post and `/conditions` pointed at the wrong National Park page | Now `.../weatherline/` |
| 6 | Should | Rescue post left out Relay UK's two warnings | Added |
| 7 | Should | "most often" overstated AdventureSmart | "Lake District Hotspots", "more often" |
| 8 | Should | Helvellyn tip: Travellers Rest postcode and direction; "a dozen times" | Cut |
| 9 | Should | Old claims (Japan line, "The Honest Account", "honest") | Fixed. First-person passages left for Damian (section 5) |
| 10 | Should | Privacy page did not mention the contact form | Added (privacy commit) |
| 11 | Note | The trig pillar sentence contradicted the site's own post | Removed |
| 12 | Note | The `NEXT_LOCALE` cookie is set only in some cases | "may set" (privacy commit) |
| 13 | Note | The wind point was called a "valley reading" | Described as about 540 m |
| 14 | Note | The turn-back threshold did not match the wind table; "rocks and cairns" was not in the glossary | Authority thresholds quoted; own advice marked |
| 15 | Note | Never-shown "definitive" and "complete" strings; duplicate difficulty pill | Deleted |

### Second pass (`39931cb..05ea0f3`)
All 15 findings above were found fixed or acceptably handled, and the improvements were checked:
- `/feed` returns 200 with 12 items.
- The sitemap has 248 URLs, no privacy or terms pages, and each post's own date.
- Every share image returns 200.
- The icons are 585 bytes to 4.4 KB.
- The skip link, `aria-expanded`, the search label and `lang="en-GB"` are present.
- The footer text has about 7:1 contrast.

New findings:
- **N1 (should):** 11 fells were in the wrong Wainwright book. Done, as above; Bowfell and Crinkle Crags were found too.
- **N2 (should):** the search box collapsed to about 70 px at 768. Fixed: 18rem from sm up, with the icon kept inside the box.
- **Note:** footer hover equalled the base colour. Fixed (hover to white).
- **Note:** two screenshots were taken in a 3200 px viewport. Retaken.

The last round (`47ee206` to `07bf8fa`) was spot-checked by the coordinating session: the 13 books are correct in `lib/fells.ts`, and `npm audit --omit=dev` shows 2 moderate and 0 high.

## 5. Suggestions for Damian

1. **Placeholder fells:**
   - **First person:** these passages make claims only Damian can confirm or cut. In `lib/blog.ts`: line 203 (Striding Edge, "I have done it a lot…"), 335 ("I have not done mine yet"), 416 ("I do not avoid the fells in winter…"), 447, 453, 459 and 476 (tarn fishing, "I fish the coast…", "the one I go back to most"), and 538 ("in my view better for it").
   - **Thin pages:** the 193 placeholder fell pages are thin. Add `noindex` until each has a written guide, then write guides in batches, the most searched first. (`idea-fell-placeholder-1440.jpg`)
2. **Real photos:** the hero is an Alpine range and the post photos are stock. The hero is also the largest thing on every page. (`idea-hero-photo-1440.jpg`, `idea-blog-stock-photos-1440.jpg`)
3. **Network cross-links:** link each fell page to The Lakes Guide's page for its base village and to nearby Lakes Wildlife reserves. This needs a slug map checked against the live sites. (`idea-network-links-1440.jpg`)
4. **Fell log:** a compact sortable table of height, grid reference and area, a small redesign. (`idea-fell-log-1440.jpg`)
5. **Itineraries:** link each day to its fell guides, and source or remove the cost estimates. (`idea-itinerary-links-1440.jpg`, `idea-itinerary-costs-1440.jpg`)
6. **Dead code** (needs `package.json`):
   - `@vercel/analytics`;
   - the 17 unrouted locale files;
   - LanguageSwitcher and the flags;
   - `app/[locale]/icon.svg`;
   - the golf images and folders.
7. **`AGENTS.md`:** `next dev` 16.4.6 creates this file in the repo on every run. It is left untracked. Commit it or add it to `.gitignore`.
8. **Older details:** a fact pass on the car park, bus and boat details in older posts.
9. **Sitemap date:** `SITE_UPDATED` in `app/sitemap.ts` is set by hand for 235 URLs. Update it after content changes.
10. **The contact page** still says "use Booking.com" (plain text, no link).

## 6. Improvements (Damian, 11 Nov: "anything extra that's needed"), ranked

| # | Item | Effort | State |
|---|---|---|---|
| 1 | The favicon and app icons were 742 KB copies of the share photo, and `favicon.ico` was the Vercel triangle. Now the site's own icon, under 5 KB | 20 min | Done `e325103` |
| 2 | 193 placeholder fell pages | days | Proposal |
| 3 | `/feed` returned 404 (proxy matcher) | 15 min | Done `bb2db1d` |
| 4 | OS Maps link 404 on every fell page | 10 min | Done `3c48437` |
| 5 | The sitemap listed noindex pages and dated every URL "now" | 15 min | Done `bb2db1d` |
| 6 | No share image on posts | 10 min | Done `bb2db1d` |
| 7 | Fell pages link to their posts; "Other Fells" by area | 25 min | Done `3c48437` |
| 8 | Skip link, menu state, search label, footer contrast (about 3:1 raised to 7:1), `en-GB` | 20 min | Done `e2fb655` |
| 9 | Duplicate difficulty pill | 5 min | Done |
| 10 | Real photos | needs photos | Proposal |
| 11 | Network cross-links | half a day | Proposal |
| 12 | Fell log table | small redesign | Proposal |
| 13 | Itinerary links and costs | half a day | Proposal |
| 14 | Dead code | 10 min | Left (needs `package.json`) |
| 15 | Two LinkedIn links cannot be checked (bot block); every other external link returns 200 | | Left |
| 16 | Layout at 1440, 1024, 768 and 390 | | Checked: no faults after N2 |

Screenshots: `improve-*` at all four widths.

## 7. Dependency upgrade (`07bf8fa`)

The GitHub "NPM audit" check failed on every push. `npm audit --omit=dev` showed 1 critical and 19 high; it now shows **0 critical and 0 high**.

| Package | Before | After |
|---|---|---|
| next | 16.1.6 | 16.4.6 |
| eslint-config-next | 16.1.6 | 16.4.6 |
| prisma, @prisma/client, @prisma/adapter-neon | 7.4.2 | 7.10.1 |
| next-intl | 4.8.3 | 4.15.0 |
| @tailwindcss/typography | 0.5.19 | 0.5.20 |

- **Transitive packages:** sharp, postcss, source-map-js, lodash and others moved too.
- **Major versions:** no direct dependency moved a major version.
- **Left:** two moderate advisories remain (postcss-selector-parser via @tailwindcss/typography). The only fix is a breaking downgrade with `--force`, so they are left.
- **Release notes 16.1.6 to 16.4.6** include security fixes relevant here:
  - a proxy bypass with Turbopack and a single locale;
  - an image optimisation denial of service;
  - proxy redirect cache poisoning.

  None needed a code change. The `/feed` exclusion, the `NEXT_LOCALE` cookie and the `/en` redirect behave as before.
- **Checks:** `next build` passes from a clean `.next`, and the Turbopack dev crash is gone.

## 8. Visit counts and the database note

- **The new count table.** `PageCount` (path text, day date, count integer default 0, primary key path and day) is created by `prisma/sql/2026-11-page-count.sql`.
  - A beacon in the layout posts to `/api/count`.
  - It counts only in production (`VERCEL_ENV`), only same-origin, non-bot requests, and only for known paths.
  - The insert is awaited, and nothing about the visitor is stored.
  - `proxy.ts` no longer writes.
- **Swapped database settings** (found 11 Nov 2026). Until 19:04 UTC that day, this repo's `.env.local` pointed at The Lakes Wildlife's database, and The Lakes Wildlife's pointed at this site's. The coordinating session swapped them back.
  - So the `PageCount` table this repo's agent created went into The Lakes Wildlife's database (`ep-rapid-flower`).
  - The Lakes Wildlife agent's table went into this site's production database (`ep-autumn-unit`).
  - Both production databases now hold `PageCount`, read back and empty, so counting works on both sites once deployed.
  - The check after the push is a read-only row count.
- **The old page-view log.** Hike's production did log page views: `PageView` on `ep-autumn-unit` holds 2,165 rows from 11 Mar to 11 Nov 2026 (path, referrer domain, device).
  - The switch to `PageCount` was made on a wrong premise ("production never wrote").
  - It is kept for the right reason: Damian's rule stores no referrer or device.
  - The old rows stay as they are, unread.
  - `app/api/p` is deleted; the `PageView` table is untouched.
- **Traffic, for stage 3** (`PageView`, rows per month):

| Apr | May | Jun | Jul | Aug | Sep | Oct | 1 to 11 Nov |
|---|---|---|---|---|---|---|---|
| 77 | 343 | 54 | 409 | 149 | 526 | 445 | 103 |

  In the last 30 days, 91% of rows were desktop, 237 were referred by the site itself, and 22 came from search engines. Much of it looks like crawlers, so human visits are probably in the low hundreds a month.

## 9. Privacy and terms (the last two commits, held for Damian)

**Privacy page:**

| Before | After |
|---|---|
| "Last updated: February 2026" | "Last updated: November 2026" |
| The Plausible and Clarity sentence | "Ahrefs Web Analytics: page view statistics without cookies. It records the page, referrer, browser, device, language, screen size and approximate location (city level), and counts visitors with a daily pseudonymous identifier that is not kept across days." |
| (none) | "Our own page count: … stores the page address, the date and the number, and nothing about you." |
| (none) | A new Cookies section: "The site may set one cookie, NEXT_LOCALE, …, deleted when you close your browser." |
| (none) | A new Contact form section: "If you use our contact form, we receive your name, email address and message by email, sent through our email provider Resend, and use them only to reply to you." |

**Privacy and terms:** the affiliate sections are removed.

## 10. Advertising today (for stage 3)

- There is no advertise page, no advert slot, no price and no featured card.
- **Footer**, on every page: "Accommodation or activity provider? Partner with the Lakes Network", linking to the contact form.
- **Contact page:** "Featured listings… can enquire about featured placement". The form offers the enquiry types "Featured listing" and "Advertising". Nothing on the site delivers either yet.

## 11. Keeping it fresh

**Rhythm:**
- two sourced posts a month;
- a quarterly check of the conditions notes, the accommodation page and car park notes;
- update the Weatherline post each December.

**The next six posts:**

| Post | Search term |
|---|---|
| Wild camping rules | "wild camping Lake District" |
| Miles without Stiles | "accessible walks Lake District" |
| Registering as a Wainwright completer | "Wainwright completers register" |
| Dogs on the fells and the Countryside Code | "walking with dogs Lake District" |
| Fix the Fells | "Fix the Fells" |
| Fell walks by bus | "Lake District walks by bus" |

## 12. Checks run

- **tsc:** 0 errors (baseline 0).
- **eslint:** 0 errors and 19 warnings (baseline 0 and 22).
- **`next build`:** passes.
- **Tests:** `npm run test:contact` passes 10/10; `node --test tests/*.test.mjs` passes 19/19.
- **Em dashes:** none in customer-facing strings in changed files.
- **Dev server:** run on 3113 with `DATABASE_URL` empty; Ahrefs was blocked and `/api/count` stubbed in Playwright.
- **Screenshots:** at 1440, 1024, 768 and 390, checked as tiles, with no overflow.
