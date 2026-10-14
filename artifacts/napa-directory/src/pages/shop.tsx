import { ExternalLink, ShoppingBag, Star } from "lucide-react";
import { PageMeta } from "@/components/page-meta";

const FEATURED = {
  title: "Wine Dogs California 6",
  price: "$60.00",
  image: "https://winedogs.com/wp-content/uploads/2025/08/01-CA6-Cover-V1-325x460.jpg",
  url: "https://winedogs.com/product/wine-dogs-california-6/",
  description:
    "The latest California edition — a stunning hardcover collection of winery dogs photographed across the Golden State's most celebrated wine regions, including Napa Valley and Sonoma County.",
  badge: "Our Pick",
};

const BOOKS = [
  {
    title: "Wine Dogs California 5",
    price: "$55.00",
    image: "https://winedogs.com/wp-content/uploads/2023/02/01-CA5-Cover-325x460.jpg",
    url: "https://winedogs.com/product/wine-dogs-california-5/",
    outOfStock: true,
  },
  {
    title: "Wine Dogs Australia 6",
    price: "$50.00",
    image: "https://winedogs.com/wp-content/uploads/2024/10/01-AUS6-Cover-V2-325x460.jpg",
    url: "https://winedogs.com/product/wine-dogs-australia-6/",
  },
  {
    title: "Wine Dogs Oregon",
    price: "$45.00",
    image: "https://winedogs.com/wp-content/uploads/2018/06/WDOR-Cover-325x460.jpg",
    url: "https://winedogs.com/product/wine-dogs-oregon/",
  },
];

export default function Shop() {
  return (
    <div className="w-full bg-background">
      <PageMeta
        title="Shop — Wine Dogs Books & Gifts for Dog Lovers"
        description="Shop curated wine country books and gifts for dog lovers, including the Wine Dogs California series — stunning hardcovers celebrating winery dogs across Napa Valley and Sonoma County."
        canonical="/shop"
      />

      {/* Hero */}
      <div className="relative bg-primary py-20 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <ShoppingBag className="w-3.5 h-3.5" />
            Curated Picks
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Shop
          </h1>
          <p className="text-lg text-white/80 font-light">
            Gifts for the dog lover, the wine lover, or the very lucky dog who is both.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Partner notice */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-14 text-sm text-amber-800">
          <Star className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
          <p>
            These books are published by <strong>Wine Dogs</strong> — an independent publisher dedicated to celebrating the dogs of wine country worldwide. Clicking "Buy Now" will take you to their site to complete your purchase.
          </p>
        </div>

        {/* Featured book */}
        <div className="mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Staff Pick</h2>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-72 flex-shrink-0 bg-secondary/30 flex items-center justify-center p-8">
              <img
                src={FEATURED.image}
                alt={FEATURED.title}
                className="h-72 w-auto object-contain shadow-lg rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-4">
                {FEATURED.badge}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
                {FEATURED.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {FEATURED.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-foreground">{FEATURED.price}</span>
                <a
                  href={FEATURED.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Buy Now <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* More books */}
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">More Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BOOKS.map((book) => (
              <div key={book.title} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="bg-secondary/30 flex items-center justify-center p-6">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-52 w-auto object-contain shadow rounded-lg"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base text-foreground mb-1 flex-1">
                    {book.title}
                  </h3>
                  {book.outOfStock && (
                    <span className="text-xs text-muted-foreground bg-secondary rounded-md px-2 py-0.5 w-fit mb-2">Out of stock</span>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-black text-foreground">{book.price}</span>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl hover:bg-foreground/80 transition-colors"
                    >
                      {book.outOfStock ? "View" : "Buy"} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse all CTA */}
        <div className="text-center bg-secondary/40 rounded-3xl py-12 px-6">
          <p className="text-muted-foreground text-sm mb-4">Looking for calendars, greeting cards, and more?</p>
          <a
            href="https://winedogs.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground text-sm font-bold rounded-xl hover:bg-foreground hover:text-background transition-all"
          >
            Browse everything on Wine Dogs <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
