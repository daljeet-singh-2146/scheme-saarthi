import { Link } from "react-router-dom";
import aboutThumbnail from "../assets/about-thumbnail.png";

const values = [
  {
    title: "Accessible",
    desc: "Plain language, so NSFDC credit reaches SC beneficiaries who need it most.",
    color: "text-saffron",
  },
  {
    title: "Transparent",
    desc: "Clear SC eligibility criteria, income thresholds, interest rates and moratorium — no fine print hiding.",
    color: "text-navy",
  },
  {
    title: "Trustworthy",
    desc: "We hand off to authorized Channel Partners (SCAs, PSBs, RRBs, NBFC-MFIs). We never act as a lender or middleman.",
    color: "text-leaf",
  },
];

function VideoThumbnail() {
  return (
    <a
      href="https://youtu.be/EKEEBmzQiOg"
      target="_blank"
      rel="noreferrer"
      aria-label="Watch the SchemeSaarthi introduction video"
      className="group relative block w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-lg"
    >
      <img
        src={aboutThumbnail}
        alt="Watch the SchemeSaarthi introduction video"
        className="block aspect-video w-full object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/10 transition-colors group-hover:bg-black/20">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-saffron text-saffron-foreground shadow-lg">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  );
}

function AboutPage() {
  return (
    <div>
      <section className="bg-soft-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-20">
          <div className="text-left">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              About
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              SchemeSaarthi is an independent guidance platform that helps Scheduled
              Caste (SC) beneficiaries with annual family income ≤ ₹5,00,000 discover
              the right NSFDC concessional credit product — Micro Finance, Term Loan
              or Educational Loan — and connects them to the authorized Channel Partner
              (SCA, PSB, RRB or NBFC-MFI) to apply.
            </p>
          </div>
          <div className="w-full lg:justify-self-end">
            <VideoThumbnail />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              Lakhs of SC entrepreneurs and students miss out on NSFDC concessional
              credit simply because they don't know which product fits them or which
              Channel Partner to approach. SchemeSaarthi closes that gap — matching you
              to the right credit product and handing you off to the right SCA, PSB, RRB
              or NBFC-MFI in minutes, in your language.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">What we do</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-leaf">✓</span> Match you to the right NSFDC credit product (Micro Finance, Term Loan or Educational Loan) with a short questionnaire.</li>
              <li className="flex gap-2"><span className="text-leaf">✓</span> Explain SC eligibility, income criteria (≤ ₹5 lakh), documents and loan terms in plain language.</li>
              <li className="flex gap-2"><span className="text-leaf">✓</span> Direct you to the authorized Channel Partner — SCA, PSB, RRB or NBFC-MFI.</li>
              <li className="flex gap-2"><span className="text-leaf">✓</span> Let you track your credit application status reported by Channel Partners.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-cream p-6">
              <h3 className={`font-display text-lg font-bold ${v.color}`}>{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-cream p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Ready to find your scheme?</h2>
          <p className="mt-2 text-muted-foreground">Answer a few questions and we'll guide you.</p>
          <Link
            to="/find-scheme"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-saffron px-6 py-3 text-sm font-semibold text-saffron-foreground hover:bg-saffron/90"
          >
            Find My Scheme
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
