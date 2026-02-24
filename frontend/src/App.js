import "@/App.css";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import PortfolioSection from '@/components/PortfolioSection';
import CoverageSection from '@/components/CoverageSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

function App() {
  return (
    <LanguageProvider>
      <div className="noise-bg min-h-screen bg-[#0a0a0a]">
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
            },
          }}
        />
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WhyUsSection />
          <PortfolioSection />
          <CoverageSection />
          <ContactSection />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LanguageProvider>
  );
}

export default App;
