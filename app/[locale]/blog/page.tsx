import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import { BLOG_POSTS, BLOG_CATEGORIES, DAMIAN } from '@/lib/blog';
import BlogSearch from './BlogSearch';

export const metadata: Metadata = {
  title: 'Lake District Fell Walking Blog — Routes, Conditions & Tips | HikeTheLakes',
  description:
    'Fell walking guides, route tips, and practical advice for the Lake District. Scafell Pike, Helvellyn, Skiddaw and more. Written by Damian Roche.',
  alternates: { canonical: 'https://www.hikethelakes.com/blog' },
  openGraph: {
    title: 'Lake District Fell Blog | HikeTheLakes.com',
    description: 'Fell walking guides, route tips and practical advice for the Lake District.',
    url: 'https://www.hikethelakes.com/blog',
    type: 'website',
    siteName: 'HikeTheLakes.com',
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
    <div className="min-h-screen bg-[#EAEDE8]">
      {/* Hero */}
      <div className="bg-[#0E1C14] text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMAGE_URL} alt="" fill sizes="100vw" quality={70} className="object-cover object-center opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1C14]/55 via-[#0E1C14]/35 to-[#0E1C14]/70" />
        <div className="relative container mx-auto px-4 max-w-5xl">
          <p className="text-[#9E762A] text-xs font-bold uppercase tracking-widest mb-3">
            The HikeTheLakes Blog
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Lake District Fell Walking — Written From the Inside
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            Route guides, practical tips, and fell walking advice. Written by Damian Roche, founder
            of HikeTheLakes and a regular Lake District visitor for decades.
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
        <div className="mt-14 bg-white rounded-2xl border border-[#D2D8CF] p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 rounded-full bg-[#0E1C14] flex items-center justify-center flex-shrink-0">
            <span className="text-[#9E762A] font-display font-bold text-lg">D</span>
          </div>
          <div>
            <p className="font-semibold text-[#0E1C14] text-lg">{DAMIAN.name}</p>
            <p className="text-[#3C4E42]/55 text-sm mb-3">{DAMIAN.jobTitle}</p>
            <p className="text-[#3C4E42]/75 text-sm leading-relaxed">{DAMIAN.bio}</p>
            <a
              href={DAMIAN.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-[#9E762A] hover:text-[#0E1C14] transition-colors"
            >
              About Damian <ChevronRight size={13} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
