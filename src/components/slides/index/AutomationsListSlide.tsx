import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { automationsList, backgroundImages } from '../../../data/indexContent';

interface AutomationsListSlideProps {
  index: number;
}

export function AutomationsListSlide({ index }: AutomationsListSlideProps) {
  const navigate = useNavigate();

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-10 md:pr-10 md:pl-10 bg-neutral-900/50 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.automations})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-3">
          <span className="hidden md:block text-xs uppercase tracking-widest font-mono text-neutral-400">
            [04/08]
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:settings-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              AUTOMATIONS
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <h2 className="md:text-4xl leading-[1.1] text-2xl font-normal text-white tracking-tight mb-1 font-display">
            7 Core Automations
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3}>
          <p className="md:text-sm leading-relaxed text-xs text-neutral-400 mb-3 font-display">
            See how real estate agents reclaim 20+ hours per week
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.4} className="flex-1 flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/10 w-full">
            <div className="flex flex-col gap-3">
              {automationsList.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <span className="text-teal-400 font-mono text-sm font-bold w-7 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-neutral-100 text-sm md:text-base font-display font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="mt-4 shrink-0">
          <p className="text-xs text-neutral-300 mb-3 font-display text-center">
            Together, they transform your operations from chaotic to systematic.
          </p>
          <div className="group/btn relative cursor-pointer">
            <div className="-inset-2 group-hover/btn:opacity-100 transition duration-500 bg-teal-600/30 opacity-0 rounded-full absolute blur-xl" />
            <button
              onClick={() => navigate('/automations')}
              className="relative z-10 flex items-center justify-center overflow-hidden rounded-full leading-none w-full bg-teal-600 hover:bg-teal-500 transition-colors py-3 px-6 gap-2"
            >
              <span className="text-sm font-semibold text-white uppercase tracking-wide">View Complete Breakdown</span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-lg text-white group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
