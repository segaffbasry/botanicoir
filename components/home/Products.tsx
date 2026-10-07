import { Icon } from "@/components/ui";
import { catalogue, products } from "@/lib/content";

/* Our Products, after farmminerals.com's product row: Leaf panels with the product art rising out of the top edge.
   Here the art is the homepage's own category illustrations (multiplied onto the panel so their white ground drops
   away) over each category page's photograph. Below, the live menu's Format, Treatment and Application lists. */
export function Products() {
  const finders = products.groups.filter((g) => !g.href);
  return (
    <section className="products section" id="products" data-tone="light" aria-labelledby="products-title" tabIndex={-1}>
      <div className="wrap">
        <div className="row-head">
          <h2 id="products-title" className="h2" data-reveal="head">{catalogue.title}</h2>
          <div className="row-head-side">
            {catalogue.text.map((t) => <p key={t} className="body" data-reveal="text">{t}</p>)}
          </div>
        </div>
        <ul className="product-list" data-reveal="cards">
          {catalogue.items.map((p) => (
            <li key={p.href} className="product">
              <a href={p.href} target="_blank" rel="noopener">
                <span className="product-photo"><img src={p.image} alt={p.alt} width={1200} height={426} loading="lazy" /></span>
                <span className="product-panel">
                  <img className="product-icon" src={p.icon} alt="" width={300} height={206} loading="lazy" />
                  <span className="product-corner" aria-hidden="true"><Icon name="arrow" /></span>
                  <span className="product-title">{p.title}</span>
                  <span className="caps product-crops">{p.crops.join(" · ")}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="finders" data-reveal="cards">
          {finders.map((g) => (
            <nav key={g.label} className="finder" aria-label={`Products by ${g.label.toLowerCase()}`}>
              <p className="caps finder-head">{g.label}</p>
              <ul>{g.links.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener">{l.label}<Icon name="out" /></a></li>)}</ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
}
