# Botanicoir homepage (private prospect demo)

botanicoir.com's homepage in a new skin, after farmminerals.com (look, layout and motion). One page, Botanicoir's own logo, fonts, copy, photography and film. Next.js App Router, TypeScript, GSAP + ScrollTrigger, Lenis. No UI kits or CSS frameworks.

## Run locally

`npm install`, then `npm run dev` (http://127.0.0.1:3050). `npm run build` and `npm start` for production. `npm run typecheck` checks TypeScript.

| Script | What it does |
| --- | --- |
| `npm run media` | Downloads every homepage image from botanicoir.com (`scripts/media.sh`) and makes the WebP copies (`scripts/images.py`) |
| `npm run film` | Cuts the hero loop from the anniversary film (`scripts/film.sh`, needs yt-dlp and ffmpeg) |
| `npm run logo` | Splits the live vector logo into parts and writes `lib/logo.ts` (`scripts/logo.py`) |
| `npm run news` | Reads the four newest posts from /news-events/ into `lib/news.json` |
| `npm run links` | Click-tests every link on the running page against the live sitemaps (`scripts/check-links.mjs`) |
| `npm run shots -- <width> <dir> [url] [--reduced]` | Scrolls the page in headless Chrome, saves screenshots, reports height, overflow, broken images and console errors |
| `node scripts/intro.mjs` | Screenshots the preloader at fixed times and checks the scroll lock and handover |

Downloads land in `_scrape/` (gitignored); only the web copies in `public/` are committed.

## The route

| Route | What it is |
| --- | --- |
| `/` | The homepage. The build also emits the framework's `/_not-found` and the `/icon.svg` favicon route (4 static outputs in total). |

There are no other pages. Every card, "read more" and "all news" link goes to the real URL on botanicoir.com.

## Recon (Phase 1)

**Live homepage, top to bottom, with counts:** hero slider (4 slides, each with a headline and READ MORE to a story), intro paragraph (1) with "Speak to our team", "Over 20 Years Growing Together" (heading, paragraph, "Learn about our history", YouTube film `e5mU5AjTRnQ`), "Our Story" banner (team photo, READ MORE), Our Products (4 categories), Contact Us (phone, email, 7-field enquiry form), newsletter sign-up (1), certification marks (7), socials (4), legal links (3).

**Brand:** vector logo from the theme (`/wp-content/themes/botanicoir/images/botanicoir-logo.svg`): a gradient leaf (#99ca3c to #218c44), its white veins as one polygon, the ten letters of "Botanicoir", the "Producers of Quality Cocopeat" tagline and ®. Fonts in the live CSS: Inter (theme) and Roboto (Elementor). Colours in the theme CSS: Red #C0161B (18 uses), Leaf #9EAF4B, light grey #F0EEEF. Brand film: the 5-minute anniversary film on YouTube.

**Structure:** main nav = Products (Salad & Vegetables, Soft Fruit, each with 4 crops; Format 6; Treatment 4; Application 5 including the Medicoir sister site), Beyond Sustainable, Our Story, FAQs, 20 Years, News, Contact, 7 languages. Socials: Facebook, X (Twitter), Instagram, LinkedIn.

**Reference (farmminerals.com, Webflow):** beige #F4EDE6 ground, olive #404F1D / #596A33 / #7C914C panels, Aeonik. Type in em on a ~0.96vw root (h1 6.25em, h2 3.6em, caps .9em). Lenis `lerp: 0.1`. Headline reveal: SplitText chars, autoAlpha 0 to 1, 0.4s power2.out, 0.02s apart, from "random". Header flips between beige and olive by the section under it.

## Palette (confirmed)

| Token | Hex | Source | Use |
| --- | --- | --- | --- |
| Red | #C0161B | botanicoir.com theme CSS | Primary buttons, current milestone |
| Palm | #218C44 | Logo gradient | Large figures, focus ring, accents |
| Leaf | #9EAF4B | botanicoir.com theme CSS | Product panels, progress fill, rules |
| Husk | #F4EFE8 | A warm coir cream, chosen with the client's sign-off | Page ground |
| Ink | #14281B | Palm's hue, darkened | Dark grounds and text |

Plus white. No other hues; tints are these colours with transparency. Exceptions: the logo keeps its published leaf gradient, and the third-party certification marks are shown in greyscale.

## Homepage sections and content counts

Page height (`npm run shots`): **6,868 px at 1440** (7.6 viewports of 900), **8,598 px at 768**, **8,217 px at 375**.

| # | Section | Ground | Live homepage | This build | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | Ink + film | 4 rotating slides | Film + headline | The slides moved to section 3 so all four are seen. Headline: the 20 Years page's strapline |
| 2 | Intro | Husk | 1 paragraph, 1 button | Same, verbatim | Photograph from the Beyond Sustainable page |
| 3 | Growing together | Ink | 4 slides + Our Story banner | 4 story cards + "Our story" | Heading and line from the Our Story page |
| 4 | Our Products | Husk | 4 categories | 4 categories | Photos from the category pages; the homepage's illustrations sit small inside each panel (feedback, 8 Oct). Format, Treatment and Application links are in the menu and footer only |
| 5 | 20 years | White | Heading, text, film, button | Same + founders' thanks + 18 milestones | Film opens in an overlay (youtube-nocookie); milestones from the 20 Years page |
| 6 | Beyond Sustainable | Husk | (Our Story / Planet & People link) | Mission, 5 figures, 6 focus areas, report PDF | All figures quoted on the Beyond Sustainable page |
| 7 | News & Events | Film still | none | 4 newest posts | From /news-events/, newest first |
| 8 | Contact | Ink | Phone, email, form, newsletter | Phone, email, "Contact us", newsletter | See gaps |
| - | Footer | Husk | 7 marks, 4 socials, 3 legal | Same + full navigation and languages | No scroll reveals in the footer |

**Gaps, explained:**
- The **enquiry form** is not rebuilt. A form that cannot send would mislead the prospect, so the block offers the phone number, email and "Contact us" (the live /contact/ page) instead.
- The **newsletter** is a link to the live homepage's sign-up (`/#boxzilla-41`), not an embedded field, for the same reason.
- The **YouTube film** is not downloaded in full. It plays from YouTube in an overlay; the hero loop is 20s of its b-roll.
- **Slide rotation** is replaced by four cards side by side, which shows all four stories at once.

## How it works

- **Smooth scroll** (`components/Motion.tsx`, `lib/scroll.ts`): Lenis with `lerp: 0.1` (farmminerals.com's own setting) on the GSAP ticker, synced with ScrollTrigger. Anchor links go through Lenis. The preloader, menu and film overlay stop it.
- **Grounds:** each section has one fixed ground (Ink, Husk or white). There is no scroll-driven recolouring (clients have rejected the page "jumping" through colours). The header reads the `data-tone` of the section under it and switches between white and Ink, as the reference's header does.
- **Link guard** (`Motion.tsx`): a private demo, so every link keeps its real href (for checking and hover) but a capture-phase click/auxclick guard stops it navigating. `#` links scroll through Lenis.
- **Header** (`components/Header.tsx`): the reference's arrangement (menu left, logo centre, "Contact us" right with an underline that retracts on hover). No bar or box. Hides on scroll down, returns on scroll up.
- **Menu:** full-screen Ink panel that drops open from the top (clip-path, 0.7s), then the groups rise in (0.035s apart). One GSAP timeline, reversed out at 1.4x. Focus is trapped (the header toggle, now "Close", is part of the trap); Esc closes; focus returns to the toggle. Links are the live products, About pages, homepage sections, phone, email, socials and languages.
- **Hero** (`components/home/Hero.tsx`): the film loop under an Ink shade. The entrance starts on `intro:done`: the film settles from 1.08 to 1; the headline's letters appear in random order (the reference's text-split move, 0.4s, 0.02s apart); the side block rises. Per-letter motion appears only here and in the preloader. The film is muted with a pause control, pauses off screen, shows a local poster first, and doesn't autoplay with reduced motion. A 720px portrait crop is served below 768px.
- **Milestones** (`components/home/Years.tsx`): all 18 milestones from the 20 Years page on one axis. Each tick is a tab; hover, click or the arrow keys (plus Home/End) change the panel. Nothing is pinned.
- **News rail:** a native scroll-snap row with previous/next buttons, which disable at the ends.

### Preloader (`components/Preloader.tsx`)

The company signs its name with its real logo parts (`lib/logo.ts`). The logo is a leaf over a wordmark, so the build follows a plant: the leaf grows from its stalk, its veins open along the midrib (an animated clip rectangle), the ten letters rise one by one out of a ground-line mask, the ® fades in, and the tagline wipes in beneath. A hairline fill and a 00 to 100 counter run underneath.

| Time (s) | Step |
| --- | --- |
| 0.08 to 0.78 | Leaf grows (scale 0 to 1, a -28° turn back to rest) |
| 0.45 to 0.95 | Veins open |
| 0.55 to 1.37 | Letters rise, 0.045s apart; ® at 1.2 |
| 1.15 to 1.60 | Tagline wipes in |
| 0 to 1.90 | Progress fill and counter |
| 1.95 | Handover: `is-loading` removed, `data-intro="done"`, `intro:done` dispatched, Lenis started |
| 1.95 to 2.50 | Exit: the lock-up glides into the header logo while the Ink curtain fades over the film |

The ground is Ink, the hero's opening colour, so there is no colour jump. It plays on **every load** and lasts about 2.5s. That is longer than the brief's 1.5 to 2.0s because clients have asked for loaders they notice (Voltwise feedback). A 3.2s failsafe completes it if the tab is throttled. Scroll stays locked until handover (verified: `scrollY` stays at 0 when wheeling at 1.2s). The boot script in `app/layout.tsx` sets `is-loading` before first paint, so the page never flashes before the loader. It's skipped with reduced motion, hidden with `<noscript>`, and the effect cleans up its timeline.

### Reveal vocabulary (declared with `data-reveal`)

| Move | Applies to | Motion | Duration |
| --- | --- | --- | --- |
| `head` | Headings, the intro statement | Whole phrase fades and rises 24px | 1.0s |
| `text` | Paragraphs, caps lines | Words rise out of a line mask, 0.006s apart | 0.9s |
| `label` | Buttons, small blocks | Fade and rise 12px | 0.7s |
| `cards` | Story, product, news, figure and pillar lists | Children rise 32px in batches, 0.08s apart | 1.0s |
| `image` | Photographs | Frame opens upward from its base (clip-path), image drifts about 10% (`data-parallax`) | 1.2s |
| `data-count` | Beyond Sustainable figures | Counts up once | 1.6s |

Each move plays once. All use one curve family (below). Sections marked `data-late` (Beyond Sustainable, News, Contact) play at 0.75x. The footer has no reveals.

### Curves and the copied interaction

The curves come from farmminerals.com's Webflow interactions: outQuart `cubic-bezier(.165,.84,.44,1)` and outQuad `cubic-bezier(.25,.46,.45,.94)`, plus an in-out `cubic-bezier(.65,0,.35,1)` for wipes. They're GSAP CustomEases (`bot-out`, `bot-quad`, `bot-io`) and CSS variables (`--ease-quart`, `--ease-quad`, `--ease-io`).

**The button** (`DotButton` in `components/ui.tsx`, `.dbtn` in `app/globals.css`) rebuilds the reference's `.btn-white` from its IX2 actions (a-9 in, a-10 out). It has a hairline frame with a 0.25em radius, and the uppercase label sits between two dots.

| | In | Out |
| --- | --- | --- |
| Frame | 1 to 1.07, 500ms, outQuart | Back to 1, 400ms, outQuart, after 100ms |
| Dots | 0.3em outward each, 300ms, outQuad, after 150ms | Back, 300ms, outQuad |

All values are `--btn-*` variables. Side by side in headless Chrome (hover held 750ms): the reference's frame reads 1.070 with dots at ±4.15px (0.3 × 13.8px type); ours reads 1.070 with dots at ±3.75px (0.3 × 12.5px type). The `solid` variant fills the frame in Red for the one primary action per section.

## Type and spacing

Inter is Botanicoir's own web font. It's self-hosted as one variable file (`public/fonts/inter-latin-opsz-normal.woff2`, weight and optical-size axes), with `opsz 14` for UI and body and `opsz 32` (Inter Display) for headings, the hero and figures. Aeonik, the reference's face, isn't Botanicoir's, so it isn't used. The scale follows the reference's ratios with clamps: h1 42 to 88px, h2 30 to 50px, statement 22 to 34px, body 16 to 17px with a 34em measure, caps 12.5px. Section padding is `--section` (48 to 80px), the gutter `--gutter` (16 to 32px), and the gap `--gap` (20 to 36px).

## Logo

On light grounds the letters are set in Ink and the tagline in Palm. On dark grounds the letters are white and the tagline Leaf. The live light-background logo has brown letters, which would add a hue outside the palette. The leaf and its veins are always as published. The favicon (`app/icon.svg`) is the leaf mark alone.

## Photography

All photographs are Botanicoir's own: the homepage slides, the category pages, the 20 Years milestones, the Beyond Sustainable page, the news posts and stills from the anniversary film. They're shown in natural colour, desaturated slightly (85% in `scripts/images.py`), with no tint. The hero loop is seven b-roll shots (misty palms, the drying field, two aerials of the works, the coir machine, coir in hand, strawberry picking). Each is cropped to the top 900 rows because the film has burned-in subtitles; shots with name captions were left out. Category illustrations and certification marks aren't adjusted, except that the marks are greyscale.

## Accessibility

There's a skip link, and all motion is off under `prefers-reduced-motion`: no smooth scroll, no preloader, no reveals, and the film doesn't autoplay. Without JavaScript nothing is hidden and the preloader is suppressed. The menu and film overlay trap focus and close on Esc. The milestones are a proper tablist. Every control is at least 44px. Text contrast: Ink on Husk 13.6:1, Ink on Leaf 6.4:1, white on Ink 15.6:1, white on Red 6.2:1. Palm on Husk is 3.7:1, so Palm is used only for large figures (32px and up) and graphics, never small text.

## Private demo settings

- `robots: noindex, nofollow` in `app/layout.tsx`. No sitemap or robots route.
- PostHog EU (`lib/posthog.ts`), injected in the `<head>`: pageview, pageleave, autocapture, session recording, `site` and UTM registration, and `scroll_depth` events at 25/50/75/100% (each once). Surveys are disabled. The key can be overridden with `NEXT_PUBLIC_POSTHOG_KEY`. No visible tracking UI.
- No Regen branding anywhere.

## Verification (7 October 2026)

- `npm run typecheck` and `npm run build` pass. Static outputs: `/`, `/_not-found`, `/icon.svg`.
- At 375, 768 and 1440: no horizontal scroll, no broken images, no console errors (`npm run shots`).
- Reduced motion: every section visible at once; no loader.
- Keyboard: the menu opens from the toggle, focus stays inside through 80 Tabs, Esc closes and focus returns. Milestones move with the arrow keys.
- Links: `npm run links` reports 57 unique destinations across 140 links, all answering. Every botanicoir.com page is in its sitemaps except `/product/propagation/`, which the live homepage links itself (200). LinkedIn answers bots with 429.
- No em or en dashes in the rendered HTML.
