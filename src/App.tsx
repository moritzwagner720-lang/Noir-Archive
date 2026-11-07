/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { YapinNavbar } from './components/YapinNavbar';
import { YapinHero } from './components/YapinHero';
import { YapinFeatures } from './components/YapinFeatures';
import { YapinCtaCard } from './components/YapinCtaCard';
import { YapinFaq } from './components/YapinFaq';
import { YapinFooter } from './components/YapinFooter';
import { DownloadModal } from './components/DownloadModal';
import { LoginDisabledModal } from './components/LoginDisabledModal';
import { DevelopersModal, PlusModal } from './components/ExtraModals';
import { LightboxModal } from './components/LightboxModal';
import { TransferPortalView } from './components/TransferPortalView';

const AppContent: React.FC = () => {
  const { theme, toggleTheme, activeTransferPortalId } = useApp();

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isLoginDisabledOpen, setIsLoginDisabledOpen] = useState(false);
  const [isDevelopersOpen, setIsDevelopersOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);

  // If a direct transfer link is accessed via ?transfer=TR-XXXX
  if (activeTransferPortalId) {
    return (
      <div className={`min-h-screen ${theme === 'light' ? 'bg-[#fcf8f5] text-stone-900' : 'bg-[#090503] text-white'}`}>
        <TransferPortalView transferId={activeTransferPortalId} />
        <LightboxModal />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#ff6b00] selection:text-black ${
      theme === 'light' ? 'bg-[#fcf8f5] text-stone-900' : 'bg-[#090503] text-white'
    }`}>
      <div>
        {/* Navbar matching image 57b91f7c */}
        <YapinNavbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenDownload={() => setIsDownloadOpen(true)}
          onOpenDevelopers={() => setIsDevelopersOpen(true)}
          onOpenPlus={() => setIsPlusOpen(true)}
          onOpenLoginModal={() => setIsLoginDisabledOpen(true)}
        />

        {/* Hero Section */}
        <YapinHero
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        {/* Discover & Direct Deliveries sections */}
        <YapinFeatures />

        {/* "Come archive." CTA Card */}
        <YapinCtaCard
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        {/* "Questions." Accordion FAQ */}
        <YapinFaq />
      </div>

      {/* Footer */}
      <YapinFooter
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenDevelopers={() => setIsDevelopersOpen(true)}
        onOpenPlus={() => setIsPlusOpen(true)}
      />

      {/* Interactive Modals */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      <LoginDisabledModal
        isOpen={isLoginDisabledOpen}
        onClose={() => setIsLoginDisabledOpen(false)}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      <DevelopersModal
        isOpen={isDevelopersOpen}
        onClose={() => setIsDevelopersOpen(false)}
      />

      <PlusModal
        isOpen={isPlusOpen}
        onClose={() => setIsPlusOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
