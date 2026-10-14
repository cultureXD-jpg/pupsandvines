import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AD_SLOT = "2629518050";
const AD_CLIENT = "ca-pub-1082029854480662";
const AD_LAYOUT_KEY = "-6t+ed+2i-1n-4w";

interface GoogleAdProps {
  slot?: string;
  format?: "fluid" | "auto" | "rectangle" | "horizontal";
  className?: string;
  desktopOnly?: boolean;
}

export function GoogleAd({
  slot = AD_SLOT,
  format = "fluid",
  className = "",
  desktopOnly = false,
}: GoogleAdProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not ready yet
    }
  }, []);

  return (
    <div className={`${desktopOnly ? "hidden lg:block" : ""} ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium select-none">
          Sponsored
        </span>
        <div style={{ width: "100%", maxHeight: "280px", overflow: "hidden" }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slot}
            data-ad-format={format === "fluid" ? "fluid" : format}
            data-ad-layout-key={format === "fluid" ? AD_LAYOUT_KEY : undefined}
          />
        </div>
      </div>
    </div>
  );
}
