import { AnimatedElement } from '../../ui/AnimatedElement';
import { philosophyQuotes, backgroundImages } from '../../../data/indexContent';

interface PhilosophySlideProps {
  index: number;
  onNavigate: (delta: number) => void;
}

export function PhilosophySlide({ index, onNavigate }: PhilosophySlideProps) {
  return (
    <section
      className="snap-start shrink-0 flex w-full h-screen relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-clear overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative justify-between shadow-2xl card-bg"
        style={{ backgroundImage: `url(${backgroundImages.philosophy})` }}
      >
        <div className="md:p-12 md:pt-12 z-20 pt-20 pr-6 pb-6 pl-6 relative">
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
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
            <h1 className="text-5xl font-normal text-white tracking-tighter mt-6 mb-3 drop-shadow-lg md:text-5xl font-display">
              Build Better
              <br />
              Operations.
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <p className="md:text-2xl text-xl font-light text-neutral-500/90 tracking-tight drop-shadow-md backdrop-blur">
              Aasani Systems is the difference.
            </p>
          </AnimatedElement>
        </div>

        <div className="z-20 md:px-12 flex-1 flex flex-col pr-6 pl-6 relative justify-center">
          <AnimatedElement delay={0.4} className="flex flex-col gap-4 w-full max-w-md">
            {philosophyQuotes.map((quote, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-md border border-white/10 border-l-2 border-l-white p-4 rounded-sm hover:bg-black/50 transition-colors"
              >
                <p className="text-sm md:text-base text-neutral-100 font-medium">
                  "{quote}"
                </p>
              </div>
            ))}
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.6} className="md:p-12 z-20 bg-gradient-to-t from-black/60 to-transparent pt-6 pr-6 pb-12 pl-6 relative">
          <button
            onClick={() => onNavigate(1)}
            className="group flex md:py-5 overflow-hidden hover:bg-neutral-200 transition-colors cursor-pointer text-black bg-white opacity-95 w-full rounded-full pt-4 pb-4 relative shadow-xl gap-x-3 gap-y-3 items-center justify-center"
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
