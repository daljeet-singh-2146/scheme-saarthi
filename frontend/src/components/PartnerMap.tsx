import { useEffect, useRef, useState } from "react";
import type { ChannelPartner } from "../data/partners";

interface PartnerMapProps {
  partners: ChannelPartner[];
  selectedPartner: ChannelPartner | null;
  onSelectPartner: (partner: ChannelPartner) => void;
  userLocation: { lat: number; lng: number; label: string } | null;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function PartnerMap({
  partners,
  selectedPartner,
  onSelectPartner,
  userLocation,
}: PartnerMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const [leafletLoaded, setLeafletLoaded] = useState<boolean>(
    typeof window !== "undefined" && Boolean(window.L),
  );

  // Check if Leaflet script loaded
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if (window.L) {
        setLeafletLoaded(true);
        clearInterval(interval);
      }
    }, 300);

    const timer = setTimeout(() => clearInterval(interval), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const L = window.L;
      const initialLat = userLocation?.lat ?? 20.5937;
      const initialLng = userLocation?.lng ?? 78.9629;
      const initialZoom = userLocation ? 7 : 5;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    } catch (err) {
      console.warn("Leaflet initialization fallback:", err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Update markers on Leaflet map
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    const L = window.L;
    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    // User location marker
    if (userLocation) {
      const userIcon = L.divIcon({
        className: "user-location-pin",
        html: `
          <div style="
            position: relative;
            width: 24px;
            height: 24px;
            background: #2563eb;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(37,99,235,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      })
        .addTo(map)
        .bindPopup(`<strong>Your Location</strong><br/>${userLocation.label}`);

      markersRef.current["__user__"] = userMarker;
    }

    // Partner markers
    partners.forEach((partner) => {
      const isSelected = selectedPartner?.id === partner.id;
      const isActive = partner.eligibleStatus === "active";
      const pinColor = isActive ? (isSelected ? "#e05a0b" : "#16a34a") : "#9ca3af";
      const scale = isSelected ? "1.2" : "1.0";

      const pinIcon = L.divIcon({
        className: `partner-pin-${partner.id}`,
        html: `
          <div style="
            transform: scale(${scale});
            transition: all 0.2s ease;
            width: 30px;
            height: 38px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          ">
            <div style="
              width: 28px;
              height: 28px;
              background: ${pinColor};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 11px;
              font-weight: bold;
            ">
              ${partner.type.slice(0, 3)}
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid ${pinColor};
              margin-top: -2px;
            "></div>
          </div>
        `,
        iconSize: [30, 38],
        iconAnchor: [15, 38],
      });

      const marker = L.marker([partner.latitude, partner.longitude], {
        icon: pinIcon,
        opacity: isActive ? 1.0 : 0.65,
      }).addTo(map);

      const statusBadge = isActive
        ? `<span style="color:#16a34a; font-weight:600;">● Active Partner</span>`
        : `<span style="color:#dc2626; font-weight:600;">⚠ Temporarily Restricted (NPA: ${partner.npaRatio}%)</span>`;

      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 200px; padding: 4px;">
          <div style="font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase;">
            ${partner.type} • ${partner.city}
          </div>
          <div style="font-weight: 700; font-size: 13px; margin-top: 2px; color: #111827;">
            ${partner.name}
          </div>
          <div style="margin-top: 4px; font-size: 11px;">
            ${statusBadge}
          </div>
          <div style="margin-top: 6px; font-size: 11px; color: #4b5563;">
            ${partner.address}
          </div>
          <button
            id="popup-btn-${partner.id}"
            style="
              margin-top: 8px;
              width: 100%;
              background: #e05a0b;
              color: white;
              border: none;
              padding: 6px 10px;
              font-size: 12px;
              font-weight: 600;
              border-radius: 6px;
              cursor: pointer;
            "
          >
            Select Partner
          </button>
        </div>
      `);

      marker.on("click", () => {
        onSelectPartner(partner);
      });

      marker.on("popupopen", () => {
        const btn = document.getElementById(`popup-btn-${partner.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectPartner(partner);
            map.closePopup();
          };
        }
      });

      markersRef.current[partner.id] = marker;
    });

    // Auto fit bounds if partners exist
    if (partners.length > 0) {
      const boundsCoords = partners.map((p) => [p.latitude, p.longitude] as [number, number]);
      if (userLocation) {
        boundsCoords.push([userLocation.lat, userLocation.lng]);
      }
      try {
        const bounds = L.latLngBounds(boundsCoords);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
      } catch {
        // ignore bounds calculation error
      }
    }
  }, [partners, selectedPartner, userLocation, leafletLoaded]);

  // Center on selected partner
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedPartner) return;
    mapInstanceRef.current.setView([selectedPartner.latitude, selectedPartner.longitude], 9, {
      animate: true,
    });
    const marker = markersRef.current[selectedPartner.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedPartner]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Map view container */}
      <div
        ref={mapContainerRef}
        className="h-[400px] w-full bg-muted/40 sm:h-[480px]"
        style={{ zIndex: 1 }}
      />

      {/* Fallback if Leaflet fails to load */}
      {!leafletLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/90 p-6 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-leaf border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-foreground">
            Loading interactive map of Channel Partners...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Displaying coordinates across all states and union territories.
          </p>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-background/90 p-2.5 backdrop-blur-md text-xs sm:left-4 sm:right-auto">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-leaf"></span>
          <span className="font-medium text-foreground">Active Partner</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-saffron"></span>
          <span className="font-medium text-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-muted-foreground/60"></span>
          <span className="font-medium text-muted-foreground">Restricted (High NPA)</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-blue-600"></span>
            <span className="font-medium text-foreground">You</span>
          </div>
        )}
      </div>
    </div>
  );
}
