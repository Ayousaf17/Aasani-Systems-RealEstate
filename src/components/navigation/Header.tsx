import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  direction: 'vertical' | 'horizontal';
  onNavigate: (delta: number) => void;
  showArrows?: boolean;
}

export function Header({ direction, onNavigate, showArrows = true }: HeaderProps) {
  const navigate = useNavigate();
  const isVertical = direction === 'vertical';

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Aasani Systems" className="h-10 md:h-12 w-10 md:w-12 rounded-full" />
        </button>
      </div>

      {showArrows && (
        <div className="pointer-events-auto flex items-center gap-2 backdrop-blur-md p-1.5 md:p-2 rounded-full bg-black/40">
          <button
            onClick={() => onNavigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            aria-label={isVertical ? 'Previous Slide' : 'Previous'}
          >
            <iconify-icon
              icon={isVertical ? 'solar:alt-arrow-up-linear' : 'solar:arrow-left-linear'}
              width={24}
            />
          </button>
          <div className="w-[1px] h-5 bg-white/10" />
          <button
            onClick={() => onNavigate(1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            aria-label={isVertical ? 'Next Slide' : 'Next'}
          >
            <iconify-icon
              icon={isVertical ? 'solar:alt-arrow-down-linear' : 'solar:arrow-right-linear'}
              width={24}
            />
          </button>
        </div>
      )}
    </header>
  );
}
