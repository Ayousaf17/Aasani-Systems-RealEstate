// Demo dashboard mock data — Austin, TX real estate context
// All data is static/fake for sales meeting presentations

// ─── Types ───────────────────────────────────────────────

export interface DemoLead {
  name: string;
  source: string;
  phone: string;
  timestamp: string;
  status: 'Responded' | 'Pending' | 'Qualified' | 'Nurturing';
  responseTime: string;
}

export interface ScoredLead {
  name: string;
  score: number;
  tier: 'Hot' | 'Warm' | 'Cold';
  source: string;
  lastActivity: string;
  behaviors: string[];
}

export interface CrmSequence {
  name: string;
  stages: number;
  activeLeads: number;
  openRate: string;
  sampleSubject: string;
  sampleBody: string;
}

export interface Appointment {
  client: string;
  property: string;
  time: string;
  day: string;
  type: 'Showing' | 'Consultation' | 'Listing Appt' | 'Open House';
  confirmed: boolean;
}

export interface Transaction {
  property: string;
  client: string;
  price: string;
  stage: 'New' | 'Under Contract' | 'Inspection' | 'Clear to Close' | 'Closed';
  daysRemaining: number;
  nextDeadline: string;
}

export interface ClientTouchpoint {
  label: string;
  timing: string;
  type: 'email' | 'text' | 'call' | 'mail';
  description: string;
}

export interface Review {
  name: string;
  stars: number;
  platform: 'Google' | 'Zillow';
  excerpt: string;
  date: string;
}

export interface QandAItem {
  question: string;
  answer: string;
  stat?: string;
}

// ─── System Metadata ─────────────────────────────────────

export const demoSystems = [
  { name: 'Command Center', icon: 'solar:widget-2-linear' },
  { name: 'Instant Lead Response', icon: 'solar:chat-square-call-linear' },
  { name: 'Lead Scoring', icon: 'solar:target-linear' },
  { name: 'CRM Follow-Up', icon: 'solar:sort-from-top-to-bottom-linear' },
  { name: 'Scheduling', icon: 'solar:calendar-linear' },
  { name: 'Transactions', icon: 'solar:chart-2-linear' },
  { name: 'Client Comms', icon: 'solar:chat-round-linear' },
  { name: 'Reviews & Referrals', icon: 'solar:cup-star-linear' },
];

// ─── System 1: Instant Lead Response ─────────────────────

export const demoLeads: DemoLead[] = [
  { name: 'Sarah Mitchell', source: 'Zillow', phone: '(512) 555-0142', timestamp: '2 min ago', status: 'Responded', responseTime: '34s' },
  { name: 'James Rodriguez', source: 'Realtor.com', phone: '(512) 555-0287', timestamp: '8 min ago', status: 'Responded', responseTime: '47s' },
  { name: 'Emily Chen', source: 'Website', phone: '(512) 555-0391', timestamp: '15 min ago', status: 'Responded', responseTime: '52s' },
  { name: 'Marcus Thompson', source: 'Facebook Ad', phone: '(512) 555-0458', timestamp: '22 min ago', status: 'Qualified', responseTime: '41s' },
  { name: 'Ashley Nguyen', source: 'Open House', phone: '(512) 555-0519', timestamp: '35 min ago', status: 'Responded', responseTime: '38s' },
  { name: 'David Patel', source: 'Zillow', phone: '(512) 555-0623', timestamp: '1 hr ago', status: 'Nurturing', responseTime: '55s' },
  { name: 'Rachel Kim', source: 'Referral', phone: '(512) 555-0734', timestamp: '1.5 hr ago', status: 'Qualified', responseTime: '29s' },
  { name: 'Tyler Brooks', source: 'Realtor.com', phone: '(512) 555-0847', timestamp: '2 hr ago', status: 'Pending', responseTime: '—' },
];

export const smsPreview = {
  from: 'You (auto-reply)',
  to: 'Sarah Mitchell',
  message: "Hi Sarah! Thanks for your interest in 4521 Spicewood Springs Rd. I'd love to help you learn more about this property. Are you available for a showing this week? I have openings Thursday afternoon or Saturday morning. — Ayub",
};

// ─── System 2: Lead Scoring ──────────────────────────────

