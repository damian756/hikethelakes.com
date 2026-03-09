// Fell conditions for Lake District weather and visibility.
// Wind data fetched from Open-Meteo. Update conditions manually each morning.
// Derived from FELLS; custom notes override scaffold for featured/popular fells.

import { FELLS } from './fells';

export type Condition = 'clear' | 'good' | 'poor' | 'avoid';

export interface FellConditionData {
  slug: string;
  name: string;
  condition: Condition;
  notes: string;
}

const CUSTOM_CONDITIONS: Record<string, { condition: Condition; notes: string }> = {
  'scafell-pike': { condition: 'good', notes: 'Path clear. Summit visibility good. Check forecast for cloud base.' },
  helvellyn: { condition: 'good', notes: 'Striding Edge dry. Ridge walk recommended.' },
  skiddaw: { condition: 'clear', notes: 'Tourist path in good condition. Summit views clear.' },
  blencathra: { condition: 'good', notes: 'Sharp Edge requires experience. Halls Fell Ridge alternative.' },
  'great-gable': { condition: 'good', notes: 'Path from Honister straightforward. Summit cairn visible.' },
  catbells: { condition: 'clear', notes: 'Popular path. Busy at weekends. Good for families.' },
  'coniston-old-man': { condition: 'good', notes: 'Path from Coniston village clear. Lake views from summit.' },
  fairfield: { condition: 'good', notes: 'Fairfield horseshoe in good condition. Full day walk.' },
  'high-street': { condition: 'good', notes: 'Roman road from Patterdale. Ridge clear.' },
  'grisedale-pike': { condition: 'good', notes: 'Path from Braithwaite clear. Coledale round possible.' },
  bowfell: { condition: 'good', notes: 'Three Tarns route clear. Rocky in places. Check cloud base.' },
  'crinkle-crags': { condition: 'good', notes: 'Bad Step requires care. Ridge walk in good order.' },
  'pike-o-stickle': { condition: 'good', notes: 'Langdale approach. Scramble near summit. Popular with climbers.' },
  'harrison-stickle': { condition: 'good', notes: 'Langdale Pikes. Path clear. Often combined with Pike o Stickle.' },
  'causey-pike': { condition: 'good', notes: 'Path from Braithwaite. Ridge clear. Coledale round possible.' },
  'red-pike-buttermere': { condition: 'good', notes: 'High Stile ridge. Path clear. Steep descent to Buttermere.' },
  'dale-head': { condition: 'good', notes: 'Path from Honister or Newlands. Summit cairn visible.' },
  wetherlam: { condition: 'good', notes: 'Coniston approach. Path clear. Copper mines en route.' },
  'ill-bell': { condition: 'good', notes: 'Kentmere horseshoe. Ridge walk in good condition.' },
  'place-fell': { condition: 'good', notes: 'Patterdale start. Path clear. Views over Ullswater.' },
};

export const CONDITIONS_DATA: FellConditionData[] = FELLS.map((fell) => {
  const custom = CUSTOM_CONDITIONS[fell.slug];
  return {
    slug: fell.slug,
    name: fell.name,
    condition: custom?.condition ?? 'good',
    notes: custom?.notes ?? 'Check MWIS before you go.',
  };
});
