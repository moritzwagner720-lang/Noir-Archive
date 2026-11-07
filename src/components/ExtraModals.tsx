import React from 'react';
import { X, Code2, Bot, Terminal, Webhook } from 'lucide-react';

export const DevelopersModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-orange-500/30 bg-[#0f0e13] text-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-[#ff6b00] flex items-center justify-center border border-orange-500/30">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-white">Noir Archive Developer Portal</h3>
              <p className="text-xs text-neutral-400">Vault API, Webhooks & Automated File Delivery</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs text-neutral-300">
          <p>
            Automate client deliveries, sync folder pipelines directly to secure portals, and generate password-secured download links via the Noir Archive API.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <Terminal className="h-5 w-5 text-[#ff6b00] mb-2" />
              <h4 className="font-bold text-white mb-1">CLI & REST API</h4>
              <p className="text-[11px] text-neutral-400">Batch upload entire directories with SHA-256 integrity verification.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <Webhook className="h-5 w-5 text-emerald-400 mb-2" />
              <h4 className="font-bold text-white mb-1">Client Webhooks</h4>
              <p className="text-[11px] text-neutral-400">Receive instant alerts when a recipient reviews or downloads an archive.</p>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-black/50 p-3 font-mono text-[11px]">
            <span className="text-neutral-500"># Install the Noir Archive SDK</span>
            <div className="text-[#ff6b00] mt-1">$ npm install @noir-archive/vault-sdk</div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#ff6b00] px-4 py-2 font-sans text-xs font-bold text-black hover:bg-[#ff7d1f] cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlusModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-orange-500/30 bg-[#0f0e13] text-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#ff6b00] text-black font-black flex items-center justify-center text-sm shadow-md">
              +
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-white">Noir Plus</h3>
              <p className="text-xs text-[#ff6b00]">Team & Studio Tier · $4.99 / mo</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-5 space-y-3 text-xs text-neutral-300">
          <p className="text-neutral-200">
            File storage, uncompressed ZIP archives, and client delivery links are 100% free forever. Plus gives power teams extra perks:
          </p>

          <ul className="space-y-2 mt-3">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              <span>500 MB single file transfers (up from 50 MB)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              <span>Custom domain & branded client download pages</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              <span>High-speed multi-threaded CDN delivery routes worldwide</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00]" />
              <span>Early access to desktop multi-threaded sync tools</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/5 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              alert("Noir Plus is in public preview — all 500 MB upload perks are currently active for everyone!");
              onClose();
            }}
            className="rounded-xl bg-[#ff6b00] px-4 py-2 font-sans text-xs font-bold text-black hover:bg-[#ff7d1f] cursor-pointer"
          >
            Explore Plus Perks
          </button>
        </div>
      </div>
    </div>
  );
};