export const scoredLeads: ScoredLead[] = [
  { name: 'Sarah Mitchell', score: 94, tier: 'Hot', source: 'Zillow', lastActivity: '10 min ago', behaviors: ['Viewed 12 listings', 'Pre-approved', 'Requested showing'] },
  { name: 'Marcus Thompson', score: 87, tier: 'Hot', source: 'Facebook Ad', lastActivity: '1 hr ago', behaviors: ['Clicked 8 emails', 'Saved 5 properties', 'Opened price alert 3x'] },
  { name: 'Rachel Kim', score: 82, tier: 'Hot', source: 'Referral', lastActivity: '3 hr ago', behaviors: ['Referred by past client', 'Responded same day', 'Budget confirmed'] },
  { name: 'Emily Chen', score: 71, tier: 'Warm', source: 'Website', lastActivity: '1 day ago', behaviors: ['Visited site 6x', 'Downloaded buyer guide', 'Opened 4 emails'] },
  { name: 'James Rodriguez', score: 63, tier: 'Warm', source: 'Realtor.com', lastActivity: '2 days ago', behaviors: ['Viewed 3 listings', 'Opened 2 emails'] },
  { name: 'Ashley Nguyen', score: 54, tier: 'Warm', source: 'Open House', lastActivity: '4 days ago', behaviors: ['Attended open house', 'Signed up for alerts'] },
  { name: 'David Patel', score: 31, tier: 'Cold', source: 'Zillow', lastActivity: '2 weeks ago', behaviors: ['Initial inquiry only'] },
  { name: 'Tyler Brooks', score: 12, tier: 'Cold', source: 'Realtor.com', lastActivity: '3 weeks ago', behaviors: ['No engagement after inquiry'] },
];

// ─── System 3: CRM Follow-Up Sequences ──────────────────

export const crmSequences: CrmSequence[] = [
  {
    name: 'New Lead Nurture',
    stages: 8,
    activeLeads: 23,
    openRate: '44%',
    sampleSubject: 'Austin market update — prices shifted this month',
    sampleBody: "Hi {{first_name}},\n\nThe Austin market just had an interesting shift — median prices in {{neighborhood}} moved 2.3% this month. For buyers like you, this could mean more negotiating power.\n\nI put together a quick breakdown of what's happening in your target areas. Want me to send it over?\n\nBest,\nAyub",
  },
  {
    name: 'Post-Showing Follow-Up',
    stages: 5,
    activeLeads: 8,
    openRate: '52%',
    sampleSubject: 'Quick thought on the {{property}} showing',
    sampleBody: "Hi {{first_name}},\n\nGreat meeting you at {{property}} yesterday! I noticed you seemed interested in the backyard and kitchen layout.\n\nI found 2 similar properties in the area that just hit the market — same style, slightly better price point. Want me to set up showings this week?\n\nAyub",
  },
  {
    name: 'Sphere Re-engagement',
    stages: 6,
    activeLeads: 45,
    openRate: '38%',
    sampleSubject: "Your {{neighborhood}} home's value — quick update",
    sampleBody: "Hi {{first_name}},\n\nHope you're enjoying the new place! Quick heads up — homes in {{neighborhood}} are up 4.1% since you purchased. Your home's estimated value is now around {{est_value}}.\n\nWould a detailed market report for your street be helpful?\n\nAyub",
  },
  {
    name: 'Expired Listing Outreach',
    stages: 4,
    activeLeads: 12,
    openRate: '31%',
    sampleSubject: 'Noticed your listing at {{address}} expired',
    sampleBody: "Hi {{first_name}},\n\nI saw your property at {{address}} came off the market. That's frustrating — especially in this market.\n\nI've been helping sellers in {{neighborhood}} get results with a different approach. Would a quick 10-minute chat be worth your time?\n\nAyub",
  },
];

export const behaviorTriggers = [
  { trigger: 'Opened listing email 3x', action: 'Auto-send showing invite', icon: 'solar:letter-opened-linear' },
  { trigger: 'Visited pricing page', action: 'Send market comparison', icon: 'solar:chart-2-linear' },
  { trigger: 'No response in 7 days', action: 'Switch to re-engagement sequence', icon: 'solar:restart-linear' },
  { trigger: 'Clicked mortgage calculator', action: 'Send pre-approval partner intro', icon: 'solar:calculator-linear' },
];

// ─── System 4: Scheduling ────────────────────────────────

