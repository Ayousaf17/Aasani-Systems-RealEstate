import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.2, rootMargin = '0px', root = null, once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, root, once]);

  return { ref, isIntersecting, hasIntersected };
}
