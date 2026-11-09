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
import { DevelopersModal } from './components/ExtraModals';
import { LightboxModal } from './components/LightboxModal';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useApp();
  const [isDevelopersOpen, setIsDevelopersOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-[#66d9ff] selection:text-[#050b14] transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-[#f4faff] text-slate-900'
          : 'bg-[#050b14] text-[#f4faff]'
      }`}
    >
      <div>
        {/* Navigation Bar */}
        <YapinNavbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenDevelopers={() => setIsDevelopersOpen(true)}
        />

        {/* Impressive Full-Screen Winter Ice Hero */}
        <YapinHero />

        {/* Feature Bento & Community Directory Sections */}
        <YapinFeatures />

        {/* "Your Digital World. Without Limits." CTA Card */}
        <YapinCtaCard />

        {/* "Questions & Answers" FAQ Accordion */}
        <YapinFaq />
      </div>

      {/* Footer */}
      <YapinFooter
        onOpenDevelopers={() => setIsDevelopersOpen(true)}
      />

      {/* Interactive Modals */}
      <LightboxModal />

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
