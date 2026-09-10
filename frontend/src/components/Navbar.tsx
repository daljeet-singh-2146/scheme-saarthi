import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/language";
import logo from "../assets/logo.png";
import profileIcon from "../assets/profile-icon.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Schemes", to: "/schemes" },
  { label: "Calculator", to: "/calculator" },
  { label: "Partners", to: "/partners" },
  { label: "Track Application", to: "/track-application" },
];

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src={logo} alt="SchemeSaarthi" className="h-11 w-auto object-contain" />
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="text-black">Scheme</span><span className="text-saffron">Saarthi</span>
      </span>
    </Link>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Select language</span>
      <svg className="pointer-events-none absolute left-2.5 text-muted-foreground" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
      <select value={language} onChange={(event) => setLanguage(event.target.value as "en" | "hi")} className="h-9 appearance-none rounded-lg border border-border bg-card py-1 pl-8 pr-7 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-saffron/20">
        <option value="en">English</option><option value="hi">हिन्दी</option>
      </select>
      <svg className="pointer-events-none absolute right-2 text-muted-foreground" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
    </label>
  );
}

function ProfileMenu({ mobile = false, closeMenu }: { mobile?: boolean; closeMenu?: () => void }) {
  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const name = localStorage.getItem("schemeSaarthiUserName") || "User";

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("schemeSaarthiLoggedIn");
    localStorage.removeItem("schemeSaarthiUserName");
    setShow(false);
    closeMenu?.();
    navigate("/");
  };

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`} ref={menuRef}>
      <button type="button" onClick={() => setShow((value) => !value)} className={mobile ? "flex w-full items-center gap-3 rounded-lg border border-border bg-white px-3.5 py-2 text-left text-sm font-medium" : "grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-foreground shadow-sm hover:border-saffron"} aria-label="Open profile menu">
        <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full">
          <img src={profileIcon} alt="" className="h-6 w-6 object-contain" />
        </span>
        {mobile && <span>{name}</span>}
      </button>
      {show && (
        <div className={mobile ? "mt-2 rounded-xl border border-border bg-card p-2 shadow-lg" : "absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg"}>
          <div className="border-b border-border px-3 py-2.5"><p className="text-sm font-semibold">{name}</p></div>
          <Link to="/track-application" onClick={() => { setShow(false); closeMenu?.(); }} className="block rounded-lg px-3 py-2 text-sm hover:bg-muted">My applications</Link>
          <Link to="/schemes" onClick={() => { setShow(false); closeMenu?.(); }} className="block rounded-lg px-3 py-2 text-sm hover:bg-muted">Saved schemes</Link>
          <Link to="/contact" onClick={() => { setShow(false); closeMenu?.(); }} className="block rounded-lg px-3 py-2 text-sm hover:bg-muted">Help & support</Link>
          <button type="button" onClick={logout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-5"/></svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const loggedIn = localStorage.getItem("schemeSaarthiLoggedIn") === "true";

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => <Link key={link.to} to={link.to} className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${location.pathname === link.to ? "bg-saffron/10 text-saffron" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}>{link.label}</Link>)}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector />
          {loggedIn ? <ProfileMenu /> : <Link to="/login" className="rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">Login</Link>}
          <Link to="/find-scheme" className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-saffron-foreground shadow-sm transition-all hover:bg-saffron/90 hover:shadow-md">Find My Scheme</Link>
        </div>
        <button type="button" onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground lg:hidden" aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></> : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>}</svg>
        </button>
      </nav>
      {open && <div className="border-t border-border bg-background lg:hidden"><div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
        {navLinks.map((link) => <Link key={link.to} to={link.to} className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${location.pathname === link.to ? "bg-saffron/10 text-saffron" : "text-foreground/80 hover:bg-muted"}`}>{link.label}</Link>)}
        <div className="flex items-center justify-between gap-3 pt-3"><LanguageSelector />{loggedIn ? <ProfileMenu mobile closeMenu={() => setOpen(false)} /> : <Link to="/login" className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground">Login</Link>}</div>
        <Link to="/find-scheme" className="mt-2 block rounded-lg bg-saffron px-4 py-2.5 text-center text-sm font-semibold text-saffron-foreground">Find My Scheme</Link>
      </div></div>}
    </header>
  );
}
