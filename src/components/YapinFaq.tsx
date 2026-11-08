import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'free',
    question: 'Is Noir Archive really free?',
    answer:
      'Yes, portfolio hosting, raw batch file transfers, custom studio handles, EXIF preservation, and client ZIP delivery are 100% free. Plus ($4.99 a month) is optional: longer message history, bigger uploads up to 500 MB per transfer, and priority server routing. Nothing you need to deliver is held back.',
  },
  {
    id: 'platforms',
    question: 'What platforms does it support?',
    answer:
      'Noir Archive runs directly in all modern desktop web browsers (Chrome, Firefox, Safari, Edge) and provides a native, hardware-accelerated Windows 10 & 11 desktop app with local vault sync, background file streaming, and system tray integration.',
  },
  {
    id: 'bots',
    question: 'What can bots do?',
    answer:
      'Archive bots and automation integrations can automatically ingest media folders, calculate cryptographic SHA-256 integrity hashes, generate batch contact sheets, and trigger webhook notifications when clients finish reviewing their delivered archives.',
  },
  {
    id: 'lossless',
    question: 'How does lossless zero-compression storage work?',
    answer:
      'Unlike typical cloud storage or social media platforms that re-encode images or downsample media, Noir Archive preserves every single byte, color profile, and embedded EXIF metadata tag. All files are verified with SHA-256 integrity checksums.',
  },
  {
    id: 'clients',
    question: 'Can clients download files without an account?',
    answer:
      'Yes. Direct client transfer portals allow recipients to inspect file previews, verify checksums, and download individual files or the entire batch as a ZIP archive with a single click—no account required.',
  },
];

export const YapinFaq: React.FC = () => {
  const { theme } = useApp();
  const isLight = theme === 'light';

  // Default first item open matching reference screenshot
  const [openId, setOpenId] = useState<string | null>('free');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className={`font-sans text-4xl sm:text-6xl font-black tracking-tight ${
          isLight ? 'text-stone-900' : 'text-white'
        }`}
      >
        Questions.
      </motion.h2>

      {/* Accordion List */}
      <div className={`mt-10 divide-y ${isLight ? 'divide-stone-200 border-t border-stone-200' : 'divide-white/[0.08] border-t border-white/[0.08]'}`}>
        {FAQ_ITEMS.map(item => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="py-4 sm:py-5">
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
              >
                <span
                  className={`font-sans text-base sm:text-lg font-bold transition-colors ${
                    isOpen
                      ? isLight
                        ? 'text-orange-600'
                        : 'text-white'
                      : isLight
                      ? 'text-stone-800 group-hover:text-stone-950'
                      : 'text-neutral-200 group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>

                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                    isOpen
                      ? 'bg-[#ff6b00] text-black shadow-md shadow-orange-500/25'
                      : isLight
                      ? 'bg-stone-200/80 text-stone-600 group-hover:bg-stone-300'
                      : 'border border-white/10 bg-white/5 text-neutral-400 group-hover:bg-white/10 group-hover:text-white'
                  }`}
                >
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className={`pt-3.5 pb-2 pr-10 text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-stone-600' : 'text-neutral-400'
                      }`}
                    >
                      {item.answer}
                    </p>
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
