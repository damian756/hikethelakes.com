# Hike The Lakes: November 2026 report

Internal report. The work was done on 11 Nov 2026 on `main`. Screenshots are in `docs/freshen-2026-11/screens/` and the sources in `docs/freshen-2026-11/sources/`, all fetched on 11 Nov 2026. The playbook is `C:\Projects\lakes-guide\docs\GUIDE-SITES-PLAYBOOK-2026-11.md` (section 9 covers the Lakes sites).

**Standing rule (Damian, 11 Nov 2026): traffic first.** In his words: "their only goal is to drive traffic, we dont need to focus much on conversion, but just raw numbers. Having high traffic is what will sell the advert space locally". Every choice is judged by visits from search: pages that can rank stay indexable and in the sitemap; titles and descriptions say the fell or place and what the page answers; a live title's main phrase is never traded for a tidier one; anything that blocks crawling or indexing is fixed; related pages link to each other, across the three sites where useful; pages stay fast; no conversion work beyond stage B. Section 17 ranks what to do next.

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

**This report (first version):** `7e59e98`, pushed with everything above.

**Approved follow-ups (section 13):**
- `09a1fac`: `AGENTS.md` committed.
- `d6c5cb7`: contact page says "contact properties directly", not Booking.com.
- `799e7e8`: every fell page says what the site knows; Lakes Network links.
- `d275dfe`: itineraries link each day to its fells; cost estimates removed.
- `a3d2aae`: the fell log as one sortable table.
- `4918e1c`: screenshots and sources.

**Third-pass fixes, hero and advertising:**
- `4db6adc`: third-pass review fixes (A1 to A6).
- `ae69f7b`: the Catbells home hero (section 14).
- `212a7e5`: advertising, stage B (section 10).
- `f477fc4`: advertising screenshots.
- `9d40d8d`: fourth-pass fixes: the contact page offers advertising, not featured listings.
- This report, updated.

**Privacy and terms, last** (approved by Damian, "go with your suggestions"): "Privacy and terms: say what the site loads; no affiliate sections", "Privacy: contact form line; NEXT_LOCALE 'may' be set", and "Privacy: fuller Ahrefs Web Analytics sentence". Every sentence on the privacy page is true of the code in the same push.

**Server region:** `56d843b`, `vercel.json` regions `lhr1`.

**SEO pass (section 16)**, on top of `56d843b`; none needs to go before the privacy commits:
- `0db93b9`: one canonical per page; og:url and share tags match it; no hreflang.
- `5727580`: titles and descriptions.
- `88839c3`: schema.
- `8a9437d`: sitemap lastmod.
- This report: sections 16 and 17, and the traffic rule above.

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

### Third pass (`7e59e98..4918e1c`)
Nothing blocking. The fell-page text matched on 7 sampled pages; all 214 grid references are within 300 m and the heights within 2 m of the reference table; the six network link targets return 200; the fell log table has working sort buttons and fits at 390.

| # | Severity | Finding | Done (`4db6adc`) |
|---|---|---|---|
| A1 | Should | "Where to stay and eat in {town}" on 46 fell pages promised more than The Lakes Guide's pages give | "{town} on The Lakes Guide" |
| A2 | Note | Grasmere and Coniston are villages, not towns | "nearest town or village with a page on The Lakes Guide" |
| A3 | Note | The four-day standard itinerary listed Old Dungeon Ghyll though its text names other bases | Link removed |
| A4 | Note | "£ Value / ££ Standard / £££ Premium" labels with no costs behind them | Labels and budget filter removed |
| A5 | Note | "away" wrapped alone at 1024 | Kept on one line |
| A6 | Note | The six corrected fells kept their old latitude and longitude | Recomputed from the grid references |

### Fourth pass (`4918e1c..f477fc4`)
Nothing must be fixed. The six third-pass items are fixed (the recomputed coordinates are 1 to 6 m from their grid references). The hero matches the Commons original in size and SHA-1, the credit reads exactly as agreed, and the hero is lighter at every width. The advertising matches the approved menu, with "plus VAT" on every price, the founding offer word for word, no audience claims, at most one space per page, none on the no-advert pages, and every sponsor `null`. tsc 0; `test:contact` 10/10; `tests/*.test.mjs` 26/26.

