import { motion } from 'framer-motion';

interface RadialGaugeProps {
  value: number;
  max: number;
  label: string;
  size?: number;
  color?: string;
}

export function RadialGauge({
  value,
  max,
  label,
  size = 140,
  color = '#2dd4bf'
}: RadialGaugeProps) {
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const safeMax = Math.max(max, 0.001);
  const fillLength = Math.min(value / safeMax, 1) * arcLength;
  const centerX = 50;
  const centerY = 50;

  // Scale font sizes proportionally to size
  const valueFontSize = Math.round(size / 7);
  const labelFontSize = Math.round(size / 14);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative"
      role="img"
      aria-label={`${label}: ${value} out of ${max}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        {/* Background arc */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135, ${centerX}, ${centerY})`}
        />

        {/* Fill arc */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${fillLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135, ${centerX}, ${centerY})`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${fillLength} ${circumference}` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Center value */}
        <text
          x={centerX}
          y={centerY - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-bold font-display"
          style={{ fontSize: `${valueFontSize}px` }}
        >
          {value % 1 === 0 ? value : value.toFixed(1)}
        </text>

        {/* Label */}
        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-current text-aasani-text-muted font-display"
          style={{ fontSize: `${labelFontSize}px` }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
