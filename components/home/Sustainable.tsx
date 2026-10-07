import { DotButton } from "@/components/ui";
import { sustainable } from "@/lib/content";

/* Beyond Sustainable, after farmminerals.com's numbers and "carbon cost" sections: the mission and the page's own
   figures as hairline rows beside a photograph of the coconut palms the coir comes from, then the six focus areas. */
export function Sustainable() {
  return (
    <section className="sust section" id="sustainable" data-tone="light" data-late aria-labelledby="sust-title" tabIndex={-1}>
      <div className="wrap sust-grid">
        <div className="sust-copy">
          <h2 id="sust-title" className="h2" data-reveal="head">{sustainable.title}</h2>
          <p className="body" data-reveal="text">{sustainable.text}</p>
          <div className="actions" data-reveal="label">
            <DotButton href={sustainable.ctas[0].href} variant="solid">{sustainable.ctas[0].label}</DotButton>
            <DotButton href={sustainable.ctas[1].href}>{sustainable.ctas[1].label}</DotButton>
          </div>
          <dl className="facts" data-reveal="cards">
            {sustainable.facts.map((f) => (
              <div key={f.label} className="fact">
                <dt className="caps">{f.label}</dt>
                <dd aria-label={`${f.value}${f.suffix}`}><span data-count={f.value} aria-hidden="true">{f.value}</span><span aria-hidden="true">{f.suffix}</span></dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="sust-media frame" data-reveal="image">
          <img src={sustainable.image.src} alt={sustainable.image.alt} width={sustainable.image.w} height={sustainable.image.h} loading="lazy" data-parallax />
        </figure>
      </div>
      <ul className="wrap pillars" data-reveal="cards" aria-label="Focus areas">
        {sustainable.pillars.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </section>
  );
}
