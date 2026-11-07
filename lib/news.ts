import newsData from "@/data/news.json";

export const articles: Article[] = newsData;
export const categories = ["All stories", ...new Set(articles.map((article) => article.category))];

export const formatDate = (date: string) => {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const readingTime = (article: Article) => {
  return Math.max(1, Math.ceil(article.content.join(" ").split(/\s+/).length / 200));
};
