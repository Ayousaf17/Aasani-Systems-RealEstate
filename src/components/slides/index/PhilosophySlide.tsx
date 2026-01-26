import { AnimatedElement } from '../../ui/AnimatedElement';
import { philosophyQuotes, backgroundImages } from '../../../data/indexContent';

interface PhilosophySlideProps {
  index: number;
  onNavigate: (delta: number) => void;
}

export function PhilosophySlide({ index, onNavigate }: PhilosophySlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-clear overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative shadow-2xl card-bg"
        style={{ backgroundImage: `url(${backgroundImages.philosophy})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10 pointer-events-none" />

        <div className="md:p-12 md:pt-12 z-20 pt-16 pr-6 pb-4 pl-6 relative">
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 drop-shadow-md">
              [07/08]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:cup-star-linear" className="text-teal-400 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400 drop-shadow-md">
                PHILOSOPHY
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-normal text-white tracking-tighter mb-2 drop-shadow-lg font-display">
              Build Better
              <br />
              Operations
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <p className="text-lg md:text-2xl font-light text-neutral-400 tracking-tight drop-shadow-md font-display">
              Aasani Systems is the difference.
            </p>
          </AnimatedElement>
        </div>

        <div className="z-20 md:px-12 flex-1 flex flex-col pr-6 pl-6 relative justify-center py-4">
          <AnimatedElement delay={0.4} className="flex flex-col gap-3 w-full">
            {philosophyQuotes.map((quote, i) => (
              <div
                key={i}
                className="bg-black/50 backdrop-blur-sm border border-white/10 border-l-2 border-l-white/80 p-3 md:p-4 rounded-sm"
              >
                <p className="text-sm md:text-base text-neutral-100 font-medium font-display">
                  "{quote}"
                </p>
              </div>
            ))}
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.6} className="md:p-12 z-20 pt-4 pr-6 pb-8 pl-6 relative">
          <button
            onClick={() => onNavigate(1)}
            className="group flex md:py-4 overflow-hidden hover:bg-neutral-200 transition-colors cursor-pointer text-black bg-white opacity-95 w-full rounded-full py-3 relative shadow-xl gap-2 items-center justify-center"
          >
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest z-10">
              See How
            </span>
            <iconify-icon
              icon="solar:arrow-down-linear"
              className="text-xl md:text-2xl z-10 group-hover:translate-y-1 transition-transform"
            />
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
}
