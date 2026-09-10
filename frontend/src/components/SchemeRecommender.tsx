import { useState } from "react";
import { Link } from "react-router-dom";
import { schemeDetails, getScheme, type SchemeDetail } from "../data/schemes";

export interface RecommenderResult {
  eligible: boolean;
  ineligibleReason?: string;
  scheme?: SchemeDetail;
  totalCost: number;
  eligibleLoanAmount: number;
  beneficiaryContribution: number;
  fundingCoveragePercent: number;
  interestRateRange: string;
  matchExplanation: string;
  userInputs: {
    isSC: boolean;
    familyIncome: number;
    age: number;
    gender: "Female" | "Male" | "Transgender";
    purpose: "business" | "education";
    businessType?: string;
    projectCost?: number;
    educationCourseType?: string;
    educationCost?: number;
    state?: string;
    areaType?: "Urban" | "Rural";
    city?: string;
  };
}

interface SchemeRecommenderProps {
  initialData?: Partial<RecommenderResult["userInputs"]>;
  onProceedToCalculator: (result: RecommenderResult) => void;
}

const educationCourseTypes = [
  "Engineering & Technology (B.Tech, M.Tech)",
  "Medical & Dental (MBBS, BDS, MD)",
  "Management & Business (MBA, BBA)",
  "Pure Sciences & Research (B.Sc, M.Sc, Ph.D)",
  "Law & Legal Studies (LLB, LLM)",
  "Vocational / Skill Diploma & Certification",
  "Overseas Higher Education (Master's / Ph.D)",
];

const businessTypes = [
  "Retail Shop / Kirana / Street Vending",
  "Manufacturing / Fabrication / Small Workshop",
  "Services / Repair / Beauty & Salon",
  "Transport / E-Rickshaw / Logistics",
  "Artisan / Handloom / Handicrafts",
  "Agro-Allied / Dairy / Poultry / Food Processing",
  "Other Income-Generating Enterprise",
];

const indianStates = [
  "Delhi",
  "Uttar Pradesh",
  "Maharashtra",
  "Punjab",
  "Tamil Nadu",
  "Karnataka",
  "West Bengal",
  "Rajasthan",
  "Bihar",
  "Haryana",
  "Odisha",
  "Madhya Pradesh",
  "Gujarat",
  "Kerala",
  "Andhra Pradesh",
  "Telangana",
];

