import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full h-screen pt-0 pr-0 pb-0 pl-0 relative items-center justify-center overflow-hidden"
      id={`slide-${slideIndex}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col bg-center w-full max-w-none md:max-w-xl bg-cover rounded-none pt-20 md:pt-12 pr-6 md:pr-12 pb-12 pl-6 md:pl-12 relative shadow-2xl justify-between"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        {/* Header Section */}
        <AnimatedElement delay={0.1}>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400">
            {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
          </span>
        </AnimatedElement>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center relative z-10 space-y-6 md:space-y-10">
          {/* Title & Tagline */}
          <AnimatedElement delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-4">
              {data.title}
            </h2>
            <p className="uppercase text-sm md:text-base text-neutral-300 tracking-[0.25em] font-mono">
              {data.tagline}
            </p>
          </AnimatedElement>

          {/* Stat Display - Large & Prominent */}
          <AnimatedElement delay={0.3}>
            <div className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-3">
              {data.statValue}
            </div>
            <p className="text-sm md:text-base text-neutral-300 max-w-2xl">
              {data.statLabel}
            </p>
          </AnimatedElement>

          {/* Description */}
          <AnimatedElement delay={0.4}>
            <p className="text-sm md:text-base leading-relaxed text-neutral-300 max-w-2xl">
              {data.statDescription}
            </p>
          </AnimatedElement>

          {/* Context/Story */}
          <AnimatedElement delay={0.5}>
            <p className="text-xs md:text-sm leading-relaxed text-neutral-400 max-w-2xl border-l-2 border-white/20 pl-4">
              {data.description}
            </p>
          </AnimatedElement>
        </div>

        {/* Footer - Tools Section */}
        <AnimatedElement delay={0.6} className="pt-6 md:pt-8 border-t border-white/10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-mono text-neutral-500">
            <span className="text-neutral-300">Tools:</span>{' '}
            <span className="text-neutral-400">{data.tools.replace('Tools: ', '')}</span>
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
