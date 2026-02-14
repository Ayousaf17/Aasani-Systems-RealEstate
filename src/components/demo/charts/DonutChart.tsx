import { motion } from 'framer-motion';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  centerLabel?: string;
  centerSubLabel?: string;
}

export function DonutChart({
  segments,
  size = 160,
  centerLabel,
  centerSubLabel
}: DonutChartProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  if (total === 0) return null;

  const strokeWidth = 20;
  const viewSize = 160;
  const radius = (viewSize - strokeWidth) / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const center = viewSize / 2;

  let cumulativeOffset = 0;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Donut chart: ${segments.map(s => `${s.label} ${s.value}`).join(', ')}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="transform -rotate-90"
      >
        {segments.map((segment, index) => {
          const segmentLength = (segment.value / total) * circumference;
          const offset = cumulativeOffset;
          cumulativeOffset += segmentLength;

          return (
            <motion.circle
              key={`${segment.label}-${index}`}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${segmentLength} ${circumference}` }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            />
          );
        })}
      </svg>

      {(centerLabel || centerSubLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && (
            <div className="text-2xl font-bold text-white font-display">
              {centerLabel}
            </div>
          )}
          {centerSubLabel && (
            <div className="text-xs text-aasani-text-muted font-display mt-1">
              {centerSubLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
