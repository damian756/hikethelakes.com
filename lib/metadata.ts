import type { Metadata } from 'next';

const BASE_URL = 'https://www.hikethelakes.com';
const SITE_NAME = 'Hike The Lakes';

// public/og-default.jpg (a PNG, 1376 x 768): the share image for pages without their own photo.
const DEFAULT_IMAGE = {
  url: `${BASE_URL}/og-default.jpg`,
  width: 1376,
  height: 768,
  alt: 'Hike The Lakes: Lake District fell guides',
};

export { BASE_URL, SITE_NAME };

/**
 * The site's one Organization for JSON-LD, the same on every page that names it (the
 * home page graph, and as publisher of posts and walking circuits). Churchtown Media
 * Ltd publishes the site. The sister sites are linked in the footer, not listed as
 * sameAs: they are not the same organisation.
 */
export const SITE_ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: { '@type': 'ImageObject', url: `${BASE_URL}/icon-512.png`, width: 512, height: 512 },
  parentOrganization: {
    '@type': 'Organization',
    '@id': 'https://www.churchtownmedia.co.uk/#organization',
    name: 'Churchtown Media',
    url: 'https://www.churchtownmedia.co.uk',
    sameAs: ['https://www.linkedin.com/company/churchtownmedia'],
  },
};

/** A page's own address on the www host: its canonical, og:url and sitemap URL. */
export function pageUrl(pagePath: string) {
  return pagePath === '/' || pagePath === '' ? BASE_URL : `${BASE_URL}${pagePath}`;
}

/**
 * The site serves English only (i18n/routing.ts), so a page has one canonical and no
 * hreflang alternates. The RSS link sits here because a page's `alternates` replaces the
 * layout's.
 */
export function buildAlternates(pagePath: string, { canonical = true } = {}) {
  return {
    ...(canonical && { canonical: pageUrl(pagePath) }),
    types: { 'application/rss+xml': `${BASE_URL}/feed` },
  };
}

type ShareImage = { url: string; alt: string; width?: number; height?: number };

/**
 * Title, description, canonical and share tags for one page. A page's `openGraph` and
 * `twitter` replace the layout's whole objects, so each page sets them here; otherwise
 * og:url, og:title and the share image fell back to the home page's.
 */
export function pageMetadata({
  path,
  title,
  description,
  shareTitle,
  image,
  article,
  noindex = false,
}: {
  path: string;
  /** The <title>. The layout template adds " | Hike The Lakes" unless it is absolute. */
  title: string | { absolute: string };
  description?: string;
  /** og:title and twitter:title; defaults to the title. */
  shareTitle?: string;
  image?: ShareImage;
  article?: { publishedTime: string; modifiedTime: string; authors: string[]; section?: string };
  /** Deliberately noindex pages (privacy, terms): no canonical. */
  noindex?: boolean;
}): Metadata {
  const url = pageUrl(path);
  const ogTitle = shareTitle ?? (typeof title === 'string' ? title : title.absolute);
  const images = [image ?? DEFAULT_IMAGE];
  const shared = { url, siteName: SITE_NAME, locale: 'en_GB', title: ogTitle, description, images };

  return {
    title,
    ...(description && { description }),
    alternates: buildAlternates(path, { canonical: !noindex }),
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: article ? { type: 'article', ...shared, ...article } : { type: 'website', ...shared },
    twitter: { card: 'summary_large_image', title: ogTitle, description, images },
  };
}
