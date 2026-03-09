import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Bed, Utensils, Mountain, ChevronRight } from 'lucide-react';
import { WALKING_ITINERARIES, getItineraryById } from '@/lib/walking-itineraries';
import { FELLS } from '@/lib/fells';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateStaticParams() {
  return WALKING_ITINERARIES.map((it) => ({ slug: it.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const itinerary = getItineraryById(slug);
  if (!itinerary) return {};

  const title = `${itinerary.title} | Lake District Walking Circuit`;
  const description = itinerary.description;

  return {
    title,
    description,
    alternates: buildAlternates(`/itineraries/${slug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/itineraries/${slug}`,
      type: 'website',
    },
  };
}

const FELL_NAMES: Record<string, string> = Object.fromEntries(
  FELLS.map((f) => [f.slug, f.name])
);

export default async function ItineraryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const itinerary = getItineraryById(slug);

  if (!itinerary) notFound();

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'itinerariesPage' });

  const otherItineraries = WALKING_ITINERARIES.filter((it) => it.id !== slug);

  const pageUrl = `${BASE_URL}/itineraries/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': pageUrl + '#article',
        headline: itinerary.title,
        description: itinerary.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: '2024-06-01',
        dateModified: '2025-03-01',
        author: { '@id': 'https://www.churchtownmedia.co.uk/about#founder' },
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Walking Circuits', item: `${BASE_URL}/itineraries` },
          { '@type': 'ListItem', position: 3, name: itinerary.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="min-h-screen bg-[#EAEDE8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D2D8CF]">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#3C4E42]/55">
            <Link href={prefix || '/'} className="hover:text-[#1A4A30] transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href={`${prefix}/itineraries`} className="hover:text-[#1A4A30] transition-colors">
              {t('pageTitle')}
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#0E1C14] font-medium">{itinerary.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <Image
          src={HERO_IMAGE_URL}
          alt="Walker on a Lake District fell"
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[#9E762A] text-xs font-semibold uppercase tracking-widest">
              {itinerary.days} {itinerary.days === 1 ? t('dayLabel') : t('daysLabel')}
            </span>
            <span className="text-[#3C4E42]/60 text-xs">
              {itinerary.budget === 'premium' ? t('budgetPremium') : itinerary.budget === 'standard' ? t('budgetStandard') : t('budgetValue')}
            </span>
            <span className="text-[#3C4E42]/60 text-xs capitalize">{itinerary.difficulty}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">{itinerary.title}</h1>
          <p className="text-[#9E762A] text-lg font-medium">{itinerary.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-4">Overview</h2>
              <p className="text-[#3C4E42]/65 leading-relaxed">{itinerary.description}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-4">Fells in Order</h2>
              <div className="space-y-3">
                {itinerary.fells.map((fellSlug, i) => (
                  <Link
                    key={fellSlug}
                    href={`${prefix}/fells/${fellSlug}`}
                    className="flex items-center gap-2 bg-white border border-[#D2D8CF] rounded-xl px-4 py-3 hover:border-[#1A4A30]/40 transition-colors group"
                  >
                    <span className="w-5 h-5 bg-[#0E1C14] rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-medium text-[#0E1C14] group-hover:text-[#1A4A30] transition-colors">
                      {FELL_NAMES[fellSlug] ?? fellSlug}
                    </span>
                    <ChevronRight size={13} className="ml-auto text-[#3C4E42]/40 group-hover:text-[#1A4A30] transition-colors" />
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-4">Practical Info</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white border border-[#D2D8CF] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[#1A4A30] mb-2">
                    <Bed size={18} />
                    <span className="font-semibold">{t('whereToStayLabel')}</span>
                  </div>
                  <p className="text-[#3C4E42]/70 text-sm leading-relaxed">{itinerary.accommodation}</p>
                </div>
                <div className="bg-white border border-[#D2D8CF] rounded-xl p-5">
                  <div className="flex items-center gap-2 text-[#1A4A30] mb-2">
                    <Utensils size={18} />
                    <span className="font-semibold">{t('diningLabel')}</span>
                  </div>
                  <p className="text-[#3C4E42]/70 text-sm leading-relaxed">{itinerary.dining}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1A4A30] rounded-xl p-6 text-white sticky top-6">
              <h3 className="font-display text-lg font-bold mb-2">{t('estimatedCostLabel')}</h3>
              <p className="text-white/70 text-sm mb-4">{itinerary.estimatedCost}</p>
              <a
                href="https://www.booking.com/searchresults.html?ss=Lake+District"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center gap-2 bg-[#9E762A] text-white font-semibold px-4 py-3 rounded-lg hover:bg-[#B8912A] transition-colors text-sm w-full"
              >
                <Bed size={15} />
                {t('bookAccommodationBtn')}
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-[#0E1C14] mb-3 uppercase tracking-wider text-xs">{t('allItinerariesTitle')}</h3>
              <div className="space-y-2">
                {otherItineraries.slice(0, 4).map((it) => (
                  <Link
                    key={it.id}
                    href={`${prefix}/itineraries/${it.id}`}
                    className="flex items-center justify-between bg-white border border-[#D2D8CF] rounded-lg px-4 py-3 hover:border-[#1A4A30]/40 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-[#0E1C14] text-sm group-hover:text-[#1A4A30] transition-colors">
                        {it.title}
                      </div>
                      <div className="text-[#3C4E42]/50 text-xs">
                        {it.days} {it.days === 1 ? t('dayLabel') : t('daysLabel')} · {it.budget === 'premium' ? t('budgetPremium') : it.budget === 'standard' ? t('budgetStandard') : t('budgetValue')}
                      </div>
                    </div>
                    <ChevronRight size={13} className="text-[#3C4E42]/30 group-hover:text-[#1A4A30] transition-colors" />
                  </Link>
                ))}
              </div>
              <Link
                href={`${prefix}/itineraries`}
                className="text-[#1A4A30] text-sm font-semibold hover:text-[#9E762A] transition-colors flex items-center gap-1 mt-3"
              >
                View all itineraries <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
