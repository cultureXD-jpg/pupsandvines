import path from "path";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import router from "./routes";
import adminRouter from "./routes/admin";
import fs from "fs";
import { db } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import {
  getSeoForStaticRoute,
  getSeoForBlogPost,
  getSeoForWinery,
  injectSeoIntoHtml,
  ARTICLE_META,
} from "./seo";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api", adminRouter);

const KNOWN_BLOG_SLUGS = new Set(ARTICLE_META.map((a) => a.slug));

const STATIC_ROUTES = new Set([
  "/",
  "/directory",
  "/about",
  "/terms",
  "/privacy",
  "/map",
  "/shop",
  "/blog",
]);

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(process.cwd(), "artifacts", "napa-directory", "dist", "public");

  if (fs.existsSync(distPath)) {
    const indexHtmlPath = path.join(distPath, "index.html");
    let indexTemplate = "";
    try {
      indexTemplate = fs.readFileSync(indexHtmlPath, "utf-8");
    } catch {
      indexTemplate = "";
    }

    function sendWithSeo(res: Response, seoData: ReturnType<typeof getSeoForStaticRoute>, status = 200) {
      if (!seoData || !indexTemplate) {
        return res.status(status).sendFile(indexHtmlPath);
      }
      const html = injectSeoIntoHtml(indexTemplate, seoData);
      res.status(status).setHeader("Content-Type", "text/html; charset=utf-8").send(html);
    }

    app.use(express.static(distPath));

    app.use(async (req: Request, res: Response) => {
      const urlPath = req.path;

      if (STATIC_ROUTES.has(urlPath)) {
        const seo = getSeoForStaticRoute(urlPath);
        return sendWithSeo(res, seo);
      }

      const wineryMatch = urlPath.match(/^\/winery\/(\d+)$/);
      if (wineryMatch) {
        const id = parseInt(wineryMatch[1], 10);
        try {
          const [winery] = await db
            .select({
              id: wineriesTable.id,
              name: wineriesTable.name,
              description: wineriesTable.description,
              region: wineriesTable.region,
              imageUrl: wineriesTable.imageUrl,
            })
            .from(wineriesTable)
            .where(eq(wineriesTable.id, id))
            .limit(1);

          if (winery) {
            const seo = getSeoForWinery(winery);
            return sendWithSeo(res, seo);
          }
        } catch {
          return res.sendFile(indexHtmlPath);
        }
        return res.status(404).sendFile(indexHtmlPath);
      }

      const blogMatch = urlPath.match(/^\/blog\/([^/]+)$/);
      if (blogMatch) {
        const slug = blogMatch[1];
        if (KNOWN_BLOG_SLUGS.has(slug)) {
          const seo = getSeoForBlogPost(slug);
          return sendWithSeo(res, seo);
        }
        return res.status(404).sendFile(indexHtmlPath);
      }

      return res.status(404).sendFile(indexHtmlPath);
    });
  }
}

export default app;
