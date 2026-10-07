import type { ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

const glyphs = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  out: <path d="M8 16 16 8M9 8h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
  close: <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
};

export type IconName = keyof typeof glyphs | keyof typeof brandIcons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const brand = (brandIcons as Record<string, string>)[name];
  return (
    <svg className={`icon ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {brand ? <path d={brand} fill="currentColor" /> : glyphs[name as keyof typeof glyphs]}
    </svg>
  );
}

const external = (href: string) => (href.startsWith("#") ? {} : { target: "_blank", rel: "noopener" });

/* The copied interaction: farmminerals.com's ".btn-white" hover, rebuilt from its Webflow IX2 actions (a-9 in, a-10
   out). A hairline frame (.08em, radius .25em) holds an uppercase label between two .25em dots.
     hover in:  frame scales to 1.07 over 500ms outQuart; each dot steps .3em outward over 300ms outQuad after 150ms
     hover out: dots return over 300ms outQuad; the frame settles back over 400ms outQuart after 100ms
   The timings and curves are CSS variables (--btn-*, --ease-quart, --ease-quad in globals.css). Variants: "solid"
   fills the frame (Botanicoir red), used once per section for the primary action. */
export function DotButton({ href, children, variant, className }: { href: string; children: ReactNode; variant?: "solid"; className?: string }) {
  return (
    <a href={href} className={`dbtn${variant ? ` dbtn-${variant}` : ""} ${className ?? ""}`} {...external(href)}>
      <span className="dbtn-frame" aria-hidden="true" />
      <span className="dbtn-dot dbtn-dot-l" aria-hidden="true" />
      <span className="dbtn-label">{children}</span>
      <span className="dbtn-dot dbtn-dot-r" aria-hidden="true" />
    </a>
  );
}

/* The same button for actions on this page (the film overlay, the milestone stepper). */
export function DotAction({ onClick, children, label }: { onClick: () => void; children: ReactNode; label?: string }) {
  return (
    <button type="button" className="dbtn" onClick={onClick} aria-label={label}>
      <span className="dbtn-frame" aria-hidden="true" />
      <span className="dbtn-dot dbtn-dot-l" aria-hidden="true" />
      <span className="dbtn-label">{children}</span>
      <span className="dbtn-dot dbtn-dot-r" aria-hidden="true" />
    </button>
  );
}

/* A text link with an arrow that slides on hover. */
export function MoreLink({ href, children, sr }: { href: string; children: ReactNode; sr?: string }) {
  return (
    <a className="more" href={href} {...external(href)}>
      {children}{sr && <span className="sr-only"> {sr}</span>}<Icon name="arrow" />
    </a>
  );
}

export { external };
