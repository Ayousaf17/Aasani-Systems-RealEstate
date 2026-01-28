import type { ReactNode } from 'react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

interface HorizontalScrollerProps {
  children: ReactNode;
  totalSlides: number;
  onIndexChange?: (index: number) => void;
}

export interface HorizontalScrollerRef {
  scrollToSlide: (index: number) => void;
}

export const HorizontalScroller = forwardRef<HorizontalScrollerRef, HorizontalScrollerProps>(
  ({ children, totalSlides, onIndexChange }, ref) => {
    const { containerRef, dragHandlers } = useHorizontalScroll();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Update navigation based on scroll position
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateNavigation = () => {
        const slides = container.querySelectorAll('.slide-container');
        const centerPoint = container.scrollLeft + container.clientWidth / 2;
        let activeIndex = 0;

        slides.forEach((slide, index) => {
          const slideEl = slide as HTMLElement;
          if (centerPoint >= slideEl.offsetLeft && centerPoint <= slideEl.offsetLeft + slideEl.offsetWidth) {
            activeIndex = index;
          }
        });

        setCurrentIndex(activeIndex);
      };

      container.addEventListener('scroll', updateNavigation);
      updateNavigation();

      return () => container.removeEventListener('scroll', updateNavigation);
    }, [containerRef]);

    useEffect(() => {
      onIndexChange?.(currentIndex);
    }, [currentIndex, onIndexChange]);

    const scrollToSlide = (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const target = document.getElementById(`slide-${clampedIndex}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    };

    useImperativeHandle(ref, () => ({
      scrollToSlide,
    }), [totalSlides]);

    return (
      <main
        ref={containerRef as React.RefObject<HTMLElement>}
        className="flex flex-row overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar scroll-smooth select-none md:cursor-grab md:active:cursor-grabbing mask-on-md w-full flex-1 py-1 px-1 gap-x-1 md:py-4 md:px-10 md:gap-x-12 items-center"
        style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
        {...dragHandlers}
      >
        {children}
      </main>
    );
  }
);

HorizontalScroller.displayName = 'HorizontalScroller';
