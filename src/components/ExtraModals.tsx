import React from 'react';
import { X, Code2, Terminal, Webhook, ArrowUpRight, Copy, Check } from 'lucide-react';

export const DevelopersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @noir-archive/vault-sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#38bdf8]/35 bg-[#07111f] text-white p-6 sm:p-8 shadow-[0_20px_80px_rgba(56,189,248,0.25)] ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-[#38bdf8]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#38bdf8]/20 text-[#66d9ff] flex items-center justify-center border border-[#38bdf8]/30">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans text-lg font-bold text-white">Noir Archive Developer Portal</h3>
              <p className="text-xs text-[#a5e9ff]/70 font-mono">Vault REST API, Webhooks & Automated Pipelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-6 space-y-5 text-xs text-slate-300">
          <p className="text-sm leading-relaxed">
            Automate high-speed uncompressed deliveries, sync local studio directories directly to secure client portals, and generate hardware-verified download packages via the Noir Archive API.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="rounded-2xl border border-[#38bdf8]/20 bg-[#050b14] p-4">
              <Terminal className="h-5 w-5 text-[#66d9ff] mb-2.5" />
              <h4 className="font-bold text-white mb-1">CLI & REST Pipeline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Batch stream entire multi-gigabyte directories with automated SHA-256 calculation.
              </p>
            </div>
            <div className="rounded-2xl border border-[#38bdf8]/20 bg-[#050b14] p-4">
              <Webhook className="h-5 w-5 text-[#38bdf8] mb-2.5" />
              <h4 className="font-bold text-white mb-1">Client Event Webhooks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive instant webhooks when a client accesses, reviews, or completes downloading a package.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#38bdf8]/25 bg-[#03060c] p-4 font-mono text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[11px] block"># Install the official Node.js / TypeScript SDK</span>
              <div className="text-[#66d9ff] font-bold mt-1">$ npm install @noir-archive/vault-sdk</div>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-[#07111f] border border-[#38bdf8]/30 hover:border-[#66d9ff] text-[#a5e9ff] transition-all cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#38bdf8]/15">
          <a
            href="https://noirarchive.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#66d9ff] hover:underline inline-flex items-center gap-1"
          >
            <span>Launch Web App</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] px-5 py-2.5 font-sans text-xs font-bold text-[#050b14] hover:shadow-[0_0_20px_rgba(102,217,255,0.4)] transition-all cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
