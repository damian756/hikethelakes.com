// Facts about where each fell sits, worked out from its OS grid reference.
// Used by the fell pages so the 193 fells without a written route guide still
// say something true and useful: their Wainwright book, the nearest fells in
// the same group, the nearest town with a guide on The Lakes Guide, and any
// Lakes Wildlife page about the same water or valley.
// Distances are straight lines between grid positions, rounded to 0.1 km.

import type { Fell } from './fells';

/** OS grid reference ("NY 215 072") to easting and northing in metres (centre of the square). */
export function gridToEN(ref: string): { e: number; n: number } {
  const g = ref.replace(/\s+/g, '').toUpperCase();
  let l1 = g.charCodeAt(0) - 65;
  let l2 = g.charCodeAt(1) - 65;
  if (l1 > 7) l1 -= 1;
  if (l2 > 7) l2 -= 1;
  const e100 = ((l1 - 2) % 5) * 5 + (l2 % 5);
  const n100 = 19 - Math.floor(l1 / 5) * 5 - Math.floor(l2 / 5);
  const digits = g.slice(2);
  const half = digits.length / 2;
  const scale = 10 ** (5 - half);
  return {
    e: e100 * 100000 + Number(digits.slice(0, half)) * scale + scale / 2,
    n: n100 * 100000 + Number(digits.slice(half)) * scale + scale / 2,
  };
}

function km(a: { e: number; n: number }, b: { e: number; n: number }): number {
  return Math.round(Math.hypot(a.e - b.e, a.n - b.n) / 100) / 10;
}

const BOOK_NUMBERS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

/** "Book Four: The Southern Fells" (Wainwright's Pictorial Guides). */
export function bookLabel(fell: Fell): string {
  return `Book ${BOOK_NUMBERS[fell.wainwrightBook - 1]}: ${fell.wainwrightVolume}`;
}

/** The nearest fells in the same Wainwright book, by straight-line distance. */
export function nearestFellsInGroup(fell: Fell, all: Fell[], count = 6): { fell: Fell; km: number }[] {
  const here = gridToEN(fell.osGridRef);
  return all
    .filter((f) => f.slug !== fell.slug && f.area === fell.area)
    .map((f) => ({ fell: f, km: km(here, gridToEN(f.osGridRef)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

// Towns with a page on The Lakes Guide (sitemap checked 11 Nov 2026; each URL returned 200).
// Positions: Ordnance Survey Open Names via postcodes.io /places, 11 Nov 2026.
const LAKES_GUIDE_TOWNS = [
  { name: 'Keswick', url: 'https://www.thelakesguide.co.uk/keswick', e: 326545, n: 523526 },
  { name: 'Ambleside', url: 'https://www.thelakesguide.co.uk/ambleside', e: 337621, n: 504558 },
  { name: 'Grasmere', url: 'https://www.thelakesguide.co.uk/grasmere', e: 333645, n: 507578 },
  { name: 'Coniston', url: 'https://www.thelakesguide.co.uk/coniston', e: 330204, n: 497624 },
  { name: 'Windermere', url: 'https://www.thelakesguide.co.uk/windermere', e: 341225, n: 498623 },
] as const;

/** Only towns this close count as the fell's base. */
const TOWN_MAX_KM = 8;

export function nearestGuideTown(fell: Fell): { name: string; url: string; km: number } | null {
  const here = gridToEN(fell.osGridRef);
  const best = LAKES_GUIDE_TOWNS.map((t) => ({ name: t.name, url: t.url, km: km(here, t) })).sort((a, b) => a.km - b.km)[0];
  return best.km <= TOWN_MAX_KM ? best : null;
}

// Lakes Wildlife reserve pages (sitemap checked 11 Nov 2026; URL returned 200).
// A fell is related when the page names it, or when it stands within 3 km of a
// place the page gives as a way in. Ullswater's page names Helvellyn and the
// High Street range, and gives Glenridding (CA11 0PD), Pooley Bridge (CA10 2NQ)
// and Howtown. Positions: postcodes.io (postcodes) and OS Open Names (Howtown).
// Haweswater, Grizedale, Foulshaw Moss and Leighton Moss have no fell within 3 km
// of the access points their pages give, so no fell links to them.
const WILDLIFE_PAGES = [
  {
    title: 'Ullswater wildlife: red deer, goldeneye and Martindale',
    url: 'https://www.thelakeswildlife.co.uk/nature/ullswater',
    named: ['helvellyn', 'high-street'],
    points: [
      { e: 338558, n: 516985 }, // Glenridding, CA11 0PD
      { e: 347528, n: 524333 }, // Pooley Bridge, CA10 2NQ
      { e: 344331, n: 519731 }, // Howtown
    ],
  },
] as const;

const WILDLIFE_MAX_KM = 3;

export function relatedWildlifePages(fell: Fell): { title: string; url: string }[] {
  const here = gridToEN(fell.osGridRef);
  return WILDLIFE_PAGES.filter(
    (p) =>
      (p.named as readonly string[]).includes(fell.slug) ||
      p.points.some((pt) => km(here, pt) <= WILDLIFE_MAX_KM),
  ).map((p) => ({ title: p.title, url: p.url }));
}
