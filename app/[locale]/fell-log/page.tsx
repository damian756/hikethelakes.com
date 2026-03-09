import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Mountain } from 'lucide-react';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { FELLS } from '@/lib/fells';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('fellLogTitle'),
    description: tm('fellLogDesc'),
    alternates: buildAlternates('/fell-log'),
  };
}

export default async function FellLogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'fellLogPage' });

  const sortedFells = [...FELLS].sort((a, b) => b.height - a.height);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Lake District Fell Log',
            description: 'Heights, grid references and difficulty for Lake District Wainwright fells.',
            url: `${BASE_URL}/fell-log`,
          }),
        }}
      />

      <div className="bg-[#0D1B2A] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/35 to-[#0D1B2A]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-6">
        {sortedFells.map((fell) => (
          <div key={fell.slug} className="bg-white rounded-2xl border border-[#E8E3D8] overflow-hidden shadow-sm">
            <div className="h-1.5 bg-[#1A4A30]" />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#0D1B2A] flex items-center gap-2">
                    {fell.name}
                  </h2>
                  <p className="text-[#2C3E50]/55 text-sm mt-1">
                    {fell.height}m · {fell.osGridRef} · {fell.wainwrightVolume} · {fell.difficulty}
                  </p>
                </div>
                <Link
                  href={`${prefix}/fells/${fell.slug}`}
                  className="hidden sm:flex items-center gap-1 text-[#1A4A30] text-sm font-semibold hover:text-[#B8912A] transition-colors shrink-0"
                >
                  {t('fullGuideLink')} <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
