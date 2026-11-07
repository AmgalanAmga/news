import Link from "next/link";
import Image from "next/image";
import { formatDate, readingTime } from "@/lib/news";
import { categoryColors } from "@/lib/category-colors";

type ArticleCardProps = {
  article: Article;
  loading?: "eager" | "lazy";
};

export default function ArticleCard({ article, loading = "lazy" }: ArticleCardProps) {
  const categoryColor = categoryColors[article.category] ?? "bg-slate-50 text-slate-700 ring-slate-200";
  const initials = article.author
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article className="h-full min-w-0">
      <Link
        href={`/news/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 focus-visible:border-orange-300 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="relative aspect-[1.6] overflow-hidden bg-sage">
          <Image
            src={article.image}
            alt={article.imageAlt}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            fill
            loading={loading}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
          <span
            className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ring-1 ring-inset ${categoryColor}`}
          >
            {article.category}
          </span>
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {readingTime(article)} min read
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-xl leading-snug font-bold tracking-tight text-stone-900 transition-colors group-hover:text-accent group-focus-visible:text-accent motion-reduce:transition-none">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{article.description}</p>

          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 border-t border-stone-100 pt-4">
              <span
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1 ring-inset ${categoryColor}`}
                aria-hidden="true"
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-stone-800">{article.author}</p>
                <time dateTime={article.date} className="mt-1 block text-[11px] text-stone-500">
                  {formatDate(article.date)}
                </time>
              </div>
              <span
                className="grid size-9 shrink-0 place-items-center rounded-full bg-orange-50 text-accent transition-colors group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white motion-reduce:transition-none"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
