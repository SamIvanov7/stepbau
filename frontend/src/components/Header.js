import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_bau-partner-de/artifacts/ucc8647d_stepbau_logo.png";

const navLinks = [
  { key: 'nav_about', href: '#about' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_why', href: '#why' },
  { key: 'nav_area', href: '#coverage' },
  { key: 'nav_contact', href: '#contact' },
];

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" onClick={() => handleNavClick('#hero')} className="flex items-center gap-3" data-testid="header-logo">
          <img src={LOGO_URL} alt="STEPBAU Logo" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase"
              data-testid={`nav-${link.key}`}
            >
              {t(link.key)}
            </button>
          ))}
        </nav>

        {/* Right side: Lang toggle + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-[#10b981] transition-colors border border-white/10 px-3 py-1.5 hover:border-[#10b981]/50"
            data-testid="lang-toggle"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <a
            href="tel:+4917641810937"
            className="flex items-center gap-2 bg-[#10b981] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-[#059669] transition-all hover:shadow-[0_0_20px_rgba(0,180,216,0.4)]"
            data-testid="header-call-btn"
          >
            <Phone className="w-3.5 h-3.5" />
            {t('hero_cta_call')}
          </a>
        </div>

        {/* Mobile: Lang + Hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-[#10b981] transition-colors border border-white/10 px-2 py-1"
            data-testid="lang-toggle-mobile"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="text-white p-2" data-testid="mobile-menu-trigger">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0a] border-l border-white/10 w-72">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col pt-8 gap-1">
                <img src={LOGO_URL} alt="STEPBAU" className="h-12 w-auto mb-8 self-start" />
                {navLinks.map(link => (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-base text-zinc-300 hover:text-[#10b981] py-3 px-2 transition-colors uppercase tracking-wider font-medium border-b border-white/5"
                    data-testid={`mobile-nav-${link.key}`}
                  >
                    {t(link.key)}
                  </button>
                ))}
                <a
                  href="tel:+4917641810937"
                  className="flex items-center justify-center gap-2 bg-[#10b981] text-white px-5 py-3 mt-6 text-sm font-bold uppercase tracking-widest hover:bg-[#059669] transition-all"
                  data-testid="mobile-call-btn"
                >
                  <Phone className="w-4 h-4" />
                  {t('hero_cta_call')}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
