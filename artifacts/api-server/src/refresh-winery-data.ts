/**
 * Monthly winery data refresher.
 * Fetches fresh exterior photos + hours from DuckDuckGo for all wineries.
 * Called automatically once a month and via the /admin/refresh endpoint.
 */
import https from "https";
import { db } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { eq, or, isNull, lt, sql } from "drizzle-orm";

function ddgImages(query: string): Promise<string[]> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve([]), 10000);
    const req = https.get({
      hostname: "duckduckgo.com",
      path: "/?q=" + encodeURIComponent(query),
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        const vqd = d.match(/vqd=[\"\']([\d-]+)[\"\']/) || d.match(/vqd=([\d-]+)&/);
        if (!vqd) { clearTimeout(timeout); resolve([]); return; }
        https.get({
          hostname: "duckduckgo.com",
          path: "/i.js?l=us-en&o=json&q=" + encodeURIComponent(query) + "&vqd=" + vqd[1] + "&f=,,,&p=1",
          headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://duckduckgo.com/" },
        }, (r2) => {
          let d2 = "";
          r2.on("data", (c) => (d2 += c));
          r2.on("end", () => {
            clearTimeout(timeout);
            try {
              const j = JSON.parse(d2);
              const results = (j.results || [])
                .filter((r: any) =>
                  r.image &&
                  r.width > 400 &&
                  r.width >= r.height &&
                  !r.image.match(/\.(gif|svg)/i) &&
                  !r.image.match(/logo|icon|favicon|bottle|label|portrait|headshot/i)
                )
                .slice(0, 5)
                .map((r: any) => r.image as string);
              resolve(results);
            } catch {
              resolve([]);
            }
          });
          r2.on("error", () => { clearTimeout(timeout); resolve([]); });
        }).on("error", () => { clearTimeout(timeout); resolve([]); });
      });
    });
    req.on("error", () => { clearTimeout(timeout); resolve([]); });
  });
}

async function fetchWineryHours(website: string): Promise<string | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(null), 8000);
    try {
      const url = new URL(website);
      const req = https.get({
        hostname: url.hostname,
        path: url.pathname || "/",
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PupsAndVinesBot/1.0)",
          "Accept": "text/html",
        },
      }, (res) => {
        let html = "";
        res.on("data", (c) => { if (html.length < 50000) html += c; });
        res.on("end", () => {
          clearTimeout(timeout);
          // Try to extract hours patterns
          const patterns = [
            /(?:open|hours)[^<]{0,30}(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/gi,
            /daily\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/gi,
          ];
          for (const pat of patterns) {
            const match = html.match(pat);
            if (match && match[0]) {
              const cleaned = match[0].replace(/<[^>]+>/g, "").trim().slice(0, 80);
              resolve(cleaned || null);
              return;
            }
          }
          resolve(null);
        });
      });
      req.on("error", () => { clearTimeout(timeout); resolve(null); });
    } catch {
      clearTimeout(timeout);
      resolve(null);
    }
  });
}

export async function refreshAllWineries(opts: { limit?: number } = {}): Promise<{ refreshed: number; errors: number; log: string[] }> {
  const log: string[] = [];
  let refreshed = 0;
  let errors = 0;

  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const wineries = await db
    .select({ id: wineriesTable.id, name: wineriesTable.name, slug: wineriesTable.slug, website: wineriesTable.website, lastRefreshedAt: wineriesTable.lastRefreshedAt, region: wineriesTable.region })
    .from(wineriesTable)
    .where(
      or(
        isNull(wineriesTable.lastRefreshedAt),
        lt(wineriesTable.lastRefreshedAt, oneMonthAgo)
      )
    )
    .limit(opts.limit || 30);

  log.push(`Found ${wineries.length} winery/wineries needing refresh`);

  for (const winery of wineries) {
    try {
      log.push(`Refreshing: ${winery.name}`);

      // Fetch fresh exterior photos
      const query = `${winery.name} ${winery.region} winery exterior building grounds vineyard`;
      const freshImages = await ddgImages(query);

      const updateData: Record<string, unknown> = {
        lastRefreshedAt: new Date(),
      };

      if (freshImages.length > 0) {
        updateData.galleryImages = freshImages;
        updateData.imageUrl = freshImages[0];
        log.push(`  → ${freshImages.length} photos refreshed`);
      } else {
        log.push(`  → No new photos found`);
      }

      // Optionally scrape hours from winery website
      if (winery.website) {
        const hours = await fetchWineryHours(winery.website);
        if (hours) {
          updateData.hours = hours;
          log.push(`  → Hours updated: ${hours}`);
        }
      }

      await db
        .update(wineriesTable)
        .set(updateData)
        .where(eq(wineriesTable.id, winery.id));

      refreshed++;
    } catch (err) {
      errors++;
      log.push(`  ERROR refreshing ${winery.name}: ${err}`);
    }
  }

  log.push(`Done. Refreshed: ${refreshed}, Errors: ${errors}`);
  return { refreshed, errors, log };
}

/**
 * Schedule monthly auto-refresh (runs once a month).
 * Call this once on server startup.
 */
let refreshTimer: NodeJS.Timeout | null = null;

export function scheduleMonthlyRefresh() {
  const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

  async function runRefresh() {
    console.log("[AutoRefresh] Starting monthly winery data refresh...");
    const result = await refreshAllWineries();
    console.log("[AutoRefresh] Complete:", result.log.join(" | "));
    refreshTimer = setTimeout(runRefresh, MONTH_MS);
  }

  // Start first refresh after 24 hours, then repeat monthly
  const INITIAL_DELAY_MS = 24 * 60 * 60 * 1000;
  refreshTimer = setTimeout(runRefresh, INITIAL_DELAY_MS);

  console.log("[AutoRefresh] Monthly refresh scheduled (first run in 24h)");
  return () => { if (refreshTimer) clearTimeout(refreshTimer); };
}
