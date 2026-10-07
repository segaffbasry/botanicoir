import { Logo } from "@/components/Logo";
import { Icon, external } from "@/components/ui";
import { about, certifications, contact, languages, legal, products, socials } from "@/lib/content";

/* The live footer's contents (certifications, legal links, phone, email, socials) with the main navigation laid out
   as columns, on the cream ground. No scroll reveals here: they fire in the last pixels and read as a jump. */
export function Footer() {
  return (
    <footer className="site-footer" data-tone="light">
      <div className="wrap">
        <ul className="certs" aria-label="Certifications and memberships">
          {certifications.map((c) => <li key={c.src}><img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" /></li>)}
        </ul>
        <div className="footer-grid">
          {products.groups.map((g) => (
            <nav key={g.label} aria-label={g.label}>
              <p className="caps footer-head">{g.href ? <a href={g.href} {...external(g.href)}>{g.label}</a> : g.label}</p>
              <ul>{g.links.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
            </nav>
          ))}
          <nav aria-label="About">
            <p className="caps footer-head">About</p>
            <ul>{about.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
          </nav>
          <div className="footer-contact">
            <p className="caps footer-head">Contact</p>
            <a href={contact.phone.href}>{contact.phone.label}</a>
            <a href={contact.email.href}>{contact.email.label}</a>
            <ul className="socials">{socials.map((s) => <li key={s.name}><a href={s.href} aria-label={s.name} {...external(s.href)}><Icon name={s.icon} /></a></li>)}</ul>
          </div>
        </div>
        <a href="#top" className="footer-logo" aria-label="Botanicoir, back to the top"><Logo id="ft" title="" /></a>
        <div className="footer-bar">
          <p>{legal.copyright}</p>
          <ul>{legal.links.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
          <ul className="langs" aria-label="Languages">{languages.map((l) => <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>)}</ul>
        </div>
      </div>
    </footer>
  );
}
