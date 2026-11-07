/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroTransferSection } from './components/HeroTransferSection';
import { FriendsMessenger } from './components/FriendsMessenger';
import { PublishedFilesSection } from './components/PublishedFilesSection';
import { PublishModal } from './components/PublishModal';
import { PhotoGrid } from './components/PhotoGrid';
import { ProjectsView } from './components/ProjectsView';
import { TransfersDashboard } from './components/TransfersDashboard';
import { ProjectManagement } from './components/ProjectManagement';
import { LightboxModal } from './components/LightboxModal';
import { AuthModal } from './components/AuthModal';
import { SendTransferModal } from './components/SendTransferModal';
import { TransferPortalView } from './components/TransferPortalView';
import {
  Camera,
  Send,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  Grid,
  Search,
  Users,
  Sparkles,
  Globe,
  Upload,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    photos,
    searchQuery,
    setSearchQuery,
    currentUser,
    setAuthModal,
    setIsTransferModalOpen,
    setIsPublishModalOpen,
    activeTransferPortalId,
    theme,
    publishedPackages,
  } = useApp();

  const isLight = theme === 'light';

  // If a direct transfer link is accessed (e.g. ?transfer=TR-4912)
  if (activeTransferPortalId) {
    return (
      <div
        className={`min-h-screen transition-colors duration-200 ${
          isLight ? 'bg-[#fbfbfd] text-slate-900' : 'bg-[#0a0a0f] text-white'
        }`}
      >
        <Navbar />
        <TransferPortalView transferId={activeTransferPortalId} />
        <LightboxModal />
        <AuthModal />
        <PublishModal />
      </div>
    );
  }

  // Filter photos by search query if any
  const displayedPhotos = searchQuery.trim()
    ? photos.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.exif.camera?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.exif.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : photos;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between ${
        isLight
          ? 'bg-[#fbfbfd] text-slate-900 selection:bg-blue-600 selection:text-white'
          : 'bg-[#0a0a0f] text-white selection:bg-blue-500 selection:text-white'
      }`}
    >
      <div>
        <Navbar />

        {/* Start Page (Explore / Home view) */}
        {activeTab === 'explore' && !searchQuery.trim() && (
          <div>
            {/* 1. Wix-inspired Hero with user's headline and interactive floating card */}
            <HeroTransferSection />

            {/* 2. Published Community Files Section (Anyone can download!) */}
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
              <PublishedFilesSection />
            </section>

            {/* 3. Scroll-Down Option: Add Friends & Peer Chat Messenger with '+' file/folder selector */}
            <div className="border-t border-slate-200 dark:border-neutral-800">
              <FriendsMessenger />
            </div>

            {/* 4. Photography Portfolios & Grid Layout Section */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 border-t border-slate-200 dark:border-neutral-800">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-blue-600 font-bold">
                      CURATED PORTFOLIOS
                    </span>
                  </div>
                  <h2 className="mt-1 font-sans text-2xl font-bold tracking-tight">
                    Photography Portfolio Archive
                  </h2>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
                    Grid-based layouts highlighting architectural monoliths, high-contrast portraiture, and street nocturnal frames.
                  </p>
                </div>
              </div>

              <PhotoGrid photos={displayedPhotos} showControls={true} />
            </section>
          </div>
        )}

        {/* Search Results Notice */}
        {searchQuery.trim() && (
          <div
            className={`border-b px-4 py-3 sm:px-6 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900/60 border-neutral-800'
            }`}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between font-mono-code text-xs">
              <span>
                Search results for "<strong className="text-blue-600">{searchQuery}</strong>" ({displayedPhotos.length} works found)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:underline"
              >
                Clear Search
              </button>
            </div>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <PhotoGrid photos={displayedPhotos} showControls={true} />
            </div>
          </div>
        )}

        {/* Dedicated Views */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          {activeTab === 'published' && <PublishedFilesSection />}

          {activeTab === 'projects' && <ProjectsView />}

          {activeTab === 'friends' && <FriendsMessenger />}

          {activeTab === 'transfers' && <TransfersDashboard />}

          {activeTab === 'manage' && <ProjectManagement />}
        </main>
      </div>

      {/* Modern Minimalist Footer with light/dark adaptive palette */}
      <footer
        className={`border-t py-12 px-4 sm:px-6 mt-16 transition-colors ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-600'
            : 'bg-[#08080c] border-neutral-800 text-neutral-400'
        }`}
      >
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between font-mono-code text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              <span className={`font-sans text-sm font-bold tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                NOIR ARCHIVE
              </span>
            </div>
            <p className="mt-1 text-[11px] opacity-75">
              Minimalist Photography Portfolios & Open Public File Transfers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-blue-600 font-semibold">"Send anything. To anyone."</span>
            <span>•</span>
            <span>Public Downloads</span>
            <span>•</span>
            <span>Peer Messenger</span>
            <span>•</span>
            <span>1-of-1 Username Security</span>
          </div>

          <div className="text-[11px] opacity-60">
            © {new Date().getFullYear()} NOIR ARCHIVE.
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <LightboxModal />
      <AuthModal />
      <SendTransferModal />
      <PublishModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
