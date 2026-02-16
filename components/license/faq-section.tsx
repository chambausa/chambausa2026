'use client';

import { useState } from 'react';
import type { FAQ } from '@/types/license-json.types';

interface FAQSectionProps {
  faqs: FAQ[];
  oficio?: string;
  estado?: string;
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </div>
      )}
    </div>
  );
}

export function FAQSection({ faqs, oficio, estado }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const subtitle = oficio && estado
    ? `Respuestas a las dudas más comunes sobre la licencia de ${oficio} en ${estado}.`
    : oficio
    ? `Respuestas a las dudas más comunes sobre la licencia de ${oficio}.`
    : 'Respuestas a las dudas más comunes.'

  return (
    <section id="faqs" className="py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Preguntas Frecuentes
      </h2>
      <p className="text-gray-600 mb-6">
        {subtitle}
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
