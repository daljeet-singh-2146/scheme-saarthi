import { useState } from "react";
import { Link } from "react-router-dom";

const stages = [
  { label: "Application submitted", done: true },
  { label: "Documents under review", done: true },
  { label: "Eligibility verification", done: true },
  { label: "Agency approval", done: false },
  { label: "Disbursal", done: false },
];

function TrackApplicationPage() {
  const [refId, setRefId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Track your application
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter the reference ID you received from the official channel partner to
            view the status of your scheme application.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (refId.trim()) setSubmitted(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              placeholder="e.g. SCH-2026-008412"
              className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-saffron px-5 py-3 text-sm font-semibold text-saffron-foreground hover:bg-saffron/90"
            >
              Track status
            </button>
          </form>

          {submitted && (
            <div className="mt-6">
              <div className="flex items-center justify-between rounded-xl bg-muted p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Reference ID</p>
                  <p className="font-display text-lg font-bold text-foreground">{refId || "SCH-2026-008412"}</p>
                </div>
                <span className="rounded-full bg-saffron/10 px-3 py-1 text-xs font-semibold text-saffron">In progress</span>
              </div>

              <ol className="mt-6 space-y-4">
                {stages.map((stage, i) => (
                  <li key={stage.label} className="flex items-center gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        stage.done ? "bg-leaf text-leaf-foreground" : "border-2 border-dashed border-border bg-background"
                      }`}
                    >
                      {stage.done ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4" /></svg>
                      ) : (
                        <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                      )}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${stage.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {stage.label}
                      </p>
                      {i === 2 && <p className="text-xs text-leaf">Completed on 28 Aug 2026</p>}
                      {i === 3 && <p className="text-xs text-muted-foreground">Awaiting agency response</p>}
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-6 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                SchemeSaarthi shows status reported by the channel partner. Final
                approval and disbursal are handled by the authorized government agency.
              </p>
            </div>
          )}

          {!submitted && (
            <p className="mt-4 text-xs text-muted-foreground">
              Don't have a reference ID?{" "}
              <Link to="/find-scheme" className="font-medium text-saffron hover:underline">
                Find a scheme to apply
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackApplicationPage;
