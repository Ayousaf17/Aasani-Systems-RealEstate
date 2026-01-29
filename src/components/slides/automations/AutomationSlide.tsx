import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center"
      id={`slide-${slideIndex}`}
    >
      <div className="absolute inset-0 bg-wave-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-0" />

      <div
        className="flex flex-col md:p-12 z-10 h-full pt-12 px-5 pb-5 relative justify-between card-bg"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className="flex flex-col">
          <AnimatedElement delay={0.1} className="mb-3 md:mb-6">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
            </span>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-display tracking-tight leading-tight mb-2">
              <span className="md:hidden">{data.title.replace(/\n/g, ' ')}</span>
              <span className="hidden md:block">
                {data.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
            </h2>
            <p className="uppercase text-xs md:text-sm text-teal-300 tracking-wide font-mono mb-3 md:mb-0">
              {data.tagline}
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.5} className="relative">
          <div className="group overflow-hidden bg-black/60 hover:bg-black/70 rounded-lg p-4 md:p-6 relative shadow-2xl backdrop-blur-xl border border-white/10 hover:border-teal-400/50 transition-all duration-500 cursor-pointer md:hover:scale-[1.02] hover:shadow-teal-500/20 stat-card-enhanced">
            <div className="flex items-start justify-between mb-3 md:mb-4">
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-teal-300 transition-colors duration-500 tracking-tighter font-display">
                  {data.statValue}
                </span>
                <span className="text-xs md:text-sm text-teal-300 group-hover:text-teal-200 transition-colors duration-500 font-mono mt-1 tracking-wider">
                  {data.statLabel}
                </span>
              </div>
              <iconify-icon
                icon="solar:graph-up-linear"
                className="text-teal-300 group-hover:text-teal-200 group-hover:scale-110 transition-all duration-300 text-2xl md:text-3xl"
              />
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-3 group-hover:bg-white/20 transition-colors duration-500">
              <div
                className="h-full bg-teal-400 group-hover:bg-teal-300 transition-all duration-500 rounded-full"
                style={{ width: `${data.progressPercent}%` }}
              />
            </div>
            <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed font-display">
              {data.statDescription}
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.7}>
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 md:p-4 border-l-2 border-teal-500/50">
            <p className="leading-relaxed text-sm md:text-base text-white/90 font-display mb-2">
              {data.description}
            </p>
            <div className="border-t border-teal-500/50 pt-2">
              <p className="text-xs md:text-xs uppercase tracking-widest font-mono">
                <span className="text-teal-300">Tools:</span>{' '}
                <span className="text-white/90">{data.tools.replace('Tools: ', '')}</span>
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