export const appointments: Appointment[] = [
  { client: 'Sarah Mitchell', property: '4521 Spicewood Springs Rd', time: '10:00 AM', day: 'Mon', type: 'Showing', confirmed: true },
  { client: 'Marcus Thompson', property: '2845 Lake Austin Blvd', time: '2:00 PM', day: 'Mon', type: 'Consultation', confirmed: true },
  { client: 'Emily Chen', property: '1205 S 1st St', time: '11:00 AM', day: 'Tue', type: 'Showing', confirmed: false },
  { client: 'Rachel Kim', property: '8900 Shoal Creek Blvd', time: '9:00 AM', day: 'Wed', type: 'Listing Appt', confirmed: true },
  { client: 'James Rodriguez', property: '3421 Mueller Blvd', time: '3:00 PM', day: 'Thu', type: 'Showing', confirmed: true },
  { client: 'Ashley Nguyen', property: '6200 Bee Cave Rd', time: '1:00 PM', day: 'Fri', type: 'Open House', confirmed: true },
];

// ─── System 5: Transaction Coordination ──────────────────

export const transactions: Transaction[] = [
  { property: '4521 Spicewood Springs Rd', client: 'Sarah Mitchell', price: '$485,000', stage: 'Under Contract', daysRemaining: 22, nextDeadline: 'Option period ends Feb 18' },
  { property: '2845 Lake Austin Blvd', client: 'The Johnsons', price: '$1,200,000', stage: 'Inspection', daysRemaining: 8, nextDeadline: 'Inspection deadline Feb 16' },
  { property: '1205 S 1st St', client: 'Emily Chen', price: '$375,000', stage: 'Clear to Close', daysRemaining: 3, nextDeadline: 'Closing date Feb 17' },
  { property: '8900 Shoal Creek Blvd', client: 'David Patel', price: '$520,000', stage: 'Under Contract', daysRemaining: 28, nextDeadline: 'Survey due Feb 25' },
  { property: '3421 Mueller Blvd', client: 'Rachel Kim', price: '$410,000', stage: 'Closed', daysRemaining: 0, nextDeadline: 'Closed Feb 10' },
];

// ─── System 6: Client Communication ─────────────────────

export const clientTouchpoints: ClientTouchpoint[] = [
  { label: '1-Month Check-In', timing: '30 days post-close', type: 'text', description: 'How are you settling in? Need any contractor recs?' },
  { label: '3-Month Market Update', timing: '90 days post-close', type: 'email', description: 'Personalized neighborhood market report' },
  { label: '6-Month Anniversary', timing: '180 days post-close', type: 'email', description: 'Home anniversary + updated home value estimate' },
  { label: 'Annual Review', timing: '365 days post-close', type: 'email', description: 'Year-in-review: equity gained, market outlook, referral ask' },
  { label: 'Birthday Message', timing: 'Annual', type: 'text', description: 'Personal birthday wish with local restaurant gift card' },
  { label: 'Holiday Card', timing: 'December', type: 'mail', description: 'Physical holiday card with family photo' },
];

export const newsletterPreview = {
  subject: 'Your Mueller Neighborhood — February Market Snapshot',
  previewText: 'Median price up 4.1% — here\'s what it means for your home value',
  neighborhoods: [
    { name: 'Mueller', medianPrice: '$485K', change: '+4.1%' },
    { name: 'East Austin', medianPrice: '$410K', change: '+2.8%' },
    { name: 'Round Rock', medianPrice: '$375K', change: '+1.5%' },
    { name: 'Cedar Park', medianPrice: '$420K', change: '+3.2%' },
    { name: 'Lakeway', medianPrice: '$620K', change: '+1.9%' },
  ],
};

// ─── System 7: Reviews & Referrals ──────────────────────

