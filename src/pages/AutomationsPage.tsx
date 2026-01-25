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
      {/* Fixed Navigation - Floating Glass Style */}
      <nav className="fixed flex px-4 md:px-8 py-4 md:py-6 z-50 top-0 right-0 left-0 items-center justify-between pointer-events-none">
        {/* Left: Logo */}
        <div className="pointer-events-auto">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer hover:opacity-80 transition-opacity w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden"
          >
            <img src="/logo.png" alt="Aasani Systems" className="w-full h-full scale-150" />
          </button>
        </div>

        {/* Center: Pagination Dots */}
        <div className="pointer-events-auto flex items-center justify-center backdrop-blur-md p-2 md:p-2.5 rounded-full bg-black/40">
          <NavigationDots
            total={TOTAL_AUTOMATIONS_SLIDES}
            currentIndex={currentIndex}
            onDotClick={handleDotClick}
            direction="horizontal"
          />
        </div>

        {/* Right: Arrows */}
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
