import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden bg-[#0A0A0A]"
      id={`slide-${slideIndex}`}
    >
      <div
        className="glass-panel overflow-hidden flex flex-col group w-full h-full rounded-none pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative shadow-2xl justify-between card-bg z-[60] md:max-w-4xl md:mx-auto"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        {/* Bottom fade gradient - subtle mobile transition */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        {/* Header Section */}
        <AnimatedElement delay={0.1} className="mb-6 md:mb-8">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
          </span>
        </AnimatedElement>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
          {/* Title & Tagline */}
          <AnimatedElement delay={0.2} className="mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-display tracking-tight leading-tight mb-4">
              <span className="md:hidden">{data.title.replace(/\n/g, ' ')}</span>
              <span className="hidden md:block">
                {data.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
            </h2>
            <p className="uppercase text-sm md:text-base text-teal-300 tracking-wide font-mono">
              {data.tagline}
            </p>
          </AnimatedElement>

          {/* Stat Display - Large & Prominent */}
          <AnimatedElement delay={0.35} className="mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
              <div>
                <div className="text-5xl md:text-7xl font-bold text-teal-300 font-display tracking-tighter mb-2">
                  {data.statValue}
                </div>
                <p className="text-base md:text-lg text-neutral-300 font-display max-w-2xl">
                  {data.statLabel}
                </p>
              </div>
            </div>
          </AnimatedElement>

          {/* Description */}
          <AnimatedElement delay={0.5} className="mb-8 md:mb-10">
            <p className="text-base md:text-lg leading-relaxed text-white/90 font-display max-w-2xl">
              {data.statDescription}
            </p>
          </AnimatedElement>

          {/* Context/Story */}
          <AnimatedElement delay={0.65}>
            <p className="text-sm md:text-base leading-relaxed text-neutral-300 font-display max-w-2xl border-l-2 border-teal-400/50 pl-4">
              {data.description}
            </p>
          </AnimatedElement>
        </div>

        {/* Footer - Tools Section */}
        <AnimatedElement delay={0.8} className="pt-6 md:pt-8 border-t border-white/10">
          <p className="text-[10px] md:text-xs uppercase tracking-widest font-mono text-neutral-500 mb-2">
            <span className="text-teal-300">Tools:</span>{' '}
            <span className="text-neutral-400">{data.tools.replace('Tools: ', '')}</span>
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
