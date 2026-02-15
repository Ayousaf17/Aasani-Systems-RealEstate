import { AnimatedElement } from '../../ui/AnimatedElement';
import { automationsHeroBackground } from '../../../data/automationsContent';

interface AutomationsHeroSlideProps {
  onNextSlide: () => void;
}

export function AutomationsHeroSlide({ onNextSlide: onNavigate }: AutomationsHeroSlideProps) {
  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center z-[60]"
      id="slide-0"
    >
      <div className="absolute inset-0 bg-wave-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-0" />

      <div
        className="flex flex-col md:p-12 z-10 h-full pt-8 px-5 pb-5 relative justify-between card-bg"
        style={{ backgroundImage: `url(${automationsHeroBackground})` }}
      >
        <div className="slide-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            01 / 09 — SYSTEMS
          </span>
        </AnimatedElement>

        <div className="relative z-10 mt-auto mb-6 md:mb-12">
          <AnimatedElement delay={0.2}>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight font-serif leading-none slide-heading">
              The 7 Systems
              <span className="block">We Build For You</span>
            </h1>
            <p className="text-2xl md:text-3xl font-normal text-neutral-300 tracking-tight font-display slide-body">
              Built. Automated. Managed.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.4} className="mt-6">
            <p className="leading-relaxed text-sm md:text-base text-white/90 tracking-wide font-display max-w-[90%] border-teal-300 border-l-2 pl-3 bg-black/60 py-2 pr-2 rounded-r-lg">
              We wire these systems together so they work automatically. Then we manage them—so if something needs tweaking, you just call us.
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
            <iconify-icon icon="solar:arrow-right-linear" width={20} />
          </button>
        </AnimatedElement>
      </div>

    </section>
  );
}
