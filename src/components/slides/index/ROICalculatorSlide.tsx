import { useState, useMemo } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { roiCalculatorContent, backgroundImages } from '../../../data/indexContent';

interface ROICalculatorSlideProps {
  index: number;
  onNavigate?: (delta: number) => void;
}

export function ROICalculatorSlide({ index, onNavigate }: ROICalculatorSlideProps) {
  const [hoursOnAdmin, setHoursOnAdmin] = useState(roiCalculatorContent.inputs.hours.default);
  const [hourlyValue, setHourlyValue] = useState(roiCalculatorContent.inputs.rate.default);

  const calculations = useMemo(() => {
    const hoursSaved = Math.round(hoursOnAdmin * roiCalculatorContent.savingsRate * 10) / 10;
    const weeklySavings = hoursSaved * hourlyValue;
    const annualSavings = Math.round(weeklySavings * 52);
    return { hoursSaved, annualSavings };
  }, [hoursOnAdmin, hourlyValue]);

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative shadow-2xl card-bg md:pt-12 md:pr-12 md:pl-12 pt-16 pr-6 pb-6 pl-6"
        style={{ backgroundImage: `url(${backgroundImages.caseStudies})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6 shrink-0">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 drop-shadow-md">
              [06/11]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:calculator-linear" className="text-teal-400 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400 drop-shadow-md">
                {roiCalculatorContent.label}
              </span>
            </div>
          </AnimatedElement>

          {/* Title */}
          <AnimatedElement delay={0.2} className="shrink-0 mb-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-md font-display">
              {roiCalculatorContent.title}
            </h2>
            <p className="text-teal-400 text-lg md:text-xl font-display drop-shadow-md">
              {roiCalculatorContent.subtitle}
            </p>
          </AnimatedElement>

          {/* Sliders */}
          <div className="flex flex-col gap-6 mb-6">
            {/* Hours on admin slider */}
            <AnimatedElement delay={0.3}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-300 font-display">{roiCalculatorContent.inputs.hours.label}</span>
                  <span className="text-white font-semibold font-display">{hoursOnAdmin} hrs</span>
                </div>
                <input
                  type="range"
                  min={roiCalculatorContent.inputs.hours.min}
                  max={roiCalculatorContent.inputs.hours.max}
                  step={roiCalculatorContent.inputs.hours.step}
                  value={hoursOnAdmin}
                  onChange={(e) => setHoursOnAdmin(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-5
                             [&::-webkit-slider-thumb]:h-5
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-teal-400
                             [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:shadow-lg
                             [&::-webkit-slider-thumb]:border-2
                             [&::-webkit-slider-thumb]:border-white/20
                             [&::-moz-range-thumb]:appearance-none
                             [&::-moz-range-thumb]:w-5
                             [&::-moz-range-thumb]:h-5
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-teal-400
                             [&::-moz-range-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:border-2
                             [&::-moz-range-thumb]:border-white/20"
                />
              </div>
            </AnimatedElement>

            {/* Hourly value slider */}
            <AnimatedElement delay={0.4}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-300 font-display">{roiCalculatorContent.inputs.rate.label}</span>
                  <span className="text-white font-semibold font-display">${hourlyValue}</span>
                </div>
                <input
                  type="range"
                  min={roiCalculatorContent.inputs.rate.min}
                  max={roiCalculatorContent.inputs.rate.max}
                  step={roiCalculatorContent.inputs.rate.step}
                  value={hourlyValue}
                  onChange={(e) => setHourlyValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-5
                             [&::-webkit-slider-thumb]:h-5
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-teal-400
                             [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:shadow-lg
                             [&::-webkit-slider-thumb]:border-2
                             [&::-webkit-slider-thumb]:border-white/20
                             [&::-moz-range-thumb]:appearance-none
                             [&::-moz-range-thumb]:w-5
                             [&::-moz-range-thumb]:h-5
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-teal-400
                             [&::-moz-range-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:border-2
                             [&::-moz-range-thumb]:border-white/20"
                />
              </div>
            </AnimatedElement>
          </div>

          {/* Results Card */}
          <AnimatedElement delay={0.5} className="flex-1 flex flex-col justify-center">
            <div className="bg-black/40 backdrop-blur-sm border border-teal-400/30 rounded-lg p-6 text-center">
              <p className="text-neutral-400 text-sm mb-1 font-display">{roiCalculatorContent.resultLabels.hoursSaved}</p>
              <p className="text-2xl font-bold text-white mb-4 font-display">{calculations.hoursSaved}+ hours/week</p>

              <p className="text-neutral-400 text-sm mb-1 font-display">{roiCalculatorContent.resultLabels.annualValue}</p>
              <p className="text-4xl md:text-5xl font-bold text-teal-400 font-display">
                ${calculations.annualSavings.toLocaleString()}
              </p>
              <p className="text-sm text-neutral-500 mt-1 font-mono">per year</p>

              <p className="text-neutral-300 mt-4 text-sm font-display">{roiCalculatorContent.ctaDescription}</p>
            </div>
          </AnimatedElement>

          {/* CTA Button */}
          <AnimatedElement delay={0.6} className="mt-6 shrink-0">
            <button
              onClick={() => onNavigate?.(1)}
              className="group flex md:py-4 overflow-hidden hover:bg-neutral-200 transition-colors cursor-pointer text-black bg-white opacity-95 w-full rounded-full py-3 relative shadow-xl gap-2 items-center justify-center"
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest z-10">
                {roiCalculatorContent.ctaText}
              </span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-xl md:text-2xl z-10 group-hover:translate-x-1 transition-transform"
              />
            </button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
