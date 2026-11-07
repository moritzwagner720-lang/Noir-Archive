import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  Send,
  Plus,
  Paperclip,
  Folder,
  FileImage,
  Upload,
  Download,
  Check,
  Clock,
  MessageSquare,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  FileArchive,
  Image as ImageIcon,
  FolderDown,
  X,
} from 'lucide-react';
import { TransferFile, ChatAttachment } from '../types';
import JSZip from 'jszip';

export const FriendsMessenger: React.FC = () => {
  const {
    currentUser,
    users,
    projects,
    photos,
    friendRequests,
    chatMessages,
    sendFriendRequestAction,
    acceptFriendRequestAction,
    declineFriendRequestAction,
    sendChatMessageAction,
    activeChatFriend,
    setActiveChatFriend,
    setAuthModal,
    setLightboxPhoto,
    theme,
  } = useApp();

  const [addFriendInput, setAddFriendInput] = useState('');
  const [requestFeedback, setRequestFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [isZipping, setIsZipping] = useState<string | null>(null);

  const isLight = theme === 'light';

  if (!currentUser) {
    return (
      <section id="friends-section" className="mx-auto max-w-4xl py-12 px-4 text-center">
        <div
          className={`rounded-2xl border p-8 shadow-xl relative overflow-hidden transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#12131a] border-neutral-800 text-white'
          }`}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl" />
          <UserPlus className="mx-auto mb-3 h-10 w-10 text-blue-600" />
          <h2 className="font-sans text-2xl font-bold">Friends & Direct Peer File Messenger</h2>
          <p className={`mt-2 text-xs max-w-md mx-auto ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Connect with other creators, send friend requests by username, and exchange high-resolution files and folders directly inside live chat.
          </p>
          <button
            onClick={() => setAuthModal('signup')}
            className="mt-5 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/25"
          >
            Claim Username & Join Friends
          </button>
        </div>
      </section>
    );
  }

  // Current user's friend handles
  const friendsList = currentUser.friends || [];

  // Pending incoming requests
  const pendingIncoming = friendRequests.filter(
    r => r.toUsername.toLowerCase() === currentUser.username.toLowerCase() && r.status === 'pending'
  );

  // Send a friend request
  const handleSendFriendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFriendInput.trim()) return;

    const res = sendFriendRequestAction(addFriendInput.trim());
    if (res.success) {
      setRequestFeedback({
        success: true,
        message: `Friend request sent to @${addFriendInput.trim()}!`,
      });
      setAddFriendInput('');
    } else {
      setRequestFeedback({
        success: false,
        message: res.error || 'Failed to send request.',
      });
    }

    setTimeout(() => setRequestFeedback(null), 4000);
  };

  // Chat conversation messages
  const conversationMessages = chatMessages.filter(
    m =>
      activeChatFriend &&
      ((m.senderUsername.toLowerCase() === currentUser.username.toLowerCase() &&
        m.recipientUsername.toLowerCase() === activeChatFriend.toLowerCase()) ||
        (m.senderUsername.toLowerCase() === activeChatFriend.toLowerCase() &&
          m.recipientUsername.toLowerCase() === currentUser.username.toLowerCase()))
  );

  // Send regular text message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChatFriend || !messageText.trim()) return;

    sendChatMessageAction(activeChatFriend, messageText.trim());
    setMessageText('');
  };

  // Send a specific file as attachment in chat
  const handleSendFileAttachment = (file: TransferFile) => {
    if (!activeChatFriend) return;
    const attachment: ChatAttachment = {
      type: 'file',
      title: file.name,
      files: [file],
      totalSize: file.size,
    };
    sendChatMessageAction(activeChatFriend, messageText.trim() || `Sent file: ${file.name}`, attachment);
    setMessageText('');
    setShowAttachMenu(false);
    setShowFileModal(false);
  };

  // Send a specific folder as attachment in chat
  const handleSendFolderAttachment = (folderName: string, filesList: TransferFile[]) => {
    if (!activeChatFriend || filesList.length === 0) return;
    const attachment: ChatAttachment = {
      type: 'folder',
      title: folderName,
      files: filesList,
      totalSize: `${filesList.length * 15} MB`,
    };
    sendChatMessageAction(activeChatFriend, messageText.trim() || `Sent folder: ${folderName} (${filesList.length} files)`, attachment);
    setMessageText('');
    setShowAttachMenu(false);
    setShowFolderModal(false);
  };

  // Local file picker handler
  const handleLocalFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeChatFriend) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const tf: TransferFile = {
        id: `f-${Date.now()}`,
        name: file.name,
        url,
        size: `${sizeMb} MB`,
        type: file.type || 'image/jpeg',
      };
      handleSendFileAttachment(tf);
    };
    reader.readAsDataURL(file);
  };

  // Local folder picker handler (supports webkitdirectory for real folder upload!)
  const handleLocalFolderChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !activeChatFriend) return;

    const folderName = files[0].webkitRelativePath?.split('/')[0] || 'Uploaded_Folder';
    const compiled: TransferFile[] = [];

    Array.from(files).slice(0, 10).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        compiled.push({
          id: `f-${Date.now()}-${idx}`,
          name: file.name,
          url,
          size: `${sizeMb} MB`,
          type: file.type || 'image/jpeg',
          folderPath: folderName,
        });

        if (compiled.length === Math.min(files.length, 10)) {
          handleSendFolderAttachment(folderName, compiled);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Download folder attachment as ZIP inside chat
  const handleDownloadAttachmentZip = async (attachment: ChatAttachment) => {
    try {
      setIsZipping(attachment.title);
      const zip = new JSZip();
      const folder = zip.folder(attachment.title) || zip;

      for (const f of attachment.files) {
        try {
          if (f.url.startsWith('data:')) {
            const base64Data = f.url.split(',')[1];
            folder.file(f.name, base64Data, { base64: true });
          } else {
            const res = await fetch(f.url);
            const blob = await res.blob();
            folder.file(f.name, blob);
          }
        } catch {
          folder.file(f.name.replace(/\.\w+$/, '.txt'), `File asset: ${f.name}\nSource: ${f.url}`);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${attachment.title}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error(err);
      alert('Could not generate ZIP');
    } finally {
      setIsZipping(null);
    }
  };

  return (
    <section id="friends-section" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Section Header */}
      <div className={`mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between border-b pb-5 transition-colors ${
        isLight ? 'border-slate-200' : 'border-neutral-800'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-blue-600">
              PEER MESSAGING & FILE EXCHANGE
            </span>
          </div>
          <h2 className="mt-1 font-sans text-2xl font-bold tracking-tight sm:text-3xl">
            Add Friends & Direct File Transfer
          </h2>
          <p className={`mt-1 text-xs ${isLight ? 'text-slate-600' : 'text-neutral-400'}`}>
            Send friend requests to creators, chat in real-time, and transfer files or folders directly in conversation.
          </p>
        </div>

        {/* Add Friend Form */}
        <form onSubmit={handleSendFriendRequest} className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-code text-xs text-slate-400">
              @
            </span>
            <input
              type="text"
              value={addFriendInput}
              onChange={e => setAddFriendInput(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="friend_username"
              className={`w-48 sm:w-56 rounded-full border py-2 pl-7 pr-3 font-mono-code text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  : 'bg-neutral-900 border-neutral-700 text-white placeholder-neutral-500'
              }`}
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 font-sans text-xs font-semibold text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/25"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Add Friend</span>
          </button>
        </form>
      </div>

      {/* Friend Request Feedback */}
      {requestFeedback && (
        <div
          className={`mb-6 flex items-center gap-2 p-3 text-xs rounded-xl border ${
            requestFeedback.success
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300'
          }`}
        >
          {requestFeedback.success ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          )}
          <span>{requestFeedback.message}</span>
        </div>
      )}

      {/* Pending Incoming Requests Banner */}
      {pendingIncoming.length > 0 && (
        <div className={`mb-6 rounded-2xl border p-4 ${
          isLight ? 'border-blue-200 bg-blue-50/60' : 'border-blue-900/50 bg-blue-950/20'
        }`}>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <UserPlus className="h-4 w-4" />
            <span>Incoming Friend Requests ({pendingIncoming.length})</span>
          </div>
          <div className="space-y-2">
            {pendingIncoming.map(req => (
              <div
                key={req.id}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  isLight ? 'bg-white border-slate-200' : 'bg-neutral-900 border-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2 font-mono-code text-xs">
                  <span className="font-semibold text-blue-600">@{req.fromUsername}</span>
                  <span className="opacity-70">wants to connect with you</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptFriendRequestAction(req.id)}
                    className="rounded-full bg-emerald-600 px-3.5 py-1 text-xs font-semibold text-white hover:bg-emerald-500 shadow-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineFriendRequestAction(req.id)}
                    className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                      isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-100' : 'border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Friends & Messenger Layout */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 rounded-2xl border min-h-[550px] shadow-xl overflow-hidden transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#12131a] border-neutral-800 text-white'
        }`}
      >
        {/* Left: Friends List Sidebar (4 cols) */}
        <div
          className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r flex flex-col justify-between ${
            isLight ? 'border-slate-200 bg-slate-50/50' : 'border-neutral-800 bg-neutral-950/40'
          }`}
        >
          <div>
            <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-neutral-800'}`}>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">
                  Friends ({friendsList.length})
                </span>
              </div>
              <span className="font-mono-code text-[10px] opacity-60">Connected</span>
            </div>

            {/* List of Friends */}
            {friendsList.length === 0 ? (
              <div className="p-8 text-center opacity-60 font-mono-code text-xs">
                <p>No friends added yet.</p>
                <p className="mt-1 text-[11px]">
                  Type a username above like <span className="text-blue-600">@elena_k</span> to send a request!
                </p>
              </div>
            ) : (
              <div className={`divide-y ${isLight ? 'divide-slate-200/60' : 'divide-neutral-900'}`}>
                {friendsList.map(handle => {
                  const friendUser = users.find(u => u.username.toLowerCase() === handle.toLowerCase());
                  const isSelected = activeChatFriend?.toLowerCase() === handle.toLowerCase();

                  return (
                    <button
                      key={handle}
                      onClick={() => setActiveChatFriend(handle)}
                      className={`w-full flex items-center justify-between p-3.5 text-left transition-colors ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50/80 border-l-4 border-blue-600'
                            : 'bg-blue-950/30 border-l-4 border-blue-500'
                          : isLight
                          ? 'hover:bg-slate-100/70'
                          : 'hover:bg-neutral-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={
                              friendUser?.avatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                            }
                            alt={handle}
                            className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-neutral-700"
                          />
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black" />
                        </div>
                        <div>
                          <p className="font-mono-code text-xs font-semibold">
                            @{handle}
                          </p>
                          <p className="font-sans text-[11px] opacity-70 line-clamp-1">
                            {friendUser?.bio || 'Connected collaborator'}
                          </p>
                        </div>
                      </div>

                      <span className="font-mono-code text-[11px] text-blue-600 font-medium">
                        Chat →
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Member Discovery Helper */}
          <div className={`p-3 border-t font-mono-code text-[10px] ${
            isLight ? 'border-slate-200 bg-slate-100/70' : 'border-neutral-900 bg-neutral-950/80'
          }`}>
            <span className="block uppercase opacity-60 mb-1">Discover Platform Creators:</span>
            <div className="flex flex-wrap gap-1">
              {users
                .filter(u => u.username !== currentUser.username && !friendsList.includes(u.username))
                .map(u => (
                  <button
                    key={u.id}
                    onClick={() => sendFriendRequestAction(u.username)}
                    className={`rounded-full px-2.5 py-0.5 border text-[10px] transition-colors ${
                      isLight
                        ? 'border-slate-300 bg-white hover:border-blue-500 hover:text-blue-600'
                        : 'border-neutral-800 bg-neutral-900 hover:border-blue-400 hover:text-white'
                    }`}
                  >
                    + @{u.username}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Right: Live Chat with Active Friend (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[550px]">
          {activeChatFriend ? (
            <>
              {/* Chat Header */}
              <div className={`p-3.5 border-b flex items-center justify-between ${
                isLight ? 'border-slate-200 bg-slate-50/70' : 'border-neutral-800 bg-neutral-900/50'
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-mono-code text-xs font-semibold">
                    @{activeChatFriend}
                  </span>
                  <span className="font-mono-code text-[10px] opacity-60">
                    • Live Peer Channel
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFolderModal(true)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono-code text-[11px] transition-colors ${
                      isLight
                        ? 'border-slate-300 bg-white hover:border-blue-600 hover:text-blue-600'
                        : 'border-neutral-700 bg-neutral-900 hover:border-white'
                    }`}
                  >
                    <Folder className="h-3 w-3 text-cyan-500" />
                    <span>Send Folder</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center opacity-60 font-mono-code text-xs">
                    <MessageSquare className="h-8 w-8 mb-2 opacity-50" />
                    <p>Start a conversation with @{activeChatFriend}</p>
                    <p className="text-[11px] mt-1">
                      Use the "+" icon on the right of the typing bar to send files or entire folders.
                    </p>
                  </div>
                ) : (
                  conversationMessages.map(msg => {
                    const isMe = msg.senderUsername.toLowerCase() === currentUser.username.toLowerCase();

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-mono-code text-[10px] opacity-60">
                          <span>@{msg.senderUsername}</span>
                          <span>•</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {/* Text bubble */}
                        {msg.text && (
                          <div
                            className={`max-w-md rounded-2xl px-4 py-2 text-xs font-sans leading-relaxed shadow-sm ${
                              isMe
                                ? 'bg-blue-600 text-white'
                                : isLight
                                ? 'bg-slate-100 border border-slate-200 text-slate-900'
                                : 'bg-neutral-900 border border-neutral-800 text-neutral-200'
                            }`}
                          >
                            {msg.text}
                          </div>
                        )}

                        {/* Attachment Card if any (File or Folder) */}
                        {msg.attachment && (
                          <div
                            className={`mt-1.5 max-w-sm rounded-xl border p-3 shadow-sm ${
                              msg.attachment.type === 'folder'
                                ? isLight
                                  ? 'border-cyan-300 bg-cyan-50/60'
                                  : 'border-cyan-500/40 bg-cyan-950/20'
                                : isLight
                                ? 'border-blue-200 bg-blue-50/60'
                                : 'border-blue-500/40 bg-blue-950/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="flex items-center gap-1.5 font-mono-code text-[10px] uppercase font-bold text-blue-600">
                                {msg.attachment.type === 'folder' ? (
                                  <>
                                    <Folder className="h-3.5 w-3.5 text-cyan-600" />
                                    <span>Folder: {msg.attachment.title}</span>
                                  </>
                                ) : (
                                  <>
                                    <FileImage className="h-3.5 w-3.5 text-blue-600" />
                                    <span>File: {msg.attachment.title}</span>
                                  </>
                                )}
                              </span>
                              <span className="font-mono-code text-[10px] opacity-70">
                                {msg.attachment.totalSize}
                              </span>
                            </div>

                            {/* Image Thumbnails preview */}
                            <div className="grid grid-cols-2 gap-1.5 my-2">
                              {msg.attachment.files.slice(0, 2).map(f => (
                                <div
                                  key={f.id}
                                  onClick={() => {
                                    const match = photos.find(p => p.url === f.url);
                                    if (match) setLightboxPhoto(match);
                                  }}
                                  className="aspect-[4/3] rounded-lg overflow-hidden bg-black cursor-pointer shadow-sm"
                                >
                                  <img
                                    src={f.url}
                                    alt={f.name}
                                    className="h-full w-full object-cover grayscale hover:scale-105 transition-transform"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Download Action */}
                            <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-neutral-800">
                              <span className="font-mono-code text-[10px] opacity-70">
                                {msg.attachment.files.length} {msg.attachment.files.length === 1 ? 'asset' : 'assets'}
                              </span>

                              {msg.attachment.type === 'folder' ? (
                                <button
                                  onClick={() => msg.attachment && handleDownloadAttachmentZip(msg.attachment)}
                                  disabled={isZipping === msg.attachment.title}
                                  className="flex items-center gap-1 rounded-full bg-cyan-600 px-3 py-1 font-mono-code text-[10px] font-semibold uppercase text-white hover:bg-cyan-500 transition-colors shadow-sm"
                                >
                                  <FileArchive className="h-3 w-3" />
                                  <span>{isZipping === msg.attachment.title ? 'Zipping...' : 'Download (.ZIP)'}</span>
                                </button>
                              ) : (
                                <a
                                  href={msg.attachment.files[0]?.url}
                                  download={msg.attachment.files[0]?.name || 'download.jpg'}
                                  className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 font-mono-code text-[10px] font-semibold uppercase text-white hover:bg-blue-500 transition-colors shadow-sm"
                                >
                                  <Download className="h-3 w-3" />
                                  <span>Download</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Typing Bar with '+' button on the right side */}
              <div className={`p-3 border-t relative transition-colors ${
                isLight ? 'border-slate-200 bg-slate-50/80' : 'border-neutral-800 bg-neutral-900/60'
              }`}>
                {/* Popover Attachment Menu when '+' is clicked */}
                {showAttachMenu && (
                  <div
                    className={`absolute right-4 bottom-14 w-60 rounded-xl border p-2 shadow-2xl z-40 animate-in fade-in transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-900 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.15)]'
                        : 'bg-[#12131a] border-neutral-700 text-white shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <div className="font-mono-code text-[10px] uppercase opacity-60 px-2 py-1 border-b border-slate-200 dark:border-neutral-800">
                      Attach & Send
                    </div>

                    <div className="py-1 space-y-0.5">
                      {/* Select a File option */}
                      <button
                        onClick={() => {
                          setShowAttachMenu(false);
                          setShowFileModal(true);
                        }}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                          isLight ? 'hover:bg-slate-100' : 'hover:bg-neutral-800'
                        }`}
                      >
                        <FileImage className="h-4 w-4 text-blue-600 shrink-0" />
                        <div>
                          <p className="font-semibold">Select a File</p>
                          <p className="text-[10px] opacity-60">Pick photo or upload from disk</p>
                        </div>
                      </button>

                      {/* Select a Folder option */}
                      <button
                        onClick={() => {
                          setShowAttachMenu(false);
                          setShowFolderModal(true);
                        }}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                          isLight ? 'hover:bg-slate-100' : 'hover:bg-neutral-800'
                        }`}
                      >
                        <Folder className="h-4 w-4 text-cyan-600 shrink-0" />
                        <div>
                          <p className="font-semibold">Select a Folder</p>
                          <p className="text-[10px] opacity-60">Send full album or directory</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Form Input Bar */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder={`Message @${activeChatFriend}...`}
                    className={`flex-1 rounded-full border py-2 px-4 font-sans text-xs focus:border-blue-600 focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        : 'bg-black border-neutral-700 text-white placeholder-neutral-500'
                    }`}
                  />

                  {/* The '+' button on the right side of the typing bar */}
                  <button
                    type="button"
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    title="Attach file or folder"
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                      showAttachMenu
                        ? 'border-blue-600 bg-blue-600 text-white rotate-45 shadow-sm'
                        : isLight
                        ? 'border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600'
                        : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-white hover:text-white'
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                  </button>

                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="flex h-9 items-center gap-1.5 rounded-full bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-40"
                  >
                    <Send className="h-3 w-3" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center opacity-60 font-mono-code text-xs">
              <Users className="h-10 w-10 mb-2 opacity-50" />
              <p>Select a friend from the list to start messaging.</p>
            </div>
          )}
        </div>
      </div>

      {/* 'Select a File' Picker Modal */}
      {showFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div
            className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#12131a] border-neutral-800 text-white'
            }`}
          >
            <button
              onClick={() => setShowFileModal(false)}
              className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
                isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-100' : 'border-neutral-800 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4">
              <span className="font-mono-code text-[10px] uppercase font-bold text-blue-600">Attach Asset</span>
              <h3 className="font-sans text-lg font-bold">Select a File to Send</h3>
            </div>

            {/* Upload from computer option */}
            <div className="mb-4">
              <label
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-3 px-4 text-xs font-mono-code cursor-pointer transition-colors ${
                  isLight
                    ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-blue-500'
                    : 'border-neutral-700 bg-neutral-900/50 text-neutral-300 hover:border-blue-400'
                }`}
              >
                <Upload className="h-4 w-4 text-blue-600" />
                <span>Upload file from computer</span>
                <input
                  type="file"
                  accept="image/*,.pdf,.zip"
                  onChange={handleLocalFileChosen}
                  className="hidden"
                />
              </label>
            </div>

            <p className="font-mono-code text-[10px] uppercase opacity-70 mb-2">
              Or pick from photography archive:
            </p>

            <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
              {photos.map(p => (
                <div
                  key={p.id}
                  onClick={() =>
                    handleSendFileAttachment({
                      id: p.id,
                      name: `${p.title.replace(/\s+/g, '_')}.jpg`,
                      url: p.url,
                      size: p.fileSize || '14.2 MB',
                      type: 'image/jpeg',
                    })
                  }
                  className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                    isLight
                      ? 'border-slate-200 bg-slate-50 hover:border-blue-500'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img src={p.url} alt={p.title} className="h-8 w-8 rounded object-cover grayscale" />
                    <div>
                      <p className="text-xs font-semibold truncate max-w-[180px]">{p.title}</p>
                      <p className="font-mono-code text-[10px] opacity-70">{p.fileSize || '14 MB'}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-mono-code text-white">
                    Attach →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 'Select a Folder' Picker Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div
            className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900'
                : 'bg-[#12131a] border-neutral-800 text-white'
            }`}
          >
            <button
              onClick={() => setShowFolderModal(false)}
              className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
                isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-100' : 'border-neutral-800 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4">
              <span className="font-mono-code text-[10px] uppercase font-bold text-cyan-600">Attach Entire Folder</span>
              <h3 className="font-sans text-lg font-bold">Select a Folder to Send</h3>
            </div>

            {/* Upload folder from computer via webkitdirectory */}
            <div className="mb-4">
              <label
                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-3 px-4 text-xs font-mono-code cursor-pointer transition-colors ${
                  isLight
                    ? 'border-cyan-300 bg-cyan-50/50 text-cyan-800 hover:border-cyan-500'
                    : 'border-cyan-800/80 bg-cyan-950/20 text-cyan-300 hover:border-cyan-400'
                }`}
              >
                <Upload className="h-4 w-4 text-cyan-600" />
                <span>Upload a folder from computer</span>
                {/* @ts-ignore */}
                <input
                  type="file"
                  // @ts-expect-error webkitdirectory
                  webkitdirectory=""
                  directory=""
                  multiple
                  onChange={handleLocalFolderChosen}
                  className="hidden"
                />
              </label>
            </div>

            <p className="font-mono-code text-[10px] uppercase opacity-70 mb-2">
              Or send an album folder from your studio:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {projects.map(proj => {
                const projPhotos = photos.filter(p => p.projectId === proj.id);
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      const compiled = projPhotos.map(p => ({
                        id: p.id,
                        name: `${p.title.replace(/\s+/g, '_')}.jpg`,
                        url: p.url,
                        size: p.fileSize || '14.2 MB',
                        type: 'image/jpeg',
                        folderPath: proj.title,
                      }));
                      handleSendFolderAttachment(proj.title, compiled);
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      isLight
                        ? 'border-slate-200 bg-slate-50 hover:border-cyan-500'
                        : 'border-neutral-800 bg-neutral-900/60 hover:border-cyan-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Folder className="h-6 w-6 text-cyan-600 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold">{proj.title}</p>
                        <p className="font-mono-code text-[10px] opacity-70">
                          {projPhotos.length} photos • {proj.category}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-cyan-600 px-3 py-1 text-[10px] font-mono-code text-white">
                      Send Folder →
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
