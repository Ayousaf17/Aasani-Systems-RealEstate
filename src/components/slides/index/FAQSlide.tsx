import { useState } from 'react';
import { AnimatedElement } from '../../ui/AnimatedElement';
import { faqContent, backgroundImages } from '../../../data/indexContent';

interface FAQSlideProps {
  index: number;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

function FAQItem({ question, answer, isOpen, onToggle, delay }: FAQItemProps) {
  return (
    <AnimatedElement delay={delay}>
      <button
        onClick={onToggle}
        className="w-full bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-left hover:bg-black/70 hover:border-teal-300/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-white font-medium font-display text-sm md:text-base">
            {question}
          </span>
          <iconify-icon
            icon={isOpen ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
            className={`text-xl shrink-0 transition-colors duration-300 ${isOpen ? 'text-teal-300' : 'text-neutral-400'}`}
          />
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-neutral-400 text-sm font-display leading-relaxed border-t border-white/10 pt-3">
              {answer}
            </p>
          </div>
        </div>
      </button>
    </AnimatedElement>
  );
}

export function FAQSlide({ index }: FAQSlideProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="snap-start shrink-0 flex w-full slide-height relative items-center justify-center"
      data-slide={index}
      id={`section-${index + 1}`}
    >
      <div
        className="h-full md:h-auto md:aspect-[3/4] glass-panel overflow-hidden flex flex-col w-full max-w-none md:max-w-xl rounded-none relative shadow-2xl card-bg md:pt-12 md:pr-12 md:pl-12 pt-14 md:pt-12 pr-6 pb-20 md:pb-6 pl-6"
        style={{ backgroundImage: `url(${backgroundImages.philosophy})` }}
      >

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <AnimatedElement delay={0.1} className="flex justify-between items-center mb-6 shrink-0">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-200 drop-shadow-md">
              [08/10]
            </span>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:question-circle-linear" className="text-teal-300 text-lg drop-shadow-md" />
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-teal-300 drop-shadow-md">
                {faqContent.label}
              </span>
            </div>
          </AnimatedElement>

          {/* Title */}
          <AnimatedElement delay={0.2} className="shrink-0 mb-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-md font-display">
              {faqContent.title}
            </h2>
            <p className="text-neutral-300 text-sm md:text-base font-display drop-shadow-md">
              {faqContent.subtitle}
            </p>
          </AnimatedElement>

          {/* FAQ Items */}
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-hide pb-4">
            {faqContent.items.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
                delay={0.3 + i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
