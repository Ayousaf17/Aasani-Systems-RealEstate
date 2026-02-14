import { motion } from 'framer-motion';
import { useId } from 'react';

interface AreaChartProps {
  data: number[];
  labels: string[];
  color?: string;
  height?: number;
}

export function AreaChart({
  data,
  labels,
  color = '#2dd4bf',
  height = 160
}: AreaChartProps) {
  const gradientId = useId();

  if (data.length < 2) return null;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;
  const padding = height * 0.1;

  const pointSpacing = 80;
  const width = (data.length - 1) * pointSpacing;
  const chartHeight = height;
  const totalHeight = height + 24;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = chartHeight - padding - ((value - minValue) / range) * (chartHeight - 2 * padding);
    return { x, y };
  });

  const linePath = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`
  ).join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x},${chartHeight} L ${points[0].x},${chartHeight} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${totalHeight}`}
      className="w-full overflow-visible"
      role="img"
      aria-label="Area chart showing weekly trend"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      <motion.path
        d={areaPath}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {points.map((point, index) => (
        <motion.circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.5 + index * 0.05,
            ease: 'easeOut'
          }}
        />
      ))}

      {labels.map((label, index) => {
        const x = points[index]?.x ?? 0;
        return (
          <text
            key={index}
            x={x}
            y={chartHeight + 16}
            textAnchor="middle"
            className="fill-current text-aasani-text-muted font-display"
            fontSize={11}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
