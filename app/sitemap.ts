import type { MetadataRoute } from 'next';
import { FELLS } from '@/lib/fells';
import { WALKING_ITINERARIES } from '@/lib/walking-itineraries';
import { BLOG_POSTS, BLOG_CATEGORIES, getIsoDate } from '@/lib/blog';

const BASE_URL = 'https://www.hikethelakes.com';

const STATIC_PAGES = [
  '',
  '/fells',
  '/itineraries',
  '/conditions',
  '/fell-log',
  '/accommodation',
  '/contact',
  '/advertise',
];
// /privacy and /terms are noindex, so they are not listed.

// When the site's pages last changed (Nov 2026 freshen-up). Update when content changes.
const SITE_UPDATED = '2026-11-11';

const FELL_PAGES = FELLS.map((f) => `/fells/${f.slug}`);
const ITINERARY_PAGES = WALKING_ITINERARIES.map((it) => `/itineraries/${it.id}`);

const ALL_PAGES = [...STATIC_PAGES, ...FELL_PAGES, ...ITINERARY_PAGES];

// English only (i18n/routing.ts): no hreflang alternates.

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const newestPost = BLOG_POSTS.map(getIsoDate).sort().at(-1) ?? SITE_UPDATED;

  for (const page of ALL_PAGES) {
    const isHome = page === '';
    const isConditions = page === '/conditions';

    const priority = isHome ? 1.0 : isConditions ? 0.8 : page.startsWith('/fells/') ? 0.85 : 0.7;
    const changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = isConditions ? 'daily' : isHome ? 'weekly' : 'monthly';

    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: SITE_UPDATED,
      changeFrequency,
      priority,
    });
  }

  // ── Blog ───────────────
  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: newestPost,
    changeFrequency: 'weekly',
    priority: 0.75,
  });

  for (const cat of BLOG_CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      lastModified:
        BLOG_POSTS.filter((p) => p.categorySlug === cat.slug).map(getIsoDate).sort().at(-1) ?? SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: getIsoDate(post),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