| Finding | Done |
|---|---|
| Should: `until` might only take effect at the next deploy if the pages were prebuilt | Checked: `next build` lists every page with a space as rendered on request, so an expired advert drops off the next day without a redeploy. The comment in `lib/ad-slots.ts` now says so, and says to add a `revalidate` if a page is ever made static (`9d40d8d`) |
| Note: the contact page still offered "featured placement", and the form a "Featured listing" type | Now "Advertising", with a link to /advertise; the "Featured listing" type is gone (`9d40d8d`, `fix-contact-*`) |
| Note: three itinerary titles keep "Standard", "Premium" and "Value" | Left: they now only name the circuits and carry no price. Damian may rename them |
| Note: the only post space is on the Helvellyn fell top report, the post the winter package sells | Left as built (Damian, through the coordinating chat) |
| Note: at 768 the nine featured fells leave Catbells alone on the last row | Left; it was there before this work |

## 5. Suggestions for Damian

Decided on 11 Nov (through the coordinating chat): no `noindex` on placeholder pages ("keep pages indexed"); network cross-links, itinerary links and the sortable fell log are done (section 13); the Catbells photo replaces the Alpine hero on the home page (section 14); `AGENTS.md` is committed; the Booking.com line is gone. The first-person passages are unchanged until Damian decides. The list below is as first written.

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

## 9. Privacy and terms (the last three commits, approved by Damian)

**Privacy page:**

| Before | After |
|---|---|
| "Last updated: February 2026" | "Last updated: November 2026" |
| The Plausible and Clarity sentence | "Ahrefs Web Analytics: page view statistics without cookies. It records the page address (including any query string), the referring page, your browser, operating system and device, screen size and language, and when a link is clicked or a form is sent. It uses your IP address to work out your approximate location (city level) and a daily visitor ID that cannot be linked across days; the IP address itself is discarded, not stored." (Damian's wording, checked against Ahrefs' help page; it replaces the shorter first version) |
| (none) | "Our own page count: … stores the page address, the date and the number, and nothing about you." |
| (none) | A new Cookies section: "The site may set one cookie, NEXT_LOCALE, …, deleted when you close your browser." |
| (none) | A new Contact form section: "If you use our contact form, we receive your name, email address and message by email, sent through our email provider Resend, and use them only to reply to you." |

**Privacy and terms:** the affiliate sections are removed.

## 10. Advertising (stage B, approved by Damian: "Yes, go with it")

**Before:** no advertise page, no spaces and no prices; the contact page offered "featured placement" that nothing delivered.

**Now:** https://www.hikethelakes.com/advertise, every price plus VAT:

| Option | Price |
|---|---|
| Area partner (one per Wainwright area: accommodation, food, outdoor shops, guiding; never another walking website) | £35 a month, 3 months minimum |
| Conditions page sponsor | £35 a month, 3 months minimum |
| Home page card | £39 a month, 3 months minimum |
| Sponsored article | £99, one-off |
| Winter fells package (Conditions sponsor plus the Helvellyn fell top report post) | £99, December to March |
| Lakes network bundle | £99 a month, 3 months minimum |

The page also carries the founding offer word for word ("For the first ten advertisers across the Lakes network sites: half price for your first three months, and your monthly price held for twelve months."), How it works (contact form, invoice, live once paid) and Where adverts never appear. No traffic or audience figures anywhere. `?space=<id>` names the space asked about; unknown values are not echoed.

**Spaces** (at most one per page, all empty today, each linking to `/advertise?space=<id>#<option>`):
- home card, after the featured fells;
- one area partner card per Wainwright book, on every fell page in that book;
- the /conditions sponsor;
- one post space, on the Helvellyn fell top report post only.

**No adverts on:** privacy, terms, contact, advertise, the 404, accommodation, itineraries, the mountain rescue post, the forecast guide, the tarn fishing post, or posts that name businesses or brands.

**To put an advert live** (after the invoice is paid): set `sponsor` on the slot in `lib/ad-slots.ts` (name, url, up to 30 words, optional image and `until` date) and deploy. Filled cards are labelled Advertisement (home) or Sponsor, and links carry `rel="sponsored noopener"`. A sponsored article's byline is "Sponsored by X" with no author box. `tests/ads.test.mjs` (7 tests) fails if a sponsor is committed, a price lacks "plus VAT" or a space lands on a no-advert page.

**Links:** the footer's "Partner with the Lakes Network" goes to /advertise, and the contact page's Advertising line links there too.

**Price recheck:** look at the prices again in three months (mid-February 2027), against what has sold and how much of the founding offer has been used.

