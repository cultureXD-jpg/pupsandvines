import { useEffect, useRef, useState } from "react";
import { useListWineries } from "@workspace/api-client-react";
import { Link } from "wouter";
import "leaflet/dist/leaflet.css";
import { GoogleAd } from "@/components/google-ad";
import { PageMeta } from "@/components/page-meta";

const REGION_COLORS: Record<string, string> = {
  "Calistoga":        "#b45309",
  "Rutherford":       "#9f1239",
  "Yountville":       "#be185d",
  "St. Helena":       "#6d28d9",
  "Napa Valley":      "#0369a1",
  "Los Carneros":     "#0f766e",
  "Sonoma County":    "#15803d",
  "Dry Creek Valley": "#c2410c",
};

function pinSvg(color: string, featured: boolean) {
  const w = featured ? 30 : 24;
  const h = featured ? 40 : 32;
  const cx = w / 2;
  const cr = featured ? 6 : 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <path d="M${cx} 0C${(cx * 0.45).toFixed(1)} 0 0 ${(cx * 0.45).toFixed(1)} 0 ${cx}c0 ${(cx * 0.6).toFixed(1)} ${cx} ${h - cx} ${cx} ${h - cx}s${cx}-${(h - cx - cx * 0.6).toFixed(1)} ${cx}-${h - cx}C${w} ${(cx * 0.45).toFixed(1)} ${(cx * 1.55).toFixed(1)} 0 ${cx} 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cx}" r="${cr}" fill="white" opacity="0.95"/>
  </svg>`;
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<import("leaflet").Map | null>(null);
  const markersLayer = useRef<import("leaflet").LayerGroup | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { data: wineries, isLoading } = useListWineries({});

  // Initialise the map once
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || leafletMap.current) return;

      const isMobile = window.innerWidth < 640;
      const map = L.map(mapRef.current, {
        center: isMobile ? [38.42, -122.47] : [38.45, -122.55],
        zoom: 10,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const layer = L.layerGroup().addTo(map);
      leafletMap.current = map;
      markersLayer.current = layer;
      setMapReady(true); // signal that the map is ready for markers
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        markersLayer.current = null;
        setMapReady(false);
      }
    };
  }, []);

  // Re-draw markers whenever winery data arrives OR the map becomes ready
  useEffect(() => {
    if (!mapReady || !wineries?.length || !markersLayer.current) return;

    import("leaflet").then((L) => {
      if (!markersLayer.current) return;
      markersLayer.current.clearLayers();

      wineries.forEach((winery) => {
        if (!winery.latitude || !winery.longitude) return;

        const color = REGION_COLORS[winery.region] ?? "#78350f";
        const isFeatured = winery.listingTier === "featured";
        const w = isFeatured ? 30 : 24;
        const h = isFeatured ? 40 : 32;

        const icon = L.divIcon({
          html: pinSvg(color, isFeatured),
          className: "",
          iconSize: [w, h],
          iconAnchor: [w / 2, h],
          popupAnchor: [0, -h],
        });

        const stars = winery.rating ? "&#9733;".repeat(Math.round(winery.rating)) : "";
        const popup = L.popup({ maxWidth: 260 }).setContent(`
          <div style="font-family:system-ui,sans-serif;padding:4px 0;">
            ${isFeatured ? `<span style="background:#b45309;color:white;font-size:10px;padding:2px 6px;border-radius:999px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Featured</span><br/><br/>` : ""}
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${color};margin-bottom:4px;">${winery.region}</div>
            <div style="font-size:16px;font-weight:800;color:#1c1917;margin-bottom:4px;line-height:1.2;">${winery.name}</div>
            ${winery.rating ? `<div style="font-size:12px;color:#78350f;margin-bottom:6px;">${stars} ${winery.rating} (${winery.reviewCount?.toLocaleString() ?? 0} reviews)</div>` : ""}
            <div style="font-size:11px;color:#78716c;margin-bottom:10px;">${winery.address}</div>
            ${winery.hours ? `<div style="font-size:11px;color:#57534e;margin-bottom:10px;">${winery.hours}</div>` : ""}
            <a href="${import.meta.env.BASE_URL}winery/${winery.id}" style="display:inline-block;background:#1c1917;color:white;font-size:12px;font-weight:700;padding:7px 14px;border-radius:8px;text-decoration:none;">View Details &rarr;</a>
          </div>
        `);

        L.marker([winery.latitude, winery.longitude], { icon })
          .bindPopup(popup)
          .addTo(markersLayer.current!);
      });
    });
  }, [wineries, mapReady]);

  const regions = Object.entries(REGION_COLORS);

  return (
    <div className="w-full bg-background">
      <PageMeta
        title="Winery Map — Find Dog-Friendly Wineries Near You"
        description="Explore an interactive map of verified dog-friendly wineries across Napa Valley and Sonoma County. Click any pin to see details and directions."
        canonical="/map"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-4 sm:pb-6">

        {/* Mobile: back link first, no heading */}
        <Link href="/directory" className="sm:hidden inline-block text-sm font-semibold text-primary hover:underline mb-3">
          ← Back to directory
        </Link>

        {/* Desktop: heading + back link side by side */}
        <div className="hidden sm:flex sm:items-end sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Winery Map
            </h1>
            <p className="text-muted-foreground mt-1">
              {wineries?.length ?? "30"} dog-friendly wineries across Napa Valley &amp; Sonoma County
            </p>
          </div>
          <Link href="/directory" className="text-sm font-semibold text-primary hover:underline self-auto">
            ← Back to directory
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 sm:mt-0">
          {regions.map(([region, color]) => (
            <div key={region} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              {region}
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative mx-4 sm:mx-16 lg:mx-24 mb-10 rounded-3xl overflow-hidden shadow-xl border border-border"
        style={{ height: "calc(100vh - 280px)", minHeight: "420px" }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm font-medium">Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <GoogleAd />
      </div>
    </div>
  );
}
