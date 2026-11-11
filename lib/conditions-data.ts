// General route notes for popular fells, shown on /conditions with the current
// valley wind from Open-Meteo. These are NOT daily conditions and the page says so.
// (Until Nov 2026 this file held fixed "good" and "clear" statuses written in
// March 2026, which the page showed under today's date as the day's conditions.)

import { FELLS } from './fells';

export interface FellNote {
  slug: string;
  name: string;
  notes: string;
}

const NOTES: Record<string, string> = {
  'scafell-pike': 'The summit plateau is a navigation challenge in cloud. Check the forecast for the cloud base.',
  helvellyn: 'Striding Edge and Swirral Edge are exposed scrambles. In winter conditions they become winter climbing routes needing an ice axe and crampons.',
  skiddaw: 'Tourist path from the Latrigg car park. The upper mountain is exposed to the wind.',
  blencathra: "Sharp Edge needs experience and becomes slippery and dangerous when wet, windy or icy. Hall's Fell Ridge is the alternative.",
  'great-gable': 'Routes from Wasdale Head and Honister. The summit boulder field needs a compass in mist.',
  catbells: 'Popular path. Busy at weekends. Good for families.',
  'coniston-old-man': 'Path from Coniston village. Lake views from the summit.',
  fairfield: 'The Fairfield Horseshoe from Ambleside is a full day walk.',
  'high-street': 'The line of the Roman road runs along the ridge.',
  'grisedale-pike': 'Path from Braithwaite. The Coledale round continues from the summit.',
  bowfell: 'Three Tarns route. Rocky in places. Check the cloud base.',
  'crinkle-crags': 'The Bad Step needs care and can be bypassed.',
  'pike-o-stickle': 'Langdale approach. Scramble near the summit.',
  'harrison-stickle': "Langdale Pikes. Often combined with Pike o'Stickle.",
  'causey-pike': 'Short scramble to the summit. Start from Braithwaite or Stair.',
  'red-pike-buttermere': 'High Stile ridge. Steep descent to Buttermere.',
  'dale-head': 'Path from Honister or Newlands.',
  wetherlam: 'Coniston approach. Old copper mine workings on the way.',
  'ill-bell': 'Part of the Kentmere Horseshoe ridge walk.',
  'place-fell': 'Patterdale start. Views over Ullswater.',
};

export const CONDITIONS_DATA: FellNote[] = FELLS.filter((fell) => NOTES[fell.slug]).map((fell) => ({
  slug: fell.slug,
  name: fell.name,
  notes: NOTES[fell.slug],
}));
