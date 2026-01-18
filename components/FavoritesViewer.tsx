import React, { useMemo } from 'react';
import { Heart, Clock, Users, ArrowRight } from 'lucide-react';
import { MODULE_1_CONTENT, MODULE_2_CONTENT, MODULE_3_CONTENT, MODULE_4_CONTENT, MODULE_5_CONTENT, MODULE_6_CONTENT } from '../constants';
import { Recipe } from '../types';

interface FavoritesViewerProps {
  favoriteRecipes: Set<string>;
  onModuleClick: (moduleId: number) => void;
  onRemoveFavorite: (id: string) => void;
}

export const FavoritesViewer: React.FC<FavoritesViewerProps> = ({ favoriteRecipes, onModuleClick, onRemoveFavorite }) => {
  
  const favoritedItems = useMemo(() => {
    const allModules = [
      { id: 1, name: "500 Receitas", content: MODULE_1_CONTENT },
      { id: 2, name: "50 Lanchinhos", content: MODULE_2_CONTENT },
      { id: 3, name: "Cardápios", content: MODULE_3_CONTENT },
      { id: 4, name: "Recusa Alimentar", content: MODULE_4_CONTENT },
      { id: 5, name: "Texturas", content: MODULE_5_CONTENT },
      { id: 6, name: "Alergênicos", content: MODULE_6_CONTENT },
    ];

    const results: { moduleName: string; moduleId: number; recipe: Recipe }[] = [];

    allModules.forEach(mod => {
      mod.content.categories.forEach(cat => {
        cat.recipes.forEach(recipe => {
          if (favoriteRecipes.has(recipe.id)) {
            results.push({
              moduleName: mod.name,
              moduleId: mod.id,
              recipe: recipe
            });
          }
        });
      });
    });

    return results;
  }, [favoriteRecipes]);

  if (favoritedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6 animate-fade-in">
        <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-brand-primary opacity-50" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sua lista está vazia</h2>
        <p className="text-gray-500 max-w-xs mb-6">Explore os cursos e clique no coração ❤️ para salvar suas receitas e dicas favoritas aqui.</p>
        <button 
          onClick={() => onModuleClick(1)}
          className="px-6 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Explorar Receitas
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-gradient-to-r from-red-400 to-pink-500 p-8 rounded-3xl text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
            <Heart className="w-8 h-8 fill-white" />
            Meus Favoritos
          </h1>
          <p className="opacity-90">{favoritedItems.length} itens salvos para acesso rápido.</p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritedItems.map(({ moduleName, moduleId, recipe }) => (
          <div key={recipe.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative group">
            <button 
              onClick={(e) => { e.stopPropagation(); onRemoveFavorite(recipe.id); }}
              className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors z-10"
              title="Remover dos favoritos"
            >
              <Heart size={20} className="fill-red-500" />
            </button>

            <div className="mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                {moduleName}
              </span>
            </div>

            <h3 className="font-bold text-gray-800 text-lg mb-2 pr-10">{recipe.title}</h3>
            
            <div className="flex gap-3 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1"><Clock size={14} /> {recipe.time}</span>
              {recipe.yields && recipe.yields !== "-" && <span className="flex items-center gap-1"><Users size={14} /> {recipe.yields}</span>}
            </div>

            <button 
              onClick={() => onModuleClick(moduleId)} // Ideally this would deep link, but simpler for now
              className="w-full py-2.5 mt-auto border border-brand-primary/30 text-brand-primary rounded-xl font-semibold text-sm hover:bg-brand-bg transition-colors flex items-center justify-center gap-2"
            >
              Ver Detalhes <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};