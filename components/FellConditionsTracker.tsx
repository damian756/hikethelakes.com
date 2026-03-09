'use client';

import { useState } from 'react';
import { Wind, CheckCircle2, XCircle, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import type { Condition, FellConditionData } from '@/lib/conditions-data';
import type { WeatherData } from '@/lib/weather';

interface FellConditionsTrackerProps {
  conditions: FellConditionData[];
  weather: WeatherData | null;
  updatedDate: string;
}

const CONDITION_CONFIG: Record<Condition, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: typeof CheckCircle2;
  description: string;
}> = {
  clear: {
    label: 'Clear',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle2,
    description: 'Excellent visibility. Paths clear. Ideal for summit views.',
  },
  good: {
    label: 'Good',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: CheckCircle2,
    description: 'Good conditions. Check forecast for cloud base. Paths in good order.',
  },
  poor: {
    label: 'Poor',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertCircle,
    description: 'Limited visibility or path issues. Navigate with care.',
  },
  avoid: {
    label: 'Avoid',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: XCircle,
    description: 'Not recommended. High wind, ice, or severe weather. Stay low.',
  },
};

export default function FellConditionsTracker({ conditions, weather, updatedDate }: FellConditionsTrackerProps) {
  const [activeFilter, setActiveFilter] = useState<Condition | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? conditions
    : conditions.filter((c) => c.condition === activeFilter);

  return (
    <div className="space-y-8">
      {/* Status bar */}
      <div className="flex items-center justify-between bg-[#1A4A30]/8 border border-[#1A4A30]/20 rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#1A4A30]">
          <RefreshCw size={15} />
          <span>
            {weather
              ? 'Wind data live from Open-Meteo. Fell conditions updated manually each morning.'
              : 'Conditions updated manually each morning. Check MWIS and Met Office before setting out.'}
          </span>
        </div>
        <span className="text-[#3C4E42]/40 text-xs shrink-0">{updatedDate}</span>
      </div>

      {/* Wind summary */}
      {weather && (
        <div className="bg-[#4A7D9A]/8 border border-[#4A7D9A]/20 rounded-xl px-5 py-4 flex flex-wrap gap-6">
          <div>
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Live Wind — Lake District</div>
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-[#4A7D9A]" />
              <span className="font-display text-2xl font-bold text-[#0E1C14]">{weather.windSpeed}</span>
              <span className="text-[#3C4E42]/60 font-semibold">{weather.windDirection}</span>
            </div>
          </div>
          <div className="border-l border-[#4A7D9A]/20 pl-6">
            <div className="text-[#4A7D9A] text-xs uppercase tracking-wider mb-1 font-semibold">Updated</div>
            <div className="text-sm text-[#3C4E42]/70">Every 30 minutes — Open-Meteo</div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'clear', 'good', 'poor', 'avoid'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-[#0E1C14] text-white'
                : 'bg-white border border-[#D2D8CF] text-[#3C4E42] hover:border-[#0E1C14]/30'
            }`}
          >
            {filter === 'all' ? 'All Fells' : CONDITION_CONFIG[filter].label}
          </button>
        ))}
      </div>

      {/* Condition cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((fell) => {
          const config = CONDITION_CONFIG[fell.condition];
          const Icon = config.icon;
          return (
            <div
              key={fell.slug}
              className={`bg-white border-2 ${config.border} rounded-xl p-5`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-[#0E1C14] text-lg leading-tight">{fell.name}</h3>
                <div className={`flex items-center gap-1.5 ${config.bg} ${config.color} px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ml-2`}>
                  <Icon size={12} />
                  {config.label}
                </div>
              </div>

              <p className={`text-xs ${config.color} font-medium mb-3`}>{config.description}</p>

              {weather && (
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1.5 text-[#4A7D9A]">
                    <Wind size={13} />
                    <span className="font-medium">{weather.windSpeed}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#3C4E42]/60">
                    <Eye size={13} />
                    <span className="font-semibold text-[#0E1C14]">{weather.windDirection}</span>
                  </div>
                </div>
              )}

              <p className="text-[#3C4E42]/65 text-sm leading-relaxed border-t border-[#F0EDE6] pt-3">
                {fell.notes}
              </p>
            </div>
          );
        })}
      </div>

      {/* Condition legend */}
      <div className="bg-white border border-[#D2D8CF] rounded-xl p-5">
        <h3 className="font-semibold text-[#0E1C14] mb-4">Condition Guide</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.entries(CONDITION_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div key={key} className="flex items-start gap-3">
                <div className={`${config.bg} ${config.color} p-1.5 rounded`}>
                  <Icon size={14} />
                </div>
                <div>
                  <div className={`font-semibold text-sm ${config.color}`}>{config.label}</div>
                  <div className="text-[#3C4E42]/60 text-xs">{config.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
