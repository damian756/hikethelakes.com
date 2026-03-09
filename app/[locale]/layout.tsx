import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NavMenu from '@/components/NavMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { routing } from '@/i18n/routing';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://www.hikethelakes.com';

const OG_LOCALE: Record<string, string> = {
  en: 'en_GB', de: 'de_DE', ja: 'ja_JP', sv: 'sv_SE', no: 'no_NO', nl: 'nl_NL',
  ko: 'ko_KR', fr: 'fr_FR', es: 'es_ES', da: 'da_DK', fi: 'fi_FI', pl: 'pl_PL',
  zh: 'zh_CN', pt: 'pt_PT', it: 'it_IT', ca: 'ca_ES', ar: 'ar_SA', cy: 'cy_GB',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = OG_LOCALE[locale] ?? 'en_GB';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'Hike The Lakes — Lake District Fell Guides',
      template: '%s | Hike The Lakes',
    },
    description:
      'The definitive guide to Lake District fells. Scafell Pike, Helvellyn, Skiddaw and more. Route guides, heights, grid references and walking circuits.',
    keywords:
      'Lake District fells, Wainwright fells, Scafell Pike, Helvellyn, Skiddaw, fell walking, Lake District walks',
    authors: [{ name: 'Hike The Lakes', url: BASE_URL }],
    creator: 'Hike The Lakes',
    publisher: 'Hike The Lakes',
    alternates: {
      canonical: BASE_URL,
      types: {
        "application/rss+xml": `${BASE_URL}/feed`,
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: BASE_URL,
      siteName: 'Hike The Lakes',
      title: 'Hike The Lakes — Lake District Fell Guides',
      description:
        'Lake District fells. Scafell Pike, Helvellyn, Skiddaw and more. Route guides and walking circuits.',
      images: [
        {
          url: `${BASE_URL}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Hike The Lakes — Lake District fells',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hike The Lakes — Lake District Fell Guides',
      description: 'Scafell Pike, Helvellyn, Skiddaw and Lake District fell walking.',
      images: [`${BASE_URL}/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: '/manifest.json',
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${BASE_URL}/#website`,
              name: 'Hike The Lakes',
              url: BASE_URL,
              description:
                'The definitive guide to Lake District fells. Scafell Pike, Helvellyn, Skiddaw and more.',
              publisher: {
                '@type': 'Organization',
                '@id': 'https://www.churchtownmedia.co.uk/#organization',
                name: 'Churchtown Media',
                url: 'https://www.churchtownmedia.co.uk',
              },
              author: {
                '@type': 'Person',
                '@id': 'https://www.churchtownmedia.co.uk/about#founder',
                name: 'Damian Roche',
                jobTitle: 'Founder, Churchtown Media',
                url: 'https://www.churchtownmedia.co.uk/about',
                sameAs: [
                  'https://www.linkedin.com/in/damian-roche-7ba8293a5/',
                  'https://find-and-update.company-information.service.gov.uk/company/16960442',
                ],
              },
            }),
          }}
        />
        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
        `}</Script>
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#F8F5EE]`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main className="overflow-x-hidden">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

function Navigation({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <nav className="relative bg-white/97 backdrop-blur-sm border-b border-[#E8E3D8] sticky top-0 z-50 shadow-sm">
      {/* Top gold accent strip */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8912A] to-transparent" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href={prefix || '/'} className="flex items-center gap-2 flex-shrink-0 group">
            <span className="font-display text-xl font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
              Hike The<span className="text-[#B8912A]">Lakes</span>
            </span>
            <span className="hidden sm:block text-xs text-[#9BA8B0] font-light tracking-widest uppercase mt-0.5">
              .com
            </span>
          </Link>

          <NavMenu locale={locale} />
        </div>
      </div>
    </nav>
  );
}

async function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const tf = await getTranslations({ locale, namespace: 'footer' });

  const exploreLinks = [
    [tf('navFells'), `${prefix}/fells`],
    [tf('navFellLog'), `${prefix}/fell-log`],
    [tf('navConditions'), `${prefix}/conditions`],
    [tf('navItineraries'), `${prefix}/itineraries`],
    [tf('navAccommodation'), `${prefix}/accommodation`],
    ...(locale === 'en' ? [['Blog', '/blog']] : []),
  ];

  const fellLinks = [
    ['Scafell Pike', `${prefix}/fells/scafell-pike`],
    ['Helvellyn', `${prefix}/fells/helvellyn`],
    ['Skiddaw', `${prefix}/fells/skiddaw`],
    ['Blencathra', `${prefix}/fells/blencathra`],
    ['Catbells', `${prefix}/fells/catbells`],
    ['Coniston Old Man', `${prefix}/fells/coniston-old-man`],
  ];

  return (
    <footer className="bg-[#0D1B2A] text-white/80">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#B8912A] to-transparent" />

      <div className="container mx-auto px-4 py-14 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-bold text-white mb-3">
              Hike The<span className="text-[#B8912A]">Lakes</span>
              <span className="text-white/30 text-sm font-normal ml-1">.com</span>
            </div>
            <p className="text-sm leading-relaxed text-white/55 mb-5 max-w-xs">
              {tf('tagline')}
            </p>
            <a
              href="https://churchtownmedia.co.uk"
              className="text-xs text-[#B8912A] hover:text-[#D4AE7A] transition"
            >
              {tf('builtByLink')}
            </a>
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-white/35 text-xs mb-3 uppercase tracking-wider">Lakes Network</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.thelakesguide.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#B8912A] transition"
                >
                  The Lakes Guide ↗
                </a>
                <a
                  href="https://www.thelakeswildlife.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#B8912A] transition"
                >
                  The Lakes Wildlife ↗
                </a>
                <a
                  href="https://thelakes.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-[#B8912A] transition"
                >
                  TheLakes.network ↗
                </a>
                <span className="text-sm text-[#B8912A] font-medium">
                  HikeTheLakes.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{tf('exploreTitle')}</h3>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-[#B8912A] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Featured Fells</h3>
            <ul className="space-y-2.5 text-sm">
              {fellLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-white/55 hover:text-[#B8912A] transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{tf('languagesHeading')}</h3>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 pb-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <span>Part of the <a href="https://thelakes.network" target="_blank" rel="noopener" className="hover:text-white/60 transition">Lakes Network</a></span>
          <div className="flex flex-wrap gap-5">
            <a href="https://www.thelakesguide.co.uk" target="_blank" rel="noopener" className="hover:text-white/60 transition">The Lakes Guide</a>
            <a href="https://www.thelakeswildlife.co.uk" target="_blank" rel="noopener" className="hover:text-white/60 transition">The Lakes Wildlife</a>
            <a href="https://thelakes.network" target="_blank" rel="noopener" className="hover:text-white/60 transition">TheLakes.network</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-white/50">
            Accommodation or activity provider?{" "}
            <span className="text-[#B8912A] font-semibold">Partner with the Lakes Network</span>
          </p>
          <a href="mailto:hello@thelakes.network" className="text-[#B8912A] hover:text-white transition font-medium text-sm">
            hello@thelakes.network →
          </a>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>{tf('copyright')}</p>
          <div className="flex flex-wrap gap-5">
            <Link href={`${prefix}/privacy`} className="hover:text-white/60 transition">
              {tf('privacyLink')}
            </Link>
            <Link href={`${prefix}/terms`} className="hover:text-white/60 transition">
              {tf('termsLink')}
            </Link>
            <Link href={`${prefix}/contact`} className="hover:text-white/60 transition">
              {tf('contactLink')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
