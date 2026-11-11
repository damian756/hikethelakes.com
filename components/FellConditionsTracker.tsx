import Link from 'next/link';
import { Wind, ExternalLink } from 'lucide-react';
import type { FellNote } from '@/lib/conditions-data';
import type { WeatherData } from '@/lib/weather';

interface FellConditionsTrackerProps {
  conditions: FellNote[];
  weather: WeatherData | null;
}

// Where today's mountain conditions are published. This page does not report them.
const FORECASTS = [
  {
    name: 'MWIS: Lake District',
    href: 'https://www.mwis.org.uk/forecasts/english-and-welsh/lake-district',
    desc: 'Mountain Weather Information Service forecast for the fells.',
  },
  {
    name: 'Met Office mountain forecast',
    href: 'https://weather.metoffice.gov.uk/specialist-forecasts/mountain/lake-district',
    desc: 'The Met Office forecast for the Lake District mountains.',
  },
  {
    name: 'Weatherline',
    href: 'https://www.lakedistrict.gov.uk/explore/plan-your-visit/lake-district-weather/weatherline/',
    desc: 'Lake District National Park. From December to April, a daily report from the summit of Helvellyn.',
  },
];

export default function FellConditionsTracker({ conditions, weather }: FellConditionsTrackerProps) {
  return (
    <div className="space-y-8">
      {/* What this page is, and where the real conditions are */}
      <div className="bg-white border border-[#D2D8CF] rounded-xl p-5 md:p-6">
        <h2 className="font-display text-xl font-bold text-[#0E1C14] mb-2">Today&apos;s conditions on the fells</h2>
        <p className="text-sm text-[#3C4E42]/75 leading-relaxed mb-5">
          This page does not report live conditions on the fells. Check one of these before you set out.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {FORECASTS.map((f) => (
            <a
              key={f.href}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[#D2D8CF] rounded-lg p-4 hover:border-[#1A4A30]/40 transition-colors"
            >
              <div className="flex items-center gap-1.5 font-semibold text-[#1A4A30] text-sm group-hover:text-[#9E762A] transition-colors">
                {f.name} <ExternalLink size={12} />
              </div>
              <p className="text-xs text-[#3C4E42]/65 mt-1 leading-relaxed">{f.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Wind now: one Open-Meteo model point, about 543 m (lib/weather.ts) */}
      {weather && (
        <div className="bg-[#4A7D9A]/8 border border-[#4A7D9A]/20 rounded-xl px-5 py-4 flex flex-wrap gap-6">
          <div>
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Wind now near Grasmere</div>
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-[#4A7D9A]" />
              <span className="font-display text-2xl font-bold text-[#0E1C14]">{weather.windSpeed}</span>
              <span className="text-[#3C4E42]/60 font-semibold">{weather.windDirection}</span>
            </div>
          </div>
          <div className="border-l border-[#4A7D9A]/20 pl-6 max-w-md">
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Source</div>
            <div className="text-sm text-[#3C4E42]/70">
              Open-Meteo model for one point about 4 km west of Grasmere, around 540 m up, refreshed every 30 minutes. Wind on the summits is often much stronger.
            </div>
          </div>
        </div>
      )}

      {/* General route notes */}
      <div>
        <h2 className="font-display text-xl font-bold text-[#0E1C14] mb-1">Notes on popular fells</h2>
        <p className="text-sm text-[#3C4E42]/65 mb-4">General route notes, not today&apos;s conditions.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {conditions.map((fell) => (
            <Link
              key={fell.slug}
              href={`/fells/${fell.slug}`}
              className="bg-white border border-[#D2D8CF] rounded-xl p-5 hover:border-[#1A4A30]/40 transition-colors"
            >
              <h3 className="font-display font-bold text-[#0E1C14] text-lg leading-tight mb-2">{fell.name}</h3>
              <p className="text-[#3C4E42]/70 text-sm leading-relaxed">{fell.notes}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
