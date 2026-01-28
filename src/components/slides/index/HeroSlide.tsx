import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages, heroStat } from '../../../data/indexContent';

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
        <div className="bg-black/40 absolute inset-0" />

        <AnimatedElement delay={0.1} className="relative z-10 flex justify-between items-center mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 05 — WELCOME
          </span>
          <iconify-icon icon="solar:home-2-linear" className="text-teal-400 text-lg md:hidden" />
          <div className="hidden md:flex items-center gap-2">
            <iconify-icon icon="solar:home-2-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              HOME
            </span>
          </div>
        </AnimatedElement>

        {/* Left-aligned content - matching Page 2's bold, confident style */}
        <div className="relative z-10 mt-auto mb-6 md:mb-12">
          <AnimatedElement delay={0.2}>
            <h1 className="leading-[0.9] md:mb-6 md:text-7xl text-4xl font-medium text-white tracking-tighter font-display mb-3">
              Be the Agent
              <span className="block text-neutral-400 tracking-tighter">
                They Rave About
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={0.4} className="space-y-2">
            <p className="md:text-base text-sm font-semibold text-teal-300 tracking-wide font-display drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {heroStat.value} {heroStat.text}
            </p>
            <p className="leading-relaxed text-sm md:text-base text-white/90 tracking-wide font-display max-w-[90%] border-teal-400 border-l-2 pl-3 bg-black/40 py-2 pr-2 rounded-r-lg">
              You got into real estate to help people, not to drown in admin.
              Here's how to get your time back.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.6} className="relative z-10 pt-4 md:pt-6 border-t border-white/10 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-neutral-500 uppercase mb-1">
              What We Offer
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              <span className="font-display text-sm md:text-base tracking-wide text-neutral-200">
                Automation for Real Estate
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigate?.(1)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <iconify-icon icon="solar:arrow-right-linear" width={20} />
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
}
