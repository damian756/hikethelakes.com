'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Bed, Utensils, ChevronRight, Mountain } from 'lucide-react';
import { WALKING_ITINERARIES } from '@/lib/walking-itineraries';
import { FELLS } from '@/lib/fells';

type Days = 2 | 3 | 4;
type Budget = 'value' | 'standard' | 'premium';

const FELL_NAMES: Record<string, string> = Object.fromEntries(
  FELLS.map((f) => [f.slug, f.name])
);

export default function WalkingPlanner({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const [days, setDays] = useState<Days>(3);
  const [budget, setBudget] = useState<Budget>('standard');

  const filtered = WALKING_ITINERARIES.filter(
    (it) => it.days === days && it.budget === budget
  );
  const fallback = WALKING_ITINERARIES.filter((it) => it.days === days);

  const results = filtered.length > 0 ? filtered : fallback;

  return (
    <div className="space-y-8">
      <div className="bg-white border border-[#D2D8CF] rounded-2xl p-6 md:p-8">
        <h3 className="font-display text-lg font-bold text-[#0E1C14] mb-4">Filter walking circuits</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#3C4E42]/60 uppercase tracking-wider mb-2">Days</label>
            <div className="flex gap-2">
              {([2, 3, 4] as Days[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    days === d ? 'bg-[#0E1C14] text-white' : 'bg-[#EAEDE8] text-[#3C4E42] hover:bg-[#D2D8CF]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#3C4E42]/60 uppercase tracking-wider mb-2">Budget</label>
            <div className="flex gap-2">
              {(['value', 'standard', 'premium'] as Budget[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    budget === b ? 'bg-[#0E1C14] text-white' : 'bg-[#EAEDE8] text-[#3C4E42] hover:bg-[#D2D8CF]'
                  }`}
                >
                  {b === 'value' ? '£' : b === 'standard' ? '££' : '£££'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((it) => (
            <div key={it.id} className="bg-white rounded-2xl border border-[#D2D8CF] overflow-hidden shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-[#1A4A30] via-[#9E762A] to-[#1A4A30]" />
              <div className="p-6">
                <h4 className="font-display text-xl font-bold text-[#0E1C14]">{it.title}</h4>
                <p className="text-[#1A4A30] font-medium mt-1">{it.subtitle}</p>
                <p className="text-[#3C4E42]/70 text-sm mt-3">{it.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.fells.map((slug) => (
                    <Link
                      key={slug}
                      href={`${prefix}/fells/${slug}`}
                      className="inline-flex items-center gap-1 text-sm text-[#1A4A30] font-medium hover:text-[#9E762A]"
                    >
                      <Mountain size={12} />
                      {FELL_NAMES[slug] ?? slug}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#3C4E42]/60 text-sm">No circuits match. Try adjusting the filters.</p>
      )}
    </div>
  );
}
