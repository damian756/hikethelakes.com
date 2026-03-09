import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Terms of Use | HikeTheLakes',
    robots: { index: false, follow: false },
    alternates: buildAlternates('/terms'),
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalPage' });

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('termsTitle')}</h1>
          <p className="text-white/55 text-sm">{t('lastUpdated')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#D2D8CF] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#3C4E42]/75 space-y-4">
          <p>{t('termsIntro')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('infoAccuracyTitle')}</h2>
          <p>{t('infoAccuracyDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('affiliateLinksTitle')}</h2>
          <p>{t('termsAffiliateDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('copyrightTitle')}</h2>
          <p>{t('copyrightDesc')}</p>
        </div>
      </div>
    </div>
  );
}
