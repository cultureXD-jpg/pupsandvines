import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
const cn = (...a: Parameters<typeof clsx>) => clsx(...a);

/**
 * Shows a photo nicely inside a fixed-size frame.
 * - Photos with roughly the frame's shape fill it (cover), as before.
 * - Tall, square or panoramic photos would be badly cropped, so instead the
 *   whole photo is shown, centred, over a soft blurred copy of itself.
 * - Broken photos call onBroken so galleries can skip them.
 */
export function SmartImage({
  src,
  alt,
  className,
  onBroken,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onBroken?: (src: string) => void;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"cover" | "fit">("cover");
  const [natural, setNatural] = useState<number | null>(null);

  const decide = useCallback(() => {
    const box = ref.current;
    if (!box || !natural) return;
    const frame = box.clientWidth / Math.max(box.clientHeight, 1);
    const off = natural / frame;
    // Close to the frame shape: cropping loses little, so fill the frame.
    setMode(off > 0.6 && off < 1.8 ? "cover" : "fit");
  }, [natural]);

  useEffect(() => {
    decide();
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(decide);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [decide]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)} onClick={onClick}>
      {mode === "fit" && (
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-70"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 w-full h-full",
          mode === "cover" ? "object-cover object-center" : "object-contain drop-shadow-lg",
        )}
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) setNatural(img.naturalWidth / img.naturalHeight);
        }}
        onError={() => onBroken?.(src)}
      />
    </div>
  );
}
