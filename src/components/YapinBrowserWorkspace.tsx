import React, { useState } from 'react';
import {
  Hash,
  Volume2,
  Users,
  Plus,
  Send,
  Smile,
  Mic,
  MicOff,
  Headphones,
  Settings,
  ArrowLeft,
  Download,
  FolderOpen,
  Share2,
  Sparkles,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { NavigationIconImg } from './Icons';
import { useApp } from '../context/AppContext';

interface YapinBrowserWorkspaceProps {
  onBackToLanding: () => void;
  onOpenDownload: () => void;
}

export const YapinBrowserWorkspace: React.FC<YapinBrowserWorkspaceProps> = ({
  onBackToLanding,
  onOpenDownload,
}) => {
  const { publishedPackages, recordPublishedDownload } = useApp();

  const [activeChannel, setActiveChannel] = useState('vault-chat');
  const [chatInput, setChatInput] = useState('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      author: 'elena_k',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      time: 'Today at 4:21 PM',
      text: 'Welcome to Noir Archive in your browser! The full RAW batch is available in #raw-transfers.',
    },
    {
      id: '2',
      author: 'marcus_v',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      time: 'Today at 4:23 PM',
      text: 'No login required at all. Anyone can browse the monochrome galleries or download files instantly.',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        author: 'You (Guest Artist)',
        avatar: '/assets/aistudio/Minimalist_White_Navigation_Icon_63543507.png',
        time: 'Just now',
        text: chatInput.trim(),
      },
    ]);
    setChatInput('');
  };

  const channels = [
    { id: 'announcements', name: 'announcements', type: 'text' },
    { id: 'client-deliveries', name: 'client-deliveries', type: 'text' },
    { id: 'vault-chat', name: 'vault-chat', type: 'text' },
    { id: 'raw-transfers', name: 'raw-transfers', type: 'text' },
    { id: 'general-voice', name: 'Studio Lounge (Voice)', type: 'voice' },
    { id: 'critique-room', name: 'Critique Room 1', type: 'voice' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0e0f13] text-white overflow-hidden">
      
      {/* Top Workspace Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#14151a] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Landing Page</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-[#ff6b00] p-1 flex items-center justify-center">
              <NavigationIconImg className="h-5 w-5 object-contain" />
            </div>
            <span className="font-sans font-bold text-sm text-white">Noir Archive Web Client</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
              Open Guest Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 rounded-lg bg-[#ff6b00] px-3 py-1.5 text-xs font-bold text-black hover:bg-[#ff7d1f] transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Desktop App</span>
          </button>
        </div>
      </div>

      {/* Main App Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Vault Rail */}
        <div className="w-16 bg-[#0a0b0e] py-3 flex flex-col items-center gap-3 border-r border-white/5">
          <div className="h-11 w-11 rounded-2xl bg-[#ff6b00] p-2 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <NavigationIconImg className="h-7 w-7 object-contain" />
          </div>
          <div className="h-11 w-11 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold hover:rounded-2xl transition-all cursor-pointer">
            📷
          </div>
          <div className="h-11 w-11 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold hover:rounded-2xl transition-all cursor-pointer">
            📦
          </div>
        </div>

        {/* Channel Sidebar */}
        <div className="w-60 bg-[#121317] flex flex-col justify-between border-r border-white/5">
          <div className="p-3">
            <h3 className="font-sans font-bold text-sm text-white mb-3">Noir Studio Vault</h3>
            
            <div className="space-y-1">
              <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase px-2 mb-1">
                GALLERIES & CHAT
              </div>

              {channels.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium text-left transition-colors ${
                    activeChannel === ch.id
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {ch.type === 'voice' ? (
                    <Volume2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Hash className="h-3.5 w-3.5 text-[#ff6b00] shrink-0" />
                  )}
                  <span className="truncate">{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Controls */}
          <div className="p-3 bg-[#0d0e12] border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="/assets/aistudio/Minimalist_White_Navigation_Icon_63543507.png"
                alt="Guest"
                className="h-8 w-8 rounded-full bg-black p-1"
              />
              <div className="truncate">
                <div className="font-bold text-xs truncate">Guest Artist</div>
                <div className="text-[10px] font-mono text-emerald-400">#online</div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-neutral-400">
              <button
                onClick={() => setIsMicMuted(!isMicMuted)}
                className={`p-1 rounded hover:text-white ${isMicMuted ? 'text-rose-500' : ''}`}
              >
                {isMicMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsDeafened(!isDeafened)}
                className={`p-1 rounded hover:text-white ${isDeafened ? 'text-rose-500' : ''}`}
              >
                <Headphones className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Chat Viewport */}
        <div className="flex-1 flex flex-col justify-between bg-[#17181e] min-w-0">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-[#15161b]">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-[#ff6b00]" />
              <span className="font-bold text-sm text-white">{activeChannel}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="mb-4">
              <div className="h-10 w-10 rounded-xl bg-[#ff6b00]/20 text-[#ff6b00] flex items-center justify-center mb-2">
                <Hash className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">Welcome to #{activeChannel}!</h2>
              <p className="text-xs text-neutral-400">Noir Archive creative stream and file transfers.</p>
            </div>

            {messages.map(m => (
              <div key={m.id} className="flex items-start gap-3">
                <img src={m.avatar} alt={m.author} className="h-8 w-8 rounded-full object-cover shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{m.author}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{m.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-200">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-[#131419] border-t border-white/5">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder={`Message #${activeChannel}`}
                className="w-full rounded-xl border border-white/10 bg-[#1c1d24] py-2.5 pl-4 pr-12 text-xs text-white placeholder:text-neutral-500 focus:border-[#ff6b00] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-2.5 p-1 rounded-lg bg-[#ff6b00] text-black disabled:opacity-30"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
