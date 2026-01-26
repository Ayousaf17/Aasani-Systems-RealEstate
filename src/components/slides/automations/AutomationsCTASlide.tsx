import { AnimatedElement } from '../../ui/AnimatedElement';
import { ctaChecklistItems, contactLinks } from '../../../data/automationsContent';

export function AutomationsCTASlide() {
  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center"
      id="slide-8"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-[#0A0A0A] to-[#0A0A0A] z-0" />

      <div className="flex flex-col z-10 h-full pt-12 px-5 pb-5 md:p-12 justify-between relative">
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">[09/09]</span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:arrow-right-up-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              Next Steps
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
            Ready to Implement
            <span className="block text-neutral-400 font-normal">These Automations?</span>
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex flex-col items-start space-y-4 md:space-y-6">
          <p className="text-sm md:text-base text-neutral-400 font-display leading-relaxed">
            These 7 automations work together as a system. Most agents
            implement 2-3 to start and add more as they grow. You don't need
            to figure it out alone.
          </p>

          <ul className="space-y-2 md:space-y-3 w-full">
            {ctaChecklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 md:gap-3">
                <iconify-icon
                  icon="solar:check-circle-bold"
                  className="text-teal-400 text-lg flex-shrink-0 mt-0.5"
                />
                <span className="text-sm md:text-base text-neutral-300 font-light font-display">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Button matching page 1 CTA style */}
          <div className="group relative w-full cursor-pointer">
            <div className="-inset-2 group-hover:opacity-100 transition duration-500 bg-neutral-600/30 opacity-0 rounded-full absolute blur-xl" />
            <a
              href={contactLinks.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-10 flex items-center justify-center overflow-hidden rounded-full p-[1px] leading-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-black py-3 px-6 md:py-4 md:px-8 ring-1 ring-white/10">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="md:text-lg text-sm font-medium text-white tracking-wide font-display">
                    Book Free Assessment
                  </span>
                  <iconify-icon
                    icon="solar:calendar-add-linear"
                    className="text-lg md:text-xl text-white transition-colors"
                  />
                </span>
              </span>
            </a>
          </div>
        </AnimatedElement>

        {/* Footer matching page 1 CTA style */}
        <AnimatedElement delay={0.5} className="w-full shrink-0">
          <span className="block text-[10px] text-neutral-400 font-mono uppercase tracking-widest text-center mb-3 md:mb-4">
            Questions? Reach out:
          </span>

          <div className="w-full border-t border-white/20 pt-4 md:pt-5">
            <div className="flex items-center justify-center gap-5 md:gap-6">
              <a
                href={`mailto:${contactLinks.email}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Email us"
              >
                <iconify-icon icon="lucide:mail" className="text-teal-400 text-2xl" />
              </a>
              <a
                href={`tel:${contactLinks.phone.replace(/\D/g, '')}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Call us"
              >
                <iconify-icon icon="lucide:phone" className="text-teal-400 text-2xl" />
              </a>
              <a
                href={`https://${contactLinks.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Visit our website"
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
