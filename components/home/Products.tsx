import { Icon } from "@/components/ui";
import { catalogue } from "@/lib/content";

/* Our Products, after farmminerals.com's product row: a photograph from each category page over a Leaf panel. The
   homepage's own category illustration sits small inside the panel (multiplied so its white ground drops away), so it
   reads as part of the box (client feedback, 8 Oct). */
export function Products() {
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
      </div>
    </section>
  );
}
