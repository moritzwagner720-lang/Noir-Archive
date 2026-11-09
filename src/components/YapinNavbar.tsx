import React, { useState } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X, Sparkles, Terminal, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationIconImg } from './Icons';

interface YapinNavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenDownload?: () => void;
  onOpenDevelopers: () => void;
  onOpenLoginModal?: () => void;
}

export const YapinNavbar: React.FC<YapinNavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenDevelopers,
}) => {
  const isLight = theme === 'light';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Vault Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Network', href: '#network' },
    { label: 'Questions', href: '#faq' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        isLight
          ? 'border-cyan-900/10 bg-[#f4faff]/85 text-slate-900'
          : 'border-[#38bdf8]/15 bg-[#050b14]/80 text-[#f4faff] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#66d9ff] via-[#38bdf8] to-[#0284c7] p-2 shadow-[0_0_25px_rgba(102,217,255,0.45)] ring-1 ring-white/40"
            >
              <NavigationIconImg className="h-6 w-6 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <div className="flex flex-col">
              <span className="font-sans text-xl font-extrabold tracking-tight text-white group-hover:text-[#66d9ff] transition-colors">
                NOIR ARCHIVE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#a5e9ff]/70 -mt-0.5">
                Lossless Vault & Web App
              </span>
            </div>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-semibold tracking-wide transition-all cursor-pointer no-underline ${
                isLight
                  ? 'text-slate-600 hover:text-cyan-700'
                  : 'text-slate-300 hover:text-[#66d9ff] hover:drop-shadow-[0_0_12px_rgba(102,217,255,0.5)]'
              }`}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={onOpenDevelopers}
            className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              isLight
                ? 'text-slate-600 hover:text-cyan-700'
                : 'text-slate-300 hover:text-[#66d9ff]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>Developers & API</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle + Main CTA */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            title="Toggle Theme"
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all cursor-pointer ${
              isLight
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                : 'border-[#38bdf8]/20 bg-[#07111f] text-[#a5e9ff] hover:border-[#66d9ff]/50 hover:bg-[#0c1e36] hover:text-white'
            }`}
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.button>

          {/* Main Action Button: GET STARTED NOW */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://noirarchive.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hidden sm:inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#66d9ff] via-[#38bdf8] to-[#0284c7] px-5 py-2.5 font-sans text-xs font-bold text-[#050b14] shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all hover:shadow-[0_0_40px_rgba(102,217,255,0.6)] cursor-pointer no-underline"
          >
            <span className="relative z-10 tracking-wider">GET STARTED NOW</span>
            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle Navigation Menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#38bdf8]/25 bg-[#07111f] text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#66d9ff]" /> : <Menu className="h-5 w-5 text-[#66d9ff]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-[#38bdf8]/20 bg-[#07111f]/98 px-6 py-6 md:hidden backdrop-blur-2xl"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-200 hover:text-[#66d9ff] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDevelopers();
                }}
                className="flex items-center gap-2 text-left text-sm font-semibold text-slate-200 hover:text-[#66d9ff]"
              >
                <Terminal className="h-4 w-4 text-[#38bdf8]" />
                <span>Developers & API Portal</span>
              </button>

              <div className="pt-2">
                <a
                  href="https://noirarchive.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] py-3 text-xs font-bold text-[#050b14] shadow-lg shadow-cyan-500/30"
                >
                  <span>GET STARTED NOW</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
