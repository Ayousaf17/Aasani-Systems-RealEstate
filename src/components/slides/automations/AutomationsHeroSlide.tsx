import { AnimatedElement } from '../../ui/AnimatedElement';
import { automationsHeroBackground } from '../../../data/automationsContent';

interface AutomationsHeroSlideProps {
  onNextSlide: () => void;
}

export function AutomationsHeroSlide({ onNextSlide }: AutomationsHeroSlideProps) {
  return (
    <section
      className="slide-container flex-shrink-0 flex flex-col overflow-hidden snap-center group bg-[#0A0A0A] md:w-[500px] h-[70vh] md:h-auto border border-white/10 relative shadow-2xl justify-between"
      id="slide-0"
    >
      <div
        className="flex flex-col z-10 md:p-10 h-full p-4 relative card-bg"
        style={{ backgroundImage: `url(${automationsHeroBackground})` }}
      >
        <div className="bg-black/40 absolute inset-0" />

        <AnimatedElement delay={0} className="relative z-10 flex mix-blend-color-dodge mb-4 md:mb-8 items-start justify-between">
          <span className="text-[10px] md:text-xs uppercase text-neutral-400 tracking-widest font-mono">
            [01/09] // AUTOMATIONS
          </span>
        </AnimatedElement>

        <div className="relative z-10 mt-auto mb-8 md:mb-12">
          <AnimatedElement delay={0.2}>
            <h1 className="leading-[0.9] md:mb-6 md:text-7xl text-4xl font-medium text-white tracking-tighter font-display mb-3">
              The 7 Core
              <span className="block text-neutral-400 tracking-tighter">
                Automations
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={0.4} className="space-y-2">
            <p className="md:text-base text-xs font-medium text-teal-400 tracking-wide font-display backdrop-blur-sm">
              How top agents save 20+ hours per week
            </p>
            <p className="leading-relaxed text-[10px] md:text-xs text-neutral-300 tracking-wide font-display max-w-[90%] border-teal-500 border-l-2 pl-3 backdrop-blur-sm">
              Real estate agents are drowning in admin work. Here's how to
              automate it systematically.
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
