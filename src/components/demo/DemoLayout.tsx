import { useState } from 'react';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { demoSystems } from '../../data/demoData';

interface DemoLayoutProps {
  activeSystem: number;
  onSystemChange: (index: number) => void;
  children: React.ReactNode;
}

export function DemoLayout({ activeSystem, onSystemChange, children }: DemoLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen h-[100dvh] flex bg-neutral-950 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-950 border-r border-white/5 flex flex-col transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo area */}
        <div className="h-14 flex items-center px-5 border-b border-white/5 shrink-0">
          <span className="text-sm font-bold text-white font-display tracking-wide">AASANI</span>
          <span className="ml-2 text-[10px] font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
            DEMO
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
          {demoSystems.map((system, i) => (
            <button
              key={i}
              onClick={() => {
                onSystemChange(i);
                setSidebarOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer',
                activeSystem === i
                  ? 'bg-white/[0.04] border-l-2 border-teal-400 text-white'
                  : 'border-l-2 border-transparent text-aasani-text-muted hover:text-white hover:bg-white/[0.02]'
              )}
            >
              <IconifyIcon
                icon={system.icon}
                className={cn(activeSystem === i ? 'text-teal-400' : 'text-aasani-text-muted')}
                width={18}
              />
              <span className="text-sm font-display truncate">{system.name}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 shrink-0">
          <p className="text-[10px] text-aasani-text-muted font-display">
            Powered by Aasani Systems
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-3 px-4 lg:px-6 border-b border-white/5 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <IconifyIcon icon="solar:hamburger-menu-linear" className="text-white" width={20} />
          </button>
          <h1 className="text-sm font-bold text-white font-display truncate">
            {demoSystems[activeSystem].name}
          </h1>
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
            LIVE
          </span>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-grid-pattern scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}
