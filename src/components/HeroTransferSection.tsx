import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Folder,
  FileImage,
  Send,
  Users,
  Link as LinkIcon,
  Check,
  Copy,
  Sparkles,
  ArrowDown,
  Globe,
  Download,
} from 'lucide-react';
import { TransferFile, PhotoCategory } from '../types';

export const HeroTransferSection: React.FC = () => {
  const {
    currentUser,
    users,
    projects,
    photos,
    sendTransfer,
    publishPackageAction,
    setActiveTransferPortalId,
    setIsTransferModalOpen,
    setIsPublishModalOpen,
    setAuthModal,
    setActiveTab,
    theme,
  } = useApp();

  const [dragActive, setDragActive] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<TransferFile[]>([]);
  const [transferTitle, setTransferTitle] = useState('New Archival Batch');
  const [destinationChoice, setDestinationChoice] = useState<'publish' | 'link' | 'friend'>('publish');
  const [targetUsername, setTargetUsername] = useState('');
  const [createdTransferId, setCreatedTransferId] = useState<string | null>(null);
  const [publishedSuccessId, setPublishedSuccessId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPill, setSelectedPill] = useState<string>('all');

  const isLight = theme === 'light';

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setStagedFiles(prev => [
          ...prev,
          {
            id: `fast-${Date.now()}-${idx}`,
            name: file.name,
            url,
            size: `${sizeMb} MB`,
            type: file.type || 'image/jpeg',
            folderPath: 'Upload_Batch',
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setAuthModal('signin');
      return;
    }

    // Default sample if empty to allow instant testing
    const sample = photos[0];
    const filesToSend: TransferFile[] = stagedFiles.length > 0
      ? stagedFiles
      : sample
      ? [
          {
            id: sample.id,
            name: `${sample.title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
            url: sample.url,
            size: sample.fileSize || '14.2 MB',
            type: 'image/jpeg',
            folderPath: 'Curated_Batch',
          },
        ]
      : [];

    if (destinationChoice === 'publish') {
      // Publish to public community
      const res = publishPackageAction({
        title: transferTitle,
        description: 'Uploaded and published to the public library for open download.',
        authorUsername: currentUser.username,
        authorAvatar: currentUser.avatar,
        category: (selectedPill !== 'all' ? selectedPill : 'bundles') as any,
        files: filesToSend,
      });

      if (res.success && res.package) {
        setPublishedSuccessId(res.package.id);
        setStagedFiles([]);
      }
    } else {
      // Direct transfer
      const res = sendTransfer({
        senderId: currentUser.id,
        senderUsername: currentUser.username,
        title: transferTitle,
        recipientType: destinationChoice === 'link' ? 'direct-link' : 'username',
        recipientUsername: destinationChoice === 'friend' ? targetUsername || 'elena_k' : undefined,
        expiryDays: 14,
        files: filesToSend,
      });

      if (res.success && res.packageId) {
        setCreatedTransferId(res.packageId);
        setStagedFiles([]);
      }
    }
  };

  const copyLink = (id: string) => {
    const link = `${window.location.origin}${window.location.pathname}?transfer=${id}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const scrollToFriends = () => {
    const el = document.getElementById('friends-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('friends');
    }
  };

  const pills = [
    { id: 'all', label: 'All Files' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'portraiture', label: 'Portfolios' },
    { id: 'street', label: 'Street & Night' },
    { id: 'nature', label: 'Nature' },
    { id: 'bundles', label: 'Project Bundles' },
  ];

  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 transition-colors">
      {/* Ethereal soft ambient lilac / lavender background bloom matching Wix reference image */}
      <div
        className={`pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[800px] h-[480px] blur-[120px] rounded-full transition-opacity ${
          isLight
            ? 'bg-gradient-to-b from-indigo-200/60 via-purple-200/40 to-transparent opacity-90'
            : 'bg-gradient-to-b from-blue-900/25 via-indigo-900/20 to-transparent opacity-60'
        }`}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Main Headline exact copy from user request with Wix aesthetic */}
        <div className="space-y-1">
          <h1
            className={`font-sans text-5xl font-extrabold tracking-tight sm:text-7xl ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            Send anything.
          </h1>
          <h2
            className={`font-sans text-5xl font-extrabold tracking-tight sm:text-7xl ${
              isLight ? 'text-slate-400' : 'text-neutral-500'
            }`}
          >
            To anyone.
          </h2>
          <p
            className={`pt-3 font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-neutral-300'
            }`}
          >
            No hassle. Just upload, publish, and share.
          </p>
        </div>

        {/* Category selector pills matching the Wix image layout */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {pills.map(pill => {
            const isSelected = selectedPill === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedPill(pill.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : isLight
                    ? 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 shadow-sm'
                    : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Central Royal Blue Action Button styled just like Wix CTA */}
        <div className="mt-7 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => {
              if (!currentUser) {
                setAuthModal('signin');
              } else {
                setIsPublishModalOpen(true);
              }
            }}
            className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all"
          >
            Publish & Share Files Now
          </button>
          <span className={`text-[11px] font-mono-code ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
            Direct downloads for everyone. No payment or software required.
          </span>
        </div>

        {/* Floating Studio Dropzone Card matching the floating site preview in Wix reference */}
        <div
          className={`mt-10 mx-auto max-w-2xl rounded-2xl border p-6 sm:p-8 shadow-2xl transition-all duration-300 ${
            isLight
              ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]'
              : 'bg-[#12131a]/95 border-neutral-800 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]'
          }`}
        >
          {publishedSuccessId ? (
            /* Published to Community Success Screen */
            <div className="py-6 text-center animate-in fade-in">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-sans">Files Published to Public Gallery!</h3>
              <p className={`mt-1 text-xs font-mono-code ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Reference: <strong className="text-blue-600">{publishedSuccessId}</strong> — Any visitor can now browse and download this bundle.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setPublishedSuccessId(null);
                    setActiveTab('published');
                  }}
                  className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-all"
                >
                  View in Public Downloads →
                </button>
                <button
                  onClick={() => setPublishedSuccessId(null)}
                  className={`text-xs font-mono-code ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Upload another
                </button>
              </div>
            </div>
          ) : createdTransferId ? (
            /* Created Direct Link Screen */
            <div className="py-6 text-center animate-in fade-in">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-sans">Transfer Link Generated</h3>
              <p className={`mt-1 text-xs font-mono-code ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Reference: <strong className="text-blue-600">{createdTransferId}</strong>
              </p>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}${window.location.pathname}?transfer=${createdTransferId}`}
                  className={`w-full rounded-lg border py-2 px-3 text-xs font-mono-code select-all ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-800'
                      : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
                <button
                  onClick={() => copyLink(createdTransferId)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono-code">
                <button
                  onClick={() => setActiveTransferPortalId(createdTransferId)}
                  className="text-blue-600 hover:underline"
                >
                  Open Recipient Portal →
                </button>
                <button
                  onClick={() => setCreatedTransferId(null)}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-neutral-300"
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            /* Upload and Dispatch Form */
            <form onSubmit={handleActionSubmit} className="space-y-4">
              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : isLight
                    ? 'border-slate-300 bg-slate-50/70 hover:border-slate-400'
                    : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border mb-3 shadow-sm ${
                    isLight
                      ? 'bg-white border-slate-200 text-blue-600'
                      : 'bg-neutral-900 border-neutral-700 text-blue-400'
                  }`}
                >
                  <Upload className="h-5 w-5" />
                </div>

                <p className="font-sans text-sm font-semibold">
                  Drag and drop files or folders here
                </p>
                <p className={`text-xs mt-1 font-mono-code ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                  Instant upload for photographs, RAW assets, ZIPs, or full directories
                </p>

                {/* Staged files counter */}
                {stagedFiles.length > 0 && (
                  <div className="mt-3 text-xs font-mono-code font-semibold text-blue-600">
                    {stagedFiles.length} files staged ({stagedFiles.reduce((acc, f) => acc + (parseFloat(f.size) || 1), 0).toFixed(1)} MB)
                  </div>
                )}

                {/* Buttons to trigger local file/folder picker */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <label
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors shadow-sm ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-blue-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileImage className="h-3.5 w-3.5 text-blue-600" />
                      Select Files
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>

                  <label
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors shadow-sm ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-700 hover:border-cyan-600 hover:text-cyan-600'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-cyan-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Folder className="h-3.5 w-3.5 text-cyan-600" />
                      Select Folder
                    </span>
                    {/* @ts-ignore */}
                    <input
                      type="file"
                      // @ts-expect-error webkitdirectory
                      webkitdirectory=""
                      directory=""
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Title & Destination Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <div
                  className={`inline-flex w-full sm:w-auto rounded-full border p-1 text-xs shrink-0 ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setDestinationChoice('publish')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all font-medium ${
                      destinationChoice === 'publish'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Publish to Public
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestinationChoice('link')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all font-medium ${
                      destinationChoice === 'link'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Shareable Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestinationChoice('friend')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full transition-all font-medium ${
                      destinationChoice === 'friend'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    To Friend
                  </button>
                </div>

                {destinationChoice === 'friend' && (
                  <select
                    value={targetUsername}
                    onChange={e => setTargetUsername(e.target.value)}
                    className={`w-full rounded-full border py-1.5 px-3 font-mono-code text-xs focus:outline-none ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-800'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  >
                    <option value="">Select a friend...</option>
                    {(currentUser?.friends || ['elena_k', 'kenji_mono']).map(f => (
                      <option key={f} value={f}>
                        @{f}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-full bg-blue-600 py-2.5 px-6 font-sans text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>
                    {destinationChoice === 'publish'
                      ? 'Publish for Everyone'
                      : destinationChoice === 'link'
                      ? 'Create Share Link'
                      : 'Transfer to Friend'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Quick jump to Add Friends & Messenger */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollToFriends}
            className={`flex items-center gap-2 text-xs font-mono-code transition-colors group ${
              isLight ? 'text-slate-500 hover:text-blue-600' : 'text-neutral-400 hover:text-blue-400'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-blue-500" />
            <span>Scroll down to Add Friends & Live Peer Messenger</span>
            <ArrowDown className="h-3 w-3 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
