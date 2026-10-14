# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the **Napa Paws & Vines** directory website — a searchable guide to dog-friendly, sustainable, and family-friendly wineries in Napa Valley and Sonoma County.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, wouter, Tanstack Query, Tailwind CSS, framer-motion, lucide-react

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server (routes: /api)
│   └── napa-directory/     # React + Vite frontend (routes: /)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
│   └── src/seed-wineries.ts # Seeds 31 real Napa/Sonoma wineries
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Application: Napa Paws & Vines

### Pages
- **Home** (`/`) — Hero, leaderboard ad, featured winery cards, category quick-filters
- **Directory** (`/directory`) — Search + filters (dog-friendly, sustainable, family-friendly, region), winery grid with in-feed ads, sidebar ads
- **Winery Profile** (`/winery/:id`) — Full winery details, badges, amenities, sidebar ad, sticky mobile banner
- **About** (`/about`) — Mission, how to get listed, contact info

### Ad Placements
- Leaderboard (728x90) — top of every page below nav
- Sidebar (300x250) — directory and profile pages
- In-feed (300x250) — after every 5th listing in directory
- Footer leaderboard — every page
- Sticky mobile bottom banner — profile pages

### Data
- 31 curated wineries seeded across Napa Valley, Sonoma County, St. Helena, Calistoga, Yountville, Los Carneros, Alexander Valley, Dry Creek Valley
- Categories: dog-friendly, sustainable/organic, family-friendly, Napa Green certified, organic certified
- Run `pnpm --filter @workspace/scripts run seed-wineries` to re-seed

## API Endpoints

- `GET /api/wineries` — list with filters: `dogFriendly`, `sustainable`, `familyFriendly`, `region`, `search`, `featured`
- `GET /api/wineries/:id` — single winery by ID
- `GET /api/regions` — distinct region list
- `GET /api/healthz` — health check

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all lib packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emits `.d.ts` files during typecheck

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
- `pnpm --filter @workspace/api-spec run codegen` — regenerates React Query hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/scripts run seed-wineries` — seed winery data

## Monetization Plan (built into the UI)
- **Google AdSense** — leaderboard, sidebar, in-feed, footer ad slots (placeholders ready for code injection)
- **Media.net / Mediavine** — same slots, swap code when traffic grows
- **Premium listings** — `listingTier`: free / premium / featured in DB schema
- **Direct ad sales** — sidebar and leaderboard slots pre-configured for easy ad network swap-in

## Content Conventions

### Hours format
- Standard hours: `"Daily 10am–5pm"` or `"Thu–Mon 11am–5pm"`
- Appointment-only (with regular hours): `"[hours] (By Appointment)"` — e.g. `"Daily 10am–4pm (By Appointment)"`
- Appointment-only (with day restrictions): `"[days] [hours], Closed [day] (By Appointment)"` — e.g. `"Wed–Mon 10am–3pm, Closed Tue (By Appointment)"`
- Never use "By Appt Only" — always use the `(By Appointment)` suffix pattern

### Adding new listings
1. Add winery object to `newWineries[]` in `artifacts/api-server/src/seed.ts`
2. Add `yelpUrl` to `yelpUrlUpdates[]` in the same file
3. Add 3 curated reviews to `artifacts/napa-directory/src/components/yelp-reviews-data.ts` keyed by winery slug
4. Restart the API server so `syncNewWineries()`, `syncHours()`, and `syncYelpUrls()` run
