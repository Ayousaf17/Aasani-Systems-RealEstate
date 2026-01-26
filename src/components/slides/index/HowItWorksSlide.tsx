import { AnimatedElement } from '../../ui/AnimatedElement';
import { processSteps, backgroundImages } from '../../../data/indexContent';

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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.howItWorks})` }}
      >
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

        <AnimatedElement delay={0.2} className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
            How It Works
            <br />
            <span className="text-neutral-500 font-normal">3-Step Process</span>
          </h2>
        </AnimatedElement>

        {/* Stacked Steps */}
        <div className="flex-1 flex flex-col gap-4 md:gap-5 overflow-y-auto scrollbar-hide pb-4">
          {processSteps.map((step, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1}>
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/60 hover:border-teal-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <span className="text-lg md:text-xl font-bold text-teal-400 font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base md:text-lg font-medium text-white font-display">
                        {step.title}
                      </h3>
                      <span className="text-[10px] md:text-xs text-teal-400 font-mono uppercase tracking-wider bg-teal-400/10 px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-display">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line to next step */}
                {i < processSteps.length - 1 && (
                  <div className="flex justify-start ml-5 md:ml-6 mt-3">
                    <div className="w-px h-4 bg-gradient-to-b from-teal-400/50 to-transparent" />
                  </div>
                )}
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
