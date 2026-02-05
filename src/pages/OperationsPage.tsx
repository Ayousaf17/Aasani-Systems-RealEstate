import { useState, useCallback, useRef } from 'react';
import { VerticalScroller } from '../components/layout/VerticalScroller';
import type { VerticalScrollerRef } from '../components/layout/VerticalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { BottomNav } from '../components/navigation/BottomNav';
import { OperationsHeroSlide } from '../components/slides/operations/OperationsHeroSlide';
import { ProblemSlide } from '../components/slides/operations/ProblemSlide';
import { SolutionSlide } from '../components/slides/operations/SolutionSlide';
import { SystemsOverviewSlide } from '../components/slides/operations/SystemsOverviewSlide';
import { PartnershipSlide } from '../components/slides/operations/PartnershipSlide';
import { PricingSlide } from '../components/slides/operations/PricingSlide';
import { FinalCTASlide } from '../components/slides/operations/FinalCTASlide';
import { TOTAL_OPERATIONS_SLIDES } from '../data/operationsContent';

export function OperationsPage() {
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
        total={TOTAL_OPERATIONS_SLIDES}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
        direction="vertical"
      />
      <BottomNav />

      <VerticalScroller
        ref={scrollerRef}
        totalSlides={TOTAL_OPERATIONS_SLIDES}
        onIndexChange={setCurrentIndex}
        className="pt-10 md:pt-0"
      >
        <OperationsHeroSlide index={0} onNavigate={handleNavigate} />
        <ProblemSlide index={1} />
        <SolutionSlide index={2} />
        <SystemsOverviewSlide index={3} />
        <PartnershipSlide index={4} />
        <PricingSlide index={5} />
        <FinalCTASlide index={6} />
      </VerticalScroller>
    </div>
  );
}
