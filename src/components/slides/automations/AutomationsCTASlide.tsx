import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { contactLinks } from '../../../data/automationsContent';

const ctaChecklist = [
  'Free 30-minute strategy call',
  'Custom automation roadmap for your business',
];

export function AutomationsCTASlide() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Set video playback rate and handle fade loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    video.playbackRate = 0.5;

    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      // Fade out during last 1 second
      if (timeLeft < 1) {
        setVideoOpacity(timeLeft);
      } else if (video.currentTime < 1) {
        // Fade in during first 1 second
        setVideoOpacity(video.currentTime);
      } else {
        setVideoOpacity(1);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [prefersReducedMotion]);

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
      className="slide-container flex-shrink-0 bg-[#0A0A0A] relative flex flex-col overflow-hidden border border-white/10 shadow-2xl snap-center"
      id="slide-8"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: videoOpacity }}
          >
            <source src="/automations-cta-bg.mp4" type="video/mp4" />
          </video>
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          >
            <source src="/automations-cta-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/70" />

      <div className="flex flex-col z-10 h-full pt-12 px-5 pb-5 md:p-12 justify-between relative">
        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4 md:mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-white">[09/09]</span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:arrow-right-up-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              Next Steps
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight font-display">
            Ready to Implement
            <span className="block text-neutral-400 font-normal">These Automations?</span>
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex flex-col items-center gap-3 w-full">
          {ctaChecklist.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <iconify-icon
                icon="solar:check-circle-bold"
                className="text-teal-400 text-lg flex-shrink-0"
              />
              <span className="text-sm md:text-base text-white font-display">
                {item}
              </span>
            </div>
          ))}
        </AnimatedElement>

        <AnimatedElement delay={0.4} className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
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
              <span className="relative flex h-full w-full items-center rounded-full bg-black py-3 px-6 md:py-4 md:px-8 ring-1 ring-white/10">
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
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white font-mono uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm md:text-base text-neutral-300 text-center font-display">
              See the full picture first
            </p>
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              <iconify-icon
                icon="solar:arrow-left-linear"
                className="group-hover:-translate-x-1 transition-transform"
                width={18}
                height={18}
              />
              <span className="text-sm md:text-base">Back to Overview</span>
            </button>
          </div>
        </AnimatedElement>

        {/* Footer matching page 1 CTA style */}
        <AnimatedElement delay={0.5} className="w-full shrink-0">
          <span className="block text-[10px] text-white font-mono uppercase tracking-widest text-center mb-3 md:mb-4">
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
