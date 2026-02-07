import { useState, useMemo } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { partnershipPhases, backgroundImages } from '../../../data/operationsContent';

interface PartnershipSlideProps {
  index: number;
}

interface Step {
  label: string;
  items: string[];
  style: 'teal' | 'neutral' | 'muted';
  phaseIdx: number;
  phaseTitle: string;
  phaseDuration: string;
  phaseBadgeColor: string;
}

export function PartnershipSlide({ index }: PartnershipSlideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = useMemo(() => {
    return partnershipPhases.flatMap((phase, phaseIdx) => {
      const sections: { label: string; items: string[]; style: 'teal' | 'neutral' | 'muted' }[] = [
        { label: 'WHAT YOU GET', items: phase.whatYouGet, style: 'teal' },
        { label: 'WHAT HAPPENS', items: phase.whatHappens, style: 'neutral' },
      ];
      if (phase.infrastructure) {
        sections.push({ label: 'WHERE IT LIVES', items: phase.infrastructure, style: 'muted' });
      }
      return sections.map((s) => ({
        ...s,
        phaseIdx,
        phaseTitle: phase.title,
        phaseDuration: phase.duration,
        phaseBadgeColor: phase.badgeColor,
      }));
    });
  }, []);

  const current = steps[currentStep];
  const activePhase = current.phaseIdx;

  // Find first step index for each phase (for dot click navigation)
  const phaseStartIndices = useMemo(() => {
    const starts: number[] = [];
    let seen = -1;
    steps.forEach((step, i) => {
      if (step.phaseIdx !== seen) {
        starts.push(i);
        seen = step.phaseIdx;
      }
    });
    return starts;
  }, [steps]);

  const goToPrevious = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative justify-start card-bg safe-area-bottom z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.partnership})` }}
      >
        <div className="slide-overlay-heavy" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0.1} className="mb-4 md:mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            05 / 07 — HOW WE WORK TOGETHER
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-4 md:mb-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            A True Partnership
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-3 slide-label">
            Not just software
          </p>
        </AnimatedElement>

        {/* Phase Content — grid overlay sizes to tallest step, keeping dots + nav static */}
        <AnimatedElement delay={0.3} className="flex flex-col relative z-10">
          <div className="grid">
            {steps.map((step, idx) => (
              <div
                key={idx}
                style={{ gridArea: '1 / 1' }}
                className={`transition-all duration-500 ease-out ${
                  idx === currentStep
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className={`backdrop-blur-2xl border border-white/15 rounded-lg p-5 md:p-6 flex flex-col shadow-lg ${idx === currentStep ? 'animate-glaze-in' : 'bg-black/60'}`}>
                  {/* Phase Dots */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {partnershipPhases.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentStep(phaseStartIndices[dotIdx])}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIdx === activePhase
                            ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50'
                            : 'bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to phase ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Phase Title + Duration Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-white font-display">
                      {step.phaseTitle}
                    </h3>
                    <span className={`${step.phaseBadgeColor} text-xs font-mono rounded-full px-3 py-1`}>
                      {step.phaseDuration}
                    </span>
                  </div>

                  {/* Section Label */}
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-300/70 mb-3">
                    {step.label}
                  </span>

                  {/* Content Items */}
                  <div className="space-y-1.5 flex-1">
                    {step.items.map((item, i) => (
                      <p
                        key={i}
                        className={`text-sm leading-relaxed flex gap-2 ${
                          step.style === 'teal'
                            ? 'text-teal-300'
                            : step.style === 'neutral'
                              ? 'text-neutral-300'
                              : 'text-neutral-400'
                        }`}
                      >
                        <span className="shrink-0">
                          {step.style === 'teal' ? '\u2713' : '\u2192'}
                        </span>
                        {item}
                      </p>
                    ))}
                  </div>

                  {/* Navigation */}
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
                      disabled={currentStep === steps.length - 1}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                        currentStep === steps.length - 1
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
      </div>
    </section>
  );
}
