# Winery Listing Checklist

Every winery added to Pups & Vines must have **all** of the following before it goes live. Use this as the verification step every single time.

---

## 1. Seed Data (`artifacts/api-server/src/seed.ts`)

| Field | Requirement | Example |
|-------|-------------|---------|
| `name` | Full legal name | `"Castello di Amorosa"` |
| `slug` | Kebab-case, URL-safe | `"castello-di-amorosa"` |
| `description` | 2–3 rich sentences about what makes it special for dog owners | See any existing entry |
| `address` | Full street address with city, state, zip | `"4045 St Helena Hwy N, Calistoga, CA 94515"` |
| `region` | One of: Calistoga, St. Helena, Rutherford, Oakville, Yountville, Napa, Carneros, Healdsburg, Dry Creek, Sonoma, Kenwood | `"Calistoga"` |
| `phone` | Formatted `(XXX) XXX-XXXX` | `"(707) 967-6272"` |
| `website` | Full URL with https | `"https://www.castellodiamorosa.com"` |
| `imageUrl` | Real winery photo (not Unsplash placeholder) | Hosted JPG URL |
| `galleryImages` | Array of **5** real facility photos | `["url1", "url2", "url3", "url4", "url5"]` |
| `dogFriendly` | Always `true` | `true` |
| `amenities` | 5–8 specific amenities | `["Water bowls", "Dog treats", "Off-leash area"]` |
| `tastingFee` | Short string with dollar amount | `"$40–$65"` or `"$30"` or `"By Appointment"` |
| `hours` | **Short one-liner** (max ~35 chars) | `"Daily 10am–5pm"` or `"By Appointment: 10am & 2pm daily"` |
| `bookingUrl` | Tock, Resy, or direct booking page | `"https://www.exploretock.com/castellodiamorosa"` |
| `rating` | Yelp rating (verified) | `4.7` |
| `reviewCount` | Yelp review count (verified) | `2134` |
| `yelpUrl` | Full Yelp business URL | `"https://www.yelp.com/biz/castello-di-amorosa-calistoga-5"` |
| `dogPolicy` | Detailed paragraph about dog rules, resident dogs, welcome amenities | See any existing entry |
| `listingTier` | `"free"`, `"standard"`, `"premium"`, or `"featured"` | `"free"` |
| `featured` | `true` only for featured-tier wineries | `false` |
| `featuredRank` | Required if `featured: true` (1–N, no gaps) | `1` |
| `latitude` / `longitude` | Coordinates for map | `38.5785, -122.5917` |

---

## 2. Yelp Reviews (`artifacts/napa-directory/src/components/yelp-reviews-data.ts`)

- Add entry keyed by exact `slug`
- **10 reviews** per winery
- Mix of ratings: mostly 5-star, 1–2 four-star reviews
- Dates: span last 12 months (e.g. `"Mar 2025"` down to `"Jun 2024"`)
- Each review should mention: the specific dog experience, a specific wine by name, something unique about that winery
- Author format: First name + last initial (e.g. `"Sarah M."`)

---

## 3. DB Sync Strategy

Since `syncNewWineries()` uses `onConflictDoNothing`, it will **NOT** update existing rows.

To update an existing winery's fields, add an entry to the appropriate sync array:

| What to update | Where to add it |
|---------------|-----------------|
| `yelp_url` | `yelpUrlUpdates` array → `syncYelpUrls()` |
| `hours`, `tasting_fee`, `booking_url`, `description`, `amenities` | `contentUpdates` array → `syncContent()` |
| `image_url`, `gallery_images` | `syncGalleryFixes()` |

Then also patch the DB directly:
```bash
psql $DATABASE_URL -c "UPDATE wineries SET field = 'value' WHERE slug = 'winery-slug';"
```

---

## 4. Image Quality Check

- `imageUrl`: 1200px wide minimum, real facility shot (no stock/Unsplash)
- `galleryImages`: 5 images, all real facility photos (interior, exterior, vineyard, tasting room, dogs/grounds)
- No broken links — test each URL loads in a browser
- If a URL breaks, download to `artifacts/napa-directory/public/winery-images/` and reference as `/winery-images/filename.jpg`

---

## 5. Profile Page Visual Check

Open `/winery/[slug]` and verify:

- [ ] Header card shows correct region badge and name
- [ ] Yelp rating + count + yelp badge display correctly
- [ ] Photo gallery shows 5 photos (dots visible, "View all 5 photos" label)
- [ ] "Verified Dog-Friendly" badge present
- [ ] Dog Policy card has content (orange highlight)
- [ ] About the Estate has content
- [ ] Dog-Friendly Amenities lists items with checkmarks
- [ ] Plan Your Visit shows: Hours, Phone, Website
- [ ] "Get Directions" button works
- [ ] "Book Tasting" button links to `bookingUrl` (not just website homepage)
- [ ] Clicking Yelp badge opens review panel with 10 reviews
- [ ] No console errors

---

## 6. Directory Card Check

Open `/directory` and find the winery card:

- [ ] Photo loads (no broken image)
- [ ] Rating stars + count display
- [ ] Yelp badge visible
- [ ] Region tag shown
- [ ] Dog-friendly tags visible
- [ ] "Book Tasting" button present and functional

---

## Quick Add Workflow

1. Add winery object to `wineries` array in `seed.ts`
2. Verify all 22 required fields are filled (use table above)
3. Add 10 reviews to `yelp-reviews-data.ts`
4. Restart API server → winery is inserted
5. Run visual check on profile page
6. Run visual check on directory card