export default function SchemeRecommender({
  initialData,
  onProceedToCalculator,
}: SchemeRecommenderProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSC, setIsSC] = useState<boolean | null>(initialData?.isSC ?? null);
  const [familyIncome, setFamilyIncome] = useState<number | "">(
    initialData?.familyIncome ?? "",
  );
  const [age, setAge] = useState<number | "">(initialData?.age ?? "");
  const [gender, setGender] = useState<"Female" | "Male" | "Transgender" | "">(
    initialData?.gender ?? "",
  );
  const [purpose, setPurpose] = useState<"business" | "education" | "">(
    initialData?.purpose ?? "",
  );
  const [businessType, setBusinessType] = useState<string>(
    initialData?.businessType ?? "",
  );
  const [projectCost, setProjectCost] = useState<number | "">(
    initialData?.projectCost ?? "",
  );
  const [educationCourseType, setEducationCourseType] = useState<string>(
    initialData?.educationCourseType ?? "",
  );
  const [educationCost, setEducationCost] = useState<number | "">(
    initialData?.educationCost ?? "",
  );
  const [state, setState] = useState<string>(initialData?.state ?? "");
  const [areaType, setAreaType] = useState<"Urban" | "Rural" | "">(
    initialData?.areaType ?? "",
  );

  // Derive rule outcome
  const incomeNum = typeof familyIncome === "number" ? familyIncome : 0;
  const ageNum = typeof age === "number" ? age : 28;
  const projectCostNum = typeof projectCost === "number" ? projectCost : 0;
  const eduCostNum = typeof educationCost === "number" ? educationCost : 0;

  const formComplete =
    isSC !== null &&
    familyIncome !== "" &&
    age !== "" &&
    gender !== "" &&
    purpose !== "" &&
    state !== "" &&
    areaType !== "" &&
    (purpose === "business"
      ? businessType !== "" && projectCost !== ""
      : educationCourseType !== "" && educationCost !== "");

  // Eligibility evaluation
  let matchResult: RecommenderResult;

  if (isSC === false) {
    matchResult = {
      eligible: false,
      ineligibleReason:
        "NSFDC concessional credit schemes are strictly reserved for Scheduled Caste (SC) beneficiaries as mandated by the Ministry of Social Justice and Empowerment.",
      totalCost: 0,
      eligibleLoanAmount: 0,
      beneficiaryContribution: 0,
      fundingCoveragePercent: 0,
      interestRateRange: "N/A",
      matchExplanation: "Not eligible under NSFDC target beneficiary criteria.",
      userInputs: {
        isSC: false,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: purpose || "business",
        businessType: purpose === "business" ? businessType : undefined,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  } else if (incomeNum > 500000) {
    matchResult = {
      eligible: false,
      ineligibleReason:
        "Annual family income exceeds ₹5,00,000. Under NSFDC scheme guidelines, only SC beneficiaries with household income up to ₹5.00 Lakh per annum are eligible for concessional credit.",
      totalCost: 0,
      eligibleLoanAmount: 0,
      beneficiaryContribution: 0,
      fundingCoveragePercent: 0,
      interestRateRange: "N/A",
      matchExplanation: "Not eligible: Income exceeds the statutory ₹5,00,000 ceiling.",
      userInputs: {
        isSC: true,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: purpose || "business",
        businessType: purpose === "business" ? businessType : undefined,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  } else if (purpose === "business" && projectCostNum > 5000000) {
    matchResult = {
      eligible: false,
      ineligibleReason:
        "Project cost exceeds ₹50,00,000. The maximum funding ceiling under NSFDC credit schemes (Term Loan Scheme) is ₹50 Lakh. Projects above this limit are not eligible under NSFDC.",
      totalCost: projectCostNum,
      eligibleLoanAmount: 0,
      beneficiaryContribution: 0,
      fundingCoveragePercent: 0,
      interestRateRange: "N/A",
      matchExplanation: "Project cost exceeds maximum NSFDC scheme limits (₹50,00,000).",
      userInputs: {
        isSC: true,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: purpose || "business",
        businessType,
        projectCost: projectCostNum,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  } else if (purpose === "education") {
    const scheme = getScheme("educational-loan-scheme")!;
    const cost = eduCostNum > 0 ? eduCostNum : 300000;
    // covers up to 90%
    const loanAmount = Math.round(cost * 0.9);
    const ownContribution = Math.round(cost * 0.1);

    matchResult = {
      eligible: true,
      scheme,
      totalCost: cost,
      eligibleLoanAmount: loanAmount,
      beneficiaryContribution: ownContribution,
      fundingCoveragePercent: 90,
      interestRateRange: "6.5% – 15.0% p.a. (concessional)",
      matchExplanation:
        "Matched because purpose is higher education. The Educational Loan Scheme finances up to 90% of admission, tuition, and hostel expenses with moratorium throughout the study period.",
      userInputs: {
        isSC: true,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: "education",
        educationCourseType,
        educationCost: cost,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  } else if (purpose === "business" && projectCostNum <= 140000) {
    const scheme = getScheme("micro-finance-scheme")!;
    const cost = projectCostNum > 0 ? projectCostNum : 120000;
    const loanAmount = Math.min(Math.round(cost * 0.9), 140000);
    const ownContribution = cost - loanAmount;

    matchResult = {
      eligible: true,
      scheme,
      totalCost: cost,
      eligibleLoanAmount: loanAmount,
      beneficiaryContribution: ownContribution,
      fundingCoveragePercent: 90,
      interestRateRange: "6.5% – 8.0% p.a. (~6.5% typical)",
      matchExplanation: `Matched because project cost (₹${cost.toLocaleString(
        "en-IN",
      )}) is within the ₹1,40,000 Micro Finance Scheme ceiling, delivered through NBFC-MFIs without collateral.`,
      userInputs: {
        isSC: true,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: "business",
        businessType,
        projectCost: cost,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  } else {
    // business > 140000 and <= 5000000
    const scheme = getScheme("term-loan-scheme")!;
    const cost = projectCostNum > 0 ? projectCostNum : 1000000;
    const loanAmount = Math.min(Math.round(cost * 0.9), 5000000);
    const ownContribution = cost - loanAmount;

    matchResult = {
      eligible: true,
      scheme,
      totalCost: cost,
      eligibleLoanAmount: loanAmount,
      beneficiaryContribution: ownContribution,
      fundingCoveragePercent: 90,
      interestRateRange: "6.5% – 10.0% p.a. (~7.5% typical)",
      matchExplanation: `Matched because project cost (₹${cost.toLocaleString(
        "en-IN",
      )}) is above ₹1.4 Lakh and within the ₹50 Lakh Term Loan Scheme limit for enterprise setup and machinery.`,
      userInputs: {
        isSC: true,
        familyIncome: incomeNum,
        age: ageNum,
        gender: gender || "Male",
        purpose: "business",
        businessType,
        projectCost: cost,
        state: state || "Delhi",
        areaType: areaType || "Urban",
      },
    };
  }

  const alternativeScheme =
    purpose === "education"
      ? getScheme("term-loan-scheme")!
      : matchResult.scheme?.slug === "micro-finance-scheme"
      ? getScheme("term-loan-scheme")!
      : getScheme("micro-finance-scheme")!;

  const alternativeMatchPercent =
    purpose === "education"
      ? 78
      : alternativeScheme.slug === "micro-finance-scheme"
      ? (projectCostNum <= 140000 ? 86 : 58)
      : (projectCostNum <= 140000 ? 72 : 88);

  const alternativeLoanAmount =
    purpose === "education"
      ? Math.round((eduCostNum || 300000) * 0.9)
      : alternativeScheme.slug === "micro-finance-scheme"
      ? Math.min(Math.round((projectCostNum || 120000) * 0.9), 140000)
      : Math.min(Math.round((projectCostNum || 1000000) * 0.9), 5000000);

  const alternativeCost =
    purpose === "education" ? (eduCostNum || 300000) : (projectCostNum || 1000000);
  const alternativeContribution = Math.max(0, alternativeCost - alternativeLoanAmount);
  const alternativeRate =
    alternativeScheme.slug === "micro-finance-scheme"
      ? "6.5% – 8.0% p.a. (~6.5% typical)"
      : purpose === "education"
      ? "6.5% – 10.0% p.a. (concessional)"
      : "6.5% – 10.0% p.a. (~7.5% typical)";

  return (
    <div className="space-y-8">
      {/* Questionnaire Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="border-b border-border/80 pb-4">
          <span className="inline-flex items-center rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">
            Strict Rule-Based Recommender
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
            Eligibility & Scheme Discovery
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Provide your family profile and funding requirement. We evaluate statutory NSFDC credit
            rules instantly.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {/* Input 1: SC Beneficiary Status */}
          <div>
            <label className="block text-sm font-semibold text-foreground">
              1. Do you belong to the Scheduled Caste (SC) category?{" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-muted-foreground">
              NSFDC credit is exclusively reserved for SC beneficiaries holding a valid caste
              certificate.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:max-w-md">
              <button
                type="button"
                onClick={() => setIsSC(true)}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                  isSC === true
                    ? "border-leaf bg-leaf/10 text-foreground ring-2 ring-leaf/20"
                    : "border-border bg-background text-foreground/80 hover:bg-muted"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSC === true ? "border-leaf bg-leaf text-white" : "border-border"
                  }`}
                >
                  {isSC === true && "✓"}
                </span>
                Yes, SC Beneficiary
              </button>

              <button
                type="button"
                onClick={() => setIsSC(false)}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                  isSC === false
                    ? "border-destructive bg-destructive/10 text-foreground ring-2 ring-destructive/20"
                    : "border-border bg-background text-foreground/80 hover:bg-muted"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSC === false ? "border-destructive bg-destructive text-white" : "border-border"
                  }`}
                >
                  {isSC === false && "✕"}
                </span>
                No (Other Category)
              </button>
            </div>
          </div>

          {/* Input 2: Annual Family Income */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="income-input" className="block text-sm font-semibold text-foreground">
                2. Annual Family Income (₹) <span className="text-red-500">*</span>
              </label>
              <span className="text-xs font-semibold text-muted-foreground">
                Ceiling: ≤ ₹5,00,000
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Total gross income from all sources of all family members.
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                  ₹
                </span>
                <input
                  id="income-input"
                  type="number"
                  min="0"
                  step="10000"
                  value={familyIncome}
                  onChange={(e) =>
                    setFamilyIncome(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-input bg-background py-3 pl-8 pr-4 text-sm font-medium text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  placeholder="e.g. 300000"
                />
              </div>

              {/* Quick Select Income Chips */}
              <div className="flex flex-wrap gap-2">
                {[150000, 300000, 480000, 600000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFamilyIncome(amt)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                      familyIncome === amt
                        ? "border-saffron bg-saffron/10 text-saffron font-bold"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    ₹{(amt / 100000).toFixed(1)}L {amt > 500000 && "(Exceeds)"}
                  </button>
                ))}
              </div>
            </div>

            {incomeNum > 500000 && (
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs font-semibold text-red-700">
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Income exceeds the ₹5,00,000 threshold for NSFDC schemes.
              </div>
            )}
          </div>

          {/* Input 3: Age & Gender */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="age-input" className="block text-sm font-semibold text-foreground">
                  3. Applicant Age (Years) <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-muted-foreground">Min. 18 Years</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter primary borrower age (18–60 typical).
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="age-input"
                  type="number"
                  min="18"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background py-3 px-4 text-sm font-medium text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  placeholder="e.g. 28"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground">
                4. Gender <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-muted-foreground">
                NSFDC provides Mahila Samriddhi incentives for women.
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["Female", "Male", "Transgender"] as const).map((g) => {
                  const selected = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 px-2 text-xs font-semibold transition ${
                        selected
                          ? "border-leaf bg-leaf/10 text-foreground ring-2 ring-leaf/20 shadow-xs"
                          : "border-border bg-background text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
                          selected ? "border-leaf bg-leaf text-white" : "border-border"
                        }`}
                      >
                        {selected && "✓"}
                      </span>
                      {g}
                    </button>
                  );
                })}
              </div>
              {gender === "Female" && (
                <div className="mt-2 rounded-lg bg-leaf/10 p-2 text-[11px] text-leaf font-medium">
                  ✦ Special concessional interest rebate & Mahila Samriddhi priority apply.
                </div>
              )}
            </div>
          </div>

          {/* Input 5: Purpose */}
          <div>
            <label className="block text-sm font-semibold text-foreground">
              5. Purpose of Credit <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-muted-foreground">
              Choose whether you are establishing/expanding an enterprise or pursuing education.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPurpose("business")}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  purpose === "business"
                    ? "border-saffron bg-saffron/10 ring-2 ring-saffron/20"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    purpose === "business"
                      ? "border-saffron bg-saffron text-white"
                      : "border-border"
                  }`}
                >
                  {purpose === "business" && "●"}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Business / Project Finance</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Micro enterprises, machinery, trading, service units or manufacturing.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPurpose("education")}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  purpose === "education"
                    ? "border-leaf bg-leaf/10 ring-2 ring-leaf/20"
                    : "border-border bg-background hover:bg-muted"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    purpose === "education"
                      ? "border-leaf bg-leaf text-white"
                      : "border-border"
                  }`}
                >
                  {purpose === "education" && "●"}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Higher Education</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    College admission, technical/professional degrees, or study abroad.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Input 6: Business Details & Project Cost */}
          {purpose === "business" && (
            <div className="space-y-4 rounded-xl border border-border/80 bg-muted/30 p-4">
              <div>
                <label className="block text-sm font-semibold text-foreground">
                  Type of Business You Want to Expand / Start <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">
                  Select your enterprise activity or sector.
                </p>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                >
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="project-cost"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Estimated Total Project Cost (₹) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-muted-foreground">
                    Micro: ≤ ₹1.4L | Term Loan: ≤ ₹50L
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Combined capital requirements (equipment, raw material, working capital).
                </p>

                <div className="mt-3">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                      ₹
                    </span>
                    <input
                      id="project-cost"
                      type="number"
                      min="10000"
                      step="10000"
                      value={projectCost}
                      onChange={(e) =>
                        setProjectCost(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      className="w-full rounded-xl border border-input bg-background py-3 pl-8 pr-4 text-sm font-medium text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                      placeholder="e.g. 120000"
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {[80000, 140000, 500000, 1500000, 5000000, 6000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setProjectCost(amt)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                          projectCost === amt
                            ? "border-saffron bg-saffron/10 text-saffron font-bold"
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {amt <= 140000 ? `₹${amt / 1000}k` : `₹${amt / 100000}L`}{" "}
                        {amt <= 140000 ? "(Micro)" : amt <= 5000000 ? "(Term)" : "(Exceeds)"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Input 7: Education Course Type & Fee */}
          {purpose === "education" && (
            <div className="space-y-4 rounded-xl border border-border/80 bg-muted/30 p-4">
              <div>
                <label className="block text-sm font-semibold text-foreground">
                  Course Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={educationCourseType}
                  onChange={(e) => setEducationCourseType(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                >
                  {educationCourseTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="edu-cost"
                  className="block text-sm font-semibold text-foreground"
                >
                  Estimated Total Educational Cost / Fee (₹) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">
                  Tuition, examination, books, equipment, and hostel fees for the entire duration.
                </p>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                    ₹
                  </span>
                  <input
                    id="edu-cost"
                    type="number"
                    min="10000"
                    step="25000"
                    value={educationCost}
                    onChange={(e) =>
                      setEducationCost(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-input bg-background py-3 pl-8 pr-4 text-sm font-medium text-foreground outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"
                    placeholder="e.g. 400000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* State & Area Selection */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-foreground">
                Beneficiary State / Region
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
              >
                <option value="" disabled>Select state / region</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground">
                Area Type (Urban / Rural)
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["Urban", "Rural"] as const).map((type) => {
                  const selected = areaType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAreaType(type)}
                      className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 px-3 text-sm font-semibold transition ${
                        selected
                          ? "border-saffron bg-saffron/10 text-saffron ring-2 ring-saffron/20 shadow-xs"
                          : "border-border bg-background text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${
                          selected ? "border-saffron bg-saffron text-white" : "border-border"
                        }`}
                      >
                        {selected ? "✓" : ""}
                      </span>
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!formComplete}
          onClick={() => setSubmitted(true)}
          className="rounded-xl bg-saffron px-6 py-3 text-sm font-bold text-saffron-foreground shadow-md transition hover:bg-saffron/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit & Find My Scheme
        </button>
      </div>

      {/* Outcome Recommendation Box */}
      {submitted && formComplete && (matchResult.eligible && matchResult.scheme ? (
        <>
        <div className="overflow-hidden rounded-2xl border-2 border-leaf bg-card shadow-md transition-all">
          <div className="bg-leaf px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-leaf">
                100% Match
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">{matchResult.scheme.name}</h3>
            <p className="mt-1 text-sm text-white/90">{matchResult.scheme.tagline}</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Financial Parameters Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Funding Coverage
                </span>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  Up to {matchResult.fundingCoveragePercent}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  NSFDC covers up to 90% (₹{matchResult.eligibleLoanAmount.toLocaleString("en-IN")})
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Own Contribution
                </span>
                <p className="mt-1 text-2xl font-bold text-saffron">
                  ₹{matchResult.beneficiaryContribution.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  10%+ margin money funded by beneficiary
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Concessional Rate
                </span>
                <p className="mt-1 text-xl font-bold text-navy">
                  {matchResult.interestRateRange}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Subsidized rate for SC beneficiaries
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to={`/scheme/${matchResult.scheme.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-xs transition hover:bg-muted"
                >
                  View Details
                  <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>

                <a
                  href={matchResult.scheme.applyLinks[0]?.href || "https://nsfdc.nic.in/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-leaf/40 bg-leaf/10 px-4 py-3 text-sm font-semibold text-leaf transition hover:bg-leaf/20"
                >
                  Apply on Official Portal
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>

              <button
                type="button"
                onClick={() => onProceedToCalculator(matchResult)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-saffron px-5 py-3 text-sm font-bold text-saffron-foreground shadow-md transition-all hover:bg-saffron/90 hover:shadow-lg"
              >
                Proceed to Scheme-Specific EMI Calculator
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Second Recommended Scheme */}
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-border bg-card shadow-md transition-all">
          <div className="bg-navy px-6 py-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-navy">
                {alternativeMatchPercent}% Match
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">{alternativeScheme.name}</h3>
            <p className="mt-1 text-sm text-white/90">{alternativeScheme.tagline}</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Funding Coverage
                </span>
                <p className="mt-1 text-2xl font-bold text-foreground">Up to 90%</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Indicative eligible loan: ₹{alternativeLoanAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Own Contribution
                </span>
                <p className="mt-1 text-2xl font-bold text-saffron">
                  ₹{alternativeContribution.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Indicative beneficiary margin
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  Concessional Rate
                </span>
                <p className="mt-1 text-xl font-bold text-navy">{alternativeRate}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Indicative scheme rate
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to={`/scheme/${alternativeScheme.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-xs transition hover:bg-muted"
              >
                View Details
                <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a
                href={alternativeScheme.applyLinks[0]?.href || "https://nsfdc.nic.in/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-leaf/40 bg-leaf/10 px-4 py-3 text-sm font-semibold text-leaf transition hover:bg-leaf/20"
              >
                Apply on Official Portal
              </a>
            </div>
          </div>
        </div>
        </>
      ) : (
        /* Ineligible State */
        <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-destructive">
                Not Eligible Under This Scheme
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                Preliminary Criteria Not Met
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {matchResult.ineligibleReason}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSC(null);
                    setFamilyIncome("");
                    setAge("");
                    setGender("");
                    setPurpose("");
                    setBusinessType("");
                    setProjectCost("");
                    setEducationCourseType("");
                    setEducationCost("");
                    setState("");
                    setAreaType("");
                    setSubmitted(false);
                  }}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-muted"
                >
                  Start Over
                </button>
                <Link
                  to="/schemes"
                  className="text-xs font-semibold text-saffron underline hover:text-saffron/80"
                >
                  Browse General Scheme Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
      )}

      {/* Secondary Directory Notice */}
      <div className="flex items-center justify-between rounded-xl border border-border/80 bg-background/50 p-4 text-xs text-muted-foreground">
        <span>
          Looking for general information? SchemeSaarthi focuses strictly on the 3 core credit
          products.
        </span>
        <Link to="/schemes" className="font-semibold text-saffron underline hover:text-saffron/80">
          View Secondary Scheme Directory →
        </Link>
      </div>
    </div>
  );
}
