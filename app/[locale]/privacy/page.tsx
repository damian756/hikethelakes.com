import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return pageMetadata({
    path: '/privacy',
    title: 'Privacy Policy | HikeTheLakes',
    noindex: true,
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('privacyTitle')}</h1>
          <p className="text-white/55 text-sm">{t('lastUpdated')}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#D2D8CF] rounded-2xl p-8 prose prose-slate max-w-none text-sm leading-relaxed text-[#3C4E42]/75 space-y-4">
          <p>{t('privacyIntro')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('analyticsTitle')}</h2>
          <p>{t('analyticsDesc')}</p>
          <p>{t('pageCountDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('cookiesTitle')}</h2>
          <p>{t('cookiesDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('contactFormTitle')}</h2>
          <p>{t('contactFormDesc')}</p>
          <h2 className="font-display text-xl font-bold text-[#0E1C14]">{t('privacyContactTitle')}</h2>
          <p>
            {t.rich('privacyContactText', {
              link: (chunks) => (
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-[#1A4A30]">
                  {chunks}
                </Link>
              ),
              nowrap: (chunks) => <span className="whitespace-nowrap">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
