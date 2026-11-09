import React from 'react';
import { ArrowUpRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationIconImg } from './Icons';

interface YapinCtaCardProps {
  onOpenDownload?: () => void;
}

export const YapinCtaCard: React.FC<YapinCtaCardProps> = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-[#38bdf8]/35 bg-gradient-to-b from-[#071426] via-[#050b14] to-[#040810] p-8 sm:p-16 text-center overflow-hidden shadow-[0_25px_90px_rgba(56,189,248,0.2)] ring-1 ring-white/10"
      >
        {/* Ice grid lines overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(102,217,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(102,217,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Arctic Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,rgba(102,217,255,0.06)_50%,transparent_75%)] blur-[90px]" />

        {/* 4 Technical Corner Crosshair Brackets in Arctic Cyan */}
        <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-[#66d9ff]/70" />
        <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-[#66d9ff]/70" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-[#66d9ff]/70" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-[#66d9ff]/70" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Centered Glowing App Icon */}
          <div className="relative mb-6">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-br from-[#66d9ff] via-[#38bdf8] to-[#0284c7] p-3 sm:p-4 flex items-center justify-center shadow-[0_0_50px_rgba(102,217,255,0.6)] cursor-pointer ring-2 ring-white/30"
            >
              <NavigationIconImg className="h-10 w-10 sm:h-12 sm:w-12 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="font-sans text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Your Digital World.{' '}
            <span className="bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] bg-clip-text text-transparent">
              Without Limits.
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Discover a new way to connect, share and explore. Everything you need, in one place.
            Join thousands of creators, studios, and engineers preserving data with zero compression.
          </p>

          {/* Main CTA: GET STARTED NOW */}
          <div className="mt-9 flex flex-wrap justify-center items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://noirarchive.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#66d9ff] via-[#38bdf8] to-[#0284c7] px-8 py-4 font-sans text-sm sm:text-base font-extrabold text-[#050b14] shadow-[0_0_40px_rgba(56,189,248,0.45)] hover:shadow-[0_0_60px_rgba(102,217,255,0.7)] transition-all cursor-pointer no-underline inline-flex"
            >
              <span className="tracking-wide">GET STARTED NOW</span>
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </div>

          {/* Guarantee Subtext */}
          <p className="mt-6 text-xs font-mono text-[#a5e9ff]/70 flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>Instant web access · Free forever · Zero card required</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};
