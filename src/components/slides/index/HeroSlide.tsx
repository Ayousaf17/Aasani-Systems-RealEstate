import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages, heroStat } from '../../../data/indexContent';

interface HeroSlideProps {
  index: number;
}

export function HeroSlide({ index }: HeroSlideProps) {
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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col group md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-12 pr-5 pb-4 pl-5 relative shadow-2xl justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.hero})` }}
      >
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            01 / 05 — WELCOME
          </span>
          <iconify-icon icon="solar:home-2-linear" className="text-teal-400 text-lg md:hidden" />
          <div className="hidden md:flex items-center gap-2">
            <iconify-icon icon="solar:home-2-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              HOME
            </span>
          </div>
        </AnimatedElement>

        <div className="flex-1 flex flex-col z-10 relative justify-center">
          {/* Icon - just above headline like Aura template */}
          <AnimatedElement delay={0.2} className="flex bg-gradient-to-br from-teal-500/10 to-white/0 w-12 h-12 md:w-14 md:h-14 rounded-lg backdrop-blur-md border border-teal-400/20 items-center justify-center mb-6 md:mb-8">
            <iconify-icon icon="solar:settings-minimalistic-linear" className="text-2xl md:text-3xl text-white" />
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <h1 className="text-4xl md:text-5xl leading-[0.95] font-bold text-white tracking-tight font-display mb-4">
              Stop Losing Deals
              <span className="block text-neutral-400 font-normal">to Slow Response</span>
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={0.35} className="mt-4 md:mt-6">
            <p className="text-xl md:text-2xl font-light text-teal-400 tracking-tight leading-tight font-display">
              Reclaim 20+ hours/week. Be the agent your clients remember.
            </p>
          </AnimatedElement>

          {/* Pain stat callout */}
          <AnimatedElement delay={0.4} className="mt-6 md:mt-8">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <span className="text-teal-400 font-bold font-display">{heroStat.value}</span>
              <span className="text-neutral-300 text-sm font-display">{heroStat.text}</span>
            </div>
          </AnimatedElement>

          {/* CTA Button visible above the fold */}
          <AnimatedElement delay={0.45} className="mt-6 md:mt-8">
            <button
              data-cal-namespace="bookatime"
              data-cal-link="ayub-yousaf-c1ijnf/bookatime"
              data-cal-config='{"layout":"week_view"}'
              className="group relative inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 transition-colors py-3 px-6 rounded-full overflow-hidden"
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="group-hover:animate-[shimmer_1.5s_infinite] group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12" />
              </span>
              <span className="relative z-10 text-sm font-semibold text-white uppercase tracking-wide">
                Book Free Strategy Call
              </span>
              <iconify-icon
                icon="solar:calendar-add-linear"
                className="relative z-10 text-lg text-white"
              />
            </button>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.5} className="space-y-6 mt-auto">
          <div className="h-[1px] w-full bg-white/20" />
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Online
            </div>
            <iconify-icon icon="solar:arrow-down-linear" className="text-2xl text-white animate-bounce" />
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
