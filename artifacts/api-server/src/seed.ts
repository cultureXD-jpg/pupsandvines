import { db, pool } from "@workspace/db";
import { wineriesTable } from "@workspace/db/schema";
import { count, eq, and, inArray, not, isNotNull } from "drizzle-orm";

const coordinateUpdates: { slug: string; latitude: number; longitude: number }[] = [
  { slug: "tres-sabores",               latitude: 38.455,  longitude: -122.425 },
  { slug: "st-clair-brown",             latitude: 38.327,  longitude: -122.296 },
  { slug: "larson-family-winery",       latitude: 38.255,  longitude: -122.435 },
  { slug: "charles-krug-winery",        latitude: 38.507,  longitude: -122.469 },
  { slug: "trefethen-family-vineyards", latitude: 38.332,  longitude: -122.323 },
  { slug: "honig-vineyard-winery",      latitude: 38.462,  longitude: -122.419 },
  { slug: "frogs-leap-winery",          latitude: 38.462,  longitude: -122.413 },
];

const newWineries = [
  {
    name: "Ehlers Estate",
    slug: "ehlers-estate",
    description: "Nestled in the heart of Napa Valley, Ehlers Estate is driven by a fierce passion for excellence in winemaking; one rooted in sustainability, innovation, and an unwavering attention to detail. We believe great wine should feel welcoming, not intimidating, which is why our team is dedicated to creating an intimate, warm experience where every guest feels at home. Whether you're a lifelong enthusiast or just beginning your wine journey, we're here to share our craft with genuine hospitality and a whole lot of heart.",
    address: "3222 Ehlers Lane, St. Helena, CA 94574",
    region: "St. Helena",
    phone: "(707) 963-5972",
    website: "https://www.ehlersestate.com",
    imageUrl: "https://enlightphoto.com/wp-content/uploads/2018/03/napa-1346b_1024-1024x683.jpg",
    galleryImages: [
      "https://luxe-beat-mag.s3.amazonaws.com/wp-content/uploads/2025/04/historic-stone-winery-ehlers-estate-12-1200x800.jpeg",
      "https://www.writtenpalette.com/wp-content/uploads/2022/12/Ehlers-Estate-Winery-and-Vineyard.jpg",
      "https://luxe-beat-mag.s3.amazonaws.com/wp-content/uploads/2025/04/opening-to-vineyard-ehlers-estate-11-1024x704.jpeg",
      "https://media-cdn.tripadvisor.com/media/photo-o/1b/64/05/50/historic-barrel-room.jpg",
      "/ehlers-dogs.jpg",
    ],
    latitude: 38.524,
    longitude: -122.4816,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: true,
    organicCertified: true,
    amenities: [
      "Dogs allowed indoors & outdoors",
      "Off-leash area",
      "Water bowls",
      "Dog treats",
      "Resident winery dogs: Adrian, Koe & Mike",
      "No breed or size restrictions",
      "Napa Green Certified",
      "CCOF Organic Certified",
    ],
    dogPolicy: "Dogs are welcome both indoors and outdoors — no leash required, but please keep pups off the furniture. No breed or size restrictions. Water and treats always provided. Note: the Olive Grove patio and shaded outdoor seating are reserved for wine club members. Say hello to Adrian (the winemaker's 3-year-old mixed breed born to be a winery dog), Koe (a playful 2-year-old black lab who loves greeting every guest), and Mike (a 9-year-old yellow lab/golden retriever mix who lives for his morning treats from Jenny).",
    tastingFee: "$95–$125",
    hours: "By Appointment: 9am, 10am, 12:30pm & 3pm daily",
    bookingUrl: "https://www.ehlersestate.com/visit/",
    featured: true,
    listingTier: "featured",
    rating: 4.9,
    reviewCount: 197,
  },
  {
    name: "Pride Mountain Vineyards",
    slug: "pride-mountain-vineyards",
    description: "Family-owned vineyards and winery producing highly acclaimed wines for 30+ years, perched on the border of Napa and Sonoma County atop the Mayacamas Mountains. Resident Border Collie Sundance (Sunny) and daily visitor, Stella are happy to greet guests when they're around. By-appointment tastings only — an intimate, unhurried experience surrounded by sweeping mountain vineyards.",
    address: "4026 Spring Mountain Road, St. Helena, CA 94574",
    region: "St. Helena",
    phone: "(707) 963-4949",
    website: "https://www.pridewines.com",
    imageUrl: "https://armchairsommelier.com/wp-content/uploads/2022/03/pride-mountain-vineyards.jpeg",
    latitude: 38.5197,
    longitude: -122.5213,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Water bowls", "Dog treats", "Dogs allowed indoors", "Resident winery dogs Sunny & Stella"],
    dogPolicy: "Well behaved pups are welcome to join their humans during their experience at Pride Mountain Vineyards.",
    tastingFee: "By Appointment",
    hours: "10am–3:30pm, Closed Tue (By Appointment)",
    featured: false,
    listingTier: "premium",
    rating: 4.8,
    reviewCount: 414,
  },
  {
    name: "Round Pond Estate",
    slug: "round-pond-estate",
    description: "A stunning family-owned estate in the heart of Rutherford AVA, Round Pond is as welcoming to dogs as it is to wine lovers. Set amid olive groves and Cabernet vines, the outdoor terrace is a perfect spot to sip estate wines while your pup soaks up the vineyard air. They're also renowned for their small-batch extra-virgin olive oils made right on the property.",
    address: "875 Rutherford Rd, Rutherford, CA 94573",
    region: "Rutherford",
    phone: "(888) 302-2575",
    website: "https://www.roundpond.com",
    imageUrl: "https://napagreen.org/wp-content/uploads/2025/04/rd-winery.jpg",
    latitude: 38.459,
    longitude: -122.428,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dogs welcome on outdoor terrace", "Water bowls provided", "Olive mill tours", "Estate olive oil tastings", "Vineyard views"],
    dogPolicy: "Dogs welcome on the outdoor terrace and estate grounds. Keep leashed. Water and treats available.",
    tastingFee: "$35–$75",
    hours: "Daily 10am–5pm",
    featured: false,
    listingTier: "standard",
    rating: 4.7,
    reviewCount: 412,
  },
];

export async function syncNewWineries(): Promise<void> {
  try {
    for (const winery of newWineries) {
      await db.insert(wineriesTable).values(winery).onConflictDoNothing({ target: wineriesTable.slug });
    }
    console.log(`New wineries synced: ${newWineries.length} processed.`);
  } catch (err) {
    console.error("New winery sync error (non-fatal):", err);
  }
}

const regionUpdates: { slug: string; region: string }[] = [
  { slug: "frogs-leap-winery",     region: "Rutherford" },
  { slug: "honig-vineyard-winery", region: "Rutherford" },
];

