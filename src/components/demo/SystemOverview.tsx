import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import {
  AreaChart,
  DonutChart,
  ConversionRings,
  FunnelChart,
  HorizontalBarChart,
  RadialGauge,
  PipelineWaterfall,
} from './charts';
import {
  demoSystems,
  demoLeads,
  scoredLeads,
  transactions,
  appointments,
  reviews,
  newsletterPreview,
  reviewPipeline,
  weeklyTrends,
  weekDays,
  leadSourceDistribution,
  conversionMetrics,
  pipelineByStage,
} from '../../data/demoData';

// ─── Derived data ─────────────────────────────────────────

const hotLeads = scoredLeads.filter(l => l.tier === 'Hot').length;
const activeDeals = transactions.filter(t => t.stage !== 'Closed').length;
const urgentDeals = transactions.filter(t => t.daysRemaining <= 3 && t.daysRemaining > 0).length;
const confirmedAppts = appointments.filter(a => a.confirmed).length;
const avgRating = (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1);
const respondedLeads = demoLeads.filter(l => l.status === 'Responded' || l.status === 'Qualified').length;
const totalPipelineValue = '$2,990,000';
const totalLeads7d = weeklyTrends.leads.reduce((a, b) => a + b, 0);

// ─── System Health Card ───────────────────────────────────

interface SystemHealthCardProps {
  name: string;
  icon: string;
  status: 'healthy' | 'attention' | 'critical';
  metrics: { label: string; value: string }[];
  highlight?: string;
  onNavigate: () => void;
}

function SystemHealthCard({ name, icon, status, metrics, highlight, onNavigate }: SystemHealthCardProps) {
  const statusConfig = {
    healthy: { color: 'bg-emerald-400', label: 'Healthy', text: 'text-emerald-400' },
    attention: { color: 'bg-amber-400', label: 'Attention', text: 'text-amber-400' },
    critical: { color: 'bg-red-400', label: 'Critical', text: 'text-red-400' },
  };
  const s = statusConfig[status];

  return (
    <GlassPanel className="rounded-xl border border-white/5 p-4 hover:bg-white/[0.03] transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
            <IconifyIcon icon={icon} className="text-teal-400" width={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-white font-display">{name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={cn('w-1.5 h-1.5 rounded-full', s.color)} />
              <span className={cn('text-[10px] font-medium font-display', s.text)}>{s.label}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onNavigate}
          className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer"
        >
          <IconifyIcon icon="solar:arrow-right-linear" className="text-aasani-text-muted" width={14} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/[0.02] rounded-lg px-2.5 py-2">
            <p className="text-[10px] text-aasani-text-muted font-display">{m.label}</p>
            <p className="text-sm font-bold text-white font-display">{m.value}</p>
          </div>
        ))}
      </div>
      {highlight && (
        <div className="flex items-center gap-1.5 pt-1">
          <IconifyIcon icon="solar:bolt-circle-linear" className="text-teal-400 shrink-0" width={12} />
          <p className="text-[10px] text-teal-300 font-display truncate">{highlight}</p>
        </div>
      )}
    </GlassPanel>
  );
}

// ─── Activity feed events ─────────────────────────────────

const activityFeed = [
  { icon: 'solar:chat-square-call-linear', color: 'text-teal-400', text: 'Auto-replied to Sarah Mitchell', detail: 'Zillow lead — 34s response time', time: '2 min ago' },
  { icon: 'solar:target-linear', color: 'text-rose-400', text: 'Marcus Thompson scored 87 (Hot)', detail: 'Clicked 8 emails, saved 5 properties', time: '15 min ago' },
  { icon: 'solar:check-circle-linear', color: 'text-emerald-400', text: 'Emily Chen — closing in 3 days', detail: '1205 S 1st St · $375,000 · Clear to Close', time: '22 min ago' },
  { icon: 'solar:star-bold', color: 'text-amber-400', text: 'New 5-star review from Sarah Mitchell', detail: '"Ayub made the entire process seamless..."', time: '1.5 hr ago' },
];

// ─── Market snapshot data for horizontal bars ─────────────

const marketItems = newsletterPreview.neighborhoods.map(n => ({
  label: n.name,
  value: parseInt(n.medianPrice.replace(/[$K]/g, '')) * 1000,
  displayValue: n.medianPrice,
  badge: n.change,
  badgeColor: n.change.startsWith('+') ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400',
}));

// ─── Referral funnel data ─────────────────────────────────

