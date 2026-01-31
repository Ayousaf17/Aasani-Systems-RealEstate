import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-[85vw] md:w-[500px] h-full relative items-center justify-center overflow-hidden bg-[#0A0A0A] rounded-none slide-container"
      id={`slide-${slideIndex}`}
      style={{ aspectRatio: '3/4' }}
    >
      <div
        className="glass-panel overflow-hidden flex flex-col w-full h-full rounded-none pt-6 md:pt-8 px-6 md:px-8 pb-6 md:pb-8 relative shadow-2xl justify-between card-bg z-[60]"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        {/* Header Section */}
        <AnimatedElement delay={0.1} className="mb-3 md:mb-4">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-mono text-neutral-400">
            {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
          </span>
        </AnimatedElement>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
          {/* Title & Tagline */}
          <AnimatedElement delay={0.2} className="mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight leading-tight mb-2">
              {data.title}
            </h2>
            <p className="uppercase text-[10px] md:text-xs text-neutral-300 tracking-widest font-mono">
              {data.tagline}
            </p>
          </AnimatedElement>

          {/* Stat Display */}
          <AnimatedElement delay={0.3} className="mb-4 md:mb-6">
            <div className="text-3xl md:text-4xl font-bold text-white font-display tracking-tighter mb-1">
              {data.statValue}
            </div>
            <p className="text-[10px] md:text-xs text-neutral-300 font-display">
              {data.statLabel}
            </p>
          </AnimatedElement>

          {/* Description */}
          <AnimatedElement delay={0.4} className="mb-3 md:mb-4">
            <p className="text-[10px] md:text-xs leading-relaxed text-neutral-300 font-display">
              {data.statDescription}
            </p>
          </AnimatedElement>

          {/* Context/Story */}
          <AnimatedElement delay={0.5}>
            <p className="text-[9px] md:text-[10px] leading-relaxed text-neutral-400 font-display border-l border-neutral-600 pl-2">
              {data.description}
            </p>
          </AnimatedElement>
        </div>

        {/* Footer - Tools Section */}
        <AnimatedElement delay={0.6} className="pt-3 md:pt-4 border-t border-white/10">
          <p className="text-[8px] md:text-[9px] uppercase tracking-widest font-mono text-neutral-500">
            <span className="text-neutral-400">Tools:</span> {data.tools.replace('Tools: ', '')}
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
