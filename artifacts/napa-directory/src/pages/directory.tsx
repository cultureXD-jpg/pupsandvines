import { useState, useRef, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Filter, SlidersHorizontal, Search, PawPrint, MapPin, Wine, Heart, Grape, Building2 } from "lucide-react";
import { useListWineries, useListRegions } from "@workspace/api-client-react";
import { WineryCard } from "@/components/winery-card";
import { GoogleAd } from "@/components/google-ad";
import { useFavorites } from "@/hooks/use-favorites";
import { motion, AnimatePresence } from "framer-motion";
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

export default function Directory() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    region: searchParams.get("region") || "",
  });
  const [venueTypeFilter, setVenueTypeFilter] = useState("");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState("e.g. Jessup Cellars...");
  const searchRef = useRef<HTMLDivElement>(null);
  const { isFavorite, favoriteIds } = useFavorites();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: allWineries } = useListWineries({});

  useEffect(() => {
    if (allWineries && allWineries.length > 0) {
      const pick = allWineries[Math.floor(Math.random() * allWineries.length)];
      setSearchPlaceholder(`e.g. ${pick.name}...`);
    }
  }, [allWineries]);

  const suggestions = useMemo(() => {
    const q = normalize(filters.search);
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
  }, [filters.search, allWineries]);

  const { data: rawWineries, isLoading } = useListWineries({
    ...filters,
    dogFriendly: true,
  });
  const { data: regions } = useListRegions();

  const wineries = useMemo(() => {
    if (!rawWineries) return rawWineries;
    let results = [...rawWineries].sort((a, b) => a.name.localeCompare(b.name));
    if (venueTypeFilter) results = results.filter((w) => w.venueType === venueTypeFilter);
    if (showFavoritesOnly) results = results.filter((w) => favoriteIds.has(w.id));
    return results;
  }, [rawWineries, venueTypeFilter, showFavoritesOnly, favoriteIds]);

  const favoriteCount = useMemo(() => {
    if (!allWineries) return 0;
    return allWineries.filter((w) => favoriteIds.has(w.id)).length;
  }, [allWineries, favoriteIds]);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    window.history.replaceState({}, '', `${location}?${params.toString()}`);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length + (showFavoritesOnly ? 1 : 0) + (venueTypeFilter ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <PageMeta
        title="Browse Dog-Friendly Wineries — Napa Valley & Sonoma County"
        description="Browse our full directory of verified dog-friendly wineries in Napa Valley and Sonoma County. Filter by region, venue type, and dog-friendly amenities."
        canonical="/directory"
      />

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Dog-Friendly Wineries in Napa & Sonoma</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          We only list wineries that actually welcome dogs — not just tolerate them. Use the filters to narrow it down by region, or just start scrolling.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl border border-border shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-bold">Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
          </div>
          <button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="px-4 py-2 bg-secondary text-foreground font-bold rounded-lg text-sm"
          >
            {mobileFiltersOpen ? "Close" : "Open"}
          </button>
        </div>

        {/* Sidebar Filters */}
        <AnimatePresence>
          {(mobileFiltersOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:w-1/4 flex-shrink-0 space-y-8 lg:block overflow-hidden lg:overflow-visible"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-display font-bold">Filter</h2>
                  <button
                    onClick={() => { setFilters({ search: "", region: "" }); setShowFavoritesOnly(false); setVenueTypeFilter(""); }}
                    disabled={activeFiltersCount === 0}
                    className={`ml-auto text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                      activeFiltersCount > 0
                        ? "border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                        : "border-border text-muted-foreground opacity-40 cursor-not-allowed"
                    }`}
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2">Search by Name</label>
                  <div className="relative" ref={searchRef}>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => { updateFilter('search', e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder={searchPlaceholder}
                      className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <AnimatePresence>
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
                        >
                          {suggestions.map((s) => (
                            <li key={s.label}>
                              <button
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  if (s.type === "region") {
                                    updateFilter('search', '');
                                    updateFilter('region', s.label);
                                  } else {
                                    updateFilter('search', s.label);
                                  }
                                  setShowSuggestions(false);
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
                </div>

                {/* Favorites */}
                <div className="mb-6">
                  <button
                    onClick={() => {
                      const next = !showFavoritesOnly;
                      setShowFavoritesOnly(next);
                      if (next) updateFilter('region', '');
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      showFavoritesOnly
                        ? "bg-red-50 border-red-300 text-red-600"
                        : "bg-secondary border-border text-foreground hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-colors ${showFavoritesOnly ? "fill-red-500 text-red-500" : "fill-none"}`} />
                    My Favorites
                    {favoriteCount > 0 && (
                      <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-bold ${showFavoritesOnly ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        {favoriteCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Venue Type */}
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3">Venue Type</label>
                  <div className="space-y-1.5">
                    {[
                      { value: "", label: "All Types", icon: null },
                      { value: "Winery", label: "Winery", icon: Grape },
                      { value: "Tasting Room", label: "Tasting Room", icon: Wine },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setVenueTypeFilter(value)}
                        className={`flex items-center gap-2 w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors ${venueTypeFilter === value ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/80 hover:bg-secondary'}`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regions */}
                <div>
                  <label className="block text-sm font-bold mb-3">Region</label>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => updateFilter('region', '')}
                      className={`block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors ${filters.region === '' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/80 hover:bg-secondary'}`}
                    >
                      All Regions
                    </button>
                    {(regions || ["Calistoga", "Dry Creek Valley", "Los Carneros", "Napa Valley", "Rutherford", "Sonoma County", "St. Helena", "Yountville"]).map((r) => (
                      <button
                        key={r}
                        onClick={() => updateFilter('region', r)}
                        className={`block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors ${filters.region === r ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/80 hover:bg-secondary'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </motion.aside>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : wineries?.length === 0 ? (
            <div className="bg-card border border-border border-dashed rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                {showFavoritesOnly
                  ? <Heart className="w-8 h-8 text-muted-foreground" />
                  : <PawPrint className="w-8 h-8 text-muted-foreground" />
                }
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                {showFavoritesOnly ? "No favorites yet" : "No wineries found"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {showFavoritesOnly
                  ? "Heart any winery to save it here. Your favorites stay on this device."
                  : "Try adjusting your filters or searching a different name."
                }
              </p>
              <button
                onClick={() => { setFilters({ search: "", region: "" }); setShowFavoritesOnly(false); }}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold shadow-md hover:bg-primary/90 transition-colors"
              >
                {showFavoritesOnly ? "Browse All Wineries" : "Clear Filters"}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
                <p>Showing <strong className="text-foreground">{wineries?.length || 0}</strong> verified dog-friendly wineries</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {wineries?.map((winery, index) => (
                  <div key={winery.id} className="contents">
                    <WineryCard winery={winery} />
                    {(index + 1) % 6 === 0 && (
                      <div className="col-span-1 md:col-span-2" style={{ maxHeight: "144px", overflow: "hidden" }}>
                        <GoogleAd />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
