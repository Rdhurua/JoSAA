'use client';
import { useState } from 'react';
import { faqData } from '../utils/Data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
   <div id="faq" className="p-6 sm:p-10 bg-white">
  <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-700 mb-8 sm:mb-10">
      Got Questions? We've Got Answers!
    </h2>
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm transition"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full text-left text-lg sm:text-xl font-semibold text-gray-800 focus:outline-none flex justify-between items-center cursor-pointer"
          >
            {item.question}
            <span className="text-2xl sm:text-3xl font-bold">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <p className="mt-3 text-gray-700 leading-relaxed text-base sm:text-lg">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  </section>
</div>
  );
}
