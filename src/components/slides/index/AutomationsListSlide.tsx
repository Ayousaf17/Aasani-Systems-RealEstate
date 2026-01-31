import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { ExpandableCard } from '../../ui/ExpandableCard';
import { automationsList, backgroundImages } from '../../../data/indexContent';
import { automationsData } from '../../../data/automationsContent';

interface AutomationsListSlideProps {
  index: number;
}

// Map automationsList items to their full data from automationsContent
function getAutomationDetails(slideIndex: number) {
  // slideIndex is 1-indexed, automationsData is 0-indexed
  return automationsData[slideIndex - 1];
}

export function AutomationsListSlide({ index }: AutomationsListSlideProps) {
  const navigate = useNavigate();

  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:p-12 bg-neutral-900/50 w-full h-full max-w-none rounded-none px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-12 relative justify-between card-bg"
        style={{ backgroundImage: `url(${backgroundImages.automations})` }}
      >
        <div>
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4 md:mb-6">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              02 / 05 — THE AUTOMATIONS
            </span>
            <iconify-icon icon="solar:settings-linear" className="text-teal-300 text-lg md:hidden drop-shadow-md" />
            <div className="hidden md:flex items-center gap-2">
              <iconify-icon icon="solar:settings-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
                THE SAUCE
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
              What Gets Automated
            </h2>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.3} className="flex-1 flex items-center py-2 overflow-hidden">
          <div className="flex flex-col gap-1.5 w-full">
            {automationsList.map((item, i) => {
              const details = getAutomationDetails(item.slideIndex);
              return (
                <ExpandableCard
                  key={i}
                  title={item.name}
                  description={`Automation #${item.slideIndex}`}
                  statValue={details?.statValue}
                  statLabel={details?.statLabel}
                  icon={<iconify-icon icon={item.icon} className="text-xl" />}
                  className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 hover:bg-black/70 hover:border-teal-500/30 transition-all duration-300 text-left w-full"
                  collapsedContent={
                    <div className="flex items-center gap-2 w-full group">
                      <iconify-icon
                        icon={item.icon}
                        className="text-teal-300 text-base shrink-0 group-hover:scale-110 transition-transform drop-shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-white text-xs font-display font-medium block group-hover:text-teal-300 transition-colors leading-tight">
                          {item.name}
                        </span>
                        <span className="text-neutral-400 text-[10px] font-display leading-tight">
                          {item.benefit}
                        </span>
                      </div>
                      <iconify-icon
                        icon="solar:add-circle-linear"
                        className="text-teal-300/50 text-sm shrink-0"
                      />
                    </div>
                  }
                >
                  {/* Stat context */}
                  {details?.statDescription && (
                    <p className="text-neutral-400 text-sm">
                      <span className="text-teal-300 font-semibold drop-shadow-md">{details.statValue}</span> {details.statDescription}
                    </p>
                  )}

                  {/* Description */}
                  {details?.description && (
                    <p className="text-neutral-300">{details.description}</p>
                  )}

                  {/* Tools */}
                  {details?.tools && (
                    <p className="text-neutral-500 text-xs font-mono">{details.tools}</p>
                  )}
                </ExpandableCard>
              );
            })}
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="shrink-0 space-y-3">
          {/* Hint text */}
          <p className="text-center text-xs text-neutral-500 font-mono">
            <iconify-icon icon="solar:cursor-linear" className="inline-block mr-1 text-teal-300/60" />
            Tap any automation to learn more
          </p>

          <button
            onClick={() => navigate('/automations')}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 transition-colors py-3 px-6 rounded-full"
          >
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              See Full Breakdown
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
