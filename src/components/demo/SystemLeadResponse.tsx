import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { demoLeads, smsPreview, systemQandA } from '../../data/demoData';

const statusColors: Record<string, string> = {
  Responded: 'bg-emerald-500/15 text-emerald-400',
  Pending: 'bg-amber-500/15 text-amber-400',
  Qualified: 'bg-teal-500/15 text-teal-400',
  Nurturing: 'bg-purple-500/15 text-purple-400',
};

export function SystemLeadResponse() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DemoKpiCard icon="solar:stopwatch-linear" label="Avg Response Time" value="47s" />
        <DemoKpiCard icon="solar:user-plus-linear" label="Leads Today" value="12" />
        <DemoKpiCard
          icon="solar:chart-2-linear"
          label="Response Rate"
          value="98%"
          trend={{ direction: 'up', value: '5%' }}
        />
        <DemoKpiCard icon="solar:medal-ribbon-star-linear" label="Conversion" value="23%" />
      </div>

      {/* Live feed table */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-white font-display">Live Lead Feed</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-2.5 text-xs text-aasani-text-muted font-medium font-display">
                  Time
                </th>
                <th className="text-left px-5 py-2.5 text-xs text-aasani-text-muted font-medium font-display">
                  Name
                </th>
                <th className="text-left px-5 py-2.5 text-xs text-aasani-text-muted font-medium font-display">
                  Source
                </th>
                <th className="text-left px-5 py-2.5 text-xs text-aasani-text-muted font-medium font-display">
                  Status
                </th>
                <th className="text-left px-5 py-2.5 text-xs text-aasani-text-muted font-medium font-display">
                  Response
                </th>
              </tr>
            </thead>
            <tbody>
              {demoLeads.map((lead, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3 text-aasani-text-muted font-display whitespace-nowrap">
                    {lead.timestamp}
                  </td>
                  <td className="px-5 py-3 text-white font-display">{lead.name}</td>
                  <td className="px-5 py-3 text-aasani-text-muted font-display">{lead.source}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full font-display',
                        statusColors[lead.status]
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white font-display tabular-nums">
                    {lead.responseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>

      {/* SMS preview */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:chat-square-call-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">SMS Auto-Reply Preview</h3>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-aasani-text-muted font-display">
            <span>From: {smsPreview.from}</span>
            <span className="text-white/20">|</span>
            <span>To: {smsPreview.to}</span>
          </div>
          <div className="flex justify-end">
            <div className="max-w-sm rounded-2xl rounded-br-md bg-teal-500/10 border border-teal-500/20 px-4 py-3">
              <p className="text-sm text-neutral-200 leading-relaxed font-display">
                {smsPreview.message}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-aasani-text-muted text-right font-display">
            Sent automatically &middot; 34s after lead inquiry
          </p>
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.leadResponse} />
    </div>
  );
}
