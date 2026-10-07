import { GRADIENT, LEAF, LETTERS, OFFSET, REGISTERED, TAGLINE, VEINS, VIEWBOX } from "@/lib/logo";

/* Botanicoir's own vector logo (lib/logo.ts, split by scripts/logo.py), drawn from its parts so the preloader can
   assemble it. The leaf keeps its published gradient and white veins. The letters take currentColor (white on dark
   grounds, Ink on light ones) and the tagline takes --logo-tag, so the lock-up follows the palette. With build="pl"
   the clip rectangles the preloader animates are added: they start closed, so the parts are hidden until it runs. */
export function Logo({ id = "lg", build = false, title = "Botanicoir" }: { id?: string; build?: boolean; title?: string }) {
  const [ox, oy] = OFFSET;
  const t = `translate(${ox} ${oy})`;
  return (
    <svg className="logo" viewBox={VIEWBOX} role={title ? "img" : undefined} aria-label={title || undefined} aria-hidden={title ? undefined : true} focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1={GRADIENT.x1} y1={GRADIENT.y1} x2={GRADIENT.x2} y2={GRADIENT.y2} gradientUnits="userSpaceOnUse">
          <stop offset={GRADIENT.at} stopColor={GRADIENT.from} />
          <stop offset="1" stopColor={GRADIENT.to} />
        </linearGradient>
        {build && (
          <>
            {/* The veins open from the stalk outward, along the midrib (left to right). */}
            <clipPath id={`${id}-veins`}><rect data-part="veins-wipe" x="168" y="0" width="0" height="72" /></clipPath>
            {/* The letters rise out of a mask cut at the baseline band. */}
            <clipPath id={`${id}-letters`}><rect x="0" y="44" width="545" height="104" /></clipPath>
            <clipPath id={`${id}-tag`}><rect data-part="tag-wipe" x="0" y="150" width="0" height="42" /></clipPath>
          </>
        )}
      </defs>
      <g data-part="mark">
        <path data-part="leaf" d={LEAF} transform={t} fill={`url(#${id}-g)`} />
        <polygon data-part="veins" points={VEINS} fill="#fff" clipPath={build ? `url(#${id}-veins)` : undefined} />
      </g>
      <g clipPath={build ? `url(#${id}-letters)` : undefined}>
        <g transform={t} fill="currentColor">
          {LETTERS.map((d, i) => <path key={i} data-part="letter" d={d} />)}
          {REGISTERED.map((d, i) => <path key={`r${i}`} data-part="reg" d={d} />)}
        </g>
      </g>
      <g clipPath={build ? `url(#${id}-tag)` : undefined}>
        <g transform={t} className="logo-tag">
          {TAGLINE.map((d, i) => <path key={i} d={d} />)}
        </g>
      </g>
    </svg>
  );
}
