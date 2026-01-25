interface NavigationDotsProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  direction?: 'vertical' | 'horizontal';
}

export function NavigationDots({ total, currentIndex, onDotClick, direction = 'vertical' }: NavigationDotsProps) {
  const isVertical = direction === 'vertical';

  if (isVertical) {
    return (
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`nav-dot w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/20 hover:bg-white'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    );
  }

  // Horizontal pagination (for automations page)
  return (
    <div className="flex gap-x-1.5 md:gap-x-2 items-center justify-center">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full hover:bg-white hover:scale-125 transition-all duration-300 cursor-pointer ${
            i === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
