import React from 'react';
import { Home, BookOpen, MessageCircle, User as UserIcon, Settings, X, LogOut, Heart } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  closeMobile: () => void;
  onUserClick: (user: User) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOpenMobile, 
  closeMobile,
  onLogout
}) => {
  const menuItems = [
    { id: 'inicio', icon: Home, label: 'Início' },
    { id: 'cursos', icon: BookOpen, label: 'Meus Cursos' },
    { id: 'favoritos', icon: Heart, label: 'Meus Favoritos' },
    { id: 'comunidade', icon: MessageCircle, label: 'Chat VIP' },
    { id: 'perfil', icon: UserIcon, label: 'Meu Perfil' },
    { id: 'config', icon: Settings, label: 'Configurações' },
  ];

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <>
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside className={`
        fixed top-[70px] left-0 h-[calc(100vh-70px)] bg-white border-r border-brand-border w-[280px]
        transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto custom-scrollbar
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col justify-between
      `}>
        <div>
          <div className="lg:hidden p-4 flex justify-end">
            <button onClick={closeMobile} className="p-2 text-gray-500">
              <X size={24} />
            </button>
          </div>

          {/* Menu */}
          <ul className="py-4 mt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li 
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    closeMobile();
                  }}
                  className={`
                    px-6 py-4 flex items-center gap-3 cursor-pointer transition-all border-l-4
                    ${isActive 
                      ? 'bg-brand-bg border-brand-primary text-brand-dark' 
                      : 'border-transparent text-gray-600 hover:bg-brand-bg/50 hover:text-brand-primary'}
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogoutClick}
            className="w-full px-6 py-3 flex items-center gap-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors mb-4"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
          
          <div className="text-center text-xs text-gray-400">
            <p>Mãe Nutri+ VIP © 2025</p>
            <p>Versão 2.1</p>
          </div>
        </div>
      </aside>
    </>
  );
};