import { defineRouting } from 'next-intl/routing';

// en-US, en-AU, en-GB all resolve to default 'en' locale (no URL prefix).
// This keeps all English domain authority consolidated at the root.
export const locales = [
  'en', 'de', 'ja',
  'sv', 'no', 'nl', 'ko',
  'fr', 'es', 'da', 'fi', 'pl', 'zh',
  'pt', 'it', 'ca', 'ar', 'cy',
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // URL is the sole authority on locale — no cookie persistence, no Accept-Language redirects.
  // Users navigate to /de/, /ja/ etc. explicitly via the language switcher.
  localeDetection: false,
});
