import { DotButton, Icon } from "@/components/ui";
import { stories } from "@/lib/content";

/* The live hero slider's four stories, laid out side by side on Ink instead of rotating, so all four are seen. Each
   card is the slide's photograph and headline and links to the story it opens on the live site. */
export function Stories() {
  return (
    <section className="stories section" id="stories" data-tone="dark" aria-labelledby="stories-title" tabIndex={-1}>
      <div className="wrap">
        <div className="row-head">
          <h2 id="stories-title" className="h2 stories-title" data-reveal="head">{stories.title}</h2>
          <div className="row-head-side">
            <p className="caps" data-reveal="text">{stories.text}</p>
            <div data-reveal="label"><DotButton href={stories.cta.href} className="dbtn-light">{stories.cta.label}</DotButton></div>
          </div>
        </div>
        <ul className="story-list" data-reveal="cards">
          {stories.items.map((s) => (
            <li key={s.href} className="story">
              <a href={s.href} target="_blank" rel="noopener">
                <span className="story-media"><img src={s.image} alt={s.alt} width={1200} height={546} loading="lazy" /></span>
                <span className="story-title">{s.title}</span>
                <span className="caps story-more">Read more<Icon name="arrow" /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
