import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { validateUsername, validatePassword } from '../utils/auth';
import {
  Lock,
  User as UserIcon,
  MapPin,
  FileText,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Camera,
  FolderLock,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

export const AuthGate: React.FC = () => {
  const { signIn, signUp, users, theme, toggleTheme } = useApp();
  const isLight = theme === 'light';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Live validation states for signup
  const [usernameStatus, setUsernameStatus] = useState<{
    isValid: boolean;
    error?: string;
  } | null>(null);
  const [passwordStatus, setPasswordStatus] = useState<{
    isValid: boolean;
    score: number;
    feedback: string;
  } | null>(null);

  useEffect(() => {
    setFormError(null);
  }, [mode]);

  // Real-time username uniqueness check
  useEffect(() => {
    if (mode === 'signup' && username.trim().length > 0) {
      const result = validateUsername(username, users);
      setUsernameStatus(result);
    } else {
      setUsernameStatus(null);
    }
  }, [username, users, mode]);

  // Real-time password strength check
  useEffect(() => {
    if (mode === 'signup' && password.length > 0) {
      const result = validatePassword(password);
      setPasswordStatus(result);
    } else {
      setPasswordStatus(null);
    }
  }, [password, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (mode === 'signup') {
      const res = signUp({
        username: username.trim(),
        password,
        location: location.trim() || undefined,
        bio: bio.trim() || undefined,
      });

      if (!res.success) {
        setFormError(res.error || 'Failed to create account.');
      }
    } else {
      const res = signIn(username.trim(), password);
      if (!res.success) {
        setFormError(res.error || 'Invalid username or password.');
      }
    }
  };


  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isLight ? 'bg-[#fbfbfd] text-slate-900' : 'bg-[#09090d] text-white'
      }`}
    >
      {/* Top Bar with brand & theme toggle */}
      <header
        className={`border-b px-4 py-4 sm:px-8 transition-colors ${
          isLight ? 'bg-white/80 border-slate-200' : 'bg-black/60 border-neutral-800'
        } backdrop-blur-md`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
            <div>
              <span className="font-editorial text-lg tracking-widest font-semibold uppercase">
                NOIR ARCHIVE
              </span>
              <span className="hidden sm:inline-block ml-3 font-mono-code text-[11px] text-blue-600 uppercase tracking-widest font-semibold">
                / AUTHENTICATION REQUIRED
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono-code text-xs transition-colors ${
                isLight
                  ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="h-3.5 w-3.5 text-blue-600" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Hero Banner text */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono-code text-[11px] uppercase tracking-wider mb-3 bg-blue-500/10 border-blue-500/30 text-blue-600">
              <Shield className="h-3.5 w-3.5" />
              <span>Identity Verification</span>
            </div>
            <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight">
              {mode === 'signin' ? 'Sign In to Enter Archive' : 'Create Unique Username'}
            </h1>
            <p className={`mt-2 font-sans text-xs max-w-sm mx-auto ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
              {mode === 'signin'
                ? 'Authentication is required before accessing photography portfolios, private transfers, and the darkroom messenger.'
                : 'Claim your permanent unique handle (can only be registered once) and secure your account with a password.'}
            </p>
          </div>


          {/* Auth Card */}
          <div
            className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#12131a] border-neutral-800'
            }`}
          >
            {/* Mode Switcher Tabs */}
            <div
              className={`mb-6 grid grid-cols-2 rounded-full border p-1 font-mono-code text-xs ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-neutral-900 border-neutral-800'
              }`}
            >
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`rounded-full py-2 font-semibold transition-all ${
                  mode === 'signin'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`rounded-full py-2 font-semibold transition-all ${
                  mode === 'signup'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field with visible label */}
              <div>
                <label className="block font-mono-code text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <UserIcon className="h-3.5 w-3.5 text-blue-600" />
                    <span>Username Handle</span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-code text-xs font-bold text-blue-600">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    aria-label="Username Handle"
                    className={`w-full rounded-xl border py-2.5 pl-8 pr-3 font-mono-code text-xs transition-colors focus:border-blue-600 focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  />
                </div>
                {mode === 'signup' && usernameStatus && (
                  <div className="mt-1.5 flex items-center gap-1.5 font-mono-code text-[11px]">
                    {usernameStatus.isValid ? (
                      <span className="flex items-center gap-1 text-emerald-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Handle is available</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500">
                        <AlertCircle className="h-3 w-3" />
                        <span>{usernameStatus.error}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Password Field with visible label */}
              <div>
                <label className="block font-mono-code text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-blue-600" />
                    <span>Password</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    aria-label="Account Password"
                    className={`w-full rounded-xl border py-2.5 pl-3.5 pr-10 font-mono-code text-xs transition-colors focus:border-blue-600 focus:outline-none ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-neutral-900 border-neutral-700 text-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isLight ? 'text-slate-400 hover:text-slate-700' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {mode === 'signup' && passwordStatus && (
                  <div className="mt-1.5">
                    <div className="flex gap-1 h-1 w-full bg-neutral-800 rounded-full overflow-hidden mb-1">
                      {[1, 2, 3, 4].map(idx => (
                        <div
                          key={idx}
                          className={`flex-1 transition-all ${
                            idx <= passwordStatus.score
                              ? passwordStatus.score >= 3
                                ? 'bg-emerald-500'
                                : passwordStatus.score === 2
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`font-mono-code text-[10px] ${
                        passwordStatus.score >= 3
                          ? 'text-emerald-500'
                          : passwordStatus.score === 2
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {passwordStatus.feedback}
                    </span>
                  </div>
                )}
              </div>

              {/* Extra Signup Details: Location & Bio (visible labels) */}
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block font-mono-code text-xs font-semibold uppercase tracking-wider mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-blue-600" />
                        <span>Studio Location (Optional)</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      aria-label="Studio Location"
                      className={`w-full rounded-xl border py-2.5 px-3.5 font-mono-code text-xs transition-colors focus:border-blue-600 focus:outline-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900'
                          : 'bg-neutral-900 border-neutral-700 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code text-xs font-semibold uppercase tracking-wider mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-blue-600" />
                        <span>Artist Statement / Bio (Optional)</span>
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      aria-label="Artist Statement and Bio"
                      className={`w-full rounded-xl border py-2.5 px-3.5 font-sans text-xs transition-colors focus:border-blue-600 focus:outline-none resize-none ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900'
                          : 'bg-neutral-900 border-neutral-700 text-white'
                      }`}
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-sans text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{mode === 'signin' ? 'Sign In & Access Archive' : 'Register Handle & Enter'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Static Reference for existing accounts (Manual typing required) */}
            {mode === 'signin' && (
              <div
                className={`mt-6 border-t pt-4 ${
                  isLight ? 'border-slate-200 text-slate-600' : 'border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono-code text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Registered Accounts (Type into fields above):</span>
                </div>
                <div className="space-y-1 font-mono-code text-[11px]">
                  <div className="flex justify-between items-center py-0.5">
                    <span>Username: <strong className={isLight ? 'text-slate-900' : 'text-white'}>moritz</strong></span>
                    <span>Password: <strong className={isLight ? 'text-slate-900' : 'text-white'}>password123</strong></span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span>Username: <strong className={isLight ? 'text-slate-900' : 'text-white'}>elena_k</strong></span>
                    <span>Password: <strong className={isLight ? 'text-slate-900' : 'text-white'}>secret456</strong></span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span>Username: <strong className={isLight ? 'text-slate-900' : 'text-white'}>kenji_mono</strong></span>
                    <span>Password: <strong className={isLight ? 'text-slate-900' : 'text-white'}>mono789</strong></span>
                  </div>
                </div>
                <p className="mt-2 font-sans text-[10px] opacity-75">
                  Type your username and password into the form to sign in, or click "Create Account" above to register a new unique handle.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-6 px-4 text-center font-mono-code text-[11px] transition-colors ${
          isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-black/60 border-neutral-800 text-neutral-400'
        }`}
      >
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>NOIR ARCHIVE — Minimalist Photography Portfolios & File Delivery</span>
          <div className="flex items-center gap-4">
            <span>Single Registration Handles</span>
            <span>•</span>
            <span>Protected Client Portals</span>
            <span>•</span>
            <span>ZIP Batch Transfers</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