export const reviews: Review[] = [
  { name: 'Sarah Mitchell', stars: 5, platform: 'Google', excerpt: 'Ayub made the entire process seamless. His systems kept us informed at every step — we never had to chase him for updates.', date: 'Feb 8, 2026' },
  { name: 'The Johnsons', stars: 5, platform: 'Zillow', excerpt: 'Best agent experience we\'ve ever had. The automated updates and market reports made us feel like VIPs.', date: 'Jan 22, 2026' },
  { name: 'Marcus Thompson', stars: 4.5, platform: 'Google', excerpt: 'Lightning fast responses. I texted about a listing and had a showing booked within 10 minutes.', date: 'Jan 15, 2026' },
  { name: 'Emily Chen', stars: 5, platform: 'Google', excerpt: 'The transaction coordination alone was worth it. Every deadline tracked, every document organized. Zero stress.', date: 'Dec 30, 2025' },
  { name: 'Rachel Kim', stars: 4.8, platform: 'Zillow', excerpt: 'Ayub\'s follow-up game is on another level. He checked in regularly without being pushy. Found us the perfect home.', date: 'Dec 12, 2025' },
  { name: 'David Patel', stars: 4.2, platform: 'Google', excerpt: 'Great agent with solid systems in place. The scheduling tool made booking showings a breeze.', date: 'Nov 28, 2025' },
];

export const reviewPipeline = [
  { stage: 'Closed Deals', count: 47, icon: 'solar:check-circle-linear' },
  { stage: 'Requests Sent', count: 23, icon: 'solar:letter-linear' },
  { stage: 'Reviews Received', count: 18, icon: 'solar:star-linear' },
  { stage: 'Referral Asks', count: 12, icon: 'solar:users-group-rounded-linear' },
];

export const referralLeaderboard = [
  { name: 'Sarah Mitchell', referrals: 4 },
  { name: 'The Johnsons', referrals: 3 },
  { name: 'Rachel Kim', referrals: 2 },
];

// ─── Aggregated Data for Charts ──────────────────────────

export const weeklyTrends = {
  leads: [3, 5, 2, 6, 4, 8, 7],
  responseTime: [52, 48, 45, 47, 43, 41, 39],
  emailsSent: [95, 110, 125, 140, 130, 145, 155],
  appointments: [1, 2, 1, 3, 2, 1, 0],
  pipelineValue: [2.1, 2.1, 2.3, 2.5, 2.5, 2.8, 2.99],
};
export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const leadSourceDistribution = [
  { label: 'Zillow', value: 2, color: '#60a5fa' },
  { label: 'Realtor.com', value: 2, color: '#f87171' },
  { label: 'Website', value: 1, color: '#2dd4bf' },
  { label: 'Facebook Ad', value: 1, color: '#a78bfa' },
  { label: 'Open House', value: 1, color: '#fbbf24' },
  { label: 'Referral', value: 1, color: '#34d399' },
];

export const conversionMetrics = [
  { label: 'Response Rate', value: 98, color: '#2dd4bf' },
  { label: 'Open Rate', value: 42, color: '#a78bfa' },
  { label: 'Review Conv.', value: 78, color: '#fbbf24' },
  { label: 'Referral Rate', value: 26, color: '#34d399' },
];

export const pipelineByStage = [
  { label: 'Under Contract', value: 1005000, displayValue: '$1.01M', count: 2 },
  { label: 'Inspection', value: 1200000, displayValue: '$1.2M', count: 1 },
  { label: 'Clear to Close', value: 375000, displayValue: '$375K', count: 1 },
  { label: 'Closed', value: 410000, displayValue: '$410K', count: 1 },
];

// ─── Q&A Content (per system) ────────────────────────────

