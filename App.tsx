import React, { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CommunityFeed } from './components/CommunityFeed';
import { NotificationToast } from './components/NotificationToast';
import { ModuleViewer } from './components/ModuleViewer';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { FavoritesViewer } from './components/FavoritesViewer';
import { CURRENT_USER } from './constants';
import { Notification, User, StoredUserProfile } from './types';

const STORAGE_KEY = 'KIT_MAE_USER_PROFILE';
const READ_RECIPES_KEY = 'KIT_MAE_READ_RECIPES_ALL';
const FAVORITES_KEY = 'KIT_MAE_FAVORITES';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');

  // Supabase Auth Listener
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);

  const [userSettings, setUserSettings] = useState<StoredUserProfile>(() => {
     const saved = localStorage.getItem(STORAGE_KEY);
     if (saved) {
       try {
         return JSON.parse(saved);
       } catch (e) { }
     }
     return { name: CURRENT_USER.name, avatar: CURRENT_USER.avatar, babyAge: '6-12 meses', theme: 'rosa', darkMode: false };
  });

  // Global State for Read Recipes
  const [readRecipes, setReadRecipes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(READ_RECIPES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed.filter((item: any) => typeof item === 'string'));
        }
      }
    } catch (e) { console.error("Error loading read recipes", e); }
    return new Set();
  });

  // Global State for Favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return new Set(parsed.filter((item: any) => typeof item === 'string'));
        }
      }
    } catch (e) { console.error("Error loading favorites", e); }
    return new Set();
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  // Helper function to apply theme colors and Dark Mode
  const applyTheme = (theme: 'rosa' | 'lavanda' | 'bege', isDark: boolean) => {
    const root = document.documentElement;
    
    // Base Colors (Light Mode)
    let colors = {
      dark: '#FF1493',
      primary: '#FF69B4',
      soft: '#FFB6C1',
      light: '#FFC0CB',
      bg: '#FFF8F5',
      border: '#FFE4E1'
    };

    if (theme === 'lavanda') {
      colors = {
        dark: '#7C3AED',
        primary: '#A78BFA',
        soft: '#C4B5FD',
        light: '#DDD6FE',
        bg: '#F5F3FF',
        border: '#EDE9FE'
      };
    } else if (theme === 'bege') {
      colors = {
        dark: '#9C6644',
        primary: '#D4A373',
        soft: '#E6CCB2',
        light: '#F3D5B5',
        bg: '#FAF9F6',
        border: '#E5E5E5'
      };
    }

    // Apply Brand Colors
    root.style.setProperty('--color-brand-dark', colors.dark);
    root.style.setProperty('--color-brand-primary', colors.primary);
    root.style.setProperty('--color-brand-soft', colors.soft);
    root.style.setProperty('--color-brand-light', colors.light);
    
    // Apply Background/Border based on Dark Mode
    if (isDark) {
      document.documentElement.classList.add('dark');
      root.style.setProperty('--color-brand-bg', '#111827'); // Dark Gray 900
      root.style.setProperty('--color-brand-border', '#374151'); // Dark Gray 700
    } else {
      document.documentElement.classList.remove('dark');
      root.style.setProperty('--color-brand-bg', colors.bg);
      root.style.setProperty('--color-brand-border', colors.border);
    }
  };

  useEffect(() => {
    // Initial theme application
    applyTheme(userSettings.theme, !!userSettings.darkMode);
  }, []);

  // Update current user when session changes
  useEffect(() => {
    if (session?.user?.email) {
      const name = userSettings.name === 'Ana Paula' ? session.user.email.split('@')[0] : userSettings.name;
      setCurrentUser(prev => ({
        ...prev,
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
        id: parseInt(session.user.id.slice(0, 8), 16) || 99 // Generate a fake ID from UUID
      }));
    }
  }, [session, userSettings.name]);

  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        const newNotif: Notification = {
          id: Date.now(),
          type: 'chat',
          message: 'Você tem uma nova mensagem no Grupo VIP',
          from: 'Carla Mendes',
          timestamp: new Date()
        };
        setNotifications(prev => [newNotif, ...prev]);
        setCurrentNotification(newNotif);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [session]);

  const handleUpdateProfile = (data: Partial<StoredUserProfile>) => {
    // Critical Protection: Prevent circular structures (Events/DOM Nodes) from polluting state
    if (!data || typeof data !== 'object') return;
    if ('nativeEvent' in data || 'preventDefault' in data || 'stopPropagation' in data || 'nodeType' in data) {
      console.warn("Attempted to pass Event/DOM Node to handleUpdateProfile. Ignored.");
      return;
    }

    const mergedSettings = { ...userSettings, ...data };
    
    // Strict sanitization: Reconstruct object using ONLY primitives
    // This guarantees no circular references (like HTMLButtonElement) survive
    const safeSettings: StoredUserProfile = {
      name: typeof mergedSettings.name === 'string' ? mergedSettings.name : userSettings.name,
      avatar: typeof mergedSettings.avatar === 'string' || mergedSettings.avatar === null ? mergedSettings.avatar : userSettings.avatar,
      babyAge: typeof mergedSettings.babyAge === 'string' ? mergedSettings.babyAge : userSettings.babyAge,
      theme: (['rosa', 'lavanda', 'bege'].includes(mergedSettings.theme as any)) ? mergedSettings.theme : userSettings.theme,
      darkMode: Boolean(mergedSettings.darkMode)
    };

    setUserSettings(safeSettings);
    
    if (data.name || data.avatar) {
      setCurrentUser(prev => ({
        ...prev,
        name: typeof data.name === 'string' ? data.name : prev.name,
        avatar: typeof data.avatar === 'string' ? data.avatar : prev.avatar
      }));
    }

    if (data.theme || data.darkMode !== undefined) {
      applyTheme(safeSettings.theme, !!safeSettings.darkMode);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeSettings));
    } catch (e) { 
      console.error("Failed to save profile settings:", e); 
    }
  };

  const handleAutoRead = (id: string) => {
    if (!id || typeof id !== 'string') return;
    setReadRecipes(prev => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev).add(id);
      localStorage.setItem(READ_RECIPES_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const handleToggleRead = (id: string) => {
    if (!id || typeof id !== 'string') return;
    setReadRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      localStorage.setItem(READ_RECIPES_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const handleToggleFavorite = (id: string) => {
    if (!id || typeof id !== 'string') return;
    setFavoriteRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(STORAGE_KEY);
    setActiveTab('inicio');
    setActiveModuleId(null);
  };

  const handleModuleClick = (moduleId: number) => {
    if ([1, 2, 3, 4, 5, 6].includes(moduleId)) {
      setActiveModuleId(moduleId);
      window.scrollTo(0, 0);
    } else {
      alert("Módulo indisponível no momento.");
    }
  };

  const renderContent = () => {
    if (activeModuleId !== null) {
      return (
        <ModuleViewer 
          moduleId={activeModuleId} 
          onBack={() => setActiveModuleId(null)}
          readRecipes={readRecipes}
          onAutoRead={handleAutoRead}
          onToggleRead={handleToggleRead}
          favoriteRecipes={favoriteRecipes}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    switch (activeTab) {
      case 'inicio':
      case 'cursos':
        return (
          <Dashboard 
            onModuleClick={handleModuleClick} 
            readRecipes={readRecipes}
            favoriteRecipes={favoriteRecipes}
          />
        );
      case 'favoritos':
        return (
          <FavoritesViewer 
            favoriteRecipes={favoriteRecipes} 
            onModuleClick={handleModuleClick}
            onRemoveFavorite={handleToggleFavorite}
          />
        );
      case 'comunidade':
        return <CommunityFeed user={currentUser} />;
      case 'perfil':
        return <Profile user={currentUser} onUpdate={handleUpdateProfile} />;
      case 'config':
        return <Settings currentTheme={userSettings.theme} isDarkMode={!!userSettings.darkMode} onUpdateSettings={handleUpdateProfile} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
            <span className="text-4xl mb-4">🚧</span>
            <p>Esta seção está em construção.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-brand-bg transition-colors duration-500 dark:bg-gray-900">
      <NotificationToast 
        notification={currentNotification} 
        onClose={() => setCurrentNotification(null)} 
      />

      <header className="fixed top-0 w-full h-[70px] bg-gradient-to-r from-brand-dark to-brand-primary flex items-center justify-between px-5 shadow-lg shadow-brand-dark/20 z-[1000] transition-colors duration-500 dark:shadow-black/50">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
                <path d="M12 5C12 5 13.5 2.5 15.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.5 6.5C16.5 6.5 14 6.5 13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
              </svg>
            </div>
            <div className="flex flex-col -space-y-0.5">
              <h1 className="font-display font-extrabold text-xl text-white tracking-wide flex items-center leading-none">
                MãeNutri
                <span className="text-yellow-300 ml-0.5 text-2xl leading-none shadow-black drop-shadow-sm relative -top-0.5">+</span>
              </h1>
              <span className="text-[9px] font-bold text-white/90 tracking-[0.2em] uppercase ml-0.5">Área VIP</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer text-white hover:scale-110 transition-transform">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-brand-primary font-bold">
                {notifications.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('perfil')}>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white font-medium text-sm group-hover:underline">
                {currentUser.name}
              </span>
              <span className="text-white/80 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                Membro VIP
              </span>
            </div>
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-white/50 group-hover:border-white transition-all object-cover" 
            />
          </div>
        </div>
      </header>

      <div className="flex mt-[70px] min-h-[calc(100vh-70px)]">
        {!activeModuleId && (
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isOpenMobile={isSidebarOpen}
            closeMobile={() => setIsSidebarOpen(false)}
            onUserClick={() => setActiveTab('perfil')}
            onLogout={handleLogout}
          />
        )}

        <main className={`flex-1 ${!activeModuleId ? 'lg:ml-[280px]' : ''} p-5 md:p-8 overflow-x-hidden`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;