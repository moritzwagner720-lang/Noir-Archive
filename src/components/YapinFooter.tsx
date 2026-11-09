import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Terminal, Shield, CheckCircle } from 'lucide-react';
import { NavigationIconImg } from './Icons';

interface YapinFooterProps {
  onOpenDownload?: () => void;
  onOpenDevelopers: () => void;
}

export const YapinFooter: React.FC<YapinFooterProps> = ({
  onOpenDevelopers,
}) => {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <footer className="relative overflow-hidden border-t border-[#38bdf8]/15 bg-[#050b14] pt-20 pb-12 text-[#f4faff]">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[800px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1)_0%,transparent_75%)] blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Info (Left Column) */}
          <div className="md:col-span-5 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#66d9ff] to-[#0284c7] p-2 flex items-center justify-center shadow-[0_0_25px_rgba(102,217,255,0.4)] ring-1 ring-white/30">
                <NavigationIconImg className="h-6 w-6 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-black tracking-tight text-white">
                  NOIR ARCHIVE
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#a5e9ff]/70 -mt-0.5">
                  Lossless Digital Storage
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              A high-speed digital vault and zero-compression web application. Preserving original file integrity, embedded EXIF metadata, and direct client pipelines.
            </p>

            <div className="mt-6 flex items-center gap-2.5 rounded-full border border-[#38bdf8]/20 bg-[#07111f] px-3.5 py-1.5 w-fit text-xs font-mono text-[#a5e9ff]">
              <span className="h-2 w-2 rounded-full bg-[#66d9ff] animate-pulse" />
              <span>Network Status: All Systems Operational</span>
            </div>
          </div>

          {/* 3 Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Column 1: PLATFORM */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#66d9ff] mb-4">
                PLATFORM
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a
                    href="https://noirarchive.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#66d9ff] transition-colors no-underline"
                  >
                    <span>Launch Web App</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenDevelopers}
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Developers & API
                  </button>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-[#66d9ff] transition-colors text-left no-underline block"
                  >
                    Vault Capabilities
                  </a>
                </li>
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-[#66d9ff] transition-colors text-left no-underline block"
                  >
                    Public Directory
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: ECOSYSTEM */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#66d9ff] mb-4">
                ECOSYSTEM
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a
                    href="#network"
                    className="hover:text-[#66d9ff] transition-colors text-left no-underline block"
                  >
                    Studio Network
                  </a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setNotice('Open Data Compliance: Standard uncompressed format retention.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Integrity Standard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setNotice('SHA-256 Checksums: Automatic validation on all incoming files.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Fidelity Engine
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setNotice('Creative Studios: Partner program for enterprise batch archives.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Studio Partners
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SECURITY & LEGAL */}
            <div>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#66d9ff] mb-4">
                SECURITY
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <button
                    onClick={() =>
                      setNotice('Security: Client deliveries protected with TLS 1.3 and AES-GCM.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Encryption Specs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setNotice('Privacy: No telemetry tracking, zero ad cookies, absolute confidentiality.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setNotice('Terms: Free web application with perpetual archive access.')
                    }
                    className="hover:text-[#66d9ff] transition-colors text-left cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:contact@noirarchive.onrender.com"
                    className="hover:text-[#66d9ff] transition-colors text-left no-underline block"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Temporary Notice Banner */}
        {notice && (
          <div className="mt-8 rounded-2xl border border-[#38bdf8]/30 bg-[#07111f] px-5 py-3 text-xs text-[#a5e9ff] flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#66d9ff]" />
              {notice}
            </span>
            <button
              onClick={() => setNotice(null)}
              className="text-slate-400 hover:text-white ml-4 font-mono text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Bottom Row */}
        <div className="mt-16 pt-8 border-t border-[#38bdf8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© 2026 Noir Archive. All rights reserved.</div>
          <div className="text-slate-400">
            Engineered for lossless digital storage & uncompressed media delivery.
          </div>
        </div>
      </div>
    </footer>
  );
};
