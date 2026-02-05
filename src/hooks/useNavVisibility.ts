import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Controls navbar visibility based on user interaction.
 * Nav is visible when:
 *  - User is actively scrolling/touching
 *  - User taps/clicks anywhere (briefly)
 *  - Within the first 2s of page load
 * Nav fades out after 1.5s of inactivity.
 */
export function useNavVisibility() {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountTimeRef = useRef(Date.now());

  const show = useCallback(() => {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 1500);
  }, []);

  useEffect(() => {
    // Keep nav visible for first 2s after mount
    const initialTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);

    const onScroll = () => show();
    const onTouchStart = () => show();
    const onTouchMove = () => show();
    const onPointerMove = () => {
      // Only show on pointer move if it's been > 2s since mount
      // (avoids flicker on initial load)
      if (Date.now() - mountTimeRef.current > 2000) {
        show();
      }
    };

    // Listen on window + all scrollable containers
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [show]);

  return visible;
}
