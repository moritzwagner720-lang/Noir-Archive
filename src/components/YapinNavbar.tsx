import React from 'react';
import { Sun, Moon, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationIconImg } from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface YapinNavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenDownload: () => void;
  onOpenDevelopers: () => void;
  onOpenLoginModal?: () => void;
}

export const YapinNavbar: React.FC<YapinNavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenDownload,
  onOpenDevelopers,
}) => {
  const isLight = theme === 'light';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
        isLight
          ? 'border-stone-200/80 bg-[#fcf8f5]/90 text-stone-900'
          : 'border-white/[0.08] bg-[#0c0d10]/90 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-9 w-9 rounded-2xl bg-[#ff6b00] p-1.5 flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <NavigationIconImg className="h-6 w-6 object-contain" />
            </motion.div>

            <span className="font-sans text-xl font-extrabold tracking-tight group-hover:text-[#ff6b00] transition-colors">
              Noir Archive
            </span>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-semibold transition-colors cursor-pointer no-underline ${
              isLight ? 'text-stone-600 hover:text-stone-900' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Download
          </a>

          <button
            onClick={onOpenDevelopers}
            className={`text-xs font-semibold transition-colors cursor-pointer ${
              isLight ? 'text-stone-600 hover:text-stone-900' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Developers & API
          </button>
        </nav>

        {/* Right Actions: Theme Toggle + Download Pill */}
        <div className="flex items-center gap-3">
          {/* Sun/Moon Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            title="Toggle Theme"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
              isLight
                ? 'text-stone-700 hover:bg-stone-200/70'
                : 'text-neutral-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isLight ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </motion.button>

          {/* Action Button: Orange Pill */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/tag/v1.0.0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#ff6b00] px-4 py-2 font-sans text-xs font-bold text-black shadow-md shadow-orange-950/40 hover:bg-[#ff7d1f] transition-all cursor-pointer no-underline"
          >
            <Download className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Download</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};
