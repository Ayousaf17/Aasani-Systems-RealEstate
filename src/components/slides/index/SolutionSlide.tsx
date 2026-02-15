import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface SolutionSlideProps {
  index: number;
}

const benefits = [
  {
    icon: 'solar:link-linear',
    text: 'Your CRM, calendar, and email work as one system',
  },
  {
    icon: 'solar:bolt-circle-linear',
    text: 'It happens automatically—no manual work from you',
  },
  {
    icon: 'solar:hand-heart-linear',
    text: "When it breaks or needs changes, we fix it—you're not stuck troubleshooting",
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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative justify-start card-bg z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.solution})` }}
      >
        <div className="slide-overlay-heavy" />
        {/* Bottom fade gradient - subtle mobile transition */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />
        <AnimatedElement delay={0.1} className="mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            03 / 05 — THE SOLUTION
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            We Wire Them
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-4 slide-label">
            So they work automatically—and we stay your back office
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="relative z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            {/* Benefits list */}
            <div className="flex flex-col gap-5 md:gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-x-4 items-start">
                  <iconify-icon icon={benefit.icon} className="text-xl md:text-2xl text-teal-300 shrink-0 mt-0.5 drop-shadow-md" />
                  <p className="text-base md:text-lg leading-relaxed text-white font-display">
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
              See all 7 systems
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
