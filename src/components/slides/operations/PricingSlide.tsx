import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getCalApi } from '@calcom/embed-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import {
  pricingContent,
  comparisonTable,
  backgroundImages,
} from '../../../data/operationsContent';

interface PricingSlideProps {
  index: number;
}

export function PricingSlide({ index }: PricingSlideProps) {
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
      if (event.key === 'Escape') setComparisonOpen(false);
    };
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setComparisonOpen(false);
      }
    };

    if (comparisonOpen) {
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
  }, [comparisonOpen]);

  useEffect(() => {
    if (!tooltipOpen) return;
    const dismiss = (e: MouseEvent | TouchEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setTooltipOpen(false);
      }
    };
    document.addEventListener('mousedown', dismiss);
    document.addEventListener('touchstart', dismiss);
    return () => {
      document.removeEventListener('mousedown', dismiss);
      document.removeEventListener('touchstart', dismiss);
    };
  }, [tooltipOpen]);

  const modalContent = (
    <>
      <AnimatePresence>
        {comparisonOpen && (
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
        {comparisonOpen && (
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
              <div className="relative py-6 px-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Not Software. Partnership.</h3>
                  <p className="text-xs text-neutral-400 mt-1">What changes when you have a partner</p>
                </div>
                <button
                  aria-label="Close"
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                  onClick={() => setComparisonOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="p-5">
                <div className="rounded-lg border border-white/10 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-white/5 border-b border-white/10">
                    <div className="p-3 text-xs font-mono uppercase tracking-wider text-neutral-400" />
                    <div className="p-3 text-xs font-mono uppercase tracking-wider text-neutral-400 text-center">Software</div>
                    <div className="p-3 text-xs font-mono uppercase tracking-wider text-teal-300 text-center">Aasani</div>
                  </div>
                  {/* Table Rows */}
                  {comparisonTable.map((row, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[1.2fr_1fr_1fr] ${
                        i < comparisonTable.length - 1 ? 'border-b border-white/5' : ''
                      }`}
                    >
                      <div className="p-3 text-xs font-medium text-white break-words">{row.category}</div>
                      <div className="p-3 text-xs text-neutral-400 text-center">{row.diy}</div>
                      <div className="p-3 text-xs text-teal-300 text-center">{row.aasani}</div>
                    </div>
                  ))}
                </div>

                {/* Cost Comparison */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">Monthly Cost Comparison</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Virtual Assistant</span>
                      <span className="text-neutral-300">$1,500 - $3,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Ops Manager (part-time)</span>
                      <span className="text-neutral-300">$3,000 - $5,000</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                      <span className="text-teal-300 font-medium">Aasani Partnership</span>
                      <span className="text-teal-300 font-bold">$497</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative justify-start card-bg z-[60]"
        style={{ backgroundImage: `url(${backgroundImages.pricing})` }}
      >
        <div className="slide-overlay-heavy" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        {mounted && createPortal(modalContent, document.body)}

        <AnimatedElement delay={0.1} className="mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            06 / 07 — INVESTMENT
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-6 md:mb-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            Partnership Pricing
          </h2>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="flex-1 flex flex-col relative z-10">
          {/* Pricing Card */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-teal-300/30 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal-500/20 text-teal-300 text-xs font-mono rounded-full px-3 py-1">
                {pricingContent.badge}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-white font-display">
                {pricingContent.price}
              </span>
              <span className="text-base text-neutral-400">{pricingContent.period}</span>
              <span className="text-sm text-neutral-500 line-through ml-2">
                {pricingContent.regularPrice}{pricingContent.period}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-5">
              <p className="text-xs text-neutral-400">{pricingContent.commitmentLabel}</p>
              {pricingContent.commitment && (
                <div ref={tooltipRef} className="relative shrink-0">
                  <button
                    onClick={() => setTooltipOpen(!tooltipOpen)}
                    className="text-neutral-500 hover:text-teal-300 transition-colors"
                    aria-label="Commitment details"
                  >
                    <iconify-icon
                      icon="solar:info-circle-linear"
                      className="text-sm"
                    />
                  </button>
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 transition-all duration-200 z-50 ${tooltipOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <div className="bg-black/90 backdrop-blur-xl border border-white/15 rounded-lg p-3 shadow-xl shadow-black/40 relative">
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 border-l border-t border-white/15 rotate-45 mb-[-5px]" />
                      <div className="space-y-1.5">
                        <p className="text-[11px] text-neutral-200 leading-relaxed font-medium">{pricingContent.commitment.why}</p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">{pricingContent.commitment.month1}</p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">{pricingContent.commitment.month2}</p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">{pricingContent.commitment.month3}</p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">{pricingContent.commitment.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Included Items */}
            <div className="space-y-2 mb-5">
              {pricingContent.included.map((item, i) => (
                <p key={i} className="text-sm text-neutral-300 flex gap-2">
                  <span className="text-teal-300 shrink-0">&#10003;</span>
                  {item}
                </p>
              ))}
            </div>

            {/* Guarantee */}
            <div className="border-t border-white/10 pt-4 mb-5">
              <div className="flex gap-2 items-start">
                <iconify-icon
                  icon={pricingContent.guarantee.icon}
                  className="text-lg text-teal-300 shrink-0 mt-0.5"
                />
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pricingContent.guarantee.text}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setComparisonOpen(true)}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white text-sm font-display inline-flex items-center justify-center gap-2 transition-all duration-200 group"
              >
                Software vs Partnership
                <iconify-icon
                  icon="solar:arrow-right-linear"
                  className="text-lg text-teal-300 group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </button>

              <button
                data-cal-namespace="bookatime"
                data-cal-link="ayub-yousaf-c1ijnf/bookatime"
                data-cal-config='{"layout":"week_view"}'
                className="w-full py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-medium text-sm md:text-base transition-colors font-display cursor-pointer"
              >
                Book Your Discovery Call
              </button>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
