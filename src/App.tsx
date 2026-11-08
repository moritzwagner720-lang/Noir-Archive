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
import { DevelopersModal } from './components/ExtraModals';
import { LightboxModal } from './components/LightboxModal';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useApp();

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isLoginDisabledOpen, setIsLoginDisabledOpen] = useState(false);
  const [isDevelopersOpen, setIsDevelopersOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#ff6b00] selection:text-black ${
      theme === 'light' ? 'bg-[#fcf8f5] text-stone-900' : 'bg-[#090503] text-white'
    }`}>
      <div>
        {/* Navbar */}
        <YapinNavbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenDownload={() => setIsDownloadOpen(true)}
          onOpenDevelopers={() => setIsDevelopersOpen(true)}
          onOpenLoginModal={() => setIsLoginDisabledOpen(true)}
        />

        {/* Hero Section with Motion animations */}
        <YapinHero
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        {/* Discover & Team Directories sections */}
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
      />

      {/* Interactive Modals */}
      <LightboxModal />

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
