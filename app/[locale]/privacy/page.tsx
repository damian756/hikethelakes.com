import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Privacy Policy | HikeTheLakes',
    robots: { index: false, follow: false },
    alternates: buildAlternates('/privacy'),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPage' });

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/35 to-[#0D1B2A]/70" />
        <div className="relative container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('privacyTitle')}</h1>
          <p className="text-white/55 text-sm">{t('lastUpdated')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#2C3E50]/75 space-y-4">
          <p>{t('privacyIntro')}</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('analyticsTitle')}</h2>
          <p>{t('analyticsDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('affiliateLinksTitle')}</h2>
          <p>{t('privacyAffiliateDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0D1B2A]">{t('privacyContactTitle')}</h2>
          <p>
            {t('privacyContactText')}{' '}
            <a href="mailto:hello@churchtownmedia.co.uk" className="text-[#1A4A30]">
              hello@churchtownmedia.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
