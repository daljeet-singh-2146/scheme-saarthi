import { useMemo, useState } from "react";
import { schemeDetails, getScheme, type SchemeDetail } from "../data/schemes";

export interface CalculatorState {
  schemeSlug: string;
  totalCost: number;
  loanAmount: number;
  beneficiaryContribution: number;
  annualInterestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
  monthlyEmi: number;
  moratoriumAccruedInterest: number;
  repaymentInterest: number;
  totalInterest: number;
  totalRepayment: number;
}

interface SchemeCalculatorProps {
  initialSchemeSlug?: string;
  initialTotalCost?: number;
  initialLoanAmount?: number;
  onProceedToPartners?: (calcState: CalculatorState) => void;
  showContinueButton?: boolean;
}

export default function SchemeCalculator({
  initialSchemeSlug = "term-loan-scheme",
  initialTotalCost,
  initialLoanAmount,
  onProceedToPartners,
  showContinueButton = true,
}: SchemeCalculatorProps) {
  const [selectedSchemeSlug, setSelectedSchemeSlug] = useState<string>(initialSchemeSlug);
  const scheme: SchemeDetail = getScheme(selectedSchemeSlug) || schemeDetails[1];

  // Derive initial project cost
  const defaultCost =
    initialTotalCost ??
    (scheme.slug === "micro-finance-scheme"
      ? 140000
      : scheme.slug === "educational-loan-scheme"
      ? 500000
      : 1500000);

  const [totalCost, setTotalCost] = useState<number>(defaultCost);

  // Maximum eligible loan is 90% of totalCost capped at scheme loan ceiling
  const maxEligibleLoan = Math.min(Math.round(totalCost * 0.9), scheme.loanCeiling);

  // Loan amount state
  const [loanAmount, setLoanAmount] = useState<number>(
    initialLoanAmount
      ? Math.min(initialLoanAmount, maxEligibleLoan)
      : maxEligibleLoan,
  );

  // Ensure loan amount does not exceed ceiling if totalCost or scheme changes
  const effectiveLoanAmount = Math.min(loanAmount, maxEligibleLoan);
  const beneficiaryMargin = Math.max(0, totalCost - effectiveLoanAmount);
  const beneficiaryPercent = totalCost > 0 ? Math.round((beneficiaryMargin / totalCost) * 100) : 10;

  // Interest rate state
  const [interestRate, setInterestRate] = useState<number>(scheme.rateTypical);
  const [isOverrideRate, setIsOverrideRate] = useState<boolean>(false);

  // Tenure state
  const [tenureYears, setTenureYears] = useState<number>(scheme.defaultTenureYears);

  // Moratorium state (3 to 12 months)
  const [moratoriumMonths, setMoratoriumMonths] = useState<number>(scheme.minMoratoriumMonths);

  // Amortization Schedule View mode
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [scheduleView, setScheduleView] = useState<"moratorium" | "first12" | "full">("moratorium");

  // When scheme changes, reset defaults according to scheme bounds
  function handleSchemeChange(slug: string) {
    setSelectedSchemeSlug(slug);
    const newScheme = getScheme(slug) || schemeDetails[0];
    const newCost =
      slug === "micro-finance-scheme"
        ? Math.min(totalCost, 155000)
        : slug === "educational-loan-scheme"
        ? 500000
        : Math.max(totalCost, 500000);

    setTotalCost(newCost);
    const newMaxLoan = Math.min(Math.round(newCost * 0.9), newScheme.loanCeiling);
    setLoanAmount(newMaxLoan);
    setInterestRate(newScheme.rateTypical);
    setTenureYears(newScheme.defaultTenureYears);
    setMoratoriumMonths(newScheme.minMoratoriumMonths);
  }

  // Financial calculations with interest accrual during moratorium
  const calculations = useMemo(() => {
    const P = effectiveLoanAmount;
    const rMonthly = interestRate / 1200;
    const mMonths = moratoriumMonths;
    const repaymentMonths = tenureYears * 12;

    if (P <= 0 || repaymentMonths <= 0) {
      return {
        monthlyEmi: 0,
        moratoriumAccruedInterest: 0,
        postMoratoriumPrincipal: 0,
        repaymentInterest: 0,
        totalInterest: 0,
        totalRepayment: 0,
        amortizationRows: [],
      };
    }

    // Moratorium: Interest accrues each month
    // Simple accrual per month on base principal:
    // Monthly interest during moratorium = P * rMonthly
    const monthlyMoratoriumInterest = P * rMonthly;
    const moratoriumAccruedInterest = Math.round(monthlyMoratoriumInterest * mMonths);

    // With interest accrual during moratorium, the principal entering amortization
    // is P + accrued interest (or P if interest is capitalized)
    const postMoratoriumPrincipal = P + moratoriumAccruedInterest;

    // Monthly EMI on postMoratoriumPrincipal over repaymentMonths
    let monthlyEmi = 0;
    if (rMonthly === 0) {
      monthlyEmi = postMoratoriumPrincipal / repaymentMonths;
    } else {
      monthlyEmi =
        (postMoratoriumPrincipal *
          rMonthly *
          Math.pow(1 + rMonthly, repaymentMonths)) /
        (Math.pow(1 + rMonthly, repaymentMonths) - 1);
    }

    const totalEmiPayments = monthlyEmi * repaymentMonths;
    const repaymentInterest = totalEmiPayments - postMoratoriumPrincipal;
    const totalInterest = moratoriumAccruedInterest + repaymentInterest;
    const totalRepayment = P + totalInterest;

    // Build Amortization schedule rows
    const amortizationRows: {
      month: number;
      isMoratorium: boolean;
      payment: number;
      principalPayment: number;
      interestPayment: number;
      remainingBalance: number;
    }[] = [];

    let currentBalance = P;

    // Moratorium months (1 to mMonths)
    for (let m = 1; m <= mMonths; m++) {
      currentBalance += monthlyMoratoriumInterest;
      amortizationRows.push({
        month: m,
        isMoratorium: true,
        payment: 0, // No payment due during moratorium
        principalPayment: 0,
        interestPayment: monthlyMoratoriumInterest,
        remainingBalance: currentBalance,
      });
    }

    // Repayment months
    for (let m = 1; m <= repaymentMonths; m++) {
      const interestPart = currentBalance * rMonthly;
      const principalPart = monthlyEmi - interestPart;
      currentBalance = Math.max(0, currentBalance - principalPart);

      amortizationRows.push({
        month: mMonths + m,
        isMoratorium: false,
        payment: monthlyEmi,
        principalPayment: principalPart,
        interestPayment: interestPart,
        remainingBalance: currentBalance,
      });
    }

    return {
      monthlyEmi: Math.round(monthlyEmi),
      moratoriumAccruedInterest,
      postMoratoriumPrincipal: Math.round(postMoratoriumPrincipal),
      repaymentInterest: Math.round(repaymentInterest),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      amortizationRows,
    };
  }, [effectiveLoanAmount, interestRate, tenureYears, moratoriumMonths]);

  const calcState: CalculatorState = {
    schemeSlug: scheme.slug,
    totalCost,
    loanAmount: effectiveLoanAmount,
    beneficiaryContribution: beneficiaryMargin,
    annualInterestRate: interestRate,
    tenureYears,
    moratoriumMonths,
    monthlyEmi: calculations.monthlyEmi,
    moratoriumAccruedInterest: calculations.moratoriumAccruedInterest,
    repaymentInterest: calculations.repaymentInterest,
    totalInterest: calculations.totalInterest,
    totalRepayment: calculations.totalRepayment,
  };

  // Filter amortization rows based on toggle
  const visibleRows = useMemo(() => {
    if (scheduleView === "moratorium") {
      // show moratorium months + first 6 months of EMI
      return calculations.amortizationRows.slice(0, moratoriumMonths + 6);
    }
    if (scheduleView === "first12") {
      return calculations.amortizationRows.slice(0, 12);
    }
    return calculations.amortizationRows;
  }, [calculations.amortizationRows, scheduleView, moratoriumMonths]);

  return (
    <div className="space-y-8">
      {/* Scheme Selection Tabs */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="border-b border-border/80 pb-4">
          <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
            Scheme-Specific Financial Engineering
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
            Concessional Loan & EMI Calculator
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Driven by NSFDC scheme credit caps, 90% funding coverage, and moratorium rules.
          </p>
        </div>

        {/* Scheme Selector Pills */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {schemeDetails.map((s) => {
            const isSelected = s.slug === selectedSchemeSlug;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => handleSchemeChange(s.slug)}
                className={`flex flex-col rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-saffron bg-saffron/10 ring-2 ring-saffron/20 shadow-sm"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.category}
                </span>
                <span className="mt-1 font-display text-base font-bold text-foreground">
                  {s.name}
                </span>
                <span className="mt-2 text-xs font-semibold text-leaf">
                  Cap: ₹{(s.loanCeiling / 100000).toLocaleString("en-IN")} Lakh
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Sliders & Inputs */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Left Column: Total Cost & Loan Amount */}
          <div className="space-y-5">
            {/* Input: Total Project / Course Cost */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <label htmlFor="calc-total-cost">Total Project / Education Cost (₹)</label>
                <span className="text-xs font-bold text-saffron">
                  ₹{totalCost.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                id="calc-total-cost"
                type="number"
                min="10000"
                step="10000"
                value={totalCost}
                onChange={(e) => {
                  const val = Math.max(10000, Number(e.target.value));
                  setTotalCost(val);
                  const newCap = Math.min(Math.round(val * 0.9), scheme.loanCeiling);
                  setLoanAmount(newCap);
                }}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
              />
            </div>

            {/* Input: NSFDC Loan Amount (90% Cap) */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <label htmlFor="calc-loan-amount">
                  NSFDC Loan Requested (Max 90%)
                </label>
                <span className="text-xs font-bold text-leaf">
                  ₹{effectiveLoanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>Scheme Ceiling: ₹{scheme.loanCeiling.toLocaleString("en-IN")}</span>
                <span>Max 90%: ₹{maxEligibleLoan.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="calc-loan-amount-number"
                  type="number"
                  min={Math.min(10000, maxEligibleLoan)}
                  max={maxEligibleLoan}
                  step="5000"
                  value={effectiveLoanAmount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setLoanAmount(Math.min(Math.max(value, 10000), maxEligibleLoan));
                  }}
                  className="w-40 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                  aria-label="Enter NSFDC loan amount"
                />
                <input
                  id="calc-loan-amount"
                  type="range"
                  min={Math.min(10000, maxEligibleLoan)}
                  max={maxEligibleLoan}
                  step="5000"
                  value={effectiveLoanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-leaf"
                />
              </div>

              {/* Funding Coverage & Margin money breakdown */}
              <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl border border-border/80 bg-muted/40 p-3">
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    NSFDC Loan (90%)
                  </span>
                  <p className="font-bold text-leaf text-sm">
                    ₹{effectiveLoanAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    Beneficiary Contribution ({beneficiaryPercent}%)
                  </span>
                  <p className="font-bold text-saffron text-sm">
                    ₹{beneficiaryMargin.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Input: Repayment Tenure */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <label htmlFor="calc-tenure">Repayment Tenure (Years)</label>
                <span className="text-xs font-bold text-navy">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Starts after the moratorium period completes.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="calc-tenure-number"
                  type="number"
                  min="1"
                  max={scheme.maxTenureYears}
                  step="1"
                  value={tenureYears}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setTenureYears(Math.min(Math.max(value, 1), scheme.maxTenureYears));
                  }}
                  className="w-32 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
                  aria-label="Enter repayment tenure in years"
                />
                <input
                  id="calc-tenure"
                  type="range"
                  min="1"
                  max={scheme.maxTenureYears}
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-navy"
                />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>1 Year</span>
                <span>Max {scheme.maxTenureYears} Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interest Rate & Moratorium Period */}
          <div className="space-y-5">
            {/* Input: Concessional Interest Rate */}
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <label htmlFor="calc-rate">Concessional Interest Rate (% p.a.)</label>
                <span className="text-xs font-bold text-navy">{interestRate.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Standard scheme rate: {scheme.rateMin}% – {scheme.rateMax}%
              </p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  id="calc-rate"
                  type="number"
                  step="0.1"
                  min="4.0"
                  max={isOverrideRate ? "15.0" : scheme.rateMax.toString()}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
                />

                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setInterestRate(scheme.rateTypical)}
                    className="rounded-lg border border-border bg-card px-2.5 py-2 text-xs font-bold text-navy hover:bg-muted"
                  >
                    Default ({scheme.rateTypical}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOverrideRate((prev) => !prev)}
                    className={`rounded-lg border px-2.5 py-2 text-xs font-bold transition ${
                      isOverrideRate
                        ? "border-saffron bg-saffron text-white"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {isOverrideRate ? "Override (Max 15%)" : "Allow Override"}
                  </button>
                </div>
              </div>
            </div>

            {/* Input: Moratorium Period (3 to 12 months) */}
            <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <label htmlFor="calc-moratorium">Moratorium Period (Months)</label>
                <span className="text-xs font-bold text-saffron">
                  {moratoriumMonths} Months Repayment Holiday
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                No principal payments due during moratorium. Interest accrues monthly and delays
                EMI commencement.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="calc-moratorium-number"
                  type="number"
                  min="3"
                  max="12"
                  step="1"
                  value={moratoriumMonths}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setMoratoriumMonths(Math.min(Math.max(value, 3), 12));
                  }}
                  className="w-32 rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  aria-label="Enter moratorium period in months"
                />
                <input
                  id="calc-moratorium"
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={moratoriumMonths}
                  onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
                  className="w-full accent-saffron bg-white"
                  style={{ accentColor: "#f59e0b", background: "#ffffff" }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>3 Months</span>
                <span>6 Months (Standard)</span>
                <span>12 Months (Max)</span>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg bg-background p-2.5 text-xs">
                <span className="text-muted-foreground font-medium">
                  Accrued Interest in Moratorium:
                </span>
                <span className="font-bold text-saffron">
                  ₹{calculations.moratoriumAccruedInterest.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Results Hero Card */}
      <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:grid-cols-3 sm:p-8">
        {/* Left 2 Cols: Financial KPI Cards */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-display text-lg font-bold text-foreground">
            Repayment Summary & Milestones
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                Monthly EMI (Post-Moratorium)
              </span>
              <p className="mt-1 text-3xl font-extrabold text-foreground">
                ₹{calculations.monthlyEmi.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Due for {tenureYears * 12} months starting from Month {moratoriumMonths + 1}.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                Total Interest Payable
              </span>
              <p className="mt-1 text-3xl font-extrabold text-saffron">
                ₹{calculations.totalInterest.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                ₹{calculations.moratoriumAccruedInterest.toLocaleString("en-IN")} moratorium + ₹
                {calculations.repaymentInterest.toLocaleString("en-IN")} repayment interest.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                Total Repayment Amount
              </span>
              <p className="mt-1 text-2xl font-bold text-navy">
                ₹{calculations.totalRepayment.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Principal (₹{effectiveLoanAmount.toLocaleString("en-IN")}) + Total Interest.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                Beneficiary Own Margin
              </span>
              <p className="mt-1 text-2xl font-bold text-leaf">
                ₹{beneficiaryMargin.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {beneficiaryPercent}% of project cost not funded by credit.
              </p>
            </div>
          </div>

          {/* Toggle Amortization Schedule */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAmortization((prev) => !prev)}
              className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-navy/80"
            >
              <svg
                className={`h-4 w-4 transition-transform ${showAmortization ? "rotate-90" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              {showAmortization
                ? "Hide Amortization Schedule Table"
                : "View Month-by-Month Amortization Schedule"}
            </button>
          </div>
        </div>

        {/* Right Col: Scheme Highlights & Proceed Card */}
        <div className="flex flex-col justify-between rounded-xl bg-navy p-6 text-navy-foreground shadow-md">
          <div>
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
              Scheme Terms Validated
            </span>
            <h4 className="mt-3 font-display text-xl font-bold">{scheme.name}</h4>
            <p className="mt-1 text-xs text-navy-foreground/80 leading-relaxed">
              Calculated using concessional NSFDC credit regulations. Disbursal requires channel
              partner appraisal.
            </p>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="opacity-80">Moratorium holiday:</span>
                <span className="font-bold">{moratoriumMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Repayment start:</span>
                <span className="font-bold">Month {moratoriumMonths + 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Concessional rate:</span>
                <span className="font-bold">{interestRate.toFixed(1)}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Collateral status:</span>
                <span className="font-bold">
                  {scheme.facts.find((f) => f.label === "Collateral")?.value || "As per partner"}
                </span>
              </div>
            </div>
          </div>

          {showContinueButton && onProceedToPartners && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => onProceedToPartners(calcState)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-saffron py-3.5 px-4 text-sm font-bold text-saffron-foreground shadow-md transition-all hover:bg-saffron/90 hover:shadow-lg"
              >
                Find Eligible Channel Partners
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Schedule Table */}
      {showAmortization && (
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
            <div>
              <h4 className="font-display text-lg font-bold text-foreground">
                Month-by-Month Amortization Schedule
              </h4>
              <p className="text-xs text-muted-foreground">
                Reflects moratorium accrual (Month 1 to {moratoriumMonths}) followed by regular
                EMI.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex rounded-lg border border-border bg-muted/40 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setScheduleView("moratorium")}
                className={`rounded-md px-2.5 py-1 transition ${
                  scheduleView === "moratorium"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                Moratorium + 6 Months
              </button>
              <button
                type="button"
                onClick={() => setScheduleView("first12")}
                className={`rounded-md px-2.5 py-1 transition ${
                  scheduleView === "first12"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                First 12 Months
              </button>
              <button
                type="button"
                onClick={() => setScheduleView("full")}
                className={`rounded-md px-2.5 py-1 transition ${
                  scheduleView === "full"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground"
                }`}
              >
                Full Tenure ({calculations.amortizationRows.length} M)
              </button>
            </div>
          </div>

          <div className="mt-4 max-h-96 overflow-x-auto overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 border-b border-border bg-card text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Month</th>
                  <th className="py-2.5 px-3 font-bold">Period Type</th>
                  <th className="py-2.5 px-3 font-bold">Monthly Payment (₹)</th>
                  <th className="py-2.5 px-3 font-bold">Principal (₹)</th>
                  <th className="py-2.5 px-3 font-bold">Interest (₹)</th>
                  <th className="py-2.5 px-3 font-bold text-right">Balance Outstanding (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {visibleRows.map((row) => (
                  <tr
                    key={row.month}
                    className={`transition-colors ${
                      row.isMoratorium
                        ? "bg-saffron/5 font-medium text-foreground"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold">{row.month}</td>
                    <td className="py-2.5 px-3">
                      {row.isMoratorium ? (
                        <span className="inline-flex items-center rounded-full bg-saffron/20 px-2 py-0.5 text-[10px] font-bold text-saffron">
                          Moratorium Accrual
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-leaf/20 px-2 py-0.5 text-[10px] font-bold text-leaf">
                          Regular EMI
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-semibold">
                      ₹{Math.round(row.payment).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-3">
                      ₹{Math.round(row.principalPayment).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-saffron">
                      ₹{Math.round(row.interestPayment).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold">
                      ₹{Math.round(row.remainingBalance).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
