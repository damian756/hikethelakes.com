'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NavMenu({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');

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
              className="px-2.5 py-1.5 rounded text-sm font-medium text-white hover:text-[#9E762A] hover:bg-white/10 transition-colors"
            >
              {link.label} ↗
            </a>
          ) : (
          <Link
            key={link.href}
            href={link.href}
            className="px-2.5 py-1.5 rounded text-sm font-medium text-white hover:text-[#9E762A] hover:bg-white/10 transition-colors"
          >
            {link.label}
          </Link>
          )
        )}
      </div>

      {/* Mobile: hamburger */}
      <div className="flex items-center gap-1 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#1A4A30] border-b border-white/10 shadow-lg lg:hidden z-50">
          <nav className="container mx-auto px-4 py-4 max-w-7xl flex flex-col gap-1">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded text-white hover:bg-white/10 hover:text-[#9E762A] transition-colors"
                >
                  {link.label} ↗
                </a>
              ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded text-white hover:bg-white/10 hover:text-[#9E762A] transition-colors"
              >
                {link.label}
              </Link>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
}
