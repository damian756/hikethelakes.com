import { defineRouting } from 'next-intl/routing';

// English only. Non-English routes 404. No hreflang tags.
export const locales = ['en'] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // URL is the sole authority on locale — no cookie persistence, no Accept-Language redirects.
  // Users navigate to /de/, /ja/ etc. explicitly via the language switcher.
  localeDetection: false,
});
