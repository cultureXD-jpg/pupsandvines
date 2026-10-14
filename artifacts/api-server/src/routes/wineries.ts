import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { eq, and, or, ilike, SQL, sql } from "drizzle-orm";
import { ListWineriesQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/wineries", async (req, res) => {
  try {
    const query = ListWineriesQueryParams.parse(req.query);
    const conditions: SQL[] = [];

    if (query.dogFriendly === true) {
      conditions.push(eq(wineriesTable.dogFriendly, true));
    }
    if (query.sustainable === true) {
      conditions.push(eq(wineriesTable.sustainable, true));
    }
    if (query.familyFriendly === true) {
      conditions.push(eq(wineriesTable.familyFriendly, true));
    }
    if (query.featured === true) {
      conditions.push(eq(wineriesTable.featured, true));
    }
    if (query.region) {
      conditions.push(eq(wineriesTable.region, query.region));
    }
    if (query.search) {
      conditions.push(
        or(
          ilike(wineriesTable.name, `%${query.search}%`),
          ilike(wineriesTable.region, `%${query.search}%`),
        )!
      );
    }

    const wineries = await db
      .select()
      .from(wineriesTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(sql`${wineriesTable.featuredRank} ASC NULLS LAST`, wineriesTable.name);

    res.json(wineries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch wineries" });
  }
});

router.get("/wineries/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid winery ID" });
      return;
    }

    const [winery] = await db
      .select()
      .from(wineriesTable)
      .where(eq(wineriesTable.id, id))
      .limit(1);

    if (!winery) {
      res.status(404).json({ error: "Winery not found" });
      return;
    }

    res.json(winery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch winery" });
  }
});

router.get("/regions", async (_req, res) => {
  try {
    const rows = await db
      .selectDistinct({ region: wineriesTable.region })
      .from(wineriesTable)
      .orderBy(wineriesTable.region);

    res.json(rows.map((r) => r.region));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch regions" });
  }
});

export default router;
