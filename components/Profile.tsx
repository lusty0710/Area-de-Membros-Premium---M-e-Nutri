import React, { useState, useRef } from 'react';
import { Camera, Save, User as UserIcon, Baby, Mail } from 'lucide-react';
import { User, StoredUserProfile } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (data: Partial<StoredUserProfile>) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const [babyAge, setBabyAge] = useState('6-12 meses'); // Could be passed from props if added to User type
  const [email, setEmail] = useState('email@exemplo.com'); // Mock
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate({ name, babyAge });
      setIsSaving(false);
      alert('Perfil atualizado com sucesso!');
    }, 800);
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto pb-20">
      <div className="bg-gradient-to-r from-brand-primary to-brand-soft p-8 rounded-t-3xl text-white shadow-lg text-center relative overflow-hidden">
        <h1 className="font-display text-2xl font-bold relative z-10">Meu Perfil</h1>
        <p className="text-white/90 text-sm relative z-10">Mantenha seus dados atualizados</p>
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>

      <div className="bg-white rounded-b-3xl shadow-sm border border-gray-100 p-6 md:p-8 -mt-4 relative z-20 dark:bg-gray-800 dark:border-gray-700">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 relative dark:border-gray-700">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-brand-primary text-white p-1.5 rounded-full shadow-sm border-2 border-white dark:border-gray-800">
               <Camera size={14} />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Clique na foto para alterar</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 dark:text-gray-300">
              <UserIcon size={16} className="text-brand-primary" /> Nome Completo
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 dark:text-gray-300">
              <Mail size={16} className="text-brand-primary" /> E-mail (somente leitura)
            </label>
            <input 
              type="text" 
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-900 dark:border-gray-700 dark:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 dark:text-gray-300">
              <Baby size={16} className="text-brand-primary" /> Idade do Bebê
            </label>
            <select 
              value={babyAge}
              onChange={(e) => setBabyAge(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option>Gestante</option>
              <option>0-6 meses</option>
              <option>6-12 meses</option>
              <option>1-2 anos</option>
              <option>+2 anos</option>
            </select>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full mt-4 py-3.5 bg-brand-dark text-white rounded-xl font-bold shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Save size={18} /> Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};