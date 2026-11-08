import React, { useState } from 'react';
import {
  Search,
  Users,
  Compass,
  ArrowRight,
  HardDrive,
  FolderOpen,
  Download,
  Package,
  ExternalLink,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { downloadSetupExe } from '../utils/downloadSetup';
import { UserAvatar } from './UserAvatar';

export const YapinFeatures: React.FC = () => {
  const {
    users,
    theme,
  } = useApp();

  const isLight = theme === 'light';
  const [serverSearch, setServerSearch] = useState('');

  const publicVaults = [
    {
      id: 's1',
      name: 'Noir Archive Headquarters',
      tagline: 'The Official File Vault & Data Hub',
      members: '76,230',
      icon: '📁',
      category: 'Official Vault',
      filesCount: '1,420 files',
      size: '84.2 GB',
    },
    {
      id: 's2',
      name: 'Open Systems Archive',
      tagline: 'Direct uncompressed packages, developer assets & ISOs',
      members: '18,490',
      icon: '⚙️',
      category: 'Developer Hub',
      filesCount: '920 files',
      size: '142.0 GB',
    },
    {
      id: 's3',
      name: 'Client Delivery Hub',
      tagline: 'Zero-compression batch packages & single-click ZIP archives',
      members: '12,850',
      icon: '📦',
      category: 'Client Portals',
      filesCount: '3,840 files',
      size: '290.5 GB',
    },
  ];

  const filteredVaults = serverSearch.trim()
    ? publicVaults.filter(s =>
        s.name.toLowerCase().includes(serverSearch.toLowerCase()) ||
        s.tagline.toLowerCase().includes(serverSearch.toLowerCase()) ||
        s.category.toLowerCase().includes(serverSearch.toLowerCase())
      )
    : publicVaults;

  const triggerDownload = () => {
    downloadSetupExe();
  };

  return (
    <div className="py-16 sm:py-24 space-y-28 sm:space-y-36">
      
      {/* FEATURE 1: DISCOVER — Find your community vaults */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b00]">
              DISCOVER
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Find your community vaults
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Public vaults you can search by topic, project, or category. Explore archives, stage folder deliveries, or host shared datasets with zero loss.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-4 py-2.5 text-xs font-bold text-black hover:bg-[#ff7d1f] transition-all cursor-pointer shadow-md no-underline inline-flex"
              >
                <span>Get Desktop App for Full Vault Access</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Visual Window: Discover public vaults */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-white/[0.12] bg-[#101115] p-5 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.7)]">
              
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <Compass className="h-4 w-4 text-[#ff6b00]" />
                  <span>Discover Public Vaults</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-neutral-400">
                    76k+ members online
                  </span>
                </div>
              </div>

              {/* Title inside mockup */}
              <div className="mb-4">
                <h3 className="font-sans text-lg font-bold text-white">Find your archives</h3>
                <p className="text-xs text-neutral-400">Public data repositories on Noir Archive. Search by tag, category, or creator.</p>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={serverSearch}
                  onChange={e => setServerSearch(e.target.value)}
                  placeholder="Search file archives, raw packages, presets..."
                  className="w-full rounded-xl border border-white/10 bg-[#16171d] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
                />
              </div>

              <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3">
                FEATURED VAULTS
              </div>

              {/* Vault Cards */}
              <div className="space-y-3">
                {filteredVaults.map(vault => (
                  <motion.div
                    key={vault.id}
                    whileHover={{ y: -2 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15161c] p-4 transition-all hover:border-orange-500/50 hover:bg-[#1a1b22]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-tr from-[#ff6b00] to-amber-500 flex items-center justify-center text-lg shadow-md">
                          {vault.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#ff6b00] transition-colors truncate">
                              {vault.name}
                            </h4>
                            <span className="hidden sm:inline-block rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                              {vault.category}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 truncate">{vault.tagline}</p>
                          <div className="mt-1 flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                            <span>{vault.members} members</span>
                            <span>·</span>
                            <span>{vault.filesCount}</span>
                            <span>·</span>
                            <span className="text-[#ff6b00]">{vault.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <button
                          onClick={triggerDownload}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#ff6b00] hover:text-black hover:border-[#ff6b00] transition-all cursor-pointer"
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURE 2: DIRECT TRANSFERS & CLIENT DELIVERIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Visual Window matching user attachment image_7e4a9ecb.png */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="rounded-3xl border border-white/[0.12] bg-[#101115] shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* Window Top Bar: Non-interactive small tabs */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#16171b] px-4 py-3 gap-2">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Users className="h-4 w-4 text-[#ff6b00]" />
                    Clients & Collaborators
                  </span>

                  {/* Non-interactive small tabs matching exact screenshot styling */}
                  <div className="flex items-center gap-1.5 text-xs select-none pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-white/15 text-white font-bold">
                      Team & Clients
                    </span>
                    <span className="px-2.5 py-1 text-neutral-400">
                      Active Packages (0)
                    </span>
                    <span className="px-2.5 py-1 text-neutral-400">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-neutral-400">Vault Sync Online</span>
                </div>
              </div>

              {/* Window Body */}
              <div className="flex min-h-[340px] divide-x divide-white/[0.06]">
                
                {/* Left Mini Column: Non-interactive static badges */}
                <div className="w-52 shrink-0 bg-[#131418] p-3 hidden sm:block">
                  <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                    ACTIVE ARCHIVES
                  </div>
                  
                  <div className="space-y-1">
                    <div className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-neutral-400 select-none pointer-events-none">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#ff6b00]" />
                        <span>Deliveries</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#ff6b00]">0</span>
                    </div>

                    <div className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-white bg-white/10 select-none pointer-events-none">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-emerald-400" />
                        <span>Contacts</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">4</span>
                    </div>

                    <div className="pt-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-2 mb-1">
                        <span>INTEGRITY STATUS</span>
                      </div>
                      <div className="px-2 py-1 rounded bg-white/5 text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 select-none pointer-events-none">
                        <ShieldCheck className="h-3 w-3" />
                        <span>0% Loss Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Main Content: Active Creative Collaborators with Colorful First-Letter Avatars */}
                <div className="flex-1 bg-[#1a1b20] p-4 sm:p-5 overflow-y-auto max-h-[380px]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-xs font-bold text-white">Active Creative Collaborators</span>
                      <span className="text-[11px] font-mono text-emerald-400">Ready for instant delivery</span>
                    </div>

                    {users.slice(0, 4).map(u => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#131418] p-3"
                      >
                        <div className="flex items-center gap-3">
                          {/* Colorful First-Letter Profile Picture with Online Status Indicator */}
                          <UserAvatar
                            username={u.username}
                            name={u.username}
                            size="md"
                            showOnline={true}
                          />
                          <div>
                            <div className="font-sans font-bold text-xs text-white">
                              @{u.username}
                            </div>
                            <div className="text-[11px] text-neutral-400 truncate max-w-[180px]">
                              {u.bio || 'Digital creator & archivist'}
                            </div>
                          </div>
                        </div>

                        <span className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-mono text-neutral-400">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b00]">
              TEAM DIRECTORIES
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              One list, everyone you collaborate with
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Clients, teammates, and creative partners in a single column. Access shared digital vaults with byte-for-byte fidelity and zero compression artifacts.
            </p>

            <div className="mt-6">
              <a
                href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#ff6b00] px-5 py-3 font-sans text-xs font-bold text-black hover:bg-[#ff7d1f] transition-all cursor-pointer shadow-lg shadow-orange-500/20 no-underline inline-flex"
              >
                <span>Download Desktop App</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

