import { useParams, Link } from "wouter";
import { MapPin, Globe, Phone, Clock, Star, PawPrint, CheckCircle2, Navigation, Heart, ShieldCheck, X, ChevronLeft, ChevronRight, Wine, Building2, Grape } from "lucide-react";
import { YelpPopover } from "@/components/yelp-popover";
import { useGetWinery } from "@workspace/api-client-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleAd } from "@/components/google-ad";
import { PageMeta } from "@/components/page-meta";

function PhotoLightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const go = useCallback((dir: 1 | -1) => setIdx(p => (p + dir + images.length) % images.length), [images.length]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [go, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10 focus:outline-none">
        <X className="w-5 h-5" />
      </button>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">{idx + 1} / {images.length}</div>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors focus:outline-none">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-10 transition-colors focus:outline-none">
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
      <img src={images[idx]} alt={`Photo ${idx + 1}`} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
          {images.map((src, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${i === idx ? "border-white" : "border-transparent opacity-60 hover:opacity-80"}`}>
              <img src={src} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function InlineSlideshow({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrent(p => (p + dir + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  if (!images.length) return null;

  return (
    <>
      {lightboxIdx !== null && (
        <PhotoLightbox images={images} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}

      <div
        className="group relative w-full rounded-2xl overflow-hidden bg-gray-100"
        style={{ height: 340 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? name : `${name} — photo ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 cursor-zoom-in ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => setLightboxIdx(current)}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ))}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />

        {/* Prev / Next arrows — always visible on mobile, fade in on hover on desktop */}
        {images.length > 1 && (
          <>
            <button onClick={(e) => go(-1, e)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={(e) => go(1, e)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none">
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot indicators + photo count */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-between px-4">
          {images.length > 1 ? (
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`rounded-full transition-all ${i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"}`} />
              ))}
            </div>
          ) : <span />}
          <button
            onClick={() => setLightboxIdx(current)}
            className="text-xs font-semibold text-white/90 hover:text-white transition-colors underline-offset-2 hover:underline"
          >
            View all {images.length} photos
          </button>
        </div>
      </div>
    </>
  );
}

