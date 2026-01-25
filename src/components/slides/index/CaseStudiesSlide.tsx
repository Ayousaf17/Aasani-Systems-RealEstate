import { AnimatedElement } from '../../ui/AnimatedElement';
import { caseStudies, backgroundImages } from '../../../data/indexContent';

interface CaseStudiesSlideProps {
  index: number;
}

export function CaseStudiesSlide({ index }: CaseStudiesSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full h-screen relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-clear overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-4 pb-4 pl-4 relative shadow-2xl justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.caseStudies})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6 shrink-0">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 drop-shadow-md">
              [05/08]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:chart-2-linear" className="text-teal-400 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400 drop-shadow-md">
                CASE STUDIES
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2} className="shrink-0">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-4 md:mb-8 drop-shadow-md font-display">
              Real Results from
              <br />
              <span className="text-neutral-200">Real Agents</span>
            </h2>
          </AnimatedElement>

          <div className="flex flex-col gap-3 w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide pb-2">
            {caseStudies.map((study, i) => (
              <AnimatedElement
                key={i}
                delay={0.3 + i * 0.1}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-3 md:p-5 w-full hover:bg-black/50 transition-colors duration-500 shrink-0"
              >
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-white/10">
                      <span className="text-white font-medium text-sm md:text-base">{study.initials}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base md:text-lg leading-none">
                        {study.name}
                      </h3>
                      <p className="text-neutral-300 text-[10px] md:text-xs mt-0.5 font-display">{study.location}</p>
                    </div>
                  </div>
                  <iconify-icon icon={study.icon} className={`${study.iconColor} text-lg md:text-xl`} />
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-white/10 pt-2 md:pt-4">
                  {study.stats.map((stat, j) => (
                    <div key={j} className="flex flex-col">
                      <span className={`${stat.highlight ? study.iconColor : 'text-white'} font-bold text-base md:text-xl tracking-tight`}>
                        {stat.value}
                      </span>
                      <span className="text-[10px] md:text-xs text-neutral-300 uppercase tracking-wide font-medium mt-0.5 font-display">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
