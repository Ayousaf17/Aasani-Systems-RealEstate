import { AnimatedElement } from '../../ui/AnimatedElement';
import { automationsHeroBackground } from '../../../data/automationsContent';

interface AutomationsHeroSlideProps {
  onNextSlide: () => void;
}

export function AutomationsHeroSlide({ onNextSlide: onNavigate }: AutomationsHeroSlideProps) {
  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden bg-[#0A0A0A]"
      id="slide-0"
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative shadow-2xl justify-between card-bg z-[60]"
        style={{ backgroundImage: `url(${automationsHeroBackground})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 09 — SYSTEMS
          </span>
        </AnimatedElement>

        <div className="relative z-10 mt-auto mb-6 md:mb-12">
          <AnimatedElement delay={0.2}>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight font-serif leading-none">
              The 7 Core Systems
            </h1>
            <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
              How top agents save 20+ hours per week
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.4} className="mt-6">
            <p className="leading-relaxed text-sm md:text-base text-white/90 tracking-wide font-display max-w-[90%] border-teal-300 border-l-2 pl-3 bg-black/60 py-2 pr-2 rounded-r-lg">
              You got into real estate to help people, not to drown in admin.
              Here's how to get your time back.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.6} className="relative z-10 pt-4 md:pt-6 border-t border-white/10 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-neutral-500 uppercase mb-1">
              Scope
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              <span className="font-display text-sm md:text-base tracking-wide text-neutral-200">
                7 Core Systems
              </span>
            </div>
          </div>
          <button
            onClick={onNavigate}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
            aria-label="Next slide"
          >
            <iconify-icon icon="solar:arrow-down-linear" width={20} />
          </button>
        </AnimatedElement>
      </div>

    </section>
  );
}
