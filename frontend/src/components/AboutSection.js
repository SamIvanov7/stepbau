import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Award, ShieldCheck, Clock, Settings } from 'lucide-react';

const DRYWALL_IMG = "https://images.unsplash.com/photo-1768321916292-ade0ca9c091d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkcnl3YWxsJTIwY29uc3RydWN0aW9uJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzcxOTM3MDAzfDA&ixlib=rb-4.1.0&q=85";

const features = [
  { key: 'about_experience', icon: Award },
  { key: 'about_quality', icon: ShieldCheck },
  { key: 'about_reliability', icon: Clock },
  { key: 'about_flexibility', icon: Settings },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0a0a0a]" data-testid="about-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="animate-on-scroll">
              <p className="text-xs font-mono text-[#10b981] tracking-[0.3em] uppercase mb-4">{t('nav_about')}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-8" data-testid="about-title">
                {t('about_title')}
              </h2>
            </div>

            <div className="space-y-5 animate-on-scroll">
              <p className="text-zinc-300 font-light leading-relaxed">{t('about_text_1')}</p>
              <p className="text-zinc-300 font-light leading-relaxed">{t('about_text_2')}</p>
              <p className="text-zinc-300 font-light leading-relaxed">{t('about_text_3')}</p>
              <p className="text-[#10b981] font-medium leading-relaxed">{t('about_text_4')}</p>
            </div>

            {/* Feature icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 stagger-children">
              {features.map(({ key, icon: Icon }) => (
                <div key={key} className="animate-on-scroll flex flex-col items-center text-center group">
                  <div className="w-14 h-14 flex items-center justify-center border border-white/10 mb-3 group-hover:border-[#34d399] group-hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#10b981]" />
                  </div>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="animate-on-scroll relative hidden lg:block">
            <div className="relative overflow-hidden border border-white/10">
              <img
                src={DRYWALL_IMG}
                alt="Interior construction"
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
            {/* Neon accent corner */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#34d399]/40" />
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#34d399]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
