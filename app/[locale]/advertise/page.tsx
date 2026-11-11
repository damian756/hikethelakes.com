import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { pageMetadata } from '@/lib/metadata';
import { AD_OPTION_IDS, describeSpace } from '@/lib/ad-slots';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'advertisePage' });
  return pageMetadata({
    path: '/advertise',
    title: t('metaTitle'),
    description: t('metaDesc'),
  });
}

// The advertising menu (Damian, 11 Nov 2026). Prices are plus VAT; paid by invoice
// after an enquiry through the contact form. No traffic or audience claims.
export default async function AdvertisePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ space?: string | string[] }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const t = await getTranslations({ locale, namespace: 'advertisePage' });
  const sp = await searchParams;
  const space = describeSpace(typeof sp.space === 'string' ? sp.space : undefined);

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <p className="text-[#9E762A] text-sm uppercase tracking-widest font-semibold mb-3">{t('kicker')}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">{t('intro')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        {space && (
          <p className="mb-6 text-sm font-semibold text-[#1A4A30] bg-white border border-[#D2D8CF] rounded-lg px-4 py-3">
            {t('askedAbout', { space })}
          </p>
        )}

        <div className="rounded-2xl border border-[#9E762A]/40 bg-white p-6 mb-10">
          <h2 className="font-display text-xl font-bold text-[#0E1C14] mb-1">{t('foundingTitle')}</h2>
          <p className="text-[#3C4E42]/80 text-sm leading-relaxed">{t('foundingText')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AD_OPTION_IDS.map((id) => {
            const points = t.raw(`options.${id}.points`) as string[];
            return (
              <section key={id} id={id} className="scroll-mt-24 bg-white rounded-2xl border border-[#D2D8CF] p-6 flex flex-col">
                <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-2">{t(`options.${id}.name`)}</h2>
                <p className="mb-1">
                  <span className="text-3xl font-bold text-[#1A4A30]">{t(`options.${id}.price`)}</span>{' '}
                  <span className="text-[#3C4E42]/75 text-sm">{t(`options.${id}.per`)}</span>
                </p>
                <p className="text-[#3C4E42]/60 text-sm mb-4">{t(`options.${id}.note`)}</p>
                <ul className="space-y-2 text-sm text-[#3C4E42]/85 mb-6 flex-1">
                  {points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check size={16} className="text-[#1A4A30] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="self-start bg-[#1A4A30] hover:bg-[#2A6A45] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {t('askButton')}
                </Link>
              </section>
            );
          })}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 text-sm text-[#3C4E42]/85">
          <div className="bg-white rounded-2xl border border-[#D2D8CF] p-6">
            <h2 className="font-display text-xl font-bold text-[#0E1C14] mb-3">{t('howTitle')}</h2>
            <p className="mb-2 leading-relaxed">{t('howText1')}</p>
            <p className="leading-relaxed">{t('howText2')}</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#D2D8CF] p-6">
            <h2 className="font-display text-xl font-bold text-[#0E1C14] mb-3">{t('neverTitle')}</h2>
            <p className="leading-relaxed">{t('neverText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
