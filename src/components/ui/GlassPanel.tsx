import type { ReactNode, CSSProperties } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  clear?: boolean;
  backgroundImage?: string;
}

export function GlassPanel({
  children,
  className = '',
  clear = false,
  backgroundImage,
}: GlassPanelProps) {
  const baseClasses = clear ? 'glass-clear' : 'glass-panel';

  const style: CSSProperties | undefined = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <div
      className={`${baseClasses} bg-cover bg-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
