import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function requireApiKey(req: NextRequest): NextResponse | null {
  const key = req.headers.get("x-api-key");
  const expected = process.env.COMMAND_CENTRE_API_KEY;
  if (!expected || key !== expected) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const authError = requireApiKey(req);
  if (authError) return authError;

  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now);
  monthStart.setDate(monthStart.getDate() - 30);
  monthStart.setHours(0, 0, 0, 0);

  const [pageviewsToday, pageviewsThisWeek, pageviewsThisMonth, topPagesRaw, topReferrersRaw] =
    await Promise.all([
      prisma.pageView.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.pageView.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: weekStart } },
        _count: { path: true },
      }),
      prisma.pageView.groupBy({
        by: ["referrer"],
        where: { createdAt: { gte: weekStart }, referrer: { not: null } },
        _count: { referrer: true },
      }),
    ]);

  return NextResponse.json({
    site: "hikethelakes",
    network: "lakes",
    period: now.toISOString().slice(0, 10),
    analytics: {
      pageviewsToday,
      pageviewsThisWeek,
      pageviewsThisMonth,
      uniqueVisitorsThisWeek: pageviewsThisWeek,
      topPages: topPagesRaw
        .map((r) => ({ path: r.path, count: r._count.path }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      topReferrers: topReferrersRaw
        .filter((r) => r.referrer)
        .map((r) => ({ referrer: r.referrer!, count: r._count.referrer }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    },
    content: { totalListings: 0, claimedListings: 0, totalBlogPosts: 0, blogPostsThisWeek: 0, lastBlogPostDate: null, totalGuides: 0 },
    revenue: { hubMembers: 0, hubMRR: 0, featuredListings: 0, featuredMRR: 0, affiliateThisMonth: 0 },
    outreach: { emailsSentThisWeek: 0, responsesThisWeek: 0, pendingFollowUps: 0 },
  });
}