export async function syncRegions(): Promise<void> {
  try {
    for (const { slug, region } of regionUpdates) {
      await db.update(wineriesTable).set({ region }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Regions synced for ${regionUpdates.length} wineries.`);
  } catch (err) {
    console.error("Region sync error (non-fatal):", err);
  }
}

export async function syncCoordinates(): Promise<void> {
  try {
    for (const { slug, latitude, longitude } of coordinateUpdates) {
      await db.update(wineriesTable).set({ latitude, longitude }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Coordinates synced for ${coordinateUpdates.length} wineries.`);
  } catch (err) {
    console.error("Coordinate sync error (non-fatal):", err);
  }
}

const yelpUrlUpdates: { slug: string; yelpUrl: string }[] = [
  { slug: "castello-di-amorosa",       yelpUrl: "https://www.yelp.com/biz/castello-di-amorosa-calistoga-5" },
  { slug: "trefethen-family-vineyards",yelpUrl: "https://www.yelp.com/biz/trefethen-family-vineyards-napa" },
  { slug: "jessup-cellars",            yelpUrl: "https://www.yelp.com/biz/jessup-cellars-yountville" },
  { slug: "tamber-bey-vineyards",      yelpUrl: "https://www.yelp.com/biz/tamber-bey-vineyards-calistoga" },
  { slug: "tres-sabores",              yelpUrl: "https://www.yelp.com/biz/tres-sabores-winery-saint-helena" },
  { slug: "etude-wines",               yelpUrl: "https://www.yelp.com/biz/etude-wines-napa" },
  { slug: "hall-wines",                yelpUrl: "https://www.yelp.com/biz/hall-wines-saint-helena-2" },
  { slug: "frogs-leap-winery",         yelpUrl: "https://www.yelp.com/biz/frogs-leap-winery-rutherford-4" },
  { slug: "pine-ridge-vineyards",      yelpUrl: "https://www.yelp.com/biz/pine-ridge-vineyards-napa" },
  { slug: "honig-vineyard-winery",     yelpUrl: "https://www.yelp.com/biz/honig-vineyard-and-winery-rutherford" },
  { slug: "charles-krug-winery",       yelpUrl: "https://www.yelp.com/biz/charles-krug-winery-st-helena" },
  { slug: "tank-garage-winery",        yelpUrl: "https://www.yelp.com/biz/tank-garage-winery-calistoga" },
  { slug: "bouchaine-vineyards",       yelpUrl: "https://www.yelp.com/biz/bouchaine-vineyards-napa" },
  { slug: "chandon-california",        yelpUrl: "https://www.yelp.com/biz/chandon-yountville-3" },
  { slug: "cliff-lede-vineyards",      yelpUrl: "https://www.yelp.com/biz/cliff-lede-vineyards-yountville" },
  { slug: "st-clair-brown",            yelpUrl: "https://www.yelp.com/biz/st-clair-brown-winery-and-brewery-napa-2" },
  { slug: "mutt-lynch-winery",         yelpUrl: "https://www.yelp.com/biz/mutt-lynch-winery-windsor" },
  { slug: "st-francis-winery",         yelpUrl: "https://www.yelp.com/biz/st-francis-winery-and-vineyards-santa-rosa" },
  { slug: "amista-vineyards",          yelpUrl: "https://www.yelp.com/biz/amista-vineyards-healdsburg" },
  { slug: "lambert-bridge-winery",     yelpUrl: "https://www.yelp.com/biz/lambert-bridge-winery-healdsburg" },
  { slug: "muscardini-cellars",        yelpUrl: "https://www.yelp.com/biz/muscardini-cellars-kenwood-2" },
  { slug: "gundlach-bundschu",         yelpUrl: "https://www.yelp.com/biz/gundlach-bundschu-sonoma-2" },
  { slug: "larson-family-winery",      yelpUrl: "https://www.yelp.com/biz/larson-family-winery-sonoma" },
  { slug: "deerfield-ranch-winery",    yelpUrl: "https://www.yelp.com/biz/deerfield-ranch-winery-kenwood" },
  { slug: "seghesio-family-vineyards", yelpUrl: "https://www.yelp.com/biz/seghesio-family-vineyards-healdsburg-2" },
  { slug: "bartholomew-estate-winery", yelpUrl: "https://www.yelp.com/biz/bartholomew-estate-winery-sonoma" },
  { slug: "kunde-family-winery",       yelpUrl: "https://www.yelp.com/biz/kunde-family-winery-kenwood" },
  { slug: "br-cohn-winery",             yelpUrl: "https://www.yelp.com/biz/b-r-cohn-winery-glen-ellen" },
  { slug: "round-pond-estate",         yelpUrl: "https://www.yelp.com/biz/round-pond-estate-rutherford" },
  { slug: "pride-mountain-vineyards",  yelpUrl: "https://www.yelp.com/biz/pride-mountain-vineyards-st-helena" },
  { slug: "ehlers-estate",             yelpUrl: "https://www.yelp.com/biz/ehlers-estate-st-helena" },
];

export async function syncYelpUrls(): Promise<void> {
  try {
    for (const { slug, yelpUrl } of yelpUrlUpdates) {
      await db.update(wineriesTable).set({ yelpUrl }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Yelp URLs synced for ${yelpUrlUpdates.length} wineries.`);
  } catch (err) {
    console.error("Yelp URL sync error (non-fatal):", err);
  }
}

const hoursUpdates: { slug: string; hours: string }[] = [
  { slug: "tamber-bey-vineyards", hours: "Daily 10am–5pm" },
  { slug: "etude-wines", hours: "Daily 10am–4pm" },
  { slug: "honig-vineyard-winery", hours: "Daily 10am–4pm" },
  { slug: "pine-ridge-vineyards", hours: "Daily 10am–4:30pm" },
  { slug: "st-clair-brown", hours: "Thu–Mon 12pm–6pm" },
  { slug: "amista-vineyards", hours: "Daily 10:30am–4:30pm" },
  { slug: "muscardini-cellars", hours: "Thu–Tue 11am–6pm" },
  { slug: "larson-family-winery", hours: "Thu–Mon 11am–5pm" },
  { slug: "deerfield-ranch-winery", hours: "Daily 10:30am–4:30pm" },
  { slug: "seghesio-family-vineyards", hours: "Daily 10:30am–4pm" },
  { slug: "kunde-family-winery", hours: "Daily 10:30am–5pm" },
  { slug: "charles-krug-winery", hours: "Daily 10:30am–5pm" },
  { slug: "tres-sabores", hours: "Wed–Mon 10am–3pm, Closed Tue (By Appointment)" },
  { slug: "pride-mountain-vineyards", hours: "10am–3:30pm, Closed Tue (By Appointment)" },
  { slug: "cliff-lede-vineyards", hours: "Daily 10am–4pm (By Appointment)" },
];

export async function syncHours(): Promise<void> {
  try {
    for (const { slug, hours } of hoursUpdates) {
      await db.update(wineriesTable).set({ hours }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Hours synced for ${hoursUpdates.length} wineries.`);
  } catch (err) {
    console.error("Hours sync error (non-fatal):", err);
  }
}

const contentUpdates: { slug: string; description?: string; amenities?: string[]; bookingUrl?: string; hours?: string; tastingFee?: string }[] = [
  {
    slug: "pride-mountain-vineyards",
    description: "Family-owned vineyards and winery producing highly acclaimed wines for 30+ years, perched on the border of Napa and Sonoma County atop the Mayacamas Mountains. Resident Border Collie Sundance (Sunny) and daily visitor, Stella are happy to greet guests when they're around. By-appointment tastings only — an intimate, unhurried experience surrounded by sweeping mountain vineyards.",
    amenities: ["Water bowls", "Dog treats", "Dogs allowed indoors", "Resident winery dogs Sunny & Stella"],
  },
  {
    slug: "ehlers-estate",
    hours: "By Appointment: 9am, 10am, 12:30pm & 3pm daily",
    tastingFee: "$95–$125",
    bookingUrl: "https://www.ehlersestate.com/visit/",
  },
];

export async function syncContent(): Promise<void> {
  try {
    for (const { slug, ...fields } of contentUpdates) {
      await db.update(wineriesTable).set(fields).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Content synced for ${contentUpdates.length} wineries.`);
  } catch (err) {
    console.error("Content sync error (non-fatal):", err);
  }
}

const ratingUpdates: { slug: string; rating: number; reviewCount: number }[] = [
  { slug: "castello-di-amorosa",        rating: 4.1, reviewCount: 5100 },
  { slug: "trefethen-family-vineyards", rating: 4.4, reviewCount: 488  },
  { slug: "jessup-cellars",             rating: 4.6, reviewCount: 551  },
  { slug: "tamber-bey-vineyards",       rating: 4.6, reviewCount: 292  },
  { slug: "tres-sabores",               rating: 4.7, reviewCount: 172  },
  { slug: "etude-wines",                rating: 4.0, reviewCount: 213  },
  { slug: "hall-wines",                 rating: 4.2, reviewCount: 996  },
  { slug: "frogs-leap-winery",          rating: 4.6, reviewCount: 1100 },
  { slug: "pine-ridge-vineyards",       rating: 4.4, reviewCount: 386  },
  { slug: "honig-vineyard-winery",      rating: 4.5, reviewCount: 422  },
  { slug: "charles-krug-winery",        rating: 4.3, reviewCount: 315  },
  { slug: "tank-garage-winery",         rating: 4.6, reviewCount: 526  },
  { slug: "bouchaine-vineyards",        rating: 4.3, reviewCount: 296  },
  { slug: "chandon-california",         rating: 3.8, reviewCount: 1700 },
  { slug: "cliff-lede-vineyards",       rating: 4.1, reviewCount: 288  },
  { slug: "st-clair-brown",             rating: 4.5, reviewCount: 304  },
  { slug: "mutt-lynch-winery",          rating: 4.6, reviewCount: 72   },
  { slug: "st-francis-winery",          rating: 4.3, reviewCount: 565  },
  { slug: "amista-vineyards",           rating: 4.4, reviewCount: 136  },
  { slug: "lambert-bridge-winery",      rating: 3.9, reviewCount: 213  },
  { slug: "muscardini-cellars",         rating: 4.6, reviewCount: 151  },
  { slug: "gundlach-bundschu",          rating: 4.0, reviewCount: 718  },
  { slug: "larson-family-winery",       rating: 4.4, reviewCount: 649  },
  { slug: "deerfield-ranch-winery",     rating: 4.4, reviewCount: 198  },
  { slug: "seghesio-family-vineyards",  rating: 4.2, reviewCount: 259  },
  { slug: "bartholomew-estate-winery",  rating: 4.2, reviewCount: 81   },
  { slug: "kunde-family-winery",        rating: 4.4, reviewCount: 756  },
  { slug: "br-cohn-winery",             rating: 3.9, reviewCount: 419  },
  { slug: "round-pond-estate",          rating: 4.2, reviewCount: 335  },
  { slug: "pride-mountain-vineyards",   rating: 4.8, reviewCount: 415  },
  { slug: "ehlers-estate",              rating: 4.6, reviewCount: 129  },
];

export async function syncRatings(): Promise<void> {
  try {
    for (const { slug, rating, reviewCount } of ratingUpdates) {
      await db.update(wineriesTable).set({ rating, reviewCount }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Ratings synced for ${ratingUpdates.length} wineries.`);
  } catch (err) {
    console.error("Rating sync error (non-fatal):", err);
  }
}

const wineries = [
  {
    name: "Castello di Amorosa",
    slug: "castello-di-amorosa",
    description: "A stunning 13th-century Tuscan-style castle where dogs are genuinely celebrated guests. Your pup is welcome inside the tasting room and on the self-guided castle tour. One of the most unique and dog-inclusive experiences in all of Napa Valley.",
    address: "4045 St Helena Hwy N, Calistoga, CA 94515",
    region: "Calistoga",
    phone: "(707) 967-6272",
    website: "https://www.castellodiamorosa.com",
    imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800",
    latitude: 38.5712,
    longitude: -122.5289,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dogs welcome indoors", "Self-guided castle tour with dogs", "Water bowls", "Dog treats", "Outdoor terrace"],
    dogPolicy: "Dogs welcome in tasting room and on self-guided castle tours (not guided tours). Keep leashed.",
    tastingFee: "$40–$65",
    hours: "Daily 9:30am–6pm",
    featured: true,
    listingTier: "featured",
    rating: 4.7,
    reviewCount: 2134,
  },
  {
    name: "Trefethen Family Vineyards",
    slug: "trefethen-family-vineyards",
    description: "Housed in a beautiful 19th-century redwood barn, Trefethen is one of Napa's most dog-welcoming estates — dogs are allowed both indoors and outdoors. They even sell dog toys in the gift shop. A must-visit for wine lovers with pups.",
    address: "1160 Oak Knoll Ave, Napa, CA 94558",
    region: "Napa Valley",
    phone: "(707) 255-7700",
    website: "https://www.trefethen.com",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    latitude: 38.3256,
    longitude: -122.2987,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: true,
    organicCertified: false,
    amenities: ["Dogs welcome indoors & outdoors", "Water bowls", "Dog toys sold in gift shop", "Historic 19th-century barn", "Wheelchair accessible"],
    dogPolicy: "Dogs welcome both inside the tasting room and on all outdoor grounds. Keep leashed.",
    tastingFee: "$40",
    hours: "Daily 10am–4:30pm",
    featured: true,
    listingTier: "featured",
    rating: 4.6,
    reviewCount: 891,
  },
  {
    name: "Jessup Cellars",
    slug: "jessup-cellars",
    description: "In the heart of Yountville, Jessup Cellars has become legendary among dog-owning wine lovers for its shaded patio, water bowls, dog biscuits, and even a seasonal 'Pup Menu.' Staff treats your dog like a VIP guest.",
    address: "6740 Washington St, Yountville, CA 94599",
    region: "Yountville",
    phone: "(707) 944-8523",
    website: "https://www.jessupcellars.com",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    latitude: 38.4042,
    longitude: -122.3623,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Shaded patio", "Water bowls", "Dog biscuits", "Seasonal Pup Menu", "Dog-focused events"],
    dogPolicy: "Dogs treated as VIP guests on the patio. Seasonal Pup Menu available. Water and treats provided.",
    tastingFee: "$35",
    hours: "Daily 10am–6pm",
    featured: true,
    listingTier: "featured",
    rating: 4.7,
    reviewCount: 623,
  },
  {
    name: "Tamber Bey Vineyards",
    slug: "tamber-bey-vineyards",
    description: "The ultimate dog destination in Napa Valley — Tamber Bey has a dedicated off-leash dog park on their Sundance Ranch property. Bring your pup to run free while you taste excellent Cabernet Sauvignon in a gorgeous equestrian setting.",
    address: "1251 Tubbs Ln, Calistoga, CA 94515",
    region: "Calistoga",
    phone: "(707) 942-2100",
    website: "https://www.tamberbey.com",
    imageUrl: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800",
    latitude: 38.5789,
    longitude: -122.5534,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["OFF-LEASH dog park", "Water stations", "Dog treats", "Equestrian setting", "Outdoor tastings"],
    dogPolicy: "Dedicated off-leash dog park on property. Dogs are true guests here — water and treats always available.",
    tastingFee: "$45",
    hours: "Daily 10am–5pm",
    featured: true,
    listingTier: "featured",
    rating: 4.8,
    reviewCount: 412,
  },
  {
    name: "Tres Sabores",
    slug: "tres-sabores",
    description: "A charming St. Helena biodynamic farm winery where the owners' golden retrievers may personally greet you. Enjoy vineyard walks, cave tours, and garden tastings in this warm, dog-adoring environment. By appointment only, but absolutely worth it.",
    address: "1620 South Whitehall Ln, St. Helena, CA 94574",
    region: "St. Helena",
    phone: "(707) 967-8027",
    website: "https://www.tressabores.com",
    imageUrl: "https://images.unsplash.com/photo-1423345528374-f3b2af4da9f6?w=800",
    latitude: 38.5023,
    longitude: -122.4876,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: true,
    amenities: ["Owners' dogs on-site", "Vineyard walks", "Cave tours", "Garden tastings", "Dog treats"],
    dogPolicy: "Dogs warmly welcomed. The owners' golden retrievers may greet your pup. Vineyard walks and cave tours with dogs allowed.",
    tastingFee: "$35",
    hours: "Wed–Mon 10am–3pm, Closed Tue (By Appointment)",
    featured: false,
    listingTier: "premium",
    rating: 4.9,
    reviewCount: 187,
  },
  {
    name: "Etude Wines",
    slug: "etude-wines",
    description: "Situated in the beautiful Carneros appellation, Etude features a large grassy lawn perfect for dogs to stretch out while you enjoy exceptional Pinot Noir and Cabernet Sauvignon. A relaxed, open setting beloved by dog owners.",
    address: "1250 Cuttings Wharf Rd, Napa, CA 94559",
    region: "Los Carneros",
    phone: "(707) 257-5782",
    website: "https://www.etudewines.com",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    latitude: 38.2456,
    longitude: -122.3678,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Large grassy lawn", "Water bowls", "Outdoor seating", "Carneros views"],
    dogPolicy: "Dogs welcome on the large estate lawn and outdoor areas. Water always available. Keep leashed.",
    tastingFee: "$60",
    hours: "Daily 10am–4pm",
    featured: false,
    listingTier: "premium",
    rating: 4.5,
    reviewCount: 378,
  },
  {
    name: "HALL Wines",
    slug: "hall-wines",
    description: "A premier St. Helena estate with a magnificent Great Lawn where dogs are welcome. HALL hosts annual 'Harvest Hounds' events and maintains water bowls and treats for canine guests. The sculpture garden and grounds make for a stunning dog-friendly experience.",
    address: "401 St Helena Hwy S, St. Helena, CA 94574",
    region: "St. Helena",
    phone: "(707) 967-2626",
    website: "https://www.hallwines.com",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    latitude: 38.4789,
    longitude: -122.4098,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: false,
    napaGreenCertified: true,
    organicCertified: false,
    amenities: ["Great Lawn", "Harvest Hounds events", "Sculpture garden", "Water bowls", "Dog treats"],
    dogPolicy: "Dogs welcome on outdoor grounds and Great Lawn. Annual Harvest Hounds event. Water and treats provided.",
    tastingFee: "$45–$75",
    hours: "Daily 10am–5:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.6,
    reviewCount: 892,
  },
  {
    name: "Frog's Leap Winery",
    slug: "frogs-leap-winery",
    description: "One of Napa's most beloved organic wineries in a charming farmhouse setting. Dogs are warmly welcomed in the beautiful gardens and on the outdoor Garden Bar. The tranquil, unhurried atmosphere makes it perfect for a long afternoon with your pup.",
    address: "8815 Conn Creek Rd, Rutherford, CA 94573",
    region: "Napa Valley",
    phone: "(707) 963-4704",
    website: "https://www.frogsleap.com",
    imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800",
    latitude: 38.4612,
    longitude: -122.4098,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: true,
    amenities: ["Dog-friendly Garden Bar", "Organic farm setting", "Garden walks", "Water bowls", "Picnic area"],
    dogPolicy: "Dogs welcome in the beautiful gardens and on the Garden Bar outdoor patio. Keep leashed.",
    tastingFee: "$25",
    hours: "Mon–Sat 10am–4pm",
    featured: false,
    listingTier: "premium",
    rating: 4.7,
    reviewCount: 521,
  },
  {
    name: "Pine Ridge Vineyards",
    slug: "pine-ridge-vineyards",
    description: "In the prestigious Stags Leap District, Pine Ridge offers a dedicated 'Garden Reservation' — a private seating area in the estate gardens where you can pour your own wine in total peace while your dog relaxes beside you.",
    address: "5901 Silverado Trail, Napa, CA 94558",
    region: "Napa Valley",
    phone: "(800) 575-9777",
    website: "https://www.pineridgevineyards.com",
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800",
    latitude: 38.4198,
    longitude: -122.3689,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Garden Reservation (private outdoor seating)", "Self-pour option", "Estate gardens", "Water bowls"],
    dogPolicy: "Dogs welcome in dedicated garden seating areas. Ask for the Garden Reservation when booking.",
    tastingFee: "$50",
    hours: "Daily 10am–4:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.5,
    reviewCount: 445,
  },
  {
    name: "Honig Vineyard & Winery",
    slug: "honig-vineyard-winery",
    description: "A family-run Rutherford estate where dogs are part of the vineyard culture — Honig has historically used dogs in their vineyard operations. The relaxed patio setting and warm staff make it a consistently excellent dog-friendly stop.",
    address: "850 Rutherford Rd, Rutherford, CA 94573",
    region: "Napa Valley",
    phone: "(707) 963-5618",
    website: "https://www.honigwine.com",
    imageUrl: "https://images.unsplash.com/photo-1565199118800-b10d7b32b065?w=800",
    latitude: 38.4501,
    longitude: -122.4012,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: true,
    organicCertified: false,
    amenities: ["Dog-friendly patio", "Water bowls", "Dog treats", "Vineyard views", "Family atmosphere"],
    dogPolicy: "Dogs are part of the culture here. Welcome on the outdoor patio. Water and treats available.",
    tastingFee: "$35",
    hours: "Daily 10am–4pm",
    featured: false,
    listingTier: "free",
    rating: 4.5,
    reviewCount: 312,
  },
  {
    name: "Charles Krug Winery",
    slug: "charles-krug-winery",
    description: "Napa Valley's oldest operating winery (est. 1861) with rustic, sprawling outdoor grounds that are welcoming to leashed dogs. The historic property and relaxed atmosphere make it ideal for a long, leisurely afternoon tasting with your dog.",
    address: "2800 Main St, St. Helena, CA 94574",
    region: "St. Helena",
    phone: "(707) 967-2200",
    website: "https://www.charleskrug.com",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
    latitude: 38.5067,
    longitude: -122.4512,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Historic outdoor grounds", "Rustic setting", "Picnic area", "Leashed dogs on grounds"],
    dogPolicy: "Leashed dogs welcome on outdoor grounds. Historic estate with plenty of space to roam.",
    tastingFee: "$30",
    hours: "Daily 10:30am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.3,
    reviewCount: 567,
  },
  {
    name: "Tank Garage Winery",
    slug: "tank-garage-winery",
    description: "Napa's coolest dog-friendly tasting room — a converted 1930s roadside gas station in Calistoga serving limited-production wines with a loyal, irreverent spirit. The outdoor patio is famously dog-welcoming and the vibe is unlike any other Napa tasting room.",
    address: "16848 Highway 29, Calistoga, CA 94515",
    region: "Calistoga",
    phone: "(707) 942-1329",
    website: "https://www.tankgaragewinery.com",
    imageUrl: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=800",
    latitude: 38.5734,
    longitude: -122.5701,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dog-friendly outdoor patio", "Retro gas station setting", "Walk-ins welcome", "Limited production wines"],
    dogPolicy: "Dogs absolutely welcome on the patio. Very dog-friendly staff. Walk-ins encouraged.",
    tastingFee: "$25",
    hours: "Fri–Mon 11am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.6,
    reviewCount: 389,
  },
  {
    name: "Bouchaine Vineyards",
    slug: "bouchaine-vineyards",
    description: "Napa's southernmost winery, beautifully situated on the Carneros waterfront. Highly rated on Yelp for being one of the most dog-friendly wineries in Napa. The pastoral setting, water views, and relaxed atmosphere make it ideal for dog owners.",
    address: "1075 Buchli Station Rd, Napa, CA 94559",
    region: "Los Carneros",
    phone: "(707) 252-9065",
    website: "https://www.bouchaine.com",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    latitude: 38.2312,
    longitude: -122.3156,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Waterfront setting", "Dog-friendly patio", "Water bowls", "Scenic views", "Outdoor picnic area"],
    dogPolicy: "Top-rated for dog friendliness. Dogs welcome on outdoor patio and grounds. Water always available.",
    tastingFee: "$30",
    hours: "Daily 10:30am–5pm",
    featured: false,
    listingTier: "premium",
    rating: 4.7,
    reviewCount: 298,
  },
  {
    name: "Chandon California",
    slug: "chandon-california",
    description: "The beautiful Yountville estate of Moët & Chandon welcomes leashed dogs to their outdoor terrace and gardens until 4pm (walk-ins accepted). Sip world-class sparkling wine in a stunning setting with your pup by your side.",
    address: "1 California Dr, Yountville, CA 94599",
    region: "Yountville",
    phone: "(707) 944-2892",
    website: "https://www.chandon.com",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    latitude: 38.4012,
    longitude: -122.3634,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Outdoor terrace with dogs", "Gardens", "Walk-ins to 4pm", "Sparkling wine specialist", "Beautiful estate"],
    dogPolicy: "Dogs welcome on outdoor areas only. Walk-ins until 4pm; reservations recommended. Keep leashed.",
    tastingFee: "$45",
    hours: "Daily 10am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.4,
    reviewCount: 723,
  },
  {
    name: "Cliff Lede Vineyards",
    slug: "cliff-lede-vineyards",
    description: "A rock-and-roll themed boutique Stags Leap District winery where leashed dogs are welcome on the outdoor terrace. The intimate, artsy atmosphere and outstanding Cabernet Sauvignon make it a memorable stop for dog-owning wine lovers.",
    address: "1473 Yountville Cross Rd, Yountville, CA 94599",
    region: "Yountville",
    phone: "(707) 944-8642",
    website: "https://www.cliffledevineyards.com",
    imageUrl: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800",
    latitude: 38.4023,
    longitude: -122.3512,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: false,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dog-friendly outdoor terrace", "Rock-and-roll theme", "Water bowls", "Reservations required"],
    dogPolicy: "Dogs welcome on outdoor terrace only. Reservations required. Keep leashed.",
    tastingFee: "$50",
    hours: "Daily 10am–4pm (By Appointment)",
    featured: false,
    listingTier: "free",
    rating: 4.6,
    reviewCount: 341,
  },
  {
    name: "St. Clair Brown Winery & Brewery",
    slug: "st-clair-brown",
    description: "A unique Napa winery-brewery hybrid with a beautiful garden where dogs are enthusiastically welcomed. One of the few places you can enjoy craft beer and estate wine side by side, surrounded by lush gardens with your dog.",
    address: "816 Vallejo St, Napa, CA 94559",
    region: "Napa Valley",
    phone: "(707) 255-5591",
    website: "https://www.stclairbrown.com",
    imageUrl: "https://images.unsplash.com/photo-1569992462935-aba7e95be2da?w=800",
    latitude: 38.2978,
    longitude: -122.2956,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: true,
    amenities: ["Dog-friendly garden", "Wine & craft beer", "Water bowls", "Walk-ins welcome", "Unique winery-brewery"],
    dogPolicy: "Dogs encouraged in the garden tasting area. Water and treats available. One of Napa's most dog-welcoming spots.",
    tastingFee: "$25",
    hours: "Thu–Mon 12pm–6pm",
    featured: false,
    listingTier: "free",
    rating: 4.6,
    reviewCount: 456,
  },
  {
    name: "Mutt Lynch Winery",
    slug: "mutt-lynch-winery",
    description: "Voted Most Pet Friendly Winery in Sonoma County in 2024. This Windsor winery is entirely built around a love of dogs — Yappy Hour events, staff who bring their own dogs to work, water, toys, and treats everywhere. The most dog-dedicated winery in Wine Country.",
    address: "9050 Windsor Road, Windsor, CA 95492",
    region: "Sonoma County",
    phone: "(707) 687-5159",
    website: "https://www.muttlynchwinery.com",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    latitude: 38.5456,
    longitude: -122.8123,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Voted #1 Most Pet Friendly 2024", "Yappy Hour events", "Staff dogs on-site", "Dog toys & treats", "Water stations"],
    dogPolicy: "Dogs are the soul of this winery. Staff brings their own dogs to work. Yappy Hour events, treats, toys, water — all included.",
    tastingFee: "$20",
    hours: "Fri–Sun 11am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.8,
    reviewCount: 534,
  },
  {
    name: "St. Francis Winery",
    slug: "st-francis-winery",
    description: "A Sonoma icon that raises over $100,000 annually for Canine Companions. St. Francis hosts an annual 'Blessing of the Animals' and Summer Solstice events where dogs are honored guests. A deeply dog-loving winery with a beautiful Santa Rosa setting.",
    address: "100 Pythian Rd, Santa Rosa, CA 95409",
    region: "Sonoma County",
    phone: "(888) 675-9463",
    website: "https://www.stfranciswinery.com",
    imageUrl: "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=800",
    latitude: 38.4312,
    longitude: -122.5789,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Annual Blessing of the Animals", "Donates to Canine Companions", "Dog-friendly patio", "Water bowls", "Dog events"],
    dogPolicy: "Dogs welcomed at outdoor patio. Annual dog events including Blessing of the Animals (Oct) and Summer Solstice.",
    tastingFee: "$35–$60",
    hours: "Daily 10am–5pm",
    featured: true,
    listingTier: "featured",
    rating: 4.5,
    reviewCount: 1087,
  },
  {
    name: "Amista Vineyards",
    slug: "amista-vineyards",
    description: "Healdsburg's most dog-devoted winery, where winery dogs Dylan and Torin greet every guest daily. Features a half-mile self-guided Vineyard Adventure Walk you can do with your dog, plus fresh water and treats always available.",
    address: "3320 Dry Creek Rd, Healdsburg, CA 95448",
    region: "Dry Creek Valley",
    phone: "(707) 431-9200",
    website: "https://www.amistavineyards.com",
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    latitude: 38.6123,
    longitude: -122.8834,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Resident winery dogs Dylan & Torin", "½-mile Vineyard Adventure Walk", "Water & treats", "Sparkling wine specialist"],
    dogPolicy: "Winery dogs Dylan & Torin visit daily. Half-mile vineyard walk open to all pups. Water and treats always provided.",
    tastingFee: "$25",
    hours: "Daily 10:30am–4:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.7,
    reviewCount: 267,
  },
  {
    name: "Lambert Bridge Winery",
    slug: "lambert-bridge-winery",
    description: "Described by dog owners as a paradise for pups — Lambert Bridge has a picnic area, garden, and consistently provides treats and water bowls. The spacious Dry Creek grounds give dogs plenty of room to roam happily while you taste.",
    address: "4085 W Dry Creek Rd, Healdsburg, CA 95448",
    region: "Dry Creek Valley",
    phone: "(707) 431-9600",
    website: "https://www.lambertbridge.com",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    latitude: 38.6234,
    longitude: -122.8956,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dog paradise picnic area", "Garden", "Dog treats & water bowls", "Spacious grounds"],
    dogPolicy: "Regularly praised as a dog paradise. Generous outdoor space, treats, water always available.",
    tastingFee: "$20",
    hours: "Daily 10:30am–4:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.5,
    reviewCount: 389,
  },
  {
    name: "Muscardini Cellars",
    slug: "muscardini-cellars",
    description: "Resident golden retriever Biondi personally welcomes visiting dogs to this Kenwood gem. Dogs are welcome not just on the patio but in the tasting room and on all grounds. Muscardini regularly hosts dog events and always provides treats, water, and toys.",
    address: "9380 Sonoma Hwy, Kenwood, CA 95452",
    region: "Sonoma County",
    phone: "(707) 833-1427",
    website: "https://www.muscardini-cellars.com",
    imageUrl: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800",
    latitude: 38.4267,
    longitude: -122.5567,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Resident dog Biondi", "Dogs in tasting room & grounds", "Dog events", "Treats, water & toys"],
    dogPolicy: "Golden retriever Biondi is your pup's official host. Dogs welcome in tasting room and all grounds. Regular dog events.",
    tastingFee: "$20",
    hours: "Thu–Tue 11am–6pm",
    featured: false,
    listingTier: "premium",
    rating: 4.6,
    reviewCount: 178,
  },
  {
    name: "Gundlach Bundschu",
    slug: "gundlach-bundschu",
    description: "California's oldest family-owned winery (est. 1858) welcomes dogs on their Pinz vineyard tours — an adventure ride through their historic Sonoma estate. A sixth-generation winery where your dog gets to experience the vineyards too.",
    address: "2000 Denmark St, Sonoma, CA 95476",
    region: "Sonoma County",
    phone: "(707) 938-5277",
    website: "https://www.gunbun.com",
    imageUrl: "https://images.unsplash.com/photo-1470158499416-75be9aa0c4db?w=800",
    latitude: 38.2834,
    longitude: -122.4423,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Dogs welcome on Pinz vineyard tours", "Historic estate", "Water bowls", "6th-generation family winery"],
    dogPolicy: "Dogs welcome on Pinz vineyard vehicle tours. Outdoor grounds dog-friendly. Historic 375-acre estate.",
    tastingFee: "$30",
    hours: "Daily 11am–5:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.5,
    reviewCount: 612,
  },
  {
    name: "Larson Family Winery",
    slug: "larson-family-winery",
    description: "A charming Sonoma family winery so devoted to dogs they named their wine 'Three Lab Cab' after their beloved Labrador retrievers. Dogs are celebrated guests here with a welcoming outdoor setting and plenty of space to explore.",
    address: "23355 Millerick Rd, Sonoma, CA 95476",
    region: "Sonoma County",
    phone: "(707) 938-3031",
    website: "https://www.larsonfamilywinery.com",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    latitude: 38.2567,
    longitude: -122.4012,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Named wine after their Labs", "Dog-friendly grounds", "Open outdoor setting", "Family winery"],
    dogPolicy: "Dogs named the wine here — your pup is very welcome. Spacious outdoor grounds, water available.",
    tastingFee: "$15",
    hours: "Thu–Mon 11am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.4,
    reviewCount: 234,
  },
  {
    name: "Deerfield Ranch Winery",
    slug: "deerfield-ranch-winery",
    description: "Home of winery dog 'Obi Wine Kenobi' whose motto is 'May All Fours Be With You.' Dogs are enthusiastically welcomed at this Kenwood estate — from the caves to the outdoor grounds. Water always available and the staff are committed dog lovers.",
    address: "10200 Sonoma Hwy, Kenwood, CA 95452",
    region: "Sonoma County",
    phone: "(707) 833-5215",
    website: "https://www.deerfieldranch.com",
    imageUrl: "https://images.unsplash.com/photo-1565799118800-b10d7b32b065?w=800",
    latitude: 38.4145,
    longitude: -122.5512,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Winery dog Obi Wine Kenobi", "Water available", "Outdoor grounds", "Cave tasting"],
    dogPolicy: "Obi Wine Kenobi, the winery dog, welcomes your pup. 'May All Fours Be With You.'",
    tastingFee: "$20",
    hours: "Daily 10:30am–4:30pm",
    featured: false,
    listingTier: "free",
    rating: 4.5,
    reviewCount: 198,
  },
  {
    name: "Seghesio Family Vineyards",
    slug: "seghesio-family-vineyards",
    description: "Healdsburg's beloved Zinfandel specialist offers walk-in outdoor 'Grove Experience' seating — no reservation needed, just show up with your dog and enjoy award-winning wines in their oak grove outdoor lounge.",
    address: "700 Grove St, Healdsburg, CA 95448",
    region: "Sonoma County",
    phone: "(707) 433-3579",
    website: "https://www.seghesio.com",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    latitude: 38.6089,
    longitude: -122.8712,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Walk-in outdoor Grove Experience", "No reservation needed", "Oak grove lounge", "Dog-friendly patio"],
    dogPolicy: "Walk-in friendly Grove Experience — no reservation needed. Dogs welcome in outdoor lounge. First-come, first-served.",
    tastingFee: "$25",
    hours: "Daily 10:30am–4pm",
    featured: false,
    listingTier: "free",
    rating: 4.6,
    reviewCount: 512,
  },
  {
    name: "Bartholomew Estate Winery",
    slug: "bartholomew-estate-winery",
    description: "Surrounded by a stunning 375-acre private Sonoma park, Bartholomew Estate welcomes leashed dogs to roam the trails and enjoy wine to-go on the grounds. The combination of wine tasting and park hiking makes it one of the most unique dog-friendly experiences in Wine Country.",
    address: "1000 Vineyard Ln, Sonoma, CA 95476",
    region: "Sonoma County",
    phone: "(707) 939-3026",
    website: "https://www.bartholomewpark.com",
    imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800",
    latitude: 38.3023,
    longitude: -122.4456,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["375-acre private park", "Dog hiking trails", "Wine to-go for park walks", "Leashed dogs welcome"],
    dogPolicy: "Leashed dogs welcome in the park and on trails. Get wine to-go and enjoy it on the grounds with your pup.",
    tastingFee: "$20",
    hours: "Daily 11am–4:30pm",
    featured: false,
    listingTier: "premium",
    rating: 4.2,
    reviewCount: 81,
  },
  {
    name: "Kunde Family Winery",
    slug: "kunde-family-winery",
    description: "Winery dog Cooper (owned by Jeff Kunde himself) personally leads dog hikes through this fifth-generation estate near Kenwood. Dogs join cave tours and explore the beautiful Sonoma Mountain property. One of the most genuinely dog-integrated experiences available.",
    address: "9825 Sonoma Hwy, Kenwood, CA 95452",
    region: "Sonoma County",
    phone: "(707) 833-5501",
    website: "https://www.kunde.com",
    imageUrl: "https://images.unsplash.com/photo-1615887023568-e0e95e35b6f4?w=800",
    latitude: 38.4186,
    longitude: -122.5429,
    dogFriendly: true,
    sustainable: true,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Winery dog Cooper leads hikes", "Dog-friendly cave tours", "Mountain trails", "Dog-friendly terrace"],
    dogPolicy: "Cooper (Jeff Kunde's dog) leads dog hikes through the estate. Cave tours and all outdoor areas dog-friendly.",
    tastingFee: "$20–$40",
    hours: "Daily 10:30am–5pm",
    featured: false,
    listingTier: "premium",
    rating: 4.5,
    reviewCount: 521,
  },
  {
    name: "B.R. Cohn Winery",
    slug: "br-cohn-winery",
    description: "A beautiful Glen Ellen estate with Mayacamas Mountain views where dogs are welcomed with water bowls and treats on the patio and grounds. Known as one of Sonoma's most consistently dog-welcoming wineries with an easy-going, laid-back atmosphere.",
    address: "15000 Sonoma Hwy, Glen Ellen, CA 95442",
    region: "Sonoma County",
    phone: "(800) 330-4064",
    website: "https://www.brcohn.com",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    latitude: 38.3734,
    longitude: -122.5212,
    dogFriendly: true,
    sustainable: false,
    familyFriendly: true,
    napaGreenCertified: false,
    organicCertified: false,
    amenities: ["Water bowls & treats", "Patio & grounds", "Mayacamas Mountain views", "Consistently dog-friendly"],
    dogPolicy: "Water bowls and treats always available. Dogs welcome on patio and grounds. Leash required.",
    tastingFee: "$20",
    hours: "Daily 10am–5pm",
    featured: false,
    listingTier: "free",
    rating: 4.3,
    reviewCount: 345,
  },
];

export async function seedIfEmpty(): Promise<void> {
  try {
    const [result] = await db.select({ value: count() }).from(wineriesTable);
    const existingCount = result?.value ?? 0;

    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} wineries — skipping seed.`);
      return;
    }

    console.log("Database is empty — seeding wineries...");
    for (const winery of wineries) {
      await db.insert(wineriesTable).values(winery).onConflictDoNothing();
    }
    console.log(`Seeded ${wineries.length} dog-friendly wineries.`);
  } catch (err) {
    console.error("Seed error (non-fatal):", err);
  }
}

/**
 * Pinned homepage picks — edit this array to change which wineries appear
 * in the "Top Dog-Friendly Picks" section and in what order.
 * Uses slugs so it works across all environments regardless of row IDs.
 */
const HOMEPAGE_PICKS: { slug: string; rank: number }[] = [
  { slug: "ehlers-estate",            rank: 1 },
  { slug: "pride-mountain-vineyards", rank: 2 },
  { slug: "jessup-cellars",           rank: 3 },
];

const GALLERY_IMAGES: Record<string, string[]> = {
  "castello-di-amorosa": [
    "https://castellodiamorosa.com/wp-content/uploads/2018/05/Castello-home-welcome.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_1200,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/napavalley/HR-Castle_Wide_Fall_Full-e0581a2d5056a36_87e85a2c-5056-a36a-081d37b817e97024.jpg",
    "https://www.travelandleisure.com/thmb/SotdCuOsIdbAa6F_gAqXA9LEEAo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/amorosa-castle-calistoga-ca-USCASTLES0122-15db112e25fa453ab500c581c50e1b47.jpg",
    "https://angelaandrieux.com/wp-content/uploads/2012/05/castello-amorosa-napa-valley-castle-winery-entrance-chapel.jpg",
    "https://media.istockphoto.com/id/961605780/photo/castello-di-amorosa-napa-valley-california-winery-and-castle.jpg?s=612x612&w=0&k=20&c=N6jkXQwnftnJ5pa7Bejl-q6VvPriBylVWLhzUlF76Ps=",
  ],
  "trefethen-family-vineyards": [
    "https://www.trefethen.com/wp-content/uploads/2020/09/Trefethen-Family-Vineyards-Napa-Valley-Winery.jpg",
    "https://www.trefethen.com/wp-content/uploads/2020/07/5B-Winery-Pano.jpg",
    "https://www.trefethen.com/wp-content/uploads/2020/10/Trefethen_32.jpg",
    "https://images.squarespace-cdn.com/content/v1/58e28c9046c3c4185028c8ff/1503517307478-T2BH2G1K0R50RRU7PDY1/Trefethen_6_web.jpg",
    "https://images.squarespace-cdn.com/content/v1/58e28c9046c3c4185028c8ff/1503517281517-09CMI3XP33ZRULQFO90H/Trefethen_26_web.jpg",
  ],
  "jessup-cellars": [
    "https://yountville.com/wp-content/uploads/2019/12/19_Jessup_1920x1080-1080x675.jpg",
    "https://californiawineryadvisor.com/wp-content/uploads/2015/04/jessup-cellars-front.jpg",
    "https://www.intowine.com/files/styles/large/public/JessupOutside.jpg",
    "https://winemaps.com/sites/default/files/styles/large/public/2019-10/JC-Bldg2_0.jpg?itok=b4JZuG8m",
    "https://jessupcellars.com/wp-content/uploads/2023/11/ART-GALLERY-TASTING-ROOM-IMAGE.jpg.webp",
  ],
  "tamber-bey-vineyards": [
    "https://www.winetourism.com/files/2020/09/tamber-bey-vineyards-winery-1029x705.jpg",
    "https://tamberbey.com/wp-content/uploads/2023/07/DSC02007.jpg",
    "https://tamberbey.com/wp-content/uploads/2023/04/About-11-scaled.jpg",
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/4/2021/04/11145829/WCM-Tamber-Bey-Experience-6-1320x880-1.jpg",
    "https://bestwineries.com/wp-content/uploads/2022/11/Tamber-Bey-Vineyards-Wine-and-Horses-1024x630.jpg",
  ],
  "tres-sabores": [
    "https://winecountry-media.s3.amazonaws.com/14770-media-800x400(3).jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/crm/napavalley/TresSabores_Harvest22-00987_9155017D-2E08-439B-9BB5595802C0C7A3_931485e5-4151-4b64-a8564a7fb3dbc468.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/7b/cf/84/caption.jpg?w=900&h=500&s=1",
    "https://images.ctfassets.net/zpx0hfp3jryq/6u4YyxDefO7lSeFrrmmgTL/fe8b2e4c270197c6ccdc3f33b83fc501/Tres-Sabores-Winery-St-Helena-USA.jpg?fm=jpg&fl=progressive",
    "https://s3-media0.fl.yelpcdn.com/bphoto/IsXKIK2gl_Anzpkpz954sg/l.jpg",
  ],
  "etude-wines": [
    "https://bestwineries.com/wp-content/uploads/2023/11/etude-winery-exterior-1024x630.jpg",
    "https://www.etudewines.com/cdn/shop/files/i-xTgNRW7-X3.jpg?v=1702598782&width=1200",
    "https://bestwineries.com/wp-content/uploads/2023/11/etude-winery-outdoor-seating-area-1024x630.jpg",
    "https://www.etudewines.com/cdn/shop/files/ETU_Winery1_HR_1.jpg?v=1720476260&width=3840",
    "https://marinmagazine.com/wp-content/uploads/2025/09/Etude-Winery-Building-1024x768.jpg",
  ],
  "hall-wines": [
    "https://cdn.prod.website-files.com/64c82edd724cd267a8038611/667c77e0514edd78438f3b66_HALL%20Wines%20St.%20Helena.jpg",
    "https://www.napawineproject.com/wp-blog/wp-content/uploads/2013/10/Hall-Winery-Napa-Valley-1-1024x683.jpg",
    "https://winecountry-media.s3.amazonaws.com/7089-media-hallwines-slideshow2.jpg",
    "https://www.hallwines.com/media/wysiwyg/imresizer-1712236994537_1_.jpg",
    "https://californiatouristguide.com/wp-content/uploads/hall-wines-entry-sculpture.jpg",
  ],
  "frogs-leap-winery": [
    "https://www.exoticwinetravel.com/wp-content/uploads/2023/05/Frogs-Leap-Winery-1200x667.png",
    "https://theluxuryreport.com/wp-content/uploads/2019/04/Red-Barn-in-mustard2.jpg",
    "https://www.frogsleap.com/wp-content/uploads/2023/11/PhotoEmmaKMorris-1705-cropped-scaled.jpg",
    "/winery-images/frogs-leap-5.jpg",
  ],
  "pine-ridge-vineyards": [
    "https://www.pineridgevineyards.com/wp-content/uploads/2024/11/banner-visit-bg.webp",
    "https://corkandjourney.com/wp-content/uploads/2023/10/Cave-Entrance.jpeg",
    "https://s3.amazonaws.com/winecountry-media/wp-content/uploads/sites/4/2023/03/14191007/Pine-Ridge-Cave-Tasting-Experience-1320x880-1.jpg",
    "/winery-images/pine-ridge-2.jpg",
    "https://bestwineries.com/wp-content/uploads/2023/05/Pine-Ridge-Vineyards-winery.jpg",
  ],
  "honig-vineyard-winery": [
    "https://bestwineries.com/wp-content/uploads/2024/02/Honig-Vineyard-and-Winery-tasting-room-exterior-1200x739.jpg",
    "/winery-images/honig-2.jpg",
    "/winery-images/honig-3.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/MiwqsdwFAG8hADKr2rc-Eg/l.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/4gZWUk8lRSkzSQO2KOQ7EA/l.jpg",
  ],
  "charles-krug-winery": [
    "https://www.platypustours.com/wp-content/uploads/2021/05/Charles-Krug-Winery-Entrance-1080x675.jpg",
    "https://visitcalistoga.com/wp-content/uploads/2024/05/charles-krug-e1645725447935.jpg",
    "https://www.charleskrug.com/wp-content/uploads/2021/04/charles_krug_night.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Charles_Krug_Winery%2C_2800_St._Helena_Hwy.%2C_St._Helena%2C_CA_10-16-2011_3-26-34_PM.JPG/960px-Charles_Krug_Winery%2C_2800_St._Helena_Hwy.%2C_St._Helena%2C_CA_10-16-2011_3-26-34_PM.JPG",
    "https://s3-media0.fl.yelpcdn.com/bphoto/kctUpDZshben3aOysIGPag/l.jpg",
  ],
  "tank-garage-winery": [
    "https://booknapavalley.com/wp-content/uploads/2019/10/tank-garage-winery-featured.jpg",
    "https://booknapavalley.com/wp-content/uploads/2019/10/tank-garage-winery-1.jpg",
    "https://booknapavalley.com/wp-content/uploads/2019/10/tank-garage-winery-2.jpg",
    "https://res.cloudinary.com/htt8g4cd/images/f_auto,q_auto/v1730962975/wp/Tank_Garage_Winery_Pinball/Tank_Garage_Winery_Pinball.jpg?_i=AA",
    "https://phylonthego.com/wp-content/uploads/2021/06/2.-Tank_Garage_Winery_Exterior-700x461-1.jpg",
  ],
  "bouchaine-vineyards": [
    "https://bouchaine.com/wp-content/uploads/2024/10/bouchaine-dusk-newcrop.jpg",
    "https://bouchaine.com/wp-content/uploads/2024/10/Bouchaine_8-2-2-scaled.jpg",
    "https://bestwineries.com/wp-content/uploads/2023/04/Bouchaine-vineyards-exterior-aerial-600x369.jpg",
    "https://www.winewithpaige.com/wp-content/uploads/2021/08/Bouchaine-new-tasting-room.jpeg",
    "https://bestwineries.com/wp-content/uploads/2023/04/Bouchaine-Vineyard-Garden-1024x630.jpg",
  ],
  "chandon-california": [
    "https://dannymangin.com/wp-content/uploads/2021/10/Yountville-itinerary_37-Domaine-Chandon-entrance-1024x763.jpeg",
    "https://s3.amazonaws.com/winecountry-media/wp-content/uploads/sites/4/2019/01/14172334/blog-012219-yountville-pic2.jpg",
    "https://www.napavalleyjourneys.com/images/domaine-chandon-yountville-winery.jpg",
    "https://californiathroughmylens.com/wp-content/uploads/2016/04/Domaine-Chandon-1.jpg",
    "https://images.squarespace-cdn.com/content/v1/5afe0e2fda02bc9b7936b6bd/1527639729689-RKH1R7ZMIQK8J1I5MQJA/Domaine+Chandon_3.jpg",
  ],
  "cliff-lede-vineyards": [
    "https://winecountry-media.s3.amazonaws.com/23289-media-CliffLede-Winery-Slideshow-1600x800.jpg",
    "https://c8.alamy.com/comp/HGK9YJ/vineyard-viewed-from-cliff-lede-vineyards-yountville-stags-leap-district-HGK9YJ.jpg",
    "https://yountville.com/wp-content/uploads/2019/09/116_Cliff-Lede-Vineyards_3.jpg.webp",
    "https://s3-media0.fl.yelpcdn.com/bphoto/27z8F6x5uE6bOMt82pQpnA/l.jpg",
    "https://yountville.com/wp-content/uploads/2024/10/10-24-Classic-Rock-100-Point-Wines-and-Vineyard-Views-Yountvilles-Cliff-Lede-Vineyard-3.jpg.webp",
  ],
  "st-clair-brown": [
    "https://bestwineries.com/wp-content/uploads/2023/10/St-Clair-Brown-Winery-and-Brewery-exterior-photo-credit-Emma-K-Morris-1200x739.jpg",
    "https://winecountry-media.s3.amazonaws.com/17092-media-greenhousetastingroom_800x400.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/21/19/14/st-clair-brown-winery.jpg?w=1200&h=1200&s=1",
    "https://d1sve9khgp0cw0.cloudfront.net/wp-content/uploads/2025/03/PhotoEmmaKMorris-3exposure5-1024x683.jpg",
    "/winery-images/st-clair-brown-5.jpg",
  ],
  "mutt-lynch-winery": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/b6/a3/48/exterior-of-the-tasting.jpg?w=1200&h=800&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/3b/b8/63/photo1jpg.jpg?w=1400&h=800&s=1",
    "https://we3travel.com/wp-content/uploads/2019/10/Mutt-Lynch-tasting.jpg",
    "https://s.hdnux.com/photos/01/30/33/70/23182909/3/1200x0.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/87dykjPwYitejyl9TH7d3A/l.jpg",
  ],
  "st-francis-winery": [
    "https://bestwineries.com/wp-content/uploads/2023/08/st-francis-winery-entrance-and-bell-tower-2-1200x739.jpg",
    "https://www.stfranciswinery.com/wp-content/uploads/2023/07/tower-4-1170x781.jpg",
    "https://cdn.californiawinetours.com/wp-content/uploads/2021/11/17170043/stfrancis.jpg",
    "https://winecountry-media.s3.amazonaws.com/21604-media-SlideshowImage1-StFrancisWinery-Front-1200x600.jpg",
    "https://roadtrippingcalifornia.com/wp-content/uploads/2021/11/Saint-Francis-Winery-Tower.jpg",
  ],
  "amista-vineyards": [
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/5/2022/11/20104314/Amista-Vineyards-Healdsburg-Sonoma-County-California-1320x880-1.jpg",
    "https://images.squarespace-cdn.com/content/v1/5d13dcd6f353bd0001178a72/a8415531-b738-4dda-a93a-c6fc8f78c4db/amista-vineyards.jpg",
    "https://healdsburgisheavenly.com/wp-content/uploads/2020/01/amista-winery-vineyards-healdsburg.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/50/32/f4/amista-vineyards.jpg?w=900&h=500&s=1",
    "/winery-images/amista-5.jpg",
  ],
  "lambert-bridge-winery": [
    "https://s3-media0.fl.yelpcdn.com/bphoto/YCSwjZhJ5LorwLwzXwd8-Q/l.jpg",
    "https://bestwineries.com/wp-content/uploads/2022/03/Winery-Photo-e1678397255298-1.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/YjUHPhyh60xLAvFbxOwSfw/l.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/N1rN7kMzkFpkV6hYIIgqHQ/l.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1024,h_683/crm/sonoma/tasting_rooms_wineries_Lambert_Bridge_Sonoma_County_0010-210ac2b35056a36_210ac4eb-5056-a36a-07435fa5aeee5b93.jpg",
  ],
  "muscardini-cellars": [
    "https://winecountry-media.s3.amazonaws.com/7768-media-MuscardiniCellars.jpg",
    "https://www.muscardinicellars.com/wp-content/uploads/2024/02/MC.jpg",
    "https://onthewineroad.us/wp-content/uploads/2016/01/Muscardini-Tasting-room.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/c2/aa/3f/muscardini-cellars-tasting.jpg?w=1200&h=-1&s=1",
    "https://s3-media0.fl.yelpcdn.com/bphoto/z0D4lpguv7bKALWweZdYLQ/l.jpg",
  ],
  "gundlach-bundschu": [
    "https://www.extranomical.com/wp-content/uploads/2022/11/Gundlach-Bundschu-Winery-min-1024x685.webp",
    "https://cdn.californiawinetours.com/wp-content/uploads/2021/11/17170055/gunbun.jpg",
    "https://www.gunbun.com/wp-content/uploads/2019/08/tasting-room-2048x1367.jpg",
    "https://beyond.breakthrubev.com/assets/images/articles/2020/gun-bun/Gundlach-Bundschu--3--Rhinefarm-vineyard-irrigation-pond--900.jpg",
    "https://www.gunbun.com/wp-content/uploads/2022/08/home-hero-6.jpg",
  ],
  "larson-family-winery": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f0/0a/dc/front-of-larson-family.jpg?w=1200&h=1200&s=1",
    "https://beyondtheboardwalk.com/wp-content/uploads/2023/11/Beyond-The-Boardwalk-Larson-Family-Winery-001-1024x681.jpeg",
    "/winery-images/larson-2.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/5GV-zhemMc2DleS4rWiYGw/l.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1024,h_683/crm/sonoma/larson-42_0E0C5937-BE96-44EE-81414293B9450E57_20cf4137-1e34-4e1a-b269f80094d2fcd6.jpg",
  ],
  "deerfield-ranch-winery": [
    "https://i0.wp.com/www.prioritywinepass.com/wp-content/uploads/2019/05/354231429.jpg?w=1100&ssl=1",
    "https://www.carducciassociates.com/images/uploads/projects/_ansel_crops/DEERFIELD_RANCH_WINERY_31-1636-1656373321.jpg",
    "https://images.squarespace-cdn.com/content/v1/6466cc84fc33e50d83dd07d8/1684458656245-V1QAT8JYVBN4PRPVWSPO/DRWCaveDoors.jpg?format=1000w",
    "https://images.squarespace-cdn.com/content/v1/6466cc84fc33e50d83dd07d8/1684458707467-DHEQE964AWCLK1D5T9IY/WinemakingDRW.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/t8kvS1d05Guk-MDveM-Mxg/l.jpg",
  ],
  "seghesio-family-vineyards": [
    "https://winecountry-media.s3.amazonaws.com/18669-media-2-Slideshow-Seghesio-grove-1600x800.jpg",
    "https://winecountry-media.s3.amazonaws.com/18663-media-6-Slideshow-Seghesio-tastingroom-1600x800.jpg",
    "/winery-images/seghesio-2.jpg",
    "https://bestwineries.com/wp-content/uploads/2025/04/Seghesio-Family-Vineyards-entrance-1024x1024.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/9c/9f/f8/caption.jpg?w=1200&h=700&s=1",
  ],
  "bartholomew-estate-winery": [
    "https://bestwineries.com/wp-content/uploads/2024/08/Bartholomew-Estate-Winery-exterior-1200x739.jpg",
    "https://www.bartholomewestate.com/wp-content/gallery/example/bartholomew_estate_manor_distance_vine_rows_clouds_02-1.jpg",
    "https://www.bartholomewestate.com/wp-content/gallery/example/bartholomewestate_home.jpg",
    "https://www.bartholomewestate.com/wp-content/gallery/example/bartholomew_winery_front_entrance.jpg",
    "https://d1sve9khgp0cw0.cloudfront.net/wp-content/uploads/2025/04/Winery-Exterior_formerly-the-inmate-hospital_photo-credit-Courtesy-of-Bartholomew-Estate-Winery-1024x682.jpg",
  ],
  "kunde-family-winery": [
    "https://cdn.californiawinetours.com/wp-content/uploads/2021/08/17170124/Kunde_Winery_Frt_Panorama-XL.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_1200,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/sonomavalley/Kunde_Ext__TEP5108-600x450_836855C9-54CE-4DDA-9EA5613F30120985_76e54f13-ab04-45e6-a081ae3527dbe323.jpg",
    "/winery-images/kunde-2.jpg",
    "/winery-images/kunde-3.jpg",
    "https://d1sve9khgp0cw0.cloudfront.net/wp-content/uploads/2021/09/kunde-winery-mountain-top-tasting-courtesy-photo-1200x800.jpeg",
  ],
  "br-cohn-winery": [
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1024,h_683/crm/sonoma/tasting_rooms_wineries_BR_Cohn_Sonoma_Valley_Sonoma_County_0060-83d94ec85056a36_83d9515a-5056-a36a-07f8d6ef240e7a5e.jpg",
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/5/2015/12/b-r-cohn-winery-680.jpg",
    "https://ksimonian.com/Blog/wp-content/uploads/2012/05/BR-Cohn-Winery-002.jpg",
    "https://ksimonian.com/Blog/wp-content/uploads/2012/05/BR-Cohn-Winery-004.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/40/aa/4b/caption.jpg?w=900&h=500&s=1",
  ],
  "round-pond-estate": [
    "https://napagreen.org/wp-content/uploads/2025/04/rd-winery.jpg",
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/4/2017/01/19090058/Round-Pond-terrace-1320x880-1.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/58/d5/f6/caption.jpg?w=600&h=600&s=1",
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/2021/09/25195504/Round-Pond-terrace-1320x880-1.jpg",
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/4/2022/05/07221418/Round-Pond-Terrace-1320x880-1.jpg",
  ],
  "pride-mountain-vineyards": [
    "https://armchairsommelier.com/wp-content/uploads/2022/03/pride-mountain-vineyards.jpeg",
    "https://napavalleylife.com/wp-content/uploads/2021/06/Pride-Mtn-pic-2.jpg",
    "https://www.platypustours.com/wp-content/uploads/2021/06/Platypus-Wine-Tours-Pride-Mountain-Vineyards.jpg",
    "https://blog.wineroutes.com/wp-content/uploads/2022/06/PMV-Napa_Sonoma-Arch-1.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/KK_lFhl0wvvfEj-TVBGRDA/l.jpg",
  ],
};

export async function syncGalleryImages(): Promise<void> {
  try {
    let updated = 0;
    for (const [slug, images] of Object.entries(GALLERY_IMAGES)) {
      const result = await pool.query(
        `UPDATE wineries SET gallery_images = $1 WHERE slug = $2 AND (gallery_images IS NULL OR array_length(gallery_images, 1) IS NULL OR array_length(gallery_images, 1) = 0)`,
        [images, slug],
      );
      if ((result.rowCount ?? 0) > 0) updated++;
    }
    console.log(`syncGalleryImages: updated ${updated} wineries.`);
  } catch (err) {
    console.error("syncGalleryImages error (non-fatal):", err);
  }
}

/**
 * Force-overwrite gallery images for wineries that had broken/403/404 URLs.
 * Always applies — runs on every startup to ensure prod stays in sync.
 */
const GALLERY_FIXES: Record<string, string[]> = {
  "frogs-leap-winery": [
    "https://www.exoticwinetravel.com/wp-content/uploads/2023/05/Frogs-Leap-Winery-1200x667.png",
    "https://theluxuryreport.com/wp-content/uploads/2019/04/Red-Barn-in-mustard2.jpg",
    "https://www.frogsleap.com/wp-content/uploads/2023/11/PhotoEmmaKMorris-1705-cropped-scaled.jpg",
    "/winery-images/frogs-leap-5.jpg",
  ],
  "pine-ridge-vineyards": [
    "https://www.pineridgevineyards.com/wp-content/uploads/2024/11/banner-visit-bg.webp",
    "https://corkandjourney.com/wp-content/uploads/2023/10/Cave-Entrance.jpeg",
    "https://s3.amazonaws.com/winecountry-media/wp-content/uploads/sites/4/2023/03/14191007/Pine-Ridge-Cave-Tasting-Experience-1320x880-1.jpg",
    "/winery-images/pine-ridge-2.jpg",
    "https://bestwineries.com/wp-content/uploads/2023/05/Pine-Ridge-Vineyards-winery.jpg",
  ],
  "honig-vineyard-winery": [
    "https://bestwineries.com/wp-content/uploads/2024/02/Honig-Vineyard-and-Winery-tasting-room-exterior-1200x739.jpg",
    "/winery-images/honig-2.jpg",
    "/winery-images/honig-3.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/MiwqsdwFAG8hADKr2rc-Eg/l.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/4gZWUk8lRSkzSQO2KOQ7EA/l.jpg",
  ],
  "st-clair-brown": [
    "https://bestwineries.com/wp-content/uploads/2023/10/St-Clair-Brown-Winery-and-Brewery-exterior-photo-credit-Emma-K-Morris-1200x739.jpg",
    "https://winecountry-media.s3.amazonaws.com/17092-media-greenhousetastingroom_800x400.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/21/19/14/st-clair-brown-winery.jpg?w=1200&h=1200&s=1",
    "https://d1sve9khgp0cw0.cloudfront.net/wp-content/uploads/2025/03/PhotoEmmaKMorris-3exposure5-1024x683.jpg",
    "/winery-images/st-clair-brown-5.jpg",
  ],
  "amista-vineyards": [
    "https://winecountry-media.s3.amazonaws.com/wp-content/uploads/sites/5/2022/11/20104314/Amista-Vineyards-Healdsburg-Sonoma-County-California-1320x880-1.jpg",
    "https://images.squarespace-cdn.com/content/v1/5d13dcd6f353bd0001178a72/a8415531-b738-4dda-a93a-c6fc8f78c4db/amista-vineyards.jpg",
    "https://healdsburgisheavenly.com/wp-content/uploads/2020/01/amista-winery-vineyards-healdsburg.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/50/32/f4/amista-vineyards.jpg?w=900&h=500&s=1",
    "/winery-images/amista-5.jpg",
  ],
  "larson-family-winery": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f0/0a/dc/front-of-larson-family.jpg?w=1200&h=1200&s=1",
    "https://beyondtheboardwalk.com/wp-content/uploads/2023/11/Beyond-The-Boardwalk-Larson-Family-Winery-001-1024x681.jpeg",
    "/winery-images/larson-2.jpg",
    "https://s3-media0.fl.yelpcdn.com/bphoto/5GV-zhemMc2DleS4rWiYGw/l.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1024,h_683/crm/sonoma/larson-42_0E0C5937-BE96-44EE-81414293B9450E57_20cf4137-1e34-4e1a-b269f80094d2fcd6.jpg",
  ],
  "seghesio-family-vineyards": [
    "https://winecountry-media.s3.amazonaws.com/18669-media-2-Slideshow-Seghesio-grove-1600x800.jpg",
    "https://winecountry-media.s3.amazonaws.com/18663-media-6-Slideshow-Seghesio-tastingroom-1600x800.jpg",
    "/winery-images/seghesio-2.jpg",
    "https://bestwineries.com/wp-content/uploads/2025/04/Seghesio-Family-Vineyards-entrance-1024x1024.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/9c/9f/f8/caption.jpg?w=1200&h=700&s=1",
  ],
  "kunde-family-winery": [
    "https://cdn.californiawinetours.com/wp-content/uploads/2021/08/17170124/Kunde_Winery_Frt_Panorama-XL.jpg",
    "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_1200,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/sonomavalley/Kunde_Ext__TEP5108-600x450_836855C9-54CE-4DDA-9EA5613F30120985_76e54f13-ab04-45e6-a081ae3527dbe323.jpg",
    "/winery-images/kunde-2.jpg",
    "/winery-images/kunde-3.jpg",
    "https://d1sve9khgp0cw0.cloudfront.net/wp-content/uploads/2021/09/kunde-winery-mountain-top-tasting-courtesy-photo-1200x800.jpeg",
  ],
};

export async function syncGalleryFixes(): Promise<void> {
  try {
    let updated = 0;
    for (const [slug, images] of Object.entries(GALLERY_FIXES)) {
      const result = await pool.query(
        `UPDATE wineries SET gallery_images = $1 WHERE slug = $2`,
        [images, slug],
      );
      if ((result.rowCount ?? 0) > 0) updated++;
    }
    console.log(`syncGalleryFixes: applied fixes to ${updated} wineries.`);
  } catch (err) {
    console.error("syncGalleryFixes error (non-fatal):", err);
  }
}

export async function syncFeaturedRank(): Promise<void> {
  try {
    await pool.query(
      `ALTER TABLE wineries ADD COLUMN IF NOT EXISTS featured_rank integer`,
    );

    const pinnedSlugs = HOMEPAGE_PICKS.map((p) => p.slug);

    for (const { slug, rank } of HOMEPAGE_PICKS) {
      await db
        .update(wineriesTable)
        .set({ featured: true, featuredRank: rank })
        .where(eq(wineriesTable.slug, slug));
    }

    await db
      .update(wineriesTable)
      .set({ featuredRank: null })
      .where(
        and(
          isNotNull(wineriesTable.featuredRank),
          not(inArray(wineriesTable.slug, pinnedSlugs)),
        ),
      );

    console.log(`Featured ranks set for: ${pinnedSlugs.join(", ")}`);
  } catch (err) {
    console.error("syncFeaturedRank error (non-fatal):", err);
  }
}

const venueTypeUpdates: { slug: string; venueType: string }[] = [
  { slug: "castello-di-amorosa",        venueType: "Winery" },
  { slug: "trefethen-family-vineyards", venueType: "Winery" },
  { slug: "jessup-cellars",             venueType: "Tasting Room" },
  { slug: "tamber-bey-vineyards",       venueType: "Winery" },
  { slug: "tres-sabores",               venueType: "Winery" },
  { slug: "etude-wines",                venueType: "Winery" },
  { slug: "hall-wines",                 venueType: "Winery" },
  { slug: "frogs-leap-winery",          venueType: "Winery" },
  { slug: "pine-ridge-vineyards",       venueType: "Winery" },
  { slug: "honig-vineyard-winery",      venueType: "Winery" },
  { slug: "charles-krug-winery",        venueType: "Winery" },
  { slug: "tank-garage-winery",         venueType: "Tasting Room" },
  { slug: "bouchaine-vineyards",        venueType: "Winery" },
  { slug: "chandon-california",         venueType: "Winery" },
  { slug: "cliff-lede-vineyards",       venueType: "Winery" },
  { slug: "st-clair-brown",             venueType: "Tasting Room" },
  { slug: "mutt-lynch-winery",          venueType: "Tasting Room" },
  { slug: "st-francis-winery",          venueType: "Winery" },
  { slug: "amista-vineyards",           venueType: "Winery" },
  { slug: "lambert-bridge-winery",      venueType: "Winery" },
  { slug: "muscardini-cellars",         venueType: "Tasting Room" },
  { slug: "gundlach-bundschu",          venueType: "Winery" },
  { slug: "larson-family-winery",       venueType: "Winery" },
  { slug: "deerfield-ranch-winery",     venueType: "Winery" },
  { slug: "seghesio-family-vineyards",  venueType: "Winery" },
  { slug: "bartholomew-estate-winery",  venueType: "Winery" },
  { slug: "kunde-family-winery",        venueType: "Winery" },
  { slug: "br-cohn-winery",             venueType: "Winery" },
  { slug: "round-pond-estate",          venueType: "Winery" },
  { slug: "pride-mountain-vineyards",   venueType: "Winery" },
  { slug: "ehlers-estate",              venueType: "Winery" },
];

export async function syncVenueTypes(): Promise<void> {
  try {
    for (const { slug, venueType } of venueTypeUpdates) {
      await db.update(wineriesTable).set({ venueType }).where(eq(wineriesTable.slug, slug));
    }
    console.log(`Venue types synced for ${venueTypeUpdates.length} wineries.`);
  } catch (err) {
    console.error("Venue type sync error (non-fatal):", err);
  }
}
