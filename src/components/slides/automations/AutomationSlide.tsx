import { useState } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

const sectionLabels = ['The Reality', 'What We Do', 'The Outcome', 'We Manage It'];

export function AutomationSlide({ data, slideIndex }: AutomationSlideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const sections = data.description.split('|||').map(s => s.trim());

  const goToPrevious = () => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
  };

  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center z-[60]"
      id={`slide-${slideIndex}`}
    >
      <div className="absolute inset-0 bg-wave-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-0" />

      <div
        className="flex flex-col md:p-12 z-10 h-full pt-12 px-5 relative card-bg"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className="slide-overlay-heavy" />

        {/* Header Section - Flex Shrink */}
        <div className="flex-shrink-0 mb-5 md:mb-6 relative z-10">
          <AnimatedElement delay={0.1} className="mb-1 md:mb-2">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
              {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
            </span>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight leading-tight mb-1 slide-heading">
              <span className="md:hidden">{data.title.replace(/\n/g, ' ')}</span>
              <span className="hidden md:block">
                {data.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
            </h2>
            <p className="uppercase text-xs md:text-sm text-teal-300 tracking-wide font-mono slide-label">
              {data.tagline}
            </p>
          </AnimatedElement>
        </div>

        {/* Stat Card - Ultra Compact - Flex Shrink */}
        <AnimatedElement delay={0.3} className="flex-shrink-0 mb-5 md:mb-6 relative z-10">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-3 md:p-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xl md:text-2xl font-bold text-white tracking-tighter font-display">
                  {data.statValue}
                </span>
                <span className="text-xs text-teal-300 font-mono mt-0.5 tracking-wider">
                  {data.statLabel}
                </span>
              </div>
              <iconify-icon
                icon="solar:graph-up-linear"
                className="text-teal-300 text-lg md:text-xl flex-shrink-0 mt-0.5"
              />
            </div>
            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${data.progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed font-display mt-2">
              {data.statDescription}
            </p>
          </div>
        </AnimatedElement>

        {/* Content Area — grid overlay sizes to tallest step, keeping dots + nav static */}
        <AnimatedElement delay={0.4} className="flex flex-col relative z-10">
          <div className="grid">
            {sectionLabels.map((label, idx) => (
              <div
                key={idx}
                style={{ gridArea: '1 / 1' }}
                className={`transition-all duration-500 ease-out ${
                  idx === currentStep
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className={`backdrop-blur-2xl border border-white/15 rounded-lg p-4 md:p-5 flex flex-col shadow-lg ${idx === currentStep ? 'animate-glaze-in' : 'bg-black/60'}`}>
                  {/* Dots */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {sectionLabels.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentStep(dotIdx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIdx === currentStep
                            ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50'
                            : 'bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to step ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Section label */}
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-300/70 mb-2">
                    {label}
                  </span>
                  <p className="text-sm md:text-base leading-relaxed text-white/90 font-display flex-1">
                    {sections[idx]}
                  </p>

                  {/* Navigation — pinned bottom via mt-auto */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={goToPrevious}
                      disabled={currentStep === 0}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                        currentStep === 0
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-teal-300 hover:text-teal-200 hover:bg-white/5'
                      }`}
                    >
                      <iconify-icon icon="solar:arrow-left-linear" className="text-sm" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={currentStep === 3}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                        currentStep === 3
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-teal-300 hover:text-teal-200 hover:bg-white/5'
                      }`}
                    >
                      <span>Next</span>
                      <iconify-icon icon="solar:arrow-right-linear" className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* Technologies Footer */}
        <div className="flex-shrink-0 pb-5 md:pb-8 border-t border-white/10 pt-3 mt-auto relative z-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase font-semibold">
              Technologies
            </span>
            <p className="text-xs text-neutral-300 font-display leading-relaxed line-clamp-2">
              {data.tools.replace('Tools: ', '')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
