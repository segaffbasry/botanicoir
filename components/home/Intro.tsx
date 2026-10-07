import { DotButton } from "@/components/ui";
import { intro } from "@/lib/content";

/* The homepage introduction, as farmminerals.com's second section: a statement on the cream ground beside a
   photograph. The lead is the live paragraph's first sentence; the rest follows as body copy. */
export function Intro() {
  return (
    <section className="intro section" id="about" data-tone="light" aria-label="About Botanicoir" tabIndex={-1}>
      <div className="wrap intro-grid">
        <div className="intro-copy">
          <p className="statement" data-reveal="head">{intro.lead}</p>
          <p className="body intro-text" data-reveal="text">{intro.text}</p>
          <div data-reveal="label"><DotButton href={intro.cta.href} variant="solid">{intro.cta.label}</DotButton></div>
        </div>
        <figure className="intro-media frame" data-reveal="image">
          <img src={intro.image.src} alt={intro.image.alt} width={intro.image.w} height={intro.image.h} loading="lazy" data-parallax />
        </figure>
      </div>
    </section>
  );
}
