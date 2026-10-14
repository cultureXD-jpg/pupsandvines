import { Link, useParams } from "wouter";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getArticle, articles } from "@/data/articles";
import { PageMeta } from "@/components/page-meta";

const BASE_URL = "https://pupsandvines.com";

function parseDateToISO(dateStr: string): string {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toISOString().split("T")[0];
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <PageMeta title="Article Not Found" noindex />
        <h1 className="font-display font-bold text-3xl mb-4">Article not found</h1>
        <Link href="/blog" className="text-primary font-semibold hover:underline">
          ← Back to all articles
        </Link>
      </div>
    );
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const ogImage = article.image.startsWith("http")
    ? article.image
    : `${BASE_URL}${article.image}`;

  const dateISO = parseDateToISO(article.date);
  const postUrl = `${BASE_URL}/blog/${article.slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": ogImage,
    "datePublished": dateISO,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pups & Vines",
      "url": BASE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": postUrl },
    ],
  };

  return (
    <div className="w-full bg-background">
      <PageMeta
        title={article.title}
        description={article.excerpt}
        canonical={`/blog/${article.slug}`}
        ogImage={ogImage}
        ogType="article"
        jsonLd={[blogPostingSchema, breadcrumbSchema]}
      />

      {/* Hero image */}
      <div className="w-full h-64 md:h-96 overflow-hidden relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-3xl mx-auto">
          <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="font-display font-bold text-2xl md:text-4xl text-white leading-snug">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
          <time dateTime={dateISO}>{article.date}</time>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Body */}
        <article
          className="prose prose-stone prose-lg max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Back to directory CTA */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-3xl p-8 text-center">
          <p className="font-display font-bold text-xl text-foreground mb-2">Ready to find a winery?</p>
          <p className="text-muted-foreground text-sm mb-6">Browse our verified directory of dog-friendly wineries across Napa Valley and Sonoma County.</p>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Browse the Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`}>
                <div className="group flex items-start gap-3 p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0 group-hover:text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Previous</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{prev.title}</p>
                  </div>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`}>
                <div className="group flex items-start gap-3 p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer text-right justify-end">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Next</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0 group-hover:text-primary" />
                </div>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
        </div>

      </div>
    </div>
  );
}
