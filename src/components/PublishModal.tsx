import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransferFile, PhotoCategory } from '../types';
import {
  X,
  Upload,
  Folder,
  FileImage,
  Globe,
  Sparkles,
  Check,
  AlertCircle,
  Tag,
  Layers,
} from 'lucide-react';

export const PublishModal: React.FC = () => {
  const {
    currentUser,
    isPublishModalOpen,
    setIsPublishModalOpen,
    publishPackageAction,
    photos,
    projects,
    setAuthModal,
    setActiveTab,
    theme,
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PhotoCategory>('architecture');
  const [tagsInput, setTagsInput] = useState('raw, photography, free-download');
  const [sourceType, setSourceType] = useState<'upload' | 'folder-upload' | 'library'>('upload');
  const [stagedFiles, setStagedFiles] = useState<TransferFile[]>([]);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPublishModalOpen) return null;

  const handleClose = () => {
    setIsPublishModalOpen(false);
    setError(null);
    setIsSuccess(false);
  };

  // Local file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setStagedFiles(prev => [
          ...prev,
          {
            id: `pub-up-${Date.now()}-${idx}`,
            name: file.name,
            url,
            size: `${sizeMb} MB`,
            type: file.type || 'image/jpeg',
            folderPath: 'Public_Uploads',
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Local folder upload handler (webkitdirectory)
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const folderName = files[0].webkitRelativePath?.split('/')[0] || 'Published_Folder';
    const loaded: TransferFile[] = [];

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        loaded.push({
          id: `pub-fld-${Date.now()}-${idx}`,
          name: file.name,
          url,
          size: `${sizeMb} MB`,
          type: file.type || 'image/jpeg',
          folderPath: folderName,
        });

        if (loaded.length === files.length) {
          setStagedFiles(prev => [...prev, ...loaded]);
          if (!title) {
            setTitle(folderName.replace(/[_-]/g, ' '));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleSelectPhoto = (id: string) => {
    setSelectedPhotoIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) {
      setAuthModal('signin');
      return;
    }

    if (!title.trim()) {
      setError('Please provide a title for this public bundle');
      return;
    }

    let finalFiles: TransferFile[] = [];

    if (sourceType === 'library') {
      const chosen = photos.filter(p => selectedPhotoIds.includes(p.id));
      finalFiles = chosen.map(p => ({
        id: p.id,
        name: `${p.title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
        url: p.url,
        size: p.fileSize || '14.5 MB',
        type: 'image/jpeg',
        folderPath: 'Curated_Library',
      }));
    } else {
      finalFiles = stagedFiles;
    }

    if (finalFiles.length === 0) {
      setError('Please add at least one file or select photos from your library to publish');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const res = publishPackageAction({
      title: title.trim(),
      description: description.trim(),
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      category,
      tags,
      files: finalFiles,
    });

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
        setActiveTab('published');
      }, 1400);
    } else {
      setError(res.error || 'Failed to publish package');
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border shadow-2xl rounded-2xl p-6 sm:p-8 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#12131a] border-neutral-800 text-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
            isLight
              ? 'border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              : 'border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white'
          }`}
        >
          <X className="h-4 w-4" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold font-sans">Files Published Successfully!</h3>
            <p className={`mt-2 text-xs font-mono-code ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              Your bundle is now public in the gallery for everyone to explore and download.
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-blue-600 font-bold">
                  Public Library Dispatch
                </span>
              </div>
              <h2 className="mt-1 font-sans text-2xl font-bold">
                Publish Files & Folders for Everyone
              </h2>
              <p className={`mt-1 text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                Make high-resolution photographs, negative scans, or asset folders publicly downloadable by anyone visiting the site.
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code mb-1">
                    Bundle Title <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    aria-label="Bundle Title"
                    className={`w-full rounded-lg border py-2 px-3 text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as PhotoCategory)}
                    className={`w-full rounded-lg border py-2 px-3 text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  >
                    <option value="architecture">Architecture</option>
                    <option value="portraiture">Portraiture</option>
                    <option value="street">Street & Documentary</option>
                    <option value="nature">Nature & Landscapes</option>
                    <option value="still-life">Still Life</option>
                    <option value="editorial">Editorial</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code mb-1">
                  Description / Story
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  aria-label="Description / Story"
                  className={`w-full rounded-lg border py-2 px-3 text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-neutral-900 border-neutral-700 text-white'
                  }`}
                />
              </div>

              {/* Source Mode Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code mb-2">
                  Files Source
                </label>
                <div
                  className={`grid grid-cols-3 rounded-lg border p-1 font-mono-code text-xs ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSourceType('upload')}
                    className={`py-1.5 rounded-md transition-all font-medium ${
                      sourceType === 'upload'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <FileImage className="h-3.5 w-3.5" />
                      Upload Files
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceType('folder-upload')}
                    className={`py-1.5 rounded-md transition-all font-medium ${
                      sourceType === 'folder-upload'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Folder className="h-3.5 w-3.5" />
                      Upload Folder
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceType('library')}
                    className={`py-1.5 rounded-md transition-all font-medium ${
                      sourceType === 'library'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      Pick Portfolio
                    </span>
                  </button>
                </div>

                {/* Subpanels for file selection */}
                <div
                  className={`mt-3 rounded-xl border p-4 ${
                    isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-neutral-900/40 border-neutral-800'
                  }`}
                >
                  {sourceType === 'upload' && (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <Upload className="h-6 w-6 text-blue-500 mb-2" />
                      <span className="text-xs font-semibold">Select files from your device</span>
                      <span className={`text-[11px] font-mono-code mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        JPG, PNG, TIFF, or RAW images
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {sourceType === 'folder-upload' && (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <Folder className="h-6 w-6 text-cyan-500 mb-2" />
                      <span className="text-xs font-semibold">Select an entire folder from your device</span>
                      <span className={`text-[11px] font-mono-code mt-1 ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                        Preserves folder name and contents
                      </span>
                      {/* @ts-ignore */}
                      <input
                        type="file"
                        // @ts-expect-error webkitdirectory is standard in Chromium
                        webkitdirectory=""
                        directory=""
                        multiple
                        onChange={handleFolderUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {sourceType === 'library' && (
                    <div>
                      <p className={`text-xs font-mono-code mb-2 ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                        Select works from the catalog ({selectedPhotoIds.length} chosen):
                      </p>
                      <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                        {photos.map(p => {
                          const isSelected = selectedPhotoIds.includes(p.id);
                          return (
                            <div
                              key={p.id}
                              onClick={() => toggleSelectPhoto(p.id)}
                              className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100'
                                  : isLight
                                  ? 'border-slate-200 bg-white hover:border-slate-300'
                                  : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <img src={p.url} alt={p.title} className="h-8 w-8 rounded object-cover grayscale" />
                                <div>
                                  <p className="text-xs font-medium">{p.title}</p>
                                  <p className="text-[10px] font-mono-code opacity-70">{p.fileSize || '14 MB'}</p>
                                </div>
                              </div>
                              <div
                                className={`h-4 w-4 rounded flex items-center justify-center border ${
                                  isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-neutral-700'
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

                  {/* List of staged files if upload mode */}
                  {sourceType !== 'library' && stagedFiles.length > 0 && (
                    <div className="mt-3 border-t pt-2 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono-code font-semibold text-blue-600">
                        <span>{stagedFiles.length} files staged for publishing</span>
                        <span>
                          {stagedFiles.reduce((acc, f) => acc + (parseFloat(f.size) || 1), 0).toFixed(1)} MB
                        </span>
                      </div>
                      <div className="max-h-24 overflow-y-auto space-y-1 pr-1 font-mono-code text-[10px]">
                        {stagedFiles.map((f, i) => (
                          <div
                            key={f.id}
                            className={`flex items-center justify-between py-1 px-2 rounded ${
                              isLight ? 'bg-slate-200/60' : 'bg-neutral-800/60'
                            }`}
                          >
                            <span className="truncate max-w-[280px]">{f.name}</span>
                            <span>{f.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider font-mono-code mb-1">
                  Tags (comma separated)
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    aria-label="Tags (comma separated)"
                    className={`w-full rounded-lg border py-2 pl-9 pr-3 text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                    isLight
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Publish to Everyone</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
