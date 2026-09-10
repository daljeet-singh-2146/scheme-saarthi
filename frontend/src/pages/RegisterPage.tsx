import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function RegisterPage() {
  return (
    <div className="bg-soft-hero">
      <div className="mx-auto flex max-w-md flex-col px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="text-center"><img src={logo} alt="SchemeSaarthi" className="mx-auto h-14 w-auto object-contain" /><h1 className="mt-4 font-display text-2xl font-bold text-foreground">Create your account</h1><p className="mt-2 text-sm text-muted-foreground">Save your scheme matches and track applications in one place.</p></div>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block text-sm font-medium text-foreground">Full name<input required type="text" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5" /></label>
            <label className="block text-sm font-medium text-foreground">Mobile number<input required type="tel" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5" /></label>
            <label className="block text-sm font-medium text-foreground">Email<input required type="email" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5" /></label>
            <label className="block text-sm font-medium text-foreground">Password<input required type="password" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5" /></label>
            <label className="block text-sm font-medium text-foreground">Confirm password<input required type="password" className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5" /></label>
            <button type="submit" className="w-full rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-saffron-foreground">Create account</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Already registered? <Link to="/login" className="font-medium text-saffron hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
