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
        <div className="bg-black/60 absolute inset-0" />

        {/* Header */}
        <AnimatedElement delay={0.1} className="relative z-10 mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 05 — HOME
          </span>
        </AnimatedElement>

        {/* Main Content - Left Aligned */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatedElement delay={0.2} className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight">
              We respond to your leads
            </h1>
            <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
              while you sleep
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.3} className="mb-4">
            <p className="text-base md:text-lg font-semibold text-teal-300 font-display">
              {heroStat.value} {heroStat.text}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.4} className="mb-6">
            <div className="border-l-2 border-teal-300/50 pl-4">
              <p className="text-base md:text-lg text-neutral-300 font-display leading-relaxed">
                You got into real estate to help people, not to drown in admin. Here's how to get your time back.
              </p>
            </div>
          </AnimatedElement>
        </div>

        {/* Footer */}
        <AnimatedElement delay={0.5} className="relative z-10">
          <div className="border-t border-white/10 pt-4 flex justify-between items-end">
            <p className="text-base font-display text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-300" />
              Automation for Real Estate
            </p>
            <button
              onClick={() => onNavigate?.(1)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg"
              aria-label="Next slide"
            >
              <iconify-icon icon="solar:arrow-right-linear" width={20} />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
