// After `vite build`, writes one HTML file per page with the right
// title/description/SEO tags baked in, so static hosts (GitHub Pages,
// Cloudflare Pages) serve every URL directly and Google sees real metadata.
import fs from "node:fs";
import path from "node:path";
import {
  getSeoForStaticRoute,
  getSeoForWinery,
  injectSeoIntoHtml,
} from "../artifacts/api-server/src/seo";
import wineries from "../lib/api-client-react/src/wineries-data.json";

const dist = path.resolve(process.cwd(), "artifacts/napa-directory/dist/public");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function write(route: string, html: string) {
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, `${route}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

let count = 0;
for (const route of ["/", "/directory", "/about", "/terms", "/privacy", "/map", "/shop"] ) {
  const seo = getSeoForStaticRoute(route);
  write(route, seo ? injectSeoIntoHtml(template, seo) : template);
  count++;
}
for (const w of wineries) {
  const seo = getSeoForWinery(w);
  write(`/winery/${w.id}`, injectSeoIntoHtml(template, seo));
  count++;
}
// Sitemap: keep the hand-written static/blog entries, rebuild the winery entries from the data.
{
  const smPath = path.join(dist, "sitemap.xml");
  const sm = fs.readFileSync(smPath, "utf8");
  const kept = sm.replace(/\s*<url>\s*<loc>https:\/\/pupsandvines\.com\/winery\/\d+<\/loc>[\s\S]*?<\/url>/g, "");
  const entries = wineries
    .map((w) => `\n  <url>\n    <loc>https://pupsandvines.com/winery/${w.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
    .join("");
  fs.writeFileSync(smPath, kept.replace("</urlset>", `${entries}\n</urlset>`));
}

// Unknown URLs: hosts serve 404.html; the app shows its own "not found" page.
fs.writeFileSync(path.join(dist, "404.html"), template);
// Custom domain for GitHub Pages.
fs.writeFileSync(path.join(dist, "CNAME"), "pupsandvines.com\n");
console.log(`Prerendered ${count} pages`);
