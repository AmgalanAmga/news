# The Daily — beginner news website

A responsive news website built with Next.js App Router, TypeScript, and Tailwind CSS. Includes 20 fictional JSON articles, category filters, dynamic detail pages, related articles, metadata, and a custom 404 page. No API keys, database, or additional UI libraries required.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and then `npm start`. Run `npm run lint` for ESLint.

## Learn the project in this order

1. `data/news.json`: the array of 20 articles. Each has a unique `id` and URL-friendly `slug`. `content` is an array of paragraphs.
2. `lib/news.ts`: the article type, imported data, categories, and formatting functions.
3. `components/article-card.tsx`: reusable UI; a typed prop supplies one article.
4. `app/page.tsx`: the server-rendered homepage. It passes all articles to the news feed, without a hero section.
5. `components/news-feed.tsx`: the interactive client component. `useState` tracks the selected category; `filter()` derives visible articles. All 20 articles appear by default.
6. `app/news/[slug]/page.tsx`: the dynamic route. It awaits `params`, finds the matching article, and calls `notFound()` for an unknown slug. `generateStaticParams()` builds all 20 article pages ahead of time. `generateMetadata()` sets the browser title.
7. `app/layout.tsx`: shared footer, and default metadata.
8. `app/globals.css`: imports Tailwind CSS and defines shared theme colors. Components use utility classes directly; `sm:` and `lg:` prefixes control responsive layouts. `next.config.ts` enables the installed Tailwind Turbopack loader.

## Add an article

Copy one object in `data/news.json`, give it a new ID and unique slug, and edit its fields. Keep the date in `YYYY-MM-DD` format. Add paragraphs to `content`. The homepage, filters, and detail route use the same data automatically. Restart/rebuild a production server after changing JSON.

## Concepts to practice

- Server Components vs. Client Components (`"use client"` enables state in the feed).
- Props and TypeScript types.
- Rendering arrays with stable keys.
- Category selection and derived state.
- Navigation with `next/link` and dynamic `[slug]` routes.
- Handling missing content and generating page metadata.
- Semantic HTML, keyboard focus, reduced motion, and responsive CSS.

All article text is fictional educational content, not verified reporting. Images load from Unsplash and require an internet connection. `next/image` uses `unoptimized` here to keep this demo free of image-service configuration; images still have responsive dimensions and lazy loading. Fonts use the system stack, so building does not download fonts. There is no authentication, CMS, or backend persistence.
