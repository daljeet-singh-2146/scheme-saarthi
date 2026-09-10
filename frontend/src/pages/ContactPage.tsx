import { useState } from "react";

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-soft-hero">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact us
            </h1>
            <p className="mt-3 text-muted-foreground">
              Questions, feedback or a scheme you'd like us to add? Send us a message
              and we'll get back to you.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-saffron/10 text-saffron">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">support@schemesaarthi.in</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy/10 text-navy">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Helpline</p>
                  <p className="text-sm text-muted-foreground">+91 9897969594</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-leaf/10 text-leaf">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Disclaimer</p>
                  <p className="text-sm text-muted-foreground">B No. 1/3, Main Road, New Delhi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-leaf/15 text-leaf">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-foreground">Message sent</h2>
                <p className="mt-2 text-sm text-muted-foreground">We'll get back to you shortly.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm font-semibold text-saffron hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <input
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-saffron px-4 py-3 text-sm font-semibold text-saffron-foreground transition-colors hover:bg-saffron/90"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
