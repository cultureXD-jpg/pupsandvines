const BASE_URL = "https://pupsandvines.com";
const SITE_NAME = "Pups & Vines";
const DEFAULT_TITLE = "Pups & Vines — Dog-Friendly Winery Directory";
const DEFAULT_DESCRIPTION =
  "Discover verified dog-friendly wineries across Napa Valley and Sonoma County. Every listing is pup-approved — tasting rooms, patios, and vineyards that welcome your dog.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface SeoData {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: string;
  robots: string;
  bodyHtml?: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export const ARTICLE_META: ArticleMeta[] = [
  {
    slug: "visit-napa-valley-pet-friendly-guide",
    title: "Visit Napa Valley's Pet-Friendly Guide Is One of the Best Resources Out There",
    excerpt: "The official Visit Napa Valley website has a surprisingly thorough pet-friendly guide covering wineries, restaurants, hotels, and outdoor activities. Here's why it's worth bookmarking before your next trip.",
    image: `${BASE_URL}/visit-napa-valley-preview.png`,
    category: "Tips & Guides",
    date: "May 29, 2026",
  },
  {
    slug: "halo-collar-wine-country-dog-safety",
    title: "We've Been Obsessed with the Halo Collar — Here's Why",
    excerpt: "No affiliation, no sponsorship — just a product we genuinely think is one of the most interesting things to happen to dog ownership in a while. Let us explain.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Gear & Accessories",
    date: "May 7, 2026",
  },
  {
    slug: "what-to-know-before-bringing-your-dog-wine-tasting",
    title: "What to Know Before Bringing Your Dog Wine Tasting",
    excerpt: "A practical guide to everything you need to prepare before your first dog-friendly winery visit — from leash rules to what to pack.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Tips & Guides",
    date: "April 20, 2026",
  },
  {
    slug: "best-dog-friendly-wineries-napa-valley",
    title: "The Best Dog-Friendly Wineries in Napa Valley",
    excerpt: "Our picks for the most welcoming, well-equipped dog-friendly wineries across Napa Valley — from Calistoga to Los Carneros.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Napa Valley",
    date: "April 5, 2026",
  },
  {
    slug: "dog-etiquette-at-wineries",
    title: "Dog Etiquette at Wineries: How to Be a Good Guest",
    excerpt: "Tips for keeping your dog calm, safe, and welcome at tasting rooms — and how to ensure every winery you visit stays dog-friendly.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Tips & Guides",
    date: "March 22, 2026",
  },
  {
    slug: "best-time-to-visit-wine-country-with-your-dog",
    title: "The Best Time to Visit Wine Country with Your Dog",
    excerpt: "Harvest season is stunning but busy. Here's how to think through the seasons when planning a dog-friendly Napa or Sonoma trip.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Planning",
    date: "March 10, 2026",
  },
  {
    slug: "dog-friendly-wineries-sonoma-county",
    title: "Dog-Friendly Wineries in Sonoma County",
    excerpt: "Sonoma County has some of the most relaxed, welcoming wine country vibes in California — and that extends to dogs. Here are our favorites.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Sonoma County",
    date: "February 28, 2026",
  },
  {
    slug: "how-to-plan-a-dog-friendly-weekend-wine-country",
    title: "How to Plan a Dog-Friendly Weekend in Wine Country",
    excerpt: "A step-by-step weekend itinerary for dog owners visiting Napa Valley or Sonoma County — where to stay, eat, taste, and explore.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Planning",
    date: "February 14, 2026",
  },
  {
    slug: "what-to-pack-winery-day-with-dog",
    title: "What to Pack for a Winery Day with Your Dog",
    excerpt: "The complete packing list for a comfortable, safe, and fun winery day with your dog — from water bowls to cleanup supplies.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Gear & Accessories",
    date: "January 30, 2026",
  },
  {
    slug: "off-leash-winery-experiences-wine-country",
    title: "Off-Leash Winery Experiences in Wine Country",
    excerpt: "A curated list of wineries that offer dedicated off-leash areas or dog parks — where your pup can roam while you taste.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Napa Valley",
    date: "January 18, 2026",
  },
  {
    slug: "winery-dogs-napa-sonoma",
    title: "Winery Dogs of Napa & Sonoma: The Unofficial Mascots of Wine Country",
    excerpt: "Every great winery has a resident dog. Here's a love letter to the four-legged ambassadors who make wine country feel like home.",
    image: `${BASE_URL}/opengraph.jpg`,
    category: "Stories",
    date: "January 5, 2026",
  },
];

