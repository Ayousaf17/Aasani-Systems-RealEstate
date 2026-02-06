import { useNavigate } from 'react-router-dom';
import { useNavVisibility } from '../../hooks/useNavVisibility';

interface HeaderProps {
  direction: 'vertical' | 'horizontal';
  onNavigate: (delta: number) => void;
  showArrows?: boolean;
}

export function Header({ direction, onNavigate, showArrows = true }: HeaderProps) {
  const navigate = useNavigate();
  const isVertical = direction === 'vertical';
  const navVisible = useNavVisibility();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] px-4 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none transition-opacity duration-500 ease-out ${
        navVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Logo - hidden on mobile to avoid clash with slide headers */}
      <div className="pointer-events-auto hidden md:block">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/logo.png" alt="Aasani Systems" className="h-14 w-auto" />
        </button>
      </div>

      {/* Navigation arrows - hidden on mobile, users swipe instead */}
      {showArrows && (
        <div className="pointer-events-auto hidden md:flex items-center gap-2 backdrop-blur-md p-2 rounded-full bg-black/40">
          <button
            onClick={() => onNavigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            aria-label={isVertical ? 'Previous Slide' : 'Previous'}
          >
            <iconify-icon
              icon={isVertical ? 'solar:arrow-up-linear' : 'solar:arrow-left-linear'}
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
              icon={isVertical ? 'solar:arrow-down-linear' : 'solar:arrow-right-linear'}
              width={24}
            />
          </button>
        </div>
      )}
    </header>
  );
}
