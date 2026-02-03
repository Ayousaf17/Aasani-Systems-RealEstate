import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { BottomNav } from '../components/navigation/BottomNav';
import { LeadCaptureDialog } from '../components/ui/LeadCaptureDialog';

const checklistItems = [
  {
    number: 1,
    title: 'Instant Lead Response',
    question: "When a lead comes in at 9pm, do they hear back immediately — or do they wait until you check your phone in the morning?",
    stat: '78% of buyers choose whoever responds first.',
    checks: [
      'Leads get a response within 5 minutes, 24/7',
      'The response feels personal, not like a generic autoresponder',
      "You're notified so you can follow up when ready",
    ],
  },
  {
    number: 2,
    title: 'Lead Qualification & Scoring',
    question: 'Are you spending equal time on tire-kickers and serious buyers?',
    checks: [
      'You know which leads are hot vs. cold before you call',
      'Your CRM automatically flags high-intent behavior',
      'You focus your energy on people ready to move',
    ],
  },
  {
    number: 3,
    title: 'Smart Follow-Up Sequences',
    question: '80% of deals require 5+ follow-ups. Most agents stop at 2.',
    checks: [
      'Every lead gets consistent follow-up (not just the ones you remember)',
      'Messages feel personal, not robotic',
      "You're not manually sending \"just checking in\" emails",
    ],
  },
  {
    number: 4,
    title: 'Appointment Scheduling & Reminders',
    question: 'How many hours do you lose to phone tag and no-shows?',
    checks: [
      'Clients book directly on your calendar (no back-and-forth)',
      'Automatic reminders reduce no-shows',
      'Reschedules happen without your involvement',
    ],
  },
  {
    number: 5,
    title: 'Transaction Coordination',
    question: '30+ tasks happen between offer and close. Are you tracking them manually?',
    checks: [
      'Every deadline is tracked automatically',
      'Nothing slips through the cracks',
      "You're not chasing paperwork at midnight",
    ],
  },
  {
    number: 6,
    title: 'Client Communication & Content',
    question: "Your past clients trusted you with one of life's biggest decisions. Are you staying in their world?",
    checks: [
      'Past clients hear from you regularly (not just at holidays)',
      'Your content feels valuable, not spammy',
      'When someone asks "know a good agent?" your name comes up',
    ],
  },
  {
    number: 7,
    title: 'Review & Referral Generation',
    question: '41% of top agent business comes from referrals.',
    checks: [
      'Happy clients are prompted to leave reviews (automatically)',
      'You have a system for asking for referrals',
      "It happens consistently, not when you remember",
    ],
  },
];

const scoreGuide = [
  { range: '7 checks', description: "You're ahead of 95% of agents. Time to dial in the details." },
  { range: '4-6 checks', description: "You have foundations. Now fill the gaps that are costing you." },
  { range: '1-3 checks', description: "You're leaving significant time and money on the table." },
  { range: '0 checks', description: "You're not alone. Most agents are here. This is where it changes." },
];

export function ChecklistPage() {

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'bookatime' });
      cal('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#14B8A6' },
          dark: { 'cal-brand': '#2DD4BF' },
        },
        hideEventTypeDetails: false,
        layout: 'week_view',
      });
    })();
  }, []);


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12 md:pb-16 pt-14 md:pt-20">
      <BottomNav />

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-12 md:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
            The 7 Systems Checklist
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-display">
            For Real Estate Agents Who Want Their Time Back
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <p className="text-neutral-300 leading-relaxed font-display">
            <span className="text-white font-semibold">How many of these do you have in place?</span>
            <br /><br />
            Be honest. Check the ones that are actually working, not the ones you "have somewhere" but never use.
          </p>
        </div>

        {/* Checklist Items */}
        <div className="space-y-8 mb-16">
          {checklistItems.map((item) => (
            <div
              key={item.number}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold font-mono">
                  {item.number}
                </span>
                <div>
                  <h2 className="text-xl font-bold font-display text-white mb-2">
                    {item.title}
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base font-display">
                    {item.question}
                  </p>
                </div>
              </div>

              {item.stat && (
                <p className="text-teal-300 text-sm font-semibold mb-4 ml-14 font-display">
                  {item.stat}
                </p>
              )}

              <div className="ml-14 space-y-3">
                <p className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
                  You have this if:
                </p>
                {item.checks.map((check, i) => (
                  <label
                    key={i}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-teal-500 checked:border-teal-500 focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-0 cursor-pointer transition-colors"
                    />
                    <span className="text-neutral-300 group-hover:text-white transition-colors font-display">
                      {check}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Score Guide */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <h3 className="text-lg font-bold font-display mb-4 text-center">
            Score Yourself
          </h3>
          <div className="space-y-2">
            {scoreGuide.map((score, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-teal-300 font-mono text-sm w-24 flex-shrink-0">
                  {score.range}:
                </span>
                <span className="text-neutral-300 text-sm font-display">
                  {score.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <div className="text-center bg-gradient-to-b from-teal-500/10 to-transparent border border-teal-500/20 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold font-display mb-2">
            What's Next?
          </h3>
          <p className="text-neutral-400 mb-6 max-w-md mx-auto font-display">
            Your systems can work together. It starts with a conversation.
          </p>
          <button
            data-cal-namespace="bookatime"
            data-cal-link="ayub-yousaf-c1ijnf/bookatime"
            data-cal-config='{"layout":"week_view"}'
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-4 px-6 rounded-full transition-colors min-h-[44px] mb-4"
          >
            Book Your Free Strategy Call
            <iconify-icon icon="solar:calendar-add-linear" width={20} />
          </button>
          <p className="text-neutral-500 text-sm mb-4">
            60 minutes. Custom automation roadmap. No strings attached.
          </p>

          {/* Secondary CTA - Deep Dive Guide */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-neutral-500 text-sm mb-3">Want to see how first?</p>
            <LeadCaptureDialog
              trigger={
                <button className="text-teal-300 hover:text-teal-200 text-sm font-display transition-colors inline-flex items-center gap-1">
                  Get the 7 Systems Deep-Dive guide
                  <iconify-icon icon="solar:arrow-right-linear" width={16} />
                </button>
              }
              source="checklist_page"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-neutral-500 text-sm mb-2 font-display">
            Questions? Email me directly:{' '}
            <a
              href="mailto:ayub@aasani.ai"
              className="text-teal-300 hover:text-teal-200 transition-colors"
            >
              ayub@aasani.ai
            </a>
          </p>
          <p className="text-neutral-600 text-xs font-mono">
            Built by Aasani Systems — "Structure Before Intelligence"
          </p>
        </div>
      </main>
    </div>
  );
}
