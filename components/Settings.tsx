import React from 'react';
import { Moon, Sun, Bell, CreditCard, Shield, HelpCircle, Palette } from 'lucide-react';
import { StoredUserProfile } from '../types';

interface SettingsProps {
  currentTheme: 'rosa' | 'lavanda' | 'bege';
  isDarkMode: boolean;
  onUpdateSettings: (settings: Partial<StoredUserProfile>) => void;
}

export const Settings: React.FC<SettingsProps> = ({ currentTheme, isDarkMode, onUpdateSettings }) => {
  
  const handleThemeChange = (theme: 'rosa' | 'lavanda' | 'bege') => {
    onUpdateSettings({ theme });
  };

  const handleDarkModeToggle = () => {
    onUpdateSettings({ darkMode: !isDarkMode });
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto pb-20">
      <h1 className="font-display text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 dark:text-white">
        <span className="text-2xl">⚙️</span> Configurações
      </h1>

      {/* Aparência */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2 dark:bg-gray-900 dark:border-gray-700">
          <Palette size={18} className="text-brand-primary" />
          <h2 className="font-bold text-gray-700 dark:text-white">Aparência</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Cor do Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3 dark:text-gray-400">Cor Principal</label>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleThemeChange('rosa')}
                className={`relative h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${currentTheme === 'rosa' ? 'border-brand-primary bg-brand-bg dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600'}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#FF69B4] shadow-sm"></div>
                <span className={`text-xs font-medium ${currentTheme === 'rosa' ? 'text-brand-dark' : 'text-gray-500 dark:text-gray-400'}`}>Rosa</span>
                {currentTheme === 'rosa' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-primary"></div>}
              </button>
              
              <button 
                onClick={() => handleThemeChange('lavanda')}
                className={`relative h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${currentTheme === 'lavanda' ? 'border-[#A78BFA] bg-[#F5F3FF] dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600'}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#A78BFA] shadow-sm"></div>
                <span className={`text-xs font-medium ${currentTheme === 'lavanda' ? 'text-[#7C3AED]' : 'text-gray-500 dark:text-gray-400'}`}>Lavanda</span>
                {currentTheme === 'lavanda' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A78BFA]"></div>}
              </button>

              <button 
                onClick={() => handleThemeChange('bege')}
                className={`relative h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden ${currentTheme === 'bege' ? 'border-[#D4A373] bg-[#FAF9F6] dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600'}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#D4A373] shadow-sm"></div>
                <span className={`text-xs font-medium ${currentTheme === 'bege' ? 'text-[#9C6644]' : 'text-gray-500 dark:text-gray-400'}`}>Bege</span>
                {currentTheme === 'bege' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4A373]"></div>}
              </button>
            </div>
          </div>

          {/* Modo Escuro */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-orange-100 text-orange-500'}`}>
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Modo Escuro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ajustar brilho da tela</p>
              </div>
            </div>
            
            <button 
              onClick={handleDarkModeToggle}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${isDarkMode ? 'bg-brand-primary justify-end' : 'bg-gray-200 justify-start'}`}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Outras Configurações (Mock) */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex items-center gap-3">
            <Bell className="text-gray-400" size={20} />
            <span className="text-gray-700 font-medium dark:text-gray-300">Notificações</span>
          </div>
          <span className="text-xs text-gray-400">Ligado</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex items-center gap-3">
            <CreditCard className="text-gray-400" size={20} />
            <span className="text-gray-700 font-medium dark:text-gray-300">Minha Assinatura</span>
          </div>
          <span className="text-xs text-brand-primary font-bold">VIP Ativo</span>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="text-gray-400" size={20} />
            <span className="text-gray-700 font-medium dark:text-gray-300">Privacidade e Dados</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex items-center gap-3">
            <HelpCircle className="text-gray-400" size={20} />
            <span className="text-gray-700 font-medium dark:text-gray-300">Ajuda e Suporte</span>
          </div>
        </div>
      </div>
    </div>
  );
};