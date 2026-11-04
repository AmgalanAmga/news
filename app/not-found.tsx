import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 min-h-[65vh] py-20 text-center [&>h1]:my-5 [&>h1]:text-4xl [&>h1]:font-semibold [&>h1]:tracking-tight [&>p]:mb-7 [&>p]:text-muted">
    <div className="text-[10px] font-bold uppercase tracking-widest text-accent">404 · STORY NOT FOUND</div>
    <h1>This page is a blank chapter.</h1>
    <p>The story you’re looking for isn’t here. Find your next read on the homepage.</p>
    <Link href="/" className="inline-block rounded bg-ink px-5 py-3.5 text-xs text-white transition-colors hover:bg-accent">Back to The Daily ↗</Link>
  </main>;
}
