import { useState } from "react";
import { Star, ExternalLink, PawPrint, MapPin } from "lucide-react";
import { Link } from "wouter";
import { useListWineries } from "@workspace/api-client-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { TRIPADVISOR_DATA } from "./tripadvisor-data";

const YELP_RED = "#d32323";
const TA_GREEN = "#00AA6C";

interface YelpPopoverProps {
  yelpUrl: string;
  rating: number;
  reviewCount?: number | null;
  slug: string;
  size?: "sm" | "lg";
}

function PlatformStars({
  rating,
  size,
  color,
}: {
  rating: number;
  size: "sm" | "lg";
  color: string;
}) {
  const cls = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5 flex-shrink-0">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.floor(rating);
        const half = !filled && n - 0.5 <= rating;
        return (
          <span key={n} className="relative flex-shrink-0">
            <Star
              className={cls}
              style={{ fill: "white", color, strokeWidth: 1.5 }}
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star className={cls} style={{ fill: color, color }} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function PlatformBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-[10px] font-bold rounded px-1 leading-tight opacity-90 ml-0.5 flex-shrink-0"
      style={{ color, border: `1px solid ${color}` }}
    >
      {label}
    </span>
  );
}

function RatingRow({
  rating,
  reviewCount,
  color,
  badge,
  size,
  onOpen,
}: {
  rating: number;
  reviewCount?: number | null;
  color: string;
  badge: string;
  size: "sm" | "lg";
  onOpen: () => void;
}) {
  const textClass = size === "lg" ? "text-base" : "text-sm";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onOpen();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 ${textClass} font-semibold rounded-lg px-2 py-0.5 -mx-2 transition-opacity hover:opacity-80 cursor-pointer`}
    >
      <PlatformStars rating={rating} size={size} color={color} />
      <span className="text-foreground">{rating}</span>
      {reviewCount != null && (
        <span className="font-normal text-muted-foreground text-xs">
          ({reviewCount.toLocaleString()})
        </span>
      )}
      <PlatformBadge label={badge} color={color} />
    </button>
  );
}

function LinkRow({
  color,
  badge,
  size,
  onOpen,
}: {
  color: string;
  badge: string;
  size: "sm" | "lg";
  onOpen: () => void;
}) {
  const textClass = size === "lg" ? "text-base" : "text-sm";
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onOpen();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 ${textClass} font-semibold rounded-lg px-2 py-0.5 -mx-2 transition-opacity hover:opacity-80 cursor-pointer`}
    >
      <span className="font-normal text-muted-foreground">Read reviews on</span>
      <PlatformBadge label={badge} color={color} />
    </button>
  );
}

function distanceMiles(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.latitude)) * Math.cos(toRad(b.latitude)) * Math.sin(dLng / 2) ** 2;
  return 3959 * 2 * Math.asin(Math.sqrt(h));
}

function trackOutbound(platform: string, slug: string) {
  const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (g) g("event", "review_click", { platform, winery: slug });
}

function PlatformPanel({
  label,
  color,
  rating,
  reviewCount,
  url,
  slug,
}: {
  label: string;
  color: string;
  rating?: number | null;
  reviewCount?: number | null;
  url: string;
  slug: string;
}) {
  return (
    <div className="flex-1 rounded-xl border border-border p-3 flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>{label}</span>
      {rating != null ? (
        <>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-semibold text-foreground">{rating}</span>
            <PlatformStars rating={rating} size="sm" color={color} />
          </div>
          {reviewCount != null && (
            <span className="text-xs text-muted-foreground">{reviewCount.toLocaleString()} reviews</span>
          )}
        </>
      ) : (
        <span className="text-xs text-muted-foreground">No rating yet</span>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutbound(label, slug)}
        className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        Read reviews <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

function QuickLook({
  open,
  onOpenChange,
  slug,
  yelpUrl,
  rating,
  reviewCount,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  slug: string;
  yelpUrl: string;
  rating: number;
  reviewCount?: number | null;
}) {
  const { data: wineries } = useListWineries({});
  const taData = TRIPADVISOR_DATA[slug];
  const winery = wineries?.find((w) => w.slug === slug);
  const nearby =
    winery && wineries
      ? wineries
          .filter((w) => w.id !== winery.id && w.latitude && w.longitude)
          .map((w) => ({ w, d: distanceMiles(winery, w) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 3)
      : [];
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md w-[calc(100%-2rem)] rounded-2xl p-5 gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <DialogTitle className="font-serif text-xl pr-6">{winery?.name ?? "Reviews"}</DialogTitle>
          <DialogDescription className="text-xs mt-1">Ratings at a glance</DialogDescription>
        </div>

        <div className="flex gap-3">
          <PlatformPanel label="Yelp" color={YELP_RED} rating={rating} reviewCount={reviewCount} url={yelpUrl} slug={slug} />
          {taData && (
            <PlatformPanel label="Tripadvisor" color={TA_GREEN} rating={taData.rating} reviewCount={taData.reviewCount} url={taData.url} slug={slug} />
          )}
        </div>

        {winery?.dogPolicy && (
          <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 p-3">
            <div className="flex items-center gap-1.5 text-sm font-semibold mb-1">
              <PawPrint className="w-4 h-4 text-orange-600" /> Dog policy
            </div>
            <p className="text-sm text-muted-foreground leading-snug line-clamp-4">{winery.dogPolicy}</p>
          </div>
        )}

        {winery && (
          <div className="flex gap-2">
            <Link href={`/winery/${winery.id}`} onClick={close} className="flex-1 text-center text-sm font-semibold rounded-full bg-primary text-primary-foreground py-2 hover:opacity-90">
              View full profile
            </Link>
            <Link href="/map" onClick={close} className="flex-1 inline-flex items-center justify-center gap-1 text-sm font-semibold rounded-full border border-border py-2 hover:bg-muted">
              <MapPin className="w-4 h-4" /> See on map
            </Link>
          </div>
        )}

        {nearby.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-2">Dog-friendly wineries nearby</div>
            <div className="flex flex-col gap-2">
              {nearby.map(({ w, d }) => (
                <Link key={w.id} href={`/winery/${w.id}`} onClick={close} className="flex items-center gap-3 rounded-lg p-1.5 -mx-1.5 hover:bg-muted">
                  {w.imageUrl && <img src={w.imageUrl} alt="" loading="lazy" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{w.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {w.rating ? `★ ${w.rating} · ` : ""}{d < 0.1 ? "next door" : `${d.toFixed(1)} mi away`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function YelpPopover({
  yelpUrl,
  rating,
  reviewCount,
  slug,
  size = "sm",
}: YelpPopoverProps) {
  const taData = TRIPADVISOR_DATA[slug];
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);

  return (
    <div className="flex flex-col gap-0.5" onClick={(e) => e.stopPropagation()}>
      <QuickLook open={open} onOpenChange={setOpen} slug={slug} yelpUrl={yelpUrl} rating={rating} reviewCount={reviewCount} />
      <RatingRow
        rating={rating}
        reviewCount={reviewCount}
        onOpen={onOpen}
        color={YELP_RED}
        badge="yelp"
        size={size}
      />
      {taData && taData.rating == null && (
        <LinkRow onOpen={onOpen} color={TA_GREEN} badge="tripadvisor" size={size} />
      )}
      {taData && taData.rating != null && (
        <RatingRow
          rating={taData.rating}
          reviewCount={taData.reviewCount}
          onOpen={onOpen}
          color={TA_GREEN}
          badge="tripadvisor"
          size={size}
        />
      )}
    </div>
  );
}
