import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
        'Yes, secure file storage, uncompressed vault archiving, and checksum verification are 100% free forever for all users. No subscriptions, no hidden limits, and no paywalls. Nothing you need to archive is held back.',
    },
    {
      id: 'faq-2',
      question: 'What platforms does it support?',
      answer:
        'Noir Archive Desktop is built natively for Windows 10 and Windows 11 (64-bit installer via Setup.exe). It provides instant desktop dropzones, background synchronization, and lightning-fast lossless archiving.',
    },
    {
      id: 'faq-3',
      question: 'How does lossless vault storage work?',
      answer:
        'Organize uncompressed media, complete directory trees, and large datasets directly in your vaults. You can inspect files, verify SHA-256 checksums, and browse archives with zero compression or quality loss.',
    },
    {
      id: 'faq-4',
      question: 'Is original data integrity preserved?',
      answer:
        'Yes! Noir Archive never compresses, downsamples, or alters your uploads. Every file format, binary structure, and metadata profile remains 100% byte-for-byte identical with SHA-256 verification.',
    },
    {
      id: 'faq-5',
      question: 'How does Noir Archive handle my data and privacy?',
      answer:
        'You retain 100% ownership and copyright over every file and dataset uploaded. We do not sell your data, we never inject ads, and your archives remain strictly private.',
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff6b00] uppercase tracking-wider mb-2">
          <HelpCircle className="h-4 w-4" />
          <span>Frequently Asked</span>
        </div>
        <h2 className="font-sans text-4xl sm:text-6xl font-extrabold tracking-tight mb-10">
          Questions.
        </h2>
      </motion.div>

      {/* Accordion List */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {faqs.map(faq => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div key={faq.id} className="py-5 sm:py-6 transition-colors">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between text-left focus:outline-none group cursor-pointer gap-4"
              >
                <span className="font-sans text-base sm:text-lg font-bold group-hover:text-[#ff6b00] transition-colors">
                  {faq.question}
                </span>

                {/* Orange circle toggle button */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                    isOpen
                      ? 'bg-[#ff6b00] text-black shadow-md shadow-orange-500/30'
                      : 'border border-white/20 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-white/30'
                  }`}
                >
                  <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pr-10 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
