export const TOTAL_INDEX_SLIDES = 5;

export const problemStats = [
  {
    icon: 'solar:clock-circle-linear',
    value: '78%',
    title: 'of homebuyers work with the first agent who responds',
    subtitle: 'Source: NAR 2025 Profile of Home Buyers and Sellers',
  },
  {
    icon: 'solar:file-text-linear',
    value: '10+',
    title: 'hours per week lost to admin tasks',
    subtitle: 'Hours you could give to the clients who trust you',
  },
  {
    icon: 'solar:users-group-rounded-linear',
    value: '80%',
    title: 'of sales need 5+ follow-ups but',
    highlight: '44%',
    highlightText: 'of agents quit after one',
    subtitle: 'Source: Marketing Donut / Scripted Research',
  },
];

export const solutionBenefits = [
  {
    icon: 'solar:bolt-circle-linear',
    title: 'Instant Lead Response',
    description: 'Be the first voice they hear. While you are at dinner, they already feel taken care of.',
    highlight: '21x more likely to qualify leads.',
  },
  {
    icon: 'solar:chat-round-dots-linear',
    title: 'Smart Follow-Up Systems',
    description: 'Stay connected without carrying it all in your head.',
    highlight: 'Be there when they are ready.',
  },
  {
    icon: 'solar:clipboard-check-linear',
    title: 'Transaction Coordination',
    description: 'Every deadline tracked, every document routed. You focus on the people, not the paperwork.',
    highlight: 'Nothing slips through the cracks.',
  },
];

export const automationsList = [
  { name: 'Instant Lead Response', icon: 'solar:bolt-circle-linear', benefit: 'You stay present, they feel cared for.', slideIndex: 1 },
  { name: 'Lead Qualification & Scoring', icon: 'solar:chart-2-linear', benefit: 'Give attention to those who need you now.', slideIndex: 2 },
  { name: 'Smart Follow-Up Sequences', icon: 'solar:chat-round-dots-linear', benefit: "When they're ready, you're the one they call.", slideIndex: 3 },
  { name: 'Appointment Scheduling & Reminders', icon: 'solar:calendar-linear', benefit: 'You get your evenings back.', slideIndex: 4 },
  { name: 'Transaction Coordination', icon: 'solar:clipboard-check-linear', benefit: 'Nothing slips through the cracks.', slideIndex: 5 },
  { name: 'Client Communication & Content', icon: 'solar:letter-linear', benefit: 'Your name comes up when they ask.', slideIndex: 6 },
  { name: 'Review & Referral Generation', icon: 'solar:star-linear', benefit: 'Great relationships speak for themselves.', slideIndex: 7 },
];

// Hero slide stat
export const heroStat = {
  value: '78%',
  text: 'of buyers choose whoever responds first',
  source: 'NAR 2025',
};

// Guarantee copy
export const guarantee = {
  text: "If you don't save 10+ hours in your first 90 days, we'll make it right.",
  badge: '10+ hours saved in 90 days or we make it right',
};

// Trust stats for CTA slide
export const trustStats = [
  { value: '21x', label: 'more qualified leads' },
  { value: '15-20', label: 'hrs saved weekly' },
  { value: '41%', label: 'referral business' },
];

// Verified industry statistics with sources and expandable research content
export const industryStats = [
  {
    icon: 'solar:clock-circle-linear',
    iconColor: 'text-teal-400',
    value: '21x',
    label: 'More Likely to Qualify',
    description: 'MIT Lead Response Study',
    source: 'MIT Lead Response Study',
    sourceUrl: 'https://www.leadresponsemanagement.org/lrm_study',
    researchTitle: 'Speed-to-Lead',
    keyInsight: 'Respond within 5 minutes and you are 21x more likely to qualify that lead vs. waiting 30 minutes.',
    context: 'When someone inquires about a property, they are at peak interest — browsing listings and reaching out to multiple agents. The first to respond meaningfully wins.',
    aasaniAngle: 'Our instant response automation acknowledges every inquiry in seconds, even at 9pm on a Saturday.',
  },
  {
    icon: 'solar:hourglass-linear',
    iconColor: 'text-teal-400',
    value: '15-20',
    label: 'Hours Saved Weekly',
    description: 'NAR Technology Survey',
    source: 'NAR Technology Survey 2025',
    sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/real-estate-in-a-digital-age',
    researchTitle: 'The Admin Burden',
    keyInsight: 'Top-producing agents spend 15-20 hours weekly on admin: CRM updates, follow-ups, scheduling, and transaction coordination.',
    context: 'At $100-200/hour, that is $78,000-156,000 in opportunity cost annually — time not spent with clients or building relationships.',
    aasaniAngle: 'We automate the repetitive tasks so you can focus on the work that actually requires you.',
  },
  {
    icon: 'solar:users-group-rounded-linear',
    iconColor: 'text-teal-400',
    value: '41%',
    label: 'From Referrals & Repeat',
    description: 'NAR Member Profile',
    source: 'NAR Member Profile 2025',
    sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/member-profile',
    researchTitle: 'The Referral Economy',
    keyInsight: '41% of top agent business comes from repeat clients and referrals — warm introductions from people who already trust you.',
    context: 'Referral leads convert at 3-5x the rate of cold leads and close faster with less negotiation.',
    aasaniAngle: 'Our post-closing nurture keeps you top-of-mind with anniversary check-ins and thoughtful touchpoints.',
  },
];

