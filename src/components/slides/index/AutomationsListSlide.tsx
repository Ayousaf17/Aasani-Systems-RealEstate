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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-10 md:pr-10 md:pl-10 bg-neutral-900/50 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-between card-bg"
        style={{ backgroundImage: `url(${backgroundImages.automations})` }}
      >
        <div>
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4">
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
            <h2 className="text-3xl md:text-5xl font-normal text-white tracking-tight mb-2 font-display">
              7 Core Automations
            </h2>
            <p className="text-sm text-neutral-400 font-display">
              Reclaim 20+ hours per week
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.3} className="flex-1 flex items-center py-4">
          <div className="grid grid-cols-2 gap-3 w-full">
            {automationsList.map((item, i) => (
              <div
                key={i}
                className={`group bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-black/60 hover:border-teal-500/30 transition-all duration-300 ${
                  i === 6 ? 'col-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                    <iconify-icon
                      icon={item.icon}
                      className="text-teal-400 text-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400 font-mono text-xs font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white text-xs md:text-sm font-display font-medium leading-tight">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="shrink-0">
          <button
            onClick={() => navigate('/automations')}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 transition-colors py-3 px-6 rounded-full"
          >
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              View Complete Breakdown
            </span>
            <iconify-icon
              icon="solar:arrow-right-linear"
              className="text-lg text-white"
            />
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
}
