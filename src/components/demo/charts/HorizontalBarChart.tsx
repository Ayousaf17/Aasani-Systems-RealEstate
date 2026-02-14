import { motion } from 'framer-motion';

interface HorizontalBarItem {
  label: string;
  value: number;
  displayValue: string;
  badge?: string;
  badgeColor?: string;
}

interface HorizontalBarChartProps {
  items: HorizontalBarItem[];
}

export function HorizontalBarChart({ items }: HorizontalBarChartProps) {
  if (items.length === 0) return null;

  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="space-y-2.5">
      {items.map((item, index) => {
        const widthPercent = (item.value / maxValue) * 100;

        return (
          <div key={index} className="flex items-center gap-3">
            <div className="w-24 shrink-0">
              <span className="text-xs text-white font-display">
                {item.label}
              </span>
            </div>

            <div className="flex-1 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${widthPercent}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className="h-7 rounded bg-teal-500/30"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-white font-bold font-display">
                {item.displayValue}
              </span>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-emerald-500/15 text-emerald-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
