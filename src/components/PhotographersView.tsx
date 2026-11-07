import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  MapPin,
  Send,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Globe,
} from 'lucide-react';
import { User } from '../types';

export const PhotographersView: React.FC = () => {
  const {
    users,
    projects,
    photos,
    setSelectedPhotographer,
    setActiveTab,
    setIsTransferModalOpen,
    currentUser,
    setAuthModal,
  } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-[10px] uppercase tracking-widest text-neutral-400">
              <span className="h-2 w-2 bg-white" />
              <span>ROSTER OF REGISTERED PHOTOGRAPHERS</span>
            </div>
            <h1 className="mt-1 font-editorial text-2xl font-bold text-white sm:text-3xl">
              Photographer Registry
            </h1>
            <p className="mt-1 text-xs text-neutral-400">
              Explore monochrome artists, review verified portfolios, or transfer project folders directly to any member.
            </p>
          </div>

          {!currentUser && (
            <button
              onClick={() => setAuthModal('signup')}
              className="border border-white bg-white px-4 py-2 font-mono-code text-xs font-semibold uppercase text-black hover:bg-neutral-200"
            >
              Claim Unique Username
            </button>
          )}
        </div>
      </div>

      {/* Grid of Photographers */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map(photographer => {
          const userProjects = projects.filter(p => p.userId === photographer.id);
          const userPhotos = photos.filter(p => p.userId === photographer.id);
          const isCurrent = currentUser?.id === photographer.id;

          return (
            <div
              key={photographer.id}
              className="group border border-neutral-800 bg-neutral-950 p-6 transition-all duration-300 hover:border-neutral-600 flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Header */}
                <div className="flex items-start gap-4">
                  <img
                    src={photographer.avatar}
                    alt={`@${photographer.username}`}
                    className="h-14 w-14 grayscale object-cover ring-1 ring-neutral-700"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-mono-code text-base font-bold text-white">
                        @{photographer.username}
                      </h3>
                      <span title="Verified Unique Handle">
                        <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
                      </span>
                    </div>
                    <p className="font-mono-code text-xs text-neutral-400">
                      Verified Member
                    </p>
                    {isCurrent && (
                      <span className="mt-1 inline-block bg-white text-black font-mono-code text-[9px] px-1.5 font-bold uppercase">
                        Current Session
                      </span>
                    )}
                  </div>
                </div>

                {/* Location & Bio */}
                <div className="mt-4">
                  {photographer.location && (
                    <div className="flex items-center gap-1 font-mono-code text-[11px] text-neutral-400 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{photographer.location}</span>
                    </div>
                  )}
                  <p className="font-sans text-xs leading-relaxed text-neutral-300 line-clamp-3">
                    {photographer.bio}
                  </p>
                </div>

                {/* Stat pills */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-900 pt-3 font-mono-code text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Albums</span>
                    <span className="font-bold text-white">{userProjects.length} Projects</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-400 block">Negatives</span>
                    <span className="font-bold text-white">{userPhotos.length} Works</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 flex items-center gap-2 border-t border-neutral-800 pt-4">
                <button
                  onClick={() => {
                    setSelectedPhotographer(photographer);
                    setActiveTab('projects');
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 border border-neutral-700 bg-neutral-900 py-2 font-mono-code text-xs text-white transition-colors hover:border-white"
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  <span>View Portfolio</span>
                </button>

                {currentUser && !isCurrent && (
                  <button
                    onClick={() => {
                      setIsTransferModalOpen(true);
                    }}
                    title={`Send files to @${photographer.username}`}
                    className="flex items-center justify-center border border-white bg-white px-3 py-2 text-black hover:bg-neutral-200"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
