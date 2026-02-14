import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { clientTouchpoints, newsletterPreview, systemQandA } from '../../data/demoData';

const touchpointIcons: Record<string, string> = {
  text: 'solar:phone-linear',
  email: 'solar:letter-linear',
  call: 'solar:phone-calling-linear',
  mail: 'solar:mailbox-linear',
};

export function SystemClientComms() {
  // Find max price for proportional bar widths
  const prices = newsletterPreview.neighborhoods.map((n) =>
    parseInt(n.medianPrice.replace(/[$K,]/g, ''), 10)
  );
  const maxPrice = Math.max(...prices);

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DemoKpiCard icon="solar:users-group-rounded-linear" label="Past Clients" value="127" />
        <DemoKpiCard
          icon="solar:chat-round-dots-linear"
          label="Touchpoints This Month"
          value="340"
        />
        <DemoKpiCard
          icon="solar:eye-linear"
          label="Open Rate"
          value="44%"
          trend={{ direction: 'up', value: '6%' }}
        />
        <DemoKpiCard icon="solar:share-linear" label="Referral Asks" value="12" />
      </div>

      {/* Touchpoint timeline */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:clock-circle-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">
            Post-Close Touchpoint Timeline
          </h3>
        </div>
        <div className="p-5">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-3 bottom-3 w-px bg-white/10" />

            <div className="space-y-5">
              {clientTouchpoints.map((tp, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  {/* Icon dot */}
                  <div className="w-[30px] h-[30px] rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 relative z-10">
                    <IconifyIcon
                      icon={touchpointIcons[tp.type]}
                      className="text-teal-400"
                      width={14}
                    />
                  </div>
                  {/* Content */}
                  <div className="min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-white font-display">{tp.label}</p>
                      <span className="text-[10px] font-medium text-aasani-text-muted bg-white/5 px-2 py-0.5 rounded-full font-display">
                        {tp.timing}
                      </span>
                    </div>
                    <p className="text-xs text-aasani-text-muted font-display mt-0.5">
                      {tp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Newsletter preview */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:letter-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Newsletter Preview</h3>
        </div>
        <div className="p-5 space-y-4">
          {/* Email header */}
          <div className="space-y-1">
            <p className="text-sm font-bold text-white font-display">
              {newsletterPreview.subject}
            </p>
            <p className="text-xs text-aasani-text-muted font-display">
              {newsletterPreview.previewText}
            </p>
          </div>

          {/* Neighborhood stats bar chart */}
          <div className="space-y-2.5">
            {newsletterPreview.neighborhoods.map((n, i) => {
              const price = prices[i];
              const widthPct = (price / maxPrice) * 100;
              const isPositive = n.change.startsWith('+');
              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white font-display font-medium">{n.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-aasani-text-muted font-display tabular-nums">
                        {n.medianPrice}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full font-display ${
                          isPositive
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-red-500/15 text-red-400'
                        }`}
                      >
                        {n.change}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500/40"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.clientComms} />
    </div>
  );
}
