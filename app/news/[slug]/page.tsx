import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryColors } from "@/lib/category-colors";
import ArticleCard from "@/components/article-card";
import { articles, formatDate, readingTime } from "@/lib/news";

type Props = { params: Promise<{ slug: string }> };

// Build a page for each article using its URL-friendly slug.
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((article) => article.slug === slug);
  return { title: article?.title ?? "Story not found", description: article?.description };
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((article) => article.slug === slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.category === article.category && item.id !== article.id).slice(0, 3);

  const categoryColor = categoryColors[article.category] ?? "bg-slate-50 text-slate-700 ring-slate-200";
  const initials = article.author.split(" ").map((name) => name[0]).join("");

  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8 lg:px-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 border-b border-line pb-5 text-xs text-stone-500">
        <Link href="/#latest" className="inline-flex items-center gap-2 font-semibold text-stone-700 transition-colors hover:text-accent">
          <span aria-hidden="true">←</span> All stories
        </Link>
        <span aria-hidden="true">/</span>
        <span>{article.category}</span>
        <span className="ml-auto hidden text-[10px] uppercase tracking-widest sm:block">The Daily Edit</span>
      </nav>

      <article>
        <header className="mx-auto max-w-5xl pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className={`rounded-md px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${categoryColor}`}>
              {article.category}
            </span>
            <span className="h-px w-10 bg-stone-300" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-stone-500">The Daily</span>
          </div>

          <h1 className="max-w-4xl text-4xl leading-[1.12] font-bold tracking-tight text-balance text-stone-950 sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-stone-600 sm:mt-6 sm:text-xl">
            {article.description}
          </p>

          <div className="mt-8 flex flex-col gap-5 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3.5">
              <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ring-1 ring-inset ${categoryColor}`} aria-hidden="true">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Written by</p>
                <p className="mt-1 text-sm font-bold text-stone-900 sm:text-base">{article.author}</p>
              </div>
            </div>

            <dl className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-x-8">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Published</dt>
                <dd className="mt-1.5 font-medium text-stone-700">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </dd>
              </div>
              <div className="border-l border-stone-200 pl-6 sm:pl-8">
                <dt className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Reading time</dt>
                <dd className="mt-1.5 flex items-center gap-1.5 font-medium text-stone-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {readingTime(article)} min read
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage shadow-lg shadow-stone-900/5 sm:aspect-[2/1] sm:rounded-3xl lg:aspect-[2.3/1]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              className="object-cover"
              fill
              loading="eager"
              unoptimized
              sizes="(max-width: 1279px) 100vw, 1184px"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 px-1 text-[10px] leading-relaxed text-stone-500">
            <span>{article.imageAlt}</span>
            <span>Illustrative photography · Unsplash</span>
          </figcaption>
        </figure>

        <div className="mx-auto max-w-3xl py-10 sm:py-14">
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-7 shadow-sm sm:px-10 sm:py-10">
            <div className="mb-7 flex items-center gap-3" aria-hidden="true">
              <span className="h-1 w-8 rounded-full bg-accent" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">The story</span>
            </div>
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className={`mb-6 font-serif text-lg leading-[1.9] text-stone-700 last:mb-0 sm:text-xl ${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-accent" : ""}`}
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex items-center justify-center gap-2 text-accent" aria-label="End of article">
              <span className="size-1 rounded-full bg-current" />
              <span className="size-1.5 rounded-full bg-current" />
              <span className="size-1 rounded-full bg-current" />
            </div>
          </div>

          <p className="mt-4 px-2 text-center text-[11px] leading-relaxed text-stone-500">
            Fictional sample story · The Daily learning edition
          </p>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-semibold tracking-tight text-stone-900">A little more curiosity?</p>
              <p className="mt-1 text-sm text-stone-600">Your next good read is just around the corner.</p>
            </div>
            <Link href="/#latest" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-accent">
              All stories <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="border-t border-line pt-10 pb-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-accent">Keep your curiosity going</p>
            <h2 id="related-heading" className="text-3xl font-bold tracking-tight text-stone-900">More to discover<span className="text-accent">.</span></h2>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${categoryColor}`}>
            More in {article.category}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => <ArticleCard key={item.id} article={item} />)}
        </div>
      </section>
    </main>
  );
}
