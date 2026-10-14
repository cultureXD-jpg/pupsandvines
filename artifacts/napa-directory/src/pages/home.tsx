import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PawPrint, Map, ArrowRight, Heart, ShieldCheck, MapPin, Wine, Instagram } from "lucide-react";
import { useListWineries } from "@workspace/api-client-react";
import { WineryCard } from "@/components/winery-card";
import { GoogleAd } from "@/components/google-ad";
import { PageMeta } from "@/components/page-meta";

const REGION_SUGGESTIONS = [
  { label: "Calistoga", aliases: ["calistoga"] },
  { label: "Rutherford", aliases: ["rutherford"] },
  { label: "Yountville", aliases: ["yountville"] },
  { label: "St. Helena", aliases: ["st helena", "st. helena", "saint helena", "saint helana", "st helana"] },
  { label: "Napa Valley", aliases: ["napa valley", "napa"] },
  { label: "Los Carneros", aliases: ["los carneros", "carneros"] },
  { label: "Sonoma County", aliases: ["sonoma county", "sonoma"] },
  { label: "Dry Creek Valley", aliases: ["dry creek valley", "dry creek"] },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[.\-']/g, "").replace(/\s+/g, " ").trim();
}

const HERO_IMAGES: { src: string; position?: string }[] = [
  // 1 wine — winery estate exterior
  { src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2000&auto=format&fit=crop" },
  // 2 dog — golden retriever on green grass
  { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2000&auto=format&fit=crop" },
  // 3 wine — friends toasting with red wine glasses outdoors
  { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000&auto=format&fit=crop" },
  // 4 dog — two dogs playing outdoors
  { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop" },
  // 5 wine — red wine being poured into a glass
  { src: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=2000&auto=format&fit=crop" },
  // 6 dog — dog portrait outdoors
  { src: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2000&auto=format&fit=crop" },
  // 7 scenic — hot air balloon over Napa Valley golden hills
  { src: "https://images.unsplash.com/photo-1471882181801-6e5da44feb5a?q=80&w=2000&auto=format&fit=crop" },
  // 8 dog — happy golden retriever lying on green lawn, tongue out
  { src: "https://images.unsplash.com/photo-1589756695365-4e0915b3a246?q=80&w=2000&auto=format&fit=crop" },
  // 9 wine — mountain vineyard landscape
  { src: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?q=80&w=2000&auto=format&fit=crop" },
  // 10 dog — happy dog in nature
  { src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2000&auto=format&fit=crop" },
];

const TYPEWRITER_PLACEHOLDERS = [
  "Try Calistoga...",
  "Try St. Helena...",
  "Try Yountville...",
  "Try Dry Creek Valley...",
  "Try Los Carneros...",
  "Try Sonoma County...",
];

function useTypewriter(items: string[], pause = 2400) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * items.length));
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const full = items[index];

  useEffect(() => {
    if (!deleting && displayed === full) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % items.length);
      return;
    }
    const speed = deleting ? 35 : 60;
    const t = setTimeout(() => {
      setDisplayed(deleting ? displayed.slice(0, -1) : full.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, full, items, pause]);

  return displayed;
}

export default function Home() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [heroIndex, setHeroIndex] = useState(() => Math.floor(Math.random() * HERO_IMAGES.length));
  const heroRef = useRef<HTMLElement>(null);
  const picksRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: wineries, isLoading } = useListWineries({ featured: true }, { query: { retry: 3, retryDelay: 2000 } });
  const { data: allWineries } = useListWineries({}, { query: { retry: 3, retryDelay: 2000 } });
  const typewriter = useTypewriter(TYPEWRITER_PLACEHOLDERS);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q) return [];
    const results: { label: string; type: "region" | "winery" }[] = [];

    REGION_SUGGESTIONS.forEach(({ label, aliases }) => {
      if (aliases.some((a) => a.startsWith(q) || normalize(label).startsWith(q))) {
        results.push({ label, type: "region" });
      }
    });

    (allWineries ?? []).forEach((w) => {
      if (normalize(w.name).includes(q)) {
        results.push({ label: w.name, type: "winery" });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, allWineries]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    navigate(`/directory${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const highlights = [
    { id: "indoor", icon: ShieldCheck, label: "Tasting Room Access", desc: "Some wineries let dogs right inside" },
    { id: "offleash", icon: Heart, label: "Off-Leash Parks", desc: "Like Tamber Bey's dedicated dog park" },
    { id: "events", icon: PawPrint, label: "Dog-Dedicated Events", desc: "Yappy Hours, Pup Menus & more" },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageMeta
        canonical="/"
        description="Discover verified dog-friendly wineries across Napa Valley and Sonoma County. Every listing is pup-approved — tasting rooms, patios, and vineyards that welcome your dog."
      />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative w-full h-[600px] flex items-center justify-center">

        {/* Crossfading background images with Ken Burns */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence>
            {HERO_IMAGES.map((img, i) =>
              i === heroIndex ? (
                <motion.div
                  key={img.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <motion.img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ willChange: "transform", objectPosition: img.position ?? "center" }}
                    animate={{ scale: [1, 1.07] }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/90" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-bold tracking-wide"
          >
            <PawPrint className="w-4 h-4" /> Napa Valley & Sonoma County
          </motion.div>

          {/* Staggered headline words */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            {["Bring", "Your", "Dog"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.12 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="text-primary-foreground/90 italic font-medium"
            >
              to Wine Country.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-sans font-light"
          >
            Every winery listed here is verified dog-friendly. Know exactly where your pup is
            welcome — tasting room, patio, vineyard, or all three.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="relative w-full max-w-md" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setShowSuggestions(true)}
                placeholder={searchQuery ? "" : typewriter}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur shadow-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                  >
                    {suggestions.map((s) => (
                      <li key={s.label}>
                        <button
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearchQuery(s.label);
                            setShowSuggestions(false);
                            const params = new URLSearchParams({ search: s.label });
                            navigate(`/directory?${params.toString()}`);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-50 transition-colors text-sm"
                        >
                          {s.type === "region"
                            ? <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                            : <Wine className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          }
                          <span className="text-foreground">{s.label}</span>
                          <span className="ml-auto text-xs text-muted-foreground capitalize">{s.type}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={handleSearch}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
            >
              Find Dog-Friendly Wineries
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
          onClick={() => {
            const target = picksRef.current;
            if (target) {
              const navHeight = 80;
              window.scrollTo({ top: target.offsetTop - navHeight, behavior: "smooth" });
            }
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── What Makes a Winery Dog-Friendly ── */}
      <section className="py-12 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6"
          >
            What Makes a Winery Dog-Friendly?
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} href="/directory">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 * i, duration: 0.45 }}
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-orange-200 bg-orange-50 text-orange-700 cursor-pointer"
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs opacity-75">{item.desc}</div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Wineries ── */}
      <section ref={picksRef} className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Top Dog-Friendly Picks
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                These standout wineries go the extra mile for your four-legged travel companion.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Link
                href="/directory"
                className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(wineries?.slice(0, 3) ?? []).map((winery, i) => (
                <motion.div
                  key={winery.id}
                  className="h-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <WineryCard winery={winery} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-bold rounded-xl border border-border"
            >
              View All Wineries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Know Before You Go ── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Know Before You Go
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground mb-12"
          >
            We verify the dog policy at every winery so you never show up and get turned away.
            No surprises — just great wine and happy dogs.
          </motion.p>

          <div className="space-y-8">
            {[
              {
                icon: Map,
                color: "bg-primary/10",
                iconColor: "text-primary",
                title: "Filter by Region",
                desc: "Napa Valley, Sonoma, Calistoga, Yountville, Dry Creek Valley, and more.",
              },
              {
                icon: PawPrint,
                color: "bg-accent/10",
                iconColor: "text-accent",
                title: "Verified Dog Policies",
                desc: "Each listing specifies whether dogs are allowed in the tasting room, patio only, or have a full off-leash area.",
              },
              {
                icon: Heart,
                color: "bg-orange-100",
                iconColor: "text-orange-600",
                title: "Winery Dogs & Events",
                desc: "Discover wineries with resident dogs, Yappy Hours, Pup Menus, and dog-dedicated events throughout the year.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-14"
          >
            <Link href="/directory">
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:text-accent transition-colors cursor-pointer"
              >
                Browse all dog-friendly wineries <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Subtle in-content ad — sits quietly below the CTA */}
          <div className="mt-10 max-w-2xl mx-auto">
            <GoogleAd />
          </div>
        </div>
      </section>

      {/* ── Instagram ── */}
      <section className="py-20 bg-secondary/30 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full text-white text-sm font-bold">
              <Instagram className="w-4 h-4" />
              Follow Along
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              @pupsandvines
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base">
              Tag your visit with <span className="font-semibold text-foreground">#PupsAndVines</span> and follow us for new dog-friendly winery discoveries, travel tips, and tail-wagging adventures in wine country.
            </p>
            <a
              href="https://www.instagram.com/pupsandvines"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition-all"
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </a>
          </motion.div>

          {/* Decorative photo grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 rounded-2xl overflow-hidden"
          >
            {[
              "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/pupsandvines"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group block"
              >
                <img
                  src={src}
                  alt="Instagram photo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
