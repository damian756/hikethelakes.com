import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { AD_SLOTS, activeSponsor, advertiseHref, type AdSlotDef } from '@/lib/ad-slots';

// One advert space. Filled: a labelled card with the sponsor's name, text,
// optional photo and a sponsored link. Empty: an "advertise here" card that
// names the space and links to the advertise page. At most one per page.

const KIND_KEYS: Record<AdSlotDef['kind'], { kicker: string; body: string }> = {
  home: { kicker: 'kickerHome', body: 'bodyHome' },
  area: { kicker: 'kickerArea', body: 'bodyArea' },
  page: { kicker: 'kickerPage', body: 'bodyPage' },
  post: { kicker: 'kickerPost', body: 'bodyPost' },
};

export default async function AdSlot({
  id,
  locale,
  className = '',
}: {
  id: string;
  locale: string;
  className?: string;
}) {
  if (locale !== 'en') return null;
  const slot = AD_SLOTS[id];
  if (!slot) return null;

  const t = await getTranslations({ locale, namespace: 'adSlot' });
  const ta = await getTranslations({ locale, namespace: 'advertisePage' });
  const sponsor = activeSponsor(slot);
  const label = slot.kind === 'home' ? t('labelAdvert') : t('labelSponsor');

  if (sponsor) {
    return (
      <aside
        aria-label={label}
        data-ad-slot={slot.id}
        className={`bg-white border border-[#D2D8CF] rounded-xl overflow-hidden ${className}`}
      >
        <div className="sm:flex">
          {sponsor.image && (
            <div className="relative aspect-[16/9] sm:aspect-auto sm:w-64 sm:shrink-0 bg-[#EAEDE8]">
              <Image src={sponsor.image} alt={sponsor.name} fill className="object-cover" sizes="(min-width: 640px) 256px, 100vw" />
            </div>
          )}
          <div className="p-5 flex-1 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#0E1C14] mb-2">{label}</p>
            <p className="font-display text-lg font-bold text-[#0E1C14] leading-snug mb-1.5">{sponsor.name}</p>
            <p className="text-[#3C4E42]/75 text-sm leading-relaxed mb-4">{sponsor.text}</p>
            <a
              href={sponsor.url}
              target="_blank"
              rel="sponsored noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A4A30] hover:text-[#9E762A] transition-colors"
            >
              {t('visit', { name: sponsor.name })} <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>
    );
  }

  const keys = KIND_KEYS[slot.kind];
  return (
    <aside
      aria-label={t(keys.kicker)}
      data-ad-slot={slot.id}
      className={`rounded-xl border-[1.5px] border-dashed border-[#1A4A30]/40 bg-white/60 p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
        <div className="min-w-0 md:flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#3C4E42]/70 mb-1.5">{t(keys.kicker)}</p>
          <p className="font-display text-lg md:text-xl font-bold text-[#0E1C14] leading-snug mb-1.5">{slot.title}</p>
          <p className="text-[#3C4E42]/75 text-sm leading-relaxed">{t(keys.body)}</p>
        </div>
        <div className="flex flex-col items-start gap-2 md:shrink-0">
          <span className="text-sm font-semibold text-[#0E1C14]">
            {ta(`options.${slot.option}.name`)}: {ta(`options.${slot.option}.fromLine`)}
          </span>
          <Link
            href={advertiseHref(slot)}
            className="inline-block bg-[#1A4A30] hover:bg-[#2A6A45] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
