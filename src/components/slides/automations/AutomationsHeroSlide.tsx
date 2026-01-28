import { AnimatedElement } from '../../ui/AnimatedElement';
import { automationsHeroBackground } from '../../../data/automationsContent';

interface AutomationsHeroSlideProps {
  onNextSlide: () => void;
}

export function AutomationsHeroSlide({ onNextSlide }: AutomationsHeroSlideProps) {
  return (
    <section
      className="slide-container flex-shrink-0 flex flex-col overflow-hidden snap-center group bg-[#0A0A0A] border border-white/10 relative shadow-2xl justify-between"
      id="slide-0"
    >
      <div
        className="flex flex-col z-10 md:p-12 h-full pt-12 px-5 pb-5 relative card-bg"
        style={{ backgroundImage: `url(${automationsHeroBackground})` }}
      >
        <div className="bg-black/60 absolute inset-0" />

        <AnimatedElement delay={0} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 09 — SYSTEMS
          </span>
        </AnimatedElement>

        <div className="relative z-10 mt-auto mb-6 md:mb-12">
          <AnimatedElement delay={0.2}>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight mb-2">
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
                7 Core Automations
              </span>
            </div>
          </div>
          <button
            onClick={onNextSlide}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <iconify-icon icon="solar:arrow-right-linear" width={20} />
          </button>
        </AnimatedElement>
      </div>

      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30" />
    </section>
  );
}
