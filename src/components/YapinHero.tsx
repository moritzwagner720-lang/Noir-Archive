import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { downloadSetupExe } from '../utils/downloadSetup';

interface YapinHeroProps {
  onOpenDownload: () => void;
}

export const YapinHero: React.FC<YapinHeroProps> = ({
  onOpenDownload,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Background ambient radial glow & harvest moon particle ambiance */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.16)_0%,rgba(255,107,0,0.03)_50%,transparent_75%)] blur-[90px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        
        {/* Main Hero Header */}
        <div className="max-w-3xl">
          {/* Editorial Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-[#ff6b00] mb-5 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Zero-Compression Archival Vault & Lossless Storage</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            Your digital vault,
            <br />
            <span className="text-[#ff6b00]">built for lossless archives.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl"
          >
            Noir Archive is where teams, studios, and creators store secure data archives, organize uncompressed directories, and preserve file integrity with zero loss. Free to use, built for speed.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe"
              download="Noir Archive Setup.exe"
              onClick={(e) => {
                e.preventDefault();
                downloadSetupExe();
              }}
              className="flex items-center gap-2.5 rounded-2xl bg-[#ff6b00] px-7 py-4 font-sans text-xs sm:text-sm font-bold text-black shadow-xl shadow-orange-500/25 hover:bg-[#ff7d1f] transition-all cursor-pointer no-underline inline-flex"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>Download the desktop app</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex items-center gap-4 text-xs font-mono text-neutral-400"
          >
            <button
              onClick={onOpenDownload}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Windows 10 / 11 · 64-bit · Noir Archive Setup.exe
            </button>
            <span>·</span>
            <span className="text-emerald-400">Byte-for-byte SHA-256</span>
          </motion.div>
        </div>

        {/* Hero Showcase Window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 relative rounded-3xl border border-orange-500/30 bg-[#090503] shadow-[0_25px_90px_rgba(255,107,0,0.18)] overflow-hidden"
        >
          {/* Subtle top reflection glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

          {/* Window Header (Non-interactive) */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#0d0705] px-5 py-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-neutral-300 font-semibold">
                Noir Archive Vault Desktop
              </span>
            </div>

            {/* Static Non-Interactive Window Badge */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lossless Vault Active</span>
            </div>
          </div>

          {/* Main Visual Display */}
          <div className="relative w-full overflow-hidden bg-black flex items-center justify-center min-h-[360px] sm:min-h-[480px]">
            <div className="relative w-full">
              <img
                src="/assets/aistudio/image_736912ac.png"
                alt="Noir Archive Vault Desktop Window"
                className="w-full h-auto object-contain select-none pointer-events-none block"
              />
            </div>
          </div>

          {/* Bottom subtle status bar for the showcase */}
          <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0d0703] px-5 py-2.5 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
              <span>Noir Archive Vault Desktop Client</span>
            </div>
            <div className="text-neutral-400">
              Native Windows x64 Build
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

