import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages } from '../../../data/indexContent';

interface CTASlideProps {
  index: number;
}

export function CTASlide({ index }: CTASlideProps) {
  const navigate = useNavigate();

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
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none px-6 md:px-12 pb-8 md:pb-12 pt-20 md:pt-12 relative justify-between card-bg safe-area-bottom z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.cta})` }}
      >
        <div className="slide-overlay-heavy" />
        {/* Bottom fade gradient - subtle mobile transition */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        <AnimatedElement delay={0.1} className="mb-4 md:mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            05 / 05 — BOOK NOW
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-6 md:mb-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            Let's Get Started
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-4 slide-label">
            We wire them. You own them. We manage the rest
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex-1 flex flex-col items-center justify-center gap-6 w-full relative z-10">
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
              <span className="relative flex h-full w-full items-center rounded-full bg-black py-4 px-6 md:py-4 md:px-8 ring-1 ring-white/10 min-h-[44px]">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <span className="md:text-lg text-sm font-medium text-white tracking-wide">
                    Book Strategy Call
                  </span>
                  <iconify-icon
                    icon="solar:calendar-add-linear"
                    className="text-lg md:text-xl text-white transition-colors"
                  />
                </span>
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white font-mono uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Secondary Options */}
          <div className="flex flex-col items-center gap-6 w-full max-w-xs">
            {/* Check Your Systems Link */}
            <button
              onClick={() => navigate('/checklist')}
              className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <iconify-icon icon="solar:document-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="text-sm md:text-base font-medium">Check your systems first</span>
              <iconify-icon
                icon="solar:arrow-right-up-linear"
                className="text-teal-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform drop-shadow-md"
                width={16}
                height={16}
              />
            </button>

            {/* Visual separator */}
            <div className="w-12 h-px bg-white/20" />

            {/* View Systems Link */}
            <button
              onClick={() => navigate('/automations')}
              className="group flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors font-medium drop-shadow-md"
            >
              <span className="text-sm md:text-base">View the 7 Systems</span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="group-hover:translate-x-1 transition-transform"
                width={18}
                height={18}
              />
            </button>
          </div>
        </AnimatedElement>

      </div>
    </section>
  );
}
