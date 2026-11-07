import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  Project,
  Photo,
  FileTransferPackage,
  GridLayout,
  PhotoCategory,
  ClientReview,
  FriendRequest,
  ChatMessage,
  ChatAttachment,
  PublishedPackage,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_PHOTOS,
  INITIAL_TRANSFERS,
  INITIAL_FRIEND_REQUESTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_PUBLISHED_PACKAGES,
} from '../data/mockData';
import { validateUsername, validatePassword, hashPassword, verifyPassword } from '../utils/auth';
import { createTransferPackage, CreateTransferInput } from '../utils/transfer';
import { canSendFriendRequest, createFriendRequest, createChatMessage } from '../utils/friends';
import { createPublishedPackage, togglePackageLike, CreatePublishedInput } from '../utils/published';

interface AppContextType {
  // Data
  users: User[];
  currentUser: User | null;
  projects: Project[];
  photos: Photo[];
  transfers: FileTransferPackage[];
  friendRequests: FriendRequest[];
  chatMessages: ChatMessage[];

  // Navigation & Views
  activeTab: 'explore' | 'published' | 'projects' | 'manage' | 'transfers' | 'friends';
  setActiveTab: (tab: 'explore' | 'published' | 'projects' | 'manage' | 'transfers' | 'friends') => void;
  selectedPhotographer: User | null;
  setSelectedPhotographer: (user: User | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  lightboxPhoto: Photo | null;
  setLightboxPhoto: (photo: Photo | null) => void;

  // Layout & Aesthetic
  gridLayout: GridLayout;
  setGridLayout: (layout: GridLayout) => void;
  selectedCategory: 'all' | PhotoCategory;
  setSelectedCategory: (cat: 'all' | PhotoCategory) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth Modals & Actions
  authModal: 'signin' | 'signup' | null;
  setAuthModal: (modal: 'signin' | 'signup' | null) => void;
  signUp: (data: {
    username: string;
    password: string;
    bio?: string;
    location?: string;
    avatar?: string;
  }) => { success: boolean; error?: string };
  signIn: (username: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  switchUserQuick: (username: string) => void;

  // Project Management
  createProject: (data: {
    title: string;
    description: string;
    category: PhotoCategory;
    layoutPreference: GridLayout;
    coverPhotoUrl?: string;
    clientDeliveryNotes?: string;
    clientName?: string;
  }) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addPhoto: (photo: Omit<Photo, 'id' | 'createdAt' | 'userId'>) => Photo;
  deletePhoto: (id: string) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;

  // Transfers
  isTransferModalOpen: boolean;
  setIsTransferModalOpen: (open: boolean) => void;
  preselectedTransferProject: Project | null;
  openTransferModalForProject: (project: Project) => void;
  sendTransfer: (input: CreateTransferInput) => { success: boolean; packageId?: string; error?: string };
  revokeTransfer: (id: string) => void;
  recordDownload: (id: string) => void;
  addTransferReview: (id: string, review: Omit<ClientReview, 'id' | 'createdAt'>) => void;
  activeTransferPortalId: string | null;
  setActiveTransferPortalId: (id: string | null) => void;

  // Friends & Chat
  activeChatFriend: string | null;
  setActiveChatFriend: (username: string | null) => void;
  sendFriendRequestAction: (toUsername: string) => { success: boolean; error?: string };
  acceptFriendRequestAction: (requestId: string) => void;
  declineFriendRequestAction: (requestId: string) => void;
  sendChatMessageAction: (recipientUsername: string, text: string, attachment?: ChatAttachment) => void;

  // Published Files & Public Downloads
  publishedPackages: PublishedPackage[];
  publishPackageAction: (input: CreatePublishedInput) => { success: boolean; package?: PublishedPackage; error?: string };
  recordPublishedDownload: (id: string) => void;
  togglePublishedLikeAction: (id: string) => void;
  isPublishModalOpen: boolean;
  setIsPublishModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USERS = 'noir_archive_users_v5';
const STORAGE_KEY_CURRENT_USER = 'noir_archive_current_user_v5';
const STORAGE_KEY_PROJECTS = 'noir_archive_projects_v5';
const STORAGE_KEY_PHOTOS = 'noir_archive_photos_v5';
const STORAGE_KEY_TRANSFERS = 'noir_archive_transfers_v5';
const STORAGE_KEY_THEME = 'noir_archive_theme_v5';
const STORAGE_KEY_FRIEND_REQUESTS = 'noir_archive_friend_requests_v5';
const STORAGE_KEY_CHAT_MESSAGES = 'noir_archive_chat_messages_v5';
const STORAGE_KEY_PUBLISHED = 'noir_archive_published_v5';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Strict requirement: User MUST actively log in. Never automatically logged in.
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PHOTOS);
      return stored ? JSON.parse(stored) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  });

  const [transfers, setTransfers] = useState<FileTransferPackage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRANSFERS);
      return stored ? JSON.parse(stored) : INITIAL_TRANSFERS;
    } catch {
      return INITIAL_TRANSFERS;
    }
  });

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FRIEND_REQUESTS);
      return stored ? JSON.parse(stored) : INITIAL_FRIEND_REQUESTS;
    } catch {
      return INITIAL_FRIEND_REQUESTS;
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CHAT_MESSAGES);
      return stored ? JSON.parse(stored) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'explore' | 'published' | 'projects' | 'manage' | 'transfers' | 'friends'>('explore');
  const [selectedPhotographer, setSelectedPhotographer] = useState<User | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [gridLayout, setGridLayout] = useState<GridLayout>('grid-3');
  const [selectedCategory, setSelectedCategory] = useState<'all' | PhotoCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [preselectedTransferProject, setPreselectedTransferProject] = useState<Project | null>(null);
  const [activeTransferPortalId, setActiveTransferPortalId] = useState<string | null>(null);
  const [activeChatFriend, setActiveChatFriend] = useState<string | null>('elena_k');

  const [publishedPackages, setPublishedPackages] = useState<PublishedPackage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      return stored ? JSON.parse(stored) : INITIAL_PUBLISHED_PACKAGES;
    } catch {
      return INITIAL_PUBLISHED_PACKAGES;
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY_THEME) as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Apply theme to HTML and body immediately
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          document.body.classList.add('dark');
          document.body.style.backgroundColor = '#0a0a0f';
          document.body.style.color = '#f8fafc';
        } else {
          root.classList.remove('dark');
          document.body.classList.remove('dark');
          document.body.style.backgroundColor = '#fbfbfd';
          document.body.style.color = '#0f172a';
        }
      }
    } catch (e) {
      console.warn('Theme storage error', e);
    }
  }, [theme]);

  // Sync published packages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(publishedPackages));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [publishedPackages]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      // Clear any legacy auto-login sessions from localStorage
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
      localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos));
      localStorage.setItem(STORAGE_KEY_TRANSFERS, JSON.stringify(transfers));
      localStorage.setItem(STORAGE_KEY_FRIEND_REQUESTS, JSON.stringify(friendRequests));
      localStorage.setItem(STORAGE_KEY_CHAT_MESSAGES, JSON.stringify(chatMessages));
    } catch (e) {
      console.warn('Storage error', e);
    }
  }, [projects, photos, transfers, friendRequests, chatMessages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transferParam = params.get('transfer');
    if (transferParam) {
      setActiveTransferPortalId(transferParam);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth operations (purely username and password, no photographer/studio name)
  const signUp = (data: {
    username: string;
    password: string;
    bio?: string;
    location?: string;
    avatar?: string;
  }) => {
    const userVal = validateUsername(data.username, users);
    if (!userVal.isValid) {
      return { success: false, error: userVal.error };
    }

    const passVal = validatePassword(data.password);
    if (!passVal.isValid) {
      return { success: false, error: passVal.feedback };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      username: data.username.trim().toLowerCase(),
      bio: data.bio?.trim() || 'Visual photographer & darkroom artist.',
      avatar:
        data.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: data.location?.trim() || 'Worldwide',
      passwordHash: hashPassword(data.password),
      createdAt: new Date().toISOString(),
      friends: [],
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthModal(null);
    return { success: true };
  };

  const signIn = (username: string, pass: string) => {
    const normalized = username.trim().toLowerCase();
    const user = users.find(u => u.username.toLowerCase() === normalized);
    if (!user) {
      return { success: false, error: 'User with this username does not exist' };
    }

    if (!verifyPassword(pass, user.passwordHash)) {
      return { success: false, error: 'Invalid password' };
    }

    setCurrentUser(user);
    setAuthModal(null);
    return { success: true };
  };

  const signOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      sessionStorage.clear();
    } catch {}
  };

  const switchUserQuick = (username: string) => {
    const target = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (target) {
      setCurrentUser(target);
    }
  };

  // Project Management
  const createProject = (data: {
    title: string;
    description: string;
    category: PhotoCategory;
    layoutPreference: GridLayout;
    coverPhotoUrl?: string;
    clientDeliveryNotes?: string;
    clientName?: string;
  }) => {
    if (!currentUser) throw new Error('Must be signed in to create projects');

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      userId: currentUser.id,
      title: data.title.trim(),
      description: data.description.trim(),
      coverPhotoUrl:
        data.coverPhotoUrl ||
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      layoutPreference: data.layoutPreference || 'grid-3',
      isPublic: true,
      category: data.category,
      createdAt: new Date().toISOString(),
      clientDeliveryNotes: data.clientDeliveryNotes?.trim() || undefined,
      clientName: data.clientName?.trim() || undefined,
    };

    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    if (selectedProject?.id === id) {
      setSelectedProject(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setPhotos(prev => prev.filter(ph => ph.projectId !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const addPhoto = (photoData: Omit<Photo, 'id' | 'createdAt' | 'userId'>) => {
    if (!currentUser) throw new Error('Must be signed in to add photos');

    const newPhoto: Photo = {
      ...photoData,
      id: `ph-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setPhotos(prev => [newPhoto, ...prev]);

    const proj = projects.find(p => p.id === photoData.projectId);
    if (proj && !proj.coverPhotoUrl) {
      updateProject(proj.id, { coverPhotoUrl: newPhoto.url });
    }

    return newPhoto;
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    if (lightboxPhoto?.id === id) {
      setLightboxPhoto(null);
    }
  };

  const updatePhoto = (id: string, updates: Partial<Photo>) => {
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    if (lightboxPhoto?.id === id) {
      setLightboxPhoto(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  // Transfers
  const openTransferModalForProject = (project: Project) => {
    setPreselectedTransferProject(project);
    setIsTransferModalOpen(true);
  };

  const sendTransfer = (input: CreateTransferInput) => {
    try {
      const pkg = createTransferPackage(input);
      setTransfers(prev => [pkg, ...prev]);
      setPreselectedTransferProject(null);
      return { success: true, packageId: pkg.id };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create transfer';
      return { success: false, error: msg };
    }
  };

  const revokeTransfer = (id: string) => {
    setTransfers(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'revoked' } : t))
    );
  };

  const recordDownload = (id: string) => {
    setTransfers(prev =>
      prev.map(t => (t.id === id ? { ...t, downloadsCount: t.downloadsCount + 1 } : t))
    );
  };

  const addTransferReview = (id: string, review: Omit<ClientReview, 'id' | 'createdAt'>) => {
    const newRev: ClientReview = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTransfers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, reviews: [newRev, ...(t.reviews || [])] } : t
      )
    );
  };

  // Friends & Chat operations
  const sendFriendRequestAction = (toUsername: string) => {
    if (!currentUser) return { success: false, error: 'Sign in to add friends.' };

    const targetUser = users.find(u => u.username.toLowerCase() === toUsername.toLowerCase());
    if (!targetUser) {
      return { success: false, error: `User @${toUsername} does not exist.` };
    }

    const check = canSendFriendRequest(
      currentUser.username,
      targetUser.username,
      currentUser.friends || [],
      friendRequests
    );

    if (!check.allowed) {
      return { success: false, error: check.error };
    }

    const req = createFriendRequest(currentUser.username, targetUser.username);
    setFriendRequests(prev => [req, ...prev]);
    return { success: true };
  };

  const acceptFriendRequestAction = (requestId: string) => {
    const req = friendRequests.find(r => r.id === requestId);
    if (!req || !currentUser) return;

    // Update request
    setFriendRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'accepted' } : r))
    );

    // Add friend mutually
    const friendName = req.fromUsername.toLowerCase() === currentUser.username.toLowerCase()
      ? req.toUsername
      : req.fromUsername;

    setUsers(prev =>
      prev.map(u => {
        if (u.username.toLowerCase() === currentUser.username.toLowerCase()) {
          const updated = Array.from(new Set([...(u.friends || []), friendName]));
          return { ...u, friends: updated };
        }
        if (u.username.toLowerCase() === friendName.toLowerCase()) {
          const updated = Array.from(new Set([...(u.friends || []), currentUser.username]));
          return { ...u, friends: updated };
        }
        return u;
      })
    );

    setCurrentUser(prev =>
      prev ? { ...prev, friends: Array.from(new Set([...(prev.friends || []), friendName])) } : null
    );
  };

  const declineFriendRequestAction = (requestId: string) => {
    setFriendRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'declined' } : r))
    );
  };

  const sendChatMessageAction = (
    recipientUsername: string,
    text: string,
    attachment?: ChatAttachment
  ) => {
    if (!currentUser) return;
    const msg = createChatMessage(currentUser.username, recipientUsername, text, attachment);
    setChatMessages(prev => [...prev, msg]);
  };

  // Published Files Actions
  const publishPackageAction = (input: CreatePublishedInput) => {
    try {
      const pkg = createPublishedPackage(input);
      setPublishedPackages(prev => [pkg, ...prev]);
      return { success: true, package: pkg };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to publish files' };
    }
  };

  const recordPublishedDownload = (id: string) => {
    setPublishedPackages(prev =>
      prev.map(p => (p.id === id ? { ...p, downloadsCount: p.downloadsCount + 1 } : p))
    );
  };

  const togglePublishedLikeAction = (id: string) => {
    const username = currentUser?.username || 'anonymous_admirer';
    setPublishedPackages(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const { updatedPackage } = togglePackageLike(p, username);
        return updatedPackage;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        projects,
        photos,
        transfers,
        friendRequests,
        chatMessages,
        activeTab,
        setActiveTab,
        selectedPhotographer,
        setSelectedPhotographer,
        selectedProject,
        setSelectedProject,
        lightboxPhoto,
        setLightboxPhoto,
        gridLayout,
        setGridLayout,
        selectedCategory,
        setSelectedCategory,
        theme,
        toggleTheme,
        searchQuery,
        setSearchQuery,
        authModal,
        setAuthModal,
        signUp,
        signIn,
        signOut,
        switchUserQuick,
        createProject,
        updateProject,
        deleteProject,
        addPhoto,
        deletePhoto,
        updatePhoto,
        isTransferModalOpen,
        setIsTransferModalOpen,
        preselectedTransferProject,
        openTransferModalForProject,
        sendTransfer,
        revokeTransfer,
        recordDownload,
        addTransferReview,
        activeTransferPortalId,
        setActiveTransferPortalId,
        activeChatFriend,
        setActiveChatFriend,
        sendFriendRequestAction,
        acceptFriendRequestAction,
        declineFriendRequestAction,
        sendChatMessageAction,
        publishedPackages,
        publishPackageAction,
        recordPublishedDownload,
        togglePublishedLikeAction,
        isPublishModalOpen,
        setIsPublishModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
