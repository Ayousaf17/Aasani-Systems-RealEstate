import { AnimatedElement } from '../../ui/AnimatedElement';
import { solutionBenefits, backgroundImages } from '../../../data/indexContent';

interface SolutionSlideProps {
  index: number;
}

export function SolutionSlide({ index }: SolutionSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 bg-neutral-900/50 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.solution})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            [03/08]
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:lightbulb-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              THE SOLUTION
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="md:mb-12 mb-10">
          <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.1] font-display">
            The Solution
            <br />
            <span className="text-neutral-500">Operational Systems</span>
          </h2>
        </AnimatedElement>

        <div className="flex flex-col gap-5 md:gap-8 flex-1 overflow-y-auto scrollbar-hide pb-6">
          {solutionBenefits.map((benefit, i) => (
            <AnimatedElement
              key={i}
              delay={0.3 + i * 0.15}
              className="group bg-white/0 hover:bg-white/5 rounded-lg p-4 -ml-4 transition-all duration-300 cursor-pointer shrink-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <iconify-icon
                  icon={benefit.icon}
                  className="text-2xl text-teal-400 group-hover:text-teal-300 transition-colors"
                />
                <h3 className="md:text-xl text-lg font-medium text-white tracking-tight group-hover:text-teal-400 transition-colors">
                  {benefit.title}
                </h3>
              </div>
              <div className="pl-9 border-l border-white/10 ml-3 transition-all duration-300 group-hover:border-teal-400/50 group-hover:pl-10">
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed group-hover:text-neutral-300 transition-colors font-display">
                  {benefit.description}
                  {' '}
                  <span className="text-white font-semibold">
                    {benefit.highlight}
                  </span>
                  {benefit.highlightSuffix && ` ${benefit.highlightSuffix}`}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
