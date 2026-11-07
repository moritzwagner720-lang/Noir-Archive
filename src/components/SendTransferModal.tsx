import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Project, TransferFile, Photo } from '../types';
import {
  X,
  Send,
  Folder,
  FileImage,
  Upload,
  Lock,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const SendTransferModal: React.FC = () => {
  const {
    currentUser,
    isTransferModalOpen,
    setIsTransferModalOpen,
    preselectedTransferProject,
    projects,
    photos,
    users,
    sendTransfer,
    setActiveTransferPortalId,
    setActiveTab,
  } = useApp();

  // Mode: 'configure' | 'success'
  const [step, setStep] = useState<'configure' | 'success'>('configure');
  const [createdPackageId, setCreatedPackageId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [transferTitle, setTransferTitle] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [sourceType, setSourceType] = useState<'project' | 'files' | 'upload'>('project');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<TransferFile[]>([]);

  // Recipient details
  const [recipientType, setRecipientType] = useState<'username' | 'direct-link' | 'email'>('username');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  // Security & Expiry
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [expiryDays, setExpiryDays] = useState<number | null>(14);
  const [error, setError] = useState<string | null>(null);

  // User's own projects and photos
  const userProjects = projects.filter(p => p.userId === currentUser?.id);
  const userPhotos = photos.filter(p => p.userId === currentUser?.id);

  // Initialize form state when opened
  useEffect(() => {
    if (isTransferModalOpen && step !== 'success') {
      setError(null);
      if (preselectedTransferProject) {
        setSourceType('project');
        setSelectedProjectId(preselectedTransferProject.id);
        setTransferTitle(`${preselectedTransferProject.title} — Archival Transfer`);
        setTransferNote(preselectedTransferProject.clientDeliveryNotes || 'High resolution folder delivery for client proofing.');
      } else if (userProjects.length > 0) {
        setSelectedProjectId(userProjects[0].id);
        setTransferTitle(`${userProjects[0].title} — Archival Delivery`);
        setTransferNote('High-resolution client delivery package.');
      } else {
        setSourceType('files');
        setTransferTitle('Archival Photography Delivery');
        setTransferNote('Curated monochrome proof files.');
      }

      // Default recipient to another user if available
      const otherUser = users.find(u => u.id !== currentUser?.id);
      if (otherUser) {
        setRecipientUsername(otherUser.username);
      }
    }
  }, [isTransferModalOpen]);

  if (!isTransferModalOpen || !currentUser) return null;

  // Handle local disk file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        const newFile: TransferFile = {
          id: `up-${Date.now()}-${idx}`,
          name: file.name,
          url,
          size: `${sizeMb} MB`,
          type: file.type || 'image/jpeg',
          folderPath: 'Uploaded_Assets',
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotoIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Compile final files list
  const getTransferFiles = (): TransferFile[] => {
    if (sourceType === 'project') {
      const proj = projects.find(p => p.id === selectedProjectId);
      const projPhotos = photos.filter(p => p.projectId === selectedProjectId);
      return projPhotos.map(p => ({
        id: p.id,
        name: `${p.title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
        url: p.url,
        size: p.fileSize || '16.0 MB',
        type: 'image/jpeg',
        folderPath: proj?.title.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Portfolio_Folder',
      }));
    } else if (sourceType === 'files') {
      return photos
        .filter(p => selectedPhotoIds.includes(p.id))
        .map(p => ({
          id: p.id,
          name: `${p.title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
          url: p.url,
          size: p.fileSize || '16.0 MB',
          type: 'image/jpeg',
          folderPath: 'Curated_Selection',
        }));
    } else {
      return uploadedFiles;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const compiledFiles = getTransferFiles();

    if (compiledFiles.length === 0) {
      setError('Please select at least one photograph or file to transfer');
      return;
    }

    if (!transferTitle.trim()) {
      setError('Transfer package title is required');
      return;
    }

    if (recipientType === 'username' && !recipientUsername.trim()) {
      setError('Please provide a recipient username');
      return;
    }

    const res = sendTransfer({
      senderId: currentUser.id,
      senderUsername: currentUser.username,
      title: transferTitle,
      note: transferNote,
      recipientType,
      recipientUsername: recipientType === 'username' ? recipientUsername : undefined,
      recipientEmail: recipientType === 'email' ? recipientEmail : undefined,
      password: hasPassword ? password : undefined,
      expiryDays,
      files: compiledFiles,
    });

    if (res.success && res.packageId) {
      setCreatedPackageId(res.packageId);
      setStep('success');
    } else {
      setError(res.error || 'Failed to dispatch transfer');
    }
  };

  const transferLink = createdPackageId
    ? `${window.location.origin}${window.location.pathname}?transfer=${createdPackageId}`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transferLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCloseModal = () => {
    setIsTransferModalOpen(false);
    setStep('configure');
    setCreatedPackageId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-neutral-800 text-neutral-400 transition-colors hover:border-white hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {step === 'configure' ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-white" />
                <span className="font-mono-code text-[10px] tracking-widest text-neutral-400 uppercase">
                  DISPATCH FOLDER & FILES
                </span>
              </div>
              <h2 className="mt-1 font-editorial text-2xl font-bold text-white">
                Send Files / Folder to Recipient
              </h2>
              <p className="mt-1 font-sans text-xs text-neutral-400">
                Package high-resolution imagery into an encrypted, client-ready download portal with optional expiration and delivery password.
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 border border-red-800/80 bg-red-950/40 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-5">
              {/* Transfer Title & Notes */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono-code text-[11px] uppercase tracking-wider text-neutral-300">
                    Transfer Package Title <span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={transferTitle}
                    onChange={e => setTransferTitle(e.target.value)}
                    aria-label="Transfer Package Title"
                    className="mt-1 w-full rounded-none border border-neutral-800 bg-neutral-900/80 py-2 px-3 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-[11px] uppercase tracking-wider text-neutral-300">
                    Delivery Note
                  </label>
                  <input
                    type="text"
                    value={transferNote}
                    onChange={e => setTransferNote(e.target.value)}
                    aria-label="Delivery Note"
                    className="mt-1 w-full rounded-none border border-neutral-800 bg-neutral-900/80 py-2 px-3 text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Source Selection Tabs */}
              <div>
                <label className="block font-mono-code text-[11px] uppercase tracking-wider text-neutral-300 mb-1.5">
                  Package Contents Source
                </label>
                <div className="grid grid-cols-3 border border-neutral-800 bg-neutral-900/40 p-0.5 font-mono-code text-xs">
                  <button
                    type="button"
                    onClick={() => setSourceType('project')}
                    className={`flex items-center justify-center gap-1.5 py-2 transition-colors ${
                      sourceType === 'project' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Folder className="h-3.5 w-3.5" />
                    <span>Project Folder</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceType('files')}
                    className={`flex items-center justify-center gap-1.5 py-2 transition-colors ${
                      sourceType === 'files' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileImage className="h-3.5 w-3.5" />
                    <span>Pick Photos</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceType('upload')}
                    className={`flex items-center justify-center gap-1.5 py-2 transition-colors ${
                      sourceType === 'upload' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload Local</span>
                  </button>
                </div>

                {/* Sub-panels depending on source */}
                <div className="mt-3 border border-neutral-800 bg-neutral-900/30 p-3">
                  {sourceType === 'project' && (
                    <div>
                      <p className="font-mono-code text-[11px] text-neutral-400 mb-2">
                        Select an album folder to deliver in full:
                      </p>
                      {userProjects.length === 0 ? (
                        <p className="text-xs text-neutral-400">
                          You do not have any projects yet. Create one or switch to 'Pick Photos' or 'Upload Local'.
                        </p>
                      ) : (
                        <select
                          value={selectedProjectId}
                          onChange={e => setSelectedProjectId(e.target.value)}
                          className="w-full rounded-none border border-neutral-800 bg-neutral-950 py-2 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                        >
                          {userProjects.map(p => {
                            const count = photos.filter(ph => ph.projectId === p.id).length;
                            return (
                              <option key={p.id} value={p.id}>
                                📁 {p.title} ({count} photos • {p.category})
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </div>
                  )}

                  {sourceType === 'files' && (
                    <div>
                      <p className="font-mono-code text-[11px] text-neutral-400 mb-2">
                        Check the individual works to bundle ({selectedPhotoIds.length} selected):
                      </p>
                      <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                        {photos.map(p => {
                          const isSelected = selectedPhotoIds.includes(p.id);
                          return (
                            <div
                              key={p.id}
                              onClick={() => toggleSelectPhoto(p.id)}
                              className={`flex items-center justify-between p-2 border cursor-pointer transition-colors ${
                                isSelected
                                  ? 'border-white bg-neutral-900 text-white'
                                  : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={p.url}
                                  alt={p.title}
                                  className="h-7 w-7 grayscale object-cover"
                                />
                                <div>
                                  <p className="text-xs font-medium text-white">{p.title}</p>
                                  <p className="font-mono-code text-[10px] text-neutral-400">
                                    {p.exif.camera || 'Leica'} • {p.fileSize || '14 MB'}
                                  </p>
                                </div>
                              </div>
                              <div
                                className={`h-4 w-4 border flex items-center justify-center ${
                                  isSelected ? 'border-white bg-white text-black' : 'border-neutral-700'
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {sourceType === 'upload' && (
                    <div>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-800 p-6 text-center cursor-pointer hover:border-neutral-500 transition-colors">
                        <Upload className="h-6 w-6 text-neutral-400 mb-1" />
                        <span className="font-mono-code text-xs text-white">
                          Select raw or export image files from your computer
                        </span>
                        <span className="font-mono-code text-[10px] text-neutral-400 mt-1">
                          JPG, PNG, TIFF, or WebP
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>

                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <p className="font-mono-code text-[10px] text-neutral-400 uppercase">
                            Staged for transfer ({uploadedFiles.length} files):
                          </p>
                          {uploadedFiles.map(f => (
                            <div
                              key={f.id}
                              className="flex items-center justify-between bg-neutral-950 p-1.5 font-mono-code text-[11px] text-neutral-300 border border-neutral-900"
                            >
                              <span className="truncate max-w-[280px]">{f.name}</span>
                              <span className="text-neutral-400">{f.size}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="border border-neutral-800 p-3 bg-neutral-900/30">
                <label className="block font-mono-code text-[11px] uppercase tracking-wider text-neutral-300 mb-2">
                  Recipient Destination
                </label>
                <div className="grid grid-cols-3 gap-2 font-mono-code text-xs mb-3">
                  <button
                    type="button"
                    onClick={() => setRecipientType('username')}
                    className={`py-1.5 px-2 border text-center transition-colors ${
                      recipientType === 'username'
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Registered User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipientType('direct-link')}
                    className={`py-1.5 px-2 border text-center transition-colors ${
                      recipientType === 'direct-link'
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Shareable Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecipientType('email')}
                    className={`py-1.5 px-2 border text-center transition-colors ${
                      recipientType === 'email'
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Client Email
                  </button>
                </div>

                {recipientType === 'username' && (
                  <div>
                    <label className="block font-mono-code text-[10px] uppercase text-neutral-400 mb-1">
                      Recipient Username on Platform:
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono-code text-xs text-neutral-500">
                          @
                        </span>
                        <input
                          type="text"
                          value={recipientUsername}
                          onChange={e => setRecipientUsername(e.target.value.toLowerCase())}
                          aria-label="Recipient username"
                          className="w-full rounded-none border border-neutral-800 bg-neutral-950 py-1.5 pl-6 pr-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      {/* Quick recipient picker badge */}
                      <select
                        onChange={e => setRecipientUsername(e.target.value)}
                        className="rounded-none border border-neutral-800 bg-neutral-950 px-2 font-mono-code text-xs text-neutral-400 focus:outline-none"
                      >
                        <option value="">Or pick member...</option>
                        {users.map(u => (
                          <option key={u.id} value={u.username}>
                            @{u.username}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {recipientType === 'email' && (
                  <div>
                    <label className="block font-mono-code text-[10px] uppercase text-neutral-400 mb-1">
                      Client Email Address:
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      aria-label="Client Email Address"
                      className="w-full rounded-none border border-neutral-800 bg-neutral-950 py-1.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                    />
                  </div>
                )}

                {recipientType === 'direct-link' && (
                  <p className="font-mono-code text-[11px] text-neutral-400">
                    A unique, secure web link will be generated. Anyone with the link (and optional password) can access and download the files.
                  </p>
                )}
              </div>

              {/* Password Protection & Expiration */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 border border-neutral-800 p-3 bg-neutral-900/30">
                {/* Password Protection */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-mono-code text-[11px] uppercase tracking-wider text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPassword}
                        onChange={e => setHasPassword(e.target.checked)}
                        className="rounded-none border-neutral-800 accent-white"
                      />
                      <span>Require Password</span>
                    </label>
                  </div>
                  {hasPassword && (
                    <input
                      type="text"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      aria-label="Client transfer password"
                      className="mt-2 w-full rounded-none border border-neutral-800 bg-neutral-950 py-1.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                    />
                  )}
                </div>

                {/* Expiration */}
                <div>
                  <label className="block font-mono-code text-[11px] uppercase tracking-wider text-neutral-300">
                    Link Expiration Window
                  </label>
                  <select
                    value={expiryDays === null ? 'never' : String(expiryDays)}
                    onChange={e => setExpiryDays(e.target.value === 'never' ? null : Number(e.target.value))}
                    className="mt-2 w-full rounded-none border border-neutral-800 bg-neutral-950 py-1.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="7">Expires in 7 days</option>
                    <option value="14">Expires in 14 days (Recommended)</option>
                    <option value="30">Expires in 30 days</option>
                    <option value="never">Never expires (Permanent)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 border border-white bg-white py-3 text-xs font-semibold tracking-wider uppercase text-black transition-colors hover:bg-neutral-200"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Create & Dispatch Transfer Package</span>
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-white bg-white text-black">
              <Check className="h-6 w-6" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="font-mono-code text-[10px] tracking-widest text-emerald-400 uppercase">
                PACKAGE DISPATCHED
              </span>
            </div>
            <h2 className="mt-1 font-editorial text-2xl font-bold text-white">
              Files Delivered Successfully
            </h2>
            <p className="mt-2 font-mono-code text-xs text-neutral-400 max-w-md mx-auto">
              Transfer Reference <span className="text-white font-bold">{createdPackageId}</span> has been logged to your outbox and is ready for recipient access.
            </p>

            {/* Shareable Link Box */}
            <div className="mt-6 border border-neutral-800 bg-neutral-900/50 p-4 text-left">
              <label className="block font-mono-code text-[10px] uppercase text-neutral-400 mb-1">
                Recipient Download Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={transferLink}
                  className="w-full rounded-none border border-neutral-800 bg-black py-2 px-3 font-mono-code text-xs text-neutral-200 focus:outline-none select-all"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 border border-white bg-white px-3 py-2 text-xs font-semibold uppercase text-black transition-colors hover:bg-neutral-200"
                >
                  {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {hasPassword && (
                <p className="mt-2 font-mono-code text-[10px] text-amber-400 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Protected by password: <span className="font-bold text-white">{password}</span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  if (createdPackageId) {
                    setIsTransferModalOpen(false);
                    setActiveTransferPortalId(createdPackageId);
                  }
                }}
                className="flex items-center justify-center gap-1.5 border border-neutral-700 bg-neutral-900 px-4 py-2.5 font-mono-code text-xs text-white transition-colors hover:border-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open Recipient Portal</span>
              </button>

              <button
                onClick={() => {
                  setIsTransferModalOpen(false);
                  setActiveTab('transfers');
                }}
                className="flex items-center justify-center gap-1.5 border border-white bg-white px-4 py-2.5 font-mono-code text-xs font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                <span>View Transfers Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
