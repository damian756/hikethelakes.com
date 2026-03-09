import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MapPin, ChevronRight, Mountain } from 'lucide-react';
import { FELLS } from '@/lib/fells';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('fellsTitle'),
    description: tm('fellsDesc'),
    alternates: buildAlternates('/fells'),
  };
}

export default async function FellsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fells' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Lake District Fells',
            description: 'Wainwright fells in the Lake District',
            numberOfItems: FELLS.length,
            itemListElement: FELLS.map((fell, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'TouristAttraction',
                '@id': `${BASE_URL}/fells/${fell.slug}`,
                name: fell.name,
                url: `${BASE_URL}/fells/${fell.slug}`,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: fell.latitude,
                  longitude: fell.longitude,
                },
              },
            })),
          }),
        }}
      />

      <div className="bg-[#0D1B2A] py-16 relative overflow-hidden">
        <Image
          src="/hero-golf.jpg"
          alt="Lake District fells"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/35 to-[#0D1B2A]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">
            {t('headerBadge')}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FELLS.map((fell) => (
            <Link
              key={fell.slug}
              href={`${prefix}/fells/${fell.slug}`}
              className="group bg-white rounded-xl border border-[#E8E3D8] overflow-hidden hover:shadow-lg hover:border-[#B8912A]/40 transition-all"
            >
              <div className="relative h-44 bg-[#0D1B2A]">
                {fell.image ? (
                  <Image
                    src={fell.image}
                    alt={fell.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-70 transition-opacity"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mountain className="w-16 h-16 text-white/30" />
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="inline-block bg-[#B8912A] text-white text-xs font-bold px-2.5 py-1 rounded">
                    {fell.height}m
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-bold text-[#0D1B2A] mb-1 group-hover:text-[#1A4A30] transition-colors">
                  {fell.name}
                </h2>
                <p className="text-sm text-[#2C3E50]/70 mb-3">{fell.wainwrightVolume}</p>
                <span className="inline-flex items-center gap-1.5 text-[#1A4A30] font-semibold text-sm">
                  {t('viewGuide')} <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
