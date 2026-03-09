import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, DAMIAN } from '@/lib/blog';
import BlogSearch from './BlogSearch';

export const metadata: Metadata = {
  title: 'Links Golf Blog — Course Reviews, Tips & The Open 2026 | SeftonLinks',
  description:
    'First-hand course reviews, links golf tips, and everything you need to know about The Open Championship 2026 at Royal Birkdale — written by a local off 24.',
  alternates: { canonical: 'https://www.seftonlinks.com/blog' },
  openGraph: {
    title: 'Links Golf Blog | SeftonLinks.com',
    description: 'Course reviews, links golf tips and Open 2026 guides — written by a local.',
    url: 'https://www.seftonlinks.com/blog',
    type: 'website',
    siteName: 'SeftonLinks.com',
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <div className="bg-[#0D1B2A] text-white py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-[#B8912A] text-xs font-bold uppercase tracking-widest mb-3">
            The SeftonLinks Blog
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Links Golf — Written From the Inside
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            Course reviews, practical tips, and Open 2026 guides — written by Damian Roche, founder
            of SeftonLinks and a 24-handicapper who lives three miles from Royal Birkdale.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">

        <BlogSearch
          posts={BLOG_POSTS}
          categories={BLOG_CATEGORIES}
          postCountByCategory={Object.fromEntries(
            BLOG_CATEGORIES.map((c) => [c.slug, BLOG_POSTS.filter((p) => p.categorySlug === c.slug).length])
          )}
        />

        {/* Author box */}
        <div className="mt-14 bg-white rounded-2xl border border-[#E8E3D8] p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0">
            <span className="text-[#B8912A] font-display font-bold text-lg">D</span>
          </div>
          <div>
            <p className="font-semibold text-[#0D1B2A] text-lg">{DAMIAN.name}</p>
            <p className="text-[#2C3E50]/55 text-sm mb-3">{DAMIAN.jobTitle}</p>
            <p className="text-[#2C3E50]/75 text-sm leading-relaxed">{DAMIAN.bio}</p>
            <a
              href={DAMIAN.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#B8912A] hover:text-[#0D1B2A] transition-colors"
            >
              About Damian <ChevronRight size={13} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
