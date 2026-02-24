import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock, Sparkles, Users, MapPin, Handshake } from 'lucide-react';

const reasons = [
  { key: 1, icon: Clock },
  { key: 2, icon: Sparkles },
  { key: 3, icon: Users },
  { key: 4, icon: MapPin },
  { key: 5, icon: Handshake },
];

export default function WhyUsSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="why" className="relative py-24 md:py-32 bg-[#0a0a0a]" data-testid="why-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="animate-on-scroll mb-16">
          <p className="text-xs font-mono text-[#10b981] tracking-[0.3em] uppercase mb-4">{t('nav_why')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" data-testid="why-title">
            {t('why_title')}
          </h2>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {reasons.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="animate-on-scroll group relative"
              data-testid={`why-item-${key}`}
            >
              <div className="flex gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-5xl font-black text-[#2dd4bf]/20 group-hover:text-[#2dd4bf]/40 transition-colors duration-300 font-mono leading-none">
                    0{key}
                  </span>
                </div>

                {/* Content */}
                <div className="border-l-2 border-[#2dd4bf]/30 pl-6 group-hover:border-[#2dd4bf] transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-4 h-4 text-[#10b981]" />
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {t(`why_${key}`)}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {t(`why_${key}_desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