const referralFunnelStages = reviewPipeline.map(p => ({
  label: p.stage,
  value: p.count,
}));

// ─── Component ────────────────────────────────────────────

interface SystemOverviewProps {
  onSystemChange?: (index: number) => void;
}

export function SystemOverview({ onSystemChange }: SystemOverviewProps) {
  const navigate = (index: number) => () => onSystemChange?.(index);

  return (
    <div className="space-y-6">

      {/* ── Row 1: Executive Summary KPIs with sparklines ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DemoKpiCard
          icon="solar:graph-up-linear"
          label="Pipeline Value"
          value={totalPipelineValue}
          trend={{ direction: 'up', value: '12%' }}
          sparklineData={weeklyTrends.pipelineValue}
        />
        <DemoKpiCard
          icon="solar:fire-linear"
          label="Leads (7d)"
          value={String(totalLeads7d)}
          trend={{ direction: 'up', value: '8' }}
          sparklineData={weeklyTrends.leads}
        />
        <DemoKpiCard
          icon="solar:document-linear"
          label="Active Deals"
          value={String(activeDeals)}
        />
        <DemoKpiCard
          icon="solar:star-bold"
          label="Avg Rating"
          value={avgRating}
          trend={{ direction: 'up', value: '0.2' }}
        />
      </div>

      {/* ── Row 2: Acquisition & Quality (3-panel visual row) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Panel 1 — Lead Volume Trend */}
        <GlassPanel className="rounded-xl border border-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white font-display">7-Day Lead Volume</h3>
            <span className="text-[10px] text-aasani-text-muted font-display">{totalLeads7d} total</span>
          </div>
          <AreaChart data={weeklyTrends.leads} labels={weekDays} />
        </GlassPanel>

        {/* Panel 2 — Lead Sources */}
        <GlassPanel className="rounded-xl border border-white/5 p-5 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-white font-display mb-4 self-start">Lead Sources</h3>
          <DonutChart
            segments={leadSourceDistribution}
            size={150}
            centerLabel={String(leadSourceDistribution.reduce((s, d) => s + d.value, 0))}
            centerSubLabel="sources"
          />
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-4">
            {leadSourceDistribution.map(s => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-aasani-text-muted font-display">{s.label}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Panel 3 — Conversion Metrics */}
        <GlassPanel className="rounded-xl border border-white/5 p-5">
          <h3 className="text-sm font-semibold text-white font-display mb-4">Conversion Metrics</h3>
          <div className="flex items-center justify-center h-full">
            <ConversionRings metrics={conversionMetrics} ringSize={68} />
          </div>
        </GlassPanel>
      </div>

      {/* ── Row 3: Live Activity Feed (compact — 4 events) ── */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-white font-display">Live Activity</h3>
          <span className="text-[10px] text-aasani-text-muted font-display ml-auto">Last 2 hours</span>
        </div>
        <div className="divide-y divide-white/5">
          {activityFeed.map((event, i) => (
            <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                <IconifyIcon icon={event.icon} className={event.color} width={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white font-display">{event.text}</p>
                <p className="text-[11px] text-aasani-text-muted font-display mt-0.5 truncate">{event.detail}</p>
              </div>
              <span className="text-[10px] text-aasani-text-muted font-display shrink-0 mt-1">{event.time}</span>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* ── Row 4: System Health Grid (7 cards) ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <IconifyIcon icon="solar:widget-2-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">System Health</h3>
          <span className="text-[10px] text-aasani-text-muted font-display ml-1">Click any card to drill in</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <SystemHealthCard
            name={demoSystems[0].name}
            icon={demoSystems[0].icon}
            status="healthy"
            metrics={[
              { label: 'Avg Response', value: '47s' },
              { label: 'Today', value: '12 leads' },
              { label: 'Response Rate', value: '98%' },
              { label: 'Responded', value: `${respondedLeads}/${demoLeads.length}` },
            ]}
            highlight="All leads responded under 60s today"
            onNavigate={navigate(0)}
          />
          <SystemHealthCard
            name={demoSystems[1].name}
            icon={demoSystems[1].icon}
            status="healthy"
            metrics={[
              { label: 'Hot Leads', value: String(hotLeads) },
              { label: 'Avg Score', value: '67' },
              { label: 'New This Week', value: '14' },
              { label: 'Score Range', value: '12–94' },
            ]}
            highlight={`${hotLeads} hot leads ready for immediate follow-up`}
            onNavigate={navigate(1)}
          />
          <SystemHealthCard
            name={demoSystems[2].name}
            icon={demoSystems[2].icon}
            status="healthy"
            metrics={[
              { label: 'Sequences', value: '6 active' },
              { label: 'Emails Sent', value: '847' },
              { label: 'Open Rate', value: '42%' },
              { label: 'Reply Rate', value: '12%' },
            ]}
            highlight="Open rate 3% above last month"
            onNavigate={navigate(2)}
          />
          <SystemHealthCard
            name={demoSystems[3].name}
            icon={demoSystems[3].icon}
            status="healthy"
            metrics={[
              { label: 'This Week', value: '8 appts' },
              { label: 'No-Shows', value: '4%' },
              { label: 'Confirmed', value: `${confirmedAppts}/${appointments.length}` },
              { label: 'Avg/Day', value: '2.3' },
            ]}
            highlight={`${confirmedAppts} of ${appointments.length} appointments confirmed`}
            onNavigate={navigate(3)}
          />
          <SystemHealthCard
            name={demoSystems[4].name}
            icon={demoSystems[4].icon}
            status={urgentDeals > 0 ? 'attention' : 'healthy'}
            metrics={[
              { label: 'Active Deals', value: String(activeDeals) },
              { label: 'Pipeline', value: totalPipelineValue },
              { label: 'On-Time', value: '96%' },
              { label: 'Avg Close', value: '34 days' },
            ]}
            highlight={urgentDeals > 0 ? `${urgentDeals} deal${urgentDeals > 1 ? 's' : ''} closing within 3 days` : 'All deadlines on track'}
            onNavigate={navigate(4)}
          />
          <SystemHealthCard
            name={demoSystems[5].name}
            icon={demoSystems[5].icon}
            status="healthy"
            metrics={[
              { label: 'Past Clients', value: '127' },
              { label: 'Touchpoints', value: '340/mo' },
              { label: 'Open Rate', value: '44%' },
              { label: 'Referral Asks', value: '12' },
            ]}
            highlight="Open rates 44% — 2x industry average"
            onNavigate={navigate(5)}
          />
          <SystemHealthCard
            name={demoSystems[6].name}
            icon={demoSystems[6].icon}
            status="healthy"
            metrics={[
              { label: 'Avg Rating', value: avgRating },
              { label: 'Total Reviews', value: '47' },
              { label: 'Requests Sent', value: '23' },
              { label: 'Referrals', value: '6 this qtr' },
            ]}
            highlight={`${reviewPipeline[2].count} reviews from ${reviewPipeline[1].count} requests — 78% conversion`}
            onNavigate={navigate(6)}
          />
        </div>
      </div>

      {/* ── Row 5: Revenue Pipeline + Referral Funnel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left — Pipeline Waterfall */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:chart-2-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Deal Pipeline</h3>
            <span className="text-[10px] text-aasani-text-muted font-display ml-auto">{totalPipelineValue} total</span>
          </div>
          <div className="p-5">
            <PipelineWaterfall stages={pipelineByStage} />
          </div>
        </GlassPanel>

        {/* Right — Referral Funnel */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:users-group-rounded-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Review → Referral Funnel</h3>
          </div>
          <div className="p-5">
            <FunnelChart stages={referralFunnelStages} />
          </div>
        </GlassPanel>
      </div>

      {/* ── Row 6: Market Context + Reputation ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left — Market Snapshot (2/3 width) */}
        <GlassPanel className="lg:col-span-2 rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:map-point-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Austin Market — Neighborhood Prices</h3>
          </div>
          <div className="p-5">
            <HorizontalBarChart items={marketItems} />
          </div>
        </GlassPanel>

        {/* Right — Review Gauge (1/3 width) */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:cup-star-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Review Rating</h3>
          </div>
          <div className="p-5 flex flex-col items-center">
            <RadialGauge value={parseFloat(avgRating)} max={5} label="out of 5.0" size={140} />
            <div className="grid grid-cols-2 gap-3 mt-4 w-full">
              <div className="bg-white/[0.02] rounded-lg px-3 py-2 text-center">
                <p className="text-lg font-bold text-white font-display">47</p>
                <p className="text-[10px] text-aasani-text-muted font-display">Total Reviews</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg px-3 py-2 text-center">
                <p className="text-lg font-bold text-white font-display">78%</p>
                <p className="text-[10px] text-aasani-text-muted font-display">Conv. Rate</p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
