// Advertising rules (stage B, Damian 11 Nov 2026). Static reads only: no route is called.
// Run: node --test tests/ads.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { AD_SLOTS, AD_OPTION_IDS } from "../lib/ad-slots.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const en = JSON.parse(read("messages/en.json"));
const page = read("app/[locale]/advertise/page.tsx");
const slots = Object.values(AD_SLOTS);

const FOUNDING =
  "For the first ten advertisers across the Lakes network sites: half price for your first three months, and your monthly price held for twelve months.";

test("every slot's sponsor is null at commit", () => {
  for (const s of slots) assert.equal(s.sponsor, null, s.id);
});

test("every option a slot names exists on the advertise page", () => {
  const options = en.advertisePage.options;
  assert.deepEqual(Object.keys(options), [...AD_OPTION_IDS], "en.json options match AD_OPTION_IDS, in order");
  assert.match(page, /AD_OPTION_IDS\.map\(/, "the page renders every option");
  assert.match(page, /id=\{id\}/, "each option card carries its id as the anchor");
  for (const s of slots) assert.ok(AD_OPTION_IDS.includes(s.option), `${s.id} -> ${s.option}`);
});

test("the spaces are the approved ones: home card, seven areas, conditions, one post", () => {
  const ids = slots.map((s) => s.id).sort();
  assert.deepEqual(ids, [
    "area-1", "area-2", "area-3", "area-4", "area-5", "area-6", "area-7",
    "conditions", "home-card", "post-helvellyn-fell-top-report-weatherline",
  ]);
});

test("no slot on a page from the no-advert list, and at most one per page", () => {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) walk(p);
      else if (name.endsWith(".tsx")) files.push(p.split("\\").join("/"));
    }
  };
  walk("app");
  const placed = files.filter((f) => read(f).includes("<AdSlot"));
  assert.deepEqual(placed.sort(), [
    "app/[locale]/blog/[slug]/page.tsx",
    "app/[locale]/conditions/page.tsx",
    "app/[locale]/fells/[slug]/page.tsx",
    "app/[locale]/page.tsx",
  ]);
  for (const f of placed) assert.equal((read(f).match(/<AdSlot\b/g) ?? []).length, 1, `one slot in ${f}`);
  for (const f of [
    "app/[locale]/privacy/page.tsx", "app/[locale]/terms/page.tsx", "app/[locale]/contact/page.tsx",
    "app/[locale]/advertise/page.tsx", "app/[locale]/not-found.tsx", "app/[locale]/accommodation/page.tsx",
    "app/[locale]/itineraries/page.tsx", "app/[locale]/itineraries/[slug]/page.tsx",
  ]) {
    assert.ok(!read(f).includes("AdSlot"), `no advert on ${f}`);
  }
  // Safety posts and posts that name businesses or brands never get a post slot.
  for (const slug of [
    "how-to-call-mountain-rescue-lake-district", "reading-the-fell-forecast-mwis-guide",
    "winter-fell-walking-lake-district", "fell-kit-list-what-actually-works",
    "where-to-stay-fell-walking-keswick-ambleside-wasdale", "scafell-pike-wasdale-honest-account",
    "tarn-fishing-lake-district",
  ]) {
    assert.equal(AD_SLOTS[`post-${slug}`], undefined, slug);
  }
  // A sponsored article shows no other advert and no author box.
  const post = read("app/[locale]/blog/[slug]/page.tsx");
  assert.match(post, /\{!post\.sponsoredBy && <AdSlot /);
  assert.match(post, /Sponsored by/);
});

test("no traffic or audience claims in the advertising copy", () => {
  const copy = JSON.stringify([en.advertisePage, en.adSlot, slots.map((s) => s.title)]);
  assert.doesNotMatch(copy, /\d[\d,.]*\s*(k\s*)?(visitors|visits|views|readers|users)/i);
  assert.doesNotMatch(copy, /\b(growing|popular|high-intent|affluent)\b/i);
});

test("every advert price says plus VAT, and the founding offer is word for word", () => {
  for (const [id, o] of Object.entries(en.advertisePage.options)) {
    assert.match(o.price, /^£\d+$/, id);
    assert.match(o.per, /plus VAT/, `${id} per`);
    assert.match(o.fromLine, /plus VAT/, `${id} fromLine`);
    for (const pt of o.points) if (/£\d/.test(pt)) assert.match(pt, /plus VAT/, `${id}: ${pt}`);
  }
  const strings = JSON.stringify(en.advertisePage).match(/"[^"]*£\d[^"]*"/g) ?? [];
  for (const s of strings) {
    if (/^"£\d+"$/.test(s)) continue; // the headline figure, shown beside its "plus VAT" line
    assert.match(s, /plus VAT/, s);
  }
  assert.equal(en.advertisePage.foundingText, FOUNDING);
  assert.doesNotMatch(JSON.stringify(en.advertisePage), /places? left|remaining/i);
});

test("paid links are labelled and marked sponsored; enquiries go to the contact form", () => {
  const card = read("components/AdSlot.tsx");
  assert.match(card, /rel="sponsored noopener"/);
  assert.match(card, /target="_blank"/);
  assert.match(card, /labelAdvert/);
  assert.match(card, /labelSponsor/);
  assert.match(page, /href="\/contact"/);
  assert.doesNotMatch(JSON.stringify(en.advertisePage) + page, /@[a-z0-9-]+\.[a-z]/i, "no email address");
  assert.match(read("app/[locale]/layout.tsx"), /\/advertise`/, "the footer partner line links to /advertise");
});
