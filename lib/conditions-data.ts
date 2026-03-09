// Fell conditions for Lake District weather and visibility.
// Wind data fetched from Open-Meteo. Update conditions manually each morning.

export type Condition = 'clear' | 'good' | 'poor' | 'avoid';

export interface FellConditionData {
  slug: string;
  name: string;
  condition: Condition;
  notes: string;
}

export const CONDITIONS_DATA: FellConditionData[] = [
  { slug: 'scafell-pike', name: 'Scafell Pike', condition: 'good', notes: 'Path clear. Summit visibility good. Check forecast for cloud base.' },
  { slug: 'helvellyn', name: 'Helvellyn', condition: 'good', notes: 'Striding Edge dry. Ridge walk recommended.' },
  { slug: 'skiddaw', name: 'Skiddaw', condition: 'clear', notes: 'Tourist path in good condition. Summit views clear.' },
  { slug: 'blencathra', name: 'Blencathra', condition: 'good', notes: 'Sharp Edge requires experience. Halls Fell Ridge alternative.' },
  { slug: 'great-gable', name: 'Great Gable', condition: 'good', notes: 'Path from Honister straightforward. Summit cairn visible.' },
  { slug: 'catbells', name: 'Catbells', condition: 'clear', notes: 'Popular path. Busy at weekends. Good for families.' },
  { slug: 'coniston-old-man', name: 'Coniston Old Man', condition: 'good', notes: 'Path from Coniston village clear. Lake views from summit.' },
  { slug: 'fairfield', name: 'Fairfield', condition: 'good', notes: 'Fairfield horseshoe in good condition. Full day walk.' },
  { slug: 'high-street', name: 'High Street', condition: 'good', notes: 'Roman road from Patterdale. Ridge clear.' },
  { slug: 'grisedale-pike', name: 'Grisedale Pike', condition: 'good', notes: 'Path from Braithwaite clear. Coledale round possible.' },
];
