import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Users,
  Check,
  Trash2,
  Clock,
  Inbox,
  Send,
  AlertCircle,
  UserCheck,
} from 'lucide-react';

interface FriendRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FriendRequestsModal: React.FC<FriendRequestsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    currentUser,
    friendRequests,
    users,
    acceptFriendRequestAction,
    declineFriendRequestAction,
    cancelFriendRequestAction,
    theme,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
  const [feedback, setFeedback] = useState<string | null>(null);

  const isLight = theme === 'light';

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentUser) return null;

  const incomingRequests = friendRequests.filter(
    r =>
      r.toUsername.toLowerCase() === currentUser.username.toLowerCase() &&
      r.status === 'pending'
  );

  const sentRequests = friendRequests.filter(
    r =>
      r.fromUsername.toLowerCase() === currentUser.username.toLowerCase() &&
      r.status === 'pending'
  );

  const getUserDetails = (username: string) => {
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  };

  const handleAccept = (requestId: string, fromUsername: string) => {
    acceptFriendRequestAction(requestId);
    setFeedback(`Accepted @${fromUsername}'s friend request! You can now chat.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDecline = (requestId: string, fromUsername: string) => {
    declineFriendRequestAction(requestId);
    setFeedback(`Declined request from @${fromUsername}.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCancel = (requestId: string, toUsername: string) => {
    cancelFriendRequestAction(requestId);
    setFeedback(`Cancelled friend request to @${toUsername}.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl border shadow-2xl transition-all overflow-hidden ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#12131a] border-neutral-800 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-6 py-4 ${
            isLight ? 'border-slate-200 bg-slate-50/70' : 'border-neutral-800/80 bg-neutral-950/60'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-sans text-base font-bold tracking-tight">
                Friend Requests Hub
              </h2>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-neutral-400'}`}>
                Review incoming requests and manage sent invitations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`rounded-full p-1.5 transition-colors ${
              isLight
                ? 'text-slate-400 hover:bg-slate-200 hover:text-slate-700'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
            aria-label="Close friend requests modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Feedback Banner */}
        {feedback && (
          <div className="border-b border-blue-500/20 bg-blue-500/10 px-6 py-2.5 font-sans text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <UserCheck className="h-4 w-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div
          className={`flex border-b px-6 pt-3 gap-6 font-mono-code text-xs ${
            isLight ? 'border-slate-200' : 'border-neutral-800'
          }`}
        >
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex items-center gap-2 pb-3 border-b-2 font-medium transition-colors ${
              activeTab === 'incoming'
                ? 'border-blue-600 text-blue-600 font-bold'
                : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-neutral-400 hover:text-white'}`
            }`}
          >
            <Inbox className="h-3.5 w-3.5" />
            <span>Incoming</span>
            {incomingRequests.length > 0 && (
              <span className="ml-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                {incomingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sent')}
            className={`flex items-center gap-2 pb-3 border-b-2 font-medium transition-colors ${
              activeTab === 'sent'
                ? 'border-blue-600 text-blue-600 font-bold'
                : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-neutral-400 hover:text-white'}`
            }`}
          >
            <Send className="h-3.5 w-3.5" />
            <span>Sent Out</span>
            {sentRequests.length > 0 && (
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${
                  isLight ? 'bg-slate-200 text-slate-700' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                {sentRequests.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="max-h-[380px] overflow-y-auto p-6 space-y-3">
          {activeTab === 'incoming' && (
            <>
              {incomingRequests.length === 0 ? (
                <div className="py-12 text-center">
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                      isLight ? 'bg-slate-100 text-slate-400' : 'bg-neutral-900 text-neutral-500'
                    }`}
                  >
                    <Inbox className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-sm font-semibold">No Incoming Requests</h3>
                  <p
                    className={`mt-1 font-sans text-xs max-w-xs mx-auto ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    When other creators send you a friend request, you will see them here with options to accept or decline.
                  </p>
                </div>
              ) : (
                incomingRequests.map(req => {
                  const userDetail = getUserDetails(req.fromUsername);
                  return (
                    <div
                      key={req.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition-colors ${
                        isLight
                          ? 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                          : 'border-neutral-800/80 bg-neutral-900/50 hover:bg-neutral-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            userDetail?.avatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                          }
                          alt={req.fromUsername}
                          className="h-10 w-10 rounded-full object-cover border border-slate-300 dark:border-neutral-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-xs font-bold">
                              @{req.fromUsername}
                            </span>
                            {userDetail?.location && (
                              <span
                                className={`text-[10px] ${
                                  isLight ? 'text-slate-400' : 'text-neutral-500'
                                }`}
                              >
                                • {userDetail.location}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-[11px] line-clamp-1 ${
                              isLight ? 'text-slate-500' : 'text-neutral-400'
                            }`}
                          >
                            {userDetail?.bio || 'Wants to connect and exchange portfolios.'}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleAccept(req.id, req.fromUsername)}
                          className="flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1.5 font-sans text-xs font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-500 transition-all"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleDecline(req.id, req.fromUsername)}
                          className={`flex items-center gap-1 rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${
                            isLight
                              ? 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-red-600'
                              : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-red-400'
                          }`}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'sent' && (
            <>
              {sentRequests.length === 0 ? (
                <div className="py-12 text-center">
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                      isLight ? 'bg-slate-100 text-slate-400' : 'bg-neutral-900 text-neutral-500'
                    }`}
                  >
                    <Send className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans text-sm font-semibold">No Pending Sent Requests</h3>
                  <p
                    className={`mt-1 font-sans text-xs max-w-xs mx-auto ${
                      isLight ? 'text-slate-500' : 'text-neutral-400'
                    }`}
                  >
                    When you send a request to another creator, it will stay here until they accept or decline it.
                  </p>
                </div>
              ) : (
                sentRequests.map(req => {
                  const userDetail = getUserDetails(req.toUsername);
                  return (
                    <div
                      key={req.id}
                      className={`flex items-center justify-between gap-3 p-4 rounded-xl border transition-colors ${
                        isLight
                          ? 'border-slate-200 bg-slate-50/60'
                          : 'border-neutral-800/80 bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            userDetail?.avatar ||
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                          }
                          alt={req.toUsername}
                          className="h-10 w-10 rounded-full object-cover border border-slate-300 dark:border-neutral-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-xs font-bold">
                              @{req.toUsername}
                            </span>
                            <span className="flex items-center gap-1 font-mono-code text-[10px] text-amber-500">
                              <Clock className="h-3 w-3" />
                              <span>Pending</span>
                            </span>
                          </div>
                          <p
                            className={`text-[11px] ${
                              isLight ? 'text-slate-500' : 'text-neutral-400'
                            }`}
                          >
                            Waiting for @{req.toUsername} to accept
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCancel(req.id, req.toUsername)}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${
                          isLight
                            ? 'border-slate-300 text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                            : 'border-neutral-700 text-neutral-300 hover:border-red-900 hover:bg-red-950/30 hover:text-red-400'
                        }`}
                        title="Cancel this friend request"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          className={`border-t px-6 py-3.5 flex justify-end font-mono-code text-xs ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-neutral-800 bg-neutral-950/80'
          }`}
        >
          <button
            onClick={onClose}
            className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-colors ${
              isLight
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
