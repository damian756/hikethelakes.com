import type { MetadataRoute } from 'next';
import { FELLS } from '@/lib/fells';
import { WALKING_ITINERARIES } from '@/lib/walking-itineraries';
import { BLOG_POSTS, BLOG_CATEGORIES, getModifiedIsoDate, type BlogPost } from '@/lib/blog';
import { pageUrl } from '@/lib/metadata';

// English only (i18n/routing.ts): one URL per page and no hreflang alternates.
// /privacy and /terms are noindex, so they are not listed.

// lastmod is the day a page's own content last changed, never the build time.
//  - Posts: their own `updated` or `date` (lib/blog.ts). The blog index and each
//    category take their newest post's date.
//  - Every other page last changed in the Nov 2026 freshen-up. The dates are from
//    `git log -1 --format=%cs -- <page file and its data>`, read on 11 Nov 2026.
//    When you change one of these pages' content, set its date here.
const PAGE_UPDATED: Record<string, string> = {
  '/': '2026-11-11', // Catbells hero, home ad card (ae69f7b, 212a7e5)
  '/fells': '2026-11-11', // Wainwright books and grid references (47ee206, 4db6adc)
  '/itineraries': '2026-11-11', // day-by-day fell links, no costs (d275dfe, 4db6adc)
  '/conditions': '2026-11-11', // honest conditions page, sponsor space (ff84631, 212a7e5)
  '/fell-log': '2026-11-11', // one sortable table (a3d2aae)
  '/accommodation': '2026-11-11', // named places from their own sites (ff84631, d275dfe)
  '/contact': '2026-11-11', // contact form, advertising line (566a62e, 9d40d8d)
  '/advertise': '2026-11-11', // new page (212a7e5)
};
// Every fell page: About sections, books, grid references (799e7e8, 47ee206, 4db6adc).
const FELL_PAGES_UPDATED = '2026-11-11';
// Every walking circuit: day-by-day fell links, cost estimates removed (d275dfe).
const ITINERARIES_UPDATED = '2026-11-11';

const newest = (posts: BlogPost[]) => posts.map(getModifiedIsoDate).sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const [page, lastModified] of Object.entries(PAGE_UPDATED)) {
    const isHome = page === '/';
    const isConditions = page === '/conditions';
    entries.push({
      url: pageUrl(page),
      lastModified,
      changeFrequency: isConditions ? 'daily' : isHome ? 'weekly' : 'monthly',
      priority: isHome ? 1.0 : isConditions ? 0.8 : 0.7,
    });
  }

  for (const fell of FELLS) {
    entries.push({
      url: pageUrl(`/fells/${fell.slug}`),
      lastModified: FELL_PAGES_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  }

  for (const it of WALKING_ITINERARIES) {
    entries.push({
      url: pageUrl(`/itineraries/${it.id}`),
      lastModified: ITINERARIES_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // ── Blog ───────────────
  entries.push({
    url: pageUrl('/blog'),
    lastModified: newest(BLOG_POSTS),
    changeFrequency: 'weekly',
    priority: 0.75,
  });

  for (const cat of BLOG_CATEGORIES) {
    entries.push({
      url: pageUrl(`/blog/category/${cat.slug}`),
      lastModified: newest(BLOG_POSTS.filter((p) => p.categorySlug === cat.slug)),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const post of BLOG_POSTS) {
    entries.push({
      url: pageUrl(`/blog/${post.slug}`),
      lastModified: getModifiedIsoDate(post),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
