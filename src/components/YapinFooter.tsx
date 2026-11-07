import React from 'react';
import { NavigationIconImg } from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface YapinFooterProps {
  onOpenDownload: () => void;
  onOpenDevelopers: () => void;
  onOpenPlus: () => void;
  onOpenBrowserApp?: () => void;
}

export const YapinFooter: React.FC<YapinFooterProps> = ({
  onOpenDownload,
  onOpenDevelopers,
  onOpenPlus,
}) => {
  const triggerDownload = () => {
    downloadSetupExe();
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#090a0d] pt-16 pb-12 text-white">
      
      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand Info (Left Column) */}
          <div className="md:col-span-5 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-2xl bg-[#ff6b00] p-1.5 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <NavigationIconImg className="h-6 w-6 object-contain" />
              </div>
              <span className="font-sans text-xl font-extrabold tracking-tight text-white">
                Noir Archive
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed">
              A minimalist high-speed file vault and zero-compression client file delivery archive.
            </p>
          </div>

          {/* 3 Columns: PRODUCT, COMMUNITY, LEGAL */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Column 1: PRODUCT */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
                PRODUCT
              </h4>
              <ul className="space-y-2.5 text-neutral-300">
                <li>
                  <a
                    href="/downloads/Setup.exe"
                    download="Noir Archive Setup.exe"
                    className="hover:text-white transition-colors text-left cursor-pointer no-underline block"
                  >
                    Download Desktop (.exe)
                  </a>
                </li>
                <li>
                  <button onClick={onOpenDevelopers} className="hover:text-white transition-colors text-left cursor-pointer">
                    Developers & API
                  </button>
                </li>
                <li>
                  <button onClick={onOpenPlus} className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                    <span>Noir Plus</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
                  </button>
                </li>
                <li>
                  <button onClick={triggerDownload} className="hover:text-white transition-colors text-left cursor-pointer">
                    Client Portals
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("FanKit: Download Noir Archive brand kit & icons!")} className="hover:text-white transition-colors text-left cursor-pointer">
                    FanKit & Assets
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Roadmap: Offline desktop synchronization & batch hash verification.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Roadmap
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Bug Bounty: Submit security tickets to security@noirarchive.gg")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Bugs & Feedback
                  </button>
                </li>
                <li>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Status: Vault online</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2: COMMUNITY */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
                COMMUNITY
              </h4>
              <ul className="space-y-2.5 text-neutral-300">
                <li>
                  <button onClick={triggerDownload} className="hover:text-white transition-colors text-left cursor-pointer">
                    Public Archives
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Guidelines: Community vault standards & open data compliance.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Guidelines
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Archive Engine: Batch transfer caching & checksum tooling.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Archive Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Partners: Independent studios, developers & teams.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Partners
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: LEGAL */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
                LEGAL
              </h4>
              <ul className="space-y-2.5 text-neutral-300">
                <li>
                  <button onClick={() => alert("Terms of Service: Free, open and fair.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Terms
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Privacy: End-to-end encrypted, zero data selling.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Privacy
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Copyright: You retain 100% rights to your work.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Copyright
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Security: TLS 1.3, SHA-256 signatures, encrypted vaults.")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Security
                  </button>
                </li>
                <li>
                  <button onClick={() => alert("Contact: support@noirarchive.gg")} className="hover:text-white transition-colors text-left cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © 2026 Noir Archive LLC. Free to use.
          </div>
          <div className="text-neutral-400">
            Made for teams & creators who deliver.
          </div>
        </div>

      </div>

      {/* Subtle watermark text of Noir Archive */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none opacity-[0.06] overflow-hidden whitespace-nowrap">
        <span className="font-sans text-[120px] sm:text-[180px] md:text-[230px] font-black tracking-tight text-[#ff6b00]">
          Noir Archive
        </span>
      </div>
    </footer>
  );
};
