import { AnimatedElement } from '../../ui/AnimatedElement';
import { processSteps, backgroundImages } from '../../../data/indexContent';

interface HowItWorksSlideProps {
  index: number;
}

export function HowItWorksSlide({ index }: HowItWorksSlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full h-screen relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-20 pr-6 pb-12 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.howItWorks})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            [06/08]
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:routing-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              PROCESS
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2}>
          <h2 className="md:text-5xl text-3xl font-normal text-white tracking-tight mb-8 font-display">
            How It Works
          </h2>
        </AnimatedElement>

        <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide flex-1 min-h-0 pb-4">
          {processSteps.map((step, i) => (
            <AnimatedElement
              key={i}
              delay={0.3 + i * 0.1}
              className="group bg-black/40 backdrop-blur-md border border-white/10 p-5 w-full hover:bg-black/50 transition-colors duration-500 rounded-sm shrink-0"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-2xl font-bold text-orange-400 font-mono">{step.number}</span>
                <h3 className="text-white font-medium text-lg leading-tight font-display">
                  {step.title}
                  <span className="text-neutral-500 text-sm font-normal block md:inline md:ml-2">
                    ({step.duration})
                  </span>
                </h3>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed pl-[3rem] font-display">
                {step.description}
              </p>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
