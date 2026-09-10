
const sections = [
  {
    h: "Guidance, not approval",
    p: "SchemeSaarthi provides preliminary information and guidance about NSFDC concessional credit products for SC beneficiaries. Final approval, verification and disbursal are handled solely by authorized Channel Partners — SCAs, PSBs, RRBs, and NBFC-MFIs.",
  },
  {
    h: "No middleman role",
    p: "SchemeSaarthi is not a lender, agent or broker. We do not collect fees for applications and do not influence the outcome of any application.",
  },
  {
    h: "Accuracy",
    p: "Scheme details such as ceilings, rates and eligibility are indicative. Always confirm the current terms with the official agency before applying.",
  },
  {
    h: "Use of the platform",
    p: "You agree to provide accurate information and to use the platform only for lawful scheme discovery. Misuse may result in restricted access.",
  },
  {
    h: "Limitation of liability",
    p: "SchemeSaarthi is not liable for decisions made by government agencies or channel partners, or for outcomes of any application submitted through official channels.",
  },
];

function TermsPage() {
  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: August 2026</p>

        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.h} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold text-foreground">{s.h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
