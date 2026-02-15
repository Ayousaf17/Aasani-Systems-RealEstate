import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  href,
  external = false,
}: ButtonProps) {
  const baseClasses = 'flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer font-semibold';

  const variantClasses = {
    primary: 'bg-teal-500 hover:bg-teal-400 text-black rounded-full px-8 py-4 shadow-lg hover:shadow-teal-500/20 hover:scale-105',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30 rounded-full px-5 py-2.5',
    ghost: 'bg-transparent hover:bg-white/10 text-white rounded-full px-4 py-2',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
