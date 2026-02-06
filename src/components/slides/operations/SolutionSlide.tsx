import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import {
  solutionValueProps,
  toolCategories,
  backgroundImages,
} from '../../../data/operationsContent';

interface SolutionSlideProps {
  index: number;
}

export function SolutionSlide({ index }: SolutionSlideProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setToolsOpen(false);
    };
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };

    if (toolsOpen) {
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
  }, [toolsOpen]);

  const modalContent = (
    <>
      <AnimatePresence>
        {toolsOpen && (
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
        {toolsOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-6 md:p-12">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg max-h-[80vh] flex flex-col overflow-auto rounded-2xl border shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] bg-black/40 backdrop-blur-2xl border-white/20 shadow-black/20"
            >
              {/* Header */}
              <div className="relative py-6 px-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Tools We Work With</h3>
                  <p className="text-xs text-neutral-400 mt-1">We connect your existing tools — not replace them</p>
                </div>
                <button
                  aria-label="Close"
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                  onClick={() => setToolsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tool Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {toolCategories.map((category, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-teal-300 mb-2">
                        {category.name}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {category.tools.map((tool, j) => (
                          <span
                            key={j}
                            className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-neutral-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-6 text-center font-mono">
                  Plus 20+ more tools and growing
                </p>
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
        style={{ backgroundImage: `url(${backgroundImages.solution})` }}
      >
        <div className="slide-overlay-heavy" />
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-0 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none md:hidden" />

        {mounted && createPortal(modalContent, document.body)}

        <AnimatedElement delay={0.1} className="mb-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 slide-label">
            03 / 07 — THE SOLUTION
          </span>
        </AnimatedElement>

        <AnimatedElement delay={0.2} className="mb-8 md:mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-display leading-tight slide-heading">
            We Don't Replace Your Tools.
          </h2>
          <p className="text-xs md:text-sm uppercase tracking-widest font-mono text-teal-300 mt-4 slide-label">
            We make them work together
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.3} className="relative z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            <div className="flex flex-col gap-5 md:gap-6">
              {solutionValueProps.map((prop, i) => (
                <div key={i} className="flex gap-x-4 items-start">
                  <iconify-icon
                    icon={prop.icon}
                    className="text-xl md:text-2xl text-teal-300 shrink-0 mt-0.5 drop-shadow-md"
                  />
                  <div>
                    <p className="text-base font-bold text-white font-display">
                      {prop.headline}
                    </p>
                    <p className="text-sm text-neutral-400 leading-relaxed mt-0.5">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setToolsOpen(true)}
              className="w-full mt-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-teal-300/30 hover:border-teal-300/50 text-white text-sm md:text-base font-display inline-flex items-center justify-center gap-2 transition-all duration-200 group"
            >
              See What Tools We Work With
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
