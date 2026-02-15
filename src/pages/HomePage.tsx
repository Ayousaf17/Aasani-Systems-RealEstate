import { useState, useEffect, useRef } from 'react';
import { getCalApi } from '@calcom/embed-react';

// ============================================
// DATA
// ============================================

const testimonials = [
  {
    name: 'Sai Volk',
    quote: 'They turned a complicated setup into something simple and reliable. Our daily work flows much smoother.',
    role: 'Founder, Northwood Studio',
  },
  {
    name: 'Victor Hale',
    quote: "The automations Aasani built save us hours every week. It's made a big difference in how we work.",
    role: 'Production Manager, Ember Media Co.',
  },
  {
    name: 'Rik Moreno',
    quote: 'Our team finally feels aligned. The systems Aasani put in place gave us structure and calm.',
    role: 'COO, Summitline Services',
  },
  {
    name: 'Caleb Morgan',
    quote: 'They connected our tools in a way that feels effortless. Everything just works together now.',
    role: 'Head of Customer Ops · Brightpath Solutions',
  },
  {
    name: 'Mayor Chen',
    quote: 'Aasani helped us clean up years of messy workflows. Everything feels clearer and easier for the team now.',
    role: 'Ops Lead, Horizon Retail Group',
  },
  {
    name: 'Daniel Reyes',
    quote: 'They mapped our systems in a way we had never seen before. The clarity alone was worth it.',
    role: 'Managing Director, Luma Collective',
  },
];

const services = [
  {
    title: 'CRM & Sales Automation',
    description:
      'Leads come from everywhere but live nowhere useful. We capture every lead, track every interaction, and ensure nothing gets lost.',
    image: 'https://framerusercontent.com/images/H7DHCeYpFc8F5vMHyxxus6iPQ.png?width=1024&height=1024',
  },
  {
    title: 'Customer Support Automation',
    description:
      'Repetitive questions drown your team while complex issues wait. We automate common responses and route intelligently to humans.',
    image: 'https://framerusercontent.com/images/pc3mEG5ivm1O39GTNAWdmYwOPM.png?width=1024&height=1024',
  },
  {
    title: 'HR & Operations Automation',
    description:
      'Onboarding takes weeks, approvals get stuck, manual processes slow growth. We document workflows and automate the repetitive parts.',
    image: 'https://framerusercontent.com/images/Pd1JIpTwXNvCttZDdKDKHMuBe8.png?width=1024&height=1024',
  },
  {
    title: 'Data & Reporting Systems',
    description:
      'Data exists everywhere but answering simple questions takes hours. We build dashboards that update in real-time and surface what matters.',
    image: 'https://framerusercontent.com/images/6IkJJAC6Nja3Zml49e8B7EBhsIM.png?width=1024&height=1024',
  },
  {
    title: 'Financial & Accounting Automation',
    description:
      'Invoices get delayed, expenses pile up, cash flow needs spreadsheet archaeology. We automate paper-pushing for real-time visibility.',
    image: 'https://framerusercontent.com/images/TOwcXrUmSWDKHhzKSfyLcQp8oiw.png?width=1024&height=1024',
  },
  {
    title: 'Marketing & Content Systems',
    description:
      'Marketing runs on manual effort and forgotten tasks. We schedule content, nurture leads, and maintain presence without daily intervention.',
    image: 'https://framerusercontent.com/images/6c1ItKjxLUndXJx0xQieDJuadA.png?width=1024&height=1024',
  },
];

const comparison = {
  others: [
    'Just connect tools & hope',
    'You manage the system yourself',
    'Vendor lock-in',
    'Ongoing support costs',
    'Breaks when you need changes',
    'Heavy technical jargon',
    "You're on the hook when it fails",
    'Automation = set it & forget it',
    'No documentation, you own the headache',
    'No one backing your system',
  ],
  aasani: [
    { text: 'We build it right the first time', icon: '🔍' },
    { text: 'Your tools, our expertise', icon: '🔌' },
    { text: 'You own everything', icon: '🏠' },
    { text: 'Fixed-scope, no surprises', icon: '💰' },
    { text: 'We manage it if it needs tweaking', icon: '🛠️' },
    { text: 'Plain English, not tech speak', icon: '🏷️' },
    { text: 'We stay involved, not absent', icon: '⚡' },
    { text: 'Automation with human oversight', icon: '🤝' },
    { text: 'Full documentation & training', icon: '📚' },
    { text: 'You get your time back', icon: '💛' },
  ],
};

const faqs = [
  {
    question: 'What size business do you work with?',
    answer: 'Large enough to have real complexity. Small enough for us to have meaningful impact. We serve all.',
  },
  {
    question: 'How long until results?',
    answer: 'Within the first month. We prioritize early wins.',
  },
  {
    question: 'What if it does not work?',
    answer: 'Cancel anytime. No contracts.',
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes. Most work is remote. Austin is where we are based but we support teams all across the world.',
  },
  {
    question: 'What tools do you use?',
    answer: 'Whatever you already have. We are not here to sell software.',
  },
  {
    question: 'Can you help hire an operations person?',
    answer: 'Yes. We can define the role, write the description, and train them.',
  },
];

