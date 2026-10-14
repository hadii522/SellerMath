'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqJsonLd, FaqItem } from '@/lib/seo/jsonld';

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export function FaqAccordion({
  items,
  title = 'Frequently Asked Questions',
  description = 'Answers to common questions about fee calculations, profit margins, and marketplace rules.',
}: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // first open by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-8" aria-labelledby="faq-heading">
      <FaqJsonLd items={items} />

      <div className="mb-6">
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-neutral-900"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const buttonId = `faq-btn-${idx}`;
          const contentId = `faq-content-${idx}`;

          return (
            <div
              key={idx}
              className="border border-neutral-200 rounded-xl bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleIndex(idx)}
                className="w-full py-4 px-5 text-left font-semibold text-neutral-900 hover:text-emerald-700 flex items-center justify-between gap-4 transition-colors"
              >
                <span className="text-sm sm:text-base leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/40"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