export default function WineryProfile() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const { data: winery, isLoading, error } = useGetWinery(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showMapsChoice, setShowMapsChoice] = useState(false);
  const mapsPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMapsChoice) return;
    const handleClick = (e: MouseEvent) => {
      if (mapsPickerRef.current && !mapsPickerRef.current.contains(e.target as Node)) {
        setShowMapsChoice(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMapsChoice]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-muted-foreground font-display text-lg">Pouring details...</p>
      </div>
    );
  }

  if (error || !winery) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <PageMeta title="Winery Not Found" noindex />
        <h1 className="text-4xl font-display font-bold mb-4">Winery Not Found</h1>
        <p className="text-muted-foreground mb-8">The estate you're looking for may have been removed or the link is incorrect.</p>
        <Link href="/directory" className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Return to Directory</Link>
      </div>
    );
  }

  const gallery = (winery.galleryImages && winery.galleryImages.length > 0)
    ? winery.galleryImages
    : winery.imageUrl ? [winery.imageUrl] : [];

  const wineryDescription = winery.description.length > 160
    ? winery.description.slice(0, 157) + "..."
    : winery.description;

  const wineryOgImage = (winery.galleryImages && winery.galleryImages.length > 0)
    ? winery.galleryImages[0]
    : winery.imageUrl || undefined;

  const BASE_URL = "https://pupsandvines.com";
  const wineryUrl = `${BASE_URL}/winery/${winery.id}`;

  const winerySchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Winery",
    "name": winery.name,
    "description": winery.description,
    "url": winery.website || wineryUrl,
    "sameAs": wineryUrl,
    ...(wineryOgImage ? { "image": wineryOgImage } : {}),
    ...(winery.phone ? { "telephone": winery.phone } : {}),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": winery.address,
    },
    ...(winery.rating && winery.reviewCount
      ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": winery.rating,
            "reviewCount": winery.reviewCount,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Directory", "item": `${BASE_URL}/directory` },
      { "@type": "ListItem", "position": 3, "name": winery.name, "item": wineryUrl },
    ],
  };

  return (
    <div className="w-full bg-background pb-6 lg:pb-20">
      <PageMeta
        title={`${winery.name} — Dog-Friendly Winery in ${winery.region}`}
        description={`${winery.name} is a verified dog-friendly ${winery.venueType?.toLowerCase() ?? "winery"} in ${winery.region}. ${wineryDescription}`}
        canonical={`/winery/${winery.id}`}
        ogImage={wineryOgImage}
        ogType="website"
        jsonLd={[winerySchema, breadcrumbSchema]}
      />

      {/* Page top spacer */}
      <div className="h-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Main Content Column ── */}
          <div className="flex-1 space-y-8">

            {/* Header Card — contains name, badges, and the photo slideshow */}
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border relative">

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(winery.id)}
                aria-label={isFavorite(winery.id) ? "Remove from favorites" : "Save to favorites"}
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
              >
                <Heart className={`w-6 h-6 transition-colors ${isFavorite(winery.id) ? "fill-red-500 text-red-500" : "fill-none text-muted-foreground hover:text-red-400"}`} />
              </button>

              {/* Tier + region badges */}
              <div className="flex gap-2 mb-4">
                {winery.listingTier === "featured" && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded-full">Featured Partner</span>
                )}
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full">{winery.region}</span>
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{winery.name}</h1>

              {/* Rating + address */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                {winery.rating && (
                  winery.yelpUrl ? (
                    <YelpPopover yelpUrl={winery.yelpUrl} rating={winery.rating} reviewCount={winery.reviewCount} slug={winery.slug} size="lg" />
                  ) : (
                    <div className="flex items-center gap-1 font-bold text-foreground">
                      <Star className="w-5 h-5 fill-accent text-accent" />
                      <span className="text-lg">{winery.rating}</span>
                      <span className="font-normal text-muted-foreground ml-1">({winery.reviewCount} reviews)</span>
                    </div>
                  )
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{winery.address}</span>
              </div>

              {/* Dog-Friendly + organic + venue type badges */}
              <div className="flex flex-wrap gap-3 pb-6 border-b border-border">
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-800 rounded-xl font-bold border border-orange-200">
                  <PawPrint className="w-4 h-4" /> Verified Dog-Friendly
                </div>
                {winery.venueType === "Winery" && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl font-medium border border-emerald-200">
                    <Grape className="w-4 h-4" /> Winery
                  </div>
                )}
                {winery.venueType === "Tasting Room" && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-800 rounded-xl font-medium border border-sky-200">
                    <Wine className="w-4 h-4" /> Tasting Room
                  </div>
                )}
                {(winery.napaGreenCertified || winery.organicCertified) && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-xl font-medium border border-green-100">
                    <ShieldCheck className="w-4 h-4" /> {winery.napaGreenCertified ? "Napa Green Certified" : "Certified Organic"}
                  </div>
                )}
              </div>

              {/* ── PHOTO SLIDESHOW — right below the badges ── */}
              {gallery.length > 0 && (
                <div className="mt-6">
                  <InlineSlideshow images={gallery} name={winery.name} />
                </div>
              )}
            </div>

            {/* Dog Policy Card */}
            {winery.dogPolicy && (
              <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <PawPrint className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-orange-900">Dog Policy</h3>
                </div>
                <p className="text-orange-800 leading-relaxed text-base">{winery.dogPolicy}</p>
                <p className="text-orange-600 text-sm mt-4 italic">
                  Always call ahead to confirm current dog policies before your visit, as they can change seasonally.
                </p>
              </div>
            )}

            {/* About the Estate */}
            <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
              <h3 className="text-2xl font-display font-bold mb-4">About the Estate</h3>
              <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed">
                {winery.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {winery.amenities && winery.amenities.length > 0 && (
              <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
                <h3 className="text-xl font-display font-bold mb-6">Dog-Friendly Amenities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {winery.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Sidebar Column ── */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">

            {/* Plan Your Visit Info Box */}
            <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
              <h3 className="font-display font-bold text-xl mb-6">Plan Your Visit</h3>

              <div className="space-y-6">
                {winery.hours && (
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-bold text-foreground mb-1">Hours</span>
                      <span className="text-sm text-muted-foreground whitespace-pre-line">{winery.hours}</span>
                    </div>
                  </div>
                )}
                {winery.phone && (
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-bold text-foreground mb-1">Phone</span>
                      <a href={`tel:${winery.phone}`} className="text-sm text-primary hover:underline">{winery.phone}</a>
                    </div>
                  </div>
                )}
                {winery.website && (
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <span className="block text-sm font-bold text-foreground mb-1">Website</span>
                      <a href={winery.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block truncate w-48">
                        {winery.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border space-y-3">
                <div ref={mapsPickerRef} className="relative">
                  <button
                    onClick={() => setShowMapsChoice((v) => !v)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl font-bold shadow-md hover:bg-foreground/90 transition-colors"
                  >
                    <Navigation className="w-4 h-4" /> Get Directions
                  </button>

                  {showMapsChoice && (
                    <div className="absolute bottom-[calc(100%+10px)] left-0 right-0 bg-white border border-border rounded-2xl shadow-2xl shadow-black/15 overflow-hidden z-20">
                      <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />
                      <p className="text-xs text-center text-muted-foreground font-medium pt-3 pb-1 px-4">Open directions in…</p>
                      <div className="p-2 flex flex-col gap-1">
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(`${winery.name}, ${winery.address}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => setShowMapsChoice(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <div>
                            <div className="text-sm font-semibold text-foreground">Google Maps</div>
                            <div className="text-xs text-muted-foreground">Works on all devices</div>
                          </div>
                        </a>
                        <a href={`https://maps.apple.com/?q=${encodeURIComponent(`${winery.name}, ${winery.address}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => setShowMapsChoice(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-100 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
                          </svg>
                          <div>
                            <div className="text-sm font-semibold text-foreground">Apple Maps</div>
                            <div className="text-xs text-muted-foreground">Best on iPhone & Mac</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {(winery.bookingUrl || winery.website) && (
                  <a href={winery.bookingUrl || winery.website} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-foreground rounded-xl font-bold shadow-sm hover:bg-secondary/80 transition-colors">
                    Book Tasting
                  </a>
                )}
              </div>
            </div>

            {/* Mobile ad */}
            <div className="lg:hidden bg-card rounded-3xl border border-border shadow-sm p-4">
              <GoogleAd />
            </div>

            {/* Sidebar ad — desktop */}
            <GoogleAd desktopOnly className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
