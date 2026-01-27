import * as React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from './Dialog';
import { cn } from '../../lib/utils';
import { leadMagnetContent } from '../../data/indexContent';

interface LeadCaptureDialogProps {
  trigger: React.ReactNode;
  className?: string;
}

const FADE_IN_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export function LeadCaptureDialog({ trigger, className }: LeadCaptureDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

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
          source: 'cta-dialog-checklist'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Open checklist in new tab
        window.open(leadMagnetContent.checklistUrl, '_blank');
        // Reset form after short delay
        setTimeout(() => {
          setOpen(false);
          // Reset state after dialog closes
          setTimeout(() => {
            setIsSuccess(false);
            setName('');
            setEmail('');
            setPhone('');
          }, 300);
        }, 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset error when closing
      setError('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn('p-0 bg-transparent border-none shadow-none', className)}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-6 md:p-8 shadow-2xl mx-4 md:mx-0"
        >
          {/* Close button */}
          <DialogClose className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            <iconify-icon icon="solar:close-circle-linear" className="text-neutral-400 hover:text-white text-lg" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Header */}
          <motion.div variants={FADE_IN_VARIANTS} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <iconify-icon icon="solar:document-linear" className="text-teal-400 text-xl" />
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
                Free Download
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display">
              Get the 7 Automations Checklist
            </h3>
            <p className="text-neutral-400 mt-2 text-sm md:text-base">
              Everything you need to reclaim 20+ hours per week. Delivered instantly.
            </p>
          </motion.div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <motion.div variants={FADE_IN_VARIANTS}>
                <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Your Name <span className="text-teal-400">*</span>
                </label>
                <input
                  type="text"
                  id="lead-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition-all"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={FADE_IN_VARIANTS}>
                <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Email Address <span className="text-teal-400">*</span>
                </label>
                <input
                  type="email"
                  id="lead-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition-all"
                />
              </motion.div>

              {/* Phone Field (Optional) */}
              <motion.div variants={FADE_IN_VARIANTS}>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Phone <span className="text-neutral-500 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="lead-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-teal-400/50 focus:ring-2 focus:ring-teal-400/20 transition-all"
                />
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.div variants={FADE_IN_VARIANTS} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !email || !name}
                  className="group relative w-full overflow-hidden rounded-full p-[1px] focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Spinning border */}
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,#14b8a6_360deg)] opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity" />

                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 py-3.5 px-6 transition-colors">
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="group-hover:animate-shimmer group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 w-full h-full absolute top-0 left-0 -skew-x-12 group-disabled:!opacity-0" />
                    </span>

                    <span className="relative z-10 flex items-center gap-2 text-black font-semibold">
                      {isSubmitting ? (
                        <>
                          <iconify-icon icon="solar:refresh-linear" className="animate-spin text-lg" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Get the Checklist</span>
                          <iconify-icon icon="solar:arrow-right-up-linear" className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </span>
                </button>
              </motion.div>

              {/* Privacy note */}
              <motion.p variants={FADE_IN_VARIANTS} className="text-xs text-neutral-500 text-center pt-2">
                We respect your privacy. Unsubscribe anytime.
              </motion.p>
            </form>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
                <iconify-icon icon="solar:check-circle-bold" className="text-teal-400 text-3xl" />
              </div>
              <h4 className="text-xl font-bold text-white font-display mb-2">
                You're all set!
              </h4>
              <p className="text-neutral-400">
                Check your new tab for the checklist.
              </p>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
