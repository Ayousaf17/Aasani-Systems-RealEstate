import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { LeadCaptureDialog } from '../../ui/LeadCaptureDialog';
import { automationsHeroBackground } from '../../../data/automationsContent';

const ctaPoints = [
  'Free 60-minute strategy call',
  'See exactly how your tools work together',
  'We handle the backend while you stay in control',
];

export function AutomationsCTASlide() {
  const navigate = useNavigate();
  const [, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'bookatime' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14B8A6' },
          dark: { 'cal-brand': '#2DD4BF' },
        },
        hideEventTypeDetails: false,
        layout: 'week_view',
      });
    })();
  }, []);

  return (
    <section
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center z-[60]"
      id="slide-8"
    >
      <div
        className="flex flex-col md:p-12 z-10 h-full pt-8 px-5 relative card-bg"
        style={{ backgroundImage: `url(${automationsHeroBackground})` }}
      >
        <div className="slide-overlay-heavy" />
        {/* Header - Fixed */}
        <div className="flex-shrink-0 mb-8 md:mb-10 relative z-10">
          <AnimatedElement delay={0.1} className="mb-3 md:mb-4">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
              09 / 09 — NEXT STEPS
            </span>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight mb-1 slide-heading">
              We build it. You own it. We manage it.
            </h2>
            <p className="text-sm md:text-base text-neutral-200 font-display slide-body">
              Everything you need in one call.
            </p>
          </AnimatedElement>
        </div>

        {/* Quick Benefits - Fixed */}
        <AnimatedElement delay={0.3} className="flex-shrink-0 mb-10 md:mb-12 relative z-10">
          <div className="flex flex-col gap-3">
            {ctaPoints.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <iconify-icon
                  icon="solar:check-circle-bold"
                  className="text-teal-300 text-base flex-shrink-0 mt-0.5"
                />
                <span className="text-sm md:text-base text-white/90 font-display">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* CTA Area - Grows to fill space */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-8 md:pb-10 relative z-10">
          {/* Primary CTA */}
          <div className="group relative md:scale-110 cursor-pointer">
            <div className="-inset-2 group-hover:opacity-100 transition duration-500 bg-neutral-600/30 opacity-0 rounded-full absolute blur-xl" />
            <div className="absolute -inset-[1px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-[spin_2s_linear_infinite]" />
            </div>
            <button
              data-cal-namespace="bookatime"
              data-cal-link="ayub-yousaf-c1ijnf/bookatime"
              data-cal-config='{"layout":"week_view"}'
              className="group relative z-10 flex items-center justify-center overflow-hidden rounded-full p-[1px] leading-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
              <span className="relative flex h-full w-full items-center rounded-full bg-black py-4 px-8 md:py-4 md:px-10 ring-1 ring-white/10 min-h-[50px]">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <iconify-icon
                    icon="solar:calendar-add-linear"
                    className="text-lg md:text-xl text-white"
                  />
                  <span className="text-base md:text-lg font-semibold text-white font-display">
                    Book Strategy Call
                  </span>
                </span>
              </span>
            </button>
          </div>

          {/* Secondary Options - Minimal */}
          <div className="flex flex-col items-center gap-4 w-full">
            <LeadCaptureDialog
              trigger={
                <button className="text-teal-300 hover:text-teal-200 text-sm md:text-base font-display transition-colors">
                  Get the free checklist
                </button>
              }
              source="systems-page-cta"
            />

            <button
              onClick={() => navigate('/')}
              className="text-neutral-400 hover:text-neutral-300 text-sm md:text-base font-display transition-colors"
            >
              Back to overview
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
