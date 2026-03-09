import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { buildAlternates } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('contactTitle'),
    description: tm('contactDesc'),
    alternates: buildAlternates('/contact'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg">{t('pageDesc')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#D2D8CF] rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-4">{t('getInTouchTitle')}</h2>
            <div className="prose text-[#3C4E42]/70 text-sm leading-relaxed space-y-3">
              <p>
                <strong className="text-[#0E1C14]">{t('generalEnquiriesLabel')}</strong>{' '}
                <a href="mailto:hello@churchtownmedia.co.uk" className="text-[#1A4A30] hover:text-[#9E762A] transition-colors">
                  hello@churchtownmedia.co.uk
                </a>
              </p>
              <p>
                <strong className="text-[#0E1C14]">{t('featuredListingsLabel')}</strong>{' '}
                {t('featuredListingsText')}
              </p>
              <p>
                <strong className="text-[#0E1C14]">{t('dataCorrectionsLabel')}</strong>{' '}
                {t('dataCorrectionsText')}
              </p>
              <p>
                <strong className="text-[#0E1C14]">{t('pressMediaLabel')}</strong>{' '}
                <a
                  href="https://churchtownmedia.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4A30] hover:text-[#9E762A] transition-colors"
                >
                  {t('pressMediaLinkText')}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[#D2D8CF] pt-6">
            <h3 className="font-semibold text-[#0E1C14] mb-3">{t('beforeContactTitle')}</h3>
            <ul className="space-y-2 text-sm text-[#3C4E42]/70">
              <li>{t('beforeContactItem1')}</li>
              <li>
                {t('beforeContactItem2')}{' '}
                <a
                  href="https://www.theopen.com/tickets"
                  className="text-[#1A4A30] hover:text-[#9E762A] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TheOpen.com
                </a>
                .
              </li>
              <li>{t('beforeContactItem3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
