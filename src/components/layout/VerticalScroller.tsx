import type { ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';

interface VerticalScrollerProps {
  children: ReactNode;
  totalSlides: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

export interface VerticalScrollerRef {
  scrollToSlide: (index: number) => void;
  navigateSlide: (delta: number) => void;
}

export const VerticalScroller = forwardRef<VerticalScrollerRef, VerticalScrollerProps>(
  ({ children, totalSlides, onIndexChange, className = '' }, ref) => {
    const { containerRef, currentIndex, scrollToSlide, navigateSlide } = useScrollNavigation({
      direction: 'vertical',
      totalSlides,
    });

    useEffect(() => {
      onIndexChange?.(currentIndex);
    }, [currentIndex, onIndexChange]);

    useImperativeHandle(ref, () => ({
      scrollToSlide,
      navigateSlide,
    }), [scrollToSlide, navigateSlide]);

    return (
      <main
        ref={containerRef as React.RefObject<HTMLElement>}
        className={`overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth w-full h-full scrollbar-hide ${className}`}
        style={{
          overscrollBehavior: 'none',
          scrollSnapStop: 'always',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
    );
  }
);

VerticalScroller.displayName = 'VerticalScroller';
