import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'product',
    question: 'What is Noir Archive and how do I get started?',
    answer:
      'Noir Archive is a modern web application and lossless digital vault designed for studios, creators, and teams. You can get started immediately in your browser—simply click "GET STARTED NOW" to launch the web app. No installation or complex setup is required.',
  },
  {
    id: 'lossless',
    question: 'How does zero-compression file preservation work?',
    answer:
      'Unlike typical cloud storage or social media platforms that silently downsample footage or strip EXIF metadata, Noir Archive preserves every single byte, color space, and embedded tag. Every uploaded package is verified with hardware SHA-256 integrity checksums.',
  },
  {
    id: 'clients',
    question: 'Can clients and recipients download files without creating an account?',
    answer:
      'Yes! Direct client transfer portals allow your clients to preview assets, verify checksums, and download individual files or the entire batch as an uncompressed ZIP archive with a single click—no login or credit card required.',
  },
  {
    id: 'free',
    question: 'Is Noir Archive free to use?',
    answer:
      'Yes. Creating vaults, sharing client packages, inspecting EXIF metadata, and joining community repositories is 100% free. Optional high-capacity plans are available for enterprise studios requiring ultra-large multi-terabyte pipelines.',
  },
  {
    id: 'security',
    question: 'How are client files and vaults secured?',
    answer:
      'All data in transit is protected using TLS 1.3 encryption, and private deliveries can be locked behind custom passwords with automated expiry windows. Only recipients with valid credentials can decrypt and download package contents.',
  },
  {
    id: 'api',
    question: 'Is there a Developer API or CLI available?',
    answer:
      'Yes. Noir Archive provides a modern REST API and webhook integrations for automating build pipelines, studio ingest workflows, and real-time client delivery notifications.',
  },
];

export const YapinFaq: React.FC = () => {
  const { theme } = useApp();
  const isLight = theme === 'light';

  // First item open by default
  const [openId, setOpenId] = useState<string | null>('product');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:py-28 sm:px-6">
      {/* Section Title */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/30 bg-[#07111f] px-3.5 py-1 text-xs font-mono text-[#66d9ff] mb-4">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className={`font-sans text-4xl sm:text-6xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Questions & Answers.
        </motion.h2>
      </div>

      {/* Accordion List */}
      <div
        className={`divide-y ${
          isLight
            ? 'divide-slate-200 border-t border-slate-200'
            : 'divide-[#38bdf8]/15 border-t border-[#38bdf8]/20'
        }`}
      >
        {FAQ_ITEMS.map(item => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="py-5 sm:py-6">
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
              >
                <span
                  className={`font-sans text-base sm:text-lg font-bold transition-colors ${
                    isOpen
                      ? isLight
                        ? 'text-cyan-700'
                        : 'text-[#66d9ff]'
                      : isLight
                      ? 'text-slate-800 group-hover:text-slate-950'
                      : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>

                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isOpen
                      ? 'bg-gradient-to-br from-[#66d9ff] to-[#38bdf8] text-[#050b14] shadow-[0_0_15px_rgba(102,217,255,0.5)]'
                      : isLight
                      ? 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-300'
                      : 'border border-[#38bdf8]/20 bg-[#07111f] text-[#a5e9ff] group-hover:border-[#66d9ff]/50 group-hover:text-white'
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
                      className={`pt-3.5 pb-2 pr-8 text-sm leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
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
