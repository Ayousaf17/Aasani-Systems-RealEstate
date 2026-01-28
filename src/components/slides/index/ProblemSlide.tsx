import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface ProblemSlideProps {
  index: number;
}

const painPoints = [
  {
    icon: 'solar:clock-circle-linear',
    text: '78% of buyers choose whoever responds first. Are you always first?',
  },
  {
    icon: 'solar:hourglass-linear',
    text: "The average agent spends 20+ hours/week on tasks that don't need them",
  },
  {
    icon: 'solar:users-group-rounded-linear',
    text: 'Every missed follow-up is a relationship you worked hard to build',
  },
];

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
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            02 / 05 — THE REALITY
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:danger-circle-linear" className="text-red-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-red-400">
              THE PROBLEM
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
            You didn't get into real estate
            <br />
            <span className="text-neutral-500 font-normal">to drown in admin</span>
          </h2>
        </AnimatedElement>

        <div className="flex flex-col gap-5 md:gap-6 overflow-y-auto overscroll-contain scrollbar-hide flex-1 min-h-0 pb-4 touch-pan-y">
          {painPoints.map((point, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1} className="group shrink-0">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex gap-x-3 gap-y-3 items-start">
                  <iconify-icon icon={point.icon} className="text-2xl text-red-400/80 shrink-0 mt-0.5" />
                  <p className="md:text-lg text-base leading-snug text-white font-display">
                    {point.text}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
