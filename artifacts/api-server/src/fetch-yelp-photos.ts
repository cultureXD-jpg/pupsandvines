import { db } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const YELP_API_KEY = process.env["YELP_API_KEY"];

if (!YELP_API_KEY) {
  console.error("YELP_API_KEY environment variable is not set. Please add it as a secret and re-run.");
  process.exit(1);
}

async function searchYelp(name: string): Promise<string | null> {
  const query = encodeURIComponent(`${name} Napa Valley CA`);
  const url = `https://api.yelp.com/v3/businesses/search?term=${query}&location=Napa+Valley+CA&categories=wine_bars,wineries&limit=1`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${YELP_API_KEY}` },
  });

  if (!res.ok) {
    console.warn(`  Yelp search failed for "${name}": ${res.status} ${res.statusText}`);
    return null;
  }

  const data = (await res.json()) as {
    businesses?: Array<{ image_url?: string; name: string }>;
  };

  const business = data.businesses?.[0];
  if (!business) {
    console.warn(`  No Yelp result for "${name}"`);
    return null;
  }

  const imageUrl = business.image_url || null;
  console.log(`  Matched "${business.name}" → ${imageUrl ?? "(no photo)"}`);
  return imageUrl;
}

async function main() {
  const wineries = await db
    .select({ id: wineriesTable.id, name: wineriesTable.name })
    .from(wineriesTable);

  console.log(`Fetching Yelp photos for ${wineries.length} wineries…\n`);

  let updated = 0;
  let skipped = 0;

  for (const winery of wineries) {
    console.log(`[${winery.id}] ${winery.name}`);
    const imageUrl = await searchYelp(winery.name);

    if (imageUrl) {
      await db
        .update(wineriesTable)
        .set({ imageUrl })
        .where(eq(wineriesTable.id, winery.id));
      updated++;
    } else {
      skipped++;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nDone. Updated: ${updated}, Skipped (no photo found): ${skipped}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
