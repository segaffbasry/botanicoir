import { DotButton } from "@/components/ui";
import { contact, cta } from "@/lib/content";

/* The homepage's Contact Us block and newsletter sign-up, after farmminerals.com's closing call to action: a Palm
   block with the team's photographs scattered at its edge, and the phone and email set large. */
export function Contact() {
  return (
    <section className="contact" id="contact" data-tone="dark" data-late aria-labelledby="contact-title" tabIndex={-1}>
      <div className="wrap contact-grid section">
        <div className="contact-copy">
          <h2 id="contact-title" className="h2" data-reveal="head">{cta.title}</h2>
          <ul className="contact-lines" data-reveal="label">
            <li><a href={contact.phone.href}>{contact.phone.label}</a></li>
            <li><a href={contact.email.href}>{contact.email.label}</a></li>
          </ul>
          <p className="caps" data-reveal="label">{cta.text}</p>
          <div className="actions" data-reveal="label">
            <DotButton href={cta.primary.href} variant="solid">{cta.primary.label}</DotButton>
            <DotButton href={cta.newsletter.href} className="dbtn-light">{cta.newsletter.label}</DotButton>
          </div>
        </div>
        <div className="contact-tiles" aria-hidden="true">
          {cta.tiles.map((t, i) => <img key={t.src} className={`tile tile-${i}`} src={t.src} alt="" width={779} height={520} loading="lazy" />)}
          <span className="tile-sq tile-sq-0" /><span className="tile-sq tile-sq-1" />
        </div>
      </div>
    </section>
  );
}
