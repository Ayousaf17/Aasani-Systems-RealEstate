import { GlassPanel } from '../ui/GlassPanel';
import { IconifyIcon } from '../ui/IconifyIcon';
import { cn } from '../../lib/utils';
import { DemoKpiCard } from './DemoKpiCard';
import { DemoQandA } from './DemoQandA';
import { appointments, systemQandA } from '../../data/demoData';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

const typeColors: Record<string, { bg: string; text: string; badge: string }> = {
  Showing: { bg: 'bg-teal-500/15', text: 'text-teal-300', badge: 'bg-teal-500/10 text-teal-300 border-teal-500/20' },
  Consultation: { bg: 'bg-purple-500/15', text: 'text-purple-300', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  'Listing Appt': { bg: 'bg-amber-500/15', text: 'text-amber-300', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  'Open House': { bg: 'bg-emerald-500/15', text: 'text-emerald-300', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
};

function timeToRow(time: string): number {
  const match = time.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour - 9; // 9 AM = row 0
}

export function SystemScheduling() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-3">
        <DemoKpiCard
          icon="solar:calendar-linear"
          label="Appointments This Week"
          value="8"
        />
        <DemoKpiCard
          icon="solar:close-circle-linear"
          label="No-Show Rate"
          value="4%"
          trend={{ direction: 'down', value: '2%' }}
        />
        <DemoKpiCard
          icon="solar:graph-up-linear"
          label="Avg Bookings/Day"
          value="2.3"
        />
      </div>

      {/* Calendar Grid + Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden lg:col-span-2">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:calendar-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">This Week</h3>
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Day headers */}
              <div className="grid grid-cols-[48px_repeat(5,1fr)] gap-1 mb-1">
                <div /> {/* empty corner */}
                {days.map((day) => (
                  <div key={day} className="text-center text-[10px] uppercase tracking-wider text-aasani-text-muted font-display py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time rows */}
              <div className="grid grid-cols-[48px_repeat(5,1fr)] gap-1">
                {hours.map((hour, rowIdx) => (
                  <div key={hour} className="contents">
                    {/* Time label */}
                    <div className="text-[10px] text-aasani-text-muted font-display py-2 text-right pr-2">
                      {hour}
                    </div>
                    {/* Day cells */}
                    {days.map((day) => {
                      const appt = appointments.find(
                        (a) => a.day === day && timeToRow(a.time) === rowIdx
                      );
                      const colors = appt ? typeColors[appt.type] : null;
                      return (
                        <div
                          key={day}
                          className={cn(
                            'rounded-md min-h-[40px] border border-white/[0.03] transition-colors',
                            appt && colors ? colors.bg : 'bg-white/[0.01]'
                          )}
                        >
                          {appt && colors && (
                            <div className="px-2 py-1.5">
                              <p className={cn('text-[10px] font-semibold font-display truncate', colors.text)}>
                                {appt.client}
                              </p>
                              <p className="text-[9px] text-aasani-text-muted font-display truncate">
                                {appt.time}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-white/5">
                {Object.entries(typeColors).map(([type, colors]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div className={cn('w-2.5 h-2.5 rounded-sm', colors.bg, 'border', `border-${colors.text.replace('text-', '')}/30`)} />
                    <span className="text-[10px] text-aasani-text-muted font-display">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Upcoming Appointments */}
        <GlassPanel className="rounded-xl border border-white/5 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <IconifyIcon icon="solar:list-check-linear" className="text-teal-400" width={18} />
            <h3 className="text-sm font-semibold text-white font-display">Upcoming</h3>
          </div>
          <div className="divide-y divide-white/5">
            {appointments.map((appt, i) => {
              const colors = typeColors[appt.type];
              return (
                <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                  {/* Confirmed indicator */}
                  <div className="mt-0.5 shrink-0">
                    {appt.confirmed ? (
                      <IconifyIcon icon="solar:check-circle-bold" className="text-emerald-400" width={16} />
                    ) : (
                      <IconifyIcon icon="solar:clock-circle-linear" className="text-amber-400" width={16} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white font-display truncate">{appt.client}</p>
                    <p className="text-[11px] text-aasani-text-muted font-display truncate mt-0.5">
                      {appt.property}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-aasani-text-muted font-display">
                        {appt.day} {appt.time}
                      </span>
                      <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full border', colors.badge)}>
                        {appt.type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      {/* Q&A */}
      <DemoQandA questions={systemQandA.scheduling} />
    </div>
  );
}
