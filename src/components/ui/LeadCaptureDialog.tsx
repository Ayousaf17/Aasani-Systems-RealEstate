import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Sparkles, Clock, CheckCircle2, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import { cn } from '../../lib/utils';
import { leadMagnetContent } from '../../data/indexContent';

interface LeadCaptureDialogProps {
  trigger: React.ReactNode;
  className?: string;
  onSuccess?: () => void;
}

// Animation variants - mobile and desktop versions
const getContainerVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.05 : 0.1,
      delayChildren: isMobile ? 0.05 : 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
});

const getItemVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: isMobile
      ? { duration: 0.25, ease: 'easeOut' as const }
      : { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
});

const getIconVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: isMobile
      ? { duration: 0.3, ease: 'easeOut' as const, delay: 0.1 }
      : { type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.2 },
  },
});

const getBenefitVariants = (isMobile: boolean) => ({
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: isMobile
      ? { duration: 0.25, ease: 'easeOut' as const, delay: 0.15 + i * 0.05 }
      : { type: 'spring' as const, stiffness: 300, damping: 24, delay: 0.3 + i * 0.1 },
  }),
});

const benefits = [
  { icon: Clock, text: 'Reclaim 20+ hours weekly' },
  { icon: Sparkles, text: 'Instant lead response systems' },
  { icon: CheckCircle2, text: 'Never miss a follow-up' },
];

