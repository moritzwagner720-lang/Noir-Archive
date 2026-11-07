import React from 'react';
import { Download } from 'lucide-react';

interface YapinHeroProps {
  onOpenDownload: () => void;
  onOpenBrowserApp?: () => void;
}

export const YapinHero: React.FC<YapinHeroProps> = ({
  onOpenDownload,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Background ambient radial glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.14)_0%,rgba(255,107,0,0.03)_45%,transparent_75%)] blur-[90px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        
        {/* Main Hero Header */}
        <div className="max-w-3xl">
          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Your digital vault,
            <br />
            <span className="text-[#ff6b00]">with room to deliver.</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
            Noir Archive is where teams, studios, and creators store secure data archives, share uncompressed batch transfers, and deliver client packages with zero loss. Free to use, built for speed.
          </p>

          {/* Primary CTA: Direct download link with HTML download attribute */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/downloads/Setup.exe"
              download="Noir Archive Setup.exe"
              className="flex items-center gap-2.5 rounded-2xl bg-[#ff6b00] px-7 py-4 font-sans text-xs sm:text-sm font-bold text-black shadow-xl shadow-orange-500/25 hover:bg-[#ff7d1f] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer no-underline inline-flex"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>Download the desktop app</span>
            </a>
            
            <button
              onClick={onOpenDownload}
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Windows 10 / 11 · Noir Archive Setup.exe
            </button>
          </div>
        </div>

        {/* Hero Preview Picture Showcase (Using the user-uploaded image_736912ac.png) */}
        <div className="mt-12 relative rounded-3xl border border-orange-500/30 bg-[#090503] shadow-[0_25px_90px_rgba(255,107,0,0.18)] overflow-hidden">
          
          {/* Subtle top reflection glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

          {/* User's specified picture */}
          <div className="relative w-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src="/assets/aistudio/image_736912ac.png"
              alt="Noir Archive Vault Desktop Window"
              className="w-full h-auto object-contain select-none pointer-events-none block"
            />

            {/* Transparent overlay ensuring any small tabs in the picture are not working / decorative */}
            <div
              className="absolute inset-0 pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>

          {/* Bottom subtle status bar for the showcase */}
          <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0d0703] px-5 py-2.5 text-[11px] font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff6b00]" />
              <span>Noir Archive Vault // Midnight Engine</span>
            </div>
            <div className="text-neutral-500">
              Desktop Native Build · /downloads/Setup.exe
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
