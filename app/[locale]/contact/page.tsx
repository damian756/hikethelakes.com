import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-white mb-3">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg">{t('pageDesc')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-14">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0D1B2A] mb-4">{t('getInTouchTitle')}</h2>
            <div className="prose text-[#2C3E50]/70 text-sm leading-relaxed space-y-3">
              <p>
                <strong className="text-[#0D1B2A]">{t('generalEnquiriesLabel')}</strong>{' '}
                <a href="mailto:hello@churchtownmedia.co.uk" className="text-[#1A4A30] hover:text-[#B8912A] transition-colors">
                  hello@churchtownmedia.co.uk
                </a>
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('featuredListingsLabel')}</strong>{' '}
                {t('featuredListingsText')}
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('dataCorrectionsLabel')}</strong>{' '}
                {t('dataCorrectionsText')}
              </p>
              <p>
                <strong className="text-[#0D1B2A]">{t('pressMediaLabel')}</strong>{' '}
                <a
                  href="https://churchtownmedia.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A4A30] hover:text-[#B8912A] transition-colors"
                >
                  {t('pressMediaLinkText')}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[#E8E3D8] pt-6">
            <h3 className="font-semibold text-[#0D1B2A] mb-3">{t('beforeContactTitle')}</h3>
            <ul className="space-y-2 text-sm text-[#2C3E50]/70">
              <li>{t('beforeContactItem1')}</li>
              <li>
                {t('beforeContactItem2')}{' '}
                <a
                  href="https://www.theopen.com/tickets"
                  className="text-[#1A4A30] hover:text-[#B8912A] transition-colors"
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
