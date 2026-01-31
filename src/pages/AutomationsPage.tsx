import { useState, useCallback, useRef } from 'react';
import { HorizontalScroller } from '../components/layout/HorizontalScroller';
import type { HorizontalScrollerRef } from '../components/layout/HorizontalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { BottomNav } from '../components/navigation/BottomNav';
import { AutomationsHeroSlide } from '../components/slides/automations/AutomationsHeroSlide';
import { AutomationSlide } from '../components/slides/automations/AutomationSlide';
import { AutomationsCTASlide } from '../components/slides/automations/AutomationsCTASlide';
import { automationsData, TOTAL_AUTOMATIONS_SLIDES } from '../data/automationsContent';

export function AutomationsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HorizontalScrollerRef>(null);

  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="relative bg-neutral-950 overflow-hidden h-screen h-[100dvh]">
      <Header direction="horizontal" />
      <NavigationDots
        total={TOTAL_AUTOMATIONS_SLIDES}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
        direction="horizontal"
      />
      <BottomNav />

      <HorizontalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_AUTOMATIONS_SLIDES}
        onIndexChange={setCurrentIndex}
      >
        <AutomationsHeroSlide onNextSlide={() => handleDotClick(1)} />
        {automationsData.map((data, i) => (
          <AutomationSlide key={i} data={data} slideIndex={i + 1} />
        ))}
        <AutomationsCTASlide />
      </HorizontalScroller>
    </div>
  );
}
