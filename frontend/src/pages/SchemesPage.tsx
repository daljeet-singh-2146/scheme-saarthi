import { Link } from "react-router-dom";
import { schemeSlugByName } from "../data/schemes";

const schemes = [
  {
    name: "Micro Finance Scheme",
    category: "Business",
    color: "saffron",
    desc: "NSFDC concessional credit up to ₹1,40,000 through NBFC-MFI channel partners for SC micro entrepreneurs.",
    loanCeiling: "Up to ₹1,40,000",
    rate: "~6.5%",
    collateral: "None",
    tenure: "Up to 3 years",
  },
  {
    name: "Term Loan Scheme",
    category: "Business",
    color: "navy",
    desc: "Concessional NSFDC term financing up to ₹50 lakh for SC entrepreneurs via SCAs, PSBs and RRBs.",
    loanCeiling: "Up to ₹50,00,000",
    rate: "6.5–10%",
    collateral: "As per Channel Partner",
    tenure: "Up to 10 years",
  },
  {
    name: "Educational Loan Scheme",
    category: "Education",
    color: "leaf",
    desc: "NSFDC-backed education loans for SC students with concessional rates and moratorium during studies.",
    loanCeiling: "Need-based",
    rate: "6.5–15%",
    collateral: "As per Channel Partner",
    tenure: "Up to 15 years",
  },
] as const;

const colorMap = {
  saffron: { bg: "bg-saffron/10", text: "text-saffron", dot: "bg-saffron" },
  navy: { bg: "bg-navy/10", text: "text-navy", dot: "bg-navy" },
  leaf: { bg: "bg-leaf/10", text: "text-leaf", dot: "bg-leaf" },
} as const;

const categories = ["All", "Business", "Education"] as const;

import { useState } from "react";

function SchemesPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered =
    filter === "All" ? schemes : schemes.filter((s) => s.category === filter);

  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore NSFDC credit products
          </h1>
          <p className="mt-3 text-muted-foreground">
            Browse all three NSFDC concessional credit products for SC beneficiaries.
            Filter by business credit or education loans, then select a product for full details.
          </p>
        </div>

        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-navy text-navy-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((scheme) => {
            const c = colorMap[scheme.color];
            return (
              <div
                key={scheme.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                    {scheme.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{scheme.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{scheme.desc}</p>
                <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="text-muted-foreground">Ceiling</dt>
                  <dd className="font-medium text-foreground">{scheme.loanCeiling}</dd>
                  <dt className="text-muted-foreground">Rate</dt>
                  <dd className="font-medium text-foreground">{scheme.rate}</dd>
                  <dt className="text-muted-foreground">Collateral</dt>
                  <dd className="font-medium text-foreground">{scheme.collateral}</dd>
                  <dt className="text-muted-foreground">Tenure</dt>
                  <dd className="font-medium text-foreground">{scheme.tenure}</dd>
                </dl>
                <Link
                  to={`/scheme/${schemeSlugByName[scheme.name]}`}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-saffron-foreground transition-colors hover:bg-saffron/90"
                >
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which NSFDC credit product fits you? Let us match you to the right one.
          </p>
          <Link
            to="/find-scheme"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90"
          >
            Find My Scheme
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SchemesPage;
