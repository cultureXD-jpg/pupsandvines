import { Router, type IRouter } from "express";
import { refreshAllWineries } from "../refresh-winery-data";
import { db } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

/**
 * POST /admin/refresh
 * Trigger a manual refresh of winery photos and data.
 * Query params: ?limit=5 to refresh only N wineries (default: all)
 */
router.post("/admin/refresh", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
  console.log(`[Admin] Manual refresh triggered (limit: ${limit ?? "all"})`);

  try {
    const result = await refreshAllWineries({ limit });
    res.json({
      success: true,
      refreshed: result.refreshed,
      errors: result.errors,
      log: result.log,
    });
  } catch (err) {
    console.error("[Admin] Refresh failed:", err);
    res.status(500).json({ success: false, error: String(err) });
  }
});

/**
 * GET /admin/refresh-status
 * Returns when each winery was last refreshed.
 */
router.get("/admin/refresh-status", async (_req, res) => {
  try {
    const rows = await db
      .select({
        name: wineriesTable.name,
        slug: wineriesTable.slug,
        lastRefreshedAt: wineriesTable.lastRefreshedAt,
        photoCount: sql<number>`array_length(${wineriesTable.galleryImages}, 1)`,
      })
      .from(wineriesTable)
      .orderBy(wineriesTable.name);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
