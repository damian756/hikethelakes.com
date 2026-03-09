'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const OPEN_DATE = new Date('2026-07-16T06:30:00Z');

function getTimeLeft() {
  const now = new Date();
  const diff = OPEN_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function OpenCountdown({ variant = 'default' }: { variant?: 'default' | 'compact' | 'hero' }) {
  const [time, setTime] = useState(getTimeLeft);
  const t = useTranslations('open');

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 text-sm font-mono">
        {[
          { val: time.days, label: t('days') },
          { val: time.hours, label: t('hours') },
          { val: time.minutes, label: t('minutes') },
        ].map(({ val, label }) => (
          <span key={label} className="text-[#B8912A] font-bold">
            {String(val).padStart(2, '0')}<span className="text-[#D4AE7A] font-normal text-xs ml-0.5">{label}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="flex gap-4 md:gap-6 justify-center">
        {[
          { val: time.days, label: t('days') },
          { val: time.hours, label: t('hours') },
          { val: time.minutes, label: t('minutes') },
          { val: time.seconds, label: t('seconds') },
        ].map(({ val, label }) => (
          <div key={label} className="text-center">
            <div className="text-4xl md:text-6xl font-display font-bold text-white tabular-nums leading-none">
              {String(val).padStart(2, '0')}
            </div>
            <div className="text-[#D4AE7A] text-xs uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center">
      {[
        { val: time.days, label: t('days') },
        { val: time.hours, label: t('hours') },
        { val: time.minutes, label: t('minutes') },
        { val: time.seconds, label: t('seconds') },
      ].map(({ val, label }) => (
        <div key={label} className="text-center bg-[#0D1B2A]/80 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[64px]">
          <div className="text-3xl font-display font-bold text-white tabular-nums leading-none">
            {String(val).padStart(2, '0')}
          </div>
          <div className="text-[#D4AE7A] text-xs uppercase tracking-wider mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
