import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

const sectionLabels = ['The Reality', 'What We Do', 'The Outcome', 'We Manage It'];
const sectionIcons = [
  'solar:danger-linear',
  'solar:wrench-2-linear',
  'solar:check-circle-linear',
  'solar:shield-check-linear'
];

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  const sections = data.description.split('|||').map(s => s.trim());

  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center z-[60]"
      id={`slide-${slideIndex}`}
    >
      <div className="absolute inset-0 bg-wave-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-0" />

      <div
        className="flex flex-col md:p-12 z-10 h-full pt-12 px-5 pb-5 relative justify-between card-bg overflow-y-auto"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        {/* Header */}
        <div className="flex flex-col">
          <AnimatedElement delay={0.1} className="mb-3 md:mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
            </span>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-bold text-white font-display tracking-tight leading-tight mb-1">
              <span className="md:hidden">{data.title.replace(/\n/g, ' ')}</span>
              <span className="hidden md:block">
                {data.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
            </h2>
            <p className="uppercase text-xs md:text-sm text-teal-300 tracking-wide font-mono mb-6 md:mb-8">
              {data.tagline}
            </p>
          </AnimatedElement>
        </div>

        {/* Stat Card - Compact */}
        <AnimatedElement delay={0.3} className="mb-6 md:mb-8">
          <div className="group overflow-hidden bg-black/60 hover:bg-black/70 rounded-lg p-4 md:p-5 relative shadow-2xl backdrop-blur-xl border border-white/10 hover:border-teal-400/50 transition-all duration-500 cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col flex-1">
                <span className="text-2xl md:text-3xl font-bold text-white group-hover:text-teal-300 transition-colors duration-500 tracking-tighter font-display">
                  {data.statValue}
                </span>
                <span className="text-xs md:text-xs text-teal-300 group-hover:text-teal-200 transition-colors duration-500 font-mono mt-1 tracking-wider">
                  {data.statLabel}
                </span>
              </div>
              <iconify-icon
                icon="solar:graph-up-linear"
                className="text-teal-300 group-hover:text-teal-200 group-hover:scale-110 transition-all duration-300 text-xl md:text-2xl flex-shrink-0 mt-0.5"
              />
            </div>
            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden mt-3 group-hover:bg-white/20 transition-colors duration-500">
              <div
                className="h-full bg-teal-400 group-hover:bg-teal-300 transition-all duration-500 rounded-full"
                style={{ width: `${data.progressPercent}%` }}
              />
            </div>
            <p className="text-xs md:text-sm text-neutral-400 font-light leading-relaxed font-display mt-2">
              {data.statDescription}
            </p>
          </div>
        </AnimatedElement>

        {/* Information Flow - 4 Sections */}
        <AnimatedElement delay={0.4} className="flex-1">
          <div className="space-y-3">
            {sections.map((section, idx) => (
              <div key={idx} className="relative group">
                {/* Section Container */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 rounded-lg p-3 md:p-4 transition-all duration-300">
                  {/* Section Label */}
                  <div className="flex items-center gap-2 mb-2">
                    <iconify-icon
                      icon={sectionIcons[idx]}
                      className={`text-sm md:text-base flex-shrink-0 ${
                        idx === 0 ? 'text-red-400/70' :
                        idx === 1 ? 'text-teal-400' :
                        idx === 2 ? 'text-blue-400' :
                        'text-emerald-400'
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      {sectionLabels[idx]}
                    </span>
                  </div>

                  {/* Section Content */}
                  <p className="text-sm md:text-sm leading-relaxed text-white/80 group-hover:text-white/90 transition-colors font-display">
                    {section}
                  </p>

                  {/* Visual Connector Line (except last) */}
                  {idx < 3 && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-white/10 to-transparent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* Tools Footer */}
        <AnimatedElement delay={0.5} className="mt-4 pt-3 border-t border-white/5">
          <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
            <span className="text-teal-300/70">→</span> {data.tools.replace('Tools: ', '')}
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
