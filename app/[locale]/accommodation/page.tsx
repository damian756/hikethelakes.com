import Link from 'next/link';
import Image from 'next/image';
import { Bed, MapPin, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
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

const ACCOMMODATION = [
  {
    area: 'Keswick',
    distanceFromCentre: 'Central',
    options: [
      {
        name: 'Keswick B&Bs and Guesthouses',
        type: 'B&B',
        address: 'Keswick, CA12',
        desc: 'Wide choice of B&Bs and guesthouses. Keswick is the main hub for northern fells. Good for Skiddaw, Blencathra, Catbells and the Coledale round. Book ahead in summer.',
        approxRate: '£70–£150/night',
        walkerFriendly: ['Boot drying', 'Early breakfast', 'Pack storage', 'Central location'],
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Keswick',
      },
      {
        name: 'YHA Keswick',
        type: 'Hostel',
        address: 'Station Road, Keswick',
        desc: 'Budget option with good facilities. Popular with walkers and groups. Easy access to bus routes for the fells.',
        approxRate: '£25–£45/night',
        walkerFriendly: ['Drying room', 'Kitchen', 'Good value', 'Central'],
        bookingUrl: 'https://www.yha.org.uk/hostel/keswick',
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
        desc: 'Good base for the southern and central fells. Scafell Pike from Langdale, Fairfield horseshoe, the Langdale Pikes. Plenty of pubs and restaurants.',
        approxRate: '£80–£180/night',
        walkerFriendly: ['Boot storage', 'Early breakfast', 'Walking distance to pubs', 'Bus links'],
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Ambleside&aid=123456',
      },
      {
        name: 'Old Dungeon Ghyll, Langdale',
        type: 'Inn',
        address: 'Great Langdale, LA22 9JX',
        desc: 'Classic walkers inn at the head of Langdale. Right under the Langdale Pikes. Book well ahead. Popular for Scafell Pike and Bowfell routes.',
        approxRate: '£120–£200/night',
        walkerFriendly: ['Boot room', 'Bar and restaurant', 'Trail start', 'Atmosphere'],
        bookingUrl: 'https://www.odg.co.uk',
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
        desc: 'Base for Helvellyn, Fairfield, High Street. Striding Edge and Swirral Edge start from Helvellyn car park. Quieter than Keswick and Ambleside.',
        approxRate: '£75–£160/night',
        walkerFriendly: ['Boot drying', 'Early breakfast', 'Helvellyn access', 'Quiet'],
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Glenridding',
      },
    ],
  },
  {
    area: 'Buttermere & Borrowdale',
    distanceFromCentre: 'Western fells',
    options: [
      {
        name: 'Bridge Hotel, Buttermere',
        type: 'Inn',
        address: 'Buttermere, CA13 9UZ',
        desc: 'Classic walkers inn. Red Pike, Dale Head, Haystacks. The valley is one of the quietest in the Lakes. Stunning scenery.',
        approxRate: '£100–£180/night',
        walkerFriendly: ['Boot room', 'Bar and food', 'Valley walks', 'Remote'],
        bookingUrl: 'https://www.bridge-hotel.com',
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
    <div className="min-h-screen bg-[#F8F5EE]">
      <div className="bg-[#0D1B2A] py-14 relative overflow-hidden">
        <Image
          src="/images/accommodation.jpg"
          alt="Lake District accommodation with mountain view"
          fill
          priority
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/55 via-[#0D1B2A]/35 to-[#0D1B2A]/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="text-[#B8912A] text-sm uppercase tracking-widest font-semibold mb-3">{t('headerBadge')}</div>
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
              <h2 className="font-display text-2xl font-bold text-[#0D1B2A]">{area.area}</h2>
              <span className="text-[#2C3E50]/50 text-sm flex items-center gap-1.5">
                <MapPin size={12} /> {area.distanceFromCentre}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {area.options.map((opt) => (
                <div key={opt.name} className="bg-white border border-[#E8E3D8] rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-xl font-bold text-[#0D1B2A]">{opt.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[#2C3E50]/50 mt-1">
                          <span className="bg-[#1A4A30]/10 text-[#1A4A30] px-2 py-0.5 rounded-full font-medium">{opt.type}</span>
                          <span>{opt.address}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[#1A4A30] font-semibold text-sm">{opt.approxRate}</div>
                        <div className="text-[#2C3E50]/40 text-xs">{t('approxLabel')}</div>
                      </div>
                    </div>

                    <p className="text-[#2C3E50]/70 text-sm leading-relaxed mb-4">{opt.desc}</p>

                    <div className="mb-4">
                      <div className="text-xs text-[#2C3E50]/50 uppercase tracking-wider mb-2">{t('walkerFeaturesLabel')}</div>
                      <ul className="space-y-1">
                        {opt.walkerFriendly.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-[#2C3E50]/70">
                            <CheckCircle2 size={12} className="text-[#1A4A30] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={opt.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2 bg-[#1A4A30] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#2A6A45] transition-colors text-sm w-full"
                    >
                      <Bed size={14} />
                      {t('checkAvailabilityBtn')}
                    </a>
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
                <div className="w-8 h-8 bg-[#B8912A]/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#D4AE7A]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Network links */}
        <div className="grid sm:grid-cols-2 gap-6">
          <a href="https://www.thelakesguide.co.uk/accommodation" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#1A4A30]/30 transition-all card-hover">
            <Bed size={20} className="text-[#1A4A30] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">{t('lakesGuideLinkTitle')}</div>
              <div className="text-[#2C3E50]/55 text-sm">{t('lakesGuideLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
          <a href="https://www.thelakeswildlife.co.uk" target="_blank" rel="noopener noreferrer" className="group bg-white border border-[#E8E3D8] rounded-xl p-5 flex items-center gap-4 hover:border-[#2E6B3E]/30 transition-all card-hover">
            <Bed size={20} className="text-[#2E6B3E] shrink-0" />
            <div>
              <div className="font-semibold text-[#0D1B2A] group-hover:text-[#1A4A30] transition-colors">{t('lakesWildlifeLinkTitle')}</div>
              <div className="text-[#2C3E50]/55 text-sm">{t('lakesWildlifeLinkDesc')}</div>
            </div>
            <ExternalLink size={14} className="text-[#2C3E50]/30 ml-auto shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