**Screenshots:** `ads-advertise-*`, `ads-empty-{home-card,area,conditions,post}-*`, `ads-filled-area-example-*` (a temporary example, set back to `null` before commit), `fix-contact-*`.

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

**Final round (`9d40d8d` and the privacy commits):**
- **tsc:** 0 errors.
- **eslint:** 0 errors on the changed files (4 warnings, all there before).
- **`next build`:** passes with `DATABASE_URL` empty; every `[locale]` page is listed as rendered on request.
- **Tests:** `npm run test:contact` 10/10; `node --test tests/*.test.mjs` 26/26 (including the 7 advertising tests).
- **Served build on 3113:** /contact, /advertise, /privacy and /fells/helvellyn return 200; the contact form offers General enquiry, Route or data correction, Advertising, Press or media.
- **Em dashes:** none in changed customer-facing strings.

**Earlier rounds:**

- **tsc:** 0 errors (baseline 0).
- **eslint:** 0 errors and 19 warnings (baseline 0 and 22).
- **`next build`:** passes.
- **Tests:** `npm run test:contact` passes 10/10; `node --test tests/*.test.mjs` passes 19/19.
- **Em dashes:** none in customer-facing strings in changed files.
- **Dev server:** run on 3113 with `DATABASE_URL` empty; Ahrefs was blocked and `/api/count` stubbed in Playwright.
- **Screenshots:** at 1440, 1024, 768 and 390, checked as tiles, with no overflow.

## 13. Approved follow-ups (11 Nov evening)

1. **Placeholder fell pages, no `noindex`** (Damian). All 193 get an About section and meta description from `lib/fells.ts`: Wainwright book and number, height, grid reference, and the three nearest fells in the same book with straight-line distances. "No guide yet" stays and nothing is invented. Heights and grid references were checked against the Database of British and Irish Hills table; six written guides had grid references 300 m to 2.9 km out (Ill Bell worst) and were corrected.
2. **Network links:** each fell page links to The Lakes Guide's nearest town or village page (Keswick, Ambleside, Grasmere, Coniston, Windermere) within 8 km, and to The Lakes Wildlife's Ullswater page for the fells it names or within 3 km of its access points. Map in `lib/fell-context.ts`.
3. **Itineraries:** "Day 1: Scafell Pike" style links to the fell pages; named places link to their accommodation cards; the per-person cost estimates are gone (no official source).
4. **Fell log:** one compact table, sortable by fell, height, grid reference, area and book, with `aria-sort` and keyboard support; Area is hidden on phones.

## 14. Home hero

`public/images/hero-catbells.webp`, 2400 x 994, 378 KB, resized from the Commons original (9835 x 4074, 11.8 MB) with no crop or colour change: "Catbells Northern Ascent, Lake District, June 2009" by David Iliff, CC BY-SA 3.0. The credit sits bottom right on the photo, "Photo by DAVID ILIFF. License: CC BY-SA 3.0", the name linked to the Commons file page and the licence to https://creativecommons.org/licenses/by-sa/3.0/ (record: `docs/freshen-2026-11/sources/hero-catbells-credit.txt`). Alt: "Walkers on the path up the grassy northern ridge of Catbells, with green fells and valleys either side under a cloudy sky". Lighter than the Alpine photo it replaces at every width (1440: 101 to 69 KB; 390: 43 to 30 KB). Screenshots `hero-catbells-home-*`. The other pages keep the Alpine hero for now; the next real, credited photos should replace it there too.

## 15. Planned work: fell guide batches (approved in principle, starts after this push)

- **Size:** 10 guides a batch, one batch a fortnight, about 3 hours a guide from official sources (route and distances from OS Maps; start and parking from the National Trust and the National Park; hazards from AdventureSmart and mountain rescue; winter notes from Weatherline). About 30 hours a batch.
- **First ten:** the most viewed placeholder pages in the old PageView log (the counts are small, so this is a starting order, not a ranking): Shipman Knotts, Sergeant's Crag, Lank Rigg, High Spy, Angletarn Pikes, Carrock Fell, Skiddaw Little Man, High Raise (High Street), Harter Fell (Eskdale), Mungrisdale Common.
- **Later batches:** ordered by Ahrefs or Search Console data once there is enough of it, the most searched first.

## 16. SEO pass (11 Nov 2026, night)

**How it was checked:** a script fetched the sitemap from a served build on 3113 (`DATABASE_URL` empty), then every URL in it plus the query-string, `/en`, other-locale and 404 variants, and recorded status, redirect, robots meta, canonical, og:url, title, description, H1 and every JSON-LD block. Live pages were read with a few GETs only.

