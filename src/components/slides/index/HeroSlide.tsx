import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface HeroSlideProps {
  index: number;
}

export function HeroSlide({ index }: HeroSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col group md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative shadow-2xl justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.hero})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
          <span className="hidden md:block text-xs uppercase tracking-widest font-mono text-neutral-400">
            [01/08]
          </span>
          <a
            href="https://aasani.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <iconify-icon icon="solar:buildings-2-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              AASANI.AI
            </span>
          </a>
        </AnimatedElement>

        <div className="md:space-y-8 flex-1 flex flex-col z-10 relative space-y-6 justify-center">
          <AnimatedElement delay={0.2} className="flex bg-gradient-to-br from-teal-500/10 to-white/0 w-12 h-12 md:w-14 md:h-14 rounded-lg mb-4 md:mb-6 backdrop-blur-md border border-teal-400/20 items-center justify-center">
            <iconify-icon icon="solar:settings-minimalistic-linear" className="text-2xl md:text-3xl text-white" />
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <h1 className="leading-[0.9] md:text-7xl md:mb-3 text-4xl font-normal text-white tracking-tighter font-display mb-2">
              Real Estate Operations.
              <span className="block text-neutral-400">Systematized.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-teal-400 tracking-tight leading-tight font-display">
              Stop losing deals to admin work.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={0.4}>
            <p className="leading-relaxed md:text-base text-sm font-light text-neutral-300 max-w-[95%] font-display">
              Reclaim 20+ hours per week. Automated systems for top-producing agents.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.5} className="space-y-6 mt-auto">
          <div className="h-[1px] w-full bg-white/20" />
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Online
            </div>
            <iconify-icon icon="solar:arrow-down-linear" className="text-2xl text-white animate-bounce" />
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
