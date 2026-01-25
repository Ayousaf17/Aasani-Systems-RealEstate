import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleNavigate = useCallback((delta: number) => {
    const newIndex = Math.max(0, Math.min(currentIndex + delta, TOTAL_AUTOMATIONS_SLIDES - 1));
    scrollerRef.current?.scrollToSlide(newIndex);
  }, [currentIndex]);

  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
      {/* Fixed Navigation */}
      <nav className="fixed flex md:px-6 bg-black/80 h-16 z-50 border-white/5 border-b pt-4 pr-4 pb-4 pl-4 top-0 right-0 left-0 backdrop-blur-md items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 w-auto md:w-1/3">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Aasani Systems" className="h-10 md:h-12 w-10 md:w-12 rounded-full" />
          </button>
        </div>

        {/* Center: Pagination Dots */}
        <div className="w-1/3 flex items-center justify-center">
          <NavigationDots
            total={TOTAL_AUTOMATIONS_SLIDES}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
            direction="horizontal"
          />
        </div>

        {/* Right: Arrows */}
        <div className="hidden md:flex w-1/3 items-center justify-end">
          <div className="flex items-center gap-2 backdrop-blur-md p-2 rounded-full bg-black/80 border border-white/5">
            <button
              onClick={() => handleNavigate(-1)}
              disabled={currentIndex === 0}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-neutral-400 hover:text-white disabled:opacity-30"
            >
              <iconify-icon icon="solar:arrow-left-linear" width={20} />
            </button>
            <div className="w-[1px] h-4 md:h-5 bg-white/10" />
            <button
              onClick={() => handleNavigate(1)}
              disabled={currentIndex === TOTAL_AUTOMATIONS_SLIDES - 1}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-neutral-400 hover:text-white disabled:opacity-30"
            >
              <iconify-icon icon="solar:arrow-right-linear" width={20} />
            </button>
          </div>
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
