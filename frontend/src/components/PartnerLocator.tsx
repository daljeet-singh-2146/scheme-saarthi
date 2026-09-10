import { useMemo, useState } from "react";
import {
  channelPartners,
  calculateDistanceKm,
  type ChannelPartner,
  type PartnerType,
} from "../data/partners";
import { schemeSlugByName } from "../data/schemes";
import PartnerMap from "./PartnerMap";

interface PartnerLocatorProps {
  recommendedSchemeSlug?: string;
  onSelectPartnerForHandoff?: (partner: ChannelPartner) => void;
  showHandoffButton?: boolean;
}

const cityCoordinates: Record<string, { lat: number; lng: number; state: string }> = {
  "New Delhi": { lat: 28.6139, lng: 77.209, state: "Delhi" },
  Lucknow: { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },
  Mumbai: { lat: 19.076, lng: 72.8777, state: "Maharashtra" },
  Chennai: { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  Bengaluru: { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  Kolkata: { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  Patna: { lat: 25.5941, lng: 85.1376, state: "Bihar" },
  Jaipur: { lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  Chandigarh: { lat: 30.7333, lng: 76.7794, state: "Punjab" },
  Bhubaneswar: { lat: 20.2961, lng: 85.8245, state: "Odisha" },
  Pune: { lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
  Gurugram: { lat: 28.4595, lng: 77.0266, state: "Haryana" },
};

const partnerTypeBadges: Record<PartnerType, { label: string; color: string }> = {
  SCA: { label: "State Channelizing Agency", color: "bg-blue-100 text-blue-800 border-blue-200" },
  PSB: { label: "Public Sector Bank", color: "bg-purple-100 text-purple-800 border-purple-200" },
  RRB: { label: "Regional Rural Bank", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  "NBFC-MFI": { label: "Micro Finance Institution", color: "bg-amber-100 text-amber-800 border-amber-200" },
};

export default function PartnerLocator({
  recommendedSchemeSlug = "term-loan-scheme",
  onSelectPartnerForHandoff,
  showHandoffButton = true,
}: PartnerLocatorProps) {
  // Scheme filter (defaults to recommended scheme)
  const [selectedScheme, setSelectedScheme] = useState<string>(recommendedSchemeSlug);

  // Partner type filter (All, SCA, PSB, RRB, NBFC-MFI)
  const [selectedType, setSelectedType] = useState<string>("All");

  // Search keyword
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Location state
  const [selectedCity, setSelectedCity] = useState<string>("New Delhi");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>({
    lat: cityCoordinates["New Delhi"].lat,
    lng: cityCoordinates["New Delhi"].lng,
    label: "New Delhi (Default City)",
  });
  const [geoLocating, setGeoLocating] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Selected partner for details / card
  const [selectedPartner, setSelectedPartner] = useState<ChannelPartner | null>(null);

  // Request browser geolocation
  function handleUseGeolocation() {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocating(false);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({
          lat,
          lng,
          label: "Your Detected GPS Location",
        });
      },
      (error) => {
        setGeoLocating(false);
        setGeoError(
          error.code === 1
            ? "Location permission denied. Please select your city manually below."
            : "Could not retrieve GPS location. Selected manual city.",
        );
      },
      { timeout: 8000 },
    );
  }

  // Handle manual city selection
  function handleCityChange(city: string) {
    setSelectedCity(city);
    const coords = cityCoordinates[city];
    if (coords) {
      setUserLocation({
        lat: coords.lat,
        lng: coords.lng,
        label: `${city}, ${coords.state}`,
      });
      setGeoError(null);
    }
  }

  // Process and filter partners
  const filteredPartners = useMemo(() => {
    return channelPartners
      .filter((partner) => {
        // Must match selected scheme (or handles all if "All" chosen)
        if (
          selectedScheme &&
          selectedScheme !== "all" &&
          !partner.schemes.includes(selectedScheme as any)
        ) {
          return false;
        }

        // Partner type filter
        if (selectedType !== "All" && partner.type !== selectedType) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = partner.name.toLowerCase().includes(q);
          const matchCity = partner.city.toLowerCase().includes(q);
          const matchState = partner.state.toLowerCase().includes(q);
          const matchAddress = partner.address.toLowerCase().includes(q);
          if (!matchName && !matchCity && !matchState && !matchAddress) {
            return false;
          }
        }

        return true;
      })
      .map((partner) => {
        // Calculate distance from user location
        const distance = userLocation
          ? calculateDistanceKm(
              userLocation.lat,
              userLocation.lng,
              partner.latitude,
              partner.longitude,
            )
          : 0;

        return { ...partner, distance };
      })
      .sort((a, b) => {
        // Sort priority:
        // 1. Active partners first, restricted partners last
        if (a.eligibleStatus === "active" && b.eligibleStatus !== "active") return -1;
        if (a.eligibleStatus !== "active" && b.eligibleStatus === "active") return 1;

        // 2. Nearest distance
        return a.distance - b.distance;
      });
  }, [selectedScheme, selectedType, searchQuery, userLocation]);

  // Set default selected partner if none selected or if filtered out
  const activeSelectedPartner =
    selectedPartner && filteredPartners.some((p) => p.id === selectedPartner.id)
      ? selectedPartner
      : filteredPartners.find((p) => p.eligibleStatus === "active") || filteredPartners[0] || null;

  return (
    <div className="space-y-8">
      {/* Header & Geo Controls */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="border-b border-border/80 pb-4">
          <span className="inline-flex items-center rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold text-leaf">
            Geo-Spatial Channel Partner Locator
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
            Nearby Eligible Channel Partners
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            NSFDC concessional credit is disbursed solely through authorized SCAs, Banks, and
            NBFC-MFIs. Locate verified active partners near you.
          </p>
        </div>

        {/* Location Selector Bar */}
        <div className="mt-6 grid gap-4 rounded-xl border border-border/80 bg-muted/30 p-4 sm:grid-cols-12 sm:items-center">
          <div className="sm:col-span-6">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Current Reference Location
            </span>
            <p className="mt-0.5 text-sm font-bold text-foreground flex items-center gap-1.5">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {userLocation ? userLocation.label : "Location Not Selected"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:col-span-6 sm:justify-end">
            <button
              type="button"
              onClick={handleUseGeolocation}
              disabled={geoLocating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-card border border-border px-3 py-2 text-xs font-semibold text-foreground shadow-xs hover:bg-muted disabled:opacity-50"
            >
              <svg className="h-3.5 w-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
              </svg>
              {geoLocating ? "Detecting GPS..." : "Detect My Location"}
            </button>

            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-saffron"
            >
              {Object.keys(cityCoordinates).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {geoError && (
            <div className="sm:col-span-12 text-xs text-destructive font-medium">
              ⚠ {geoError}
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Scheme Filter Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Scheme Handled:</span>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              <option value="micro-finance-scheme">Micro Finance Scheme (≤ ₹1.4L)</option>
              <option value="term-loan-scheme">Term Loan Scheme (≤ ₹50L)</option>
              <option value="educational-loan-scheme">Educational Loan Scheme</option>
              <option value="all">All NSFDC Schemes</option>
            </select>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {["All", "SCA", "PSB", "RRB", "NBFC-MFI"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  selectedType === type
                    ? "bg-navy text-navy-foreground"
                    : "border border-border bg-background text-muted-foreground hover:bg-muted"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search channel partner by name, city, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-xs font-medium text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
          />
        </div>
      </div>

      {/* Map & Partner Directory Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Map Display Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <PartnerMap
            partners={filteredPartners}
            selectedPartner={activeSelectedPartner}
            onSelectPartner={(partner) => setSelectedPartner(partner)}
            userLocation={userLocation}
          />

          <div className="rounded-xl border border-border/80 bg-muted/20 p-3 text-xs text-muted-foreground flex items-center justify-between">
            <span>
              Showing {filteredPartners.length} channel partners matching criteria.
            </span>
            <span className="font-semibold text-foreground">
              {filteredPartners.filter((p) => p.eligibleStatus === "active").length} Active •{" "}
              {filteredPartners.filter((p) => p.eligibleStatus === "restricted").length} Restricted
            </span>
          </div>
        </div>

        {/* Partner Cards List Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredPartners.map((partner) => {
            const isActive = partner.eligibleStatus === "active";
            const isSelected = activeSelectedPartner?.id === partner.id;
            const badge = partnerTypeBadges[partner.type];

            return (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className={`group cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-saffron bg-saffron/5 shadow-md ring-2 ring-saffron/20"
                    : isActive
                    ? "border-border bg-card hover:border-leaf/50 hover:bg-muted/20"
                    : "border-border/60 bg-muted/40 opacity-75 hover:opacity-90"
                }`}
              >
                {/* Header line: Type badge + Status badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badge.color}`}
                  >
                    {partner.type} • {badge.label}
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-leaf/10 px-2 py-0.5 text-[10px] font-bold text-leaf">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf"></span>
                      Active Partner
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
                      Restricted (Audit)
                    </span>
                  )}
                </div>

                {/* Partner Name */}
                <h4
                  className={`mt-2 font-display text-sm font-bold leading-snug ${
                    isActive ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  {partner.name}
                </h4>

                {/* Address & Distance */}
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {partner.address}
                </p>

                {/* Health Metrics & Distance Badge */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2 text-[11px]">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <svg className="h-3.5 w-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="6" x2="12" y2="12" />
                      <line x1="12" y1="12" x2="16" y2="14" />
                    </svg>
                    ~{partner.distance} km away
                  </span>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>
                      NPA: <strong className={partner.npaRatio > 8 ? "text-red-600" : "text-leaf"}>{partner.npaRatio}%</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Util: <strong className={partner.fundUtilization < 60 ? "text-red-600" : "text-foreground"}>{partner.fundUtilization}%</strong>
                    </span>
                  </div>
                </div>

                {/* If restricted, show clear note as requested */}
                {!isActive && (
                  <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-2 text-[11px] text-amber-900 leading-tight">
                    <strong>Notice:</strong> Temporarily not accepting new applications. {partner.restrictionReason}
                  </div>
                )}

                {/* Selected CTA */}
                {isSelected && isActive && showHandoffButton && onSelectPartnerForHandoff && (
                  <div className="mt-3 border-t border-border/80 pt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPartnerForHandoff(partner);
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-saffron py-2.5 px-3 text-xs font-bold text-saffron-foreground shadow-sm hover:bg-saffron/90"
                    >
                      Start Application with this Partner
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredPartners.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
              <p className="text-sm font-semibold">No channel partners match current filters.</p>
              <p className="mt-1 text-xs">Try selecting "All Schemes" or clearing your search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
