import { useSearchParams, useNavigate } from "react-router-dom";
import PartnerLocator from "../components/PartnerLocator";
import type { ChannelPartner } from "../data/partners";

export default function PartnersPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialScheme = searchParams.get("scheme") || "term-loan-scheme";

  function handleStartApplication(_partner: ChannelPartner) {
    navigate("/find-scheme");
  }

  return (
    <div className="bg-soft-hero min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="rounded-full bg-leaf/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf">
            Authorized Channel Network
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Geo-Spatial Channel Partner Locator
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Locate State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), Regional Rural Banks
            (RRBs), and NBFC-MFIs processing NSFDC credit in your district.
          </p>
        </div>

        <PartnerLocator
          recommendedSchemeSlug={initialScheme}
          onSelectPartnerForHandoff={handleStartApplication}
          showHandoffButton={true}
        />
      </div>
    </div>
  );
}
