import React, { useState } from 'react';
import {
  X,
  Download,
  CheckCircle2,
  HardDrive,
  Cpu,
  ShieldCheck,
  Play,
  FileCode,
} from 'lucide-react';
import {
  NavigationIconImg,
  WindowsIcon,
  SetupIcon,
} from './Icons';
import { downloadSetupExe } from '../utils/downloadSetup';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchBrowserApp?: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState('');
  const [showWizardSim, setShowWizardSim] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [installProgress, setInstallProgress] = useState(0);

  if (!isOpen) return null;

  // Real file download trigger pointing to dist-electron/Setup.exe (in-tab, no new tab)
  const handleDownloadSetup = async () => {
    setDownloadFilename('Setup.exe');
    setDownloadStarted(true);

    await downloadSetupExe();

    setTimeout(() => {
      setDownloadStarted(false);
    }, 4500);
  };

  // Run virtual Windows Setup Wizard simulation
  const startWizardSimulation = () => {
    setShowWizardSim(true);
    setWizardStep(1);
    setInstallProgress(0);
  };

  const advanceToInstall = () => {
    setWizardStep(2);
    let current = 0;
    const interval = setInterval(() => {
      current += 8;
      if (current >= 100) {
        current = 100;
        setInstallProgress(100);
        clearInterval(interval);
        setTimeout(() => setWizardStep(3), 400);
      } else {
        setInstallProgress(current);
      }
    }, 110);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-orange-500/30 bg-[#0e0e12] text-white shadow-[0_20px_80px_rgba(255,107,0,0.25)] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#ff6b00] p-1.5 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <NavigationIconImg className="h-6 w-6 object-contain" />
            </div>
            <div>
              <h2 className="font-sans text-lg font-bold flex items-center gap-2">
                Download Noir Archive Desktop
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-mono text-[#ff6b00]">
                  v2.4.0
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Official Windows Desktop Client & Setup Installer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close download modal"
            className="rounded-xl p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Windows OS Badge Bar (Only Windows) */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <WindowsIcon className="h-4 w-4" colorMode="fluent" />
            <span>Windows 10 / 11 (64-bit)</span>
            <span className="text-[10px] rounded bg-orange-500/20 px-2 py-0.5 text-[#ff6b00] font-mono">
              Setup.exe
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Target: dist-electron\Setup.exe
          </span>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {/* Download Notification Banner */}
          {downloadStarted && (
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-xs text-emerald-400 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                <span>
                  Downloading <strong className="text-white">dist-electron\Setup.exe</strong> to your computer...
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-300">Ready in Downloads</span>
            </div>
          )}

          {/* Windows Installer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Main Setup Installer (.exe) */}
            <div className="relative rounded-2xl border border-orange-500/40 bg-gradient-to-b from-orange-500/[0.12] to-transparent p-5 hover:border-orange-500/70 transition-all flex flex-col justify-between shadow-lg shadow-orange-950/30">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <SetupIcon className="h-9 w-9 text-orange-500" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <WindowsIcon className="h-3.5 w-3.5" colorMode="fluent" />
                        <h3 className="font-sans font-bold text-sm text-white">
                          Setup.exe Installer
                        </h3>
                      </div>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        dist-electron\Setup.exe
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#ff6b00] px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                    Primary
                  </span>
                </div>

                <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                  Full guided Windows installer with automatic desktop shortcuts, Start Menu integration, and local file vault acceleration.
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Code Signed
                  </span>
                  <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-1">
                    <Cpu className="h-3 w-3 text-blue-400" /> 64-bit Native
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe"
                  download="Noir Archive Setup.exe"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleDownloadSetup();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff6b00] py-3 px-4 font-sans text-xs font-bold text-black shadow-lg shadow-orange-500/30 hover:bg-[#ff7d1f] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer no-underline"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Setup.exe</span>
                </a>

                <button
                  onClick={startWizardSimulation}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2 px-3 font-sans text-xs font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Simulate Windows Installation Wizard"
                >
                  <Play className="h-3.5 w-3.5 text-[#ff6b00]" />
                  <span>Preview Install Wizard</span>
                </button>
              </div>
            </div>

            {/* Portable Standalone Details */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                    <HardDrive className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-sm text-white">
                      Direct Binary Staging
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Windows 10 / 11 Ready
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                  Downloads the standalone setup executable directly from the repository build directory. Ready to run without prerequisite dependencies.
                </p>

                <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Path:</span>
                    <span className="font-mono text-[#ff6b00] text-[11px]">/downloads/Setup.exe</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Architecture:</span>
                    <span className="font-mono text-white text-[11px]">x64 (AMD64)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Security:</span>
                    <span className="font-mono text-emerald-400 text-[11px]">SHA-256 Verified</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe"
                  download="Noir Archive Setup.exe"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleDownloadSetup();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-3 px-4 font-sans text-xs font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer no-underline"
                >
                  <Download className="h-4 w-4 text-[#ff6b00]" />
                  <span>Download File directly</span>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Notice footer */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center text-xs text-neutral-400">
            Clicking download immediately retrieves <code className="text-[#ff6b00] font-mono font-semibold">Noir Archive Setup.exe</code> from <code className="text-[#ff6b00] font-mono font-semibold">/downloads/Setup.exe</code>.
          </div>
        </div>

        {/* Windows Setup Wizard Simulator Modal */}
        {showWizardSim && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
            <div className="w-full max-w-lg rounded-xl border border-neutral-700 bg-[#1e1e24] text-white shadow-2xl overflow-hidden font-sans text-xs">
              
              {/* Windows Window Titlebar */}
              <div className="flex items-center justify-between bg-[#2d2d34] px-4 py-2 border-b border-neutral-700 select-none">
                <div className="flex items-center gap-2">
                  <SetupIcon className="h-4 w-4" />
                  <span className="font-semibold text-neutral-200">
                    Noir Archive Setup — Installation Wizard (64-bit)
                  </span>
                </div>
                <button
                  onClick={() => setShowWizardSim(false)}
                  className="px-2 py-0.5 hover:bg-rose-600 rounded text-neutral-300 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Wizard Body */}
              <div className="p-6">
                {wizardStep === 1 && (
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-[#ff6b00] p-2 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                        <NavigationIconImg className="h-10 w-10 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          Welcome to the Noir Archive Setup Wizard
                        </h4>
                        <p className="mt-1 text-neutral-300 leading-relaxed text-xs">
                          This wizard will install Noir Archive Desktop v2.4.0 on your computer.
                          High-speed file vaults, uncompressed ZIP batch delivery, client transfers, and offline caching.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-neutral-700 bg-black/30 p-3 space-y-1.5 text-[11px] text-neutral-400">
                      <div className="flex justify-between">
                        <span>Binary Source:</span>
                        <span className="font-mono text-neutral-300">dist-electron\Setup.exe</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Install Location:</span>
                        <span className="font-mono text-neutral-300">C:\Users\User\AppData\Local\NoirArchive</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shortcuts:</span>
                        <span className="font-mono text-neutral-300">Desktop & Start Menu</span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                      <button
                        onClick={() => setShowWizardSim(false)}
                        className="rounded-lg border border-neutral-600 px-4 py-1.5 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={advanceToInstall}
                        className="rounded-lg bg-[#ff6b00] px-5 py-1.5 font-bold text-black hover:bg-[#ff7d1f] cursor-pointer"
                      >
                        Install
                      </button>
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">
                      Installing Noir Archive Desktop...
                    </h4>
                    <p className="text-neutral-400 text-xs mb-4">
                      Extracting vault modules and configuring zero-compression transfer cache...
                    </p>

                    <div className="h-3 w-full rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
                      <div
                        className="h-full bg-[#ff6b00] transition-all duration-150 rounded-full"
                        style={{ width: `${installProgress}%` }}
                      />
                    </div>

                    <div className="mt-2 flex justify-between font-mono text-[11px] text-neutral-400">
                      <span>Extracting: noir-vault-engine.dll</span>
                      <span>{installProgress}%</span>
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="text-center py-2">
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Installation Completed Successfully!
                    </h4>
                    <p className="mt-1 text-xs text-neutral-300 max-w-sm mx-auto">
                      Noir Archive Desktop is installed and ready on your PC.
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                      <a
                        href="https://github.com/moritzwagner720-lang/noir-archive-downloads/releases/latest/download/Setup.exe"
                        download="Noir Archive Setup.exe"
                        onClick={() => {
                          setShowWizardSim(false);
                          downloadSetupExe();
                        }}
                        className="rounded-lg bg-[#ff6b00] px-5 py-2 font-bold text-black hover:bg-[#ff7d1f] cursor-pointer no-underline inline-flex items-center gap-1.5"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download Setup.exe</span>
                      </a>
                      <button
                        onClick={() => setShowWizardSim(false)}
                        className="rounded-lg border border-neutral-600 px-4 py-2 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
