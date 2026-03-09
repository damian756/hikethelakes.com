import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Mountain, Wind, MapPin, Calendar, ChevronRight, Star, Flag, Trophy, Clock, Users } from 'lucide-react';
import { FELLS, getFeaturedFells } from '@/lib/fells';
import type { Metadata } from 'next';
import { BASE_URL, buildAlternates } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: { absolute: `${tm('homeTitle')} | Hike The Lakes` },
    description: tm('homeDesc'),
    alternates: buildAlternates('/'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const th = await getTranslations({ locale, namespace: 'homePage' });
  const featuredFells = getFeaturedFells();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="min-h-screen">
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${BASE_URL}/#website`,
                url: BASE_URL,
                name: 'Hike The Lakes',
                description: 'The definitive guide to Lake District fells.',
                publisher: { '@id': `${BASE_URL}/#organization` },
                inLanguage: 'en-GB',
                potentialAction: {
                  '@type': 'ReadAction',
                  target: `${BASE_URL}/fells`,
                },
              },
              {
                '@type': 'Organization',
                '@id': `${BASE_URL}/#organization`,
                name: 'Hike The Lakes',
                url: BASE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${BASE_URL}/og-default.jpg`,
                  width: 1200,
                  height: 630,
                },
                sameAs: [
                  'https://www.thelakesguide.co.uk',
                  'https://www.thelakeswildlife.co.uk',
                  'https://thelakes.network',
                  'https://www.linkedin.com/company/churchtownmedia',
                  'https://churchtownmedia.co.uk',
                ],
              },
            ],
          }),
        }}
      />

      {/* ═══════════════════════════════════════════
          HERO — NAVY LINKS LANDSCAPE
      ═══════════════════════════════════════════ */}
      <section className="relative bg-[#0D1B2A] overflow-hidden">
        <Image
          src="/hero-golf.jpg"
          alt={th('heroImageAlt')}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/50" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 60%, #1A4A30 0%, transparent 50%), radial-gradient(circle at 75% 30%, #B8912A 0%, transparent 45%)`,
          }}
        />

        <div className="relative container mx-auto px-4 max-w-7xl py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#B8912A]/20 border border-[#B8912A]/40 rounded-full px-4 py-1.5 mb-8">
              <Flag size={12} className="text-[#B8912A]" />
              <span className="text-[#D4AE7A] text-xs font-semibold uppercase tracking-widest">
                {th('heroBadge')}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08]">
              {t('heroTitle')}
            </h1>

            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`${prefix}/fells`}
                className="inline-flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#2A6A45] transition-colors text-base"
              >
                <MapPin size={18} />
                {t('heroCtaCourses')}
              </Link>
              <Link
                href={`${prefix}/fell-log`}
                className="inline-flex items-center justify-center gap-2 bg-[#B8912A] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#D4AE7A] transition-colors text-base"
              >
                <Mountain size={18} />
                {t('heroCtaOpen')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10">
          <div className="container mx-auto px-4 max-w-7xl py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">20</div>
                <div className="text-white/50 text-xs mt-1">Fells Featured</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">214</div>
                <div className="text-white/50 text-xs mt-1">Wainwrights</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">978m</div>
                <div className="text-white/50 text-xs mt-1">Scafell Pike</div>
              </div>
              <div className="px-4 py-2">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#B8912A]">16</div>
                <div className="text-white/50 text-xs mt-1">Lakes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FELLS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F5EE]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">
              {t('coursesTitle')}
            </h2>
            <p className="text-[#2C3E50]/70 text-lg max-w-2xl mx-auto">
              {t('coursesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredFells.map((fell) => (
              <Link
                key={fell.slug}
                href={`${prefix}/fells/${fell.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-[#E8E3D8] hover:border-[#B8912A]/40 card-hover"
              >
                <div className="h-2 bg-[#1A4A30]" />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors leading-tight">
                        {fell.name}
                      </h3>
                      <p className="text-[#B8912A] text-xs font-semibold uppercase tracking-wider mt-1">
                        {fell.height}m · {fell.wainwrightVolume}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-5 line-clamp-2">
                    {fell.summitDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="text-center bg-[#F8F5EE] rounded-lg p-2">
                      <div className="text-[#0D1B2A] font-bold text-lg leading-none">{fell.height}m</div>
                      <div className="text-[#2C3E50]/50 text-xs mt-1">Height</div>
                    </div>
                    <div className="text-center bg-[#F8F5EE] rounded-lg p-2">
                      <div className="text-[#0D1B2A] font-bold text-sm leading-none capitalize">{fell.difficulty}</div>
                      <div className="text-[#2C3E50]/50 text-xs mt-1">Difficulty</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                      fell.difficulty === 'strenuous' ? 'bg-red-50 text-red-700' :
                      fell.difficulty === 'challenging' ? 'bg-orange-50 text-orange-700' :
                      fell.difficulty === 'moderate' ? 'bg-blue-50 text-blue-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {fell.difficulty}
                    </div>
                    <div className="ml-auto text-[#1A4A30] text-sm font-semibold group-hover:text-[#B8912A] transition-colors flex items-center gap-1">
                      View guide <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`${prefix}/fells`}
              className="inline-flex items-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold px-8 py-3 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-colors"
            >
              View All Fells <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE TOOLS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              {th('toolsSectionTitle')}
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {th('toolsSectionSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 — Course Conditions */}
            <Link
              href={`${prefix}/conditions`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#4A7D9A25', border: '1px solid #4A7D9A40' }}
              >
                <Wind size={20} style={{ color: '#4A7D9A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool1Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool1Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool1Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 2 — Golf Break Planner */}
            <Link
              href={`${prefix}/itineraries`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#1A4A3025', border: '1px solid #1A4A3040' }}
              >
                <Calendar size={20} style={{ color: '#1A4A30' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool2Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool2Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool2Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 3 — Fell Log */}
            <Link
              href={`${prefix}/fell-log`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#B8912A25', border: '1px solid #B8912A40' }}
              >
                <Flag size={20} style={{ color: '#B8912A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool3Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool3Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool3Cta')} <ChevronRight size={14} />
              </span>
            </Link>

            {/* Tool 4 — Accommodation */}
            <Link
              href={`${prefix}/accommodation`}
              className="group bg-white/6 border border-white/10 rounded-xl p-6 hover:border-[#B8912A]/40 hover:bg-white/10 transition-all card-hover"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#B8912A25', border: '1px solid #B8912A40' }}
              >
                <Trophy size={20} style={{ color: '#B8912A' }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#D4AE7A] transition-colors">
                {th('tool4Title')}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{th('tool4Desc')}</p>
              <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                {th('tool4Cta')} <ChevronRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GOLF BREAK AFFILIATE CTA
      ═══════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8F5EE] border-t border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-4">
            {th('affiliateCtaTitle')}
          </h2>
          <p className="text-[#2C3E50]/70 text-lg mb-8 max-w-2xl mx-auto">
            {th('affiliateCtaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.booking.com/searchresults.html?ss=Lake+District"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#2A6A45] transition-colors text-base"
            >
              <Trophy size={18} />
              {th('affiliateCtaBtn1')}
            </a>
            <Link
              href={`${prefix}/itineraries`}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0D1B2A] text-[#0D1B2A] font-semibold px-8 py-4 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-colors text-base"
            >
              <Calendar size={18} />
              {th('affiliateCtaBtn2')}
            </Link>
          </div>
          <p className="text-[#2C3E50]/40 text-xs mt-5">
            {th('affiliateCtaDisclaimer')}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDITORIAL — WHY SEFTON COAST?
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-8 text-center">
            {th('editorialTitle')}
          </h2>
          <div className="prose prose-lg max-w-none text-[#2C3E50]/80">
            <p>{th('editorialPara1')}</p>
            <p>{th('editorialPara2')}</p>
            <p>{th('editorialPara3')}</p>
            <p>{th('editorialPara4')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard1Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard1Text')}</p>
            </div>
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <Users size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard2Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard2Text')}</p>
            </div>
            <div className="bg-[#F8F5EE] rounded-xl p-6">
              <div className="w-10 h-10 bg-[#1A4A30]/10 rounded-lg flex items-center justify-center mb-4">
                <Star size={20} className="text-[#1A4A30]" />
              </div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">{th('featureCard3Title')}</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">{th('featureCard3Text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NETWORK CROSS-LINKS
      ═══════════════════════════════════════════ */}
      <section className="py-12 bg-[#F8F5EE] border-t border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.thelakesguide.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 border border-[#E8E3D8] hover:border-[#1A4A30]/30 transition-all card-hover flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-[#1A4A30]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1A4A30]/20 transition-colors">
                <MapPin size={24} className="text-[#1A4A30]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
                  TheLakesGuide.co.uk
                </div>
                <div className="text-[#2C3E50]/60 text-sm mt-1">
                  {th('lakesGuideDesc')}
                </div>
              </div>
              <ChevronRight size={18} className="text-[#2C3E50]/30 group-hover:text-[#1A4A30] shrink-0 ml-auto transition-colors" />
            </a>
            <a
              href="https://www.thelakeswildlife.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 border border-[#E8E3D8] hover:border-[#1A4A30]/30 transition-all card-hover flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-[#2E6B3E]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#2E6B3E]/20 transition-colors">
                <MapPin size={24} className="text-[#2E6B3E]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">
                  TheLakesWildlife.co.uk
                </div>
                <div className="text-[#2C3E50]/60 text-sm mt-1">
                  {th('lakesWildlifeDesc')}
                </div>
              </div>
              <ChevronRight size={18} className="text-[#2C3E50]/30 group-hover:text-[#1A4A30] shrink-0 ml-auto transition-colors" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
