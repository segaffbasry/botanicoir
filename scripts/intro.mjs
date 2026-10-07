// Records the preloader: screenshots at fixed times after navigation start, plus checks that scrolling is locked
// until handover and how long the handover took. Usage: node scripts/intro.mjs [outDir] [url]
import { chromium } from "playwright-core";
const [out = "shots", url = "http://127.0.0.1:3050/"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => { window.__t0 = performance.now(); window.addEventListener("intro:done", () => { window.__done = performance.now(); }); });
await page.goto(url, { waitUntil: "commit" });
const times = [0.05, 0.4, 0.8, 1.2, 1.6, 1.95, 2.2, 2.7];
let last = 0, locked = null;
for (const t of times) {
  await page.waitForTimeout((t - last) * 1000); last = t;
  if (t === 1.2) { await page.mouse.wheel(0, 600); await page.waitForTimeout(50); locked = await page.evaluate(() => window.scrollY); last += 0.05; }
  await page.screenshot({ path: `${out}/intro-${String(t).padEnd(4, "0")}.jpg`, type: "jpeg", quality: 70 });
}
const r = await page.evaluate(() => ({ handover: Math.round(window.__done ?? -1), loading: document.documentElement.classList.contains("is-loading") }));
console.log(JSON.stringify({ ...r, scrollYDuringIntro: locked }));
await browser.close();
