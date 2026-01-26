import { useNavigate } from 'react-router-dom';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { contactInfo, backgroundImages } from '../../../data/indexContent';

interface CTASlideProps {
  index: number;
}

export function CTASlide({ index }: CTASlideProps) {
  const navigate = useNavigate();

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-between card-bg safe-area-bottom"
        style={{ backgroundImage: `url(${backgroundImages.cta})` }}
      >
        <div className="w-full relative z-10">
          <AnimatedElement delay={0.1} className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              [08/08]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:calendar-add-linear" className="text-teal-400 text-lg" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
                BOOK NOW
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 font-display">
              Ready to Reclaim
              <span className="block text-neutral-400 font-normal">20+ Hours Per Week?</span>
            </h2>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.4} className="flex-1 flex flex-col items-center justify-center gap-5 w-full">
          <div className="flex flex-col items-center gap-4">
            <div className="group relative md:scale-110 cursor-pointer">
              <div className="-inset-2 group-hover:opacity-100 transition duration-500 bg-neutral-600/30 opacity-0 rounded-full absolute blur-xl" />
              <div className="absolute -inset-[1px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_2s_linear_infinite]" />
              </div>
              <a
                href={contactInfo.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-10 flex items-center justify-center overflow-hidden rounded-full p-[1px] leading-none"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
                <span className="relative flex h-full w-full items-center rounded-full bg-black py-3 px-6 md:py-4 md:px-8 ring-1 ring-white/10">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                  </span>
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="md:text-lg text-sm font-medium text-white tracking-wide">
                      Book Free Assessment
                    </span>
                    <iconify-icon
                      icon="solar:calendar-add-linear"
                      className="text-lg md:text-xl text-neutral-400 group-hover:text-white transition-colors"
                    />
                  </span>
                </span>
              </a>
            </div>
            <p className="text-xs md:text-sm font-light text-neutral-50 text-center max-w-sm font-display">
              No pressure. No pitch. Just value.
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <p className="md:text-sm leading-tight text-xs font-light text-neutral-50 text-center font-display">
              Want to see exactly what gets automated? Review the detailed breakdown first.
            </p>
            <div className="group/sec relative cursor-pointer">
              <div className="-inset-2 group-hover/sec:opacity-100 transition duration-500 bg-neutral-600/20 opacity-0 rounded-full absolute blur-xl" />
              <div className="absolute -inset-[1px] rounded-full overflow-hidden opacity-0 group-hover/sec:opacity-100 transition duration-500 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_2s_linear_infinite]" />
              </div>
              <button
                onClick={() => navigate('/automations')}
                className="relative z-10 flex items-center justify-center overflow-hidden rounded-full p-[1px] leading-none"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover/sec:opacity-100 transition-opacity duration-500" />
                <span className="relative flex h-full w-full items-center rounded-full bg-black/80 py-2 px-4 ring-1 ring-white/20 gap-2">
                  <span className="text-xs md:text-sm font-medium text-neutral-200 group-hover/sec:text-white transition-colors font-display">View the 7 Automations Breakdown</span>
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    className="group-hover/sec:translate-x-1 transition-transform text-neutral-400 group-hover/sec:text-white"
                    width={16}
                    height={16}
                  />
                </span>
              </button>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="w-full border-t border-white/10 pt-4">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">
              Questions? Reach out:
            </span>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 transition-all"
                aria-label="Email"
              >
                <iconify-icon icon="lucide:mail" className="text-teal-400 text-2xl" />
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 transition-all"
                aria-label="Phone"
              >
                <iconify-icon icon="lucide:phone" className="text-teal-400 text-2xl" />
              </a>
              <a
                href={`https://${contactInfo.website.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 transition-all"
                aria-label="Website"
              >
                <iconify-icon icon="lucide:globe" className="text-teal-400 text-2xl" />
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
