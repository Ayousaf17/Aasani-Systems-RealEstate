import * as React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages, problemInsights } from '../../../data/indexContent';

// Using custom research viewer modal instead of ExpandableCard for sequential navigation

interface ProblemSlideProps {
  index: number;
}

export function ProblemSlide({ index }: ProblemSlideProps) {
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setViewerOpen(false);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        setCurrentIndex((prev) => (prev < problemInsights.length - 1 ? prev + 1 : prev));
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setViewerOpen(false);
      }
    };

    if (viewerOpen) {
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
  }, [viewerOpen]);

  const openViewer = (startIndex: number = 0) => {
    setCurrentIndex(startIndex);
    setViewerOpen(true);
  };

  const currentInsight = problemInsights[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < problemInsights.length - 1;

  // Research Viewer Modal
  const modalContent = (
    <>
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {viewerOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-6 md:p-12">
            <motion.div
              ref={cardRef}
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md max-h-[70vh] flex flex-col overflow-auto rounded-2xl border shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] bg-neutral-900/95 backdrop-blur-xl border-slate-400/30 shadow-slate-500/10"
            >
              {/* Header with stat */}
              <div className="relative py-6 px-6 bg-gradient-to-br from-slate-500/20 to-slate-600/5 border-b border-white/10">
                <div className="flex items-center justify-center gap-3">
                  <iconify-icon icon={currentInsight.icon} className="text-3xl text-slate-300" />
                  <p className="text-4xl md:text-5xl font-bold font-display text-slate-300">
                    {currentInsight.value}
                  </p>
                </div>
                <p className="text-center text-neutral-400 text-sm mt-2">
                  {currentInsight.label}
                </p>
                {/* Progress indicator */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {problemInsights.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex ? 'bg-slate-300 w-4' : 'bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to insight ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 p-5">
                {/* Close button */}
                <button
                  aria-label="Close"
                  className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                  onClick={() => setViewerOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Title */}
                <div className="pr-10 mb-4">
                  <p className="text-xs font-mono uppercase tracking-wider mb-1 text-slate-300">
                    {currentInsight.description}
                  </p>
                  <h3 className="font-bold text-white text-xl font-display">
                    {currentInsight.researchTitle}
                  </h3>
                </div>

                {/* Children content */}
                <div className="text-neutral-300 text-sm leading-relaxed flex flex-col gap-3">
                  <p className="text-white font-medium italic border-l-2 border-slate-400/50 pl-3">
                    "{currentInsight.keyInsight}"
                  </p>
                  <p className="text-neutral-400">
                    {currentInsight.context}
                  </p>
                  <p className="text-teal-300 font-medium">
                    {currentInsight.aasaniAngle}
                  </p>
                  <div className="pt-2 border-t border-white/10">
                    <a
                      href={currentInsight.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-500 hover:text-teal-400 transition-colors inline-flex items-center gap-1"
                    >
                      Source: {currentInsight.source}
                      <iconify-icon icon="solar:arrow-right-up-linear" className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation footer */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-black/20">
                <button
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  disabled={!hasPrev}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    hasPrev
                      ? 'text-white hover:bg-white/10 active:scale-95'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm">Previous</span>
                </button>
                <span className="text-xs text-neutral-500 font-mono">
                  {currentIndex + 1} / {problemInsights.length}
                </span>
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  disabled={!hasNext}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    hasNext
                      ? 'text-white hover:bg-white/10 active:scale-95'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
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
        className="md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col md:max-w-xl md:pt-12 md:pr-12 md:pl-12 w-full h-full max-w-none rounded-none pt-16 pr-6 pb-6 pl-6 relative justify-start card-bg"
        style={{ backgroundImage: `url(${backgroundImages.problem})` }}
      >
        <AnimatedElement delay={0.1} className="mb-4">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            02 / 05 — THE PROBLEM
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-display leading-snug">
            20 hours back every week
          </h2>
          <p className="text-xl md:text-2xl font-display italic text-neutral-400 mt-1">
            What would you do with them?
          </p>
        </AnimatedElement>

        {/* Portal modal to body */}
        {mounted && createPortal(modalContent, document.body)}

        {/* Problem List - Clean text items */}
        <div className="flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          {problemInsights.map((insight, i) => (
            <AnimatedElement key={i} delay={0.3 + i * 0.1}>
              <button
                onClick={() => openViewer(i)}
                className={`w-full py-4 px-4 text-left transition-colors hover:bg-white/5 active:bg-white/10 ${
                  i < problemInsights.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <p className="text-white text-base leading-relaxed">{insight.keyInsight}</p>
              </button>
            </AnimatedElement>
          ))}
        </div>

        {/* Tap hint - clickable to open viewer */}
        <AnimatedElement delay={0.6} className="text-center mt-4">
          <button
            onClick={() => openViewer(0)}
            className="text-xs text-white/70 font-mono bg-black/40 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2 hover:bg-black/60 hover:text-white/90 transition-colors active:scale-95"
          >
            <iconify-icon icon="solar:hand-stars-linear" className="text-sm text-teal-300" />
            Tap to see the research
          </button>
        </AnimatedElement>
      </div>
    </section>
  );
}
