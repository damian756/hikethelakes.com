import Image from 'next/image';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { FELLS, hasRouteGuide } from '@/lib/fells';
import { gridToEN } from '@/lib/fell-context';
import FellLogTable, { type FellLogRow } from '@/components/FellLogTable';
import type { Metadata } from 'next';
import { BASE_URL, pageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    path: '/fell-log',
    title: tm('fellLogTitle'),
    description: tm('fellLogDesc'),
  });
}

export default async function FellLogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fellLogPage' });

  const rows: FellLogRow[] = FELLS.map((fell) => {
    const { e, n } = gridToEN(fell.osGridRef);
    return {
      slug: fell.slug,
      name: fell.name,
      height: fell.height,
      gridRef: fell.osGridRef,
      easting: e,
      northing: n,
      area: fell.wainwrightVolume.replace(/^The /, ''),
      book: fell.wainwrightBook,
      hasGuide: hasRouteGuide(fell),
    };
  });

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Lake District Fell Log',
            description: 'Heights and grid references for the 214 Lake District Wainwright fells.',
            url: `${BASE_URL}/fell-log`,
          }),
        }}
      />

      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#9E762A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <FellLogTable rows={rows} guideLabel={t('routeGuideLabel')} />
      </div>
    </div>
  );
}
