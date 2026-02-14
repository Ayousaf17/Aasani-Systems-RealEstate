import { motion } from 'framer-motion';

interface PipelineStage {
  label: string;
  value: number;
  displayValue: string;
  count: number;
}

interface PipelineWaterfallProps {
  stages: PipelineStage[];
}

export function PipelineWaterfall({ stages }: PipelineWaterfallProps) {
  if (stages.length === 0) return null;

  const maxValue = Math.max(...stages.map(s => s.value), 1);

  return (
    <div className="flex flex-row items-end h-[180px] gap-3">
      {stages.map((stage, index) => {
        const heightPercentage = (stage.value / maxValue) * 100;

        return (
          <div
            key={stage.label}
            className="flex-1 flex flex-col items-center justify-end gap-2"
          >
            <motion.div
              className="flex flex-col items-center gap-0.5"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.12 + 0.3 }}
            >
              <div className="text-xs font-bold text-white font-display">
                {stage.displayValue}
              </div>
              <div className="text-[10px] text-aasani-text-muted font-display">
                {stage.count} {stage.count === 1 ? 'deal' : 'deals'}
              </div>
            </motion.div>

            <div className="w-full flex flex-col items-center" style={{ height: '70%' }}>
              <motion.div
                className="w-full rounded-t-lg bg-teal-500/30 border border-teal-500/20"
                initial={{ height: 0 }}
                whileInView={{ height: `${heightPercentage}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              />
            </div>

            <div className="text-[10px] text-aasani-text-muted font-display text-center leading-tight">
              {stage.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