const ARTICLE_META_MAP = new Map(ARTICLE_META.map((a) => [a.slug, a]));

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const STATIC_BODY_HTML: Record<string, string> = {
  "/": `
    <main>
      <h1>Pups &amp; Vines — Dog-Friendly Winery Directory</h1>
      <p>Discover verified dog-friendly wineries across Napa Valley and Sonoma County. Every listing is pup-approved — tasting rooms, patios, and vineyards that welcome your dog.</p>
      <section>
        <h2>Why Pups &amp; Vines?</h2>
        <p>Finding a truly dog-friendly winery takes more than a Google search. We visit, verify, and list only the wineries where your dog is genuinely welcome — not just tolerated. Every listing includes the dog policy, amenities, and tips for your visit.</p>
      </section>
      <section>
        <h2>Browse by Region</h2>
        <ul>
          <li><a href="/directory?region=Napa+Valley">Napa Valley</a></li>
          <li><a href="/directory?region=Sonoma+County">Sonoma County</a></li>
          <li><a href="/directory?region=Calistoga">Calistoga</a></li>
          <li><a href="/directory?region=Rutherford">Rutherford</a></li>
          <li><a href="/directory?region=Yountville">Yountville</a></li>
          <li><a href="/directory?region=St.+Helena">St. Helena</a></li>
          <li><a href="/directory?region=Los+Carneros">Los Carneros</a></li>
          <li><a href="/directory?region=Dry+Creek+Valley">Dry Creek Valley</a></li>
        </ul>
      </section>
      <p><a href="/directory">Browse all dog-friendly wineries</a> or <a href="/map">view the map</a>.</p>
    </main>`,

  "/directory": `
    <main>
      <h1>Browse Dog-Friendly Wineries — Napa Valley &amp; Sonoma County</h1>
      <p>Browse our full directory of verified dog-friendly wineries across Napa Valley and Sonoma County. Filter by region, venue type, and dog-friendly amenities to find the perfect winery for your next visit with your pup.</p>
      <section>
        <h2>Find Wineries by Region</h2>
        <ul>
          <li><a href="/directory?region=Napa+Valley">Napa Valley</a> — the heart of California wine country</li>
          <li><a href="/directory?region=Sonoma+County">Sonoma County</a> — laid-back and wildly dog-friendly</li>
          <li><a href="/directory?region=Calistoga">Calistoga</a> — thermal springs and tasting rooms</li>
          <li><a href="/directory?region=Rutherford">Rutherford</a> — classic Cabernet territory</li>
          <li><a href="/directory?region=Yountville">Yountville</a> — Michelin country, dog included</li>
          <li><a href="/directory?region=St.+Helena">St. Helena</a> — boutique estates and big labels</li>
          <li><a href="/directory?region=Los+Carneros">Los Carneros</a> — cool-climate Pinot and happy dogs</li>
          <li><a href="/directory?region=Dry+Creek+Valley">Dry Creek Valley</a> — Zinfandel and sunshine</li>
        </ul>
      </section>
    </main>`,

  "/about": `
    <main>
      <h1>About Pups &amp; Vines</h1>
      <p>Pups &amp; Vines is your guide to dog-friendly wine tasting in Napa Valley and Sonoma County. We built this directory because we got tired of calling ahead, showing up, and being told "sorry, no dogs on the patio today."</p>
      <p>Every winery in our directory is verified dog-friendly. We track dog policies, on-leash and off-leash areas, water stations, pup menus, and winery dogs. Before you pack up the car and the pup, we've done the research for you.</p>
      <h2>Our Mission</h2>
      <p>To make dog-friendly wine country travel easy, reliable, and genuinely fun — for you and your dog.</p>
      <p><a href="/directory">Browse the directory</a> or <a href="/blog">read our guides</a>.</p>
    </main>`,

  "/map": `
    <main>
      <h1>Dog-Friendly Winery Map — Napa Valley &amp; Sonoma County</h1>
      <p>Explore an interactive map of verified dog-friendly wineries across Napa Valley and Sonoma County. Click any pin to see winery details, hours, and directions.</p>
      <p>Use the map to plan your route, find wineries near each other, and discover hidden gems in each wine country region.</p>
      <p><a href="/directory">Browse the full directory</a> for filters and detailed listings.</p>
    </main>`,

  "/blog": `
    <main>
      <h1>Wine Country with Your Dog — Tips &amp; Guides</h1>
      <p>Guides, tips, and stories for dog owners exploring Napa Valley and Sonoma County wine country. Everything from what to pack to how to plan a full dog-friendly weekend.</p>
      <nav aria-label="Article categories">
        <ul>
          <li>Tips &amp; Guides</li>
          <li>Planning</li>
          <li>Gear &amp; Accessories</li>
          <li>Napa Valley</li>
          <li>Sonoma County</li>
          <li>Stories</li>
        </ul>
      </nav>
      <section>
        <h2>Recent Articles</h2>
        <ul>
          ${ARTICLE_META.map((a) => `<li><a href="/blog/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a> — ${escapeHtml(a.excerpt)}</li>`).join("\n          ")}
        </ul>
      </section>
    </main>`,

  "/shop": `
    <main>
      <h1>Shop — Wine Dogs Books &amp; Gifts for Dog Lovers</h1>
      <p>Curated wine country books and gifts for dog lovers, including the Wine Dogs California series — stunning hardcovers celebrating winery dogs across Napa Valley and Sonoma County.</p>
      <p>These books are published by Wine Dogs, an independent publisher dedicated to celebrating the dogs of wine country worldwide.</p>
      <p><a href="/directory">Browse the winery directory</a> or <a href="/blog">read our guides</a>.</p>
    </main>`,

  "/terms": `
    <main>
      <h1>Terms of Use — Pups &amp; Vines</h1>
      <p>Terms of Use for pupsandvines.com. By accessing or using this website, you agree to be bound by these Terms of Use.</p>
    </main>`,

  "/privacy": `
    <main>
      <h1>Privacy Policy — Pups &amp; Vines</h1>
      <p>Privacy Policy for pupsandvines.com. This policy describes how Pups &amp; Vines collects, uses, and shares information about you when you visit the website.</p>
    </main>`,
};

interface StaticSeoPartial {
  title: string;
  description: string;
  canonical: string;
  ogUrl: string;
  ogType: string;
  robots: string;
  ogImage?: string;
}

const STATIC_SEO: Record<string, StaticSeoPartial> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical: BASE_URL,
    ogUrl: BASE_URL,
    ogType: "website",
    robots: "index, follow",
  },
  "/directory": {
    title: `Browse Dog-Friendly Wineries — Napa Valley & Sonoma County | ${SITE_NAME}`,
    description: "Browse our full directory of verified dog-friendly wineries in Napa Valley and Sonoma County. Filter by region, venue type, and dog-friendly amenities.",
    canonical: `${BASE_URL}/directory`,
    ogUrl: `${BASE_URL}/directory`,
    ogType: "website",
    robots: "index, follow",
  },
  "/about": {
    title: `About Pups & Vines | ${SITE_NAME}`,
    description: "Learn about Pups & Vines — your guide to dog-friendly wine tasting in Napa Valley and Sonoma County. Every winery listing is personally verified.",
    canonical: `${BASE_URL}/about`,
    ogUrl: `${BASE_URL}/about`,
    ogType: "website",
    robots: "index, follow",
  },
  "/map": {
    title: `Winery Map — Find Dog-Friendly Wineries Near You | ${SITE_NAME}`,
    description: "Explore an interactive map of verified dog-friendly wineries across Napa Valley and Sonoma County. Click any pin to see details and directions.",
    canonical: `${BASE_URL}/map`,
    ogUrl: `${BASE_URL}/map`,
    ogType: "website",
    robots: "index, follow",
  },
  "/blog": {
    title: `Wine Country with Your Dog — Tips & Guides | ${SITE_NAME}`,
    description: "Guides, tips, and stories for dog owners exploring Napa Valley and Sonoma County wine country. Etiquette, gear, planning, and more.",
    canonical: `${BASE_URL}/blog`,
    ogUrl: `${BASE_URL}/blog`,
    ogType: "website",
    robots: "index, follow",
  },
  "/shop": {
    title: `Shop — Wine Dogs Books & Gifts for Dog Lovers | ${SITE_NAME}`,
    description: "Shop curated wine country books and gifts for dog lovers, including the Wine Dogs California series — stunning hardcovers celebrating winery dogs across Napa and Sonoma.",
    canonical: `${BASE_URL}/shop`,
    ogUrl: `${BASE_URL}/shop`,
    ogType: "website",
    robots: "index, follow",
  },
  "/terms": {
    title: `Terms of Use | ${SITE_NAME}`,
    description: "Terms of Use for Pups & Vines, the dog-friendly winery directory for Napa Valley and Sonoma County.",
    canonical: `${BASE_URL}/terms`,
    ogUrl: `${BASE_URL}/terms`,
    ogType: "website",
    robots: "noindex, nofollow",
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: "Privacy Policy for Pups & Vines, the dog-friendly winery directory for Napa Valley and Sonoma County.",
    canonical: `${BASE_URL}/privacy`,
    ogUrl: `${BASE_URL}/privacy`,
    ogType: "website",
    robots: "noindex, nofollow",
  },
};

function buildHeadTags(seo: SeoData): string {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const ogTitle = escapeHtml(seo.ogTitle || seo.title);
  const ogDescription = escapeHtml(seo.ogDescription || seo.description);

  return `<title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${seo.robots}" />
    <link rel="canonical" href="${seo.canonical}" />
    <meta property="og:type" content="${seo.ogType}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:url" content="${seo.ogUrl}" />
    <meta property="og:image" content="${seo.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${seo.ogImage}" />`;
}

export function injectSeoIntoHtml(html: string, seo: SeoData): string {
  const headTags = buildHeadTags(seo);

  let result = html
    .replace(/<title>[^<]*<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace("</head>", `  ${headTags}\n  </head>`);

  if (seo.bodyHtml) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${seo.bodyHtml}</div>`
    );
  }

  return result;
}

