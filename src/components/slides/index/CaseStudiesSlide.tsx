import { AnimatedElement } from '../../ui/AnimatedElement';
import { industryStats, backgroundImages } from '../../../data/indexContent';

interface CaseStudiesSlideProps {
  index: number;
}

export function CaseStudiesSlide({ index }: CaseStudiesSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-clear overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative shadow-2xl justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.caseStudies})` }}
      >
        <div className="slide-overlay-heavy" />

        <div className="relative z-10 flex flex-col h-full">
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6 shrink-0">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 slide-label">
              [05/10]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:chart-2-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
                THE PROOF
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2} className="shrink-0">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 slide-heading font-display">
              What The Research
              <br />
              <span className="text-neutral-200 font-normal">Shows</span>
            </h2>
            <p className="text-neutral-300 text-sm md:text-base font-display drop-shadow-md">
              Industry-verified statistics on automation impact
            </p>
          </AnimatedElement>

          <div className="flex flex-col gap-4 w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide py-4 mt-4">
            {industryStats.map((stat, i) => (
              <AnimatedElement
                key={i}
                delay={0.3 + i * 0.1}
                className="bg-black/50 backdrop-blur-md border border-white/10 p-4 md:p-5 w-full hover:bg-black/60 hover:border-teal-400/30 transition-all duration-300 rounded-lg shrink-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <iconify-icon icon={stat.icon} className={`${stat.iconColor} text-2xl md:text-3xl`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-sm md:text-base text-teal-300 font-medium font-display">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-neutral-300 text-sm md:text-base font-display leading-snug">
                      {stat.description}
                    </p>
                    <p className="text-neutral-500 text-[10px] md:text-xs font-mono mt-2 uppercase tracking-wider">
                      Source: {stat.source}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
