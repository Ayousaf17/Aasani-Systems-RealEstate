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
        <AnimatedElement delay={0.1} className="mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            03 / 05 — THE SOLUTION
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight">
            Systems that work
          </h2>
          <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
            while you don't have to
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3}>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            {/* Benefits list */}
            <div className="flex flex-col gap-6 md:gap-7">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-x-4 items-start">
                  <iconify-icon icon={benefit.icon} className="text-2xl md:text-3xl text-teal-300 shrink-0 mt-0.5 drop-shadow-md" />
                  <p className="text-lg md:text-xl leading-relaxed text-white font-display">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>

            {/* See all automations link */}
            <button
              onClick={() => navigate('/automations')}
              className="w-full mt-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-teal-300/30 hover:border-teal-300/50 text-white text-sm md:text-base font-display inline-flex items-center justify-center gap-2 transition-all duration-200 group"
            >
              See all 7 automations
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-lg text-teal-300 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
