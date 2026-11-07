import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const YapinFaq: React.FC = () => {
  // Question 1 is expanded by default
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Is Noir Archive really free?',
      answer:
        'Yes, secure file storage, uncompressed batch folder transfers, checksum verification, and instant client ZIP deliveries are 100% free. Plus ($4.99 a month) is optional: extended transfer retention, larger file batches, and priority bandwidth. Nothing you need to deliver is held back.',
    },
    {
      id: 'faq-2',
      question: 'What platforms does it support?',
      answer:
        'Noir Archive Desktop is built natively for Windows 10 and Windows 11 (64-bit installer via dist-electron\\Setup.exe). It provides instant desktop dropzones, background synchronization, and lightning-fast package delivery.',
    },
    {
      id: 'faq-3',
      question: 'How does client file delivery work?',
      answer:
        'Create a delivery package with password protection or open access, stage your uncompressed files or complete folders, and share the link. Clients can inspect files or download everything bundled in a single ZIP archive in seconds.',
    },
    {
      id: 'faq-4',
      question: 'Is original data integrity preserved?',
      answer:
        'Yes! Noir Archive never compresses, downsamples, or alters your uploads. Every file format, binary structure, and metadata profile remains 100% byte-for-byte identical.',
    },
    {
      id: 'faq-5',
      question: 'How does Noir Archive handle my data and privacy?',
      answer:
        'You retain 100% ownership and copyright over every file and dataset uploaded. We do not sell your data, we never inject ads into client delivery portals, and your archives remain strictly private.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24 sm:px-6">
      {/* Title: Questions. */}
      <h2 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-10">
        Questions.
      </h2>

      {/* Accordion List */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {faqs.map(faq => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div key={faq.id} className="py-5 sm:py-6 transition-colors">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              >
                <span className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                  {faq.question}
                </span>

                {/* Orange circle toggle button */}
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                    isOpen
                      ? 'bg-[#ff6b00] text-black shadow-md shadow-orange-500/30'
                      : 'border border-white/20 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-white/30'
                  }`}
                >
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pr-10 text-xs sm:text-sm text-neutral-300 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