export function LeadCaptureDialog({ trigger, className, onSuccess }: LeadCaptureDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile on mount
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(leadMagnetContent.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          source: 'cta-dialog-checklist',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        window.open(leadMagnetContent.checklistUrl, '_blank');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (isSuccess && onSuccess) {
      onSuccess();
    }
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
    }, 300);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleClose();
    } else {
      setOpen(true);
    }
    if (!newOpen) {
      setError('');
      setFocusedField(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn('p-0 bg-transparent border-none shadow-none flex items-center justify-center', className)}>
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              variants={getContainerVariants(isMobile)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative w-[calc(100%-2rem)] max-w-xl md:max-w-2xl max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)] rounded-2xl border border-white/20 shadow-2xl overflow-y-auto mx-4 md:mx-0"
              style={{
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Background gradient orbs */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid md:grid-cols-5 gap-0">
                {/* Left Panel - Visual & Benefits */}
                <motion.div
                  variants={getItemVariants(isMobile)}
                  className="md:col-span-2 bg-gradient-to-br from-teal-500/10 to-transparent p-4 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10"
                >
                  {/* Icon & Title Row - Horizontal on mobile */}
                  <div className="flex items-start gap-4 md:block">
                    <motion.div
                      variants={getIconVariants(isMobile)}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0 md:mb-6"
                    >
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-teal-400" />
                    </motion.div>

                    <div className="md:mb-0">
                      <motion.h3
                        variants={getItemVariants(isMobile)}
                        className="text-lg md:text-2xl font-bold text-white font-display mb-1 md:mb-2"
                      >
                        The 7 Systems Checklist
                      </motion.h3>

                      <motion.p variants={getItemVariants(isMobile)} className="text-neutral-400 text-xs md:text-sm md:mb-6">
                        Everything you need to transform your real estate business.
                      </motion.p>
                    </div>
                  </div>

                  {/* Benefits - Hidden on mobile to save space */}
                  <div className="hidden md:block space-y-3">
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit.text}
                        custom={i}
                        variants={getBenefitVariants(isMobile)}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500/20 group-hover:border-teal-500/30 transition-colors">
                          <benefit.icon className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                          {benefit.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Panel - Form */}
                <div className="md:col-span-3 p-4 md:p-8 relative">
                  {/* Close button */}
                  <motion.button
                    variants={getItemVariants(isMobile)}
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <X className="w-4 h-4 text-neutral-400 hover:text-white" />
                    <span className="sr-only">Close</span>
                  </motion.button>

                  {/* Header */}
                  <motion.div variants={getItemVariants(isMobile)} className="mb-4 md:mb-6 pr-8">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                        Free Download
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm">
                      Enter your details and we'll send it right over.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    {/* Name Field */}
                    <motion.div variants={getItemVariants(isMobile)}>
                      <label
                        htmlFor="lead-name"
                        className="block text-xs md:text-sm font-medium text-neutral-300 mb-1 md:mb-1.5"
                      >
                        Your Name <span className="text-teal-400">*</span>
                      </label>
                      <div
                        className={cn(
                          'relative rounded-lg md:rounded-xl transition-all duration-300',
                          focusedField === 'name' && 'ring-2 ring-teal-400/30'
                        )}
                      >
                        <input
                          type="text"
                          id="lead-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Jane Smith"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 transition-all"
                        />
                        {name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={getItemVariants(isMobile)}>
                      <label
                        htmlFor="lead-email"
                        className="block text-xs md:text-sm font-medium text-neutral-300 mb-1 md:mb-1.5"
                      >
                        Email Address <span className="text-teal-400">*</span>
                      </label>
                      <div
                        className={cn(
                          'relative rounded-lg md:rounded-xl transition-all duration-300',
                          focusedField === 'email' && 'ring-2 ring-teal-400/30'
                        )}
                      >
                        <input
                          type="email"
                          id="lead-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="jane@example.com"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 transition-all"
                        />
                        {email && email.includes('@') && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div variants={getItemVariants(isMobile)}>
                      <label
                        htmlFor="lead-phone"
                        className="block text-xs md:text-sm font-medium text-neutral-300 mb-1 md:mb-1.5"
                      >
                        Phone <span className="text-neutral-500 text-xs">(optional)</span>
                      </label>
                      <div
                        className={cn(
                          'relative rounded-lg md:rounded-xl transition-all duration-300',
                          focusedField === 'phone' && 'ring-2 ring-teal-400/30'
                        )}
                      >
                        <input
                          type="tel"
                          id="lead-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="(555) 123-4567"
                          className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 transition-all"
                        />
                      </div>
                    </motion.div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="text-red-400 text-sm text-center"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div variants={getItemVariants(isMobile)} className="pt-1 md:pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !email || !name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full overflow-hidden rounded-lg md:rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 py-3 md:py-3.5 px-4 md:px-6 transition-colors disabled:cursor-not-allowed"
                      >
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 overflow-hidden rounded-lg md:rounded-xl">
                          <span className="group-hover:animate-shimmer group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12 group-disabled:!opacity-0" />
                        </span>

                        <span className="relative z-10 flex items-center justify-center gap-2 text-black font-semibold text-sm md:text-base">
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              >
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                              </motion.div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Get the Checklist</span>
                              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                          )}
                        </span>
                      </motion.button>
                    </motion.div>

                    {/* Privacy */}
                    <motion.p
                      variants={getItemVariants(isMobile)}
                      className="text-[10px] md:text-xs text-neutral-500 text-center"
                    >
                      We respect your privacy. Unsubscribe anytime.
                    </motion.p>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/20 p-6 md:p-8 shadow-2xl mx-4 md:mx-0 text-center"
              style={{
                background: 'rgba(10, 10, 10, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Background pulse */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                className="absolute inset-0 bg-teal-500/10 rounded-2xl"
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-500/20 border-2 border-teal-500/50 flex items-center justify-center mx-auto mb-4 md:mb-6"
              >
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-teal-400" />
              </motion.div>

              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative text-xl md:text-2xl font-bold text-white font-display mb-2"
              >
                You're all set!
              </motion.h4>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative text-neutral-400 text-sm md:text-base mb-6"
              >
                Check your new tab for the checklist.
              </motion.p>

              {/* CTA Button - Explore Automations */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={handleClose}
                className="relative w-full group flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <span>Explore the 7 Systems</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative mt-4 text-xs text-neutral-500"
              >
                See how systems transform your business
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
