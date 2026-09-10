import { Link } from "react-router-dom";
import heroImage from "../assets/hero-illustration.png";
import aboutThumbnail from "../assets/about-thumbnail.png";
import { schemeSlugByName } from "../data/schemes";

const colorMap = {
  saffron: { bg: "bg-saffron/10", text: "text-saffron", ring: "ring-saffron/30" },
  navy: { bg: "bg-navy/10", text: "text-navy", ring: "ring-navy/30" },
  leaf: { bg: "bg-leaf/10", text: "text-leaf", ring: "ring-leaf/30" },
} as const;

const exploreCards = [
  {
    title: "Start or Expand a Business",
    desc: "Access NSFDC concessional credit — Micro Finance or Term Loan — to launch or grow your enterprise as an SC beneficiary.",
    accent: "saffron",
    to: "/find-scheme",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </>
    ),
  },
  {
    title: "Education",
    desc: "Find NSFDC-backed educational loans for SC students with concessional interest rates and flexible moratorium.",
    accent: "navy",
    to: "/find-scheme",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
  },
  {
    title: "Explore Credit Products",
    desc: "Browse all three NSFDC credit products and compare ceilings, rates and moratorium periods.",
    accent: "leaf",
    to: "/schemes",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: "Understand Loan Terms",
    desc: "Clear, jargon-free explanations of NSFDC interest rates, collateral, moratorium and repayment through Channel Partners.",
    accent: "saffron",
    to: "/schemes",
    icon: (
      <>
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </>
    ),
  },
] as const;

const howItWorks = [
  {
    title: "Tell us about your needs",
    desc: "Share your goals, SC category status, family income and location in a short guided questionnaire.",
  },
  {
    title: "Check your preliminary eligibility",
    desc: "See which NSFDC credit products you qualify for based on your SC status and income (≤ ₹5 lakh) — instantly.",
  },
  {
    title: "Compare suitable schemes",
    desc: "Review NSFDC interest rates (6.5%–15%), loan ceilings, collateral requirements and moratorium periods side by side.",
  },
  {
    title: "Continue to the official application channel",
    desc: "We direct you to the authorized Channel Partner — SCA, PSB, RRB or NBFC-MFI — to submit your application.",
  },
];

const popularSchemes = [
  {
    name: "Micro Finance Scheme",
    tag: "Business",
    color: "saffron",
    desc: "Small-ticket NSFDC credit up to ₹1,40,000 through NBFC-MFI channel partners for micro enterprises run by SC beneficiaries.",
    highlights: ["Up to ₹1,40,000", "~6.5% interest", "3–6 month moratorium"],
  },
  {
    name: "Term Loan Scheme",
    tag: "Business",
    color: "navy",
    desc: "Concessional NSFDC term financing up to ₹50 lakh for SC entrepreneurs to set up or expand manufacturing and service units.",
    highlights: ["Up to ₹50 lakh", "6.5–10% interest", "6–12 month moratorium"],
  },
  {
    name: "Educational Loan Scheme",
    tag: "Education",
    color: "leaf",
    desc: "NSFDC-backed education loans for SC students pursuing higher studies, with concessional rates and a moratorium during the course.",
    highlights: ["6.5–15% interest", "Moratorium during studies", "Routed via Channel Partners"],
  },
] as const;

const benefits = [
  {
    title: "Personalized recommendations",
    desc: "Credit products matched to your SC category, income level and business or education goal — not a generic list.",
    color: "saffron",
    icon: (
      <>
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Easy-to-understand eligibility",
    desc: "Plain-language eligibility checks covering SC status, family income (≤ ₹5 lakh) and other NSFDC criteria.",
    color: "navy",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Document guidance",
    desc: "A clear checklist of the documents each NSFDC credit product requires before you apply through a Channel Partner.",
    color: "leaf",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </>
    ),
  },
  {
    title: "Multilingual support",
    desc: "Use SchemeSaarthi in English or हिंदी — more languages coming soon.",
    color: "saffron",
    icon: (
      <>
        <path d="m5 8 6 6M4 14l6-6 2-3M2 5h6M7 2h1m4 18 2.5-7 2.5 7M10 16h6" />
      </>
    ),
  },
] as const;

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-7 sm:px-6 md:py-9 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:py-12">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-leaf" />
              NSFDC concessional credit for SC beneficiaries
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              Find the right{" "}
              <span className="bg-gradient-to-r from-saffron to-[oklch(0.55_0.16_30)] bg-clip-text text-transparent">
                NSFDC credit product
              </span>{" "}
              for you.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              SchemeSaarthi helps SC entrepreneurs and students (family income
              ≤ ₹5 lakh) find the right NSFDC concessional credit product —
              Micro Finance, Term Loan or Educational Loan — and connects you
              to the Channel Partner (SCA, PSB, RRB or NBFC-MFI) to apply.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/find-scheme"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-saffron px-6 py-3.5 text-sm font-semibold text-saffron-foreground shadow-sm transition-all hover:bg-saffron/90 hover:shadow-md"
              >
                Find My Scheme
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link
                to="/schemes"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Explore Schemes
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-saffron/5 lg:rounded-3xl">
              <img
                src={heroImage}
                alt="SC beneficiaries exploring NSFDC concessional credit products"
                width={1200}
                height={912}
                className="block h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular schemes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Popular schemes
            </h2>
            <p className="mt-3 text-muted-foreground">
              A few of the most-searched schemes on SchemeSaarthi right now.
            </p>
          </div>
          <Link
            to="/schemes"
            className="inline-flex items-center gap-1 text-sm font-semibold text-saffron hover:underline"
          >
            View all schemes
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {popularSchemes.map((scheme) => {
            const c = colorMap[scheme.color];
            return (
              <div
                key={scheme.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
                    {scheme.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{scheme.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{scheme.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {scheme.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-foreground/80">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c.text}><path d="m9 12 2 2 4-4" /></svg>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/scheme/${schemeSlugByName[scheme.name]}`}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four simple steps from discovery to application.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-5xl font-extrabold text-saffron/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 pb-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-8">
            <div className="text-left">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                SchemeSaarthi helps SC beneficiaries (family income ≤ ₹5 lakh) discover and understand NSFDC concessional credit products — Micro Finance, Term Loan and Educational Loan. We explain eligibility, documents, interest rates and moratorium in plain language, then connect you to the right Channel Partner (SCA, PSB, RRB or NBFC-MFI) to apply.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-leaf px-5 py-2.5 text-sm font-semibold text-leaf transition-colors hover:bg-leaf hover:text-leaf-foreground"
              >
                View More
              </Link>
            </div>
            <a href="https://youtu.be/EKEEBmzQiOg" target="_blank" rel="noreferrer" aria-label="Watch the SchemeSaarthi introduction video" className="group relative block w-full max-w-md justify-self-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-lg lg:justify-self-end">
              <img src={aboutThumbnail} alt="Watch the SchemeSaarthi introduction video" className="block aspect-video w-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors group-hover:bg-black/20">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-saffron text-saffron-foreground shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Explore cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What would you like to do?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick a starting point — we'll guide you to the schemes that fit.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exploreCards.map((card) => {
            const c = colorMap[card.accent];
            return (
              <Link
                key={card.title}
                to={card.to}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${c.bg} ${c.text}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{card.icon}</svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${c.text}`}>
                  Get started
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why SchemeSaarthi */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why SchemeSaarthi
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built to make NSFDC concessional credit accessible to SC entrepreneurs.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const c = colorMap[b.color];
              return (
                <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${c.bg} ${c.text}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-navy-foreground shadow-sm transition-all hover:bg-navy/90 hover:shadow-md"
            >
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
