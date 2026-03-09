import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MapPin, ChevronRight, Mountain, Clock, TrendingUp, Utensils } from 'lucide-react';
import { FELLS, getFell } from '@/lib/fells';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateStaticParams() {
  return FELLS.map((fell) => ({ slug: fell.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const fell = getFell(slug);
  if (!fell) return {};

  const title = `${fell.name} | Hike The Lakes`;
  const description = fell.summitDescription.slice(0, 160);

  return {
    title,
    description,
    alternates: buildAlternates(`/fells/${slug}`),
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/fells/${slug}`,
      type: 'website',
    },
  };
}

export default async function FellPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const fell = getFell(slug);

  if (!fell) notFound();

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const otherFells = FELLS.filter((f) => f.slug !== slug);
  const t = await getTranslations({ locale, namespace: 'fellDetail' });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TouristAttraction',
                '@id': `${BASE_URL}/fells/${slug}`,
                name: fell.name,
                description: fell.summitDescription,
                url: `${BASE_URL}/fells/${slug}`,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: fell.latitude,
                  longitude: fell.longitude,
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: t('breadcrumbHome'), item: BASE_URL },
                  { '@type': 'ListItem', position: 2, name: t('breadcrumbFells'), item: `${BASE_URL}/fells` },
                  { '@type': 'ListItem', position: 3, name: fell.name, item: `${BASE_URL}/fells/${slug}` },
                ],
              },
            ],
          }),
        }}
      />

      <div className="bg-white border-b border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-7xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#2C3E50]/55">
            <Link href={prefix || '/'} className="hover:text-[#1A4A30] transition-colors">{t('breadcrumbHome')}</Link>
            <ChevronRight size={13} />
            <Link href={`${prefix}/fells`} className="hover:text-[#1A4A30] transition-colors">{t('breadcrumbFells')}</Link>
            <ChevronRight size={13} />
            <span className="text-[#0D1B2A] font-medium">{fell.name}</span>
          </nav>
        </div>
      </div>

      <div className="bg-[#0D1B2A] relative overflow-hidden">
        {fell.image ? (
          <>
            <Image
              src={fell.image}
              alt={fell.name}
              fill
              priority
              className="object-cover object-center opacity-50"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/50 via-[#0D1B2A]/30 to-[#0D1B2A]/70" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Mountain className="w-32 h-32 text-white" />
          </div>
        )}
        <div className="relative container mx-auto px-4 max-w-7xl py-10 md:py-20">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[#B8912A] text-xs font-semibold uppercase tracking-widest">
              {fell.height}m
            </span>
            <span className="text-[#B8912A] text-xs font-semibold uppercase tracking-widest">
              {fell.wainwrightVolume}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              fell.difficulty === 'strenuous' ? 'bg-red-900/40 text-red-300' :
              fell.difficulty === 'challenging' ? 'bg-orange-900/40 text-orange-300' :
              fell.difficulty === 'moderate' ? 'bg-blue-900/40 text-blue-300' :
              'bg-green-900/40 text-green-300'
            }`}>
              {fell.difficulty.charAt(0).toUpperCase() + fell.difficulty.slice(1)}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {fell.name}
          </h1>
          <p className="text-[#D4AE7A] text-base md:text-lg font-medium mb-4">{fell.summitDescription}</p>
          <div className="flex items-start gap-2 text-white/55 text-sm">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span>{fell.osGridRef}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('walkingTitle')}</h2>
              <p className="text-[#2C3E50]/80 leading-relaxed">{fell.walkingDescription}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('routesTitle')}</h2>
              <div className="space-y-4">
                {fell.routes.map((route) => (
                  <div key={route.name} className="bg-white rounded-xl border border-[#E8E3D8] p-4">
                    <h3 className="font-semibold text-[#0D1B2A] mb-2">{route.name}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#2C3E50]/70">
                      <span>{route.distance}</span>
                      <span>{route.ascent} ascent</span>
                      <span>{route.time}</span>
                      <span className="capitalize">{route.difficulty}</span>
                    </div>
                    <p className="text-sm text-[#2C3E50]/60 mt-2">{route.startDescription}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('tipsTitle')}</h2>
              <p className="text-[#2C3E50]/80 leading-relaxed">{fell.tips}</p>
            </section>
          </div>

          <div className="space-y-20">
            <div className="bg-white rounded-xl border border-[#E8E3D8] p-6 sticky top-24">
              <h3 className="font-display text-lg font-bold text-[#0D1B2A] mb-4">{t('quickInfo')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#2C3E50]/60">{t('height')}</span>
                  <span className="font-semibold">{fell.height}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2C3E50]/60">{t('gridRef')}</span>
                  <span className="font-mono text-xs">{fell.osGridRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#2C3E50]/60">{t('area')}</span>
                  <span className="capitalize">{fell.area.replace('-', ' ')}</span>
                </div>
              </div>
              <a
                href="https://www.booking.com/region/gb/lake-district.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#D4AE7A] transition-colors text-sm w-full"
              >
                {t('bookAccommodation')} ↗
              </a>
              <a
                href="https://www.ordnancesurvey.co.uk/shop/os-maps-subscription"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 text-[#1A4A30] hover:text-[#0D1B2A] font-medium text-sm w-full"
              >
                {t('osMaps')} ↗
              </a>
            </div>
          </div>
        </div>

        {otherFells.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[#E8E3D8]">
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-6">{t('otherFells')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherFells.slice(0, 6).map((f) => (
                <Link
                  key={f.slug}
                  href={`${prefix}/fells/${f.slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/80 transition-colors"
                >
                  <Mountain size={20} className="text-[#B8912A] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#0D1B2A]">{f.name}</span>
                    <span className="text-[#2C3E50]/60 text-sm ml-2">{f.height}m</span>
                  </div>
                  <ChevronRight size={14} className="text-[#2C3E50]/40 ml-auto" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
