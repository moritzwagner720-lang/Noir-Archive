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
} from 'lucide-react';
import { downloadSetupExe } from '../utils/downloadSetup';

export const YapinFeatures: React.FC<{ onOpenBrowserApp?: () => void }> = ({
  onOpenBrowserApp,
}) => {
  const [serverSearch, setServerSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'online' | 'all' | 'pending' | 'blocked' | 'add'>('online');
  const [clientInput, setClientInput] = useState('');
  const [transferSent, setTransferSent] = useState(false);

  const publicVaults = [
    {
      id: 's1',
      name: 'Noir Archive Headquarters',
      tagline: 'The Official File Vault & Data Hub',
      members: '76,230',
      icon: '📁',
    },
    {
      id: 's2',
      name: 'Open Systems Archive',
      tagline: 'Direct uncompressed packages, developer assets & ISOs',
      members: '18,490',
      icon: '⚙️',
    },
    {
      id: 's3',
      name: 'Client Delivery Hub',
      tagline: 'Zero-compression batch packages & single-click ZIP archives',
      members: '12,850',
      icon: '📦',
    },
  ];

  const filteredVaults = serverSearch.trim()
    ? publicVaults.filter(s =>
        s.name.toLowerCase().includes(serverSearch.toLowerCase()) ||
        s.tagline.toLowerCase().includes(serverSearch.toLowerCase())
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
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b00]">
              DISCOVER
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Find your community vaults
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Public vaults you can search by topic, project, or category. Explore archives, stage folder deliveries, or host shared datasets with zero loss.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={triggerDownload}
                className="flex items-center gap-2 text-xs font-bold text-[#ff6b00] hover:text-[#ff8533] transition-colors cursor-pointer"
              >
                <span>Get Desktop App for Full Vault Access</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Window: Discover public vaults */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.12] bg-[#101115] p-5 sm:p-7 shadow-[0_20px_70px_rgba(0,0,0,0.7)]">
              
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <Compass className="h-4 w-4 text-[#ff6b00]" />
                  <span>Discover Public Vaults</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  76k+ members online
                </span>
              </div>

              {/* Title inside mockup */}
              <div className="mb-4">
                <h3 className="font-sans text-lg font-bold text-white">Find your archives</h3>
                <p className="text-xs text-neutral-400">Public data repositories on Noir Archive. Search by tag or category.</p>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={serverSearch}
                  onChange={e => setServerSearch(e.target.value)}
                  placeholder="Search file archives..."
                  className="w-full rounded-xl border border-white/10 bg-[#16171d] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-500 focus:border-[#ff6b00] focus:outline-none transition-colors"
                />
              </div>

              <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-3">
                FEATURED VAULTS
              </div>

              {/* Vault Cards */}
              <div className="space-y-3">
                {filteredVaults.map(vault => (
                  <div
                    key={vault.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15161c] p-4 transition-all hover:border-orange-500/50 hover:bg-[#1a1b22]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#ff6b00] to-amber-500 flex items-center justify-center text-lg shadow-md">
                          {vault.icon}
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-white group-hover:text-[#ff6b00] transition-colors">
                            {vault.name}
                          </h4>
                          <p className="text-xs text-neutral-400">{vault.tagline}</p>
                          <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                            <span className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              {vault.members} active users
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={triggerDownload}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#ff6b00] hover:text-black hover:border-[#ff6b00] transition-all cursor-pointer"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURE 2: DIRECT TRANSFERS & CLIENT DELIVERIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Visual Window */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="rounded-3xl border border-white/[0.12] bg-[#101115] shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* DM Top Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/[0.08] bg-[#16171b] px-4 py-3 gap-2">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-white">
                    <Users className="h-4 w-4 text-[#ff6b00]" />
                    Clients & Collaborators
                  </span>

                  <div className="flex items-center gap-1 text-xs">
                    {(['online', 'all', 'pending'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-2 py-1 rounded-md transition-colors capitalize ${
                          activeTab === tab ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('add')}
                  className="rounded-lg bg-[#ff6b00] px-3 py-1 text-xs font-bold text-black hover:bg-[#ff7d1f] transition-colors cursor-pointer"
                >
                  Send Transfer
                </button>
              </div>

              {/* Window Body */}
              <div className="flex h-[320px] divide-x divide-white/[0.06]">
                
                {/* Left Mini Column */}
                <div className="w-52 shrink-0 bg-[#131418] p-3 hidden sm:block">
                  <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                    ACTIVE ARCHIVES
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 text-xs font-semibold text-white">
                      <Package className="h-4 w-4 text-[#ff6b00]" />
                      <span>Deliveries</span>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 px-2 mb-1">
                        <span>DATA PACKAGES</span>
                      </div>
                      <p className="px-2 text-[11px] text-neutral-500 italic">
                        Select a recipient or generate a direct link.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Main Content */}
                <div className="flex-1 bg-[#1a1b20] p-6 flex flex-col justify-center items-center text-center">
                  {activeTab === 'add' ? (
                    <div className="w-full max-w-sm space-y-3">
                      <h4 className="font-sans font-bold text-sm text-white">NEW FILE TRANSFER</h4>
                      <p className="text-xs text-neutral-400">
                        Deliver full-resolution packages and folders directly to any recipient.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={clientInput}
                          onChange={e => setClientInput(e.target.value)}
                          placeholder="Recipient handle or email..."
                          className="flex-1 rounded-xl border border-white/10 bg-[#141519] px-3 py-2 text-xs text-white focus:border-[#ff6b00] focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            if (!clientInput.trim()) return;
                            setTransferSent(true);
                            setTimeout(() => setTransferSent(false), 3000);
                          }}
                          className="rounded-xl bg-[#ff6b00] px-4 py-2 text-xs font-bold text-black hover:bg-[#ff7d1f] cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                      {transferSent && (
                        <p className="text-xs text-emerald-400 font-mono">
                          Direct transfer created for {clientInput}!
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="mx-auto h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mb-3">
                        <Users className="h-6 w-6 text-[#ff6b00]" />
                      </div>
                      <h4 className="font-sans font-bold text-sm text-white">
                        Direct Client Staging
                      </h4>
                      <p className="mt-1 text-xs text-neutral-400 font-sans max-w-xs">
                        Ready to transfer uncompressed files with custom password protection and instant ZIP packing.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b00]">
              DIRECT DELIVERIES
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              One list, everyone you share with
            </h2>

            <p className="mt-5 text-sm sm:text-base text-neutral-300 leading-relaxed">
              Clients, teammates, and partners in a single column. Transfer entire directories with byte-for-byte fidelity and zero compression artifacts.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
