import { useState, useEffect } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { processSteps, backgroundImages } from '../../../data/indexContent';

interface HowItWorksSlideProps {
  index: number;
}

export function HowItWorksSlide({ index }: HowItWorksSlideProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setActiveStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  const goToNext = () => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  };

  const currentStep = processSteps[activeStep];

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-between card-bg"
        style={{ backgroundImage: `url(${backgroundImages.howItWorks})` }}
      >
        <div>
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              [06/08]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:routing-linear" className="text-teal-400 text-lg" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
                PROCESS
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
              How It Works
              <br />
              <span className="text-neutral-500 font-normal">Simple 3-Step Process</span>
            </h2>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.3} className="flex-1 flex flex-col items-center justify-center py-6">
          {/* Card Container */}
          <div className="w-full max-w-sm relative">
            <div
              key={activeStep}
              className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl animate-fade-in"
            >
              {/* Step Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-400 font-mono">
                  {currentStep.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-white mb-1 font-display">
                {currentStep.title}
              </h3>
              <span className="text-xs text-teal-400 font-mono uppercase tracking-wider">
                {currentStep.duration}
              </span>

              {/* Description */}
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mt-4 font-display">
                {currentStep.description}
              </p>

              {/* Progress bar */}
              <div className="flex gap-2 mt-6">
                {processSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i === activeStep ? 'bg-orange-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-black/80 hover:border-white/40 transition-all"
                aria-label="Previous step"
              >
                <iconify-icon icon="solar:arrow-left-linear" className="text-white text-xl" />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-black/80 hover:border-white/40 transition-all"
                aria-label="Next step"
              >
                <iconify-icon icon="solar:arrow-right-linear" className="text-white text-xl" />
              </button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
