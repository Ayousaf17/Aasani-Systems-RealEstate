import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from,
  to,
  duration,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = from + (to - from) * progress;
      setValue(Math.round(currentValue * Math.pow(10, decimals)) / Math.pow(10, decimals));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [from, to, duration, decimals]);

  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
