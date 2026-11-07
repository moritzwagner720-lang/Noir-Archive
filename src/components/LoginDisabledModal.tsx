import React from 'react';
import { X, CheckCircle2, Download } from 'lucide-react';
import { NavigationIconImg, WindowsIcon } from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface LoginDisabledModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownload: () => void;
  onOpenBrowserApp?: () => void;
}

export const LoginDisabledModal: React.FC<LoginDisabledModalProps> = ({
  isOpen,
  onClose,
  onOpenDownload,
}) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    await downloadSetupExe();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-orange-500/30 bg-[#0f0e13] text-white p-6 sm:p-8 shadow-[0_20px_80px_rgba(255,107,0,0.25)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 rounded-xl p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#ff6b00] p-3 flex items-center justify-center shadow-xl shadow-orange-500/30 mb-4">
            <NavigationIconImg className="h-10 w-10 object-contain" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-mono text-emerald-400 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Open Access Mode Active</span>
          </div>

          <h3 className="font-sans text-xl font-bold text-white">
            No Login or Registration Required
          </h3>

          <p className="mt-2 text-xs text-neutral-300 leading-relaxed max-w-xs">
            Login and registration barriers have been disabled. You can download the native Windows setup installer directly.
          </p>
        </div>

        {/* Unlocked Details */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 space-y-2 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
            <span>Direct Windows desktop client setup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
            <span>Zero-compression file vaults and uncompressed transfers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
            <span className="font-mono text-neutral-200">dist-electron\Setup.exe</span>
          </div>
        </div>

        {/* Action Button: Download */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href="/downloads/Setup.exe"
            download="Noir Archive Setup.exe"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6b00] py-3 px-4 font-sans text-xs font-bold text-black shadow-lg shadow-orange-500/30 hover:bg-[#ff7d1f] transition-all cursor-pointer no-underline"
          >
            <Download className="h-4 w-4" />
            <span>Download Desktop App (Setup.exe)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
