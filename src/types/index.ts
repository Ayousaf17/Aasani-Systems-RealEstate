// Slide content types
export interface SlideContent {
  index: number;
  total: number;
  label: string;
  icon: string;
  iconColor: string;
}

export interface IndexSlideData extends SlideContent {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
}

export interface AutomationSlideData {
  slideNumber: string;
  label: string;
  icon: string;
  iconColor: string;
  title: string;
  tagline: string;
  statValue: string;
  statLabel: string;
  statDescription: string;
  progressPercent: number;
  description: string;
  tools: string;
  backgroundImage: string;
}

export interface CaseStudy {
  initials: string;
  name: string;
  location: string;
  icon: string;
  iconColor: string;
  stats: {
    value: string;
    label: string;
    highlight?: boolean;
  }[];
}

// Navigation types
export interface NavigationState {
  currentIndex: number;
  totalSlides: number;
  direction: 'vertical' | 'horizontal';
}

export interface ScrollerRef {
  scrollToSlide: (index: number) => void;
  getCurrentIndex: () => number;
}

