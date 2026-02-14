import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { scoredLeads, systemQandA } from '../../data/demoData';

const tierColors: Record<string, { badge: string; text: string }> = {
  Hot: { badge: 'bg-rose-500/15 text-rose-400', text: 'text-rose-400' },
  Warm: { badge: 'bg-amber-500/15 text-amber-400', text: 'text-amber-400' },
  Cold: { badge: 'bg-blue-500/15 text-blue-400', text: 'text-blue-400' },
};

const hotCount = scoredLeads.filter((l) => l.tier === 'Hot').length;
const warmCount = scoredLeads.filter((l) => l.tier === 'Warm').length;
const coldCount = scoredLeads.filter((l) => l.tier === 'Cold').length;
const total = scoredLeads.length;

export function SystemLeadScoring() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        <DemoKpiCard icon="solar:fire-linear" label="Hot Leads" value="8" />
        <DemoKpiCard icon="solar:target-linear" label="Avg Score" value="67" />
        <DemoKpiCard icon="solar:user-plus-linear" label="New This Week" value="14" />
      </div>

      {/* Lead cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {scoredLeads.map((lead, i) => (
          <GlassPanel key={i} className="rounded-xl border border-white/5 p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white font-display">{lead.name}</p>
                <p className="text-xs text-aasani-text-muted font-display mt-0.5">
                  {lead.source} &middot; {lead.lastActivity}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn('text-2xl font-bold font-display', tierColors[lead.tier].text)}>
                  {lead.score}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full font-display',
                    tierColors[lead.tier].badge
                  )}
                >
                  {lead.tier}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lead.behaviors.map((behavior, j) => (
                <span
                  key={j}
                  className="text-[11px] text-aasani-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded-full font-display"
                >
                  {behavior}
                </span>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Score distribution */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:chart-2-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Score Distribution</h3>
        </div>
        <div className="p-5 space-y-3">
          {/* Segmented bar */}
          <div className="flex h-4 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 transition-all"
              style={{ width: `${(hotCount / total) * 100}%` }}
            />
            <div
              className="bg-amber-500 transition-all"
              style={{ width: `${(warmCount / total) * 100}%` }}
            />
            <div
              className="bg-blue-500 transition-all"
              style={{ width: `${(coldCount / total) * 100}%` }}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-xs text-aasani-text-muted font-display">
                Hot ({hotCount})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs text-aasani-text-muted font-display">
                Warm ({warmCount})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-aasani-text-muted font-display">
                Cold ({coldCount})
              </span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.leadScoring} />
    </div>
  );
}
