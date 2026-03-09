import type { MetadataRoute } from 'next';
import { FELLS } from '@/lib/fells';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blog';
import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.hikethelakes.com';

const STATIC_PAGES = [
  '',
  '/fells',
  '/itineraries',
  '/conditions',
  '/fell-log',
  '/accommodation',
  '/contact',
  '/privacy',
  '/terms',
];

const FELL_PAGES = FELLS.map((f) => `/fells/${f.slug}`);

const ALL_PAGES = [...STATIC_PAGES, ...FELL_PAGES];

function buildLanguages(page: string): Record<string, string> {
  const path = page || '';
  const languages: Record<string, string> = {
    'en': `${BASE_URL}${path}`,
    'en-US': `${BASE_URL}${path}`,
    'en-AU': `${BASE_URL}${path}`,
    'en-GB': `${BASE_URL}${path}`,
    'x-default': `${BASE_URL}${path}`,
  };
  for (const locale of locales) {
    if (locale !== 'en') {
      languages[locale] = `${BASE_URL}/${locale}${path}`;
    }
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();

  for (const page of ALL_PAGES) {
    const isHome = page === '';
    const isConditions = page === '/conditions';

    const priority = isHome ? 1.0 : isConditions ? 0.8 : page.startsWith('/fells/') ? 0.85 : 0.7;
    const changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = isConditions ? 'daily' : isHome ? 'weekly' : 'monthly';
    const languages = buildLanguages(page);

    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    });
  }

  // ── Blog (English only — no locale alternates) ───────────────
  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  });

  for (const cat of BLOG_CATEGORIES) {
    entries.push({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
