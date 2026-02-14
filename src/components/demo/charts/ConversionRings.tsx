import { motion } from 'framer-motion';

interface ConversionMetric {
  label: string;
  value: number; // 0-100
  color: string;
}

interface ConversionRingsProps {
  metrics: ConversionMetric[];
  ringSize?: number;
}

export function ConversionRings({ metrics, ringSize = 64 }: ConversionRingsProps) {
  const strokeWidth = 4;
  const radius = (ringSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {metrics.map((metric, index) => {
        const dashLength = (metric.value / 100) * circumference;

        return (
          <div key={`${metric.label}-${index}`} className="flex flex-col items-center">
            <div className="relative" style={{ width: ringSize, height: ringSize }}>
              <svg
                width={ringSize}
                height={ringSize}
                viewBox={`0 0 ${ringSize} ${ringSize}`}
                className="transform -rotate-90"
              >
                {/* Background circle */}
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth={strokeWidth}
                />

                {/* Foreground arc */}
                <motion.circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dashLength} ${circumference}`}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  whileInView={{ strokeDasharray: `${dashLength} ${circumference}` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </svg>

              {/* Center percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white font-display">
                  {metric.value}%
                </span>
              </div>
            </div>

            {/* Label below ring */}
            <div className="text-[10px] text-aasani-text-muted font-display mt-2 text-center max-w-[80px]">
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
