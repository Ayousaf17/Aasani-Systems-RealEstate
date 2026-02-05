import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { heroContent, backgroundImages } from '../../../data/operationsContent';

interface OperationsHeroSlideProps {
  index: number;
  onNavigate?: (delta: number) => void;
}

export function OperationsHeroSlide({ index, onNavigate }: OperationsHeroSlideProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'bookatime' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14B8A6' },
          dark: { 'cal-brand': '#2DD4BF' },
        },
        hideEventTypeDetails: false,
        layout: 'week_view',
      });
    })();
  }, []);

  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col group md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative shadow-2xl justify-between card-bg z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.hero})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0.1} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            {heroContent.label}
          </span>
        </AnimatedElement>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatedElement delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display leading-none">
              {heroContent.headline}
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-6">
              {heroContent.subheading}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.4}>
            <p className="text-sm md:text-base text-neutral-300 mt-6 leading-relaxed font-display max-w-md">
              {heroContent.body}
            </p>
            <p className="text-xs md:text-sm text-neutral-400 mt-3 font-display">
              {heroContent.subtext}
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.6} className="relative z-10">
          <div className="border-t border-white/10 pt-4 flex justify-between items-end">
            <button
              data-cal-namespace="bookatime"
              data-cal-link="ayub-yousaf-c1ijnf/bookatime"
              data-cal-config='{"layout":"week_view"}'
              className="py-3 px-6 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-medium text-sm md:text-base transition-colors font-display"
            >
              {heroContent.ctaPrimary}
            </button>
            <button
              onClick={() => onNavigate?.(1)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <iconify-icon icon="solar:arrow-down-linear" width={20} />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
