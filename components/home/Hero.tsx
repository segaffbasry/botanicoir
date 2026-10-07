"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { EASE, onIntro, reducedMotion } from "@/components/Motion";
import { DotButton, Icon } from "@/components/ui";
import { hero } from "@/lib/content";

/* One screen of the anniversary film (scripts/film.sh) under an Ink shade, with farmminerals.com's hero arrangement:
   the statement top left, the answering line, a short caps line and the action bottom right.
   Entrance, on intro:done: the headline's letters appear in random order (the reference's [text-split] move:
   autoAlpha 0 to 1, 0.4s power2.out, 0.02s apart, from "random"); this and the preloader are the only per-letter
   motion on the page. The film settles from 1.08 to 1, then the side block rises.
   Film: muted, loops, pauses off screen and on request, poster first; with reduced motion it does not autoplay. */
export function Hero() {
  const stage = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = stage.current, v = video.current; if (!el || !v) return;
    v.muted = true; // React does not render the muted attribute on the server
    const play = () => { if (!userPaused.current && !reducedMotion()) v.play().catch(() => {}); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) play(); else v.pause(); }, { threshold: 0.05 });
    io.observe(el);
    const onPlay = () => setPlaying(true), onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay); v.addEventListener("pause", onPause);

    if (reducedMotion()) return () => { io.disconnect(); v.removeEventListener("play", onPlay); v.removeEventListener("pause", onPause); };

    const chars: HTMLElement[] = [];
    el.querySelectorAll<HTMLElement>(".hero-line").forEach((line) => {
      const text = line.textContent ?? "";
      line.textContent = "";
      text.split(/(\s+)/).forEach((word) => {
        if (/^\s+$/.test(word)) { line.append(word); return; }
        const w = document.createElement("span"); w.className = "hw";
        [...word].forEach((c) => { const s = document.createElement("span"); s.textContent = c; w.append(s); chars.push(s); });
        line.append(w);
      });
    });
    const side = el.querySelectorAll(".hero-side > *, .hero-foot");
    gsap.set(chars, { autoAlpha: 0 });
    gsap.set(side, { y: 18, autoAlpha: 0 });
    gsap.set(el.querySelector(".hero-film"), { scale: 1.08 });
    const off = onIntro(() => {
      gsap.timeline()
        .to(el.querySelector(".hero-film"), { scale: 1, duration: 2, ease: EASE }, 0)
        .to(chars, { autoAlpha: 1, duration: 0.4, ease: "power2.out", stagger: { each: 0.02, from: "random" } }, 0.1)
        .to(side, { y: 0, autoAlpha: 1, duration: 1, ease: EASE, stagger: 0.08 }, 0.45);
    });
    return () => { off(); io.disconnect(); v.removeEventListener("play", onPlay); v.removeEventListener("pause", onPause); };
  }, []);

  const toggle = () => {
    const v = video.current; if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); } else { userPaused.current = true; v.pause(); }
  };

  return (
    <section className="hero" ref={stage} data-tone="dark" aria-labelledby="hero-title">
      <div className="hero-film">
        <video ref={video} poster={hero.film.poster} muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
          <source media="(max-width: 767px)" src={hero.film.mobile} type="video/mp4" />
          <source src={hero.film.src} type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner wrap">
        <h1 id="hero-title" className="hero-title">
          {hero.title.map((l) => <span key={l} className="hero-line">{l}</span>)}
        </h1>
        <div className="hero-side">
          <p className="hero-sub">{hero.side[0]}<br />{hero.side[1]}</p>
          <p className="caps hero-text">{hero.text}</p>
          <DotButton href={hero.cta.href} className="dbtn-light">{hero.cta.label}</DotButton>
        </div>
        <div className="hero-foot">
          <button className="film-toggle" onClick={toggle} aria-label={playing ? "Pause the film" : "Play the film"}>
            <Icon name={playing ? "pause" : "play"} />
          </button>
          <span className="caps">{hero.foot}</span>
        </div>
      </div>
    </section>
  );
}
