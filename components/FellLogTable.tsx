'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export interface FellLogRow {
  slug: string;
  name: string;
  height: number;
  gridRef: string;
  /** Sort key for the grid reference: easting and northing in metres. */
  easting: number;
  northing: number;
  area: string;
  book: number;
  hasGuide: boolean;
}

type SortKey = 'name' | 'height' | 'gridRef' | 'area' | 'book';
type Direction = 'ascending' | 'descending';

// Area repeats the book (each book is one area), so it is hidden on phones to keep the table on screen.
const COLUMNS: { key: SortKey; label: string; numeric?: boolean; wide?: boolean }[] = [
  { key: 'name', label: 'Fell' },
  { key: 'height', label: 'Height', numeric: true },
  { key: 'gridRef', label: 'Grid ref' },
  { key: 'area', label: 'Area', wide: true },
  { key: 'book', label: 'Book', numeric: true },
];

function compare(a: FellLogRow, b: FellLogRow, key: SortKey): number {
  switch (key) {
    case 'name':
      return a.name.localeCompare(b.name, 'en-GB');
    case 'height':
      return a.height - b.height;
    case 'gridRef':
      return a.easting - b.easting || a.northing - b.northing;
    case 'area':
      return a.area.localeCompare(b.area, 'en-GB') || b.height - a.height;
    case 'book':
      return a.book - b.book || b.height - a.height;
  }
}

/** The 214 Wainwrights as a table; every column header is a button that sorts it. */
export default function FellLogTable({ rows, guideLabel }: { rows: FellLogRow[]; guideLabel: string }) {
  const [sortKey, setSortKey] = useState<SortKey>('height');
  const [direction, setDirection] = useState<Direction>('descending');

  const sorted = useMemo(() => {
    const out = [...rows].sort((a, b) => compare(a, b, sortKey));
    return direction === 'descending' ? out.reverse() : out;
  }, [rows, sortKey, direction]);

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortKey(key);
      setDirection(key === 'height' ? 'descending' : 'ascending');
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D2D8CF] overflow-x-auto">
      <table className="w-full sm:min-w-[560px] text-sm">
        <caption className="sr-only">
          The 214 Wainwright fells. Select a column heading to sort the table by that column.
        </caption>
        <thead>
          <tr className="border-b border-[#D2D8CF] bg-[#EAEDE8]/60">
            {COLUMNS.map((col) => {
              const active = col.key === sortKey;
              const Icon = active ? (direction === 'ascending' ? ArrowUp : ArrowDown) : ArrowUpDown;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={active ? direction : 'none'}
                  className={`px-2 sm:px-4 py-3 font-semibold text-[#0E1C14] whitespace-nowrap ${col.numeric ? 'text-right' : 'text-left'} ${col.wide ? 'hidden sm:table-cell' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => sortBy(col.key)}
                    className={`inline-flex items-center gap-1.5 rounded hover:text-[#1A4A30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A4A30] ${col.numeric ? 'flex-row-reverse' : ''}`}
                  >
                    {col.label}
                    <Icon size={13} aria-hidden="true" className={active ? 'text-[#1A4A30]' : 'hidden sm:inline text-[#3C4E42]/40'} />
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.slug} className="border-b border-[#EAEDE8] last:border-0 hover:bg-[#EAEDE8]/40">
              <th scope="row" className="px-2 sm:px-4 py-2.5 text-left font-medium">
                <Link href={`/fells/${row.slug}`} className="text-[#1A4A30] hover:text-[#9E762A] transition-colors">
                  {row.name}
                </Link>
                {row.hasGuide && <span className="block sm:inline sm:ml-2 text-xs font-normal text-[#9E762A]">{guideLabel}</span>}
              </th>
              <td className="px-2 sm:px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{row.height} m</td>
              <td className="px-2 sm:px-4 py-2.5 font-mono text-xs whitespace-nowrap">{row.gridRef}</td>
              <td className="hidden sm:table-cell px-2 sm:px-4 py-2.5 whitespace-nowrap">{row.area}</td>
              <td className="px-2 sm:px-4 py-2.5 text-right tabular-nums">{row.book}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
