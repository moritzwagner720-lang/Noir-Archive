import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { verifyTransferAccess, calculateTotalTransferSize } from '../utils/transfer';
import {
  Download,
  Lock,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  ShieldAlert,
  Star,
  FileArchive,
  Eye,
  Check,
  MessageSquare,
  AlertCircle,
  Copy,
} from 'lucide-react';
import JSZip from 'jszip';

export const TransferPortalView: React.FC<{ transferId: string }> = ({ transferId }) => {
  const {
    transfers,
    setActiveTransferPortalId,
    recordDownload,
    addTransferReview,
    setLightboxPhoto,
    photos,
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Client Review Form
  const [rating, setRating] = useState(5);
  const [clientAuthor, setClientAuthor] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Zip downloading state
  const [isZipping, setIsZipping] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const pkg = transfers.find(t => t.id === transferId);

  if (!pkg) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-neutral-600" />
        <h2 className="font-editorial text-2xl font-bold text-white">Transfer Not Found</h2>
        <p className="mt-2 font-mono-code text-xs text-neutral-400">
          Transfer package reference "{transferId}" does not exist or has expired.
        </p>
        <button
          onClick={() => setActiveTransferPortalId(null)}
          className="mt-6 border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono-code text-xs text-white hover:border-white"
        >
          Return to Archive
        </button>
      </div>
    );
  }

  // Check access if locked
  const isPasswordProtected = pkg.hasPassword && !unlocked;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    const check = verifyTransferAccess(pkg, passwordInput);
    if (check.canAccess) {
      setUnlocked(true);
    } else {
      setPasswordError(check.error || 'Incorrect password.');
    }
  };

  // Real JSZip client download of the whole folder
  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      recordDownload(pkg.id);

      const zip = new JSZip();
      const folderName = pkg.title.replace(/[^a-zA-Z0-9_-]/g, '_');
      const folder = zip.folder(folderName) || zip;

      // Add each file
      for (let i = 0; i < pkg.files.length; i++) {
        const file = pkg.files[i];
        try {
          if (file.url.startsWith('data:')) {
            // Base64 data URL
            const base64Data = file.url.split(',')[1];
            folder.file(file.name, base64Data, { base64: true });
          } else {
            // External URL - fetch as blob
            const res = await fetch(file.url);
            const blob = await res.blob();
            folder.file(file.name, blob);
          }
        } catch {
          // Fallback text entry if CORS blocks remote image fetch
          folder.file(
            file.name.replace(/\.\w+$/, '.txt'),
            `Photo Archive Item: ${file.name}\nSource: ${file.url}\nResolution: Archival`
          );
        }
      }

      // Add a manifest README
      folder.file(
        'ARCHIVE_MANIFEST.txt',
        `NOIR ARCHIVE CLIENT DELIVERY\nPackage ID: ${pkg.id}\nSender: @${pkg.senderUsername}\nTitle: ${pkg.title}\nTotal Files: ${pkg.files.length}\nDelivery Note: ${pkg.note || 'None'}\nDownloaded at: ${new Date().toISOString()}\n`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${folderName}_Archival_Bundle.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (e) {
      console.error('ZIP generation failed', e);
      alert('Failed to pack zip. You can download files individually below.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSingle = (file: (typeof pkg.files)[0]) => {
    recordDownload(pkg.id);
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientComment.trim()) return;

    addTransferReview(pkg.id, {
      author: clientAuthor.trim() || 'Client / Reviewer',
      rating,
      comment: clientComment.trim(),
    });

    setClientComment('');
    setReviewSubmitted(true);
  };

  const totalSize = calculateTotalTransferSize(pkg.files);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Return Button */}
      <button
        onClick={() => setActiveTransferPortalId(null)}
        className="mb-6 flex items-center gap-1.5 font-mono-code text-xs text-neutral-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Noir Archive</span>
      </button>

      {/* Password Gate if protected */}
      {isPasswordProtected ? (
        <div className="mx-auto max-w-md border border-neutral-800 bg-neutral-950 p-6 sm:p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-neutral-800 bg-neutral-900 text-white">
            <Lock className="h-5 w-5" />
          </div>

          <div className="flex items-center justify-center gap-1.5 font-mono-code text-[10px] uppercase tracking-wider text-neutral-400">
            <span>PROTECTED TRANSFER PORTAL</span>
            <span>•</span>
            <span>{pkg.id}</span>
          </div>

          <h2 className="mt-1 font-editorial text-2xl font-bold text-white">
            Access Password Required
          </h2>
          <p className="mt-2 text-xs text-neutral-400">
            Photographer <span className="text-white">@{pkg.senderUsername}</span> has protected this delivery package with an access key.
          </p>

          {passwordError && (
            <div className="mt-4 flex items-center gap-2 border border-red-800/80 bg-red-950/40 p-2.5 text-xs text-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="mt-5 space-y-3">
            <input
              type="password"
              required
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              aria-label="Transfer password"
              className="w-full rounded-none border border-neutral-800 bg-neutral-900 py-2.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 border border-white bg-white py-2.5 text-xs font-semibold tracking-wider uppercase text-black hover:bg-neutral-200"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Unlock Archive</span>
            </button>
          </form>

          {/* Demo helper hint if testing sample packages */}
          <p className="mt-4 font-mono-code text-[10px] text-neutral-500">
            Demo package tip: password is <span className="text-neutral-400 underline cursor-pointer" onClick={() => setPasswordInput('review2024')}>review2024</span>
          </p>
        </div>
      ) : (
        /* Unlocked / Public Transfer Package Content */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono-code text-[10px] uppercase tracking-widest text-neutral-400">
                  <span className="h-2 w-2 bg-white" />
                  <span>CLIENT DELIVERY PORTAL</span>
                  <span>•</span>
                  <span>REF #{pkg.id}</span>
                </div>
                <h1 className="mt-2 font-editorial text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {pkg.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono-code text-xs text-neutral-400">
                  <span>
                    Curated by <strong className="text-white font-medium">@{pkg.senderUsername}</strong>
                  </span>
                  <span>•</span>
                  <span>{pkg.files.length} Archival Files</span>
                  <span>•</span>
                  <span>{totalSize} Total</span>
                  {pkg.expiresAt && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock className="h-3 w-3" />
                        Expires {new Date(pkg.expiresAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>

                {pkg.note && (
                  <div className="mt-4 border-l-2 border-white bg-neutral-900/60 p-3 font-sans text-xs italic text-neutral-300">
                    "{pkg.note}"
                  </div>
                )}
              </div>

              {/* Download All as ZIP Action */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="flex items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-xs font-bold tracking-wider uppercase text-black transition-colors hover:bg-neutral-200 disabled:opacity-50"
                >
                  <FileArchive className="h-4 w-4" />
                  <span>{isZipping ? 'Archiving ZIP...' : `Download Folder (.ZIP)`}</span>
                </button>

                <div className="flex items-center justify-between font-mono-code text-[10px] text-neutral-400 px-1">
                  <span>Downloaded {pkg.downloadsCount} times</span>
                  <span className="text-emerald-400 font-semibold">Ready for proofing</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3 font-mono-code text-xs text-neutral-400">
              <span className="uppercase tracking-wider">
                Delivered Folder Contents ({pkg.files.length} Assets)
              </span>
              <span>Click image to inspect or download individually</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkg.files.map((file, idx) => {
                const matchedPhoto = photos.find(p => p.url === file.url);
                return (
                  <div
                    key={file.id}
                    className="group border border-neutral-800 bg-neutral-950 transition-all hover:border-neutral-500"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => matchedPhoto && setLightboxPhoto(matchedPhoto)}
                      className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-neutral-900"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 font-mono-code text-xs text-white">
                          <Eye className="h-4 w-4" /> Inspect Image
                        </span>
                      </div>
                    </div>

                    {/* File Meta */}
                    <div className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-mono-code text-xs font-medium text-white truncate">
                          {file.name}
                        </p>
                        <span className="font-mono-code text-[10px] text-neutral-400 shrink-0">
                          {file.size}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-neutral-900 pt-2.5">
                        <span className="font-mono-code text-[10px] text-neutral-400">
                          {file.folderPath || 'Master_Selection'}
                        </span>

                        <button
                          onClick={() => handleDownloadSingle(file)}
                          className="flex items-center gap-1 border border-neutral-700 bg-neutral-900 px-2.5 py-1 font-mono-code text-[11px] text-neutral-200 transition-colors hover:border-white hover:text-white"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client Feedback / Approval Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Submit Feedback */}
            <div className="border border-neutral-800 bg-neutral-950 p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-white" />
                <h3 className="font-editorial text-lg font-bold text-white">
                  Client Approval & Feedback
                </h3>
              </div>
              <p className="mt-1 font-sans text-xs text-neutral-400">
                Leave rating and feedback for sender @{pkg.senderUsername}.
              </p>

              {reviewSubmitted && (
                <div className="mt-3 flex items-center gap-2 border border-emerald-800/80 bg-emerald-950/40 p-2.5 text-xs text-emerald-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span>Review recorded successfully!</span>
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3">
                {/* Rating Stars */}
                <div>
                  <label className="block font-mono-code text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Approval Rating:
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-white hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            star <= rating ? 'fill-white text-white' : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono-code text-xs text-neutral-400">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-code text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Your Name / Publication:
                  </label>
                  <input
                    type="text"
                    value={clientAuthor}
                    onChange={e => setClientAuthor(e.target.value)}
                    aria-label="Your Name or Publication"
                    className="w-full rounded-none border border-neutral-800 bg-neutral-900 py-1.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Selection Notes / Approval:
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={clientComment}
                    onChange={e => setClientComment(e.target.value)}
                    aria-label="Selection Notes or Approval"
                    className="w-full rounded-none border border-neutral-800 bg-neutral-900 py-1.5 px-3 font-mono-code text-xs text-white focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 border border-white bg-white px-4 py-2 text-xs font-semibold uppercase text-black hover:bg-neutral-200"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Submit Approval</span>
                </button>
              </form>
            </div>

            {/* Existing Feedback History */}
            <div className="border border-neutral-800 bg-neutral-950 p-6">
              <h3 className="font-editorial text-lg font-bold text-white mb-2">
                Approval Log ({pkg.reviews?.length || 0})
              </h3>
              {(!pkg.reviews || pkg.reviews.length === 0) ? (
                <p className="font-mono-code text-xs text-neutral-400">
                  No client reviews submitted yet. Use the form on the left to submit an approval stamp.
                </p>
              ) : (
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {pkg.reviews.map(rev => (
                    <div key={rev.id} className="border border-neutral-900 bg-neutral-900/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-xs font-semibold text-white">
                          {rev.author}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-white text-white" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 font-sans text-xs text-neutral-300 italic">
                        "{rev.comment}"
                      </p>
                      <span className="mt-2 block font-mono-code text-[9px] text-neutral-500">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
