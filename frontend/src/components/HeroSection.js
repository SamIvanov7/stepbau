import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, FileText } from 'lucide-react';

const HERO_BG = "https://images.pexels.com/photos/6474313/pexels-photo-6474313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center" data-testid="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Construction site"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/75" />
        {/* Subtle teal gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 md:pt-32">
        <div className="max-w-3xl">
          {/* Accent line */}
          <div className="w-16 h-0.5 bg-[#00b4d8] mb-8" />

          <h1 className="font-black tracking-tight leading-[1.05]" data-testid="hero-title">
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
              {t('hero_title_line1')}
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#00b4d8] mt-2">
              {t('hero_title_line2')}
            </span>
          </h1>

          <div className="mt-8 space-y-2">
            <p className="text-base md:text-lg text-zinc-300 font-light tracking-wide" data-testid="hero-subtitle">
              {t('hero_subtitle')}
            </p>
            <p className="text-sm text-zinc-500 font-mono tracking-wider uppercase" data-testid="hero-location">
              {t('hero_location')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <a
              href="tel:+4917641810937"
              className="inline-flex items-center justify-center gap-3 bg-[#00b4d8] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#0096c7] transition-all hover:shadow-[0_0_30px_rgba(0,180,216,0.4)]"
              data-testid="hero-call-btn"
            >
              <Phone className="w-4 h-4" />
              {t('hero_cta_call')}
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center gap-3 bg-transparent border border-[#00b4d8] text-[#00b4d8] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#00b4d8] hover:text-white transition-all"
              data-testid="hero-request-btn"
            >
              <FileText className="w-4 h-4" />
              {t('hero_cta_request')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#00b4d8] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
