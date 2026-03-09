'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FLAGS } from './flags';

const LANGUAGES: [string, string][] = [
  ['English', 'en'],
  ['Deutsch', 'de'],
  ['Français', 'fr'],
  ['Español', 'es'],
  ['Italiano', 'it'],
  ['Português', 'pt'],
  ['Nederlands', 'nl'],
  ['Svenska', 'sv'],
  ['Dansk', 'da'],
  ['Norsk', 'no'],
  ['Suomi', 'fi'],
  ['Polski', 'pl'],
  ['日本語', 'ja'],
  ['한국어', 'ko'],
  ['中文', 'zh'],
  ['العربية', 'ar'],
  ['Cymraeg', 'cy'],
  ['Català', 'ca'],
];

const NON_EN_LOCALES = new Set(LANGUAGES.filter(([, c]) => c !== 'en').map(([, c]) => c));

function useCurrentLocaleAndPath() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = NON_EN_LOCALES.has(segments[0]) ? segments[0] : 'en';
  const pagePath = currentLocale === 'en' ? pathname : '/' + segments.slice(1).join('/') || '/';
  return { currentLocale, pagePath };
}

function buildHref(locale: string, pagePath: string) {
  if (locale === 'en') return pagePath || '/';
  const targetPath = pagePath.startsWith('/blog') ? '/' : pagePath;
  return `/${locale}${targetPath === '/' ? '' : targetPath}`;
}

function Flag({ code }: { code: string }) {
  const Component = FLAGS[code];
  return Component ? <Component /> : null;
}

export default function NavMenu({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');

  const { currentLocale, pagePath } = useCurrentLocaleAndPath();

  const prefix = locale === 'en' ? '' : `/${locale}`;

  const links = [
    { label: t('fells'), href: `${prefix}/fells` },
    { label: t('fellLog'), href: `${prefix}/fell-log` },
    { label: t('conditions'), href: `${prefix}/conditions` },
    { label: t('itineraries'), href: `${prefix}/itineraries` },
    { label: t('accommodation'), href: `${prefix}/accommodation` },
    ...(locale === 'en' ? [{ label: 'Blog', href: '/blog' }] : []),
    ...(locale === 'en' ? [{ label: 'Book Accommodation', href: 'https://www.booking.com/region/gb/lake-district.html', external: true }] : []),
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [langOpen]);

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-0.5">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="px-2.5 py-1.5 rounded text-sm font-medium text-[#2C3E50] hover:text-[#0D1B2A] hover:bg-[#E8E3D8]/60 transition-colors"
            >
              {link.label} ↗
            </a>
          ) : (
          <Link
            key={link.href}
            href={link.href}
            className="px-2.5 py-1.5 rounded text-sm font-medium text-[#2C3E50] hover:text-[#0D1B2A] hover:bg-[#E8E3D8]/60 transition-colors"
          >
            {link.label}
          </Link>
          )
        )}

        {/* Desktop language picker */}
        <div className="relative ml-2" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm font-medium text-[#2C3E50] hover:text-[#0D1B2A] hover:bg-[#E8E3D8]/60 transition-colors"
            aria-label="Select language"
          >
            <Flag code={currentLocale} />
            <span className="text-xs font-semibold uppercase">{currentLocale}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {langOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-[#E8E3D8] rounded-xl shadow-xl py-2 w-56 max-h-80 overflow-y-auto z-50">
              <div className="px-3 py-1.5 text-[10px] text-[#9BA8B0] uppercase tracking-wider font-semibold">Language</div>
              {LANGUAGES.map(([name, code]) => (
                <a
                  key={code}
                  href={buildHref(code, pagePath)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                    code === currentLocale
                      ? 'bg-[#B8912A]/10 text-[#0D1B2A] font-semibold'
                      : 'text-[#2C3E50] hover:bg-[#F8F5EE]'
                  }`}
                  onClick={() => setLangOpen(false)}
                >
                  <Flag code={code} />
                  <span>{name}</span>
                  {code === currentLocale && (
                    <svg className="ml-auto text-[#B8912A]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: language flag + hamburger */}
      <div className="flex items-center gap-1 lg:hidden">
        <button
          onClick={() => { setMobileLangOpen(!mobileLangOpen); setOpen(false); }}
          className="p-2 rounded text-[#0D1B2A] hover:bg-[#E8E3D8] transition-colors flex items-center gap-1"
          aria-label="Select language"
        >
          <Flag code={currentLocale} />
        </button>
        <button
          onClick={() => { setOpen(!open); setMobileLangOpen(false); }}
          className="p-2 rounded text-[#0D1B2A] hover:bg-[#E8E3D8] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E3D8] shadow-lg lg:hidden z-50">
          <nav className="container mx-auto px-4 py-4 max-w-7xl flex flex-col gap-1">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded text-[#0D1B2A] hover:bg-[#F8F5EE] transition-colors"
                >
                  {link.label} ↗
                </a>
              ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded text-[#0D1B2A] hover:bg-[#F8F5EE] transition-colors"
              >
                {link.label}
              </Link>
              )
            )}
          </nav>
        </div>
      )}

      {/* Mobile language drawer */}
      {mobileLangOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E8E3D8] shadow-lg lg:hidden z-50">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="text-[10px] text-[#9BA8B0] uppercase tracking-wider font-semibold mb-3 px-2">Language</div>
            <div className="grid grid-cols-2 gap-1">
              {LANGUAGES.map(([name, code]) => (
                <a
                  key={code}
                  href={buildHref(code, pagePath)}
                  onClick={() => setMobileLangOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    code === currentLocale
                      ? 'bg-[#B8912A]/10 text-[#0D1B2A] font-semibold'
                      : 'text-[#2C3E50] hover:bg-[#F8F5EE]'
                  }`}
                >
                  <Flag code={code} />
                  <span className="truncate">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
