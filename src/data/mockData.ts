import { Photo, Project, User, FileTransferPackage, FriendRequest, ChatMessage, PublishedPackage } from '../types';
import { hashPassword } from '../utils/auth';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-moritz',
    username: 'moritz',
    bio: 'Digital archivist and systems architect. Managing secure client portals, data pipelines, and zero-compression delivery.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Berlin',
    passwordHash: hashPassword('password123'),
    createdAt: '2024-01-15T10:00:00.000Z',
    friends: ['elena_k', 'kenji_mono'],
  },
  {
    id: 'user-elena',
    username: 'elena_k',
    bio: 'Technical designer and media archivist specializing in client asset delivery.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    location: 'Paris',
    passwordHash: hashPassword('secret456'),
    createdAt: '2024-02-01T12:00:00.000Z',
    friends: ['moritz'],
  },
  {
    id: 'user-kenji',
    username: 'kenji_mono',
    bio: 'Data systems engineer. Capturing system logs, uncompressed media, and distributed vaults.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'Tokyo',
    passwordHash: hashPassword('mono789'),
    createdAt: '2024-03-10T09:30:00.000Z',
    friends: ['moritz'],
  },
  {
    id: 'user-daddy',
    username: 'daddy',
    bio: 'Archivist and creative director.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    location: 'Berlin',
    passwordHash: hashPassword('password123'),
    createdAt: '2024-04-01T09:30:00.000Z',
    friends: [],
  },
];

// All placeholder collections, packages, projects, photos, and messages are cleared.
// User-created items will appear here instead.
export const INITIAL_PROJECTS: Project[] = [];

export const INITIAL_PHOTOS: Photo[] = [];

export const INITIAL_TRANSFERS: FileTransferPackage[] = [];

export const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [];

export const INITIAL_PUBLISHED_PACKAGES: PublishedPackage[] = [];