export const roiCalculatorContent = {
  label: 'ROI CALCULATOR',
  title: 'What Could You Save?',
  subtitle: 'See Your Potential ROI',
  inputs: {
    hours: { label: 'Hours on admin per week', min: 5, max: 30, default: 15, step: 1 },
    rate: { label: 'Value of your time ($/hr)', min: 50, max: 300, default: 100, step: 10 },
  },
  savingsRate: 0.7, // 70% time savings from automation
  resultLabels: {
    hoursSaved: 'Hours saved per week',
    annualValue: 'Annual value recovered',
  },
  ctaText: "Let's Make It Happen",
  ctaDescription: "That's time back with clients, not paperwork.",
};

export const processSteps = [
  {
    number: '01',
    title: 'Free Strategy Call',
    duration: '60 min',
    description: 'We learn how you work and where the time goes.',
  },
  {
    number: '02',
    title: 'Your Automation Plan',
    duration: 'Included',
    description: 'A clear picture of what to automate first and why it matters.',
  },
  {
    number: '03',
    title: 'Done-For-You Setup',
    duration: '90 days',
    description: 'We build it, you use it. No tech headaches.',
  },
];

export const philosophyQuotes = [
  'We handle the busywork so you can be present for the moments that matter.',
  'Your clients chose you. Our systems help you show up for them.',
  'Structure first. Intelligence second. Presence always.',
];

export const faqContent = {
  label: 'FAQ',
  title: 'Questions?',
  subtitle: 'Everything you need to know before getting started.',
  items: [
    {
      question: 'How long until I see results?',
      answer: 'Most clients see their first automation live within 2 weeks. Full system implementation takes about 90 days, but you will start saving time from day one.',
    },
    {
      question: 'Do I need to be technical?',
      answer: 'Not at all. We handle everything - the setup, the integrations, the testing. You just tell us how you like to work.',
    },
    {
      question: 'What if I already use a CRM?',
      answer: 'Great - we work with what you have. Whether it is Follow Up Boss, KVCore, or Salesforce, we integrate with your existing tools.',
    },
    {
      question: 'What is the investment?',
      answer: 'Every business is different, so we custom-quote after understanding your needs. The strategy call is free with no commitment.',
    },
  ],
};

export const leadMagnetContent = {
  label: 'FREE DOWNLOAD',
  title: 'Get the Checklist',
  subtitle: 'The 7 Core Automations',
  description: 'Everything you need to reclaim 20+ hours per week. Delivered instantly.',
  buttonText: 'Get the Checklist',
  namePlaceholder: 'Your name',
  emailPlaceholder: 'Your email',
  webhookUrl: 'https://axistential.app.n8n.cloud/webhook/fc24c600-6b00-4234-9486-9f33eac2f489',
  checklistUrl: 'https://docs.google.com/document/d/1b3NM1lZl_4ikiDhRq3NvALP3m32tb5UOUqkA7x8pCyE/edit?usp=sharing',
  successMessage: 'Your checklist is ready.',
};

export const contactInfo = {
  email: 'ayub@aasani.ai',
  phone: '+1 (732) 397-7299',
  website: 'aasani.ai',
  calLink: 'https://cal.com/ayub-yousaf-c1ijnf/bookatime',
};

export const backgroundImages = {
  hero: '/hero-bg.png',
  problem: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2596b357-ea11-4df7-819d-6d24ab446fec_1600w.webp',
  solution: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cc0d42d0-ed20-4040-89d3-5a6177162b6d_1600w.webp',
  automations: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa2cf7be-2794-4596-80ce-cf0669fd8ec5_1600w.webp',
  caseStudies: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7b8e6a1f-44f9-49ef-a26c-bf0d87724acf_1600w.webp',
  howItWorks: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ea017f83-49bf-41a3-bcaa-b91cf47b4ffe_1600w.webp',
  philosophy: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/67df17f7-9681-4bd3-927b-ac569042a884_1600w.webp',
  cta: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/47ccf769-0cb4-4a95-804e-cc919fd6d449_1600w.webp',
};
