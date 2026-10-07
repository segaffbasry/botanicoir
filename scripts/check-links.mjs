// Checks every link on the rendered homepage: botanicoir.com pages must be in one of the live sitemaps and answer
// 200 (files under /wp-content/uploads/ only need to answer); other URLs must answer (social sites that refuse bots
// are reported, not failed); every outbound link opens in a new tab with rel="noopener"; "#" links point at an
// element on the page. Usage: node scripts/check-links.mjs [http://127.0.0.1:3050/]
const page = process.argv[2] ?? "http://127.0.0.1:3050/";
const UA = { "user-agent": "Mozilla/5.0 (Macintosh) Chrome/130" };
const html = await (await fetch(page)).text();
const maps = ["post", "page", "product", "product-category", "category"];
const sitemap = new Set();
for (const m of maps) {
  const xml = await (await fetch(`https://www.botanicoir.com/${m}-sitemap.xml`, { headers: UA })).text();
  for (const x of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemap.add(x[1].replace(/\/$/, ""));
}
const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]);
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const problems = [], seen = new Map();
for (const a of anchors) {
  const href = (a.match(/href="([^"]*)"/) ?? [])[1];
  if (!href) continue;
  const h = href.replace(/&amp;/g, "&");
  if (h.startsWith("#")) { if (h === "#") problems.push("bare # link"); else if (h !== "#top" && !ids.has(h.slice(1))) problems.push(`missing anchor ${h}`); continue; }
  if (h.startsWith("tel:") || h.startsWith("mailto:")) { seen.set(h, "ok"); continue; }
  if (!/target="_blank"/.test(a) || !/rel="noopener"/.test(a)) problems.push(`not new-tab/noopener: ${h}`);
  if (!seen.has(h)) seen.set(h, null);
}
const social = /facebook|twitter|instagram|linkedin/;
// Linked from the live homepage's own Products block and answers 200, but missing from the Yoast sitemaps.
const liveHomepageOnly = new Set(["https://www.botanicoir.com/product/propagation"]);
for (const h of seen.keys()) {
  if (seen.get(h)) continue;
  const u = new URL(h);
  const key = (u.origin + u.pathname).replace(/\/$/, "");
  if (u.hostname === "www.botanicoir.com" && !u.pathname.startsWith("/wp-content/") && u.pathname !== "/" && !/^\/(fr|de|nl|es|pl|zh)\/?$/.test(u.pathname) && !sitemap.has(key) && !liveHomepageOnly.has(key)) problems.push(`not in sitemap: ${h}`);
  let status;
  try { status = (await fetch(h, { headers: UA, redirect: "follow", signal: AbortSignal.timeout(20000) })).status; } catch (e) { status = "error " + e.message; }
  seen.set(h, status);
  if (!(typeof status === "number" && status < 400)) (social.test(h) ? console.log(`blocked (social, checked by hand): ${h}`) : problems.push(`${status}: ${h}`));
}
console.log(`${seen.size} unique destinations, ${anchors.length} links`);
for (const [h, s] of seen) console.log(String(s).padEnd(6), h);
console.log(problems.length ? "\nPROBLEMS\n" + problems.join("\n") : "\nAll links OK");
