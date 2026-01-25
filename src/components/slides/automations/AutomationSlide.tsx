import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  return (
    <section
      className="slide-container flex-shrink-0 w-full md:w-[500px] h-[calc(100vh-4rem)] md:h-auto bg-[#0A0A0A] relative flex flex-col overflow-hidden border-white/10 border-y md:border border-x-0 md:border-x shadow-2xl snap-center"
      id={`slide-${slideIndex}`}
    >
      <div className="absolute inset-0 bg-wave-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-0" />

      <div
        className="flex flex-col md:p-10 z-10 h-full pt-6 pr-6 pb-6 pl-6 relative justify-between card-bg"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className="flex flex-col">
          <AnimatedElement delay={0.1} className="flex mb-6 items-center justify-between">
            <span className="font-mono text-xs text-neutral-400">[{data.slideNumber}]</span>
            <div className="flex items-center gap-2">
              <iconify-icon icon={data.icon} className={`${data.iconColor} text-lg`} />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
                {data.label}
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <h2 className="text-3xl md:text-4xl text-white font-display tracking-tighter leading-none mb-3">
              {data.title}
            </h2>
            <p className="uppercase text-xs text-teal-400 tracking-wide font-mono">
              {data.tagline}
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.5} className="relative">
          <div className="group overflow-hidden bg-black/60 hover:bg-black/70 rounded-lg p-6 md:p-8 relative shadow-2xl backdrop-blur-xl border border-white/10 hover:border-teal-400/50 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-teal-500/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-teal-400 transition-colors duration-500 tracking-tighter">
                  {data.statValue}
                </span>
                <span className="text-xs text-teal-400 group-hover:text-teal-300 transition-colors duration-500 font-mono mt-1 tracking-wider">
                  {data.statLabel}
                </span>
              </div>
              <iconify-icon
                icon="solar:graph-up-linear"
                className="text-teal-400 group-hover:text-teal-300 group-hover:scale-110 transition-all duration-300 text-2xl"
              />
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-3 group-hover:bg-white/20 transition-colors duration-500">
              <div
                className="h-full bg-teal-400 group-hover:bg-teal-300 transition-all duration-500 rounded-full"
                style={{ width: `${data.progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-neutral-300 font-light leading-snug">
              {data.statDescription}
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.7}>
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 border-l-2 border-white/30">
            <p className="leading-relaxed text-[11px] md:text-xs text-neutral-200 font-mono mb-3">
              {data.description}
            </p>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[9px] uppercase text-neutral-400 tracking-widest font-mono">
                {data.tools}
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
