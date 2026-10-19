import { Star } from "lucide-react";
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
  url,
  color,
  badge,
  size,
}: {
  rating: number;
  reviewCount?: number | null;
  url: string;
  color: string;
  badge: string;
  size: "sm" | "lg";
}) {
  const textClass = size === "lg" ? "text-base" : "text-sm";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
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
  url,
  color,
  badge,
  size,
}: {
  url: string;
  color: string;
  badge: string;
  size: "sm" | "lg";
}) {
  const textClass = size === "lg" ? "text-base" : "text-sm";
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
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

export function YelpPopover({
  yelpUrl,
  rating,
  reviewCount,
  slug,
  size = "sm",
}: YelpPopoverProps) {
  const taData = TRIPADVISOR_DATA[slug];

  return (
    <div className="flex flex-col gap-0.5">
      <RatingRow
        rating={rating}
        reviewCount={reviewCount}
        url={yelpUrl}
        color={YELP_RED}
        badge="yelp"
        size={size}
      />
      {taData && taData.rating == null && (
        <LinkRow url={taData.url} color={TA_GREEN} badge="tripadvisor" size={size} />
      )}
      {taData && taData.rating != null && (
        <RatingRow
          rating={taData.rating}
          reviewCount={taData.reviewCount}
          url={taData.url}
          color={TA_GREEN}
          badge="tripadvisor"
          size={size}
        />
      )}
    </div>
  );
}
