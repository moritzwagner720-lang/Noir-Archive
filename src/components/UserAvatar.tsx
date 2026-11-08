import React from 'react';

interface UserAvatarProps {
  username?: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showOnline?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  M: 'bg-indigo-600 border-indigo-400/40 text-white',
  E: 'bg-cyan-600 border-cyan-400/40 text-white',
  K: 'bg-amber-600 border-amber-400/40 text-white',
  D: 'bg-emerald-600 border-emerald-400/40 text-white',
  A: 'bg-rose-600 border-rose-400/40 text-white',
  B: 'bg-blue-600 border-blue-400/40 text-white',
  C: 'bg-purple-600 border-purple-400/40 text-white',
  F: 'bg-fuchsia-600 border-fuchsia-400/40 text-white',
  G: 'bg-green-600 border-green-400/40 text-white',
  H: 'bg-orange-600 border-orange-400/40 text-white',
  J: 'bg-violet-600 border-violet-400/40 text-white',
  L: 'bg-teal-600 border-teal-400/40 text-white',
  N: 'bg-sky-600 border-sky-400/40 text-white',
  O: 'bg-yellow-600 border-yellow-400/40 text-white',
  P: 'bg-pink-600 border-pink-400/40 text-white',
  R: 'bg-red-600 border-red-400/40 text-white',
  S: 'bg-violet-600 border-violet-400/40 text-white',
  T: 'bg-emerald-600 border-emerald-400/40 text-white',
  V: 'bg-cyan-600 border-cyan-400/40 text-white',
  W: 'bg-blue-600 border-blue-400/40 text-white',
  Z: 'bg-indigo-600 border-indigo-400/40 text-white',
};

const FALLBACK_COLORS = [
  'bg-indigo-600 text-white',
  'bg-cyan-600 text-white',
  'bg-amber-600 text-white',
  'bg-emerald-600 text-white',
  'bg-rose-600 text-white',
  'bg-violet-600 text-white',
  'bg-blue-600 text-white',
  'bg-pink-600 text-white',
  'bg-teal-600 text-white',
];

export function getAvatarColor(identifier: string): string {
  const clean = identifier.replace(/^@/, '').trim().toUpperCase();
  const firstLetter = clean.charAt(0) || '?';
  if (COLOR_MAP[firstLetter]) {
    return COLOR_MAP[firstLetter];
  }
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = clean.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_COLORS.length;
  return FALLBACK_COLORS[index];
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  username = '',
  name = '',
  className = '',
  size = 'md',
  showOnline = false,
}) => {
  const identifier = username || name || 'Anonymous';
  const clean = identifier.replace(/^@/, '').trim();
  const firstLetter = (clean.charAt(0) || '?').toUpperCase();
  const colorClass = getAvatarColor(clean);

  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
    xl: 'h-14 w-14 text-xl',
  }[size];

  const dotClasses = {
    xs: 'h-1.5 w-1.5 ring-1',
    sm: 'h-2 w-2 ring-1.5',
    md: 'h-2.5 w-2.5 ring-2',
    lg: 'h-3 w-3 ring-2',
    xl: 'h-3.5 w-3.5 ring-2',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${sizeClasses} ${colorClass} rounded-full font-sans font-bold flex items-center justify-center select-none shadow-md shadow-black/30 border border-white/10`}
      >
        <span>{firstLetter}</span>
      </div>

      {showOnline && (
        <span
          className={`absolute bottom-0 right-0 ${dotClasses} rounded-full bg-emerald-500 ring-[#131418]`}
          title="Online"
        />
      )}
    </div>
  );
};

export default UserAvatar;
