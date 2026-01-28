import { AnimatedElement } from '../../ui/AnimatedElement';
import { ExpandableCard } from '../../ui/ExpandableCard';
import { backgroundImages, problemInsights } from '../../../data/indexContent';

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
        <AnimatedElement delay={0.1} className="mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            02 / 05 — THE PROBLEM
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight">
            You didn't get into real estate
          </h2>
          <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
            to drown in admin
          </p>
        </AnimatedElement>

        {/* Research Insight Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {problemInsights.map((insight, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1}>
              <ExpandableCard
                title={insight.researchTitle}
                description={insight.source}
                statValue={insight.value}
                statLabel={insight.label}
                icon={<iconify-icon icon={insight.icon} className="text-xl" />}
                variant="problem"
              >
                <p className="text-white font-medium italic border-l-2 border-slate-400/50 pl-3">
                  "{insight.keyInsight}"
                </p>
                <p className="text-neutral-400">
                  {insight.context}
                </p>
                <p className="text-teal-300 font-medium">
                  {insight.aasaniAngle}
                </p>
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-500 hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source: {insight.source}
                    <iconify-icon icon="solar:arrow-right-up-linear" className="text-sm" />
                  </a>
                </div>
              </ExpandableCard>
            </AnimatedElement>
          ))}
        </div>

        {/* Tap hint */}
        <AnimatedElement delay={0.6} className="text-center">
          <p className="text-xs text-white/70 font-mono bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2">
            <iconify-icon icon="solar:hand-stars-linear" className="text-sm text-teal-300" />
            Tap any stat to see the research
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
