import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { reviews, reviewPipeline, referralLeaderboard, systemQandA } from '../../data/demoData';

const rankColors: Record<number, { text: string; bg: string }> = {
  1: { text: 'text-amber-400', bg: 'bg-amber-400/10' },
  2: { text: 'text-neutral-400', bg: 'bg-neutral-400/10' },
  3: { text: 'text-orange-400', bg: 'bg-orange-400/10' },
};

const platformBadge: Record<string, string> = {
  Google: 'text-blue-400 bg-blue-500/10',
  Zillow: 'text-teal-400 bg-teal-500/10',
};

export function SystemReviews() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DemoKpiCard
          icon="solar:star-bold"
          label="Avg Rating"
          value="4.8"
          trend={{ direction: 'up', value: '0.2' }}
        />
        <DemoKpiCard
          icon="solar:chat-square-like-linear"
          label="Total Reviews"
          value="47"
        />
        <DemoKpiCard
          icon="solar:letter-linear"
          label="Requests Sent"
          value="23"
        />
        <DemoKpiCard
          icon="solar:users-group-rounded-linear"
          label="Referrals This Quarter"
          value="6"
        />
      </div>

      {/* Recent Reviews */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:star-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Recent Reviews</h3>
        </div>
        <div className="divide-y divide-white/5">
          {reviews.map((review, i) => (
            <div key={i} className="px-5 py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-semibold text-white font-display truncate">
                    {review.name}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full shrink-0',
                      platformBadge[review.platform]
                    )}
                  >
                    {review.platform}
                  </span>
                </div>
                <span className="text-xs text-aasani-text-muted shrink-0 font-display">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, s) => (
                  <IconifyIcon
                    key={s}
                    icon={s < Math.round(review.stars) ? 'solar:star-bold' : 'solar:star-linear'}
                    className={s < Math.round(review.stars) ? 'text-amber-400' : 'text-neutral-600'}
                    width={14}
                  />
                ))}
                <span className="text-xs text-aasani-text-muted ml-1 font-display">
                  {review.stars}
                </span>
              </div>
              <p className="text-sm text-aasani-text-muted leading-relaxed font-display">
                {review.excerpt}
              </p>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Review Pipeline */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:sort-from-top-to-bottom-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Review Pipeline</h3>
        </div>
        <div className="px-5 py-5">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {reviewPipeline.map((stage, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <IconifyIcon icon={stage.icon} className="text-teal-400" width={20} />
                  </div>
                  <span className="text-xs text-aasani-text-muted font-display text-center">
                    {stage.stage}
                  </span>
                  <span className="text-lg font-bold text-white font-display">{stage.count}</span>
                </div>
                {i < reviewPipeline.length - 1 && (
                  <IconifyIcon
                    icon="solar:arrow-right-linear"
                    className="text-neutral-600 shrink-0 mt-[-20px]"
                    width={18}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* Referral Leaderboard */}
      <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
          <IconifyIcon icon="solar:cup-star-linear" className="text-teal-400" width={18} />
          <h3 className="text-sm font-semibold text-white font-display">Referral Leaderboard</h3>
        </div>
        <div className="divide-y divide-white/5">
          {referralLeaderboard.map((entry, i) => {
            const rank = i + 1;
            const colors = rankColors[rank];
            return (
              <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-display',
                    colors.bg,
                    colors.text
                  )}
                >
                  #{rank}
                </div>
                <span className="text-sm font-semibold text-white font-display flex-1">
                  {entry.name}
                </span>
                <span className="text-sm text-aasani-text-muted font-display">
                  {entry.referrals} referrals
                </span>
                {rank === 1 && (
                  <IconifyIcon icon="solar:cup-star-bold" className="text-amber-400" width={18} />
                )}
              </div>
            );
          })}
        </div>
      </GlassPanel>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.reviews} />
    </div>
  );
}
