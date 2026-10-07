import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// The live homepage's own title and description. Private demo: never indexed, never followed.
export const metadata: Metadata = {
  title: "Botanicoir | Producers of Quality Cocopeat, Quality Coir Products",
  description: "Botanicoir is a family-run company with 20 years’ experience of manufacturing top-quality coir products, trusted by the commercial horticulture industry in over 70 countries worldwide.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#14281b" };

/* Runs before first paint. Unless reduced motion is requested it adds `js` (so reveal targets can start hidden
   without a flash) and `is-loading` for the preloader, which plays on every load. Without JavaScript nothing is
   hidden and the preloader never shows (see the <noscript> style). */
const boot = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';d.classList.add('logo-landed');return}d.classList.add('js','is-loading')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/inter-latin-opsz-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/hero-poster.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}.site-header{opacity:1!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
