import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  FolderOpen,
  Send,
  Users,
  Grid,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Globe,
  Upload,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    setSelectedPhotographer,
    setSelectedProject,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    setAuthModal,
    signOut,
    users,
    switchUserQuick,
    setIsTransferModalOpen,
    setIsPublishModalOpen,
    friendRequests,
    publishedPackages,
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const pendingCount = friendRequests.filter(
    r => currentUser && r.toUsername.toLowerCase() === currentUser.username.toLowerCase() && r.status === 'pending'
  ).length;

  const isLight = theme === 'light';

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
        isLight
          ? 'bg-white/90 border-slate-200 text-slate-900'
          : 'bg-[#0a0a0f]/90 border-neutral-800/80 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo (Wix-inspired clean typography) */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setActiveTab('explore');
              setSelectedPhotographer(null);
              setSelectedProject(null);
            }}
            className="group flex flex-col text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600 transition-transform group-hover:scale-125" />
              <span className="font-sans text-lg font-black tracking-wider">
                NOIR ARCHIVE
              </span>
            </div>
            <span className={`text-[10px] font-mono-code tracking-widest ${isLight ? 'text-blue-600 font-medium' : 'text-blue-400'}`}>
              PORTFOLIO & PUBLIC TRANSFERS
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => {
                setActiveTab('explore');
                setSelectedPhotographer(null);
                setSelectedProject(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === 'explore'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Grid className="h-3.5 w-3.5" />
                Gallery
              </span>
            </button>

            {/* Published Files Tab with counter */}
            <button
              onClick={() => {
                setActiveTab('published');
              }}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === 'published'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                Public Downloads
                <span
                  className={`ml-1 text-[10px] font-mono-code px-1.5 py-0.2 rounded-full ${
                    activeTab === 'published'
                      ? 'bg-white/20 text-white'
                      : isLight
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {publishedPackages.length}
                </span>
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('projects');
                setSelectedProject(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" />
                Projects
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('friends');
              }}
              className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === 'friends'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" />
                Friends & Chat
                {pendingCount > 0 && (
                  <span className="ml-1 h-4 w-4 rounded-full bg-rose-600 text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('transfers');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeTab === 'transfers'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Transfers
              </span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setActiveTab('manage');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeTab === 'manage'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5" />
                  Studio
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Search, Theme Pill Switch & User Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search portfolios, files..."
              className={`w-44 rounded-full border py-1.5 pl-8 pr-3 font-mono-code text-xs transition-all focus:w-60 focus:border-blue-600 focus:outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  : 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
              }`}
            />
          </div>

          {/* Interactive Light / Dark Mode Toggle Switch */}
          <div
            onClick={toggleTheme}
            role="button"
            tabIndex={0}
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            className={`flex items-center p-1 rounded-full border cursor-pointer select-none transition-all shadow-sm ${
              isLight
                ? 'bg-slate-100 border-slate-300 hover:border-slate-400'
                : 'bg-neutral-900 border-neutral-700 hover:border-neutral-600'
            }`}
          >
            <div
              className={`flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
                isLight
                  ? 'bg-amber-400 text-slate-900 shadow-sm font-bold scale-110'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </div>
            <div
              className={`flex items-center justify-center h-6 w-6 rounded-full transition-all duration-200 ${
                !isLight
                  ? 'bg-blue-600 text-white shadow-sm font-bold scale-110'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Primary Action Button: Publish Files */}
          <button
            onClick={() => {
              if (!currentUser) {
                setAuthModal('signin');
              } else {
                setIsPublishModalOpen(true);
              }
            }}
            className="hidden items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all sm:flex"
          >
            <Upload className="h-3 w-3" />
            <span>Publish Files</span>
          </button>

          {/* Account Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-left transition-colors ${
                  isLight
                    ? 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-300 dark:ring-neutral-700"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-black" />
                </div>
                <div className="hidden text-left sm:block">
                  <div className="font-mono-code text-[11px] font-semibold">
                    @{currentUser.username}
                  </div>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-2xl border p-4 shadow-2xl z-50 animate-in fade-in transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]'
                      : 'bg-[#12131a] border-neutral-800 text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  <div className="border-b pb-3 border-slate-200 dark:border-neutral-800">
                    <p className="font-mono-code text-xs font-bold">@{currentUser.username}</p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono-code">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Password Secured • 1-of-1 Claim</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsPublishModalOpen(true);
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center justify-between py-1.5 px-2 rounded-lg text-xs hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Upload className="h-3.5 w-3.5" />
                        Publish Files
                      </span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('published');
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center justify-between py-1.5 px-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-neutral-800"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5" />
                        Community Downloads
                      </span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('friends');
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center justify-between py-1.5 px-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-neutral-800"
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Friends & Chat
                      </span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('manage');
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center justify-between py-1.5 px-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-neutral-800"
                    >
                      <span className="flex items-center gap-2">
                        <Camera className="h-3.5 w-3.5" />
                        Project Studio
                      </span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('transfers');
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center justify-between py-1.5 px-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-neutral-800"
                    >
                      <span className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5" />
                        Transfers Hub
                      </span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Switch Persona */}
                  <div className="border-t pt-2 border-slate-200 dark:border-neutral-800">
                    <p className="font-mono-code text-[9px] uppercase tracking-wider opacity-60">
                      Switch Persona:
                    </p>
                    <div className="mt-1 flex flex-col gap-1">
                      {users.map(u => (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUserQuick(u.username);
                            setShowUserDropdown(false);
                          }}
                          className={`flex items-center justify-between px-2 py-1 rounded text-[11px] font-mono-code ${
                            u.username === currentUser.username
                              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold'
                              : 'opacity-75 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <span>@{u.username}</span>
                          <span className="text-[9px] opacity-60">{u.location || 'Member'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-2 border-slate-200 dark:border-neutral-800">
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserDropdown(false);
                      }}
                      className="flex w-full items-center gap-2 text-xs text-rose-500 hover:text-rose-600 py-1"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthModal('signin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isLight ? 'text-slate-700 hover:text-slate-900' : 'text-neutral-300 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div
        className={`flex items-center justify-around border-t px-2 py-2 md:hidden text-[11px] font-medium uppercase tracking-wider ${
          isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-[#0f1016]/90 border-neutral-800'
        }`}
      >
        <button
          onClick={() => {
            setActiveTab('explore');
            setSelectedPhotographer(null);
            setSelectedProject(null);
          }}
          className={activeTab === 'explore' ? 'text-blue-600 font-bold' : 'opacity-70'}
        >
          Gallery
        </button>

        <button
          onClick={() => setActiveTab('published')}
          className={activeTab === 'published' ? 'text-blue-600 font-bold' : 'opacity-70'}
        >
          Downloads ({publishedPackages.length})
        </button>

        <button
          onClick={() => {
            setActiveTab('projects');
            setSelectedProject(null);
          }}
          className={activeTab === 'projects' ? 'text-blue-600 font-bold' : 'opacity-70'}
        >
          Projects
        </button>

        <button
          onClick={() => setActiveTab('friends')}
          className={`flex items-center gap-1 ${activeTab === 'friends' ? 'text-blue-600 font-bold' : 'opacity-70'}`}
        >
          Friends
          {pendingCount > 0 && <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />}
        </button>

        <button
          onClick={() => setActiveTab('transfers')}
          className={activeTab === 'transfers' ? 'text-blue-600 font-bold' : 'opacity-70'}
        >
          Transfers
        </button>
      </div>
    </header>
  );
};
