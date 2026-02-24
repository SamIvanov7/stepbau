import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Navigation } from 'lucide-react';

export default function CoverageSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="coverage" className="relative py-24 md:py-32 bg-[#0f0f0f]" data-testid="coverage-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="animate-on-scroll mb-16">
          <p className="text-xs font-mono text-[#00b4d8] tracking-[0.3em] uppercase mb-4">{t('nav_area')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" data-testid="coverage-title">
            {t('coverage_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="animate-on-scroll lg:col-span-2 relative overflow-hidden border border-white/10">
            <iframe
              title="STEPBAU Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.5!2d12.3731!3d51.3397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a6f8c0d4f14a1d%3A0x3c8c14e5c3f2c3e0!2sCranachstra%C3%9Fe%2023%2C%2004177%20Leipzig!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              data-testid="coverage-map"
            />
          </div>

          {/* Info Card */}
          <div className="animate-on-scroll flex flex-col gap-6">
            <div className="bg-[#111111] border border-white/10 p-8 flex-1">
              <p className="text-zinc-300 font-light leading-relaxed mb-8">
                {t('coverage_text')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30">
                    <MapPin className="w-5 h-5 text-[#00b4d8]" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t('coverage_hq')}</p>
                    <p className="text-zinc-500 text-xs font-mono">Cranachstraße 23, 04177</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#2dd4bf]/30">
                    <Navigation className="w-5 h-5 text-[#2dd4bf]" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t('coverage_range')}</p>
                    <p className="text-zinc-500 text-xs font-mono">Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-[#111111] border border-white/10 p-6 flex items-center justify-around">
              <div className="text-center">
                <span className="block text-2xl font-black text-[#00b4d8]">16</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Bundesländer</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="block text-2xl font-black text-[#2dd4bf]">100%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Flexibel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
