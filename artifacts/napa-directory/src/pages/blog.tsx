import { useState } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/data/articles";
import { GoogleAd } from "@/components/google-ad";
import { PageMeta } from "@/components/page-meta";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="w-full bg-background">
      <PageMeta
        title="Wine Country with Your Dog — Tips & Guides"
        description="Guides, tips, and stories for dog owners exploring Napa Valley and Sonoma County wine country. Etiquette, gear, planning, and more."
        canonical="/blog"
      />

      {/* Hero */}
      <div className="relative bg-primary py-20 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Tips & Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Wine Country with Your Dog
          </h1>
          <p className="text-lg text-white/80 font-light">
            Guides, tips, and stories for dog owners exploring Napa Valley and Sonoma County.
          </p>
        </div>
      </div>

      {/* Category filter toolbar */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Mobile: dropdown */}
          <div className="sm:hidden">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full border border-border rounded-full px-4 py-2 text-sm font-semibold bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {/* Desktop: pills */}
          <div className="hidden sm:flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No articles in this category yet.</p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <div className="mb-14">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Featured</h2>
                <Link href={`/blog/${featured.slug}`}>
                  <div className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col md:flex-row">
                    <div className="md:w-80 flex-shrink-0 overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-4">
                        {featured.category}
                      </span>
                      <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                        {featured.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{featured.date}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featured.readTime}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-primary text-sm font-semibold">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Rest of articles */}
            {rest.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">All Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {rest.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`}>
                      <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                        <div className="overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          <span className="inline-block bg-secondary text-foreground/70 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-3">
                            {article.category}
                          </span>
                          <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors flex-1">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </div>
                            <span className="flex items-center gap-1 text-primary text-xs font-semibold">
                              Read <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Ad slot */}
        <div className="py-10">
          <GoogleAd />
        </div>

      </div>
    </div>
  );
}
