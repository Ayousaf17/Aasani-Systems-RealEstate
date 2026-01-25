import { AnimatedElement } from '../../ui/AnimatedElement';
import { ctaChecklistItems, contactLinks } from '../../../data/automationsContent';

export function AutomationsCTASlide() {
  return (
    <section
      className="slide-container flex-shrink-0 w-full md:w-[500px] h-[calc(100vh-4rem)] md:h-auto bg-[#0A0A0A] relative flex flex-col overflow-hidden border-white/10 border-y md:border border-x-0 md:border-x shadow-2xl snap-center"
      id="slide-8"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-[#0A0A0A] to-[#0A0A0A] z-0" />

      <div className="flex flex-col z-10 h-full p-6 md:p-10 justify-between relative">
        <AnimatedElement delay={0.1} className="flex justify-between items-center">
          <span className="font-mono text-xs text-neutral-500">[09/09]</span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:arrow-right-up-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              Next Steps
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex flex-col items-start space-y-6 md:space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl text-white font-display tracking-tighter mb-4 leading-none">
              Ready to Implement These Automations?
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-mono leading-relaxed">
              These 7 automations work together as a system. Most agents
              implement 2-3 to start and add more as they grow. You don't need
              to figure it out alone.
            </p>
          </div>

          <ul className="space-y-3 w-full">
            {ctaChecklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <iconify-icon
                  icon="solar:check-circle-bold"
                  className="text-teal-400 text-lg flex-shrink-0 mt-0.5"
                />
                <span className="text-xs md:text-sm text-neutral-300 font-light">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={contactLinks.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-black rounded-full font-display font-bold tracking-tight hover:bg-teal-400 transition-all duration-200 shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }}>
              <span className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow" />
            </span>
            <span className="relative flex items-center gap-2">
              <span>BOOK YOUR FREE ASSESSMENT</span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </a>
        </AnimatedElement>

        <AnimatedElement delay={0.5} className="border-t border-white/10 pt-5">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-1">
              Questions? Reach out:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-xs font-mono text-neutral-400">
              <a
                href={`mailto:${contactLinks.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:mail" className="text-teal-500" />
                {contactLinks.email}
              </a>
              <a
                href={`tel:${contactLinks.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:phone" className="text-teal-500" />
                {contactLinks.phone}
              </a>
              <a
                href={`https://${contactLinks.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <iconify-icon icon="lucide:globe" className="text-teal-500" />
                {contactLinks.website}
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
