import type { Metadata } from "next";
import { articles } from "@/lib/news";
import NewsFeed from "@/components/news-feed";

const firstArticle = articles[0];

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    siteName: "The Daily",
    title: "The Daily — A fresh perspective",
    description: "A little curiosity goes a long way. Explore 20 sample stories about design, technology, culture, and the world around us.",
    images: firstArticle ? [{ url: firstArticle.image, alt: firstArticle.imageAlt }] : [],
  },
};

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <NewsFeed articles={articles} />
    </main>
  );
}
