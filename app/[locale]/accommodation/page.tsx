import Link from 'next/link';
import Image from 'next/image';
import { Bed, MapPin, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tm('accommodationTitle'),
    description: tm('accommodationDesc'),
    alternates: buildAlternates('/accommodation'),
  };
}

// Areas to base yourself, and a few named places. Named places say only what
// their own websites said on 11 Nov 2026 (no prices, no rankings). No booking or
// affiliate links: the company no longer uses them (Nov 2026).
type Option = {
  name: string;
  type: string;
  address: string;
  desc: string;
  /** What the place's own website lists. Named places only. */
  offers?: string[];
  /** The place's own website. Named places only. */
  website?: string;
};

const ACCOMMODATION: { area: string; distanceFromCentre: string; options: Option[] }[] = [
  {
    area: 'Keswick',
    distanceFromCentre: 'Northern fells',
    options: [
      {
        name: 'Keswick B&Bs and Guesthouses',
        type: 'B&B',
        address: 'Keswick, CA12',
        desc: 'Wide choice of B&Bs and guesthouses. Keswick is the main base for the northern fells: Skiddaw, Blencathra, Catbells and the Coledale round. Book ahead in summer.',
      },
      {
        name: 'YHA Keswick',
        type: 'Hostel',
        address: 'Station Road, Keswick, CA12 5LH',
        desc: "Hostel overlooking the River Greta and Fitz Park, less than five minutes' walk from the town centre, with dormitories and private rooms. YHA says parking on Station Road is limited and points to free parking 400m away on Brundholme Road.",
        offers: ['Café and licensed bar', 'Self-catering kitchen', 'Dormitories and private rooms'],
        website: 'https://www.yha.org.uk/hostel/yha-keswick',
      },
    ],
  },
  {
    area: 'Ambleside & Langdale',
    distanceFromCentre: 'Central Lakes',
    options: [
      {
        name: 'Ambleside Hotels and B&Bs',
        type: 'B&B / Hotel',
        address: 'Ambleside, LA22',
        desc: 'Base for the central and southern fells: Scafell Pike from Langdale, the Fairfield Horseshoe and the Langdale Pikes. Plenty of pubs and restaurants in the town.',
      },
      {
        name: 'Old Dungeon Ghyll, Langdale',
        type: 'Hotel',
        address: 'Great Langdale, LA22 9JY',
        desc: "Hotel with a climbers' bar at the head of Great Langdale. Its website lists walks from the door to the Langdale Pikes, Jack's Rake, Bowfell and Crinkle Crags.",
        offers: ["Climbers' Bar", 'Packed lunches', 'Walks from the door'],
        website: 'https://www.odg.co.uk',
      },
    ],
  },
  {
    area: 'Glenridding & Patterdale',
    distanceFromCentre: 'Eastern fells',
    options: [
      {
        name: 'Glenridding and Patterdale B&Bs',
        type: 'B&B',
        address: 'Glenridding & Patterdale, CA11',
        desc: 'Base for Helvellyn, Fairfield and High Street. The Striding Edge and Swirral Edge routes start from Glenridding. Quieter than Keswick and Ambleside.',
      },
    ],
  },
  {
    area: 'Buttermere & Borrowdale',
    distanceFromCentre: 'Western fells',
    options: [
      {
        name: 'Bridge Hotel, Buttermere',
        type: 'Hotel',
        address: 'Buttermere',
        desc: 'Hotel in Buttermere village with 21 en-suite bedrooms and 6 self-catering apartments. Its website says the bedrooms have no televisions, no radios and no mobile phone signal, and that dogs are welcome.',
        offers: ['En-suite rooms and self-catering apartments', 'The Bridge Inn bar', 'Dogs welcome'],
        website: 'https://thebridgehotel.uk/',
      },
    ],
  },
];

export default async function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'accommodationPage' });

  const tips = [
    { icon: Clock, tip: t('tip1') },
    { icon: Bed, tip: t('tip2') },
    { icon: MapPin, tip: t('tip3') },
    { icon: CheckCircle2, tip: t('tip4') },
  ];

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <div className="bg-[#0E1C14] py-14 relative overflow-hidden">
        <Image
          src={HERO_IMAGE_URL}
          alt="Snow-capped mountain peaks above a sea of cloud"
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#9E762A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {t('pageDesc')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 space-y-12">

        {/* Accommodation areas */}
        {ACCOMMODATION.map((area) => (
          <div key={area.area}>
            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="font-display text-2xl font-bold text-[#0E1C14]">{area.area}</h2>
              <span className="text-[#3C4E42]/50 text-sm flex items-center gap-1.5">
                <MapPin size={12} /> {area.distanceFromCentre}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {area.options.map((opt) => (
                <div key={opt.name} className="bg-white border border-[#D2D8CF] rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#0E1C14]">{opt.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#3C4E42]/50 mt-1">
                          <span className="bg-[#1A4A30]/10 text-[#1A4A30] px-2 py-0.5 rounded-full font-medium">{opt.type}</span>
                          <span>{opt.address}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#3C4E42]/70 text-sm leading-relaxed mb-4">{opt.desc}</p>

                    {opt.offers && (
                    <div className="mb-4">
                      <div className="text-xs text-[#3C4E42]/50 uppercase tracking-wider mb-2">{t('walkerFeaturesLabel')}</div>
                      <ul className="space-y-1">
                        {opt.offers.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[#3C4E42]/70">
                            <CheckCircle2 size={12} className="text-[#1A4A30] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    )}

                    {opt.website && (
                    <a
                      href={opt.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm w-full"
                    >
                      {t('websiteBtn')}
                    </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Booking tips */}
        <div className="bg-[#1A4A30] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">{t('tipsTitle')}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {tips.map(({ icon: Icon, tip }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#9E762A]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#D4AE7A]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Network links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <a href="https://www.thelakesguide.co.uk/accommodation" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#D2D8CF] rounded-xl p-5 flex items-center gap-4 hover:border-[#1A4A30]/30 transition-all card-hover">
            <Bed size={20} className="text-[#1A4A30] shrink-0" />
            <div>
              <div className="font-semibold text-[#0E1C14] group-hover:text-[#1A4A30] transition-colors">{t('lakesGuideLinkTitle')}</div>
              <div className="text-[#3C4E42]/55 text-sm">{t('lakesGuideLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#3C4E42]/30 ml-auto shrink-0" />
          </a>
          <a href="https://www.thelakeswildlife.co.uk" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#D2D8CF] rounded-xl p-5 flex items-center gap-4 hover:border-[#2E6B3E]/30 transition-all card-hover">
            <Bed size={20} className="text-[#2E6B3E] shrink-0" />
            <div>
              <div className="font-semibold text-[#0E1C14] group-hover:text-[#1A4A30] transition-colors">{t('lakesWildlifeLinkTitle')}</div>
              <div className="text-[#3C4E42]/55 text-sm">{t('lakesWildlifeLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#3C4E42]/30 ml-auto shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
