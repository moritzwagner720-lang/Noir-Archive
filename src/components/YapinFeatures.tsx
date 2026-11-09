import React, { useState } from 'react';
import {
  Search,
  Users,
  Compass,
  ArrowUpRight,
  HardDrive,
  FolderOpen,
  Package,
  ShieldCheck,
  Lock,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { UserAvatar } from './UserAvatar';

export const YapinFeatures: React.FC = () => {
  const { users } = useApp();
  const [serverSearch, setServerSearch] = useState('');

  const publicVaults = [
    {
      id: 'v1',
      name: 'Noir Creative Archive HQ',
      tagline: 'Official repository for uncompressed master assets & design systems',
      members: '84,200',
      icon: '❄️',
      category: 'Master Vault',
      filesCount: '1,420 files',
      size: '94.2 GB',
      verified: true,
    },
    {
      id: 'v2',
      name: 'Open Cinema & RAW Footage',
      tagline: 'ProRes 4444 XQ, REDCODE RAW clips, and LUT libraries',
      members: '23,100',
      icon: '🎞️',
      category: 'Media Production',
      filesCount: '890 files',
      size: '340.5 GB',
      verified: true,
    },
    {
      id: 'v3',
      name: 'Global Architectural Portfolios',
      tagline: 'Lossless DNG digital negatives, darkroom prints, and high-res scans',
      members: '16,750',
      icon: '🏛️',
      category: 'Creative Hub',
      filesCount: '4,120 files',
      size: '185.0 GB',
      verified: true,
    },
  ];

  const filteredVaults = serverSearch.trim()
    ? publicVaults.filter(
        v =>
          v.name.toLowerCase().includes(serverSearch.toLowerCase()) ||
          v.tagline.toLowerCase().includes(serverSearch.toLowerCase()) ||
          v.category.toLowerCase().includes(serverSearch.toLowerCase())
      )
    : publicVaults;

  const coreCapabilities = [
    {
      icon: HardDrive,
      title: 'Zero-Compression Engine',
      description: 'Bit-for-bit fidelity preservation for RAW, 8K video, audio masters, and complex 3D scenes. No downsampling or artifact compression.',
      tag: 'Lossless Precision',
    },
    {
      icon: ShieldCheck,
      title: 'Hardware SHA-256 Checksums',
      description: 'Every uploaded block generates cryptographic verification hashes, guaranteeing that delivered client packages match original binaries.',
      tag: 'Cryptographic Proof',
    },
    {
      icon: Lock,
      title: 'Protected Client Portals',
      description: 'Deliver deliverables with custom passcodes, expiration dates, and one-click ZIP compilation directly to clients without account walls.',
      tag: 'Direct Delivery',
    },
    {
      icon: Zap,
      title: 'Instant Browser Streaming',
      description: 'Next-generation chunked transfers streaming at maximum line speed over encrypted TLS 1.3 connections.',
      tag: 'Zero Latency',
    },
  ];

  return (
    <div id="features" className="py-20 sm:py-32 space-y-28 sm:space-y-40 relative">
      {/* SECTION 1: CORE BENTO CAPABILITIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/30 bg-[#07111f] px-4 py-1.5 text-xs font-mono text-[#66d9ff] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>ENGINEERED FOR SUPREME FIDELITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            A vault built for the{' '}
            <span className="bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] bg-clip-text text-transparent">
              purest digital fidelity.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Designed from the ground up for creative directors, production studios, and archivists who refuse to compromise quality.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreCapabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl border border-[#38bdf8]/20 bg-gradient-to-b from-[#07111f] to-[#050b14] p-6 sm:p-7 shadow-lg backdrop-blur-xl transition-all hover:border-[#66d9ff]/50 hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#66d9ff] group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <span className="rounded-full bg-[#0d2238] border border-[#38bdf8]/20 px-2.5 py-1 text-[10px] font-mono text-[#a5e9ff]">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#66d9ff] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#38bdf8]/10 flex items-center text-xs font-semibold text-[#66d9ff] group-hover:text-white transition-colors">
                  <span>Explore feature</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: DISCOVER PUBLIC ARCHIVES */}
      <section id="architecture" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              DISCOVER & EXPLORE
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Community archives & public datasets.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore open data vaults categorized by project, genre, or media format. Stage public releases, distribute uncompressed presets, or discover curated creative libraries.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://noirarchive.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] px-6 py-3.5 text-xs font-bold text-[#050b14] shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(102,217,255,0.5)] transition-all no-underline"
              >
                <span>OPEN PUBLIC DIRECTORY</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>

          {/* Right Visual Window: Searchable Vaults */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-[#38bdf8]/25 bg-[#07111f]/95 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/10">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-[#38bdf8]/15 pb-4 mb-6">
                <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#38bdf8]/20 text-[#66d9ff]">
                    <Compass className="h-4 w-4" />
                  </div>
                  <span>Featured Public Vaults</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  <span className="text-xs font-mono text-[#a5e9ff]">
                    84,000+ members online
                  </span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a5e9ff]/60" />
                <input
                  type="text"
                  value={serverSearch}
                  onChange={e => setServerSearch(e.target.value)}
                  placeholder="Filter by tags, cinema formats, RAW datasets..."
                  className="w-full rounded-xl border border-[#38bdf8]/20 bg-[#050b14] py-3 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-[#66d9ff] focus:ring-1 focus:ring-[#66d9ff] focus:outline-none transition-all"
                />
              </div>

              {/* Vault Cards */}
              <div className="space-y-3.5">
                {filteredVaults.map(vault => (
                  <motion.div
                    key={vault.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="group relative overflow-hidden rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-4 transition-all hover:border-[#66d9ff]/50 hover:bg-[#0f2442]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0d2847] to-[#071526] border border-[#38bdf8]/30 text-xl shadow-md">
                          {vault.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#66d9ff] transition-colors truncate">
                              {vault.name}
                            </h4>
                            <span className="rounded bg-[#38bdf8]/20 px-2 py-0.5 text-[10px] font-mono text-[#a5e9ff] border border-[#38bdf8]/30">
                              {vault.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{vault.tagline}</p>
                          <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono text-slate-400">
                            <span>{vault.members} members</span>
                            <span className="text-[#38bdf8]/40">•</span>
                            <span>{vault.filesCount}</span>
                            <span className="text-[#38bdf8]/40">•</span>
                            <span className="text-[#66d9ff] font-semibold">{vault.size}</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://noirarchive.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 px-3.5 py-2 text-xs font-bold text-[#a5e9ff] hover:bg-[#38bdf8] hover:text-[#050b14] transition-all no-underline"
                      >
                        Explore
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: DIRECT TEAM PORTALS & COLLABORATION */}
      <section id="network" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Visual Window */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="rounded-3xl border border-[#38bdf8]/25 bg-[#07111f]/95 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl ring-1 ring-white/10 overflow-hidden">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#38bdf8]/15 bg-[#06101d] px-5 py-3.5 gap-2">
                <div className="flex items-center gap-3 text-xs font-bold text-white">
                  <Users className="h-4 w-4 text-[#66d9ff]" />
                  <span>Creative Directory & Team Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#66d9ff] animate-ping" />
                  <span className="text-[11px] font-mono text-[#a5e9ff]">Direct Pipe Online</span>
                </div>
              </div>

              {/* Collaborator Grid */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#38bdf8]/15">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Active Studio Collaborators
                  </span>
                  <span className="text-xs font-mono text-[#66d9ff]">Ready for instant transfer</span>
                </div>

                {users.slice(0, 4).map(u => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-2xl border border-[#38bdf8]/15 bg-[#0b1b30]/60 p-3.5 hover:border-[#66d9ff]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <UserAvatar username={u.username} name={u.username} size="md" showOnline={true} />
                      <div>
                        <div className="font-sans font-bold text-sm text-white">
                          @{u.username}
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                          {u.bio || 'Digital creator & archivist'}
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://noirarchive.onrender.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-[#38bdf8]/20 bg-[#07111f] px-3 py-1.5 text-xs font-mono font-semibold text-[#a5e9ff] hover:bg-[#38bdf8] hover:text-[#050b14] transition-all no-underline"
                    >
                      Connect
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
              NETWORK & TEAMS
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              One unified network for every collaborator.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Connect with photographers, motion designers, developers, and studios worldwide. Dispatch lossless packages, inspect metadata, and maintain perpetual archives without external dependencies.
            </p>

            <div className="mt-8">
              <a
                href="https://noirarchive.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] px-6 py-3.5 text-xs font-bold text-[#050b14] shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(102,217,255,0.5)] transition-all no-underline"
              >
                <span>ENTER THE NETWORK</span>
                <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
