import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

// Locale routing only. Page counts are kept by app/api/count (Nov 2026); the
// old page view insert that used to run here is gone.

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

// /feed is a route handler outside [locale]; sent through next-intl it returned 404.
export const config = {
  matcher: ['/((?!api|_next|_vercel|feed|.*\\..*).*)'],
};
