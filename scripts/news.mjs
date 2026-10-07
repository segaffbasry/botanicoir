// Reads the four newest posts from botanicoir.com/news-events/ (newest first, as the live listing orders them) and
// writes lib/news.json: title, link, date, categories, the listing's excerpt and the local image (downloaded by
// scripts/media.sh as news-*.webp, matched here by the post's slug). Dashes are rewritten (house style: no em/en dashes).
import { writeFileSync } from "node:fs";
const UA = { "user-agent": "Mozilla/5.0 (Macintosh) Chrome/130" };
const html = await (await fetch("https://www.botanicoir.com/news-events/", { headers: UA })).text();
const decode = (s) => s.replace(/<[^>]+>/g, "").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”").replace(/&amp;/g, "&").replace(/&hellip;|&#8230;/g, "…").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
const undash = (s) => s.replace(/\s*[–—]\s*/g, ", ");
const images = {
  "water-management-growing-media": "news-water",
  "choosing-coir-where-should-growers-start": "news-choosing",
  "botanicoir-recognised-among-uks-sustainability-leaders-with-p-e-a-awards-shortlist": "news-pea",
  "new-initiative-supports-grower-sustainability-reporting": "news-beyond",
};
const blocks = html.split(/(?=<img[^>]+wp-content\/uploads\/\d{4}\/\d{2}\/[^"]+-450x300)/).slice(1, 5);
const items = blocks.map((b) => {
  const date = (b.match(/([A-Z][a-z]{2} \d{1,2}, \d{4})/) ?? [])[1];
  const cats = [...b.matchAll(/category\/[^"]+\/"[^>]*>([^<]+)</g)].map((m) => decode(m[1]));
  const link = [...b.matchAll(/href="(https:\/\/www\.botanicoir\.com\/(?!category)[^"]+)"[^>]*>([^<]{12,})</g)][0];
  const excerpt = decode((b.split(link[0])[1] ?? "").split(/Read in full/)[0]).replace(/^[^A-Z]+/, "");
  const slug = link[1].replace(/\/$/, "").split("/").pop();
  return { title: undash(decode(link[2])), href: link[1], date, categories: cats, excerpt: undash(excerpt), image: `/media/${images[slug] ?? "news-water"}.webp` };
});
writeFileSync(new URL("../lib/news.json", import.meta.url), JSON.stringify(items, null, 2) + "\n");
console.log(items.map((i) => `${i.date}  ${i.title}`).join("\n"));
