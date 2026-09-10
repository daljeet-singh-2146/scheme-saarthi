import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FindSchemePage from './pages/FindSchemePage';
import SchemesPage from './pages/SchemesPage';
import SchemeDetailsPage from './pages/SchemeDetailsPage';
import CalculatorPage from './pages/CalculatorPage';
import PartnersPage from './pages/PartnersPage';
import TrackApplicationPage from './pages/TrackApplicationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FaqsPage from './pages/FaqsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

function NotFound() { return <div className="mx-auto min-h-[70vh] max-w-3xl px-4 py-24 text-center"><h1 className="font-display text-5xl font-bold text-saffron">404</h1><p className="mt-3 text-muted-foreground">Page not found.</p></div>; }

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return <div className="min-h-screen bg-background text-foreground"><ScrollToTop /><Navbar /><main><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/find-scheme" element={<FindSchemePage />} />
    <Route path="/schemes" element={<SchemesPage />} />
    <Route path="/scheme/:slug" element={<SchemeDetailsPage />} />
    <Route path="/calculator" element={<CalculatorPage />} />
    <Route path="/partners" element={<PartnersPage />} />
    <Route path="/track-application" element={<TrackApplicationPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/faqs" element={<FaqsPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    <Route path="/terms" element={<TermsPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes></main>{!hideFooter && <Footer />}</div>;
}
