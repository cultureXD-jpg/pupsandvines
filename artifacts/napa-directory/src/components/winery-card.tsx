import { Link } from "wouter";
import { Star, MapPin, PawPrint, Clock, Heart, ChevronLeft, ChevronRight, Camera, Wine, Building2, Grape } from "lucide-react";
import type { Winery } from "@workspace/api-client-react";
import { YelpPopover } from "./yelp-popover";
import { useFavorites } from "../hooks/use-favorites";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useCallback, useRef } from "react";
import { SmartImage } from "./smart-image";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getDogPolicyBadge(winery: Winery): { label: string; color: string } {
  const policy = (winery.dogPolicy || "") + " " + (winery.amenities || []).join(" ");
  const lower = policy.toLowerCase();
  if (lower.includes("off-leash") || lower.includes("off leash")) {
    return { label: "Off-Leash Park", color: "bg-green-100 text-green-800 border-green-200" };
  }
  const outdoorOnly = /not (allowed )?(inside|indoors|in the)|outdoor (spaces |areas )?only|outdoors only|only service animals/.test(lower);
  if (!outdoorOnly && (lower.includes("indoors") || lower.includes("tasting room") || lower.includes("inside"))) {
    return { label: "Dogs Inside", color: "bg-blue-100 text-blue-800 border-blue-200" };
  }
  if (lower.includes("pup menu") || lower.includes("yappy") || lower.includes("events")) {
    return { label: "Dog Events", color: "bg-purple-100 text-purple-800 border-purple-200" };
  }
  return { label: "Dogs Welcome", color: "bg-orange-100 text-orange-800 border-orange-200" };
}

function getVenueTypeBadge(venueType: string | null | undefined) {
  switch (venueType) {
    case "Winery":
      return { label: "Winery", icon: Grape, color: "bg-emerald-50 text-emerald-800 border-emerald-200" };
    case "Tasting Room":
      return { label: "Tasting Room", icon: Wine, color: "bg-sky-50 text-sky-800 border-sky-200" };
    default:
      return null;
  }
}

const regionColors: Record<string, string> = {
  "Calistoga": "bg-amber-50 text-amber-700",
  "Yountville": "bg-rose-50 text-rose-700",
  "St. Helena": "bg-violet-50 text-violet-700",
  "Napa Valley": "bg-sky-50 text-sky-700",
  "Los Carneros": "bg-teal-50 text-teal-700",
  "Sonoma County": "bg-lime-50 text-lime-700",
  "Dry Creek Valley": "bg-orange-50 text-orange-700",
};

interface PhotoGalleryProps {
  images: string[];
  name: string;
}

function PhotoGallery({ images: allImages, name }: PhotoGalleryProps) {
  const [broken, setBroken] = useState<string[]>([]);
  const images = allImages.filter((src) => !broken.includes(src));
  const markBroken = useCallback((src: string) => {
    setBroken((b) => (b.includes(src) ? b : [...b, src]));
  }, []);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: 1 | -1, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(prev => (prev + dir + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setCurrent(prev => (prev + (diff > 0 ? 1 : -1) + images.length) % images.length);
    }
    touchStartX.current = null;
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images — preload next/prev */}
      {images.map((src, i) => (
        <SmartImage
          key={src}
          src={src}
          alt={i === 0 ? name : `${name} — photo ${i + 1}`}
          onBroken={markBroken}
          className={cn(
            "transition-opacity duration-500",
            i === (current % images.length) ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        />
      ))}

      {/* Navigation arrows — only on hover, only when multiple photos */}
      {images.length > 1 && hovered && (
        <>
          <button
            onClick={(e) => go(-1, e)}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800 transition-all focus:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => go(1, e)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md text-gray-800 transition-all focus:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Photo count badge — bottom right */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
          <Camera className="w-3 h-3" />
          {(current % images.length) + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export function WineryCard({ winery, className }: { winery: Winery; className?: string }) {
  const dogBadge = getDogPolicyBadge(winery);
  const regionColor = regionColors[winery.region] || "bg-secondary text-secondary-foreground";
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(winery.id);

  const gallery = (winery.galleryImages && winery.galleryImages.length > 0)
    ? winery.galleryImages
    : winery.imageUrl
      ? [winery.imageUrl]
      : [];

  return (
    <Link
      href={`/winery/${winery.id}`}
      className={cn(
        "group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm",
        "hover:shadow-xl hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      {/* Photo header */}
      <div className="relative h-52 flex-shrink-0 bg-gray-100 overflow-hidden">
        {gallery.length > 0 ? (
          <PhotoGallery images={gallery} name={winery.name} />
        ) : (
          <div className={cn("w-full h-full", regionColor.split(" ")[0])} />
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

        {/* Tier badge */}
        {(winery.listingTier === "featured" || winery.listingTier === "premium") && (
          <div className="absolute top-3 left-3 z-20">
            <span className={cn(
              "px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm",
              winery.listingTier === "featured"
                ? "bg-accent text-accent-foreground"
                : "bg-white/95 text-primary"
            )}>
              {winery.listingTier === "featured" ? "Featured" : "Premium"}
            </span>
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(winery.id); }}
          aria-label={favorited ? "Remove from favorites" : "Save"}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-all"
        >
          <Heart className={cn("w-4 h-4 transition-colors", favorited ? "fill-red-500 text-red-500" : "fill-none text-gray-500")} />
        </button>

        {/* Region label overlaid at bottom */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="text-white/90 text-xs font-semibold drop-shadow">
            {winery.region}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating row */}
        {winery.rating && (
          <div className="mb-2" onClick={(e) => e.stopPropagation()}>
            {winery.yelpUrl ? (
              <YelpPopover
                yelpUrl={winery.yelpUrl}
                rating={winery.rating}
                reviewCount={winery.reviewCount}
                slug={winery.slug}
                size="sm"
              />
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Star className="w-4 h-4 fill-accent text-accent" />
                {winery.rating}
                {winery.reviewCount && (
                  <span className="font-normal text-muted-foreground text-xs">({winery.reviewCount})</span>
                )}
              </span>
            )}
          </div>
        )}

        {/* Name */}
        <h3 className="font-display text-2xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {winery.name}
        </h3>

        {/* Venue type badge */}
        {(() => {
          const badge = getVenueTypeBadge(winery.venueType);
          if (!badge) return null;
          const Icon = badge.icon;
          return (
            <span className={`inline-flex items-center gap-1 self-start px-2.5 py-0.5 text-xs font-semibold rounded-full border mb-3 ${badge.color}`}>
              <Icon className="w-3 h-3" />
              {badge.label}
            </span>
          );
        })()}

        {/* Description / dog policy */}
        {winery.dogPolicy && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-grow">
            {winery.dogPolicy}
          </p>
        )}

        {/* Amenity chips */}
        {winery.amenities && winery.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {winery.amenities.slice(0, 3).map((a) => (
              <span key={a} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md font-medium">
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between">
          {winery.hours ? (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3 flex-shrink-0" />
              {winery.hours}
            </span>
          ) : <span />}
          <span className="text-xs font-semibold text-primary group-hover:text-accent transition-colors">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