export const systemQandA: Record<string, QandAItem[]> = {
  leadResponse: [
    {
      question: 'How fast does it actually respond?',
      answer: 'Within 60 seconds of a lead coming in. Studies show 78% of buyers work with the first agent to respond. Responding in 5 minutes vs 30 minutes makes you 21x more likely to qualify the lead.',
      stat: '21x more likely to qualify',
    },
    {
      question: 'Will the auto-reply sound robotic?',
      answer: "We write templates in YOUR voice. You approve every message before it goes live. It sounds like you on your best day — friendly, professional, and personal.",
    },
    {
      question: "What if I'm with a client and can't follow up right away?",
      answer: "That's exactly the point. The system responds instantly, warms the lead with relevant info, and queues a follow-up task for when you're free. No lead ever sits cold.",
    },
    {
      question: 'Does it work with my current phone number?',
      answer: 'Yes. We integrate with your existing number via Twilio or OpenPhone. Clients see YOUR number — not a random one.',
    },
  ],
  leadScoring: [
    {
      question: 'How does it know which leads are hot?',
      answer: 'It tracks behavior: email opens, property link clicks, showing requests, and response times. Each action adds points. You see a single score per lead that tells you exactly where to focus.',
      stat: 'Single score per lead',
    },
    {
      question: 'What if I disagree with a score?',
      answer: 'You can override any score and adjust the scoring rules. The system learns from your corrections over time, getting smarter with every adjustment.',
    },
    {
      question: "I already use Zillow's lead quality indicators. How is this different?",
      answer: "Zillow scores are platform-specific. This aggregates behavior across ALL your sources — Zillow, Realtor.com, your website, open houses — into one unified score. One dashboard, every lead.",
      stat: 'All sources unified',
    },
  ],
  crmFollowUp: [
    {
      question: "Won't people get annoyed by too many emails?",
      answer: 'Sequences are spaced intelligently (Day 1, 7, 21, etc.) and automatically stop when the lead engages. Nobody gets bombarded — the system is watching for replies and clicks.',
    },
    {
      question: 'Can I customize what gets sent?',
      answer: "100%. You write the templates — or we write them for you. You control the content, timing, and which leads enter which sequence. Nothing goes out without your approval.",
    },
    {
      question: 'How is this different from Mailchimp?',
      answer: "Mailchimp is bulk email on a schedule. This is behavior-triggered: a lead opens your listing email 3 times, the system auto-sends a showing invite. It reacts to what they DO, not just a calendar.",
      stat: 'Behavior-triggered, not scheduled',
    },
  ],
  scheduling: [
    {
      question: 'What if someone books when I\'m actually busy?',
      answer: 'Your calendar syncs in real-time with Google Calendar and Outlook. If you block time, it\'s blocked for bookings. One source of truth — no double-bookings.',
    },
    {
      question: "My clients aren't tech-savvy enough to book online.",
      answer: "The booking link is dead simple — pick a time, confirm. No account creation needed. We can also send booking links via text after a lead inquiry, which feels natural.",
    },
    {
      question: 'What about no-shows?',
      answer: 'Automated reminders go out at 48 hours and 2 hours before the appointment. If they don\'t confirm, you get flagged before you drive to the showing.',
      stat: '60-70% fewer no-shows',
    },
  ],
  transactions: [
    {
      question: 'I already use Skyslope / Dotloop. Why do I need this?',
      answer: 'Those handle documents. This handles the 30+ tasks and deadlines AROUND the documents — reminders, notifications to all parties, and status tracking. They store files; we coordinate the process.',
      stat: '30+ tasks per deal automated',
    },
    {
      question: 'What happens if a deadline changes?',
      answer: 'Update it once and the entire downstream timeline adjusts. All parties — lender, title, inspector — get notified automatically. No phone tree required.',
    },
    {
      question: 'Can my lender and title company see the timeline?',
      answer: 'Yes. We can set up portal access or automated email updates so everyone knows where the deal stands — without calling you.',
    },
  ],
  clientComms: [
    {
      question: 'I already send a holiday card. Is that enough?',
      answer: "41% of top agent business comes from referrals. A holiday card is once a year. Agents who stay in touch monthly with market updates and check-ins capture 6x more repeat business.",
      stat: '6x more repeat business',
    },
    {
      question: 'How does it know what to send each client?',
      answer: "Segmented by lifecycle: a new homeowner gets different content than someone who closed 2 years ago. Market updates use their actual neighborhood data — not generic city-wide stats.",
    },
    {
      question: "Won't this feel spammy?",
      answer: "Every message is personalized with their name, neighborhood, and home details. It reads like you sat down and wrote it. Open rates run 40%+ because it's actually relevant.",
      stat: '40%+ open rates',
    },
  ],
  reviews: [
    {
      question: 'I feel awkward asking for reviews.',
      answer: "The system asks for you at the perfect moment — 2-4 weeks after closing, when gratitude is highest. It's a warm text from your number, not a corporate email.",
    },
    {
      question: 'What if someone leaves a bad review?',
      answer: "You get alerted instantly so you can respond personally. Most negative reviews come from silence — this system prevents that by keeping you connected throughout the process.",
    },
    {
      question: 'How do referrals actually get generated?',
      answer: "After a positive review, the system sends a gentle 'Know anyone looking to buy or sell?' message. It's timed to the moment they've just said something nice about you.",
      stat: '3-5x higher conversion vs cold asks',
    },
  ],
};
