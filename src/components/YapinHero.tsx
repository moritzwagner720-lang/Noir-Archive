import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, Globe, Lock, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { IceParticlesCanvas } from './IceParticlesCanvas';

interface YapinHeroProps {
  onOpenDownload?: () => void;
}

export const YapinHero: React.FC<YapinHeroProps> = () => {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 flex flex-col justify-center">
      {/* Dynamic Animated Ice Particles Background */}
      <IceParticlesCanvas className="absolute inset-0 pointer-events-none z-0" />

      {/* Atmospheric Arctic Aurora Glow & Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[750px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(102,217,255,0.06)_45%,transparent_75%)] blur-[120px] z-0" />
      <div className="pointer-events-none absolute top-1/3 -left-48 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.12)_0%,transparent_70%)] blur-[100px] z-0" />
      <div className="pointer-events-none absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(165,233,255,0.1)_0%,transparent_70%)] blur-[100px] z-0" />

      {/* Frosted Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-ice-grid opacity-25 z-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Arctic Kicker Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#66d9ff]/30 bg-[#07111f]/90 px-4 py-1.5 text-xs font-semibold text-[#a5e9ff] shadow-[0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl mb-7"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#66d9ff] animate-pulse" />
            <span className="tracking-wide">NEXT-GENERATION DIGITAL VAULT & CREATIVE NETWORK</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.04] text-white"
          >
            Your Digital World.{' '}
            <br />
            <span className="bg-gradient-to-r from-[#66d9ff] via-[#a5e9ff] to-[#38bdf8] bg-clip-text text-transparent text-ice-glow">
              Without Limits.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Discover a new way to connect, share and explore. Everything you need, in one place.
            Direct uncompressed media portals, peer-to-peer pipelines, and immutable file preservation.
          </motion.p>

          {/* Hero Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary Large CTA: GET STARTED NOW */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://noirarchive.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#66d9ff] via-[#38bdf8] to-[#0284c7] px-9 py-4 font-sans text-sm sm:text-base font-extrabold text-[#050b14] shadow-[0_0_40px_rgba(56,189,248,0.45)] transition-all hover:shadow-[0_0_60px_rgba(102,217,255,0.7)] cursor-pointer no-underline"
            >
              <span className="relative z-10 tracking-wider">GET STARTED NOW</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* Secondary CTA: EXPLORE NOIR ARCHIVE */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#features"
              className="group flex items-center justify-center gap-2 rounded-2xl border border-[#38bdf8]/40 bg-[#07111f]/90 px-8 py-4 font-sans text-sm sm:text-base font-bold text-[#a5e9ff] backdrop-blur-md transition-all hover:border-[#66d9ff] hover:bg-[#0c1e36] hover:text-white hover:shadow-[0_0_30px_rgba(102,217,255,0.25)] cursor-pointer no-underline"
            >
              <span>EXPLORE NOIR ARCHIVE</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5 text-[#38bdf8]" />
            </motion.a>
          </motion.div>

          {/* Subtext guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-slate-400"
          >
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap className="h-3.5 w-3.5 text-[#38bdf8]" />
              Zero card required
            </span>
            <span className="text-[#38bdf8]/40">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-[#66d9ff]" />
              End-to-end encrypted
            </span>
            <span className="text-[#38bdf8]/40">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Globe className="h-3.5 w-3.5 text-[#a5e9ff]" />
              Instant browser access
            </span>
          </motion.div>
        </div>

        {/* Hero Showcase Window — Winter Ice UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 relative rounded-3xl border border-[#38bdf8]/30 bg-[#07111f]/90 shadow-[0_25px_100px_rgba(56,189,248,0.2)] overflow-hidden backdrop-blur-2xl ring-1 ring-white/10"
        >
          {/* Top Ice Reflection Bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#66d9ff]/80 to-transparent" />

          {/* Window Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#38bdf8]/20 bg-[#06101d] px-5 py-3.5 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-cyan-400/80 inline-block shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                <span className="h-3 w-3 rounded-full bg-sky-300/60 inline-block" />
                <span className="h-3 w-3 rounded-full bg-blue-500/50 inline-block" />
              </div>
              <div className="flex items-center gap-2 pl-2">
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  NOIR ARCHIVE WEB VAULT
                </span>
                <span className="rounded bg-[#38bdf8]/15 px-2 py-0.5 font-mono text-[10px] text-[#a5e9ff] border border-[#38bdf8]/30">
                  PRODUCTION v4.2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#66d9ff] animate-ping" />
                <span className="text-[#a5e9ff] font-semibold">100% Operational</span>
              </div>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-400">Zero Loss Active</span>
            </div>
          </div>

          {/* Showcase Visual Content — Sleek Dashboard Showcase */}
          <div className="relative p-6 sm:p-10 bg-gradient-to-b from-[#07111f] to-[#050b14]">
            {/* Top Quick Stats Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5e9ff]/70">TRANSFER COMPRESSION</span>
                <div className="mt-1 font-sans text-2xl font-black text-white">0% Loss</div>
                <p className="mt-0.5 text-xs text-slate-400">RAW & ProRes Bit-for-Bit</p>
              </div>
              <div className="rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5e9ff]/70">INTEGRITY ALGORITHM</span>
                <div className="mt-1 font-sans text-2xl font-black text-[#66d9ff]">SHA-256</div>
                <p className="mt-0.5 text-xs text-slate-400">Hardware Verified Checksums</p>
              </div>
              <div className="rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5e9ff]/70">CLIENT ACCESS</span>
                <div className="mt-1 font-sans text-2xl font-black text-white">Instant ZIP</div>
                <p className="mt-0.5 text-xs text-slate-400">No account required</p>
              </div>
              <div className="rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5e9ff]/70">SECURITY PROTOCOL</span>
                <div className="mt-1 font-sans text-2xl font-black text-[#a5e9ff]">AES-GCM</div>
                <p className="mt-0.5 text-xs text-slate-400">Custom password portals</p>
              </div>
            </div>

            {/* Showcase Visual Asset Preview */}
            <div className="relative rounded-2xl border border-[#38bdf8]/20 bg-[#040810] overflow-hidden shadow-2xl">
              <img
                src="/assets/aistudio/image_736912ac.png"
                alt="Noir Archive Web Application Preview"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
              {/* Frost Gradient Overlay for seamless blending */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Interactive Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#38bdf8]/15 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-[#07111f] bg-sky-500/30 flex items-center justify-center text-xs font-bold text-white">M</div>
                  <div className="h-8 w-8 rounded-full border-2 border-[#07111f] bg-cyan-500/30 flex items-center justify-center text-xs font-bold text-white">E</div>
                  <div className="h-8 w-8 rounded-full border-2 border-[#07111f] bg-blue-500/30 flex items-center justify-center text-xs font-bold text-white">K</div>
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  Thousands of creative studios & archivists collaborating live
                </span>
              </div>

              <a
                href="https://noirarchive.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#38bdf8]/15 px-4 py-2 text-xs font-bold text-[#a5e9ff] border border-[#38bdf8]/30 hover:bg-[#38bdf8] hover:text-[#050b14] transition-all no-underline"
              >
                <span>Launch Web Application</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
