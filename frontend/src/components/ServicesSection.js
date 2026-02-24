import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Layers, PaintBucket, Grid3X3, Wrench, Building2, Home } from 'lucide-react';

const services = [
  { key: 1, icon: Layers, color: '#10b981' },
  { key: 2, icon: PaintBucket, color: '#34d399' },
  { key: 3, icon: Grid3X3, color: '#10b981' },
  { key: 4, icon: Wrench, color: '#34d399' },
  { key: 5, icon: Building2, color: '#10b981' },
  { key: 6, icon: Home, color: '#34d399' },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0f0f0f]" data-testid="services-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="animate-on-scroll mb-16">
          <p className="text-xs font-mono text-[#10b981] tracking-[0.3em] uppercase mb-4">{t('nav_services')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" data-testid="services-title">
            {t('services_title')}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {services.map(({ key, icon: Icon, color }) => (
            <div
              key={key}
              className="animate-on-scroll group relative bg-[#111111] border border-white/10 p-8 hover:border-[#34d399] hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all duration-500 overflow-hidden cursor-default"
              data-testid={`service-card-${key}`}
            >
              {/* Hover gradient trace */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#34d399]/5 to-transparent" />

              {/* Number */}
              <span className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] leading-none select-none">
                0{key}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 mb-6 group-hover:border-[#34d399]/50 transition-all duration-300">
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {t(`service_${key}_title`)}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {t(`service_${key}_items`).split(', ').map((item, i) => (
                    <span key={i} className="text-xs text-zinc-500 bg-white/5 px-3 py-1 font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
