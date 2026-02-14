import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { Sparkline } from './charts';

interface DemoKpiCardProps {
  icon: string;
  label: string;
  value: string;
  trend?: { direction: 'up' | 'down'; value: string };
  sparklineData?: number[];
  className?: string;
}

export function DemoKpiCard({ icon, label, value, trend, sparklineData, className }: DemoKpiCardProps) {
  return (
    <GlassPanel className={cn('p-4 flex items-center gap-3 rounded-xl border border-white/5', className)}>
      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
        <IconifyIcon icon={icon} className="text-teal-400" width={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-aasani-text-muted truncate">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-white font-display">{value}</p>
          {trend && (
            <span
              className={cn(
                'text-xs font-medium px-1.5 py-0.5 rounded-full',
                trend.direction === 'up'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-red-500/15 text-red-400'
              )}
            >
              {trend.direction === 'up' ? '+' : ''}{trend.value}
            </span>
          )}
        </div>
      </div>
      {sparklineData && sparklineData.length > 0 && (
        <div className="shrink-0">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </GlassPanel>
  );
}
