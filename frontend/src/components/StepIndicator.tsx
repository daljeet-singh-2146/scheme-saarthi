interface StepIndicatorProps {
  currentStep: number;
  maxStepReached: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  { step: 1, title: "Eligibility & Match", subtitle: "Rule-based check" },
  { step: 2, title: "EMI Calculator", subtitle: "Scheme-specific terms" },
  { step: 3, title: "Partner Locator", subtitle: "Geo & health filter" },
  { step: 4, title: "Summary & Review", subtitle: "Pre-filled handoff" },
];

export default function StepIndicator({
  currentStep,
  maxStepReached,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-4xl px-2">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
            {steps.map((item) => {
              const isCompleted = item.step < currentStep;
              const isCurrent = item.step === currentStep;
              const isClickable = item.step <= maxStepReached && onStepClick;

              return (
                <li key={item.step} className="relative">
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onStepClick(item.step)}
                    className={`group flex w-full flex-col rounded-xl border p-3 text-left transition-all ${
                      isCurrent
                        ? "border-saffron bg-saffron/10 shadow-sm"
                        : isCompleted
                        ? "border-leaf/40 bg-leaf/5 hover:border-leaf"
                        : "border-border/70 bg-card/60 opacity-60"
                    } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          isCompleted
                            ? "bg-leaf text-white"
                            : isCurrent
                            ? "bg-saffron text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          item.step
                        )}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isCurrent
                            ? "text-saffron"
                            : isCompleted
                            ? "text-leaf"
                            : "text-muted-foreground"
                        }`}
                      >
                        Step {item.step}
                      </span>
                    </div>
                    <span className="mt-2 text-xs font-bold text-foreground sm:text-sm line-clamp-1">
                      {item.title}
                    </span>
                    <span className="hidden text-[11px] text-muted-foreground sm:block">
                      {item.subtitle}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
