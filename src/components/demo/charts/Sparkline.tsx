import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 28,
  color = '#2dd4bf'
}: SparklineProps) {
  if (data.length < 2) return null;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;
  const padding = height * 0.1;

  const pathD = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible" role="img" aria-label="Trend sparkline">
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}