**Found and fixed:**

| Area | Found | Now |
|---|---|---|
| Site name in titles | The layout template adds " \| Hike The Lakes", and 238 pages added it again: "Barf \| Hike The Lakes \| Hike The Lakes", every post, /fells, /fell-log, /advertise, /contact, the blog, its categories, privacy and terms | Once on every page (`5727580`) |
| Fell titles | The fell's name only | Name first (unchanged, it is the part that may rank), then what the page answers: "Scafell Pike Walk: Routes, Distance and Time" (21 guides); "Barf: Height, Grid Reference and Nearest Fells" (193) |
| Descriptions | Guide fells: the summit text cut at 160 characters mid-word. Four posts, /advertise, /conditions and /itineraries ran to 165 to 210 characters; /itineraries promised "accommodation and dining recommendations" | Guide fells list their routes with distance and time; the rest trimmed (posts through a new `metaDescription`), each true of its page |
| /advertise | "Advertise on Hike The Lakes \| Hike The Lakes" | "Lake District Advertising \| Hike The Lakes". H1, URL and canonical unchanged; the description names only what the page offers |
| Share tags | 14 pages had the home page's og:url and og:title; 238 had the home page's twitter:title; 224 (fells, circuits, blog index) had no og:image | Every page sets its own, og:url equal to its canonical (`0db93b9`, `lib/metadata.ts` `pageMetadata`) |
| 404 pages | Canonical to the home page (inherited from the layout) | No canonical |
| hreflang | en, en-US, en-AU, en-GB and x-default, all to the same URL, on 233 pages and 231 sitemap entries | None. The site serves English at one URL per page (`i18n/routing.ts` already said "No hreflang tags") |
| Privacy, terms | noindex, with a canonical to themselves | Still noindex, no canonical; wording untouched |
| Organization | sameAs listed The Lakes Guide, The Lakes Wildlife, TheLakes.network and Churchtown Media (sameAs means "the same organisation"); the logo was the share photo; posts named Churchtown Media as publisher, the home page Hike The Lakes; the home page also carried a Person with a different jobTitle from the posts' | One Organization everywhere it appears: Hike The Lakes, the 512 px icon as logo, parent Churchtown Media (`88839c3`) |
| Article dates | Walking circuits: datePublished 2024-06-01 and dateModified 2025-03-01, both invented (the repo starts on 9 Mar 2026). Posts: dateModified always equal to datePublished | Circuits 2026-03-09 and 2026-11-11 from git, author the site (no byline on the page). Posts: a new `updated` field, set to 11 Nov 2026 on the four older posts whose title or text changed tonight |
| Breadcrumbs | Shown on posts and category pages with no BreadcrumbList | Added, matching the visible trail |
| Fell schema | `elevation` on a Mountain (schema.org has it only on GeoCoordinates) | Height as additionalProperty, and in geo where coordinates are published |
| Sitemap lastmod | One hand-set date for 236 URLs | Per page: posts' own dates, the blog index and categories their newest post's, the other pages one git-read date each with the commits noted (`8a9437d`) |

**Checked and right:**
- **Advertising:** /advertise returns 200, index, follow, canonical https://www.hikethelakes.com/advertise; `?space=…` (known or unknown) keeps the clean canonical.
- **Canonicals:** all 249 sitemap URLs have exactly one canonical, absolute, on www, pointing at themselves; `/contact?type=…` keeps the clean one; `/en` and `/en/<page>` redirect (307) to the unprefixed URL; `/de/fells` and other locales 404 and are listed nowhere.
- **Schema:** every block on every page parses. WebSite and Organization are defined once, on the home page, and posts and circuits name the same Organization as publisher; Article and BreadcrumbList on 12 posts and 9 circuits; TouristAttraction and Mountain with BreadcrumbList on 214 fells; ItemList on /fells; Dataset on /fell-log. No AggregateRating, Review, LocalBusiness or SearchAction. Every site `@id` and URL is on www. The 11 fells that publish coordinates are within 60 m of their grid reference (recomputed OSGB36 to WGS84 tonight); the others publish none.
- **Titles:** no duplicate title or description across the 249 URLs (script). No em dash in any served page, head or JSON-LD. No stale "2025" or Southport leftovers: the only hits are Damian's bio, a 2025 rescue statistic and a first-person line in the tarn fishing post.
- **Sitemap and robots:** https://www.hikethelakes.com/sitemap.xml, 249 URLs (8 main pages, 214 fells, 9 circuits, the blog, 5 categories, 12 posts), every one 200 with no redirect, index, follow and a self canonical; tonight's /advertise and two posts are in. robots.txt says `Sitemap: https://www.hikethelakes.com/sitemap.xml` and blocks only /api/.

