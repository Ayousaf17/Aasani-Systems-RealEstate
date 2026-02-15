import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { ctaContent, faqItems, backgroundImages } from '../../../data/operationsContent';

interface FinalCTASlideProps {
  index: number;
}

export function FinalCTASlide({ index }: FinalCTASlideProps) {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFaqOpen(false);
    };
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setFaqOpen(false);
      }
    };

    if (faqOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [faqOpen]);

  const toggleFaqItem = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  const modalContent = (
    <>
      <AnimatePresence>
        {faqOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {faqOpen && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 flex items-center justify-center z-[101] p-6 md:p-12">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-[calc(100vw-2rem)] md:max-w-lg max-h-[80vh] flex flex-col overflow-auto rounded-2xl border shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] bg-black/40 backdrop-blur-2xl border-white/20 shadow-black/20"
            >
              {/* Header */}
              <div className="relative py-6 px-6 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Common Questions</h3>
                  <p className="text-xs text-neutral-400 mt-1">Everything you need to know</p>
                </div>
                <button
                  aria-label="Close"
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                  onClick={() => setFaqOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* FAQ Items */}
              <div className="p-5">
                {faqItems.map((item, i) => (
                  <div
                    key={i}
                    className={`${i < faqItems.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <button
                      onClick={() => toggleFaqItem(i)}
                      className="w-full py-4 flex items-center justify-between gap-3 text-left"
                    >
                      <span className="text-sm font-medium text-white font-display">
                        {item.question}
                      </span>
                      <iconify-icon
                        icon={activeIndex === i ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
                        className="text-lg text-neutral-400 shrink-0"
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeIndex === i ? 'max-h-[500px] pb-4' : 'max-h-0'
                      }`}
                    >
                      {item.sections ? (
                        <div className="space-y-3">
                          {item.sections.map((section, si) => (
                            <div key={si}>
                              <p className="text-xs font-mono uppercase text-teal-300/70 mb-1.5">
                                {section.heading}
                              </p>
                              <div className="space-y-1">
                                {section.items.map((sItem, sii) => (
                                  <p key={sii} className="text-sm text-neutral-400 leading-relaxed flex gap-2">
                                    <span className="text-neutral-500 shrink-0">&rarr;</span>
                                    {sItem}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <section
      className="snap-start snap-always shrink-0 flex w-full slide-height relative items-center justify-center overflow-hidden"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:p-12 w-full h-full max-w-none rounded-none px-6 md:px-12 pb-8 md:pb-12 pt-16 md:pt-12 relative justify-between card-bg safe-area-bottom z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.cta})` }}
      >
        <div className="slide-overlay-heavy" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        {mounted && createPortal(modalContent, document.body)}

        <AnimatedElement delay={0.1} className="mb-4 md:mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            {ctaContent.label}
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-6 md:mb-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            {ctaContent.headline}
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-4 slide-label">
            {ctaContent.subheadline}
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex-1 flex flex-col items-center justify-center gap-6 w-full relative z-10">
          {/* Primary CTA */}
          <div className="group relative lg:scale-110 cursor-pointer">
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
                    {ctaContent.ctaPrimary}
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

            {/* FAQ Button */}
            <button
              onClick={() => setFaqOpen(true)}
              className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <iconify-icon icon="solar:question-circle-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="text-sm md:text-base font-medium">Common Questions</span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-teal-300 group-hover:translate-x-0.5 transition-transform drop-shadow-md"
                width={16}
                height={16}
              />
            </button>
          </div>
        </AnimatedElement>

      </div>
    </section>
  );
}
