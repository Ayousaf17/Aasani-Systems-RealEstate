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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card - Simple scale/fade, no layoutId fly animation */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-6 md:p-12">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "w-full max-w-md max-h-[70vh] flex flex-col overflow-auto rounded-2xl border border-teal-500/30 shadow-2xl shadow-teal-500/10",
                "[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
                "bg-neutral-900/95 backdrop-blur-xl",
                classNameExpanded
              )}
            >
              {/* Header with stat */}
              {isStatCard && (
                <div className="relative py-6 px-6 bg-gradient-to-br from-teal-500/20 to-teal-600/5 border-b border-white/10">
                  <div className="flex items-center justify-center gap-3">
                    {icon && (
                      <div className="text-teal-400 text-3xl">
                        {icon}
                      </div>
                    )}
                    <p className="text-4xl md:text-5xl font-bold text-teal-400 font-display">
                      {statValue}
                    </p>
                  </div>
                  <p className="text-center text-neutral-400 text-sm mt-2">
                    {statLabel}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="relative flex-1 p-5">
                {/* Close button */}
                <button
                  aria-label="Close card"
                  className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                  onClick={() => setActive(false)}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Title */}
                <div className="pr-10 mb-4">
                  <p className="text-teal-400 text-xs font-mono uppercase tracking-wider mb-1">
                    {description}
                  </p>
                  <h3 className="font-bold text-white text-xl font-display">
                    {title}
                  </h3>
                </div>

                {/* Children content */}
                <div className="text-neutral-300 text-sm leading-relaxed flex flex-col gap-3">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed Card - dims when another card is active */}
      <div
        role="button"
        tabIndex={0}
        aria-labelledby={`card-title-${id}`}
        onClick={() => setActive(true)}
        onKeyDown={(e) => e.key === "Enter" && setActive(true)}
        className={cn(
          "cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
          isStatCard
            ? "bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:bg-black/50 hover:border-teal-500/30 active:scale-[0.98]"
            : "p-3 flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-black/50 hover:border-teal-500/30 active:scale-[0.98]",
          active && "opacity-0",
          className
        )}
      >
        {src ? (
          <>
            <img
              src={src}
              alt={title}
              className="w-full h-40 rounded-lg object-cover object-center"
            />
            <div className="flex justify-between items-center mt-3 px-1">
              <div className="flex flex-col">
                <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
                  {description}
                </p>
                <h3 className="text-white font-semibold font-display">
                  {title}
                </h3>
              </div>
              <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-teal-400">
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
              </div>
            </div>
          </>
        ) : isStatCard ? (
          <>
            {icon && (
              <div className="mb-1 text-teal-400">
                {icon}
              </div>
            )}
            <p className="text-xl md:text-2xl font-bold text-teal-400 font-display">
              {statValue}
            </p>
            <p className="text-[10px] text-neutral-400 font-display leading-tight">
              {statLabel}
            </p>
            <p className="sr-only">{description}</p>
            <h3 id={`card-title-${id}`} className="sr-only">{title}</h3>
          </>
        ) : null}
      </div>
    </>
  );
}
