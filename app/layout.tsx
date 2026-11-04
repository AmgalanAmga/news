import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "The Daily — A fresh perspective", template: "%s | The Daily" },
  description: "A little curiosity goes a long way. Explore 20 sample stories about design, technology, culture, and the world around us.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="scroll-pt-7 scroll-smooth motion-reduce:scroll-auto">
    <body className="bg-paper font-sans text-ink antialiased selection:bg-orange-200">
      <a className="absolute -top-20 left-4 z-50 bg-ink p-3.5 text-white focus:top-4" href="#main">Skip to content</a>
      {children}
      <footer className="border-t border-line py-9">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-6 [&_p]:text-xs [&_p]:leading-7 [&_p]:text-muted [&>a]:text-xs">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-3xl font-black tracking-tighter [&>span]:text-accent">the daily<span>▧</span>
            </Link>
            <p>A fresh perspective. Every day.</p>
          </div>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </body>
  </html>;
}
