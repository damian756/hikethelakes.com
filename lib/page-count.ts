// Plain page counts: the page, the day and a number. Nothing about the visitor
// is stored: no IP address, cookie, user agent, referrer or device.
// No imports, so tests/page-count.test.mjs can load this file directly.

// Known bots, crawlers, link previewers, monitors and scripted clients. The
// user agent is read only to leave these out; it is never stored. Same list as
// the other network sites (formby-guide/lib/page-count.ts).
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|curl|wget|python|java\/|okhttp|go-http|node-fetch|axios|httpclient|libwww|scrapy|phantomjs|selenium|puppeteer|playwright|ahrefs|semrush|mj12|petal|bytespider|gptbot|ccbot|claude|anthropic|perplexity|applebot|duckduck|baidu|yandex|sogou|exabot|seznam|vercel/i;

export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua || !ua.trim()) return true;
  return BOT_UA.test(ua);
}

const EXCLUDED_PREFIXES = ["/api", "/admin", "/dashboard", "/_next"];
const SAFE_PATH = /^\/[A-Za-z0-9\-._~%/]*$/;

/** The page path to count, or null if it is not a site page. */
export function cleanCountPath(raw: string): string | null {
  const path = raw.trim().split(/[?#]/)[0];
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  if (path.length > 300) return null;
  if (!SAFE_PATH.test(path)) return null;
  if (EXCLUDED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return null;
  return path;
}

/**
 * The site's fixed pages (every app/[locale]/.../page.tsx without a [segment]).
 * English is the only routed locale and has no prefix, so these are the URLs.
 * tests/page-count.test.mjs checks this list against the app folder.
 */
export const STATIC_PATHS: readonly string[] = [
  "/",
  "/accommodation",
  "/blog",
  "/conditions",
  "/contact",
  "/fell-log",
  "/fells",
  "/itineraries",
  "/privacy",
  "/terms",
];

const STATIC_SET = new Set(STATIC_PATHS);

export type KnownRoutes = {
  /** Slugs from FELLS (lib/fells.ts). */
  fellSlugs: ReadonlySet<string>;
  /** Ids from WALKING_ITINERARIES (lib/walking-itineraries.ts). */
  itineraryIds: ReadonlySet<string>;
  /** Slugs from BLOG_POSTS (lib/blog.ts). */
  blogSlugs: ReadonlySet<string>;
  /** Slugs from BLOG_CATEGORIES (lib/blog.ts). */
  blogCategorySlugs: ReadonlySet<string>;
};

/**
 * True only for a page the site has: a fixed page, a fell, an itinerary, a
 * blog post or a blog category. Anything else is not counted, so made-up paths
 * cannot fill the table.
 */
export function isKnownPath(path: string, known: KnownRoutes): boolean {
  if (STATIC_SET.has(path)) return true;
  const parts = path.split("/").slice(1);
  if (parts.length === 2) {
    const [first, second] = parts;
    if (first === "fells") return known.fellSlugs.has(second);
    if (first === "itineraries") return known.itineraryIds.has(second);
    if (first === "blog") return known.blogSlugs.has(second);
    return false;
  }
  if (parts.length === 3 && parts[0] === "blog" && parts[1] === "category") {
    return known.blogCategorySlugs.has(parts[2]);
  }
  return false;
}

/**
 * True when the browser says the request came from another site. The beacon
 * always sends same-origin; a request with no Sec-Fetch-Site header (older
 * browsers) is allowed.
 */
export function isCrossSiteRequest(secFetchSite: string | null | undefined): boolean {
  return secFetchSite != null && secFetchSite !== "same-origin";
}
