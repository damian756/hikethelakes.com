import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { neon } from '@neondatabase/serverless';
import type { NextRequest } from 'next/server';

const BOT_RE = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|facebookexternalhit|twitterbot|linkedinbot/i;

function getDevice(ua: string): string {
  const l = ua.toLowerCase();
  if (l.includes("tablet") || l.includes("ipad")) return "tablet";
  if (l.includes("mobile") || (l.includes("android") && !l.includes("tablet"))) return "mobile";
  return "desktop";
}

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  const skip =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    /\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|txt|xml|json|webp|map)$/.test(pathname) ||
    request.headers.get("next-router-prefetch") === "1" ||
    BOT_RE.test(ua);

  if (!skip) {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      let referrerDomain: string | null = null;
      try { referrerDomain = new URL(request.headers.get("referer") ?? "").hostname.replace(/^www\./, ""); } catch {}
      const device = getDevice(ua);
      const id = crypto.randomUUID();
      neon(dbUrl)`
        INSERT INTO "PageView" (id, path, referrer, device, "createdAt")
        VALUES (${id}, ${pathname.slice(0, 500)}, ${referrerDomain}, ${device}, NOW())
      `.catch(() => {});
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
