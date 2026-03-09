export interface WalkingItinerary {
  id: string;
  title: string;
  subtitle: string;
  days: number;
  budget: 'value' | 'standard' | 'premium';
  difficulty: 'easy' | 'moderate' | 'challenging';
  description: string;
  fells: string[];
  accommodation: string;
  dining: string;
  estimatedCost: string;
}

export const WALKING_ITINERARIES: WalkingItinerary[] = [
  {
    id: 'classic-southern',
    title: 'Classic Southern Fells',
    subtitle: 'Scafell Pike, Great Gable and the Langdale Pikes',
    days: 3,
    budget: 'standard',
    difficulty: 'challenging',
    description: 'Three days of serious fell walking. Scafell Pike from Wasdale, Great Gable from Honister, and a day on the Langdale Pikes. Base in Ambleside or Langdale.',
    fells: ['scafell-pike', 'great-gable', 'harrison-stickle'],
    accommodation: 'Ambleside or Langdale. Plenty of B&Bs and the Old Dungeon Ghyll for classic pub atmosphere.',
    dining: 'Old Dungeon Ghyll, Sticklebarn, Wainwrights Inn.',
    estimatedCost: '£150–£200pp (accommodation + food)',
  },
  {
    id: 'helvellyn-circuit',
    title: 'Helvellyn and the Eastern Fells',
    subtitle: 'Striding Edge, Fairfield and High Street',
    days: 3,
    budget: 'standard',
    difficulty: 'challenging',
    description: 'Three days of ridge walking. Striding Edge on Helvellyn, the Fairfield horseshoe, and High Street from Patterdale. Base in Glenridding or Patterdale.',
    fells: ['helvellyn', 'fairfield', 'high-street'],
    accommodation: 'Glenridding or Patterdale. Good range of B&Bs and the Travellers Rest inn.',
    dining: 'Travellers Rest, Glenridding Hotel, Patterdale Hotel.',
    estimatedCost: '£140–£180pp',
  },
  {
    id: 'northern-intro',
    title: 'Northern Fells Introduction',
    subtitle: 'Skiddaw, Blencathra and Catbells',
    days: 3,
    budget: 'value',
    difficulty: 'moderate',
    description: 'Accessible introduction to the Lakes. Skiddaw via the tourist path, Blencathra via Sharp Edge or Halls Fell, and Catbells for the classic view. Base in Keswick.',
    fells: ['skiddaw', 'blencathra', 'catbells'],
    accommodation: 'Keswick. Wide choice of B&Bs and hostels. Good transport links.',
    dining: 'The Dog and Gun, The Old Keswickian, George Fisher.',
    estimatedCost: '£100–£150pp',
  },
  {
    id: 'western-circuit',
    title: 'Western Fells and Coniston',
    subtitle: 'Coniston Old Man, Wetherlam and the Buttermere fells',
    days: 4,
    budget: 'premium',
    difficulty: 'challenging',
    description: 'Four days of varied walking. Coniston Old Man, Wetherlam, Red Pike (Buttermere) and Dale Head. Base in Coniston and Buttermere.',
    fells: ['coniston-old-man', 'wetherlam', 'red-pike-buttermere', 'dale-head'],
    accommodation: 'Coniston and Buttermere. The Black Bull in Coniston, Bridge Hotel in Buttermere.',
    dining: 'Black Bull Coniston, Bridge Hotel Buttermere, Kirkstile Inn.',
    estimatedCost: '£200–£280pp',
  },
  {
    id: 'family-friendly',
    title: 'Family-Friendly Lakes',
    subtitle: 'Catbells, Latrigg and gentle valley walks',
    days: 2,
    budget: 'value',
    difficulty: 'easy',
    description: 'Two days of accessible walking. Catbells for the classic view, Latrigg for a short summit, and a valley walk. Suitable for families with older children.',
    fells: ['catbells'],
    accommodation: 'Keswick or Portinscale. Family-friendly B&Bs and self-catering.',
    dining: 'Cafe in the Park, The Lakes Bar and Bistro.',
    estimatedCost: '£80–£120pp',
  },
  {
    id: 'two-day-standard',
    title: 'Two-Day Standard Circuit',
    subtitle: 'Helvellyn and Catbells',
    days: 2,
    budget: 'standard',
    difficulty: 'moderate',
    description: 'Two days of solid walking. Helvellyn via Striding Edge on day one, Catbells from Keswick on day two. Base in Glenridding or Keswick.',
    fells: ['helvellyn', 'catbells'],
    accommodation: 'Glenridding or Keswick. B&Bs and inns with good walker facilities.',
    dining: 'Travellers Rest, The Dog and Gun, George Fisher.',
    estimatedCost: '£120–£160pp',
  },
  {
    id: 'two-day-premium',
    title: 'Two-Day Premium Circuit',
    subtitle: 'Scafell Pike and Great Gable',
    days: 2,
    budget: 'premium',
    difficulty: 'challenging',
    description: 'Two days of serious fell walking. Scafell Pike from Wasdale on day one, Great Gable from Honister on day two. Base at Wasdale Head Inn or Borrowdale.',
    fells: ['scafell-pike', 'great-gable'],
    accommodation: 'Wasdale Head Inn or Borrowdale. Premium inns with boot drying and early breakfast.',
    dining: 'Wasdale Head Inn, Honister Slate Mine cafe, Borrowdale Hotel.',
    estimatedCost: '£180–£240pp',
  },
  {
    id: 'four-day-standard',
    title: 'Four-Day Standard Circuit',
    subtitle: 'Southern, Eastern and Northern highlights',
    days: 4,
    budget: 'standard',
    difficulty: 'challenging',
    description: 'Four days covering the best of the Lakes. Scafell Pike, Helvellyn, Skiddaw and Catbells. Base in Ambleside or Keswick with one night in Wasdale or Patterdale.',
    fells: ['scafell-pike', 'helvellyn', 'skiddaw', 'catbells'],
    accommodation: 'Ambleside, Keswick, Glenridding. Standard B&Bs with good transport links.',
    dining: 'Old Dungeon Ghyll, Travellers Rest, The Dog and Gun, George Fisher.',
    estimatedCost: '£160–£220pp',
  },
  {
    id: 'four-day-value',
    title: 'Four-Day Value Circuit',
    subtitle: 'Catbells, Blencathra, Fairfield and Coniston Old Man',
    days: 4,
    budget: 'value',
    difficulty: 'moderate',
    description: 'Four days of varied walking on a budget. Catbells, Blencathra, Fairfield and Coniston Old Man. Base in Keswick with hostels or budget B&Bs.',
    fells: ['catbells', 'blencathra', 'fairfield', 'coniston-old-man'],
    accommodation: 'Keswick YHA or budget B&Bs. Good bus links for day trips.',
    dining: 'The Dog and Gun, Kirkstile Inn, Black Bull Coniston.',
    estimatedCost: '£100–£150pp',
  },
];

export function getItineraryById(id: string): WalkingItinerary | undefined {
  return WALKING_ITINERARIES.find((it) => it.id === id);
}
