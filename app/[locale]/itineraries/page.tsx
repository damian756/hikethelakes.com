import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { MapPin, Bed, Utensils, Mountain } from 'lucide-react';
import WalkingPlanner from '@/components/WalkingPlanner';
import { WALKING_ITINERARIES } from '@/lib/walking-itineraries';
import { FELLS } from '@/lib/fells';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('itinerariesTitle'),
    description: tm('itinerariesDesc'),
    alternates: buildAlternates('/itineraries'),
  };
}

const FELL_NAMES: Record<string, string> = Object.fromEntries(
  FELLS.map((f) => [f.slug, f.name])
);

export default async function ItinerariesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'itinerariesPage' });

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
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
          <div className="text-[#9E762A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-14">
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-2">{t('plannerTitle')}</h2>
          <p className="text-[#3C4E42]/65 mb-8">{t('plannerDesc')}</p>
          <WalkingPlanner locale={locale} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-8">{t('allItinerariesTitle')}</h2>
          <div className="space-y-8">
            {WALKING_ITINERARIES.map((it) => (
              <div key={it.id} className="bg-white rounded-2xl border border-[#D2D8CF] overflow-hidden shadow-sm">
                <div className="h-1.5 bg-gradient-to-r from-[#1A4A30] via-[#9E762A] to-[#1A4A30]" />
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#0E1C14]">{it.title}</h3>
                      <p className="text-[#1A4A30] font-medium mt-1">{it.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#0E1C14]">{it.days} {it.days === 1 ? t('dayLabel') : t('daysLabel')}</div>
                      <div className="text-[#3C4E42]/50 text-sm capitalize">
                        {it.budget === 'premium' ? t('budgetPremium') : it.budget === 'standard' ? t('budgetStandard') : t('budgetValue')}
                      </div>
                    </div>
                  </div>

                  <p className="text-[#3C4E42]/70 mb-6 leading-relaxed">{it.description}</p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="sm:col-span-1">
                      <div className="text-xs font-semibold text-[#3C4E42]/50 uppercase tracking-wider mb-2">{t('fellOrderLabel')}</div>
                      <div className="space-y-1.5">
                        {it.fells.map((slug, i) => (
                          <div key={slug} className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-[#0E1C14] rounded-full text-white text-xs flex items-center justify-center font-bold shrink-0">
                              {i + 1}
                            </span>
                            <Link
                              href={`${prefix}/fells/${slug}`}
                              className="text-sm text-[#1A4A30] font-medium hover:text-[#9E762A] transition-colors"
                            >
                              {FELL_NAMES[slug] ?? slug}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-[#3C4E42]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Bed size={12} /> {t('whereToStayLabel')}
                      </div>
                      <p className="text-sm text-[#3C4E42]/70 leading-relaxed">{it.accommodation}</p>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-[#3C4E42]/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Utensils size={12} /> {t('diningLabel')}
                      </div>
                      <p className="text-sm text-[#3C4E42]/70 leading-relaxed">{it.dining}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#EAEDE8] rounded-xl p-4">
                    <div>
                      <div className="text-xs text-[#3C4E42]/50 uppercase tracking-wider mb-0.5">{t('estimatedCostLabel')}</div>
                      <div className="font-bold text-[#0E1C14]">{it.estimatedCost}</div>
                    </div>
                    <a
                      href="https://www.booking.com/searchresults.html?ss=Lake+District"
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center gap-2 bg-[#1A4A30] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm shrink-0"
                    >
                      <Bed size={14} />
                      {t('bookAccommodationBtn')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 bg-white border border-[#D2D8CF] rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-5">{t('howToPlanTitle')}</h2>
          <div className="prose prose-slate max-w-none text-[#3C4E42]/75 space-y-4 text-sm leading-relaxed">
            <p>{t('howToPlanPara1')}</p>
            <p>{t('howToPlanPara2')}</p>
            <p>{t('howToPlanPara3')}</p>
            <p>{t('howToPlanPara4')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
