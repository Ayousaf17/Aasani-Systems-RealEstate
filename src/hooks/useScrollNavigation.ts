import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollNavigationOptions {
  direction: 'vertical' | 'horizontal';
  totalSlides: number;
  threshold?: number;
}

export function useScrollNavigation({
  direction,
  totalSlides,
  threshold = 0.5,
}: UseScrollNavigationOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const slides = container.querySelectorAll('[data-slide]');
    const targetSlide = slides[clampedIndex] as HTMLElement;

    if (targetSlide) {
      targetSlide.scrollIntoView({
        behavior: 'smooth',
        block: direction === 'vertical' ? 'start' : 'nearest',
        inline: direction === 'horizontal' ? 'center' : 'nearest',
      });
    }
  }, [direction, totalSlides]);

  const navigateSlide = useCallback((delta: number) => {
    scrollToSlide(currentIndex + delta);
  }, [currentIndex, scrollToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll('[data-slide]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              (entry.target as HTMLElement).dataset.slide || '0',
              10
            );
            setCurrentIndex(index);
          }
        });
      },
      { root: container, threshold }
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [threshold]);

  return {
    containerRef,
    currentIndex,
    scrollToSlide,
    navigateSlide,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalSlides - 1,
  };
}
