import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface SolutionSlideProps {
  index: number;
}

const benefits = [
  {
    icon: 'solar:bolt-circle-linear',
    text: 'Instant response to every lead - even at 2am',
  },
  {
    icon: 'solar:chat-round-dots-linear',
    text: 'Nurture sequences that feel personal, not robotic',
  },
  {
    icon: 'solar:clipboard-check-linear',
    text: 'Transaction coordination that runs itself',
  },
];

export function SolutionSlide({ index }: SolutionSlideProps) {
  const navigate = useNavigate();

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.solution})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            03 / 05 — THE WAY OUT
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:lightbulb-linear" className="text-teal-300 text-lg drop-shadow-md" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
              THE SOLUTION
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
            Systems that work
            <br />
            <span className="text-neutral-500 font-normal">while you don't have to</span>
          </h2>
        </AnimatedElement>

        <div className="flex flex-col gap-5 md:gap-6 overflow-y-auto overscroll-contain scrollbar-hide flex-1 min-h-0 pb-4 touch-pan-y">
          {benefits.map((benefit, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1} className="group shrink-0">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-black/70 hover:border-teal-300/30 transition-all duration-300">
                <div className="flex gap-x-3 gap-y-3 items-start">
                  <iconify-icon icon={benefit.icon} className="text-2xl text-teal-300 shrink-0 mt-0.5 drop-shadow-md" />
                  <p className="md:text-lg text-base leading-snug text-white font-display">
                    {benefit.text}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}

          {/* See all automations link */}
          <AnimatedElement delay={0.6} className="shrink-0 text-center pt-2">
            <button
              onClick={() => navigate('/automations')}
              className="text-teal-300 hover:text-teal-200 text-sm font-display inline-flex items-center gap-1 transition-colors duration-200 group"
            >
              See all 7 automations
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-base group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
