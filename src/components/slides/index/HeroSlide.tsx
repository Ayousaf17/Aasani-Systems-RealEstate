import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface HeroSlideProps {
  index: number;
  onNavigate?: (delta: number) => void;
}

export function HeroSlide({ index, onNavigate }: HeroSlideProps) {
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
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-5 pointer-events-none" />
        {/* Bottom fade gradient - subtle mobile transition */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />
        {/* Header */}
        <AnimatedElement delay={0.1} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 05 — HOME
          </span>
        </AnimatedElement>

        {/* Main Content - Left Aligned */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatedElement delay={0.2}>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight font-display leading-none">
              Your Tools.
              <span className="block">Automated.</span>
              <span className="block">Managed.</span>
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-6">
              We wire them together so they work automatically
            </p>
          </AnimatedElement>
        </div>

        {/* Footer */}
        <AnimatedElement delay={0.5} className="relative z-10">
          <div className="border-t border-white/10 pt-4 flex justify-between items-end">
            <p className="text-base font-display text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              Aasani Systems
            </p>
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
