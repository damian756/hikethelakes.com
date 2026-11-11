// ── Advertising spaces on Hike The Lakes ─────────────────────────────────────
// Every advert space on the site, keyed by a stable id. The id appears in the
// "advertise here" link (/advertise?space=<id>#<option>), so do not rename one
// once it is live. The words on the advertise page and on the cards are in
// messages/en.json (advertisePage, adSlot).
//
// To put an advert live (after the invoice is paid): set `sponsor` on the slot.
//   sponsor: {
//     name: 'Business name',
//     url: 'https://their-site.example',
//     text: 'Up to 30 words about them.',
//     image: '/images/their-photo.jpg',  // optional, a file under /public
//     until: '2027-03-31',               // optional, last day shown (UK date)
//   }
// Set it back to null when the booking ends. A sponsor whose `until` date has
// passed shows as the empty "advertise here" card on its own.
//
// Rules (Damian, 11 Nov 2026): at most one advert on any page; every advert is
// labelled on the card; paid links carry rel="sponsored noopener". Area partners
// are accommodation, food, outdoor shops or guiding, never another walking
// website. No adverts on the privacy, terms, contact, advertise or 404 pages,
// on the accommodation page or itineraries (they name businesses), on posts
// that name businesses or brands, or on safety posts (mountain rescue, the
// forecast guide). No imports here, so tests/ads.test.mjs can load this file.

export type Sponsor = {
  name: string;
  url: string;
  /** Up to 30 words. */
  text: string;
  /** Optional image path under /public, e.g. '/images/sponsor.jpg'. */
  image?: string;
  /** Optional last day the advert shows, 'YYYY-MM-DD' (UK date). */
  until?: string;
};

/** Option ids, in the order the advertise page shows them (copy: en.json advertisePage.options). */
export const AD_OPTION_IDS = [
  'area-partner',
  'conditions-sponsor',
  'home-card',
  'sponsored-article',
  'winter-package',
  'network-bundle',
] as const;

export type AdOptionId = (typeof AD_OPTION_IDS)[number];

type SlotKind = 'home' | 'area' | 'page' | 'post';

export type AdSlotDef = {
  id: string;
  kind: SlotKind;
  option: AdOptionId;
  /** Names the space, e.g. 'Partner for the Southern Fells'. */
  title: string;
  sponsor: Sponsor | null;
};

const BOOKS = [
  'The Eastern Fells',
  'The Far Eastern Fells',
  'The Central Fells',
  'The Southern Fells',
  'The Northern Fells',
  'The North Western Fells',
  'The Western Fells',
];

const SLOT_LIST: AdSlotDef[] = [
  // Home page: after the featured fells.
  { id: 'home-card', kind: 'home', option: 'home-card', title: 'Home page card', sponsor: null },

  // Fell pages: one partner per Wainwright book, on every fell page in that book.
  ...BOOKS.map((book, i): AdSlotDef => ({
    id: `area-${i + 1}`,
    kind: 'area',
    option: 'area-partner',
    title: `Partner for ${book.replace(/^The /, 'the ')}`,
    sponsor: null,
  })),

  // The Fell Conditions page.
  { id: 'conditions', kind: 'page', option: 'conditions-sponsor', title: 'Sponsor of the Fell Conditions page', sponsor: null },

  // End of post. Allowed only on route, season and planning posts that name no
  // business or brand, never on safety posts. The approved menu prices one post
  // card: the Helvellyn fell top report post, sold in the winter fells package.
  // Other route and planning posts get a card once Damian prices that space.
  {
    id: 'post-helvellyn-fell-top-report-weatherline',
    kind: 'post',
    option: 'winter-package',
    title: 'Sponsor of the Helvellyn fell top report post',
    sponsor: null,
  },
];

export const AD_SLOTS: Record<string, AdSlotDef> = Object.fromEntries(SLOT_LIST.map((s) => [s.id, s]));

/** Today's date in the UK as 'YYYY-MM-DD'. */
function ukToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

/** The slot's sponsor if one is set and its `until` date has not passed. */
export function activeSponsor(slot: AdSlotDef): Sponsor | null {
  const s = slot.sponsor;
  if (!s) return null;
  if (s.until && s.until < ukToday()) return null;
  return s;
}

/** Link from an empty card to the advertise page, naming the space. */
export function advertiseHref(slot: AdSlotDef): string {
  return `/advertise?space=${encodeURIComponent(slot.id)}#${slot.option}`;
}

/**
 * What a `space` value from a URL refers to: a slot title. Only known ids are
 * accepted, so nothing typed into a URL is echoed back.
 */
export function describeSpace(space: string | undefined | null): string | null {
  if (!space) return null;
  return AD_SLOTS[space]?.title ?? null;
}
