import { useState, useCallback, useRef } from 'react';
import { VerticalScroller } from '../components/layout/VerticalScroller';
import type { VerticalScrollerRef } from '../components/layout/VerticalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { BottomNav } from '../components/navigation/BottomNav';
import { HeroSlide } from '../components/slides/index/HeroSlide';
import { ProblemSlide } from '../components/slides/index/ProblemSlide';
import { SolutionSlide } from '../components/slides/index/SolutionSlide';
import { ROICalculatorSlide } from '../components/slides/index/ROICalculatorSlide';
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
    <div className="relative bg-neutral-950 overflow-hidden h-screen h-[100dvh] fixed inset-0">
      <Header direction="vertical" onNavigate={handleNavigate} />
      <NavigationDots
        total={TOTAL_INDEX_SLIDES}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
        direction="vertical"
      />
      <BottomNav />

      <VerticalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_INDEX_SLIDES}
        onIndexChange={setCurrentIndex}
      >
        <HeroSlide index={0} onNavigate={handleNavigate} />
        <ProblemSlide index={1} />
        <SolutionSlide index={2} />
        <ROICalculatorSlide index={3} onNavigate={handleNavigate} />
        <CTASlide index={4} />
      </VerticalScroller>
    </div>
  );
}
