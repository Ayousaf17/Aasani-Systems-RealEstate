import { AnimatedElement } from '../../ui/AnimatedElement';
import { processSteps, backgroundImages, industryStats, guarantee } from '../../../data/indexContent';

interface HowItWorksSlideProps {
  index: number;
}

export function HowItWorksSlide({ index }: HowItWorksSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-10 md:pr-10 md:pl-10 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.howItWorks})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            04 / 05 — PROCESS
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:routing-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              HOW IT WORKS
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
            How It Works
          </h2>
        </AnimatedElement>

        {/* Stacked Steps */}
        <div className="flex flex-col gap-3 mb-4">
          {processSteps.map((step, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1}>
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-black/60 hover:border-teal-400/30 transition-all duration-300">
                <div className="flex items-start gap-3">
                  {/* Step Number */}
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <span className="text-base font-bold text-teal-400 font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-medium text-white font-display">
                        {step.title}
                      </h3>
                      <span className="text-[10px] text-teal-400 font-mono uppercase tracking-wider bg-teal-400/10 px-1.5 py-0.5 rounded">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed font-display">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Trust Stats */}
        <AnimatedElement delay={0.6} className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {industryStats.map((stat, i) => (
              <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
                <p className="text-xl md:text-2xl font-bold text-teal-400 font-display">{stat.value}</p>
                <p className="text-[10px] text-neutral-400 font-display leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* Guarantee */}
        <AnimatedElement delay={0.7} className="mt-auto">
          <div className="bg-gradient-to-r from-teal-500/10 to-teal-600/5 border border-teal-500/20 rounded-lg p-3 flex items-center gap-3">
            <iconify-icon icon="solar:shield-check-linear" className="text-teal-400 text-2xl shrink-0" />
            <p className="text-sm text-neutral-300 font-display leading-snug">
              {guarantee.text}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
