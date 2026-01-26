import { AnimatedElement } from '../../ui/AnimatedElement';
import { problemStats, backgroundImages } from '../../../data/indexContent';

interface ProblemSlideProps {
  index: number;
}

export function ProblemSlide({ index }: ProblemSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.problem})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
          <span className="hidden md:block text-xs uppercase tracking-widest font-mono text-neutral-400">
            [02/08]
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:danger-circle-linear" className="text-red-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-red-400">
              THE PROBLEM
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <h2 className="md:text-5xl text-3xl font-normal text-white tracking-tight mb-8 md:mb-10 font-display">
            The Problem
            <br />
            <span className="text-neutral-500">Costing You Deals</span>
          </h2>
        </AnimatedElement>

        <div className="flex flex-col gap-6 md:gap-8 overflow-y-auto scrollbar-hide flex-1 min-h-0 pb-4">
          {problemStats.map((stat, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1} className="group shrink-0">
              <div className="flex mb-2 gap-x-3 gap-y-3 items-center">
                <iconify-icon icon={stat.icon} className="text-2xl text-white/40" />
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-white to-neutral-500 bg-clip-text text-transparent tracking-tighter">
                  {stat.value}
                </span>
              </div>
              <p className="md:text-base leading-snug text-sm font-medium text-white mb-1 backdrop-blur-sm font-display">
                {stat.title}
                {stat.highlight && (
                  <>
                    {' '}
                    <span className="text-red-400">{stat.highlight}</span>
                    {' '}{stat.highlightText}
                  </>
                )}
              </p>
              <p className="md:text-sm text-xs font-medium text-neutral-400 backdrop-blur-sm font-display">
                {stat.subtitle}
              </p>
              {i < problemStats.length - 1 && (
                <div className="h-[1px] w-full bg-white/5 mt-4" />
              )}
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
