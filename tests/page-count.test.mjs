// /api/count counts only pages the site has, only same-origin, only on the
// live site, and stores the path, the day and a number. Pure helpers from
// lib/page-count.ts plus static reads: no route is called, nothing is written.
// Run: node --test tests/page-count.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { STATIC_PATHS, cleanCountPath, isBotUserAgent, isCrossSiteRequest, isKnownPath } from "../lib/page-count.ts";
import { FELLS } from "../lib/fells.ts";
import { WALKING_ITINERARIES } from "../lib/walking-itineraries.ts";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../lib/blog.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const KNOWN = {
  fellSlugs: new Set(FELLS.map((f) => f.slug)),
  itineraryIds: new Set(WALKING_ITINERARIES.map((it) => it.id)),
  blogSlugs: new Set(BLOG_POSTS.map((p) => p.slug)),
  blogCategorySlugs: new Set(BLOG_CATEGORIES.map((c) => c.slug)),
};

/** Every app/[locale]/.../page.tsx with no [segment] below [locale], as a URL path. */
function staticPagesOnDisk() {
  const out = [];
  const base = join("app", "[locale]");
  const go = (dir) => {
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) {
        if (name.startsWith("[") || name.startsWith("_") || name.startsWith("(")) continue;
        go(p);
      } else if (name === "page.tsx") {
        const rel = dir.split(/[\\/]/).slice(2).join("/");
        out.push(rel ? `/${rel}` : "/");
      }
    }
  };
  go(base);
  return out.sort();
}

test("STATIC_PATHS lists exactly the site's fixed pages", () => {
  assert.deepEqual([...STATIC_PATHS].sort(), staticPagesOnDisk());
});

test("known pages are counted", () => {
  for (const p of ["/", "/fells", "/blog", "/conditions", "/privacy"]) {
    assert.equal(isKnownPath(p, KNOWN), true, p);
  }
  assert.equal(isKnownPath("/fells/scafell-pike", KNOWN), true, "a fell");
  assert.equal(isKnownPath(`/itineraries/${WALKING_ITINERARIES[0].id}`, KNOWN), true, "an itinerary");
  assert.equal(isKnownPath(`/blog/${BLOG_POSTS[0].slug}`, KNOWN), true, "a blog post");
  assert.equal(isKnownPath(`/blog/category/${BLOG_CATEGORIES[0].slug}`, KNOWN), true, "a blog category");
});

test("made-up paths and old golf paths are not counted", () => {
  for (const p of [
    "/made-up-page",
    "/fells/not-a-fell",
    "/itineraries/not-an-itinerary",
    "/blog/not-a-real-post",
    "/blog/category/not-a-category",
    "/fells/scafell-pike/extra",
    "/the-open-2026",
    "/tee-times",
    "/scorecard",
    "/en/fells",
  ]) {
    assert.equal(isKnownPath(p, KNOWN), false, p);
  }
});

test("cleanCountPath keeps the path only and refuses non-site paths", () => {
  assert.equal(cleanCountPath("/fells?x=1#y"), "/fells");
  for (const bad of ["fells", "//evil.example", "/api/count", "/admin", "/_next/static/x", "/" + "a".repeat(300), "/a b"]) {
    assert.equal(cleanCountPath(bad), null, bad);
  }
});

test("requests from another site are refused; same-origin and no header are allowed", () => {
  assert.equal(isCrossSiteRequest("same-origin"), false);
  assert.equal(isCrossSiteRequest(null), false);
  assert.equal(isCrossSiteRequest(undefined), false);
  for (const v of ["cross-site", "same-site", "none", ""]) assert.equal(isCrossSiteRequest(v), true, v);
});

test("bots and empty user agents are left out", () => {
  assert.equal(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)"), true);
  assert.equal(isBotUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 HeadlessChrome/138.0"), true);
  assert.equal(isBotUserAgent(""), true);
  assert.equal(isBotUserAgent(null), true);
  assert.equal(isBotUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36"), false);
});

test("the count route: production only, same-origin, bots out, known paths, path/day/count only", () => {
  const src = read("app/api/count/route.ts");
  assert.match(src, /if \(process\.env\.VERCEL_ENV !== "production"\) return done\(\);/);
  assert.match(src, /if \(isCrossSiteRequest\(req\.headers\.get\("sec-fetch-site"\)\)\) return done\(\);/);
  assert.match(src, /if \(isBotUserAgent\(req\.headers\.get\("user-agent"\)\)\) return done\(\);/);
  assert.match(src, /if \(!path \|\| !isKnownPath\(path, KNOWN\)\) return done\(\);/);
  assert.match(src, /await prisma\.\$executeRaw`\s+INSERT INTO "PageCount" \("path", "day", "count"\)\s+VALUES \(\$\{path\}, CURRENT_DATE, 1\)/);
  assert.equal((src.match(/INSERT INTO/g) ?? []).length, 1, "one write only");
  assert.doesNotMatch(src, /x-forwarded-for|x-real-ip|referer|cookies\(|\.ip\b/i, "nothing else about the visitor is read");
  assert.equal((src.match(/user-agent/g) ?? []).length, 1, "the user agent is read once, to filter");
});

test("the beacon is in the layout and the proxy no longer writes page views", () => {
  assert.match(read("app/[locale]/layout.tsx"), /<PageCountBeacon \/>/);
  const proxy = read("proxy.ts");
  assert.doesNotMatch(proxy, /INSERT|neon|PageView|DATABASE_URL/);
  assert.match(proxy, /createMiddleware\(routing\)/);
});

test("Ahrefs Web Analytics is the only analytics script", () => {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(join(ROOT, dir))) {
      const p = join(dir, name);
      if (statSync(join(ROOT, p)).isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(name)) files.push(p);
    }
  };
  for (const d of ["app", "components", "lib"]) walk(d);
  for (const f of files) {
    const src = read(f);
    assert.doesNotMatch(
      src,
      /@vercel\/analytics|@vercel\/speed-insights|clarity\.ms|googletagmanager|google-analytics|gtag\(|plausible\.io|hotjar|connect\.facebook\.net/,
      f,
    );
  }
});