**Left for Damian:**
1. `hikethelakes.com` without www redirects with a 307 at the Vercel domain, before the app's own 308. A permanent redirect is the usual choice for search; it is a Vercel domain setting, not changed here.
2. Two live post titles run past 60 characters ("Reading the Fell Forecast: MWIS, Met Office, and What to Actually Trust", "Tarn Fishing in the Lake District: Still Water Is a Different Game"). Left: they are live and match the H1.
3. The circuit names "Two-Day Premium", "Four-Day Value" and the two "Standard" circuits are left from the removed price tiers and name no fell. Titles and URLs left as live; see section 17.
4. `og-default.jpg` is a 1.7 MB PNG with a .jpg name. Shares work; a real JPEG would be far smaller.

**Checks:** tsc 0 errors; eslint 0 errors on the changed files, the same 13 warnings as before; `next build` passes with `DATABASE_URL` empty; `npm run test:contact` 10/10; `node --test tests/*.test.mjs` 26/26; no em dash in any added line. Nothing visible on the pages changed, so no screenshots.

**To submit in Search Console:** the sitemap above. New tonight: /advertise, /blog/helvellyn-fell-top-report-weatherline, /blog/how-to-call-mountain-rescue-lake-district. Substantially changed: all 214 fell pages, all 9 circuits, /, /fells, /fell-log, /conditions, /itineraries, /accommodation, /contact, /blog, and four older posts (/blog/scafell-pike-wasdale-honest-account, /blog/how-to-start-the-wainwrights, /blog/fell-kit-list-what-actually-works, /blog/where-to-stay-fell-walking-keswick-ambleside-wasdale).

## 17. Traffic: what to do next

Ranked by likely visits gained. The only evidence is the old PageView log (section 8: 22 visits from search engines in the last 30 days; section 15: which placeholder fells were viewed most). Ahrefs and Search Console were not read, so beyond that the order is reasoning, and no visit numbers are estimated.

1. **Fell guide batches: the 193 placeholder fells.** The largest set by far. A placeholder page can now match "<fell> height" or "<fell> grid reference"; a written guide also matches "<fell> walk" and "<fell> route", which is what walkers type. Start with the ten in section 15 (Shipman Knotts, Sergeant's Crag, Lank Rigg, High Spy, Angletarn Pikes, Carrock Fell, Skiddaw Little Man, High Raise (High Street), Harter Fell (Eskdale), Mungrisdale Common). At ten a fortnight the set takes about 40 weeks. Each fell page now has its own title, so after a month Search Console impressions per page will show which names people search; order later batches by that. When a guide is written, its title becomes "<fell> Walk: Routes, Distance and Time" by itself.
2. **Search terms the site does not cover yet** (reasoning):
   - The ridge rounds walkers search by name: Fairfield Horseshoe, Kentmere Horseshoe, Coledale Horseshoe, Newlands Round. They appear in fell notes and circuits but have no page of their own.
   - The six posts in section 11: wild camping, Miles without Stiles, the completers' register, dogs on the fells, Fix the Fells, fell walks by bus.
   - Parking for the big fells ("Scafell Pike parking", "Helvellyn car park"): the guide pages hold the start points and postcodes but no section a parking search would match.
3. **Pages one edit away from ranking:**
   - /fell-log is the full list of the 214 Wainwrights, but neither its title nor its H1 says "list of Wainwrights", the phrase people search. Adding it after the live main phrase ("Lake District Fell Log") keeps what may rank.
   - The circuit titles (section 16, item 3) name no fell; putting the fells from each subtitle into the title would match searches.
   - The 21 guide pages have no photo of their fell, so they miss image search. Credited photos, as for the Catbells hero, one per guide.
   - Cross-site links: fell pages link to five Lakes Guide towns and to Lakes Wildlife's Ullswater page. Extend to Borrowdale, Wasdale, Langdale, Glenridding and Patterdale, and to more Wildlife reserves, as those pages exist on the other sites.
4. **Posts a month: two**, sourced as now, each aimed at one search term, seasonal ones a month ahead (winter topics by early December). More than two would take writing time from the fell batches, which cover more search terms per hour.
