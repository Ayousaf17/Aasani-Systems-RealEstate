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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col group md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none pt-12 px-5 pb-5 relative shadow-2xl justify-between card-bg"
        style={{ backgroundImage: `url(${backgroundImages.hero})` }}
      >
        {/* Header */}
        <AnimatedElement delay={0.1} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 05 — HOME
          </span>
        </AnimatedElement>

        {/* Main Content - Left Aligned */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatedElement delay={0.2}>
<h1 className="text-6xl md:text-7xl font-medium text-white tracking-tight font-display leading-none">
              Real Estate Operations
              <span className="block text-neutral-500">Streamlined</span>
            </h1>
            <p className="text-base md:text-lg font-normal text-neutral-400 tracking-tight font-display mt-6">
              So you can focus on people, not admin tasks.
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
