export interface BlogAuthor {
  name: string;
  bio: string;
  jobTitle: string;
  url: string;
  schemaId: string;
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  /** Path relative to /public, e.g. '/images/courses/hillside.jpg' */
  image?: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'hr' };

// ── Author ────────────────────────────────────────────────────────────────────

export const DAMIAN: BlogAuthor = {
  name: 'Damian Roche',
  jobTitle: 'Founder, Churchtown Media & HikeTheLakes.com',
  bio: "Damian has been walking the Lake District fells for decades. Ex-army, self-taught in SEO, and based in Southport. He's fished the tarns, walked Helvellyn more times than he can count, and built HikeTheLakes because he couldn't find a guide that was honest about conditions and effort. He founded Churchtown Media and runs the Lakes Network.",
  url: 'https://www.churchtownmedia.co.uk/about',
  schemaId: 'https://www.churchtownmedia.co.uk/about#founder',
};

// ── Categories ────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'fell-guides',
    label: 'Fell Guides',
    description: 'Route notes, conditions, and honest accounts of walking the Wainwright fells — what to expect, what to bring, and what the books do not tell you.',
  },
  {
    slug: 'wainwrights',
    label: 'Wainwrights',
    description: 'The 214 fells, the bagging culture, the completionist obsession. Practical guides written by someone who has actually done the routes.',
  },
  {
    slug: 'conditions',
    label: 'Conditions & Weather',
    description: 'Fell conditions, seasonal walking advice, and what changes in the Lake District when the weather turns.',
  },
  {
    slug: 'fishing',
    label: 'Fishing',
    description: 'Tarn and lake fishing in the Lake District — where to go, what to expect, and how still water fishing differs from the coast.',
  },
  {
    slug: 'practical',
    label: 'Practical Guides',
    description: 'Kit, navigation, accommodation, and everything else you need to plan a Lakes trip properly.',
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.categorySlug === categorySlug);
}

function toIso(dateStr: string): string {
  const MONTHS: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  const [day, mon, year] = dateStr.split(' ');
  return `${year}-${MONTHS[mon] ?? '01'}-${day.padStart(2, '0')}`;
}

export function getIsoDate(post: BlogPost): string {
  return toIso(post.date);
}
