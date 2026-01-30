import { AnimatedElement } from '../../ui/AnimatedElement';
import { ExpandableCard } from '../../ui/ExpandableCard';
import { processSteps, backgroundImages, industryStats } from '../../../data/indexContent';

interface HowItWorksSlideProps {
  index: number;
}

export function HowItWorksSlide({ index }: HowItWorksSlideProps) {
  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-12 relative card-bg"
        style={{ backgroundImage: `url(${backgroundImages.howItWorks})` }}
      >
        {/* Header */}
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            04 / 05 — PROCESS
          </span>
          <iconify-icon icon="solar:routing-linear" className="text-teal-300 text-lg md:hidden drop-shadow-md" />
          <div className="hidden md:flex items-center gap-2">
            <iconify-icon icon="solar:routing-linear" className="text-teal-300 text-lg drop-shadow-md" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
              HOW IT WORKS
            </span>
          </div>
        </AnimatedElement>

        {/* Title - More space below */}
        <AnimatedElement delay={0.2} className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
            How It Works
          </h2>
        </AnimatedElement>

        {/* Process Steps - Cleaner, more spacious */}
        <div className="flex flex-col gap-3 mb-6 md:mb-8">
          {processSteps.map((step, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1}>
              <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-black/70 hover:border-teal-500/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-teal-300 font-mono drop-shadow-md">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white font-display">
                        {step.title}
                      </h3>
                      <span className="text-[10px] text-teal-300 font-mono uppercase tracking-wider bg-teal-400/10 px-2 py-0.5 rounded-full drop-shadow-md">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed font-display">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Stats Section - Expandable Cards */}
        <AnimatedElement delay={0.6} className="mt-auto">
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider text-center mb-3">
            <iconify-icon icon="solar:graph-up-linear" className="inline-block mr-1 text-teal-300/60" />
            Tap a stat to see the research
          </p>
          <div className="grid grid-cols-3 gap-2">
            {industryStats.map((stat, i) => (
              <ExpandableCard
                key={i}
                title={stat.researchTitle}
                description={stat.description}
                statValue={stat.value}
                statLabel={stat.label}
                icon={
                  <iconify-icon
                    icon={stat.icon}
                    className={`${stat.iconColor} text-2xl`}
                  />
                }
                className="group relative"
              >
                {/* Key insight - bold and prominent */}
                <p className="text-white font-medium leading-snug">
                  {stat.keyInsight}
                </p>

                {/* Supporting context */}
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {stat.context}
                </p>

                {/* Aasani angle */}
                <p className="text-teal-300/90 text-sm italic drop-shadow-md">
                  {stat.aasaniAngle}
                </p>

                {/* Source with clickable link */}
                <div className="pt-3 border-t border-white/10">
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-500 font-mono hover:text-teal-300 transition-colors underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source: {stat.source} ↗
                  </a>
                </div>
              </ExpandableCard>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
