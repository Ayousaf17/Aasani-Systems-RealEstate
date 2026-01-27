import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HorizontalScroller } from '../components/layout/HorizontalScroller';
import type { HorizontalScrollerRef } from '../components/layout/HorizontalScroller';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { AutomationsHeroSlide } from '../components/slides/automations/AutomationsHeroSlide';
import { AutomationSlide } from '../components/slides/automations/AutomationSlide';
import { AutomationsCTASlide } from '../components/slides/automations/AutomationsCTASlide';
import { automationsData, TOTAL_AUTOMATIONS_SLIDES } from '../data/automationsContent';

export function AutomationsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerRef>(null);
  const navigate = useNavigate();
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

  const handleNavigate = useCallback((delta: number) => {
    const newIndex = Math.max(0, Math.min(currentIndex + delta, TOTAL_AUTOMATIONS_SLIDES - 1));
    scrollerRef.current?.scrollToSlide(newIndex);
  }, [currentIndex]);

  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="h-screen h-[100dvh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden fixed inset-0">
      {/* Fixed Navigation - Floating Glass Style */}
      <nav className="fixed flex px-3 md:px-8 py-3 md:py-6 z-50 top-0 right-0 left-0 items-center justify-between pointer-events-none safe-area-top">
        {/* Logo */}
        <div className="pointer-events-auto flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Aasani Systems" className="h-12 md:h-14 w-auto" />
          </button>
        </div>

        {/* Center: Pagination Dots */}
        <div className="pointer-events-auto flex items-center justify-center backdrop-blur-md p-1.5 md:p-2.5 rounded-full bg-black/50">
          <NavigationDots
            total={TOTAL_AUTOMATIONS_SLIDES}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
            direction="horizontal"
          />
        </div>

        {/* Right: Arrows - Hidden on mobile */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 backdrop-blur-md p-1.5 md:p-2 rounded-full bg-black/40">
          <button
            onClick={() => handleNavigate(-1)}
            disabled={currentIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/70 hover:text-white disabled:opacity-30"
          >
            <iconify-icon icon="solar:arrow-left-linear" width={24} />
          </button>
          <div className="w-[1px] h-5 bg-white/10" />
          <button
            onClick={() => handleNavigate(1)}
            disabled={currentIndex === TOTAL_AUTOMATIONS_SLIDES - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/70 hover:text-white disabled:opacity-30"
          >
            <iconify-icon icon="solar:arrow-right-linear" width={24} />
          </button>
        </div>
      </nav>

      <HorizontalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_AUTOMATIONS_SLIDES}
        onIndexChange={setCurrentIndex}
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
