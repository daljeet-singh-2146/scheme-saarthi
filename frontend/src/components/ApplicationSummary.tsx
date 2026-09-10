import { Link } from "react-router-dom";
import type { RecommenderResult } from "./SchemeRecommender";
import type { CalculatorState } from "./SchemeCalculator";
import type { ChannelPartner } from "../data/partners";

interface ApplicationSummaryProps {
  recommenderData: RecommenderResult;
  calcData: CalculatorState;
  selectedPartner: ChannelPartner;
  onModifyStep: (step: number) => void;
}

export default function ApplicationSummary({
  recommenderData,
  calcData,
  selectedPartner,
  onModifyStep,
}: ApplicationSummaryProps) {
  const scheme = recommenderData.scheme;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-8">
      {/* Success Hero Banner */}
      <div className="overflow-hidden rounded-2xl border-2 border-leaf bg-gradient-to-r from-leaf/10 via-card to-saffron/10 p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white shadow-md">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <span className="rounded-full bg-leaf/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-leaf">
                Application Handoff Dossier
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Ready for Channel Partner Submission
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Dossier ID: SS-{Date.now().toString().slice(-6)} • Verified under NSFDC Statutory
                Guidelines
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground shadow-xs hover:bg-muted"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Section 1: Beneficiary & Scheme Profile */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron/10 text-saffron text-xs font-bold">
                1
              </span>
              Beneficiary & Scheme Profile
            </h3>
            <button
              type="button"
              onClick={() => onModifyStep(1)}
              className="text-xs font-semibold text-saffron hover:underline"
            >
              Edit Step 1
            </button>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Category Status:</span>
              <span className="font-bold text-foreground">Scheduled Caste (SC Beneficiary)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Applicant Demographics:</span>
              <span className="font-bold text-foreground">
                {recommenderData.userInputs.age || 28} Years • {recommenderData.userInputs.gender || "Female"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Annual Household Income:</span>
              <span className="font-bold text-foreground">
                ₹{recommenderData.userInputs.familyIncome.toLocaleString("en-IN")} (≤ ₹5L Ceiling)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Location & Area:</span>
              <span className="font-bold text-foreground">
                {recommenderData.userInputs.state || "Delhi"} ({recommenderData.userInputs.areaType || "Urban"})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">
                {recommenderData.userInputs.purpose === "business" ? "Business Sector / Activity:" : "Educational Course:"}
              </span>
              <span className="font-bold text-foreground max-w-xs text-right">
                {recommenderData.userInputs.purpose === "business"
                  ? recommenderData.userInputs.businessType || "Retail Trade"
                  : recommenderData.userInputs.educationCourseType || "Higher Studies"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Matched Credit Scheme:</span>
              <span className="font-bold text-leaf">{scheme?.name}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Eligibility Rationale:</span>
              <span className="font-medium text-foreground text-right max-w-xs">
                {recommenderData.matchExplanation}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Financial Terms & EMI Blueprint */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/10 text-navy text-xs font-bold">
                2
              </span>
              Approved Financial Terms
            </h3>
            <button
              type="button"
              onClick={() => onModifyStep(2)}
              className="text-xs font-semibold text-navy hover:underline"
            >
              Edit Step 2
            </button>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Total Project / Course Cost:</span>
              <span className="font-bold text-foreground">
                ₹{calcData.totalCost.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">NSFDC Concessional Loan (90%):</span>
              <span className="font-bold text-leaf">
                ₹{calcData.loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Beneficiary Margin (10%+):</span>
              <span className="font-bold text-saffron">
                ₹{calcData.beneficiaryContribution.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Concessional Rate & Moratorium:</span>
              <span className="font-bold text-foreground">
                {calcData.annualInterestRate}% p.a. • {calcData.moratoriumMonths} Months Moratorium
              </span>
            </div>
            <div className="flex justify-between py-1 bg-navy/5 p-2 rounded-lg font-bold">
              <span className="text-navy">Monthly EMI (Post Moratorium):</span>
              <span className="text-navy text-sm">
                ₹{calcData.monthlyEmi.toLocaleString("en-IN")} / month
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Selected Channel Partner Details */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf/10 text-leaf text-xs font-bold">
                3
              </span>
              Designated Channel Partner
            </h3>
            <button
              type="button"
              onClick={() => onModifyStep(3)}
              className="text-xs font-semibold text-leaf hover:underline"
            >
              Change Partner
            </button>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div>
              <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">
                {selectedPartner.type}
              </span>
              <h4 className="mt-1.5 font-bold text-foreground text-sm">{selectedPartner.name}</h4>
            </div>

            <div className="py-1 border-b border-border/40">
              <span className="text-muted-foreground">Office Address:</span>
              <p className="mt-0.5 font-medium text-foreground">{selectedPartner.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 py-1 border-b border-border/40">
              <div>
                <span className="text-muted-foreground">Direct Contact:</span>
                <p className="font-semibold text-foreground">{selectedPartner.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-semibold text-foreground truncate">{selectedPartner.email}</p>
              </div>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Turnaround SLA:</span>
              <span className="font-bold text-leaf">~{selectedPartner.slaDays} Working Days</span>
            </div>
          </div>
        </div>

        {/* Section 4: Required Checklist */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="border-b border-border/80 pb-3">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf/10 text-leaf text-xs font-bold">
                4
              </span>
              Checklist of Mandatory Documents
            </h3>
          </div>

          <div className="mt-4">
            <ul className="space-y-2 text-xs text-muted-foreground">
              {scheme?.documents.slice(0, 6).map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <span className="text-leaf font-bold">✓</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Navigation Footer */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => onModifyStep(1)}
          className="rounded-xl border border-border bg-background px-5 py-3 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          ← Start New Eligibility Assessment
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/track-application"
            className="rounded-xl border border-border bg-background px-5 py-3 text-xs font-bold text-foreground hover:bg-muted"
          >
            Track Existing Applications
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="rounded-xl bg-saffron px-6 py-3 text-xs font-bold text-saffron-foreground shadow-md hover:bg-saffron/90"
          >
            Download / Print Formal Application Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
