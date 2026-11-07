import React from 'react';
import { Sun, Moon, ArrowRight, Download, Sparkles, FolderOpen } from 'lucide-react';
import { NavigationIconImg } from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface YapinNavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenDownload: () => void;
  onOpenDevelopers: () => void;
  onOpenPlus: () => void;
  onOpenLoginModal: () => void;
}

export const YapinNavbar: React.FC<YapinNavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenDownload,
  onOpenDevelopers,
  onOpenPlus,
  onOpenLoginModal,
}) => {
  const isLight = theme === 'light';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0c0d10]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand / Logo (Noir Archive with White Navigation arrow icon) */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            {/* Orange rounded icon container with white navigation arrow */}
            <div className="h-9 w-9 rounded-2xl bg-[#ff6b00] p-1.5 flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105 active:scale-95">
              <NavigationIconImg className="h-6 w-6 object-contain" />
            </div>

            <span className="font-sans text-xl font-extrabold tracking-tight text-white group-hover:text-neutral-100 transition-colors">
              Noir Archive
            </span>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onOpenDownload}
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Download
          </button>
          <button
            onClick={onOpenDevelopers}
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Developers & API
          </button>
          <button
            onClick={onOpenPlus}
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Noir Plus</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
          </button>
        </nav>

        {/* Right Actions: Theme Toggle + Open Vault / Log In Button */}
        <div className="flex items-center gap-3">
          {/* Sun/Moon Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            title={`Toggle Theme`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            {isLight ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>

          {/* Action Button: Orange Pill */}
          <a
            href="/downloads/Setup.exe"
            download="Noir Archive Setup.exe"
            className="flex items-center gap-1.5 rounded-xl bg-[#ff6b00] px-4 py-2 font-sans text-xs font-bold text-black shadow-md shadow-orange-950/40 hover:bg-[#ff7d1f] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer no-underline"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </header>
  );
};
