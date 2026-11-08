import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationIconImg } from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface YapinCtaCardProps {
  onOpenDownload: () => void;
}

export const YapinCtaCard: React.FC<YapinCtaCardProps> = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Outer Card with Crosshair Corner Marks & Grid Lines */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-orange-500/25 bg-[#0f0e13]/90 p-8 sm:p-14 text-center overflow-hidden shadow-[0_20px_80px_rgba(255,107,0,0.15)]"
      >
        {/* Coordinate grid lines overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,107,0,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,107,0,0.18) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Warm Orange Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-96 rounded-full bg-orange-600/15 blur-[80px]" />

        {/* 4 Technical Corner Crosshair Brackets */}
        <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-orange-500/50" />
        <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-orange-500/50" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-orange-500/50" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-orange-500/50" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Centered Glowing App Icon Container */}
          <div className="relative mb-6">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-[#ff6b00] p-3 flex items-center justify-center shadow-[0_0_50px_rgba(255,107,0,0.55)] cursor-pointer"
            >
              <NavigationIconImg className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="font-sans text-4xl sm:text-6xl font-black tracking-tight text-white">
            Come archive.
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-lg text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Direct lossless archival storage and digital file vaults. Zero compression, no card required.
          </p>

          {/* Download desktop app button */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-[#ff6b00] px-7 py-3.5 font-sans text-xs sm:text-sm font-bold text-black shadow-xl shadow-orange-500/25 hover:bg-[#ff7d1f] transition-all cursor-pointer no-underline inline-flex"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>Download the desktop app</span>
            </motion.a>
          </div>

          {/* Subtext */}
          <p className="mt-6 text-[11px] font-mono text-neutral-400">
            Windows 10 / 11 64-bit · Noir Archive Setup.exe · Free forever
          </p>
        </div>
      </motion.div>
    </section>
  );
};
