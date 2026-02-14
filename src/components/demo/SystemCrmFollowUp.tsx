import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { crmSequences, behaviorTriggers, systemQandA } from '../../data/demoData';

export function SystemCrmFollowUp() {
  const firstSequence = crmSequences[0];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DemoKpiCard
          icon="solar:sort-from-top-to-bottom-linear"
          label="Active Sequences"
          value="6"
        />
        <DemoKpiCard
          icon="solar:letter-linear"
          label="Emails Sent"
          value="847"
        />
        <DemoKpiCard
          icon="solar:eye-linear"
          label="Open Rate"
          value="42%"
          trend={{ direction: 'up', value: '3%' }}
        />
        <DemoKpiCard
          icon="solar:reply-linear"
          label="Reply Rate"
          value="12%"
        />
      </div>

      {/* Sequence List + Email Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sequence List */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:sort-from-top-to-bottom-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Active Sequences</h3>
          </div>
          <div className="divide-y divide-white/5">
            {crmSequences.map((seq, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center justify-between gap-3 px-5 py-3 transition-colors',
                  i === 0 ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                )}
              >
                <div className="min-w-0">
                  <p className="text-sm text-white font-display truncate">{seq.name}</p>
                  <p className="text-xs text-aasani-text-muted font-display mt-0.5">
                    {seq.activeLeads} active leads
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-medium text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
                    {seq.stages} stages
                  </span>
                  <span className="text-xs text-aasani-text-muted font-display">
                    {seq.openRate} open
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Email Preview */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:letter-opened-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Email Preview</h3>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-aasani-text-muted font-display mb-1">Subject</p>
              <p className="text-sm text-white font-display">{firstSequence.sampleSubject}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-aasani-text-muted font-display mb-2">Body</p>
              <pre className="text-xs text-neutral-300 font-display whitespace-pre-wrap leading-relaxed">
                {firstSequence.sampleBody.split(/({{.*?}})/).map((part, i) =>
                  part.startsWith('{{') ? (
                    <span key={i} className="text-teal-400 bg-teal-500/10 px-1 py-0.5 rounded">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </pre>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Behavior Triggers */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:bolt-circle-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Behavior Triggers</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
          {behaviorTriggers.map((bt, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                <IconifyIcon icon={bt.icon} className="text-teal-400" width={16} />
              </div>
              <div className="min-w-0 flex items-center gap-2">
                <p className="text-xs text-neutral-300 font-display truncate">{bt.trigger}</p>
                <IconifyIcon icon="solar:arrow-right-linear" className="text-aasani-text-muted shrink-0" width={14} />
                <p className="text-xs text-teal-400 font-display truncate">{bt.action}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.crmFollowUp} />
    </div>
  );
}
