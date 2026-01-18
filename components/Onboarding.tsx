import React, { useState, useRef } from 'react';
import { Camera, Check, ChevronRight } from 'lucide-react';

interface OnboardingData {
  name: string;
  avatar: string | null;
  babyAge: string;
  theme: 'rosa' | 'lavanda' | 'bege';
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [babyAge, setBabyAge] = useState('0-6 meses');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [theme, setTheme] = useState<'rosa' | 'lavanda' | 'bege'>('rosa');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleNext = () => setStep(prev => prev + 1);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (step > 3) return null;

  return (
    <div className="fixed inset-0 bg-brand-primary/20 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up">
        
        {/* Header */}
        <div className={`p-8 text-center text-white transition-colors duration-300 ${
          theme === 'rosa' ? 'bg-gradient-to-br from-[#FF1493] to-[#FFC0CB]' :
          theme === 'lavanda' ? 'bg-gradient-to-br from-[#7C3AED] to-[#C4B5FD]' :
          'bg-gradient-to-br from-[#9C6644] to-[#E6CCB2]'
        }`}>
          
          {/* BIG LOGO */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg mb-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
                <path d="M12 5C12 5 13.5 2.5 15.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.5 6.5C16.5 6.5 14 6.5 13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7"/>
              </svg>
            </div>
            <h1 className="font-display font-extrabold text-3xl tracking-wide flex items-center justify-center leading-none">
              MãeNutri
              <span className="text-yellow-300 ml-0.5 text-4xl leading-none drop-shadow-md relative -top-1">+</span>
            </h1>
            <span className="text-[10px] font-bold text-white/90 tracking-[0.3em] uppercase mt-1">Área VIP</span>
          </div>

          <p className="text-white/95 font-medium">Complete seu perfil em 3 passos rápidos</p>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${step === i ? 'bg-white w-8' : 'bg-white/40 w-2'}`} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Seu Nome</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Ana Paula"
                  className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foto de Perfil</label>
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center border-2 border-dashed border-brand-primary text-brand-primary overflow-hidden relative">
                    {avatar ? (
                      <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={24} />
                    )}
                  </div>
                  <div>
                    <button className="text-sm text-brand-dark font-medium hover:underline block">Carregar foto</button>
                    <span className="text-xs text-gray-400">Clique para escolher</span>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Idade do Bebê</label>
                <select 
                  value={babyAge}
                  onChange={(e) => setBabyAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none bg-white"
                >
                  <option>0-6 meses</option>
                  <option>6-12 meses</option>
                  <option>12-24 meses</option>
                </select>
              </div>

              <button 
                onClick={handleNext}
                disabled={!name}
                className="w-full py-3 bg-brand-dark text-white rounded-full font-bold shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Cor do Tema</label>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setTheme('rosa')}
                    className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-all ${theme === 'rosa' ? 'border-[#FF69B4] bg-[#FFF0F5] text-[#FF1493]' : 'border-gray-100 text-gray-500'}`}
                  >
                    🌸 Rosa
                  </button>
                  <button 
                    onClick={() => setTheme('lavanda')}
                    className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-all ${theme === 'lavanda' ? 'border-[#8B5CF6] bg-[#F3E8FF] text-[#7C3AED]' : 'border-gray-100 text-gray-500'}`}
                  >
                    💜 Lavanda
                  </button>
                  <button 
                    onClick={() => setTheme('bege')}
                    className={`flex-1 py-2 rounded-lg border-2 font-medium text-sm transition-all ${theme === 'bege' ? 'border-[#D4A373] bg-[#FAF3E0] text-[#9C6644]' : 'border-gray-100 text-gray-500'}`}
                  >
                    🤎 Bege
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Interesses</label>
                <div className="flex flex-wrap gap-2">
                  {['Receitas de Papinhas', 'Rotina de Sono', 'Desenvolvimento', 'Amamentação', 'Pós-parto'].map((tag) => (
                    <label key={tag} className="flex items-center gap-2 px-3 py-2 bg-brand-bg rounded-lg cursor-pointer hover:bg-brand-border transition-colors">
                      <input type="checkbox" className="accent-brand-primary w-4 h-4 rounded" />
                      <span className="text-sm text-gray-700">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="w-full py-3 bg-brand-dark text-white rounded-full font-bold shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center gap-2"
              >
                Continuar <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in text-center">
              <h2 className="text-xl font-bold text-gray-800">Faça sua Primeira Apresentação! 👋</h2>
              
              <textarea 
                className="w-full h-32 p-4 rounded-xl border border-brand-border focus:border-brand-primary focus:ring-2 focus:ring-brand-light outline-none resize-none text-sm"
                placeholder={`Olá, sou a ${name}! Meu bebê tem ${babyAge} e estou animada para...`}
              ></textarea>
              
              <button 
                onClick={() => onComplete({ name, avatar, babyAge, theme })}
                className="w-full py-4 bg-gradient-to-r from-brand-dark to-brand-primary text-white rounded-full font-bold text-lg shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-[1.05] transition-all flex justify-center items-center gap-2"
              >
                Entrar na Comunidade <Check size={20} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};