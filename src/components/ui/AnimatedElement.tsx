import type { ReactNode, CSSProperties } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  root?: Element | null;
}

export function AnimatedElement({
  children,
  delay = 0,
  className = '',
  root = null,
}: AnimatedElementProps) {
  const { ref, hasIntersected } = useIntersectionObserver({ root });

  const animationStyle: CSSProperties = {
    animation: hasIntersected
      ? `animationIn 0.8s ease-out ${delay}s both`
      : 'none',
    animationPlayState: hasIntersected ? 'running' : 'paused',
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={animationStyle}
    >
      {children}
    </div>
  );
}
