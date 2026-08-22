import React, { useState, useCallback, memo } from 'react';
import { HelpCircle, Plus } from 'lucide-react';
import { faqs } from '../data/faqs';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = useCallback((idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  }, []);

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Got Questions?"
          eyebrowIcon={HelpCircle}
          title={<>Frequently Asked <span className="gradient-text-cyan-purple">Questions</span></>}
          subtitle="Everything about our curriculum, live sessions, the free 3-day demo pass and career assistance."
        />

        <div className="space-y-2.5 mt-14">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Accordion row.
 *
 * Expansion uses a grid-template-rows 0fr→1fr transition instead of animating
 * height: it gets the same result with no JS measurement pass and no layout
 * thrash while the page is scrolling.
 */
const FaqItem = memo(function FaqItem({ faq, index, isOpen, onToggle }) {
  const ref = useReveal({ delay: Math.min(index, 2) * 40 });

  return (
    <div
      ref={ref}
      data-reveal
      className={`solid-card rounded-xl overflow-hidden transition-[border-color,box-shadow] duration-300
                  ${isOpen ? 'border-accent/40 shadow-elev-2' : 'hover:border-accent/25'}`}
    >
      <h3>
        <button
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer group/q"
        >
          <span
            className={`font-display text-[13.5px] sm:text-[14.5px] font-semibold leading-snug transition-colors duration-200
                        ${isOpen ? 'text-accent' : 'text-ink group-hover/q:text-accent'}`}
          >
            {faq.question}
          </span>

          <span
            className={`shrink-0 grid place-items-center w-6 h-6 rounded-lg border transition-all duration-400 ease-out-expo
                        ${isOpen
                          ? 'rotate-[135deg] bg-accent-soft border-accent/40 text-accent'
                          : 'border-line-strong text-ink-soft group-hover/q:border-accent/40'}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </span>
        </button>
      </h3>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-400 ease-out-expo"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="px-4 sm:px-5 pb-4 pt-1 text-body-sm text-ink-muted leading-relaxed border-t border-line">
            <span className="block pt-3">{faq.answer}</span>
          </p>
        </div>
      </div>
    </div>
  );
});
