import React, { useMemo } from 'react';
import { Lock, CheckCircle, Download, Award, Heart, Book, TrendingUp } from 'lucide-react';
import { MOCK_MODULES, MOCK_PDFS, MODULE_1_CONTENT, MODULE_2_CONTENT, MODULE_3_CONTENT, MODULE_4_CONTENT, MODULE_5_CONTENT, MODULE_6_CONTENT } from '../constants';

interface DashboardProps {
  onModuleClick: (moduleId: number) => void;
  readRecipes: Set<string>;
  favoriteRecipes: Set<string>;
}

export const Dashboard: React.FC<DashboardProps> = ({ onModuleClick, readRecipes, favoriteRecipes }) => {
  
  // Calculate Real Progress
  const stats = useMemo(() => {
    const allModulesContent = [
      { id: 1, content: MODULE_1_CONTENT },
      { id: 2, content: MODULE_2_CONTENT },
      { id: 3, content: MODULE_3_CONTENT },
      { id: 4, content: MODULE_4_CONTENT },
      { id: 5, content: MODULE_5_CONTENT },
      { id: 6, content: MODULE_6_CONTENT },
    ];

    let totalRecipesCount = 0;
    let totalReadCount = 0;
    let completedModulesCount = 0;

    const moduleProgressMap: Record<number, number> = {};

    allModulesContent.forEach(mod => {
      // Get all recipes for this module
      const modRecipes = mod.content.categories.flatMap(c => c.recipes);
      const modTotal = modRecipes.length;
      
      // Count how many are read
      const modRead = modRecipes.filter(r => readRecipes.has(r.id)).length;

      totalRecipesCount += modTotal;
      totalReadCount += modRead;

      // Calculate module specific percentage
      const percent = modTotal > 0 ? (modRead / modTotal) * 100 : 0;
      moduleProgressMap[mod.id] = percent;

      // Check if module is completed (e.g., > 95% read)
      if (percent >= 95) {
        completedModulesCount++;
      }
    });

    const overallPercentage = totalRecipesCount > 0 
      ? Math.round((totalReadCount / totalRecipesCount) * 100) 
      : 0;

    return {
      overallPercentage,
      completedModulesCount,
      moduleProgressMap
    };
  }, [readRecipes]);

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-soft p-8 rounded-3xl text-white mb-8 shadow-xl shadow-brand-primary/20 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold mb-2">Bem-vinda de volta, Mamãe! 👋</h1>
          <p className="opacity-90">Continue de onde parou: <span className="font-semibold underline cursor-pointer hover:text-yellow-200 transition-colors" onClick={() => onModuleClick(1)}>Módulo 1 - Receitas 7 Meses</span></p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>

      {/* Sistema de Acompanhamento (Stats) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={48} className="text-brand-primary" />
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center text-brand-primary mb-2">
            <span className="font-bold text-sm">{stats.overallPercentage}%</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{stats.overallPercentage}%</span>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Progresso Geral</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-brand-primary h-full rounded-full transition-all duration-500" style={{ width: `${stats.overallPercentage}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
            <Book size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800">{stats.completedModulesCount}/6</span>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Módulos Concluídos</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
            <Heart size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-800">{favoriteRecipes.size}</span>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Receitas Favoritas</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500 mb-2">
            <Award size={24} />
          </div>
          {/* Mock achievement logic */}
          <span className="text-2xl font-bold text-gray-800">{Math.floor(stats.completedModulesCount * 1.5) + 1}</span>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Conquistas</p>
        </div>
      </div>

      {/* Modules Grid */}
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-2xl">📚</span> Seus Módulos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {MOCK_MODULES.map((module) => {
          const progress = stats.moduleProgressMap[module.id] || 0;
          return (
            <div 
              key={module.id}
              onClick={() => !module.isLocked && onModuleClick(module.id)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-brand-soft cursor-pointer ${module.isLocked ? 'opacity-75' : ''}`}
            >
              <div className="relative w-full h-auto md:h-[163px] overflow-hidden">
                <img 
                  src={module.thumbnail} 
                  alt={module.title} 
                  className="w-full h-auto md:h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                {module.isLocked && (
                  <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center backdrop-blur-sm">
                    <Lock className="text-white w-10 h-10" />
                  </div>
                )}
                {!module.isLocked && progress >= 100 && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                    <CheckCircle size={20} />
                  </div>
                )}
                {!module.isLocked && (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-brand-dark px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Acessar Conteúdo
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight min-h-[50px]">{module.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">{module.description}</p>
                
                {!module.isLocked && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progresso</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-primary h-full rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PDFs Section */}
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-2xl">📄</span> Materiais Complementares
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_PDFS.map((pdf) => (
          <div key={pdf.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{pdf.icon}</div>
            <h4 className="font-bold text-gray-800 mb-4 flex-1">{pdf.title}</h4>
            <a 
              href={pdf.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-brand-bg text-brand-dark rounded-full font-semibold text-sm hover:bg-brand-primary hover:text-white transition-colors"
            >
              <Download size={16} /> Baixar PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};