const stats = [
  { value: 50, suffix: '%', label: 'Response TIme Cut' },
  { value: 92, suffix: '%', label: 'Auto-Handled' },
  { value: 354950, prefix: '', suffix: '$', label: 'Revenue Clarity' },
  { value: 52, suffix: '%', label: 'Cost Reduced' },
];

const processSteps = [
  {
    number: 1,
    title: 'We Map Your Tools',
    description:
      "We see how your tools actually work right now — and identify what's NOT talking to each other. No assumptions. We understand your real workflow before we change anything.",
    image: 'https://framerusercontent.com/images/9vm9krN4tsbMXG4806k8VN5NeE.png?width=1024&height=1024',
  },
  {
    number: 2,
    title: 'We Wire Them Together',
    description:
      "We build the automated connections between your existing tools so they work as one system. No new software to learn. No extra tools to buy. Your tools become smarter because they finally talk to each other.",
    image: 'https://framerusercontent.com/images/9vm9krN4tsbMXG4806k8VN5NeE.png?width=1024&height=1024',
  },
  {
    number: 3,
    title: 'We Manage & Optimize',
    description:
      "We run it for 30 days, catch the edge cases, fix what's broken. If something needs tweaking later — you call us, not a tech support line. You get your system AND our expertise backing it.",
    image: 'https://framerusercontent.com/images/9vm9krN4tsbMXG4806k8VN5NeE.png?width=1024&height=1024',
  },
];

const workProcessSteps = ['Discovery Call', 'Proposal & Timeline', 'Implementation', '30-Day Support & Handoff'];

const caseStudies = [
  {
    id: 'ironside',
    client: 'Ironside Computers',
    title: 'AI Customer Support Integration',
    duration: '6 Weeks',
    year: '2025',
    industry: 'E-Commerce',
    image: 'https://framerusercontent.com/images/tXS9JqItTbQtR7LDTL3HplGjo.webp?scale-down-to=2048&width=2560&height=2560',
    logo: 'https://framerusercontent.com/images/w2Ej5ayfS5rT5IpFvdnvwmcYI.png?scale-down-to=512&width=600&height=242',
    tags: ['AI Assistant', 'Workflow Automation', 'Gorgias Integration', 'Analytics Dashboard'],
    description:
      'Support tickets were coming in faster than reps could answer them. Response times were slow. Finding the right information to answer customer questions took time.',
    challenge: [
      'Response times were slow',
      "Reps couldn't quickly access the information they needed",
      'Managers had no visibility into what was slowing the team down',
    ],
    approach: `We kept it simple:
Train the AI assistant on the company's policies and information.
1. Connect it to Gorgias so it can see live ticket context.
2. Have it draft replies that reps can review and send.
3. Show managers clear summaries so they can understand where delays happen.`,
    whatWeDid: {
      'AI Assistant': [
        'Built a custom AI model trained on company information',
        'Added tone rules to keep responses consistent',
        'Enabled one-click draft replies for representatives',
      ],
      'Workflow Automation': [
        'Created automation workflows connecting Slack, LLM, and Gorgias',
        'Automated ticket processing and intelligent routing',
        'Seamless integration between support tools',
      ],
      'Gorgias Integration': [
        'Real-time access to ticket data and customer history',
        'Automatic ticket summarization',
        'Auto-tagging by issue category',
        'Suggested responses based on ticket content',
      ],
      'Analytics Dashboard': [
        'Monitoring AI agent execution per ticket',
        'Tracking operational costs',
        'Performance metrics and usage analytics',
      ],
    },
    results: [
      '30-50% faster replies',
      'Consistent tone across support team',
      'Easier onboarding for new reps',
      'Better customer satisfaction',
    ],
    testimonial: {
      quote:
        'Ayub helped us implement AI into our ticketing system and did solid work. He took the time to understand how we actually use the system and built something that reduced manual handling and improved response flow.',
      author: 'Rob Apice',
      role: 'CEO of Ironside Computers',
    },
  },
  {
    id: 'surface',
    client: 'Surface Solutions',
    title: 'Pricing Calculator Enhancement',
    duration: '2 Months',
    year: '2025',
    industry: 'Commercial Services',
    image: 'https://framerusercontent.com/images/sz2Nt5zXhGybmLuCShwUwKjATY.webp?width=768&height=1020',
    tags: ['Pricing Architecture', 'Cost-Plus Modeling', 'Margin Intelligence', 'Team Training'],
    description:
      "Surface Solutions manages 4,000+ jobs annually across multiple service types, but pricing was entirely manual and judgment-based. Every quote required Sam's direct involvement.",
    challenge: [
      'Every quote was a custom negotiation with Sam, creating a bottleneck',
      'No margin visibility until months after job completion',
      'Team had zero guidance for estimating jobs independently',
    ],
    approach: `We built a structured cost-plus system with intelligent guardrails—preserving flexibility while adding systematic consistency.

1. Service Baselines — Define labor rates and material costs by service type
2. Dynamic Cost Calculation — Real-time quote form with automatic calculations
3. Smart Markup Advisor — Recommendations based on historical data`,
    whatWeDid: {
      'Service Baselines': [
        'Service Type: Window Cleaning, Pressure Washing, Caulking',
        'Complexity Tiers: Tier 1 (simple), Tier 2 (moderate), Tier 3 (complex)',
        'Base Labor Rates pre-calculated by service type',
      ],
      'Dynamic Calculation': [
        'Service Type dropdown auto-populates base labor rate',
        'Materials section auto-calculates with waste factor',
        'Real-time Cost Base calculation',
      ],
      'Margin Guardrails': [
        'Yellow Alert: Margin falls below 25%',
        'Red Alert: Margin falls below 20%',
        'Override Tracking for learning',
      ],
    },
    results: [
      '-89% Quote Preparation Time',
      '+87% Pricing Consistency',
      '+100% Margin Protection',
      '+85% Team Autonomy',
    ],
    testimonial: {
      quote:
        "This system gave us the structure we needed without losing the flexibility. We're now moving faster on quotes and protecting our margins better.",
      author: 'Terrance',
      role: 'Founder of Surface Solutions',
    },
  },
];

