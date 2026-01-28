import * as React from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { backgroundImages, problemInsights } from '../../../data/indexContent';

// Pain points for display (emotional, not stat-heavy)
// "See Research" button opens the detailed research modal
const painPoints = [
  {
    icon: 'solar:clock-circle-linear',
    text: "Leads slip through while you're with clients",
  },
  {
    icon: 'solar:hourglass-linear',
    text: 'Admin eats your evenings and weekends',
  },
  {
    icon: 'solar:users-group-rounded-linear',
    text: 'Follow-ups fall through the cracks',
  },
];

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
            className="fixed inset-0 bg-black/40 backdrop-blur-md h-full w-full z-[100]"
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
              className="w-full max-w-md max-h-[70vh] flex flex-col overflow-auto rounded-2xl border shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] bg-black/40 backdrop-blur-2xl border-white/20 shadow-black/20"
            >
              {/* Header with icon only */}
              <div className="relative py-8 px-6 bg-white/5 border-b border-white/10 flex flex-col items-center">
                <iconify-icon icon={currentInsight.icon} className="text-5xl md:text-6xl text-slate-300 mb-3" />
                <p className="text-center text-xl md:text-2xl font-bold font-display text-slate-300">
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
              <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-white/5">
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
        <AnimatedElement delay={0.1} className="mb-6">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
            02 / 05 — THE PROBLEM
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight">
            20 hours back every week
          </h2>
          <p className="text-2xl md:text-3xl font-normal text-neutral-400 tracking-tight font-display">
            What would you do with them?
          </p>
        </AnimatedElement>

        {/* Portal modal to body */}
        {mounted && createPortal(modalContent, document.body)}

        <AnimatedElement delay={0.3}>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            {/* Pain points - emotional, not stat-heavy */}
            <div className="flex flex-col gap-6 md:gap-7">
              {painPoints.map((point, i) => (
                <div key={i} className="flex gap-x-4 items-start">
                  <iconify-icon
                    icon={point.icon}
                    className="text-2xl md:text-3xl text-slate-300 shrink-0 mt-0.5 drop-shadow-md"
                  />
                  <p className="text-lg md:text-xl leading-relaxed text-white font-display">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* See Research button */}
            <button
              onClick={() => openViewer(0)}
              className="w-full mt-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-teal-300/30 hover:border-teal-300/50 text-white text-sm md:text-base font-display inline-flex items-center justify-center gap-2 transition-all duration-200 group"
            >
              See Research
              <iconify-icon
                icon="solar:arrow-right-linear"
                className="text-lg text-teal-300 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
