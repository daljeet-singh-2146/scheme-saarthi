import { useNavigate } from "react-router-dom";
import SchemeCalculator, { type CalculatorState } from "../components/SchemeCalculator";

export default function CalculatorPage() {
  const navigate = useNavigate();

  function handleProceedToPartners(calcState: CalculatorState) {
    // Navigate to find-scheme step 3 or partners page with state
    navigate(`/partners?scheme=${calcState.schemeSlug}`);
  }

  return (
    <div className="bg-soft-hero min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            NSFDC Credit Simulator
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Scheme-Specific Loan & EMI Calculator
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Estimate monthly repayments, moratorium interest accrual, and 90% NSFDC loan ceilings
            for Micro Finance, Term Loan, and Educational Loan products.
          </p>
        </div>

        <SchemeCalculator
          initialSchemeSlug="term-loan-scheme"
          onProceedToPartners={handleProceedToPartners}
          showContinueButton={true}
        />
      </div>
    </div>
  );
}
