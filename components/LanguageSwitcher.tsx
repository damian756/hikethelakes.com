'use client';

import { usePathname } from 'next/navigation';
import { FLAGS } from './flags';

const LANGUAGES: [string, string][] = [
  ['EN', 'en'],
  ['DE', 'de'],
  ['JA', 'ja'],
  ['FR', 'fr'],
  ['ES', 'es'],
  ['NL', 'nl'],
  ['SV', 'sv'],
  ['DA', 'da'],
  ['NO', 'no'],
  ['FI', 'fi'],
  ['KO', 'ko'],
  ['ZH', 'zh'],
  ['PT', 'pt'],
  ['IT', 'it'],
  ['PL', 'pl'],
  ['CA', 'ca'],
  ['CY', 'cy'],
  ['AR', 'ar'],
];

const NON_EN_LOCALES = new Set<string>(LANGUAGES.filter(([, c]) => c !== 'en').map(([, c]) => c));

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = NON_EN_LOCALES.has(segments[0]) ? segments[0] : 'en';
  const pagePath = currentLocale === 'en' ? pathname : '/' + segments.slice(1).join('/') || '/';

  function buildHref(locale: string) {
    if (locale === 'en') return pagePath || '/';
    const targetPath = pagePath.startsWith('/blog') ? '/' : pagePath;
    return `/${locale}${targetPath === '/' ? '' : targetPath}`;
  }

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {LANGUAGES.map(([label, locale]) => {
        const FlagComponent = FLAGS[locale];
        return (
          <a
            key={locale}
            href={buildHref(locale)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded transition ${
              locale === currentLocale
                ? 'bg-[#B8912A]/40 text-white font-semibold'
                : 'bg-white/10 text-white/60 hover:bg-[#B8912A]/30 hover:text-white'
            }`}
          >
            {FlagComponent && <FlagComponent />}
            {label}
          </a>
        );
      })}
    </div>
  );
}
