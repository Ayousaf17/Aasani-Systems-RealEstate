import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

interface NavItem {
  icon: string;
  label: string;
  path?: string;
  action?: 'book';
}

const navItems: NavItem[] = [
  { icon: 'solar:home-2-linear', label: 'Home', path: '/' },
  { icon: 'solar:widget-5-linear', label: 'Systems', path: '/automations' },
  { icon: 'solar:checklist-minimalistic-linear', label: 'Checklist', path: '/checklist' },
  { icon: 'solar:calendar-add-linear', label: 'Book', action: 'book' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize Cal.com
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'bookatime' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14B8A6' },
          dark: { 'cal-brand': '#2DD4BF' },
        },
        hideEventTypeDetails: false,
        layout: 'week_view',
      });
    })();
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.action === 'book') {
      // Trigger Cal.com modal by creating and clicking a hidden button
      const bookButton = document.querySelector('[data-cal-link]') as HTMLButtonElement;
      if (bookButton) {
        bookButton.click();
      }
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Nav (<768px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 backdrop-blur-xl bg-black/80 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-2 min-w-[64px] transition-all duration-200 ${
                  active
                    ? 'text-teal-300'
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <iconify-icon
                  icon={item.icon}
                  width={24}
                  className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}
                />
                <span className={`text-xs font-medium tracking-wide transition-opacity duration-200 ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-teal-300 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Nav (≥768px) - Centered Floating Pill */}
      <nav className="hidden md:fixed md:top-6 md:left-1/2 md:-translate-x-1/2 md:z-50 md:flex md:w-auto md:gap-6 md:px-6 md:py-3 md:rounded-full md:border md:border-white/10 md:backdrop-blur-xl md:bg-black/60 md:shadow-2xl md:shadow-black/20 md:items-center">
        <div className="flex items-center justify-center gap-6">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center gap-1 py-2 transition-all duration-200 ${
                  active
                    ? 'text-teal-300'
                    : 'text-neutral-400 hover:text-white'
                }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <iconify-icon
                  icon={item.icon}
                  width={24}
                  className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}
                />
                <span className={`text-xs font-medium tracking-wide transition-opacity duration-200 ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-teal-300 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
