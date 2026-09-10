import { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import SchemeRecommender, { type RecommenderResult } from "../components/SchemeRecommender";
import SchemeCalculator, { type CalculatorState } from "../components/SchemeCalculator";
import PartnerLocator from "../components/PartnerLocator";
import ApplicationSummary from "../components/ApplicationSummary";
import { channelPartners, type ChannelPartner } from "../data/partners";
import { schemeDetails } from "../data/schemes";

export default function FindSchemePage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);

  // Flow State
  const [recommenderData, setRecommenderData] = useState<RecommenderResult | null>(null);
  const [calculatorData, setCalculatorData] = useState<CalculatorState | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<ChannelPartner | null>(null);

  // Step 1 Callback -> Move to Step 2
  function handleRecommenderProceed(result: RecommenderResult) {
    setRecommenderData(result);
    setCurrentStep(2);
    setMaxStepReached((prev) => Math.max(prev, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Step 2 Callback -> Move to Step 3
  function handleCalculatorProceed(calcState: CalculatorState) {
    setCalculatorData(calcState);
    setCurrentStep(3);
    setMaxStepReached((prev) => Math.max(prev, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Step 3 Callback -> Move to Step 4
  function handlePartnerSelect(partner: ChannelPartner) {
    setSelectedPartner(partner);
    setCurrentStep(4);
    setMaxStepReached((prev) => Math.max(prev, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Allow jumping to any step already reached
  function handleStepClick(step: number) {
    if (step <= maxStepReached) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Provide fallback default data if user jumped steps or reloaded
  const effectiveRecommenderData: RecommenderResult = recommenderData || {
    eligible: true,
    scheme: schemeDetails[1],
    totalCost: 1500000,
    eligibleLoanAmount: 1350000,
    beneficiaryContribution: 150000,
    fundingCoveragePercent: 90,
    interestRateRange: "6.5% – 10.0% p.a.",
    matchExplanation:
      "Matched Term Loan Scheme for enterprise establishment and expansion up to ₹50 Lakh.",
    userInputs: {
      isSC: true,
      familyIncome: 300000,
      age: 28,
      gender: "Female",
      purpose: "business",
      businessType: "Retail Shop / Kirana / Street Vending",
      projectCost: 1500000,
      state: "Delhi",
      areaType: "Urban",
    },
  };

  const effectiveCalcData: CalculatorState = calculatorData || {
    schemeSlug: effectiveRecommenderData.scheme?.slug || "term-loan-scheme",
    totalCost: effectiveRecommenderData.totalCost,
    loanAmount: effectiveRecommenderData.eligibleLoanAmount,
    beneficiaryContribution: effectiveRecommenderData.beneficiaryContribution,
    annualInterestRate: 7.5,
    tenureYears: 5,
    moratoriumMonths: 6,
    monthlyEmi: 27850,
    moratoriumAccruedInterest: 50625,
    repaymentInterest: 320375,
    totalInterest: 371000,
    totalRepayment: 1721000,
  };

  const effectivePartner: ChannelPartner =
    selectedPartner || channelPartners[0];

  return (
    <div className="bg-soft-hero min-h-screen pb-16">
      {/* Page Title & Breadcrumb Header */}
      <div className="border-b border-border/80 bg-background/60 backdrop-blur-xs py-8">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron">
            Guided NSFDC Credit Pathway
          </span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Find My Scheme & Channel Partner
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            A seamless 4-step journey: Verify statutory eligibility, simulate scheme-specific EMI
            terms, locate active Channel Partners, and generate your application dossier.
          </p>

          {/* Persistent Step Indicator */}
          <div className="mt-6">
            <StepIndicator
              currentStep={currentStep}
              maxStepReached={maxStepReached}
              onStepClick={handleStepClick}
            />
          </div>
        </div>
      </div>

      {/* Main Flow Step Container */}
      <main className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <SchemeRecommender
              initialData={recommenderData?.userInputs}
              onProceedToCalculator={handleRecommenderProceed}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleStepClick(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                ← Back to Eligibility & Scheme Match
              </button>
            </div>

            <SchemeCalculator
              initialSchemeSlug={effectiveRecommenderData.scheme?.slug}
              initialTotalCost={effectiveRecommenderData.totalCost}
              initialLoanAmount={effectiveRecommenderData.eligibleLoanAmount}
              onProceedToPartners={handleCalculatorProceed}
              showContinueButton={true}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleStepClick(2)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                ← Back to EMI Calculator
              </button>
            </div>

            <PartnerLocator
              recommendedSchemeSlug={effectiveCalcData.schemeSlug}
              onSelectPartnerForHandoff={handlePartnerSelect}
              showHandoffButton={true}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleStepClick(3)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                ← Back to Partner Selection
              </button>
            </div>

            <ApplicationSummary
              recommenderData={effectiveRecommenderData}
              calcData={effectiveCalcData}
              selectedPartner={effectivePartner}
              onModifyStep={handleStepClick}
            />
          </div>
        )}
      </main>
    </div>
  );
}
