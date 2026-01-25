interface IconifyIconProps {
  icon: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function IconifyIcon({
  icon,
  className = '',
  width,
  height,
}: IconifyIconProps) {
  return (
    <iconify-icon
      icon={icon}
      className={className}
      width={width}
      height={height}
    />
  );
}
