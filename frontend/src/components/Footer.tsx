import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const footerLinks = [
  { label: "About", to: "/about" }, { label: "FAQs", to: "/faqs" }, { label: "Privacy Policy", to: "/privacy-policy" }, { label: "Terms", to: "/terms" }, { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return <footer className="border-t border-border bg-cream">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2.5"><img src={logo} alt="SchemeSaarthi" className="h-12 w-auto object-contain" /><span className="font-display text-xl font-bold tracking-tight"><span className="text-black">Scheme</span><span className="text-saffron">Saarthi</span></span></Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">Helping SC beneficiaries (family income ≤ ₹5 lakh) discover NSFDC concessional credit products — Micro Finance, Term Loan and Educational Loan — and connect with authorized Channel Partners.</p>
        </div>
        <div><h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">Quick Links</h3><ul className="mt-4 space-y-2.5">{footerLinks.map((link) => <li key={link.to}><Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-saffron">{link.label}</Link></li>)}</ul></div>
        <div><h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Important Disclaimer</h3><p className="mt-4 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">SchemeSaarthi is an independent guidance platform. Final approval, verification, and disbursal of NSFDC concessional credit is handled solely by the authorized Channel Partners — State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), Regional Rural Banks (RRBs), and NBFC-MFIs. SchemeSaarthi does not guarantee approval or act as a lender.</p></div>
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SchemeSaarthi. For guidance purposes only.</p><div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="inline-block h-2 w-2 rounded-full bg-saffron"/><span className="inline-block h-2 w-2 rounded-full bg-navy"/><span className="inline-block h-2 w-2 rounded-full bg-leaf"/><span className="ml-1">Empowering SC entrepreneurs</span></div></div>
    </div>
  </footer>;
}
