import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanCountPath, isBotUserAgent, isCrossSiteRequest, isKnownPath, type KnownRoutes } from "@/lib/page-count";
import { FELLS } from "@/lib/fells";
import { WALKING_ITINERARIES } from "@/lib/walking-itineraries";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog";

// Adds one to today's count for a page. Sent by components/PageCountBeacon.tsx.
// Stores the path, the day and the number only. No cookies, no visitor data.

const KNOWN: KnownRoutes = {
  fellSlugs: new Set(FELLS.map((f) => f.slug)),
  itineraryIds: new Set(WALKING_ITINERARIES.map((it) => it.id)),
  blogSlugs: new Set(BLOG_POSTS.map((p) => p.slug)),
  blogCategorySlugs: new Set(BLOG_CATEGORIES.map((c) => c.slug)),
};

function done() {
  return new Response(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  // Only the live site counts: local dev and preview deployments never write.
  if (process.env.VERCEL_ENV !== "production") return done();

  // The beacon is same-origin; a request another site makes is dropped.
  if (isCrossSiteRequest(req.headers.get("sec-fetch-site"))) return done();

  // Read to leave out bots; never stored.
  if (isBotUserAgent(req.headers.get("user-agent"))) return done();

  let body = "";
  try {
    body = await req.text();
  } catch {
    return done();
  }
  if (body.length > 600) return done();

  // Only pages the site actually has.
  const path = cleanCountPath(body);
  if (!path || !isKnownPath(path, KNOWN)) return done();

  try {
    await prisma.$executeRaw`
      INSERT INTO "PageCount" ("path", "day", "count")
      VALUES (${path}, CURRENT_DATE, 1)
      ON CONFLICT ("path", "day") DO UPDATE SET "count" = "PageCount"."count" + 1
    `;
  } catch {
    // A failed count must never affect the visitor.
  }
  return done();
}
