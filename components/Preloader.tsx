"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, INTRO_DONE, reducedMotion } from "@/components/Motion";
import { getLenis } from "@/lib/scroll";

/* The company signing its name, built from the real logo's parts (components/Logo.tsx). Botanicoir's mark is a leaf
   with white veins over the wordmark, so the build follows a plant: the leaf grows out from its stalk, its veins
   open along the midrib, then the ten letters of "Botanicoir" rise out of the ground line one after another and
   "Producers of Quality Cocopeat" wipes in beneath. A hairline fill and a counter show progress (clients asked for a
   loader they notice). The ground is Ink, the hero's opening colour, so there is no jump. One timeline, about 2.5s:
     0.08 to 0.78  leaf grows from its stalk (scale and a quarter turn back to rest)
     0.45 to 0.95  veins open
     0.55 to 1.37  letters rise, 0.045s apart, then the registered mark
     1.15 to 1.60  tagline wipes in
     0.00 to 1.90  progress fill and counter
     1.95 to 2.50  exit: the lock-up glides into the header logo while the curtain fades over the film;
                   handover fires at 1.95 so the hero entrance overlaps
   Plays on every load; skipped with reduced motion; hidden without JavaScript. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    let handed = false;
    const handover = () => {
      if (handed) return; handed = true;
      html.classList.remove("is-loading");
      html.dataset.intro = "done";
      getLenis()?.start();
      window.dispatchEvent(new Event(INTRO_DONE));
    };
    if (!el || !html.classList.contains("is-loading") || reducedMotion()) {
      if (el) el.style.display = "none";
      html.classList.add("logo-landed");
      handover();
      return;
    }
    window.scrollTo(0, 0);
    const q = (s: string) => el.querySelectorAll(s);
    const lockup = el.querySelector<HTMLElement>(".preloader-logo")!;
    const target = document.querySelector<HTMLElement>(".header-logo .logo");
    const counter = el.querySelector<HTMLElement>(".preloader-count")!;
    const flight = () => {
      if (!target) return { x: 0, y: -60, scale: 0.3 };
      const a = lockup.getBoundingClientRect(), b = target.getBoundingClientRect();
      return { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width };
    };
    const progress = { v: 0 };

    gsap.set(q('[data-part="mark"]'), { svgOrigin: "303.6 83.7", scale: 0, rotation: -28 });
    gsap.set(q('[data-part="letter"]'), { y: 110 });
    gsap.set(q('[data-part="reg"]'), { opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => { el.style.display = "none"; html.classList.add("logo-landed"); } });
    tl.add(() => el.classList.add("is-active"), 0)
      .to(progress, { v: 100, duration: 1.9, ease: "power1.inOut", onUpdate: () => { counter.textContent = String(Math.round(progress.v)).padStart(2, "0"); } }, 0)
      .fromTo(q(".preloader-fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: "power1.inOut" }, 0)
      .to(q('[data-part="mark"]'), { scale: 1, rotation: 0, duration: 0.7, ease: EASE }, 0.08)
      .to(q('[data-part="veins-wipe"]'), { attr: { width: 122 }, duration: 0.5, ease: EASE_IO }, 0.45)
      .to(q('[data-part="letter"]'), { y: 0, duration: 0.6, ease: EASE, stagger: 0.045 }, 0.55)
      .to(q('[data-part="reg"]'), { opacity: 1, duration: 0.3, ease: "none" }, 1.2)
      .to(q('[data-part="tag-wipe"]'), { attr: { width: 545 }, duration: 0.45, ease: EASE_IO }, 1.15)
      .to(q(".preloader-meter"), { autoAlpha: 0, duration: 0.3, ease: "none" }, 1.9)
      .add(handover, 1.95)
      // Measured when the exit starts (tweens initialise lazily), so late layout shifts are accounted for.
      .to(lockup, { x: () => flight().x, y: () => flight().y, scale: () => flight().scale, duration: 0.55, ease: EASE_IO }, 1.95)
      .to(q(".preloader-curtain"), { autoAlpha: 0, duration: 0.5, ease: "none" }, 1.98);

    // Never hold the page for long: if the tab was hidden or throttled, finish anyway.
    const failsafe = window.setTimeout(() => { tl.progress(1); }, 3200);
    return () => { window.clearTimeout(failsafe); tl.kill(); };
  }, []);

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader-curtain" />
      <div className="preloader-logo"><Logo id="pl" build title="" /></div>
      <div className="preloader-meter">
        <span className="preloader-count">00</span>
        <span className="preloader-track"><span className="preloader-fill" /></span>
      </div>
    </div>
  );
}
