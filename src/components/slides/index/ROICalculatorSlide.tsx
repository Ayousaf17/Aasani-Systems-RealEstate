import { useState, useMemo, useRef, useCallback } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { roiCalculatorContent, backgroundImages } from '../../../data/indexContent';

interface ROICalculatorSlideProps {
  index: number;
  onNavigate?: (delta: number) => void;
}

export function ROICalculatorSlide({ index, onNavigate }: ROICalculatorSlideProps) {
  const [hoursOnAdmin, setHoursOnAdmin] = useState(roiCalculatorContent.inputs.hours.default);
  const [hourlyValue, setHourlyValue] = useState(roiCalculatorContent.inputs.rate.default);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const calculations = useMemo(() => {
    const hoursSaved = Math.round(hoursOnAdmin * roiCalculatorContent.savingsRate * 10) / 10;
    const weeklySavings = hoursSaved * hourlyValue;
    const annualSavings = Math.round(weeklySavings * 52);
    return { hoursSaved, annualSavings };
  }, [hoursOnAdmin, hourlyValue]);

  // Flashlight effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="h-full md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative shadow-2xl card-bg md:p-12 px-5 pb-5 pt-12"
        style={{ backgroundImage: `url(${backgroundImages.caseStudies})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-0 pointer-events-none" />

        {/* Flashlight effect overlay - desktop only */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-0 md:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(20,184,166,0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <AnimatedElement delay={0.1} className="mb-4 md:mb-6 shrink-0">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              04 / 05 — YOUR ROI
            </span>
          </AnimatedElement>

          {/* Title */}
          <AnimatedElement delay={0.2} className="shrink-0 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display leading-tight drop-shadow-md">
              20 hours back every week
            </h2>
            <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
              What would you do with them?
            </p>
          </AnimatedElement>

          {/* Results Card - Contains results, sliders, and CTA */}
          <AnimatedElement delay={0.3} className="flex-1 flex flex-col">
            <div className="bg-black/60 backdrop-blur-sm border border-teal-300/30 rounded-xl p-5 flex flex-col flex-1">
              {/* Results Display */}
              <div className="text-center mb-4">
                <p className="text-neutral-400 text-xs mb-0.5 font-display">{roiCalculatorContent.resultLabels.hoursSaved}</p>
                <p className="text-xl font-bold text-white mb-2 font-display">{calculations.hoursSaved}+ hours/week</p>

                <p className="text-neutral-400 text-xs mb-0.5 font-display">{roiCalculatorContent.resultLabels.annualValue}</p>
                <p className="text-3xl md:text-4xl font-bold text-teal-300 font-display drop-shadow-md">
                  ${calculations.annualSavings.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5 font-mono">per year</p>

                <p className="text-neutral-300 mt-2 text-sm font-display">{roiCalculatorContent.ctaDescription}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-3" />

              {/* Sliders */}
              <div className="flex flex-col gap-4 flex-1 justify-center">
                {/* Hours on admin slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300 font-display text-sm">{roiCalculatorContent.inputs.hours.label}</span>
                    <span className="text-white font-semibold font-display text-sm">{hoursOnAdmin} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={roiCalculatorContent.inputs.hours.min}
                    max={roiCalculatorContent.inputs.hours.max}
                    step={roiCalculatorContent.inputs.hours.step}
                    value={hoursOnAdmin}
                    onChange={(e) => setHoursOnAdmin(Number(e.target.value))}
                    className="w-full h-3 bg-white/40 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-teal-400
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-lg
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-white/20
                               [&::-moz-range-thumb]:appearance-none
                               [&::-moz-range-thumb]:w-6
                               [&::-moz-range-thumb]:h-6
                               [&::-moz-range-thumb]:rounded-full
                               [&::-moz-range-thumb]:bg-teal-400
                               [&::-moz-range-thumb]:cursor-pointer
                               [&::-moz-range-thumb]:border-2
                               [&::-moz-range-thumb]:border-white/20"
                  />
                </div>

                {/* Hourly value slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300 font-display text-sm">{roiCalculatorContent.inputs.rate.label}</span>
                    <span className="text-white font-semibold font-display text-sm">${hourlyValue}</span>
                  </div>
                  <input
                    type="range"
                    min={roiCalculatorContent.inputs.rate.min}
                    max={roiCalculatorContent.inputs.rate.max}
                    step={roiCalculatorContent.inputs.rate.step}
                    value={hourlyValue}
                    onChange={(e) => setHourlyValue(Number(e.target.value))}
                    className="w-full h-3 bg-white/40 rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-teal-400
                               [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-lg
                               [&::-webkit-slider-thumb]:border-2
                               [&::-webkit-slider-thumb]:border-white/20
                               [&::-moz-range-thumb]:appearance-none
                               [&::-moz-range-thumb]:w-6
                               [&::-moz-range-thumb]:h-6
                               [&::-moz-range-thumb]:rounded-full
                               [&::-moz-range-thumb]:bg-teal-400
                               [&::-moz-range-thumb]:cursor-pointer
                               [&::-moz-range-thumb]:border-2
                               [&::-moz-range-thumb]:border-white/20"
                  />
                </div>
              </div>

              {/* CTA Button - Inside card */}
              <button
                onClick={() => onNavigate?.(1)}
                className="group flex md:py-3 overflow-hidden hover:bg-white/20 transition-colors cursor-pointer text-white bg-white/10 w-full rounded-full py-3 relative shadow-xl gap-2 items-center justify-center mt-4 border border-teal-300/30 hover:border-teal-300/50"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest z-10">
                  {roiCalculatorContent.ctaText}
                </span>
                <iconify-icon
                  icon="solar:arrow-right-linear"
                  className="text-lg md:text-xl z-10 text-teal-300 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
