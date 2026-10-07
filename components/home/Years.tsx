"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, reducedMotion } from "@/components/Motion";
import { DotAction, DotButton, Icon } from "@/components/ui";
import { years } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* The homepage's YouTube film ("Celebrating 20 Years of Botanicoir") in an overlay on this page, so the visitor never
   leaves. youtube-nocookie, loaded only when opened. Focus trapped, Esc closes, focus returns to the trigger. */
function FilmDialog({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current; if (!el || !open) return;
    getLenis()?.stop();
    gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: reducedMotion() ? 0 : 0.4, ease: "none" });
    el.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") { e.preventDefault(); el.querySelector<HTMLElement>(e.shiftKey ? "iframe" : "button")?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); getLenis()?.start(); };
  }, [open, close]);
  if (!open) return null;
  return (
    <div className="film-dialog" ref={root} role="dialog" aria-modal="true" aria-label={years.film.label} data-lenis-prevent onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <button className="film-close" onClick={close}><Icon name="close" /><span className="caps">Close</span></button>
      <div className="film-frame">
        <iframe src={`https://www.youtube-nocookie.com/embed/${years.film.id}?autoplay=1&rel=0`} title={years.film.label} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      </div>
    </div>
  );
}

/* A signature visual from Botanicoir's own record: all 18 milestones on the 20 Years page as one timeline axis.
   Each tick is a tab; hover, focus, click or the arrow keys change the panel (photograph, year, title, text).
   Nothing is pinned or scroll-driven. */
function Milestones() {
  const [i, setI] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = years.milestones[i];
  const n = years.milestones.length;
  const go = useCallback((next: number, focus = false) => {
    const k = (next + n) % n;
    setI(k);
    if (focus) tabs.current[k]?.focus();
  }, [n]);

  useEffect(() => {
    const el = panel.current; if (!el || reducedMotion()) return;
    gsap.fromTo(el.querySelectorAll(".ms-anim"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: EASE, stagger: 0.05 });
    gsap.fromTo(el.querySelector(".ms-photo img"), { scale: 1.06 }, { scale: 1, duration: 1, ease: EASE });
  }, [i]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(i + 1, true); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(i - 1, true); }
    if (e.key === "Home") { e.preventDefault(); go(0, true); }
    if (e.key === "End") { e.preventDefault(); go(n - 1, true); }
  };

  return (
    <div className="ms" data-reveal="label">
      <div className="ms-head">
        <h3 className="h3">{years.milestonesTitle}</h3>
        <div className="ms-steps">
          <DotAction onClick={() => go(i - 1)} label="Previous milestone"><Icon name="left" /></DotAction>
          <DotAction onClick={() => go(i + 1)} label="Next milestone"><Icon name="arrow" /></DotAction>
        </div>
      </div>
      <div className="ms-axis" role="tablist" aria-label="Milestones, 2005 to 2025" onKeyDown={onKey}>
        {years.milestones.map((s, k) => (
          <button key={k} ref={(b) => { tabs.current[k] = b; }} role="tab" id={`ms-tab-${k}`} aria-selected={k === i} aria-controls="ms-panel"
            tabIndex={k === i ? 0 : -1} className={`ms-tick${k === i ? " is-on" : ""}${k <= i ? " is-past" : ""}`}
            onClick={() => go(k)} onMouseEnter={() => go(k)}>
            <span className="ms-year">{s.year}</span>
            <span className="sr-only">: {s.title}</span>
          </button>
        ))}
      </div>
      <div className="ms-panel" id="ms-panel" role="tabpanel" aria-labelledby={`ms-tab-${i}`} ref={panel}>
        <figure className="ms-photo frame"><img src={`/media/${m.image}.webp`} alt="" width={779} height={520} /></figure>
        <div className="ms-copy">
          <p className="ms-big ms-anim" aria-hidden="true">{m.year}</p>
          <p className="ms-title ms-anim">{m.title}</p>
          <p className="body ms-text ms-anim">{m.text}</p>
          <p className="caps ms-count ms-anim">{String(i + 1).padStart(2, "0")} / {n}</p>
        </div>
      </div>
    </div>
  );
}

/* Over 20 Years Growing Together: the homepage block, the founders' thanks with their portrait, the film, then the
   milestones. */
export function Years() {
  const [film, setFilm] = useState(false);
  const trigger = useRef<HTMLDivElement>(null);
  const close = useCallback(() => { setFilm(false); trigger.current?.querySelector("button")?.focus(); }, []);
  return (
    <section className="years section" id="years" data-tone="light" aria-labelledby="years-title" tabIndex={-1}>
      <div className="wrap">
        <div className="years-grid">
          <div className="years-copy">
            <h2 id="years-title" className="h2" data-reveal="head">{years.title}</h2>
            <p className="body" data-reveal="text">{years.text}</p>
            <div className="actions" data-reveal="label" ref={trigger}>
              <DotButton href={years.cta.href} variant="solid">{years.cta.label}</DotButton>
              <DotAction onClick={() => setFilm(true)}><Icon name="play" />Watch the film</DotAction>
            </div>
          </div>
          <figure className="founders">
            <div className="frame founders-photo" data-reveal="image">
              <img src={years.founders.src} alt={years.founders.alt} width={years.founders.w} height={years.founders.h} loading="lazy" data-parallax />
            </div>
            <blockquote data-reveal="label">
              <p>“{years.quote}”</p>
              <footer className="caps">{years.by}</footer>
            </blockquote>
          </figure>
        </div>
        <Milestones />
      </div>
      <FilmDialog open={film} close={close} />
    </section>
  );
}
