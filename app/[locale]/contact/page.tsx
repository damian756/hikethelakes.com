import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { pageMetadata } from '@/lib/metadata';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  // /contact?type=… keeps this canonical: the clean URL.
  return pageMetadata({
    path: '/contact',
    // "Contact Hike The Lakes" already names the site, so the layout template is skipped.
    title: { absolute: tm('contactTitle') },
    description: tm('contactDesc'),
  });
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

      <div className="container mx-auto px-4 max-w-3xl py-14 space-y-6">
        <div className="bg-white border border-[#D2D8CF] rounded-2xl p-6 sm:p-8">
          <ContactForm
            labels={{
              formTitle: t('formTitle'),
              nameLabel: t('nameLabel'),
              emailLabel: t('emailLabel'),
              typeLabel: t('typeLabel'),
              messageLabel: t('messageLabel'),
              messagePlaceholder: t('messagePlaceholder'),
              sendButton: t('sendButton'),
              sending: t('sending'),
              sentTitle: t('sentTitle'),
              sentText: t('sentText'),
              sendAnother: t('sendAnother'),
              errorNetwork: t('errorNetwork'),
            }}
          />
        </div>

        <div className="bg-white border border-[#D2D8CF] rounded-2xl p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-4">{t('getInTouchTitle')}</h2>
            <div className="prose text-[#3C4E42]/70 text-sm leading-relaxed space-y-3">
              <p>
                <strong className="text-[#0E1C14]">{t('featuredListingsLabel')}</strong>{' '}
                {t('featuredListingsText')}{' '}
                <Link href="/advertise" className="text-[#1A4A30] underline hover:text-[#9E762A] transition-colors">
                  {t('advertiseLinkText')}
                </Link>
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
              <li>{t('beforeContactItem2')}</li>
              <li>{t('beforeContactItem3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
