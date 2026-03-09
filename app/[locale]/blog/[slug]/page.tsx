import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HERO_IMAGE_URL } from '@/lib/site-constants';
import type { Metadata } from 'next';
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, DAMIAN, getPostBySlug, getCategoryBySlug, getIsoDate, type ContentBlock } from '@/lib/blog';

const BASE_URL = 'https://www.hikethelakes.com';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ locale: 'en', slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'en') return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const cat = getCategoryBySlug(post.categorySlug);
  return {
    title: `${post.title} | SeftonLinks`,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: 'article',
      siteName: 'HikeTheLakes.com',
      publishedTime: getIsoDate(post),
      authors: [DAMIAN.name],
      section: cat?.label,
    },
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 key={i} className="font-display text-2xl font-bold text-[#0E1C14] mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} className="font-display text-xl font-bold text-[#0E1C14] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={i} className="text-[#3C4E42]/80 leading-relaxed mb-5 text-[1.0625rem]">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-[#3C4E42]/80 text-[1.0625rem]">
              <span className="text-[#9E762A] font-bold flex-none mt-0.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div key={i} className="my-8 rounded-xl border border-[#9E762A]/30 bg-[#0E1C14] px-6 py-5">
          <p className="text-white/80 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    case 'hr':
      return <hr key={i} className="my-8 border-[#D2D8CF]" />;
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'en') notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategoryBySlug(post.categorySlug);
  const isoDate = getIsoDate(post);
  const canonicalUrl = `${BASE_URL}/blog/${slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: 'en-GB',
    author: {
      '@type': 'Person',
      '@id': DAMIAN.schemaId,
      name: DAMIAN.name,
      jobTitle: DAMIAN.jobTitle,
      url: DAMIAN.url,
      sameAs: [
        'https://www.linkedin.com/in/damian-roche-7ba8293a5/',
        'https://find-and-update.company-information.service.gov.uk/company/16960442',
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.churchtownmedia.co.uk/#organization',
      name: 'Churchtown Media',
      url: 'https://www.churchtownmedia.co.uk',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#EAEDE8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D2D8CF]">
        <div className="container mx-auto px-4 max-w-3xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#3C4E42]/55 flex-wrap">
            <Link href="/" className="hover:text-[#1A4A30] transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/blog" className="hover:text-[#1A4A30] transition-colors">Blog</Link>
            {cat && (
              <>
                <ChevronRight size={13} />
                <Link href={`/blog/category/${cat.slug}`} className="hover:text-[#1A4A30] transition-colors">
                  {cat.label}
                </Link>
              </>
            )}
            <ChevronRight size={13} />
            <span className="text-[#0E1C14] font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article hero */}
      <div className="bg-[#0E1C14] text-white py-12 relative overflow-hidden">
        <Image
          src={post.image || HERO_IMAGE_URL}
          alt={post.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          {cat && (
            <p className="text-[#9E762A] text-xs font-bold uppercase tracking-widest mb-3">
              {cat.label}
            </p>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {post.readingTime}</span>
            <span>By {DAMIAN.name}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-4 max-w-3xl py-12">

        {/* Excerpt */}
        <p className="text-lg text-[#3C4E42]/70 leading-relaxed mb-8 pb-8 border-b border-[#D2D8CF] font-medium">
          {post.excerpt}
        </p>

        {/* Content */}
        <div className="prose-lg max-w-none">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Author box */}
        <div className="mt-14 pt-10 border-t border-[#D2D8CF]">
          <div className="bg-white rounded-2xl border border-[#D2D8CF] p-7 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-14 h-14 rounded-full bg-[#0E1C14] flex items-center justify-center flex-shrink-0">
              <span className="text-[#9E762A] font-display font-bold text-lg">D</span>
            </div>
            <div>
              <p className="font-semibold text-[#0E1C14] text-base">{DAMIAN.name}</p>
              <p className="text-[#3C4E42]/50 text-sm mb-3">{DAMIAN.jobTitle}</p>
              <p className="text-[#3C4E42]/70 text-sm leading-relaxed">{DAMIAN.bio}</p>
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

        {/* Back */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1A4A30] font-semibold hover:text-[#9E762A] transition-colors text-sm"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>
        </div>

      </div>
    </div>
  );
}
