import { useState } from 'react';
import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import type { QandAItem } from '../../data/demoData';

interface DemoQandAProps {
  questions: QandAItem[];
}

export function DemoQandA({ questions }: DemoQandAProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
        <IconifyIcon icon="solar:chat-round-dots-linear" className="text-teal-400" width={18} />
        <h3 className="text-sm font-semibold text-white font-display">Common Questions</h3>
      </div>
      <div>
        {questions.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={cn('border-b border-white/5 last:border-b-0')}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span className="text-sm text-neutral-200 font-display">{item.question}</span>
                <IconifyIcon
                  icon="solar:alt-arrow-down-linear"
                  className={cn(
                    'text-aasani-text-muted shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  width={16}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200 ease-in-out',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm text-aasani-text-muted leading-relaxed font-display">
                      {item.answer}
                    </p>
                    {item.stat && (
                      <span className="inline-block mt-2 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
                        {item.stat}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
