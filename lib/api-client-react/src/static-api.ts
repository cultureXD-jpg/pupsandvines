// Static replacement for the old Express + Postgres API.
// All winery data lives in wineries-data.json, so the site can be hosted
// for free as plain files (no server, no database).
import data from "./wineries-data.json";

type Row = (typeof data)[number];
const wineries = data as Row[];

function byRankThenName(a: Row, b: Row) {
  const ra = a.featuredRank ?? Number.POSITIVE_INFINITY;
  const rb = b.featuredRank ?? Number.POSITIVE_INFINITY;
  if (ra !== rb) return ra - rb;
  return a.name.localeCompare(b.name);
}

function listWineries(params: URLSearchParams): Row[] {
  const isTrue = (k: string) => params.get(k) === "true";
  const region = params.get("region");
  const search = params.get("search")?.trim().toLowerCase();
  return wineries
    .filter((w) => !isTrue("dogFriendly") || w.dogFriendly)
    .filter((w) => !isTrue("sustainable") || w.sustainable)
    .filter((w) => !isTrue("familyFriendly") || w.familyFriendly)
    .filter((w) => !isTrue("featured") || w.featured)
    .filter((w) => !region || w.region === region)
    .filter(
      (w) =>
        !search ||
        w.name.toLowerCase().includes(search) ||
        w.region.toLowerCase().includes(search),
    )
    .sort(byRankThenName);
}

export class StaticNotFound extends Error {
  status = 404;
}

/** Returns data for a /api/... URL, or undefined if the URL isn't an API route. */
export function resolveStaticApi(rawUrl: string): unknown | undefined {
  const url = new URL(rawUrl, "http://local");
  const path = url.pathname.replace(/\/+$/, "");
  if (path === "/api/wineries") return listWineries(url.searchParams);
  if (path === "/api/regions")
    return [...new Set(wineries.map((w) => w.region))].sort();
  if (path === "/api/healthz") return { status: "ok" };
  const m = path.match(/^\/api\/wineries\/(\d+)$/);
  if (m) {
    const w = wineries.find((x) => x.id === Number(m[1]));
    if (!w) throw new StaticNotFound("Winery not found");
    return w;
  }
  return undefined;
}

export function getAllWineries(): Row[] {
  return wineries;
}
