'use client';

import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const pathname = usePathname();
  // Non-en locales are blocked until launch. Always link to English site.
  const prefix = '';
  const t = useTranslations('notFound');

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#EAEDE8]">
      <div className="text-center px-4">
        <div className="font-display text-9xl font-bold text-[#D2D8CF] mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-[#0E1C14] mb-3">{t('heading')}</h1>
        <p className="text-[#3C4E42]/65 mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`${prefix}/`} className="inline-flex items-center gap-2 bg-[#1A4A30] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#2A6A45] transition-colors">
            {t('backHomeBtn')}
          </Link>
          <Link href={`${prefix}/fells`} className="inline-flex items-center gap-2 border border-[#0E1C14] text-[#0E1C14] font-semibold px-6 py-3 rounded-lg hover:bg-[#0E1C14] hover:text-white transition-colors">
            <Trophy size={16} /> {t('courseGuidesBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
