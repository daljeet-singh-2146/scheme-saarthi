import { Link, useParams } from "react-router-dom";
import { getScheme, schemeDetails } from "../data/schemes";

const colorMap = {
  saffron: { bg: "bg-saffron/10", text: "text-saffron", solid: "bg-saffron", fg: "text-saffron-foreground" },
  navy: { bg: "bg-navy/10", text: "text-navy", solid: "bg-navy", fg: "text-navy-foreground" },
  leaf: { bg: "bg-leaf/10", text: "text-leaf", solid: "bg-leaf", fg: "text-leaf-foreground" },
} as const;

function Check({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function SchemeNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Scheme not found</h1>
      <p className="mt-3 text-muted-foreground">
        We could not find that scheme. Browse all listed schemes instead.
      </p>
      <Link
        to="/schemes"
        className="mt-6 inline-flex rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground hover:bg-navy/90"
      >
        Explore Schemes
      </Link>
    </div>
  );
}

function SchemeDetailPage() {
  const { slug } = useParams();
  const scheme = slug ? getScheme(slug) : undefined;
  if (!scheme) return <SchemeNotFound />;
  const c = colorMap[scheme.color];
  const others = schemeDetails.filter((s) => s.slug !== scheme.slug);

  return (
    <div>
      {/* Hero */}
      <section className="bg-soft-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/schemes" className="hover:text-foreground">Schemes</Link>
            <span>/</span>
            <span className="text-foreground">{scheme.name}</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${c.solid}`} />
              {scheme.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {scheme.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{scheme.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={scheme.applyLinks[0]!.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold ${c.solid} ${c.fg} transition-opacity hover:opacity-90`}
              >
                Apply on official portal
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
              <Link
                to="/find-scheme"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Check my eligibility
              </Link>
              <Link
                to={`/calculator`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-navy hover:bg-muted"
              >
                Calculate EMI
              </Link>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {scheme.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xs text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{scheme.overview}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Eligibility criteria</h2>
            <ul className="mt-4 space-y-3">
              {scheme.eligibility.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <Check className={`mt-0.5 shrink-0 ${c.text}`} />
                  <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">Documents required</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {scheme.documents.map((doc) => (
                <li key={doc} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 shrink-0 ${c.text}`}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  <span className="text-sm leading-relaxed text-foreground/85">{doc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-foreground">How to apply</h2>
            <ol className="mt-4 space-y-4">
              {scheme.process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${c.bg} ${c.text}`}>
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Official application links</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              You will be taken to a government or authorised partner website.
            </p>
            <ul className="mt-4 space-y-3">
              {scheme.applyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border p-4 transition-colors hover:bg-muted"
                  >
                    <span className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c.text}><path d="M7 17 17 7M9 7h8v8" /></svg>
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{link.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-muted p-3 text-xs leading-relaxed text-muted-foreground">
              SchemeSaarthi does not process applications. Final approval rests with the
              authorised government agency or channel partner.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold text-foreground">Other schemes</h2>
            <ul className="mt-3 space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/scheme/${o.slug}`}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {o.name}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SchemeDetailPage;
