import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { leadMagnetContent, backgroundImages } from '../../../data/indexContent';

interface LeadMagnetSlideProps {
  index: number;
}

export function LeadMagnetSlide({ index }: LeadMagnetSlideProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(leadMagnetContent.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewChecklist = () => {
    window.open(leadMagnetContent.checklistUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-clear overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative shadow-2xl card-bg"
        style={{ backgroundImage: `url(${backgroundImages.philosophy})` }}
      >

        <div className="md:p-12 md:pt-12 z-20 pt-20 md:pt-12 px-6 md:px-12 pb-8 md:pb-12 relative">
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 drop-shadow-md">
              [09/10]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:document-text-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
                {leadMagnetContent.label}
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg font-display">
              {leadMagnetContent.title}
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={0.3}>
            <p className="text-2xl md:text-4xl font-normal text-teal-300 tracking-tight drop-shadow-md font-display">
              {leadMagnetContent.subtitle}
            </p>
          </AnimatedElement>
        </div>

        <div className="z-20 md:px-12 flex-1 flex flex-col pr-6 pl-6 relative justify-center py-4">
          {!success ? (
            <AnimatedElement delay={0.4} className="w-full">
              <p className="text-neutral-300 text-sm md:text-base mb-6 font-display">
                {leadMagnetContent.description}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={leadMagnetContent.namePlaceholder}
                  required
                  className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all font-display"
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={leadMagnetContent.emailPlaceholder}
                  required
                  className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all font-display"
                />

                {error && (
                  <p className="text-red-400 text-sm font-display">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex md:py-4 overflow-hidden hover:bg-teal-400 transition-colors cursor-pointer text-black bg-white w-full rounded-full py-3 relative shadow-xl gap-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="text-xs md:text-sm font-bold uppercase tracking-widest">
                      Sending...
                    </span>
                  ) : (
                    <>
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest">
                        {leadMagnetContent.buttonText}
                      </span>
                      <iconify-icon
                        icon="solar:arrow-right-linear"
                        className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </AnimatedElement>
          ) : (
            <AnimatedElement delay={0} className="w-full text-center">
              <div className="bg-black/50 backdrop-blur-sm border border-teal-400/30 rounded-lg p-6 md:p-8">
                <iconify-icon
                  icon="solar:check-circle-bold"
                  className="text-5xl md:text-6xl text-teal-300 mb-4"
                />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
                  {leadMagnetContent.successMessage}
                </h3>
                <p className="text-neutral-400 text-sm md:text-base mb-6 font-display">
                  {name ? `Thanks, ${name}!` : 'Thanks!'} Check your email for a welcome message.
                </p>
                <button
                  onClick={handleViewChecklist}
                  className="group flex md:py-4 overflow-hidden hover:bg-teal-300 transition-colors cursor-pointer text-black bg-teal-400 w-full rounded-full py-3 relative shadow-xl gap-2 items-center justify-center"
                >
                  <span className="text-xs md:text-sm font-bold uppercase tracking-widest">
                    View Checklist
                  </span>
                  <iconify-icon
                    icon="solar:arrow-right-up-linear"
                    className="text-xl md:text-2xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
            </AnimatedElement>
          )}
        </div>

        <AnimatedElement delay={0.5} className="md:px-12 z-20 pt-2 pr-6 pb-8 pl-6 relative">
          <p className="text-neutral-500 text-xs text-center font-display">
            No spam. Just the checklist and occasional helpful content.
          </p>
        </AnimatedElement>
      </div>
    </section>
  );
}
