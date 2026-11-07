import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Inbox,
  FolderDown,
  Lock,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { calculateTotalTransferSize } from '../utils/transfer';

export const TransfersDashboard: React.FC = () => {
  const {
    currentUser,
    transfers,
    revokeTransfer,
    setActiveTransferPortalId,
    setIsTransferModalOpen,
    setAuthModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'outbox' | 'inbox'>('outbox');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <Send className="mx-auto mb-4 h-12 w-12 text-neutral-600" />
        <h2 className="font-editorial text-2xl font-bold text-white">Transfers Hub</h2>
        <p className="mt-2 text-xs text-neutral-400">
          Sign in or join with a unique username to dispatch archival folders, manage client portals, and receive photography assets from collaborators.
        </p>
        <button
          onClick={() => setAuthModal('signin')}
          className="mt-6 border border-white bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-neutral-200"
        >
          Sign In to Access Transfers
        </button>
      </div>
    );
  }

  // Sent by this user
  const sentTransfers = transfers.filter(t => t.senderId === currentUser.id);

  // Received by this user (addressed to their unique username)
  const receivedTransfers = transfers.filter(
    t => t.recipientUsername?.toLowerCase() === currentUser.username.toLowerCase()
  );

  const handleCopyLink = (packageId: string) => {
    const link = `${window.location.origin}${window.location.pathname}?transfer=${packageId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(packageId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-[10px] uppercase tracking-widest text-neutral-400">
            <span className="h-2 w-2 bg-white" />
            <span>DISPATCH & RECEIVE REGISTRY</span>
          </div>
          <h1 className="mt-1 font-editorial text-2xl font-bold text-white sm:text-3xl">
            Archival Transfers & Client Delivery
          </h1>
          <p className="mt-1 text-xs text-neutral-400">
            Encrypted delivery packages, folder transfers, and client download tracking for @{currentUser.username}.
          </p>
        </div>

        <button
          onClick={() => setIsTransferModalOpen(true)}
          className="flex items-center justify-center gap-2 border border-white bg-white px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-black transition-colors hover:bg-neutral-200"
        >
          <Plus className="h-4 w-4" />
          <span>New Transfer</span>
        </button>
      </div>

      {/* Outbox / Inbox Tabs */}
      <div className="mb-6 flex border-b border-neutral-800 font-mono-code text-xs">
        <button
          onClick={() => setActiveTab('outbox')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 uppercase tracking-wider transition-colors ${
            activeTab === 'outbox'
              ? 'border-white text-white font-bold bg-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Send className="h-3.5 w-3.5" />
          <span>Dispatched Outbox ({sentTransfers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 uppercase tracking-wider transition-colors ${
            activeTab === 'inbox'
              ? 'border-white text-white font-bold bg-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Inbox className="h-3.5 w-3.5" />
          <span>Received Inbox ({receivedTransfers.length})</span>
        </button>
      </div>

      {/* Outbox View */}
      {activeTab === 'outbox' && (
        <div>
          {sentTransfers.length === 0 ? (
            <div className="border border-dashed border-neutral-800 p-12 text-center bg-neutral-950/50">
              <Send className="mx-auto mb-3 h-8 w-8 text-neutral-600" />
              <h3 className="font-editorial text-base text-white">No Dispatched Transfers</h3>
              <p className="mt-1 font-mono-code text-xs text-neutral-400">
                You haven't sent any files or folders yet.
              </p>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="mt-4 border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono-code text-xs text-white hover:border-white"
              >
                Send First Package
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sentTransfers.map(pkg => {
                const totalSize = calculateTotalTransferSize(pkg.files);
                const isRevoked = pkg.status === 'revoked';

                return (
                  <div
                    key={pkg.id}
                    className={`border p-5 transition-colors ${
                      isRevoked
                        ? 'border-neutral-900 bg-neutral-950/40 opacity-60'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      {/* Left: Metadata */}
                      <div>
                        <div className="flex items-center gap-2 font-mono-code text-[10px] text-neutral-400">
                          <span className="font-bold text-white">{pkg.id}</span>
                          <span>•</span>
                          <span>{new Date(pkg.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{pkg.files.length} Assets</span>
                          <span>•</span>
                          <span>{totalSize}</span>
                          {pkg.hasPassword && (
                            <span className="flex items-center gap-1 text-amber-400">
                              <Lock className="h-3 w-3" /> Protected
                            </span>
                          )}
                        </div>

                        <h3 className="mt-1 font-editorial text-lg font-bold text-white">
                          {pkg.title}
                        </h3>

                        {pkg.note && (
                          <p className="mt-1 font-sans text-xs text-neutral-400 italic">
                            "{pkg.note}"
                          </p>
                        )}

                        <div className="mt-2 flex flex-wrap items-center gap-3 font-mono-code text-xs">
                          <span className="text-neutral-400">Recipient:</span>
                          <span className="text-white">
                            {pkg.recipientType === 'username'
                              ? `@${pkg.recipientUsername}`
                              : pkg.recipientType === 'email'
                              ? pkg.recipientEmail
                              : 'Shareable Link'}
                          </span>

                          <span className="text-neutral-700">•</span>
                          <span className="text-neutral-400">
                            Downloads: <strong className="text-white">{pkg.downloadsCount}</strong>
                          </span>

                          {pkg.expiresAt && (
                            <>
                              <span className="text-neutral-700">•</span>
                              <span className="text-neutral-400">
                                Expires: {new Date(pkg.expiresAt).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopyLink(pkg.id)}
                          className="flex items-center gap-1 border border-neutral-700 bg-neutral-900 px-3 py-1.5 font-mono-code text-xs text-neutral-200 transition-colors hover:border-white hover:text-white"
                          title="Copy direct client link"
                        >
                          {copiedId === pkg.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setActiveTransferPortalId(pkg.id)}
                          className="flex items-center gap-1 border border-white bg-white px-3 py-1.5 font-mono-code text-xs font-semibold text-black transition-colors hover:bg-neutral-200"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>View Portal</span>
                        </button>

                        {!isRevoked && (
                          <button
                            onClick={() => revokeTransfer(pkg.id)}
                            className="flex items-center gap-1 border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400 hover:border-red-800 hover:text-red-400"
                            title="Revoke access"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Inbox View */}
      {activeTab === 'inbox' && (
        <div>
          {receivedTransfers.length === 0 ? (
            <div className="border border-dashed border-neutral-800 p-12 text-center bg-neutral-950/50">
              <Inbox className="mx-auto mb-3 h-8 w-8 text-neutral-600" />
              <h3 className="font-editorial text-base text-white">No Received Packages</h3>
              <p className="mt-1 font-mono-code text-xs text-neutral-400">
                When other photographers send files or folders to @{currentUser.username}, they will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {receivedTransfers.map(pkg => {
                const totalSize = calculateTotalTransferSize(pkg.files);

                return (
                  <div
                    key={pkg.id}
                    className="border border-neutral-800 bg-neutral-950 p-5 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-mono-code text-[10px] text-neutral-400">
                          <span className="text-white font-bold">{pkg.id}</span>
                          <span>•</span>
                          <span>Sent by @{pkg.senderUsername}</span>
                          <span>•</span>
                          <span>{pkg.files.length} Files</span>
                          <span>•</span>
                          <span>{totalSize}</span>
                        </div>

                        <h3 className="mt-1 font-editorial text-lg font-bold text-white">
                          {pkg.title}
                        </h3>

                        {pkg.note && (
                          <p className="mt-1 font-sans text-xs text-neutral-300 italic">
                            "{pkg.note}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setActiveTransferPortalId(pkg.id)}
                          className="flex items-center gap-1.5 border border-white bg-white px-4 py-2 font-mono-code text-xs font-semibold text-black hover:bg-neutral-200"
                        >
                          <FolderDown className="h-3.5 w-3.5" />
                          <span>Open & Download Folder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
