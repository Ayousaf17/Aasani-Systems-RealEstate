import { useState, useCallback, useRef } from 'react';
import { VerticalScroller } from '../components/layout/VerticalScroller';
import type { VerticalScrollerRef } from '../components/layout/VerticalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { BottomNav } from '../components/navigation/BottomNav';
import { AutomationsHeroSlide } from '../components/slides/automations/AutomationsHeroSlide';
import { AutomationSlide } from '../components/slides/automations/AutomationSlide';
import { AutomationsCTASlide } from '../components/slides/automations/AutomationsCTASlide';
import { automationsData, TOTAL_AUTOMATIONS_SLIDES } from '../data/automationsContent';

export function AutomationsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<VerticalScrollerRef>(null);

  const handleNavigate = useCallback((delta: number) => {
    scrollerRef.current?.navigateSlide(delta);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="relative bg-neutral-950 overflow-hidden h-screen h-[100dvh] fixed inset-0">
      <Header direction="vertical" onNavigate={handleNavigate} />
      <NavigationDots
        total={TOTAL_AUTOMATIONS_SLIDES}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
        direction="vertical"
      />
      <BottomNav />

      <VerticalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_AUTOMATIONS_SLIDES}
        onIndexChange={setCurrentIndex}
        className="pt-14 md:pt-0"
      >
        <AutomationsHeroSlide onNextSlide={() => handleNavigate(1)} />
        {automationsData.map((data, i) => (
          <AutomationSlide key={i} data={data} slideIndex={i + 1} />
        ))}
        <AutomationsCTASlide />
      </VerticalScroller>
    </div>
  );
}
