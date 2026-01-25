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
      className="snap-start shrink-0 flex w-full h-screen relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 bg-neutral-900/50 w-full h-full max-w-none rounded-none pt-20 pr-6 pb-12 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.automations})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-5">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
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
          <h2 className="md:text-4xl leading-[1.1] text-3xl font-normal text-white tracking-tight mb-2 font-display">
            The 7 Core Automations That Save 20+ Hours Per Week
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3}>
          <p className="md:text-base leading-relaxed text-sm text-neutral-500 mb-6 backdrop-blur-md">
            See exactly how real estate agents reclaim time and close more deals.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.4} className="flex flex-col gap-2 md:gap-3 mb-6 overflow-y-auto pr-1 scrollbar-hide flex-1 min-h-0">
          {automationsList.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-2.5 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors shrink-0"
            >
              <span className="text-teal-400 font-mono text-sm font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-neutral-200 text-sm font-medium">{item}</span>
            </div>
          ))}
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="mt-auto shrink-0">
          <p className="text-[11px] md:text-xs italic text-neutral-200 mb-4">
            "Together, they transform your operations from chaotic to systematic."
          </p>
          <button
            onClick={() => navigate('/automations')}
            className="md:py-4 hover:bg-teal-500 transition-all flex group cursor-pointer font-semibold text-white bg-teal-600 opacity-90 w-full rounded-full pt-3 pb-3 shadow-lg gap-x-2 gap-y-2 items-center justify-center"
          >
            <span className="text-sm uppercase tracking-wide">View the Complete Breakdown</span>
            <iconify-icon
              icon="solar:arrow-right-linear"
              className="text-lg group-hover:translate-x-1 transition-transform"
            />
          </button>
          <p className="text-[10px] md:text-xs font-medium text-neutral-300 text-center mt-3">
            5-minute read with ROI details and implementation examples
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
