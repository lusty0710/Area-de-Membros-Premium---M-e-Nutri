export interface User {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  points?: number;
  badge?: string;
  position?: number;
}

export interface StoredUserProfile {
  name: string;
  avatar: string | null;
  babyAge: string;
  theme: 'rosa' | 'lavanda' | 'bege';
  darkMode?: boolean;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
  isLocked: boolean;
}

export interface PDFMaterial {
  id: number;
  title: string;
  icon: string;
  downloadUrl: string;
}

export interface Notification {
  id: number;
  type: 'chat' | 'comment' | 'like' | 'system';
  message: string;
  from: string;
  timestamp: Date;
}

export interface Recipe {
  id: string;
  title: string;
  age: string;
  time: string;
  yields: string;
  ingredients: string[];
  preparation: string[];
  storage: string;
  tip?: string;
  allergens?: string[];
}

export interface RecipeCategory {
  id: string;
  title: string;
  description: string;
  recipes: Recipe[];
}

export interface BookContent {
  introduction: string;
  storageTips: string[];
  categories: RecipeCategory[];
}

// Novos tipos para o Chat
export interface ChatMessage {
  id: number;
  senderId: number; // 0 para o usuário atual
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  isGroup: boolean;
  isOnline: boolean;
}