import { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HorizontalScroller } from '../components/layout/HorizontalScroller';
import type { HorizontalScrollerRef } from '../components/layout/HorizontalScroller';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { BottomNav } from '../components/navigation/BottomNav';
import { AutomationsHeroSlide } from '../components/slides/automations/AutomationsHeroSlide';
import { AutomationSlide } from '../components/slides/automations/AutomationSlide';
import { AutomationsCTASlide } from '../components/slides/automations/AutomationsCTASlide';
import { automationsData, TOTAL_AUTOMATIONS_SLIDES } from '../data/automationsContent';

export function AutomationsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerRef>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle ?slide= URL parameter for deep linking
  useEffect(() => {
    const slideParam = searchParams.get('slide');
    if (slideParam) {
      const slideIndex = parseInt(slideParam, 10);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < TOTAL_AUTOMATIONS_SLIDES) {
        // Small delay to ensure scroller is mounted
        setTimeout(() => {
          scrollerRef.current?.scrollToSlide(slideIndex);
        }, 100);
        // Clear the param from URL after navigating
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);


  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="h-screen h-[100dvh] flex flex-col bg-black overflow-hidden fixed inset-0">
      <BottomNav />

      {/* Desktop Pagination Dots - Shown on desktop within slide area */}
      <div className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 z-40">
        <NavigationDots
          total={TOTAL_AUTOMATIONS_SLIDES}
          currentIndex={currentIndex}
          onDotClick={handleDotClick}
          direction="horizontal"
        />
      </div>

      {/* Slide Area - Full height with padding for nav */}
      <HorizontalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_AUTOMATIONS_SLIDES}
        onIndexChange={setCurrentIndex}
        className="pt-16 md:pt-20 pb-0 md:pb-0 safe-area-bottom"
      >
        <AutomationsHeroSlide onNextSlide={() => scrollerRef.current?.scrollToSlide(1)} />
        {automationsData.map((data, i) => (
          <AutomationSlide key={i} data={data} slideIndex={i + 1} />
        ))}
        <AutomationsCTASlide />
      </HorizontalScroller>
    </div>
  );
}
