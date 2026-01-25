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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-10 md:pr-10 md:pl-10 bg-neutral-900/50 w-full h-full max-w-none rounded-none pt-20 pr-6 pb-8 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.automations})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4">
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
            7 Core Automations
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3}>
          <p className="md:text-sm leading-relaxed text-xs text-neutral-400 mb-4 font-display">
            See how real estate agents reclaim 20+ hours per week
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.4} className="mb-4">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-3 border-l-2 border-white/30">
            <div className="flex flex-col gap-1.5">
              {automationsList.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-b-0"
                >
                  <span className="text-teal-400 font-mono text-xs font-bold w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-neutral-200 text-xs font-display">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="mt-auto">
          <p className="text-[10px] md:text-xs text-neutral-300 mb-3 font-display">
            Together, they transform your operations from chaotic to systematic.
          </p>
          <div className="group/btn relative cursor-pointer">
            <div className="-inset-2 group-hover/btn:opacity-100 transition duration-500 bg-teal-600/30 opacity-0 rounded-full absolute blur-xl" />
            <div className="absolute -inset-[1px] rounded-full overflow-hidden opacity-0 group-hover/btn:opacity-100 transition duration-500 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_2s_linear_infinite]" />
            </div>
            <button
              onClick={() => navigate('/automations')}
              className="relative z-10 flex items-center justify-center overflow-hidden rounded-full p-[1px] leading-none w-full"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-teal-600 hover:bg-teal-500 transition-colors py-3 md:py-4 px-6 gap-2">
                <span className="text-sm font-semibold text-white uppercase tracking-wide">View Complete Breakdown</span>
                <iconify-icon
                  icon="solar:arrow-right-linear"
                  className="text-lg text-white group-hover/btn:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </div>
          <p className="text-[9px] md:text-[10px] text-neutral-400 text-center mt-2 font-mono">
            5-minute read with ROI details
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
