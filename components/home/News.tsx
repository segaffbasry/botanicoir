"use client";

import { useEffect, useRef, useState } from "react";
import { DotButton, Icon } from "@/components/ui";
import { news } from "@/lib/content";

/* News & Events, after farmminerals.com's "Latest from the community": a full-bleed landscape (a still from the
   anniversary film) with the four newest posts in a row that scrolls sideways on narrow screens, with arrows. */
export function News() {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const r = rail.current; if (!r) return;
    const check = () => setEdge({ start: r.scrollLeft < 4, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 4 });
    check();
    r.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => { r.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);
  const step = (dir: number) => {
    const r = rail.current; if (!r) return;
    const card = r.firstElementChild as HTMLElement | null;
    r.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };
  return (
    <section className="news" id="news" data-tone="dark" data-late aria-labelledby="news-title" tabIndex={-1}>
      <img className="news-bg" src={news.background.src} alt="" width={1920} height={900} loading="lazy" />
      <div className="news-shade" aria-hidden="true" />
      <div className="wrap news-grid section">
        <div className="news-head">
          <h2 id="news-title" className="h2" data-reveal="head">{news.title}</h2>
          <p className="caps" data-reveal="text">{news.text}</p>
          <div className="news-ctl" data-reveal="label">
            <button className="sq" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous posts"><Icon name="left" /></button>
            <button className="sq" onClick={() => step(1)} disabled={edge.end} aria-label="Next posts"><Icon name="arrow" /></button>
          </div>
          <div data-reveal="label"><DotButton href={news.cta.href} className="dbtn-light">{news.cta.label}</DotButton></div>
        </div>
        <ul className="news-rail" ref={rail} data-reveal="cards" data-lenis-prevent-horizontal>
          {news.items.map((n) => (
            <li key={n.href} className="post">
              <a href={n.href} target="_blank" rel="noopener">
                <span className="post-media"><img src={n.image} alt="" width={900} height={600} loading="lazy" /></span>
                <span className="post-body">
                  <span className="caps post-meta"><time>{n.date}</time> · {n.categories.join(", ")}</span>
                  <span className="post-title">{n.title}</span>
                  <span className="post-text">{n.excerpt}</span>
                  <span className="caps post-more">Read in full<Icon name="arrow" /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
