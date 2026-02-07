import { useState } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { partnershipPhases, backgroundImages } from '../../../data/operationsContent';

interface PartnershipSlideProps {
  index: number;
}

export function PartnershipSlide({ index }: PartnershipSlideProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhaseChange = (phase: number) => {
    setCurrentPhase(phase);
    setExpandedSections({});
  };

  const goToPrevious = () => {
    if (currentPhase > 0) handlePhaseChange(currentPhase - 1);
  };

  const goToNext = () => {
    if (currentPhase < partnershipPhases.length - 1) handlePhaseChange(currentPhase + 1);
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

        {/* Phase Content — grid overlay sizes to tallest phase, keeping dots + nav static */}
        <AnimatedElement delay={0.3} className="flex flex-col relative z-10">
          <div className="grid">
            {partnershipPhases.map((phase, idx) => (
              <div
                key={idx}
                style={{ gridArea: '1 / 1' }}
                className={`transition-all duration-500 ease-out ${
                  idx === currentPhase
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className={`backdrop-blur-2xl border border-white/15 rounded-xl p-5 md:p-6 flex flex-col shadow-lg ${idx === currentPhase ? 'animate-glaze-in' : 'bg-black/60'}`}>
                  {/* Dots */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {partnershipPhases.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => handlePhaseChange(dotIdx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIdx === currentPhase
                            ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50'
                            : 'bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to phase ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-white font-display">
                      {phase.title}
                    </h3>
                    <span className={`${phase.badgeColor} text-xs font-mono rounded-full px-3 py-1`}>
                      {phase.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-h-0 space-y-3 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
                    {/* What You Get — always visible */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        What You Get
                      </p>
                      <div className="space-y-1.5">
                        {phase.whatYouGet.map((item, i) => (
                          <p key={i} className="text-sm text-teal-300 leading-relaxed flex gap-2">
                            <span className="shrink-0">&#10003;</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* What Happens — collapsible */}
                    <div className="border-t border-white/10 pt-2">
                      <button
                        onClick={() => toggleSection(`${idx}-whatHappens`)}
                        className="flex items-center justify-between w-full py-1 group"
                      >
                        <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          What Happens
                        </p>
                        <iconify-icon
                          icon="solar:alt-arrow-down-linear"
                          className={`text-neutral-500 group-hover:text-neutral-300 text-sm transition-transform duration-300 ${
                            expandedSections[`${idx}-whatHappens`] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          expandedSections[`${idx}-whatHappens`] ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="space-y-1.5">
                            {phase.whatHappens.map((item, i) => (
                              <p key={i} className="text-sm text-neutral-300 leading-relaxed flex gap-2">
                                <span className="text-neutral-500 shrink-0">&rarr;</span>
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Where It Lives — collapsible (phases 1 & 3 only) */}
                    {phase.infrastructure && (
                      <div className="border-t border-white/10 pt-2">
                        <button
                          onClick={() => toggleSection(`${idx}-infrastructure`)}
                          className="flex items-center justify-between w-full py-1 group"
                        >
                          <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-neutral-300 transition-colors">
                            Where It Lives
                          </p>
                          <iconify-icon
                            icon="solar:alt-arrow-down-linear"
                            className={`text-neutral-500 group-hover:text-neutral-300 text-sm transition-transform duration-300 ${
                              expandedSections[`${idx}-infrastructure`] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            expandedSections[`${idx}-infrastructure`] ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="space-y-1.5">
                              {phase.infrastructure.map((item, i) => (
                                <p key={i} className="text-sm text-neutral-400 leading-relaxed flex gap-2">
                                  <span className="text-neutral-500 shrink-0">&rarr;</span>
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation — pinned bottom via mt-auto */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <button
                      onClick={goToPrevious}
                      disabled={currentPhase === 0}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                        currentPhase === 0
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-teal-300 hover:text-teal-200 hover:bg-white/5'
                      }`}
                    >
                      <iconify-icon icon="solar:arrow-left-linear" className="text-sm" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={currentPhase === partnershipPhases.length - 1}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                        currentPhase === partnershipPhases.length - 1
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
