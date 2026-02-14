import { motion } from 'framer-motion';

interface FunnelStage {
  label: string;
  value: number;
  icon?: string;
}

interface FunnelChartProps {
  stages: FunnelStage[];
  color?: string;
}

export function FunnelChart({ stages, color = '#2dd4bf' }: FunnelChartProps) {
  if (stages.length === 0) return null;

  const maxValue = Math.max(stages[0]?.value ?? 1, 1);

  return (
    <div className="space-y-1">
      {stages.map((stage, index) => {
        const widthPercent = Math.max((stage.value / maxValue) * 100, 0);
        const conversionRate =
          index < stages.length - 1 && stage.value > 0
            ? ((stages[index + 1].value / stage.value) * 100).toFixed(0)
            : null;

        return (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: `${widthPercent}%`, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: 'easeOut',
              }}
              className="relative h-9 rounded-lg border mx-auto"
              style={{
                backgroundColor: `${color}30`,
                borderColor: `${color}80`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-xs font-display text-white font-medium flex items-center gap-2">
                  {stage.icon && <span>{stage.icon}</span>}
                  {stage.label}
                </span>
                <span className="text-xs font-display text-white font-bold">
                  {stage.value.toLocaleString()}
                </span>
              </div>
            </motion.div>

            {conversionRate && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12 + 0.4,
                }}
                className="text-[10px] text-aasani-text-muted my-0.5"
              >
                {'\u2192'} {conversionRate}%
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
