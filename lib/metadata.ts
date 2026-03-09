import { locales } from '@/i18n/routing';

const BASE_URL = 'https://www.hikethelakes.com';

export { BASE_URL };

export function buildAlternates(pagePath: string) {
  const path = pagePath === '/' ? '' : pagePath;
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
  return {
    canonical: `${BASE_URL}${path}`,
    languages,
  };
}
