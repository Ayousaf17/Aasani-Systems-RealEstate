import { useRef, useEffect, useCallback } from 'react';

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Handle wheel events - map vertical to horizontal
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.style.scrollSnapType = 'none';
      container.style.scrollBehavior = 'auto';

      const scrollAmount =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      container.scrollLeft += scrollAmount;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        container.style.scrollSnapType = 'x mandatory';
        container.style.scrollBehavior = 'smooth';
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, []);

  // Touch gesture support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const touchEndX = e.touches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;
      const timeDelta = Date.now() - touchStartTime;

      // If vertical swipe is more pronounced than horizontal
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30 && timeDelta < 300) {
        const gap = window.innerWidth >= 768 ? 48 : 0;
        const slideEl = container.querySelector('.slide-container') as HTMLElement;
        if (!slideEl) return;
        const slideWidth = slideEl.offsetWidth + gap;

        if (deltaY > 50) {
          container.scrollBy({ left: slideWidth, behavior: 'smooth' });
          touchStartY = touchEndY;
        } else if (deltaY < -50) {
          container.scrollBy({ left: -slideWidth, behavior: 'smooth' });
          touchStartY = touchEndY;
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Mouse drag handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    container.style.scrollSnapType = 'none';
    container.style.scrollBehavior = 'auto';
    container.classList.add('cursor-grabbing');
    container.classList.remove('cursor-grab');
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 2;
    container.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    const container = containerRef.current;
    if (container) {
      container.style.scrollSnapType = 'x mandatory';
      container.style.scrollBehavior = 'smooth';
      container.classList.remove('cursor-grabbing');
      container.classList.add('cursor-grab');
    }
  }, []);

  return {
    containerRef,
    dragHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
  };
}
