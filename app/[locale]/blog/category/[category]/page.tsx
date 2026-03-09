import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, getPostsByCategory, getCategoryBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ locale: 'en', category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.label} — SeftonLinks Blog`,
    description: cat.description,
    alternates: { canonical: `https://www.seftonlinks.com/blog/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (locale !== 'en') notFound();

  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E8E3D8]">
        <div className="container mx-auto px-4 max-w-5xl py-3">
          <nav className="flex items-center gap-2 text-sm text-[#2C3E50]/55">
            <Link href="/" className="hover:text-[#1A4A30] transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/blog" className="hover:text-[#1A4A30] transition-colors">Blog</Link>
            <ChevronRight size={13} />
            <span className="text-[#0D1B2A] font-medium">{cat.label}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0D1B2A] text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-[#B8912A] text-xs font-bold uppercase tracking-widest mb-3">
            Category
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">{cat.label}</h1>
          <p className="text-white/60 max-w-xl leading-relaxed">{cat.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">

        {/* Category nav with active state */}
        <div className="flex flex-wrap gap-2 mb-8">
          {BLOG_CATEGORIES.map((c) => {
            const count = BLOG_POSTS.filter((p) => p.categorySlug === c.slug).length;
            const isActive = c.slug === category;
            return (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#B8912A] text-white border border-[#B8912A]'
                    : 'border border-[#B8912A]/40 text-[#B8912A] hover:bg-[#B8912A] hover:text-white'
                }`}
              >
                {c.label}
                <span className={`text-xs ${isActive ? 'opacity-80' : 'opacity-70'}`}>({count})</span>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 ? (
          <p className="text-[#2C3E50]/60 text-center py-12">No posts in this category yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-[#E8E3D8] p-7 hover:border-[#B8912A]/40 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-[#2C3E50]/50 flex items-center gap-1">
                    <Clock size={11} /> {post.readingTime}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-[#0D1B2A] mb-3 leading-snug group-hover:text-[#1A4A30] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#2C3E50]/65 text-sm leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#2C3E50]/40">{post.date}</span>
                  <span className="text-[#B8912A] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#1A4A30] font-semibold hover:text-[#B8912A] transition-colors text-sm"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
