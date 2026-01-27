import { useState, useCallback, useRef } from 'react';
import { VerticalScroller } from '../components/layout/VerticalScroller';
import type { VerticalScrollerRef } from '../components/layout/VerticalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { HeroSlide } from '../components/slides/index/HeroSlide';
import { AutomationsListSlide } from '../components/slides/index/AutomationsListSlide';
import { ROICalculatorSlide } from '../components/slides/index/ROICalculatorSlide';
import { HowItWorksSlide } from '../components/slides/index/HowItWorksSlide';
import { CTASlide } from '../components/slides/index/CTASlide';
import { TOTAL_INDEX_SLIDES } from '../data/indexContent';

export function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<VerticalScrollerRef>(null);

  const handleNavigate = useCallback((delta: number) => {
    scrollerRef.current?.navigateSlide(delta);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    scrollerRef.current?.scrollToSlide(index);
  }, []);

  return (
    <div className="relative bg-neutral-950 overflow-hidden h-screen">
      <Header direction="vertical" onNavigate={handleNavigate} />
      <NavigationDots
        total={TOTAL_INDEX_SLIDES}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
        direction="vertical"
      />

      <VerticalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_INDEX_SLIDES}
        onIndexChange={setCurrentIndex}
      >
        <HeroSlide index={0} />
        <AutomationsListSlide index={1} />
        <ROICalculatorSlide index={2} onNavigate={handleNavigate} />
        <HowItWorksSlide index={3} />
        <CTASlide index={4} />
      </VerticalScroller>
    </div>
  );
}
