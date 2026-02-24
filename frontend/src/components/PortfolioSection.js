import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const projects = [
  {
    image: "https://images.pexels.com/photos/6474129/pexels-photo-6474129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    titleKey: "portfolio_project_1_title",
    descKey: "portfolio_project_1_desc",
    tag: "Spachtelarbeiten",
  },
  {
    image: "https://images.pexels.com/photos/7028110/pexels-photo-7028110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    titleKey: "portfolio_project_2_title",
    descKey: "portfolio_project_2_desc",
    tag: "Bodenverlegung",
  },
  {
    image: "https://images.pexels.com/photos/4981770/pexels-photo-4981770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    titleKey: "portfolio_project_3_title",
    descKey: "portfolio_project_3_desc",
    tag: "Trockenbau",
  },
  {
    image: "https://images.unsplash.com/photo-1748050869483-f3c34120c3ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMGZpbmlzaGVkJTIwcm9vbSUyMGxhbWluYXRlJTIwZmxvb3IlMjBjZWlsaW5nfGVufDB8fHx8MTc3MTkzODI2N3ww&ixlib=rb-4.1.0&q=85",
    titleKey: "portfolio_project_4_title",
    descKey: "portfolio_project_4_desc",
    tag: "Gewerblich",
  },
  {
    image: "https://images.pexels.com/photos/6474207/pexels-photo-6474207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    titleKey: "portfolio_project_5_title",
    descKey: "portfolio_project_5_desc",
    tag: "Trockenbau",
  },
  {
    image: "https://images.pexels.com/photos/6782272/pexels-photo-6782272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    titleKey: "portfolio_project_6_title",
    descKey: "portfolio_project_6_desc",
    tag: "Wohnungsbau",
  },
  {
    image: "https://images.unsplash.com/photo-1768321913857-431dc5fe553a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHw0fHxkcnl3YWxsJTIwaW5zdGFsbGF0aW9uJTIwc3VzcGVuZGVkJTIwY2VpbGluZyUyMGNvbnN0cnVjdGlvbiUyMHdvcmtlcnxlbnwwfHx8fDE3NzE5MzgyNzV8MA&ixlib=rb-4.1.0&q=85",
    titleKey: "portfolio_project_7_title",
    descKey: "portfolio_project_7_desc",
    tag: "Innenausbau",
  },
];

export default function PortfolioSection() {
  const { t } = useLanguage();
  const sectionRef = useScrollAnimation();
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => api.off('select', onSelect);
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-[#0f0f0f]" data-testid="portfolio-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="animate-on-scroll flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-mono text-[#10b981] tracking-[0.3em] uppercase mb-4">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight" data-testid="portfolio-title">
              {t('portfolio_title')}
            </h2>
            <p className="text-zinc-400 mt-4 font-light max-w-lg">{t('portfolio_subtitle')}</p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-[#10b981] hover:text-[#10b981] text-zinc-400 transition-all duration-300"
              data-testid="portfolio-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-[#10b981] hover:text-[#10b981] text-zinc-400 transition-all duration-300"
              data-testid="portfolio-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="animate-on-scroll">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div
                    className="group relative overflow-hidden border border-white/5 hover:border-[#34d399]/40 transition-all duration-500 cursor-pointer"
                    onClick={() => setLightbox(index)}
                    data-testid={`portfolio-card-${index}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                      
                      {/* Zoom icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>

                      {/* Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 px-3 py-1">
                          {project.tag}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="relative p-5 bg-[#111111]">
                      <h3 className="text-sm font-bold text-white tracking-tight mb-1">
                        {t(project.titleKey)}
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        {t(project.descKey)}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 transition-all duration-300 ${
                  index === current
                    ? 'w-8 bg-[#10b981]'
                    : 'w-4 bg-white/10 hover:bg-white/20'
                }`}
                data-testid={`portfolio-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          data-testid="portfolio-lightbox"
        >
          <div className="relative max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors"
              data-testid="lightbox-close-btn"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={projects[lightbox].image}
              alt={t(projects[lightbox].titleKey)}
              className="w-full max-h-[75vh] object-contain"
            />

            {/* Caption */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{t(projects[lightbox].titleKey)}</h3>
                <p className="text-sm text-zinc-400">{t(projects[lightbox].descKey)}</p>
              </div>
              <span className="text-xs font-mono text-zinc-600">{lightbox + 1} / {projects.length}</span>
            </div>

            {/* Lightbox nav */}
            <button
              onClick={() => setLightbox((lightbox - 1 + projects.length) % projects.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#10b981] transition-all"
              data-testid="lightbox-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setLightbox((lightbox + 1) % projects.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#10b981] transition-all"
              data-testid="lightbox-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