export function getSeoForStaticRoute(urlPath: string): SeoData | null {
  const partial = STATIC_SEO[urlPath];
  if (!partial) return null;

  return {
    title: partial.title,
    description: partial.description,
    canonical: partial.canonical,
    ogTitle: partial.title,
    ogDescription: partial.description,
    ogUrl: partial.ogUrl,
    ogImage: partial.ogImage ?? DEFAULT_OG_IMAGE,
    ogType: partial.ogType,
    robots: partial.robots,
    bodyHtml: STATIC_BODY_HTML[urlPath],
  };
}

export function getSeoForBlogPost(slug: string): SeoData | null {
  const article = ARTICLE_META_MAP.get(slug);
  if (!article) return null;

  const title = `${article.title} | ${SITE_NAME}`;
  const ogImage = article.image;

  const bodyHtml = `
    <article>
      <header>
        <span>${escapeHtml(article.category)}</span>
        <h1>${escapeHtml(article.title)}</h1>
        <p><time datetime="${article.date}">${article.date}</time></p>
      </header>
      <p>${escapeHtml(article.excerpt)}</p>
      <nav>
        <a href="/blog">← Back to all articles</a>
      </nav>
    </article>`;

  return {
    title,
    description: article.excerpt,
    canonical: `${BASE_URL}/blog/${slug}`,
    ogTitle: title,
    ogDescription: article.excerpt,
    ogUrl: `${BASE_URL}/blog/${slug}`,
    ogImage,
    ogType: "article",
    robots: "index, follow",
    bodyHtml,
  };
}

