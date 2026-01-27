import { useState, useCallback, useRef } from 'react';
import { VerticalScroller } from '../components/layout/VerticalScroller';
import type { VerticalScrollerRef } from '../components/layout/VerticalScroller';
import { Header } from '../components/navigation/Header';
import { NavigationDots } from '../components/navigation/NavigationDots';
import { HeroSlide } from '../components/slides/index/HeroSlide';
import { ProblemSlide } from '../components/slides/index/ProblemSlide';
import { SolutionSlide } from '../components/slides/index/SolutionSlide';
import { AutomationsListSlide } from '../components/slides/index/AutomationsListSlide';
import { CaseStudiesSlide } from '../components/slides/index/CaseStudiesSlide';
import { HowItWorksSlide } from '../components/slides/index/HowItWorksSlide';
import { PhilosophySlide } from '../components/slides/index/PhilosophySlide';
import { LeadMagnetSlide } from '../components/slides/index/LeadMagnetSlide';
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
        <ProblemSlide index={1} />
        <SolutionSlide index={2} />
        <AutomationsListSlide index={3} />
        <CaseStudiesSlide index={4} />
        <HowItWorksSlide index={5} />
        <PhilosophySlide index={6} onNavigate={handleNavigate} />
        <LeadMagnetSlide index={7} />
        <CTASlide index={8} />
      </VerticalScroller>
    </div>
  );
}
