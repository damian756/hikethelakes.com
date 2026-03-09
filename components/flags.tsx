import { useId } from 'react';

function FlagBase({ children }: { children: React.ReactNode }) {
  const clipId = useId();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14" className="rounded-sm overflow-hidden shrink-0">
      <defs><clipPath id={clipId}><rect width="20" height="14" rx="2" /></clipPath></defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </svg>
  );
}

function HStripes({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return <FlagBase><rect width="20" height="4.67" fill={c1}/><rect y="4.67" width="20" height="4.67" fill={c2}/><rect y="9.33" width="20" height="4.67" fill={c3}/></FlagBase>;
}

function VStripes({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return <FlagBase><rect width="6.67" height="14" fill={c1}/><rect x="6.67" width="6.67" height="14" fill={c2}/><rect x="13.33" width="6.67" height="14" fill={c3}/></FlagBase>;
}

export function FlagGB() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#012169"/>
      <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8"/>
      <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.4"/>
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4.2"/>
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.4"/>
    </FlagBase>
  );
}

export function FlagDE() { return <HStripes c1="#000" c2="#DD0000" c3="#FFCC00"/>; }
export function FlagFR() { return <VStripes c1="#002654" c2="#fff" c3="#CE1126"/>; }

export function FlagES() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#AA151B"/>
      <rect y="3.5" width="20" height="7" fill="#F1BF00"/>
    </FlagBase>
  );
}

export function FlagIT() { return <VStripes c1="#009246" c2="#fff" c3="#CE2B37"/>; }

export function FlagPT() {
  return (
    <FlagBase>
      <rect width="8" height="14" fill="#006600"/>
      <rect x="8" width="12" height="14" fill="#FF0000"/>
      <circle cx="8" cy="7" r="2.5" fill="#FFCC00"/>
    </FlagBase>
  );
}

export function FlagNL() { return <HStripes c1="#AE1C28" c2="#fff" c3="#21468B"/>; }

export function FlagSE() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#006AA7"/>
      <rect x="6" width="2.5" height="14" fill="#FECC00"/>
      <rect y="5.5" width="20" height="3" fill="#FECC00"/>
    </FlagBase>
  );
}

export function FlagDK() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#C60C30"/>
      <rect x="6" width="2" height="14" fill="#fff"/>
      <rect y="6" width="20" height="2" fill="#fff"/>
    </FlagBase>
  );
}

export function FlagNO() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#BA0C2F"/>
      <rect x="6" width="3" height="14" fill="#fff"/>
      <rect y="5.5" width="20" height="3" fill="#fff"/>
      <rect x="6.5" width="2" height="14" fill="#00205B"/>
      <rect y="6" width="20" height="2" fill="#00205B"/>
    </FlagBase>
  );
}

export function FlagFI() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#fff"/>
      <rect x="5.5" width="3" height="14" fill="#003580"/>
      <rect y="5.5" width="20" height="3" fill="#003580"/>
    </FlagBase>
  );
}

export function FlagPL() {
  return (
    <FlagBase>
      <rect width="20" height="7" fill="#fff"/>
      <rect y="7" width="20" height="7" fill="#DC143C"/>
    </FlagBase>
  );
}

export function FlagJP() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#fff"/>
      <circle cx="10" cy="7" r="3.5" fill="#BC002D"/>
    </FlagBase>
  );
}

export function FlagKR() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#fff"/>
      <circle cx="10" cy="7" r="3" fill="#CD2E3A"/>
      <path d="M10 7a3 3 0 0 1 0-3 1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 1 0 3 3 3 0 0 1 0-3z" fill="#0047A0"/>
    </FlagBase>
  );
}

export function FlagCN() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#DE2910"/>
      <polygon points="4,2 4.6,3.8 6.5,3.8 5,4.9 5.6,6.7 4,5.6 2.4,6.7 3,4.9 1.5,3.8 3.4,3.8" fill="#FFDE00"/>
    </FlagBase>
  );
}

export function FlagSA() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#006C35"/>
      <rect x="4" y="4" width="12" height="6" rx="1" fill="none" stroke="#fff" strokeWidth="0.5"/>
      <text x="10" y="9.5" textAnchor="middle" fontSize="4" fill="#fff" fontFamily="serif">لا إله</text>
    </FlagBase>
  );
}

export function FlagWales() {
  return (
    <FlagBase>
      <rect width="20" height="7" fill="#fff"/>
      <rect y="7" width="20" height="7" fill="#00AB39"/>
      <text x="10" y="10" textAnchor="middle" fontSize="9" fill="#D4003C" fontWeight="bold">Y</text>
    </FlagBase>
  );
}

export function FlagCA() {
  return (
    <FlagBase>
      <rect width="20" height="14" fill="#FCDD09"/>
      <rect width="20" height="3.5" fill="#DA121A"/>
      <rect y="10.5" width="20" height="3.5" fill="#DA121A"/>
    </FlagBase>
  );
}

export const FLAGS: Record<string, () => React.JSX.Element> = {
  en: FlagGB,
  de: FlagDE,
  fr: FlagFR,
  es: FlagES,
  it: FlagIT,
  pt: FlagPT,
  nl: FlagNL,
  sv: FlagSE,
  da: FlagDK,
  no: FlagNO,
  fi: FlagFI,
  pl: FlagPL,
  ja: FlagJP,
  ko: FlagKR,
  zh: FlagCN,
  ar: FlagSA,
  cy: FlagWales,
  ca: FlagCA,
};
