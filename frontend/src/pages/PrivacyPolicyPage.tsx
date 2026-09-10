
const sections = [
  {
    h: "What we collect",
    p: "When you use the Find My Scheme questionnaire, we collect the answers you provide — such as your goal, background, income band and location. We do not collect identity documents or financial account details.",
  },
  {
    h: "How we use it",
    p: "Your responses are used to match you to suitable schemes and to show relevant guidance. We do not sell your information to third parties.",
  },
  {
    h: "Application tracking",
    p: "If you track an application, the reference ID you enter is used only to display status reported by the channel partner. SchemeSaarthi does not store sensitive application documents.",
  },
  {
    h: "Your choices",
    p: "You can use SchemeSaarthi without creating an account. If you sign in, you may request deletion of your saved matches and tracked references at any time.",
  },
  {
    h: "Contact",
    p: "Questions about privacy? Reach us via the Contact page and we will respond promptly.",
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
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

export default PrivacyPolicyPage;