// ============================================
// HOOKS
// ============================================

function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

// ============================================
// COMPONENTS
// ============================================

function ScallopedDivider({ variant }: { variant: 'dark-to-light' | 'light-to-dark' | 'cream-to-dark' | 'dark-to-cream' }) {
  // Determine colors based on variant
  const config = {
    'dark-to-light': { bg: 'bg-aasani-white', scallops: '#111212', position: '50% 0%' },
    'light-to-dark': { bg: 'bg-aasani-black', scallops: '#fffef5', position: '50% 100%' },
    'cream-to-dark': { bg: 'bg-aasani-black', scallops: '#f7f4e9', position: '50% 100%' },
    'dark-to-cream': { bg: 'bg-aasani-cream', scallops: '#111212', position: '50% 0%' },
  }[variant];

  return (
    <div className={`w-full h-[30px] relative ${config.bg}`}>
      <div
        className="absolute top-0 left-0 right-0 h-[30px]"
        style={{
          backgroundImage: `radial-gradient(ellipse 20px 30px at ${config.position}, ${config.scallops} 70%, transparent 70%)`,
          backgroundSize: '40px 30px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </div>
  );
}

function PointedScallopedDivider({ variant }: { variant: 'light-to-dark' | 'cream-to-dark' }) {
  const bgColor = 'bg-aasani-black';
  const pointColor = variant === 'cream-to-dark' ? '#f7f4e9' : '#fffef5';

  return (
    <div className={`w-full h-[40px] relative ${bgColor}`}>
      <div
        className="absolute top-0 left-0 right-0 h-[40px]"
        style={{
          backgroundImage: `linear-gradient(135deg, ${pointColor} 25%, transparent 25%), linear-gradient(225deg, ${pointColor} 25%, transparent 25%)`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </div>
  );
}

function Starburst({ text, variant = 'yellow' }: { text: string; variant?: 'yellow' | 'black' }) {
  const bgColor = variant === 'yellow' ? 'bg-aasani-yellow' : 'bg-aasani-black';
  const textColor = variant === 'yellow' ? 'text-aasani-black' : 'text-aasani-white';

  // 16-point star clip path
  const starPath = `polygon(
    50% 0%, 59% 15%, 75% 5%, 72% 22%,
    95% 25%, 80% 38%, 100% 50%, 80% 62%,
    95% 75%, 72% 78%, 75% 95%, 59% 85%,
    50% 100%, 41% 85%, 25% 95%, 28% 78%,
    5% 75%, 20% 62%, 0% 50%, 20% 38%,
    5% 25%, 28% 22%, 25% 5%, 41% 15%
  )`;

  return (
    <div className="relative inline-flex items-center justify-center w-[90px] h-[90px] flex-shrink-0">
      <div
        className={`absolute inset-0 ${bgColor}`}
        style={{ clipPath: starPath }}
      />
      <span className={`relative z-10 font-body text-[13px] font-medium italic ${textColor} text-center leading-tight`}>{text}</span>
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-3">
      <button
        className={`w-full flex items-center justify-between px-6 py-5 rounded-[40px] text-left transition-all duration-200 ${
          isOpen ? 'bg-aasani-yellow text-aasani-black' : 'bg-aasani-white text-aasani-black hover:bg-aasani-cream'
        }`}
        onClick={onToggle}
      >
        <span className="font-heading text-[20px] font-semibold tracking-[-0.04em] pr-4">{question}</span>
        <span
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            isOpen ? 'bg-aasani-black' : 'bg-aasani-yellow'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke={isOpen ? '#ffe24f' : '#111212'}
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-aasani-yellow px-6 py-5 rounded-[40px]">
          <p className="text-aasani-black text-[17px] leading-[1.4]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://axistential.app.n8n.cloud/webhook/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <h3 className="font-heading text-3xl font-semibold mb-4">Thank you!</h3>
        <p className="text-aasani-gray">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {['name', 'email', 'phone', 'message'].map((field) => (
        <div key={field}>
          <label className="block font-heading text-xl font-semibold mb-2 capitalize">{field}</label>
          {field === 'message' ? (
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-0 py-3 border-b-2 border-aasani-black bg-transparent focus:outline-none font-heading text-lg resize-none"
            />
          ) : (
            <input
              type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
              required={field !== 'phone' && field !== 'message'}
              value={formData[field as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="w-full px-0 py-3 border-b-2 border-aasani-black bg-transparent focus:outline-none font-heading text-lg"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-aasani-black text-aasani-white py-4 rounded-full font-heading text-xl font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function CaseStudyModal({ caseStudy, onClose }: { caseStudy: (typeof caseStudies)[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[2000] flex items-start justify-center p-5 pt-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-aasani-white rounded-[40px] max-w-[900px] w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-12 h-12 bg-aasani-yellow rounded-full flex items-center justify-center z-10 hover:bg-aasani-yellow-hover transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#111212" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl tracking-tight mb-5">{caseStudy.client}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {caseStudy.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-aasani-cream rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-10 rounded-[25px] bg-aasani-cream aspect-video flex items-center justify-center mb-8">
          <span className="font-heading text-4xl text-aasani-gray/50">{caseStudy.client}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-10 pb-8 border-b border-aasani-cream">
          {[
            { label: 'Client', value: caseStudy.client },
            { label: 'Duration', value: caseStudy.duration },
            { label: 'Year', value: caseStudy.year },
            { label: 'Industry', value: caseStudy.industry },
          ].map((item) => (
            <div key={item.label} className="border-b border-aasani-cream pb-4">
              <p className="text-xs uppercase tracking-widest text-aasani-gray mb-1">{item.label}</p>
              <p className="font-heading text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="p-10 space-y-10">
          <p className="text-lg leading-relaxed">{caseStudy.description}</p>

          <div>
            <h3 className="font-heading text-2xl mb-4">💥 The Challenge:</h3>
            <ul className="space-y-3">
              {caseStudy.challenge.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-aasani-black rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-2xl mb-4">💡 Our Approach:</h3>
            <p className="whitespace-pre-line">{caseStudy.approach}</p>
          </div>

          <div>
            <h3 className="font-heading text-2xl mb-6">🎨 What We Did:</h3>
            {Object.entries(caseStudy.whatWeDid).map(([title, items]: [string, string[]]) => (
              <div key={title} className="mb-6">
                <h4 className="font-heading text-lg font-semibold mb-3">{title}</h4>
                <ul className="space-y-2 ml-4">
                  {items.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-aasani-gray rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-heading text-2xl mb-4">📊 Results:</h3>
            <ul className="space-y-2">
              {caseStudy.results.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-aasani-black rounded-full mt-2 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-aasani-cream p-8 rounded-[25px]">
            <h3 className="font-heading text-2xl mb-4">🏆 Client Testimonial:</h3>
            <blockquote className="italic text-lg mb-4">"{caseStudy.testimonial.quote}"</blockquote>
            <cite className="font-semibold not-italic">
              — {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState<(typeof caseStudies)[0] | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'bookatime' });
      cal('ui', {
        cssVarsPerTheme: { light: { 'cal-brand': '#111212' }, dark: { 'cal-brand': '#111212' } },
        hideEventTypeDetails: false,
        layout: 'week_view',
      });
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-aasani-white text-aasani-black min-h-screen font-body overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-aasani-black px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <a href="#hero" className="text-aasani-white">
            <svg viewBox="0 0 40 40" fill="currentColor" className="w-10 h-10">
              <path d="M20 2L38 38H30L26 30H14L10 38H2L20 2ZM20 14L15 26H25L20 14Z" />
            </svg>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-6 py-2.5 bg-aasani-white text-aasani-black rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-aasani-cream transition-colors"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-aasani-black z-[999] pt-24 px-6 flex flex-col gap-6">
          {['Home', 'Services', 'Portfolio', 'Process', 'Reviews', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-4xl text-aasani-white hover:text-aasani-yellow transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-aasani-black text-aasani-white pt-[120px] pb-16 px-5 flex flex-col items-center relative overflow-hidden">
        {/* Concentric circles background */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-[1200px] aspect-square z-0"
          style={{
            background: `repeating-radial-gradient(circle at 50% 100%, #111212 0px, #111212 40px, rgba(46,45,43,0.5) 40px, rgba(46,45,43,0.5) 80px)`,
          }}
        />

        <div className="text-center max-w-[900px] mx-auto relative z-10">
          <h1 className="font-heading text-[clamp(80px,20vw,240px)] font-normal text-aasani-yellow leading-none tracking-[-0.086em] mb-2.5">
            AASANI
          </h1>
          <h2 className="font-heading text-[clamp(24px,5vw,48px)] italic text-aasani-white/90 mb-6">
            Your Tools. Automated. Managed.
          </h2>
          <p className="text-[clamp(16px,2vw,20px)] text-white/80 max-w-[600px] mx-auto mb-10 leading-relaxed">
            You already have the tools. Most agents do. We wire them together so they work automatically — and we manage
            the system for you when something needs tweaking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#process"
              className="inline-flex items-center justify-center px-7 py-3 border-2 border-aasani-yellow text-aasani-yellow rounded-[18px] font-heading text-[22px] font-semibold tracking-[-0.04em] hover:bg-aasani-yellow hover:text-aasani-black transition-all duration-200 hover:-translate-y-0.5"
            >
              See How It Works ↓
            </a>
            <button
              data-cal-namespace="bookatime"
              data-cal-link="ayub-yousaf-c1ijnf/bookatime"
              data-cal-config='{"layout":"week_view"}'
              className="inline-flex items-center justify-center px-7 py-3 bg-aasani-yellow text-aasani-gray rounded-[18px] font-heading text-[22px] font-semibold tracking-[-0.04em] hover:bg-aasani-yellow-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Tell Us Your Challenge
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="mt-16 relative z-10">
          <div className="w-[280px] h-[280px] bg-aasani-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform relative overflow-hidden">
            {/* Workflow illustration inside */}
            <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
              {/* Grid icon */}
              <rect x="85" y="20" width="30" height="25" rx="3" fill="none" stroke="#111212" strokeWidth="2"/>
              <line x1="95" y1="20" x2="95" y2="45" stroke="#111212" strokeWidth="2"/>
              <line x1="105" y1="20" x2="105" y2="45" stroke="#111212" strokeWidth="2"/>
              <line x1="85" y1="30" x2="115" y2="30" stroke="#111212" strokeWidth="2"/>
              <line x1="85" y1="37" x2="115" y2="37" stroke="#111212" strokeWidth="2"/>
              {/* Calendar icon */}
              <rect x="30" y="70" width="35" height="30" rx="3" fill="none" stroke="#111212" strokeWidth="2"/>
              <line x1="30" y1="80" x2="65" y2="80" stroke="#111212" strokeWidth="2"/>
              <circle cx="40" cy="88" r="3" fill="#111212"/>
              <circle cx="55" cy="88" r="3" fill="#111212"/>
              {/* Email icon */}
              <rect x="135" y="70" width="35" height="25" rx="3" fill="none" stroke="#111212" strokeWidth="2"/>
              <polyline points="135,73 152,85 170,73" fill="none" stroke="#111212" strokeWidth="2"/>
              {/* Checkmark icon */}
              <rect x="30" y="130" width="35" height="30" rx="3" fill="none" stroke="#111212" strokeWidth="2"/>
              <polyline points="40,145 47,152 60,138" fill="none" stroke="#111212" strokeWidth="2"/>
              {/* Document icon */}
              <rect x="135" y="130" width="35" height="35" rx="3" fill="none" stroke="#111212" strokeWidth="2"/>
              <line x1="142" y1="140" x2="162" y2="140" stroke="#111212" strokeWidth="2"/>
              <line x1="142" y1="148" x2="158" y2="148" stroke="#111212" strokeWidth="2"/>
              <line x1="142" y1="156" x2="155" y2="156" stroke="#111212" strokeWidth="2"/>
              {/* Central hub */}
              <circle cx="100" cy="100" r="15" fill="none" stroke="#111212" strokeWidth="2"/>
              <circle cx="100" cy="100" r="5" fill="#111212"/>
              {/* Connection lines */}
              <line x1="100" y1="45" x2="100" y2="85" stroke="#111212" strokeWidth="1.5" strokeDasharray="4"/>
              <line x1="65" y1="85" x2="85" y2="100" stroke="#111212" strokeWidth="1.5" strokeDasharray="4"/>
              <line x1="135" y1="85" x2="115" y2="100" stroke="#111212" strokeWidth="1.5" strokeDasharray="4"/>
              <line x1="65" y1="145" x2="85" y2="115" stroke="#111212" strokeWidth="1.5" strokeDasharray="4"/>
              <line x1="135" y1="145" x2="115" y2="115" stroke="#111212" strokeWidth="1.5" strokeDasharray="4"/>
            </svg>
            {/* Play button overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-aasani-black border-2 border-aasani-yellow rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-aasani-yellow ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <p className="text-center mt-4 text-white/60">Play Showreel</p>
        </div>
      </section>

      <ScallopedDivider variant="dark-to-light" />

      {/* Problem Section */}
      <section className="py-20 px-5 bg-aasani-white text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-[200px] h-[200px] mx-auto mb-10 bg-aasani-yellow rounded-full flex items-center justify-center p-8">
            <span className="text-7xl">🔌</span>
          </div>
          <p className="font-heading text-[clamp(20px,4vw,28px)] leading-relaxed mb-8">
            You know about all these tools.
            <br />
            CRM. Email. Calendar. Transactions.
            <br />
            But they don't talk to each other.
            <br />
            So you're stuck doing the wiring manually.
          </p>
          <p className="font-heading text-[clamp(28px,5vw,40px)] font-semibold">
            That's not a tool problem.
            <br />
            That's an{' '}
            <span className="text-aasani-yellow italic" style={{ background: 'linear-gradient(to bottom, transparent 60%, #ffe24f 60%)', padding: '0 4px' }}>
              integration problem
            </span>
            .
          </p>
        </div>
      </section>

      <ScallopedDivider variant="light-to-dark" />

      {/* Stats Section */}
      <section className="py-20 px-5 bg-aasani-black text-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <Starburst text="Numbers" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">Results that matter</h2>
          </div>
          <div className="bg-[rgba(30,30,30,0.8)] rounded-[40px] p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const { count, ref } = useCountUp(stat.value);
                return (
                  <div key={index} ref={ref} className="text-center">
                    <div className="font-heading text-[clamp(48px,8vw,72px)] text-aasani-yellow tracking-tight">
                      {stat.prefix && <span>{stat.prefix}</span>}
                      {count.toLocaleString()}
                      {stat.suffix && <span className="text-[0.6em] ml-1">{stat.suffix}</span>}
                    </div>
                    <div className="text-white/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-5 bg-aasani-black text-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <Starburst text="Proof" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">What We Build</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-aasani-cream rounded-[40px] p-10 text-aasani-black relative overflow-hidden"
              >
                {/* Yellow glow from bottom - spotlight effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255, 226, 79, 0.6) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="relative w-[140px] h-[140px] mx-auto mb-6">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(255, 226, 79, 0.8) 0%, transparent 70%)',
                      }}
                    />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-heading text-[22px] font-semibold mb-4 tracking-[-0.04em]">{service.title}</h3>
                  <p className="text-aasani-gray text-[17px] leading-[1.4]">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScallopedDivider variant="dark-to-light" />

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-5 bg-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <Starburst text="Portfolio" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">What this looks like</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, index) => (
              <div
                key={index}
                onClick={() => setActiveCaseStudy(cs)}
                className="rounded-[25px] overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform"
              >
                <div className="aspect-[16/10] bg-aasani-black relative overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.client}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-5 left-5 bg-aasani-white px-4 py-2 rounded-[10px]">
                    <span className="font-heading text-xs font-bold uppercase tracking-wide">{cs.client.split(' ')[0]}</span>
                    <span className="font-heading text-xs uppercase tracking-wide block">{cs.client.split(' ').slice(1).join(' ')}</span>
                  </div>
                </div>
                <div className="py-6">
                  <h3 className="font-heading text-[28px] tracking-tight mb-4">{cs.client}</h3>
                  <button className="font-heading text-lg font-semibold hover:text-aasani-yellow transition-colors">
                    View Case Study →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeCaseStudy && <CaseStudyModal caseStudy={activeCaseStudy} onClose={() => setActiveCaseStudy(null)} />}

      <ScallopedDivider variant="light-to-dark" />

      {/* Process Section */}
      <section id="process" className="py-20 px-5 bg-aasani-black text-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <Starburst text="Process" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">How it works</h2>
          </div>
          <div className="flex gap-3 mb-8">
            {processSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-[60px] h-[60px] rounded-[18px] flex items-center justify-center font-heading text-[28px] font-semibold transition-all duration-200 ${
                  activeStep === index
                    ? 'bg-aasani-yellow text-aasani-black'
                    : 'bg-aasani-white text-aasani-black hover:bg-aasani-cream hover:-translate-y-0.5'
                }`}
              >
                {step.number}
              </button>
            ))}
          </div>
          <div className="bg-aasani-white text-aasani-black rounded-[40px] p-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative z-10">
                <h3 className="font-heading text-[clamp(28px,4vw,36px)] tracking-tight mb-5">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-lg leading-relaxed text-aasani-gray">
                  {processSteps[activeStep].description}
                </p>
              </div>
              <div className="relative flex justify-center">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    background: '#ffe24f',
                    transform: 'scale(1.3)',
                  }}
                />
                <img
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].title}
                  className="relative z-10 w-[250px] h-[250px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScallopedDivider variant="dark-to-light" />

      {/* Comparison Section */}
      <section className="py-20 px-5 bg-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-5 mb-12">
            <Starburst text="Differences" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">Comparison</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10">
              <h3 className="font-heading text-[32px] tracking-tight mb-8 text-black/40">Others</h3>
              <ul className="space-y-4">
                {comparison.others.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-black/40 py-3 border-b border-black/10">
                    <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-xs">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-aasani-black text-aasani-white rounded-[40px] p-10">
              <h3 className="font-heading text-[32px] tracking-tight mb-8">Aasani</h3>
              <ul className="space-y-4">
                {comparison.aasani.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 py-3 border-b border-white/10">
                    <span className="w-7 h-7 rounded-full bg-aasani-yellow flex items-center justify-center text-sm">
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ScallopedDivider variant="cream-to-dark" />

      {/* Testimonials Section */}
      <section id="reviews" className="py-20 px-5 bg-aasani-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-5 mb-12">
            <Starburst text="Testimonials" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">Clients talk<br />& we blush</h2>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500"
                style={{ transform: `translateX(-${testimonialIndex * (100 / 3)}%)` }}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]">
                    <div className="bg-aasani-white rounded-[25px] p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-aasani-yellow rounded-full flex items-center justify-center">
                          <span className="font-heading text-lg font-semibold text-aasani-black">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-heading text-[17px] font-semibold">{testimonial.name} Says...</span>
                      </div>
                      <div className="relative mb-4">
                        {/* Triangle pointer */}
                        <div
                          className="absolute -top-2 left-6 w-0 h-0"
                          style={{
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderBottom: '10px solid #ffe24f',
                          }}
                        />
                        <div className="bg-aasani-yellow rounded-[20px] p-5">
                          <p className="text-[17px] leading-[1.4] italic">"{testimonial.quote}"</p>
                        </div>
                      </div>
                      <p className="text-aasani-gray text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-full bg-aasani-black text-aasani-white flex items-center justify-center hover:bg-aasani-gray transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full bg-aasani-black text-aasani-white flex items-center justify-center hover:bg-aasani-gray transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" fill="none" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    testimonialIndex === index ? 'bg-aasani-black' : 'bg-aasani-black/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScallopedDivider variant="cream-to-dark" />

      {/* How We Work Section */}
      <section className="py-20 px-5 bg-aasani-black text-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-5 mb-12">
            <Starburst text="Fixed Scope" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">How we work?</h2>
          </div>
          <div className="bg-aasani-cream rounded-[40px] p-10 text-aasani-black">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left - Steps */}
              <div>
                <ul className="space-y-4 mb-8">
                  {workProcessSteps.map((step, index) => (
                    <li key={index} className="flex items-center gap-3 py-3 border-b border-black/10">
                      <span className="text-sm">✦</span>
                      <span className="font-heading text-lg">{step}</span>
                    </li>
                  ))}
                </ul>
                <button
                  data-cal-namespace="bookatime"
                  data-cal-link="ayub-yousaf-c1ijnf/bookatime"
                  data-cal-config='{"layout":"week_view"}'
                  className="w-full py-4 bg-aasani-yellow text-aasani-black rounded-full font-heading text-xl font-semibold hover:bg-aasani-yellow-hover transition-colors"
                >
                  Lets talk
                </button>
              </div>
              {/* Right - Assessment */}
              <div className="bg-aasani-white rounded-[30px] p-8">
                <div className="relative inline-flex items-center justify-center w-[80px] h-[80px] mb-6">
                  <div
                    className="absolute inset-0 bg-aasani-black"
                    style={{
                      clipPath:
                        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                  />
                  <span className="relative z-10 font-body text-xs font-medium italic text-aasani-white">Assessment</span>
                </div>
                <div className="border-t border-dashed border-black/20 pt-6">
                  <p className="text-base leading-relaxed text-aasani-gray">
                    We map how your operation actually works. We identify structural gaps. You get a clear plan for what needs
                    to change, whether you build it with us or handle it yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScallopedDivider variant="dark-to-light" />

      {/* About Section */}
      <section id="about" className="py-20 px-5 bg-aasani-cream text-aasani-black">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-[clamp(36px,6vw,56px)] italic tracking-tight mb-10">Why we do this</h2>
            <div className="font-heading text-[clamp(18px,2.5vw,24px)] leading-relaxed space-y-6">
              <p>Aasani means ease. We chose that name deliberately.</p>
              <p>
                We kept seeing the same pattern: businesses growing fast but operations falling apart. Tools everywhere.
                Processes undocumented. Data scattered. Everyone working harder just to keep up.
              </p>
              <p>
                Most businesses don't need more technology. They need someone to step back, understand how the operation
                actually works, and organize it properly.
              </p>
              <p>
                That's what we do. We bring structure so your team can focus on what matters. So you can lead instead of
                manage every detail.
              </p>
              <p className="italic">
                There's a verse we keep in mind: 'Come to me, all you who are weary and burdened, and I will give you
                rest.' (Matthew 11:28-30)
              </p>
              <p className="font-semibold">That's what we're building toward.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-[300px] h-[400px] mb-8">
              {/* Yellow background with heart cutout */}
              <div
                className="absolute inset-0 bg-aasani-yellow rounded-[30px]"
                style={{
                  clipPath: 'path("M 0 30 Q 0 0 30 0 L 270 0 Q 300 0 300 30 L 300 370 Q 300 400 270 400 L 30 400 Q 0 400 0 370 Z")',
                }}
              />
              {/* Heart shape overlay */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[180px]"
                style={{
                  background: 'transparent',
                  clipPath: 'path("M 100 30 C 60 0, 0 30, 0 80 C 0 140, 100 180, 100 180 C 100 180, 200 140, 200 80 C 200 30, 140 0, 100 30")',
                }}
              />
              <img
                src="https://framerusercontent.com/images/SkpI4M2liaPUdTOH2H2eMWWRXo.jpeg?scale-down-to=1024&width=1290&height=1912"
                alt="Ayub Yousaf"
                className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
                style={{
                  clipPath: 'path("M 100 50 C 70 25, 20 50, 20 90 C 20 140, 100 175, 100 175 C 100 175, 180 140, 180 90 C 180 50, 130 25, 100 50")',
                  transform: 'translate(50px, 80px) scale(1)',
                }}
              />
              <img
                src="https://framerusercontent.com/images/SkpI4M2liaPUdTOH2H2eMWWRXo.jpeg?scale-down-to=1024&width=1290&height=1912"
                alt="Ayub Yousaf"
                className="absolute inset-0 w-full h-full object-cover object-top rounded-[30px]"
              />
              {/* Black starburst badge */}
              <div className="absolute top-4 left-4">
                <div className="relative inline-flex items-center justify-center w-[80px] h-[80px]">
                  <div
                    className="absolute inset-0 bg-aasani-black"
                    style={{
                      clipPath:
                        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                  />
                  <span className="relative z-10 font-body text-xs font-medium italic text-aasani-white">The team</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-[clamp(48px,8vw,72px)] leading-none">Ayub</h3>
              <h3 className="font-heading text-[clamp(48px,8vw,72px)] leading-none text-black/40">Yousaf</h3>
              <p className="text-sm uppercase tracking-widest text-black/60 mt-4">FOUNDER & OPERATIONS ARCHITECT</p>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-aasani-black mt-4 hover:opacity-70 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <PointedScallopedDivider variant="light-to-dark" />

      {/* FAQ Section */}
      <section className="py-20 px-5 bg-aasani-black text-aasani-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-5 mb-12">
            <Starburst text="FAQs" />
            <h2 className="font-heading text-[clamp(32px,6vw,62px)] italic tracking-tight">You ask, we answer.</h2>
          </div>
          <div className="max-w-[800px] mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section
        id="contact"
        className="py-20 px-5 bg-aasani-cream relative"
      >
        {/* Halftone border on left and right */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[60px]"
          style={{
            backgroundImage: 'radial-gradient(circle 4px at center, #111212 100%, transparent 100%)',
            backgroundSize: '10px 10px',
            opacity: 0.3,
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[60px]"
          style={{
            backgroundImage: 'radial-gradient(circle 4px at center, #111212 100%, transparent 100%)',
            backgroundSize: '10px 10px',
            opacity: 0.3,
          }}
        />
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Illustration */}
            <div className="text-center md:text-left">
              <div className="w-[300px] h-[250px] mx-auto md:mx-0 mb-6 relative">
                {/* Illustration placeholder - person pressing button */}
                <svg viewBox="0 0 300 250" className="w-full h-full">
                  {/* Musical notes */}
                  <text x="40" y="30" fontSize="20">♪</text>
                  <text x="60" y="50" fontSize="16">♫</text>
                  {/* Magnifying glass */}
                  <circle cx="240" cy="40" r="15" fill="none" stroke="#111212" strokeWidth="3"/>
                  <line x1="252" y1="52" x2="265" y2="65" stroke="#111212" strokeWidth="3"/>
                  {/* Question mark */}
                  <text x="260" y="100" fontSize="24" fontWeight="bold">?</text>
                  {/* Person */}
                  <ellipse cx="150" cy="80" rx="25" ry="30" fill="#111212"/>
                  <rect x="125" y="105" width="50" height="80" rx="5" fill="#111212"/>
                  <rect x="100" y="110" width="30" height="15" rx="5" fill="#111212" transform="rotate(-30 115 117)"/>
                  <rect x="170" y="110" width="30" height="15" rx="5" fill="#111212" transform="rotate(30 185 117)"/>
                  <rect x="130" y="180" width="15" height="50" fill="#111212"/>
                  <rect x="155" y="180" width="15" height="50" fill="#111212"/>
                  {/* Button */}
                  <ellipse cx="200" cy="200" rx="50" ry="25" fill="#ffe24f" stroke="#111212" strokeWidth="3"/>
                  <text x="170" y="195" fontSize="12" fontWeight="bold" fill="#111212">LET'S</text>
                  <text x="175" y="210" fontSize="12" fontWeight="bold" fill="#111212">GO!</text>
                  {/* Flower */}
                  <circle cx="50" cy="220" r="8" fill="#111212"/>
                  <ellipse cx="42" cy="212" rx="6" ry="4" fill="#111212"/>
                  <ellipse cx="58" cy="212" rx="6" ry="4" fill="#111212"/>
                  <ellipse cx="42" cy="228" rx="6" ry="4" fill="#111212"/>
                  <ellipse cx="58" cy="228" rx="6" ry="4" fill="#111212"/>
                </svg>
              </div>
              <h2 className="font-heading text-[clamp(24px,4vw,32px)] tracking-tight">Let us see if we can help.</h2>
            </div>
            {/* Right - Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-5 bg-aasani-black text-aasani-white relative overflow-hidden">
        {/* Halftone border on edges */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[40px]"
          style={{
            backgroundImage: 'radial-gradient(circle 3px at center, #ffe24f 100%, transparent 100%)',
            backgroundSize: '8px 8px',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-[40px]"
          style={{
            backgroundImage: 'radial-gradient(circle 3px at center, #ffe24f 100%, transparent 100%)',
            backgroundSize: '8px 8px',
            opacity: 0.5,
          }}
        />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div>
              <h3 className="text-lg text-aasani-yellow mb-2">Email</h3>
              <a href="mailto:ayub@aasani.ai" className="text-lg hover:text-aasani-yellow transition-colors">
                ayub@aasani.ai
              </a>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'Benefits', href: '#process' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'About', href: '#about' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block font-heading text-2xl text-aasani-yellow hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { label: 'Linkedin', href: 'https://linkedin.com/' },
                { label: 'Facebook', href: 'https://www.facebook.com/share/1BQjE7swDA/?mibextid=wwXIfr' },
                { label: 'X.com', href: 'https://x.com/' },
                { label: 'Instagram', href: 'https://instagram.com/' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-heading text-2xl text-aasani-yellow hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="pt-10 text-center">
            <span className="font-heading text-[clamp(60px,15vw,150px)] text-aasani-yellow opacity-30 tracking-tight leading-none block">
              AASANI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
