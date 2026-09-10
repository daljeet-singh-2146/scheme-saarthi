import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "User";
    localStorage.setItem("schemeSaarthiLoggedIn", "true");
    localStorage.setItem("schemeSaarthiUserName", name);
    navigate("/");
  };
  return <div className="bg-soft-hero"><div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6"><div className="rounded-2xl border border-border bg-card p-8 shadow-sm"><div className="text-center"><img src={logo} alt="SchemeSaarthi" className="mx-auto h-14 w-auto object-contain"/><h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground">Welcome back</h1><p className="mt-2 text-sm text-muted-foreground">Sign in to save matches and track your applications.</p></div><form className="mt-6 space-y-4" onSubmit={submit}><div><label className="text-sm font-medium text-foreground">Email or mobile</label><input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="you@example.com" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-saffron focus:ring-2 focus:ring-saffron/20"/></div><div><label className="text-sm font-medium text-foreground">Password</label><input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-saffron focus:ring-2 focus:ring-saffron/20"/></div><button type="submit" className="w-full rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-saffron-foreground transition-colors hover:bg-saffron/90">Sign in</button></form><p className="mt-6 text-center text-sm text-muted-foreground">New to SchemeSaarthi? <Link to="/register" className="font-medium text-saffron hover:underline">Register</Link></p></div></div></div>;
}
export default LoginPage;
