import { useRef, useEffect, useState } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { contactInfo, faqContent, trustStats, leadMagnetContent } from '../../../data/indexContent';

interface CTASlideProps {
  index: number;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-left hover:bg-black/40 hover:border-teal-400/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-white font-medium font-display text-xs">
          {question}
        </span>
        <iconify-icon
          icon={isOpen ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
          className={`text-lg shrink-0 transition-colors duration-300 ${isOpen ? 'text-teal-400' : 'text-neutral-400'}`}
        />
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-neutral-400 text-[11px] font-display leading-relaxed border-t border-white/10 pt-2">
            {answer}
          </p>
        </div>
      </div>
    </button>
  );
}

export function CTASlide({ index }: CTASlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.playbackRate = 0.5;
    }
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
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-8 md:pr-8 md:pl-8 md:pb-8 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-24 pl-6 relative justify-between card-bg safe-area-bottom"
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
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/cta-bg.mp4" type="video/mp4" />
            </video>
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            >
              <source src="/cta-bg.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/70" />

        <AnimatedElement delay={0.1} className="flex justify-between items-center mb-4 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-white">
            05 / 05 — START
          </span>
          <div className="flex items-center gap-2">
            <iconify-icon icon="solar:calendar-add-linear" className="text-teal-400 text-lg" />
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-400">
              BOOK NOW
            </span>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-4 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight font-display">
            Ready to Reclaim
            <span className="block text-neutral-400 font-normal">Your Time?</span>
          </h2>
        </AnimatedElement>

        {/* Trust Stats Strip */}
        <AnimatedElement delay={0.25} className="mb-4 relative z-10">
          <div className="flex items-center justify-center gap-3 text-xs text-neutral-300 font-display">
            {trustStats.map((stat, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="text-teal-400 font-bold">{stat.value}</span>
                <span>{stat.label}</span>
                {i < trustStats.length - 1 && <span className="text-neutral-500 ml-2">•</span>}
              </span>
            ))}
          </div>
        </AnimatedElement>

        {/* Primary CTA with Beam Animation */}
        <AnimatedElement delay={0.3} className="flex flex-col items-center gap-4 relative z-10">
          <div className="group relative cursor-pointer">
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
                  <span className="md:text-base text-sm font-medium text-white tracking-wide">
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

          {/* Secondary CTA - Checklist Link */}
          <a
            href={leadMagnetContent.checklistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-neutral-400 hover:text-teal-400 transition-colors text-sm font-display"
          >
            <span>Not ready? Grab the free checklist</span>
            <iconify-icon
              icon="solar:arrow-right-up-linear"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </AnimatedElement>

        {/* FAQ Accordion */}
        <AnimatedElement delay={0.4} className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto scrollbar-hide relative z-10">
          {faqContent.items.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openFaqIndex === i}
              onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
            />
          ))}
        </AnimatedElement>

        {/* Contact Footer */}
        <AnimatedElement delay={0.5} className="w-full shrink-0 relative z-10 mt-4">
          <div className="w-full border-t border-white/20 pt-4">
            <div className="flex items-center justify-center gap-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Email us"
              >
                <iconify-icon icon="lucide:mail" className="text-teal-400 text-xl" />
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Call us"
              >
                <iconify-icon icon="lucide:phone" className="text-teal-400 text-xl" />
              </a>
              <a
                href={`https://${contactInfo.website.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-teal-500/20 hover:border-teal-500/50 focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all"
                aria-label="Visit our website"
              >
                <iconify-icon icon="lucide:globe" className="text-teal-400 text-xl" />
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
