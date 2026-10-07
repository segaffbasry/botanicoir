"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/scroll";
import { splitWords } from "@/lib/split";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/* The curve family. Both come from farmminerals.com's Webflow interactions (the button hover, see components/ui.tsx):
   "outQuart" for anything that settles and "outQuad" for small steps. A symmetrical in-out joins them for wipes.
   The same three curves are CSS variables in globals.css (--ease-quart, --ease-quad, --ease-io). */
CustomEase.create("bot-out", "M0,0 C0.165,0.84 0.44,1 1,1"); // outQuart, cubic-bezier(.165,.84,.44,1)
CustomEase.create("bot-quad", "M0,0 C0.25,0.46 0.45,0.94 1,1"); // outQuad, cubic-bezier(.25,.46,.45,.94)
CustomEase.create("bot-io", "M0,0 C0.65,0 0.35,1 1,1");
export const EASE = "bot-out";
export const EASE_QUAD = "bot-quad";
export const EASE_IO = "bot-io";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Handover from the preloader: the hero, header and scroll wait for this.
export const INTRO_DONE = "intro:done";
export const introDone = () => document.documentElement.dataset.intro === "done";
export function onIntro(fn: () => void) {
  if (introDone()) { fn(); return () => {}; }
  window.addEventListener(INTRO_DONE, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE, fn);
}

/* Page-wide behaviour:
   - the link guard: this is a private demo, so links keep their live hrefs but never leave the page;
     "#" links scroll through Lenis instead
   - Lenis on the GSAP ticker (lerp 0.1, as farmminerals.com sets it), synced with ScrollTrigger and stopped while the
     preloader plays
   - the reveal vocabulary, declared in markup with data-reveal (see the table in README.md):
       head   a heading: the whole phrase fades and rises once
       text   a paragraph: its words rise out of a line mask, a few thousandths of a second apart
       label  labels, buttons and small lines: a short fade and rise
       cards  a list: its children rise in batches as they arrive
       image  a frame that opens upward from its base, the way a seedling comes up; an <img data-parallax> inside
              drifts about 10%
     Anything inside [data-late] (the last sections) plays at 0.75 of the duration. */
export function Motion() {
  useEffect(() => {
    const guard = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      e.preventDefault();
      if (!href.startsWith("#")) return;
      const target = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);
      if (target === null) return;
      const lenis = getLenis();
      // A link inside the menu fires while the menu still has Lenis stopped; start() first so this scroll survives.
      if (lenis) { lenis.start(); lenis.scrollTo(target as HTMLElement | number, { duration: 1.4 }); }
      else if (typeof target === "number") window.scrollTo({ top: 0 });
      else target.scrollIntoView();
      if (typeof target !== "number") target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", guard, true);
    document.addEventListener("auxclick", guard, true);
    const unguard = () => { document.removeEventListener("click", guard, true); document.removeEventListener("auxclick", guard, true); };

    if (reducedMotion()) return unguard;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 }); // farmminerals.com: new Lenis({ lerp: 0.1 })
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-loading")) lenis.stop();

    const ctx = gsap.context(() => {
      const pace = (el: Element) => (el.closest("[data-late]") ? 0.75 : 1);
      const once = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>('[data-reveal="head"]').forEach((el) => {
        gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 * pace(el), ease: EASE, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="text"]').forEach((el) => {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(words, { yPercent: 105 }, { yPercent: 0, duration: 0.9 * pace(el), ease: EASE, stagger: 0.006, scrollTrigger: once(el) });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="label"]').forEach((el) => {
        gsap.fromTo(el, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 * pace(el), ease: EASE, scrollTrigger: once(el, "top 94%") });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="cards"]').forEach((list) => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(list, { autoAlpha: 1 });
        gsap.set(items, { y: 32, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1 * pace(list), ease: EASE, stagger: 0.08, clearProps: "transform" }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 * pace(el), ease: EASE_IO, scrollTrigger: once(el, "top 88%") });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.12, ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const decimals = (el.dataset.count ?? "").split(".")[1]?.length ?? 0;
        const box = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(box, { v: to, duration: 1.6 * pace(el), ease: EASE, scrollTrigger: once(el), onUpdate: () => { el.textContent = box.v.toFixed(decimals); } });
      });
    });
    document.documentElement.classList.add("motion-ready");

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      unguard();
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
