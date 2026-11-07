"use client";

import { useState } from "react";
import ArticleCard from "@/components/article-card";
import { categories } from "@/lib/news";

export default function NewsFeed({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState("All stories");

  const filteredArticles = articles.filter((article) => category === "All stories" || article.category === category);

  return (
    <section id="latest" className="py-10 pb-16">
      <div className="mb-6 flex items-end justify-between gap-5">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent">STAY CURIOUS</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            The latest stories<span className="text-accent">.</span>
          </h1>
        </div>
        <p className="hidden pb-1 text-xs text-muted md:block">Big ideas. Fresh voices. Worth your time.</p>
      </div>
      <div className="border-y border-line py-4">
        <div className="flex flex-wrap gap-1" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded px-3 py-2.5 text-xs transition-colors ${category === item ? "bg-ink text-white" : "text-muted hover:bg-sage"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="my-5 text-xs text-muted" role="status">
        {filteredArticles.length} stories{category !== "All stories" ? ` in ${category}` : " to explore"}
      </div>
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} loading={index < 3 ? "eager" : "lazy"} />
          ))}
        </div>
      ) : (
        <div className="px-5 py-16 text-center [&>h3]:text-2xl [&>p]:mt-4 [&>p]:mb-7 [&>p]:text-muted">
          <h3>No stories found</h3>
          <p>Explore a different category.</p>
          <button
            className="inline-block rounded bg-ink px-5 py-3.5 text-xs text-white transition-colors hover:bg-accent"
            onClick={() => setCategory("All stories")}
          >
            Show all stories ↗
          </button>
        </div>
      )}
    </section>
  );
}
