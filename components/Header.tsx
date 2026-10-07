"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { EASE, EASE_IO, onIntro, reducedMotion } from "@/components/Motion";
import { Icon, external } from "@/components/ui";
import { about, contact, languages, products, sections, socials } from "@/lib/content";
import { getLenis } from "@/lib/scroll";

/* Full-screen menu on Ink: the panel drops open from the top, then the live navigation rises in group by group.
   GSAP timeline in, the same timeline reversed out. Focus is trapped inside, Esc closes, focus returns to the toggle. */
function Menu({ open, close }: { open: boolean; close: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const t = gsap.timeline({ paused: true, onReverseComplete: () => { el.style.visibility = "hidden"; } });
    t.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE_IO }, 0)
      // opacity, not autoAlpha: the links must be focusable the moment the menu opens.
      .fromTo(el.querySelectorAll("[data-menu-in]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.035 }, 0.3);
    tl.current = t;
    return () => { t.kill(); };
  }, []);

  useEffect(() => {
    const el = root.current, t = tl.current; if (!el || !t) return;
    const lenis = getLenis();
    if (open) {
      el.style.visibility = "visible";
      t.timeScale(reducedMotion() ? 100 : 1).play();
      lenis?.stop();
      // The header's toggle (now "Close") sits above the panel, so it is part of the trap.
      const focusables = () => [document.querySelector<HTMLElement>(".menu-toggle"), ...Array.from(el.querySelectorAll<HTMLElement>("a[href], button"))].filter((f): f is HTMLElement => !!f);
      focusables()[1]?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") { close(); return; }
        if (e.key !== "Tab") return;
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (t.progress() > 0) { lenis?.start(); t.timeScale(reducedMotion() ? 100 : 1.4).reverse(); }
  }, [open, close]);

  // Section links close the menu first, then the page scrolls (the link guard in Motion does the scrolling).
  const onClick = (e: React.MouseEvent) => { if ((e.target as Element).closest('a[href^="#"]')) close(); };

  return (
    <div className="menu" id="site-menu" ref={root} role="dialog" aria-modal="true" aria-label="Menu" inert={!open} data-lenis-prevent onClick={onClick}>
      <div className="menu-inner wrap">
        <nav className="menu-products" aria-label={products.label}>
          <p className="caps menu-head" data-menu-in>{products.label}</p>
          <div className="menu-groups">
            {products.groups.map((g) => (
              <div key={g.label} className="menu-group" data-menu-in>
                {g.href ? <a className="menu-group-title" href={g.href} {...external(g.href)}>{g.label}</a> : <p className="menu-group-title">{g.label}</p>}
                <ul>{g.links.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </nav>
        <div className="menu-side">
          <nav aria-label="About" data-menu-in>
            <p className="caps menu-head">About</p>
            <ul className="menu-big">{about.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
          </nav>
          <nav aria-label="On this page" data-menu-in>
            <p className="caps menu-head">On this page</p>
            <ul className="menu-list">{sections.map((s) => <li key={s.href}><a href={s.href}>{s.label}</a></li>)}</ul>
          </nav>
          <div data-menu-in className="menu-contact">
            <a href={contact.phone.href}>{contact.phone.label}</a>
            <a href={contact.email.href}>{contact.email.label}</a>
            <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...external(s.href)}><Icon name={s.icon} /></a></li>)}</ul>
            <ul className="langs" aria-label="Languages">{languages.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* farmminerals.com's header arrangement: menu on the left, the logo in the centre, contact on the right. No bar and
   no box. Its colour follows the section behind it (each section declares data-tone="dark" or "light", the way the
   reference flips its header between beige and olive). It slides away on the way down and returns on the way up. */
export function Header() {
  const [open, setOpen] = useState(false);
  // Kept in state, not added with classList: React rewrites className on every render (opening the menu is one).
  const [entered, setEntered] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const bar = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);

  useEffect(() => {
    const el = bar.current; if (!el) return;
    let last = window.scrollY, frame = 0;
    const tones = () => Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    const update = () => {
      frame = 0;
      const y = window.scrollY, d = y - last;
      const probe = 32;
      const under = tones().find((s) => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; });
      setTone(under?.dataset.tone === "light" ? "light" : "dark");
      if (y < 120) { el.classList.remove("is-hidden"); last = y; return; }
      if (Math.abs(d) < 6) return;
      el.classList.toggle("is-hidden", d > 0);
      last = y;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", queue, { passive: true });
    update();
    const off = onIntro(() => setEntered(true));
    return () => { window.removeEventListener("scroll", queue); cancelAnimationFrame(frame); off(); };
  }, []);

  useEffect(() => { if (open) bar.current?.classList.remove("is-hidden"); }, [open]);

  return (
    <>
      <header className={`site-header tone-${tone}${entered ? " is-in" : ""}${open ? " is-open" : ""}`} ref={bar}>
        <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? close() : setOpen(true))}>
          <span className="menu-toggle-icon" aria-hidden="true"><i /><i /></span>
          <span className="caps">{open ? "Close" : "Menu"}</span>
        </button>
        <a href="#top" className="header-logo" aria-label="Botanicoir, back to the top"><Logo id="hd" title="" /></a>
        <a href={contact.page} className="header-contact caps" {...external(contact.page)}>Contact us</a>
      </header>
      <Menu open={open} close={close} />
    </>
  );
}
