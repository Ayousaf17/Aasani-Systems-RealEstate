import { useState } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import type { AutomationSlideData } from '../../../types';

interface AutomationSlideProps {
  data: AutomationSlideData;
  slideIndex: number;
}

const sectionConfig = [
  { label: 'The Reality', icon: 'solar:danger-linear', color: 'from-red-500/20 to-red-500/5 border-red-400/30' },
  { label: 'What We Do', icon: 'solar:wrench-2-linear', color: 'from-teal-500/20 to-teal-500/5 border-teal-400/30' },
  { label: 'The Outcome', icon: 'solar:check-circle-linear', color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-400/30' },
  { label: 'We Manage It', icon: 'solar:shield-check-linear', color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-400/30' },
];

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
        {/* Header Section - Flex Shrink */}
        <div className="flex-shrink-0 mb-5 md:mb-6">
          <AnimatedElement delay={0.1} className="mb-1 md:mb-2">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              {data.slideNumber.replace('/', ' / ')} — {data.label.toUpperCase()}
            </span>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight leading-tight mb-1">
              <span className="md:hidden">{data.title.replace(/\n/g, ' ')}</span>
              <span className="hidden md:block">
                {data.title.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </span>
            </h2>
            <p className="uppercase text-xs md:text-sm text-teal-300 tracking-wide font-mono">
              {data.tagline}
            </p>
          </AnimatedElement>
        </div>

        {/* Stat Card - Ultra Compact - Flex Shrink */}
        <AnimatedElement delay={0.3} className="flex-shrink-0 mb-5 md:mb-6">
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

        {/* Step Navigation - Dots - Flex Shrink */}
        <div className="flex-shrink-0 flex items-center justify-center gap-2 mb-5 md:mb-6">
          {sectionConfig.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col pb-5 md:pb-6">
          {/* Step Content — grid overlay so container sizes to tallest content */}
          <div className="grid">
            {sectionConfig.map((config, idx) => (
              <div
                key={idx}
                style={{ gridArea: '1 / 1' }}
                className={`transition-all duration-500 ease-out ${
                  idx === currentStep
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className={`bg-gradient-to-br ${config.color} backdrop-blur-sm border rounded-lg p-4 md:p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <iconify-icon
                      icon={config.icon}
                      className={`text-base md:text-lg flex-shrink-0 ${
                        idx === 0 ? 'text-red-400' :
                        idx === 1 ? 'text-teal-400' :
                        idx === 2 ? 'text-emerald-400' :
                        'text-cyan-400'
                      }`}
                    />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                      {idx + 1} / 4 — {config.label}
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-white/90 font-display">
                    {sections[idx]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex-shrink-0 flex items-center justify-between mt-4 pt-3 border-t border-white/5">
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

            {/* Progress Indicator */}
            <span className="text-xs text-neutral-400 font-mono">
              {currentStep + 1} of 4
            </span>

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

        {/* Technologies Footer */}
        <div className="flex-shrink-0 pb-5 md:pb-8 border-t border-white/10 pt-3 mt-auto">
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
