import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Calendar,
  Send,
  Download,
  Info,
  Maximize,
} from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const {
    lightboxPhoto,
    setLightboxPhoto,
    photos,
    users,
    setSelectedPhotographer,
    setActiveTab,
    setIsTransferModalOpen,
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') {
        setLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, photos]);

  if (!lightboxPhoto) return null;

  const currentIndex = photos.findIndex(p => p.id === lightboxPhoto.id);
  const author = users.find(u => u.id === lightboxPhoto.userId);

  const navigate = (direction: number) => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + direction + photos.length) % photos.length;
    setLightboxPhoto(photos[nextIdx]);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = lightboxPhoto.url;
    a.download = `${lightboxPhoto.title.toLowerCase().replace(/\s+/g, '_')}_noir.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6">
      {/* Top Bar Controls */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono-code text-xs tracking-widest text-neutral-400">
            FRAME {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          <span className="hidden text-neutral-700 sm:inline">|</span>
          <h2 className="hidden font-editorial text-sm font-semibold tracking-wider text-white sm:block">
            {lightboxPhoto.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsTransferModalOpen(true);
            }}
            className="flex items-center gap-1.5 border border-neutral-700 bg-neutral-900 px-3 py-1 font-mono-code text-xs text-neutral-200 transition-colors hover:border-white hover:text-white"
            title="Create transfer with this photo"
          >
            <Send className="h-3 w-3" />
            <span className="hidden sm:inline">Transfer</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 border border-neutral-700 bg-neutral-900 px-3 py-1 font-mono-code text-xs text-neutral-200 transition-colors hover:border-white hover:text-white"
            title="Download image"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={() => setLightboxPhoto(null)}
            className="flex h-8 w-8 items-center justify-center border border-neutral-800 text-neutral-400 transition-colors hover:border-white hover:text-white"
            aria-label="Close photo preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-12 flex h-[calc(100vh-100px)] w-full max-w-7xl flex-col lg:flex-row lg:items-center">
        {/* Navigation Arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-none border border-neutral-800 bg-black/80 p-2 text-white transition-all hover:border-white hover:bg-white hover:text-black hidden sm:flex"
          aria-label="Previous frame"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-none border border-neutral-800 bg-black/80 p-2 text-white transition-all hover:border-white hover:bg-white hover:text-black hidden sm:flex"
          aria-label="Next frame"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Center: Image Display */}
        <div className="flex flex-1 items-center justify-center p-2 sm:p-6">
          <img
            src={lightboxPhoto.url}
            alt={lightboxPhoto.title}
            className="max-h-[75vh] max-w-full object-contain grayscale shadow-2xl ring-1 ring-neutral-800"
          />
        </div>

        {/* Right Sidebar: Darkroom EXIF & Technical Specs */}
        <div className="w-full border-t border-neutral-800 bg-neutral-950 p-5 lg:h-full lg:w-80 lg:border-l lg:border-t-0 overflow-y-auto">
          <div className="space-y-6">
            {/* Title & Caption */}
            <div>
              <span className="font-mono-code text-[10px] tracking-widest text-neutral-400 uppercase">
                {lightboxPhoto.category}
              </span>
              <h3 className="font-editorial text-lg font-bold text-white mt-1">
                {lightboxPhoto.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                {lightboxPhoto.caption}
              </p>
            </div>

            {/* Author details */}
            {author && (
              <div
                onClick={() => {
                  setLightboxPhoto(null);
                  setSelectedPhotographer(author);
                  setActiveTab('projects');
                }}
                className="group cursor-pointer border border-neutral-800 p-3 transition-colors hover:border-neutral-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={author.avatar}
                    alt={author.username}
                    className="h-10 w-10 rounded-full grayscale object-cover ring-1 ring-neutral-700"
                  />
                  <div>
                    <h4 className="font-mono-code text-xs font-semibold text-white group-hover:underline">
                      @{author.username}
                    </h4>
                    <span className="font-mono-code text-[10px] text-[#66d9ff]">
                      View Portfolio →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* EXIF Data Grid */}
            <div className="border border-[#38bdf8]/20 bg-[#07111f]/60 rounded-xl p-3">
              <h5 className="font-mono-code text-[10px] uppercase tracking-wider text-[#a5e9ff] mb-2.5 flex items-center gap-1.5">
                <Camera className="h-3 w-3 text-[#66d9ff]" />
                Optical & Exposure Data
              </h5>

              <div className="space-y-2 font-mono-code text-[11px]">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Camera</span>
                  <span className="text-white text-right">{lightboxPhoto.exif.camera || 'Leica M10'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Optics</span>
                  <span className="text-white text-right">{lightboxPhoto.exif.lens || '35mm Summilux'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Aperture</span>
                  <span className="text-[#66d9ff]">{lightboxPhoto.exif.aperture || 'f/2.0'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Shutter</span>
                  <span className="text-white">{lightboxPhoto.exif.shutterSpeed || '1/250s'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">ISO</span>
                  <span className="text-white">{lightboxPhoto.exif.iso || '160'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Location</span>
                  <span className="text-white">{lightboxPhoto.exif.location || 'Studio'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Archival Size</span>
                  <span className="text-[#a5e9ff] font-semibold">{lightboxPhoto.fileSize || '18.4 MB'}</span>
                </div>
              </div>
            </div>

            {/* Direct Send button */}
            <a
              href="https://noirarchive.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#66d9ff] to-[#38bdf8] py-2.5 text-xs font-bold tracking-wider uppercase text-[#050b14] transition-all hover:shadow-[0_0_20px_rgba(102,217,255,0.4)] no-underline"
            >
              <Send className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Launch In Web App</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
