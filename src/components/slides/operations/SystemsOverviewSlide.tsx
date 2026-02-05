import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { systemsOverview, backgroundImages } from '../../../data/operationsContent';

interface SystemsOverviewSlideProps {
  index: number;
}

export function SystemsOverviewSlide({ index }: SystemsOverviewSlideProps) {
  const navigate = useNavigate();

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative justify-start card-bg z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.systems})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0.1} className="mb-4 md:mb-4">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            04 / 07 — HOW IT WORKS
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-4 md:mb-5">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight">
            7 Systems Across Your Entire Stack
          </h2>
          <p className="text-sm text-neutral-300 mt-2 leading-relaxed font-display">
            We don't give you 7 new tools. We connect the ones you already have into 7 automated systems.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex-1 flex flex-col min-h-0">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] min-h-0">
              {systemsOverview.map((system, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 md:px-5 py-2.5 ${
                    i < systemsOverview.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-xs font-mono text-neutral-600 shrink-0 w-5 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <iconify-icon
                    icon={system.icon}
                    className={`text-lg md:text-xl ${system.iconColor} shrink-0`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white font-display truncate">
                      {system.name}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {system.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-3 md:p-4 shrink-0">
              <button
                onClick={() => navigate('/automations')}
                className="w-full py-2.5 md:py-3 rounded-full bg-white/10 hover:bg-white/15 border border-teal-300/30 hover:border-teal-300/50 text-white text-sm md:text-base font-display inline-flex items-center justify-center gap-2 transition-all duration-200 group"
              >
                Explore All 7 Systems
                <iconify-icon
                  icon="solar:arrow-right-linear"
                  className="text-lg text-teal-300 group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
