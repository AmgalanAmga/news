import NewsFeed from "@/components/news-feed";
import { articles } from "@/lib/news";

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      <NewsFeed articles={articles} />
    </main>
  );
}