export function getSeoForWinery(winery: {
  id: number;
  name: string;
  description: string;
  region: string;
  imageUrl: string | null;
}): SeoData {
  const shortDesc = winery.description.length > 155
    ? winery.description.slice(0, 152) + "..."
    : winery.description;

  const title = `${winery.name} — Dog-Friendly Winery in ${winery.region} | ${SITE_NAME}`;
  const description = `${winery.name} is a verified dog-friendly winery in ${winery.region}. ${shortDesc}`;
  const ogImage = winery.imageUrl ?? DEFAULT_OG_IMAGE;

  const bodyHtml = `
    <main>
      <article>
        <header>
          <span>${escapeHtml(winery.region)}</span>
          <span>Verified Dog-Friendly</span>
          <h1>${escapeHtml(winery.name)}</h1>
          <p>Dog-friendly winery in ${escapeHtml(winery.region)}</p>
        </header>
        <section>
          <h2>About ${escapeHtml(winery.name)}</h2>
          <p>${escapeHtml(winery.description)}</p>
        </section>
        <nav>
          <a href="/directory">← Back to directory</a>
        </nav>
      </article>
    </main>`;

  return {
    title,
    description,
    canonical: `${BASE_URL}/winery/${winery.id}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: `${BASE_URL}/winery/${winery.id}`,
    ogImage,
    ogType: "website",
    robots: "index, follow",
    bodyHtml,
  };
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE };
