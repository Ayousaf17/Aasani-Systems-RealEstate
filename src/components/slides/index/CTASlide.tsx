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
      className="snap-start shrink-0 flex w-full h-screen relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-20 pr-6 pb-12 pl-6 relative justify-between card-bg"
        style={{ backgroundImage: `url(${backgroundImages.cta})` }}
      >
        <div className="w-full relative z-10">
          <AnimatedElement delay={0.1} className="flex justify-between items-center absolute top-0 left-0 right-0">
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

          <AnimatedElement delay={0.2} className="mt-12">
            <h2 className="md:text-5xl leading-[1] text-4xl font-normal text-white tracking-tighter mb-6 font-display">
              Ready to Reclaim
              <span className="block text-neutral-400">20+ Hours Per Week?</span>
            </h2>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.4} className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="group relative scale-110 md:scale-125 cursor-pointer">
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
                <span className="relative flex h-full w-full items-center rounded-full bg-black pt-4 pr-8 pb-4 pl-8 ring-1 ring-white/10">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                  </span>
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="md:text-lg text-base font-medium text-white tracking-wide">
                      Book Free Assessment
                    </span>
                    <iconify-icon
                      icon="solar:calendar-add-linear"
                      className="text-xl text-neutral-400 group-hover:text-white transition-colors"
                    />
                  </span>
                </span>
              </a>
            </div>
            <p className="text-sm font-light text-neutral-50 text-center max-w-sm font-display">
              No pressure. No pitch. Just value.
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-3 pt-2">
            <p className="md:text-sm leading-tight text-xs font-light text-neutral-50 text-center font-display">
              Want to see exactly what gets automated?
              Review the detailed breakdown first.
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
                <span className="relative flex h-full w-full items-center rounded-full bg-black/80 pt-2.5 pr-5 pb-2.5 pl-5 ring-1 ring-white/20 gap-2">
                  <span className="text-sm font-medium text-neutral-200 group-hover/sec:text-white transition-colors font-display">View the 7 Automations Breakdown</span>
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    className="group-hover/sec:translate-x-1 transition-transform text-lg text-neutral-400 group-hover/sec:text-white"
                    width={18}
                    height={18}
                  />
                </span>
              </button>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="w-full border-t border-white/10 pt-5">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">
              Questions? Reach out:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-xs font-mono text-neutral-400">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:mail" className="text-teal-500" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:phone" className="text-teal-500" />
                {contactInfo.phone}
              </a>
              <a
                href={`https://${contactInfo.website.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:globe" className="text-teal-500" />
                {contactInfo.website}
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
