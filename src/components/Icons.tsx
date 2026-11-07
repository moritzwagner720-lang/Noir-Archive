import React from 'react';

// The Minimalist White Navigation Icon (from user attachment /public/assets/aistudio/Minimalist_White_Navigation_Icon_63543507.png)
export const NavigationIconImg: React.FC<{ className?: string; alt?: string }> = ({
  className = 'h-6 w-6 object-contain',
  alt = 'Yapin Navigation Icon',
}) => {
  return (
    <img
      src="/assets/aistudio/Minimalist_White_Navigation_Icon_63543507.png"
      alt={alt}
      className={className}
    />
  );
};

// Vector SVG variant of the minimalist supersonic arrow navigation icon with 3 motion streaks
export const SupersonicArrowIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Upper paper dart / arrow body */}
    <path
      d="M36 43L73 28C77 26.5 80 30 78.5 34L63 71C61 75.8 54.5 76 52 71.5L44 57L36 43Z"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner cockpit dot */}
    <circle cx="68" cy="38" r="4.5" fill="currentColor" />
    {/* Center fold spine */}
    <path
      d="M44 57L54 44"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* 3 aerodynamic speed trail streaks */}
    <path
      d="M26 58L20 66"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path
      d="M32 67L26 75"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path
      d="M38 76L32 84"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

// Authentic Microsoft Windows 4-Quadrant Fluent Logo
export const WindowsIcon: React.FC<{ className?: string; colorMode?: 'monochrome' | 'fluent' }> = ({
  className = 'h-5 w-5',
  colorMode = 'fluent',
}) => {
  if (colorMode === 'fluent') {
    return (
      <svg className={className} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 12.402L35.688 7.531V42.33H0V12.402Z" fill="#00ADEF" />
        <path d="M0 45.67H35.688V80.469L0 75.598V45.67Z" fill="#0078D7" />
        <path d="M39.691 6.984L88 0V42.33H39.691V6.984Z" fill="#00ADEF" />
        <path d="M39.691 45.67H88V88L39.691 81.016V45.67Z" fill="#0078D7" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12.402L35.688 7.531V42.33H0V12.402ZM0 45.67H35.688V80.469L0 75.598V45.67ZM39.691 6.984L88 0V42.33H39.691V6.984ZM39.691 45.67H88V88L39.691 81.016V45.67Z" />
    </svg>
  );
};

// Authentic Windows Setup Installer Executable Icon (.exe setup wizard badge)
export const SetupIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Base installer package card */}
    <rect x="6" y="8" width="52" height="48" rx="8" fill="#1e222b" stroke="#3b4252" strokeWidth="2" />
    {/* Top installer title bar */}
    <path d="M6 16C6 11.5817 9.58172 8 14 8H50C54.4183 8 58 11.5817 58 16V20H6V16Z" fill="#2e3440" />
    <circle cx="13" cy="14" r="2" fill="#ff5f56" />
    <circle cx="19" cy="14" r="2" fill="#ffbd2e" />
    <circle cx="25" cy="14" r="2" fill="#27c93f" />

    {/* Setup Installer CD / Drive insignia */}
    <circle cx="32" cy="38" r="14" fill="#ff6b00" fillOpacity="0.15" stroke="#ff6b00" strokeWidth="2.5" />
    <circle cx="32" cy="38" r="4.5" fill="#ff6b00" />
    <path d="M32 24V28" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 48V52" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 38H22" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 38H46" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" />

    {/* Windows executable badge in bottom-right */}
    <g transform="translate(38, 38)">
      <rect width="20" height="20" rx="4" fill="#0078D7" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M3 5.5L8.5 4.8V9.5H3V5.5ZM3 10.5H8.5V15.2L3 14.5V10.5ZM9.5 4.6L17 3.5V9.5H9.5V4.6ZM9.5 10.5H17V16.5L9.5 15.4V10.5Z" fill="white" />
    </g>
  </svg>
);

// Apple macOS Icon
export const AppleIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.31-7.85-11.97-13.88-25.07-18.09-39.31-4.21-14.24-6.32-27.46-6.32-39.66 0-14.99 3.84-27.65 11.53-37.99 7.69-10.34 17.55-15.63 29.58-15.89 4.35 0 9.49 1.15 15.41 3.44 5.92 2.3 9.92 3.5 12 3.6 2.65-.24 6.84-1.46 12.57-3.68 5.73-2.21 10.74-3.23 15.02-3.07 10.82.52 19.8 4.22 26.94 11.1 7.14 6.88 11.94 15.42 14.4 25.62-9.69 5.86-14.45 13.92-14.28 24.18.17 9.8 4.02 17.84 11.55 24.12 7.53 6.28 16.29 9.83 26.27 10.65-2.07 6.13-4.63 12.38-7.69 18.76zM119.22 33.64c0-6.73 2.53-13.2 7.59-19.41 5.06-6.21 11.38-10.51 18.96-12.9-1.09 6.85-3.83 13.3-8.23 19.35-4.4 6.05-10.5 10.29-18.32 12.96z" />
  </svg>
);

// Linux Tux Icon
export const LinuxIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 2c-2.485 0-4.5 2.015-4.5 4.5 0 .584.113 1.141.318 1.654C7.324 8.784 7 9.61 7 10.5c0 1.25.637 2.35 1.6 3.016-.388.756-.6 1.616-.6 2.484 0 3.314 1.79 6 4 6s4-2.686 4-6c0-.868-.212-1.728-.6-2.484.963-.666 1.6-1.766 1.6-3.016 0-.89-.324-1.716-.818-2.346.205-.513.318-1.07.318-1.654 0-2.485-2.015-4.5-4.5-4.5zm-1.5 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1.5 1.5c1.105 0 2 .448 2 1s-.895 1-2 1-2-.448-2-1 .895-1 2-1z" />
  </svg>
);
