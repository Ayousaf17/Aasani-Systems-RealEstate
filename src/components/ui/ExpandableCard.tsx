"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
  // Custom collapsed content (overrides default rendering)
  collapsedContent?: React.ReactNode;
  // Color variant: 'solution' (teal) or 'problem' (red)
  variant?: 'solution' | 'problem';
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
  collapsedContent,
  variant = 'solution',
}: ExpandableCardProps) {
  // Color classes based on variant
  const colors = variant === 'problem'
    ? {
        accent: 'text-slate-300',
        borderHover: 'hover:border-slate-400/30',
        headerBg: 'from-slate-500/20 to-slate-600/5',
        borderExpanded: 'border-slate-400/30',
        shadow: 'shadow-slate-500/10',
        ring: 'focus-visible:ring-slate-400',
      }
    : {
        accent: 'text-teal-400',
        borderHover: 'hover:border-teal-500/30',
        headerBg: 'from-teal-500/20 to-teal-600/5',
        borderExpanded: 'border-teal-500/30',
        shadow: 'shadow-teal-500/10',
        ring: 'focus-visible:ring-teal-400',
      };
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

  // Track if mounted for portal (SSR safety)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Modal content to be portaled
  const modalContent = (
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
                "w-full max-w-md max-h-[70vh] flex flex-col overflow-auto rounded-2xl border shadow-2xl",
                "[scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
                "bg-neutral-900/95 backdrop-blur-xl",
                colors.borderExpanded,
                colors.shadow,
                classNameExpanded
              )}
            >
              {/* Header with stat */}
              {isStatCard && (
                <div className={cn("relative py-6 px-6 bg-gradient-to-br border-b border-white/10", colors.headerBg)}>
                  <div className="flex items-center justify-center gap-3">
                    {icon && (
                      <div className={cn("text-3xl", colors.accent)}>
                        {icon}
                      </div>
                    )}
                    <p className={cn("text-4xl md:text-5xl font-bold font-display", colors.accent)}>
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
                  <p className={cn("text-xs font-mono uppercase tracking-wider mb-1", colors.accent)}>
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
    </>
  );

  return (
    <>
      {/* Portal modal to body for proper fixed positioning */}
      {mounted && createPortal(modalContent, document.body)}

      {/* Collapsed Card - dims when another card is active */}
      <div
        role="button"
        tabIndex={0}
        aria-labelledby={`card-title-${id}`}
        onClick={() => setActive(true)}
        onKeyDown={(e) => e.key === "Enter" && setActive(true)}
        className={cn(
          "cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2",
          colors.ring,
          isStatCard
            ? cn("bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center hover:bg-black/50 active:scale-[0.98]", colors.borderHover)
            : cn("p-3 flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-black/50 active:scale-[0.98]", colors.borderHover),
          active && "opacity-0",
          className
        )}
      >
        {collapsedContent ? (
          <>
            {collapsedContent}
            <h3 id={`card-title-${id}`} className="sr-only">{title}</h3>
          </>
        ) : src ? (
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
              <div className={cn("h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10", colors.accent)}>
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
              <div className={cn("mb-1", colors.accent)}>
                {icon}
              </div>
            )}
            <p className={cn("text-xl md:text-2xl font-bold font-display", colors.accent)}>
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
