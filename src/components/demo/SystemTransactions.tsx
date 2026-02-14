import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { transactions, systemQandA } from '../../data/demoData';

const stages = ['New', 'Under Contract', 'Inspection', 'Clear to Close', 'Closed'] as const;

export function SystemTransactions() {
  const grouped = stages.map((stage) => ({
    stage,
    deals: transactions.filter((t) => t.stage === stage),
  }));

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        <DemoKpiCard icon="solar:document-linear" label="Active Deals" value="5" />
        <DemoKpiCard icon="solar:clock-circle-linear" label="Avg Days to Close" value="34" />
        <DemoKpiCard
          icon="solar:check-circle-linear"
          label="On-Time Rate"
          value="96%"
          trend={{ direction: 'up', value: '2%' }}
        />
      </div>

      {/* Kanban board */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:chart-2-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Deal Pipeline</h3>
        </div>
        <div className="overflow-x-auto p-4">
          <div className="flex gap-3 min-w-[900px]">
            {grouped.map(({ stage, deals }) => (
              <div key={stage} className="flex-1 min-w-[170px]">
                <GlassPanel className="rounded-xl border border-white/5 p-3 h-full">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white font-display">{stage}</span>
                    <span className="text-[11px] font-medium text-aasani-text-muted bg-white/5 px-1.5 py-0.5 rounded-full">
                      {deals.length}
                    </span>
                  </div>

                  {/* Deal cards */}
                  <div className="space-y-2">
                    {deals.length === 0 && (
                      <p className="text-xs text-aasani-text-muted font-display text-center py-4">
                        No deals
                      </p>
                    )}
                    {deals.map((deal, i) => {
                      const isUrgent = deal.daysRemaining <= 3 && deal.daysRemaining > 0;
                      return (
                        <div
                          key={i}
                          className={cn(
                            'rounded-lg border p-3 space-y-1.5 bg-white/[0.02]',
                            isUrgent
                              ? 'border-amber-500/40'
                              : 'border-white/5'
                          )}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <p className="text-xs font-bold text-white font-display leading-tight">
                              {deal.property}
                            </p>
                            {isUrgent && (
                              <IconifyIcon
                                icon="solar:danger-triangle-linear"
                                className="text-amber-400 shrink-0"
                                width={14}
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-aasani-text-muted font-display">
                            {deal.client}
                          </p>
                          <p className="text-xs text-white font-display font-medium">
                            {deal.price}
                          </p>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span
                              className={cn(
                                'text-[10px] font-medium px-1.5 py-0.5 rounded-full font-display',
                                deal.daysRemaining === 0
                                  ? 'bg-emerald-500/15 text-emerald-400'
                                  : isUrgent
                                    ? 'bg-amber-500/15 text-amber-400'
                                    : 'bg-teal-500/15 text-teal-400'
                              )}
                            >
                              {deal.daysRemaining === 0
                                ? 'Closed'
                                : `${deal.daysRemaining}d left`}
                            </span>
                          </div>
                          <p className="text-[10px] text-aasani-text-muted font-display leading-snug">
                            {deal.nextDeadline}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </GlassPanel>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.transactions} />
    </div>
  );
}
