"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface ExpandableCardProps {
  title: string;
  src?: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  // For stat cards without images
  statValue?: string;
  statLabel?: string;
  icon?: React.ReactNode;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  statValue,
  statLabel,
  icon,
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  // Stat card variant (no image)
  const isStatCard = !src && statValue;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[101] p-4 md:p-8">
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-2xl max-h-[90vh] flex flex-col overflow-auto rounded-2xl border border-white/20 shadow-2xl",
                "[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
                classNameExpanded
              )}
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Header with image or stat */}
              {src ? (
                <motion.div layoutId={`image-${title}-${id}`}>
                  <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-10 before:bg-gradient-to-t before:from-[rgba(10,10,10,0.95)]">
                    <img
                      src={src}
                      alt={title}
                      className="w-full h-48 md:h-64 object-cover object-center"
                    />
                  </div>
                </motion.div>
              ) : isStatCard ? (
                <motion.div
                  layoutId={`stat-${title}-${id}`}
                  className="relative py-8 md:py-12 px-8 bg-gradient-to-br from-teal-500/20 to-teal-600/5 border-b border-white/10"
                >
                  <div className="flex items-center justify-center gap-4">
                    {icon && (
                      <motion.div layoutId={`icon-${title}-${id}`}>
                        {icon}
                      </motion.div>
                    )}
                    <motion.p
                      layoutId={`value-${title}-${id}`}
                      className="text-5xl md:text-6xl font-bold text-teal-400 font-display"
                    >
                      {statValue}
                    </motion.p>
                  </div>
                  <motion.p
                    layoutId={`label-${title}-${id}`}
                    className="text-center text-neutral-400 text-sm md:text-base mt-2"
                  >
                    {statLabel}
                  </motion.p>
                </motion.div>
              ) : null}

              {/* Content */}
              <div className="relative flex-1">
                <div className="flex justify-between items-start p-6 md:p-8">
                  <div className="pr-12">
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-teal-400 text-sm font-mono uppercase tracking-wider mb-2"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-bold text-white text-2xl md:text-3xl font-display"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="absolute right-4 top-4 md:right-6 md:top-6 h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    onClick={() => setActive(false)}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="px-6 md:px-8 pb-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-300 text-base leading-relaxed flex flex-col gap-4"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed Card */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-labelledby={`card-title-${id}`}
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        onKeyDown={(e) => e.key === "Enter" && setActive(true)}
        className={cn(
          "cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
          isStatCard
            ? "bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:bg-black/60 hover:border-teal-500/30"
            : "p-3 flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-black/60 hover:border-teal-500/30",
          className
        )}
      >
        {src ? (
          <>
            <motion.div layoutId={`image-${title}-${id}`}>
              <img
                src={src}
                alt={title}
                className="w-full h-40 rounded-lg object-cover object-center"
              />
            </motion.div>
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex flex-col">
                <motion.p
                  layoutId={`description-${description}-${id}`}
                  className="text-neutral-400 text-xs font-mono uppercase tracking-wider"
                >
                  {description}
                </motion.p>
                <motion.h3
                  layoutId={`title-${title}-${id}`}
                  className="text-white font-semibold font-display"
                >
                  {title}
                </motion.h3>
              </div>
              <motion.div
                layoutId={`button-${title}-${id}`}
                className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-teal-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </div>
          </>
        ) : isStatCard ? (
          <>
            {icon && (
              <motion.div layoutId={`icon-${title}-${id}`} className="mb-1">
                {icon}
              </motion.div>
            )}
            <motion.div layoutId={`stat-${title}-${id}`}>
              <motion.p
                layoutId={`value-${title}-${id}`}
                className="text-xl md:text-2xl font-bold text-teal-400 font-display"
              >
                {statValue}
              </motion.p>
            </motion.div>
            <motion.p
              layoutId={`label-${title}-${id}`}
              className="text-[10px] text-neutral-400 font-display leading-tight"
            >
              {statLabel}
            </motion.p>
            <motion.p
              layoutId={`description-${description}-${id}`}
              className="sr-only"
            >
              {description}
            </motion.p>
            <motion.h3
              layoutId={`title-${title}-${id}`}
              className="sr-only"
            >
              {title}
            </motion.h3>
            <motion.div
              layoutId={`button-${title}-${id}`}
              className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded-full bg-teal-400/10 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </motion.div>
          </>
        ) : null}
      </motion.div>
    </>
  );
}
