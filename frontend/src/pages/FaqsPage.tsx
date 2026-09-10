import { useState } from "react";

const faqs = [
  {
    q: "Is SchemeSaarthi a government website?",
    a: "No. SchemeSaarthi is an independent guidance platform. It helps SC beneficiaries understand NSFDC concessional credit products, but final approval and disbursal are handled by authorized Channel Partners — SCAs, PSBs, RRBs, and NBFC-MFIs.",
  },
  {
    q: "Who is eligible for NSFDC credit?",
    a: "Applicants must belong to the Scheduled Caste (SC) category and have an annual family income not exceeding ₹5,00,000. A valid SC caste certificate and income certificate from the competent authority are required.",
  },
  {
    q: "What are the three NSFDC credit products?",
    a: "(1) Micro Finance Scheme — small projects up to ₹1,40,000 at ~6.5% interest. (2) Term Loan Scheme — larger projects up to ₹50,00,000 at 6.5–10% interest. (3) Educational Loan Scheme — for SC students pursuing higher studies at 6.5–15% interest.",
  },
  {
    q: "Does NSFDC give loans directly?",
    a: "No. NSFDC does not lend directly to beneficiaries. All loans are routed through Channel Partners: State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), Regional Rural Banks (RRBs), and NBFC-MFIs.",
  },
  {
    q: "Does SchemeSaarthi approve my loan?",
    a: "No. SchemeSaarthi provides preliminary guidance and credit-product matching only. The authorized Channel Partner reviews your application and makes the final approval decision.",
  },
  {
    q: "Do I have to pay to use SchemeSaarthi?",
    a: "No. Discovering credit products, checking preliminary eligibility and comparing options is free. We never act as a middleman or collect fees for applications.",
  },
  {
    q: "What information do I need to find my credit product?",
    a: "A short questionnaire about your goal, SC category status, family income, and location. Your answers are used only to match you to the right NSFDC credit product and Channel Partner.",
  },
  {
    q: "Which languages are supported?",
    a: "English and Hindi today, with more languages planned. Use the language selector in the navbar to switch.",
  },
];

function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about using SchemeSaarthi.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground">{faq.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FaqsPage;
