import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Users, Snowflake, AlertCircle, ChefHat, Info, Search, XCircle, CheckCircle, Circle, Grid, ChevronRight, Baby, Utensils, Heart, Apple, Coffee, Star, Calendar, ClipboardList, Brain, Lightbulb, ShieldAlert, ListChecks, HelpCircle, Shield, AlertTriangle, PlayCircle, Stethoscope, ShieldCheck, AlertOctagon, Thermometer, Filter } from 'lucide-react';
import { MODULE_1_CONTENT, MODULE_2_CONTENT, MODULE_3_CONTENT, MODULE_4_CONTENT, MODULE_5_CONTENT, MODULE_6_CONTENT } from '../constants';
import { Recipe } from '../types';

interface ModuleViewerProps {
  onBack: () => void;
  moduleId: number;
  readRecipes: Set<string>;
  onAutoRead: (id: string) => void;
  onToggleRead: (id: string) => void;
  favoriteRecipes: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const RecipeCard: React.FC<{ 
  recipe: Recipe; 
  onAutoMark: (id: string) => void; 
  onToggle: (id: string) => void;
  isRead: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}> = ({ recipe, onAutoMark, onToggle, isRead, isFavorite, onToggleFavorite }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isRead) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Marca como lido após 3 segundos (3000ms) de visualização contínua
          timerRef.current = setTimeout(() => {
            if (typeof recipe.id === 'string') {
              onAutoMark(recipe.id);
            }
          }, 3000);
        } else {
          // Se sair da tela antes dos 3s, cancela o timer
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        }
      },
      { threshold: 0.6 } // Requer 60% do card visível
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [recipe.id, isRead, onAutoMark]);

  // Adaptação visual para conteúdos que não são receitas (Módulo 4, 5, 6, Dicas, etc)
  const isTheory = recipe.time === "Leitura" || recipe.time.includes("min leitura") || recipe.time === "Guia Visual" || recipe.time.includes("Risco") || recipe.time === "Lista";

  // Badge Color Logic for Module 6 (Allergens) and others
  const getBadgeStyle = (text: string) => {
    if (text.includes("Alto") || text.includes("Grave") || text.includes("Urgente") || text.includes("Proibido")) return "bg-red-100 text-red-700 border-red-200";
    if (text.includes("Moderado") || text.includes("Atenção") || text.includes("Cuidado")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (text.includes("Baixo") || text.includes("Seguro") || text.includes("Vital") || text.includes("Teste")) return "bg-green-100 text-green-700 border-green-200";
    return "bg-brand-bg text-brand-dark border-brand-primary/20";
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (recipe && typeof recipe.id === 'string') {
      onToggle(recipe.id);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (recipe && typeof recipe.id === 'string') {
      onToggleFavorite(recipe.id);
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 relative ${isRead ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}
    >
      {/* Actions Container */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button 
          type="button"
          onClick={handleFavoriteClick}
          className="p-2 rounded-full hover:bg-red-50 transition-colors group"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart 
            size={24} 
            className={`transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-300 group-hover:text-red-400'}`} 
          />
        </button>

        <button 
          type="button"
          onClick={handleToggleClick}
          className="p-2 rounded-full hover:bg-gray-100/50 transition-colors group"
          title={isRead ? "Marcar como não lido" : "Marcar como lido"}
        >
          {isRead ? (
            <CheckCircle size={24} className="text-green-500 fill-green-100" />
          ) : (
            <Circle size={24} className="text-gray-300 group-hover:text-brand-primary" />
          )}
        </button>
      </div>

      <div className="flex justify-between items-start mb-3 pr-20">
        <h3 className="text-lg font-bold text-gray-800 leading-tight">{recipe.title}</h3>
        <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap border ${getBadgeStyle(recipe.age)}`}>
          {recipe.age}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
          <Clock size={14} className="text-brand-primary" /> {recipe.time}
        </div>
        {!isTheory && (
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <Users size={14} className="text-brand-primary" /> {recipe.yields}
          </div>
        )}
        {recipe.storage && recipe.storage !== "-" && (
          <div className="flex items-center gap-1 text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
            <Snowflake size={14} /> {recipe.storage}
          </div>
        )}
      </div>
      
      {recipe.allergens && recipe.allergens.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {recipe.allergens.map(a => (
            <span key={a} className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wide font-bold">
              🚫 {a}
            </span>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1">
            {isTheory ? <Brain size={16} className="text-brand-primary" /> : <ChefHat size={16} className="text-brand-primary" />} 
            {isTheory ? "O Que Saber / Sintomas" : "Ingredientes / Itens"}
          </h4>
          <ul className="space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 mt-1.5 shrink-0"></span>
                {ing}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-700 text-sm mb-2 flex items-center gap-1">
            {isTheory ? <ListChecks size={16} className="text-brand-primary" /> : <Info size={16} className="text-brand-primary" />} 
            {isTheory ? "Ação / Protocolo" : "Modo de Preparo"}
          </h4>
          <ol className="space-y-2">
            {recipe.preparation.map((step, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="font-bold text-brand-dark text-xs mt-0.5 min-w-[15px]">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {recipe.tip && (
        <div className="mt-4 bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex gap-3">
          <AlertCircle size={18} className="text-yellow-600 shrink-0" />
          <p className="text-xs text-yellow-800 font-medium italic">"{recipe.tip}"</p>
        </div>
      )}
    </div>
  );
};

export const ModuleViewer: React.FC<ModuleViewerProps> = ({ 
  onBack, 
  moduleId, 
  readRecipes, 
  onAutoRead, 
  onToggleRead,
  favoriteRecipes,
  onToggleFavorite
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  
  // Select Content based on Module ID
  let content = MODULE_1_CONTENT;
  let moduleTitle = "Módulo";
  
  if (moduleId === 1) { content = MODULE_1_CONTENT; moduleTitle = "500 Receitas Completas"; }
  else if (moduleId === 2) { content = MODULE_2_CONTENT; moduleTitle = "50 Lanchinhos Saudáveis"; }
  else if (moduleId === 3) { content = MODULE_3_CONTENT; moduleTitle = "Cardápios Semanais"; }
  else if (moduleId === 4) { content = MODULE_4_CONTENT; moduleTitle = "Recusa Alimentar: O Guia"; }
  else if (moduleId === 5) { content = MODULE_5_CONTENT; moduleTitle = "Guia de Texturas Seguras"; }
  else if (moduleId === 6) { content = MODULE_6_CONTENT; moduleTitle = "Protocolo de Alergênicos"; }

  const handleBack = () => {
    if (searchQuery || ageFilter) {
      setSearchQuery('');
      setAgeFilter(null);
    } else if (activeCategory) {
      setActiveCategory(null); // Volta para a Grid
    } else {
      onBack(); // Volta para o Dashboard
    }
  };

  // Filtragem Global
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim() && !ageFilter) return [];
    
    const query = searchQuery.toLowerCase();
    const allRecipes = content.categories.flatMap(cat => cat.recipes);
    
    return allRecipes.filter(recipe => {
      const matchesSearch = !query || 
        recipe.title.toLowerCase().includes(query) || 
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query));
        
      const matchesAge = !ageFilter || recipe.age.includes(ageFilter) || recipe.age === ageFilter;
      
      return matchesSearch && matchesAge;
    });
  }, [searchQuery, ageFilter, content.categories]);

  // Ícones dinâmicos para os quadrados (Grid)
  const getCategoryIcon = (title: string) => {
    const t = title.toLowerCase();
    
    // Módulo 6 - Alergênicos
    if (t.includes('entenda') || t.includes('conceito')) return <Brain size={32} />;
    if (t.includes('regras') || t.includes('segurança')) return <ShieldCheck size={32} />;
    if (t.includes('top 8') || t.includes('guia prático')) return <AlertOctagon size={32} />;
    if (t.includes('sintomas') || t.includes('sos')) return <Stethoscope size={32} />;
    if (t.includes('receitas') || t.includes('teste')) return <Utensils size={32} />;
    if (t.includes('checklist') || t.includes('extra')) return <ClipboardList size={32} />;

    // Módulo 5 - Texturas
    if (t.includes('segurança') || t.includes('regras')) return <Shield size={32} />;
    if (t.includes('6 meses')) return <Baby size={32} />;
    if (t.includes('7-8')) return <Utensils size={32} />;
    if (t.includes('9-11')) return <ChefHat size={32} />;
    if (t.includes('12-18') || t.includes('18-24')) return <Apple size={32} />;
    if (t.includes('erros') || t.includes('alerta')) return <AlertTriangle size={32} />;
    if (t.includes('receitas')) return <PlayCircle size={32} />;

    // Módulo 4 - Recusa
    if (t.includes('motivos') || t.includes('entenda')) return <Brain size={32} />;
    if (t.includes('estratégia')) return <Lightbulb size={32} />;
    if (t.includes('plano') || t.includes('ação')) return <Calendar size={32} />;
    if (t.includes('checklist') || t.includes('dúvidas')) return <ListChecks size={32} />;

    // Geral
    if (t.includes('lanches')) return <Coffee size={32} />;
    if (t.includes('doces')) return <Heart size={32} />;
    if (t.includes('guia') || t.includes('planejamento')) return <ClipboardList size={32} />;
    
    return <Grid size={32} />;
  };

  const getAgeBadge = (title: string) => {
    const t = title.toLowerCase();
    
    // Módulo 6 badges
    if (t.includes('entenda')) return "Conceitos";
    if (t.includes('regras')) return "Vital";
    if (t.includes('top 8') || t.includes('alimentos')) return "O Guia";
    if (t.includes('sintomas')) return "Urgente";
    if (t.includes('receitas')) return "Prática";
    if (t.includes('extra')) return "Ferramentas";

    // Módulo 5 badges
    if (t.includes('segurança')) return "Essencial";
    if (t.includes('6 meses')) return "6m";
    if (t.includes('7-8')) return "7-8m";
    if (t.includes('9-11')) return "9-11m";
    if (t.includes('12-18')) return "12m+";
    if (t.includes('18-24')) return "18m+";
    if (t.includes('erros')) return "Cuidado";
    if (t.includes('receitas')) return "Prática";

    // Outros
    if (t.includes('motivos')) return "Teoria";
    if (t.includes('estratégia')) return "Prática";
    if (t.includes('plano')) return "14 Dias";
    if (t.includes('família')) return "Todos";
    
    return null;
  };

  const ageFilters = ["6M", "7M", "8M", "9M", "12M", "18M", "Família"];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] animate-fade-in">
      
      {/* Header Fixo */}
      <div className="shrink-0 mb-2 space-y-3 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-2.5 hover:bg-brand-bg rounded-full transition-colors text-gray-600 bg-white shadow-sm border border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              {activeCategory ? moduleTitle : 'Módulo Selecionado'}
            </span>
            <h2 className="font-display font-bold text-brand-dark text-lg leading-none truncate max-w-[250px]">
              {activeCategory 
                ? content.categories.find(c => c.id === activeCategory)?.title 
                : moduleTitle}
            </h2>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="space-y-3">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder={`Buscar em ${moduleTitle}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-sm shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary w-5 h-5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>

          {/* Filtros Rápidos (Idade) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button 
              onClick={() => setAgeFilter(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                !ageFilter ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              Todos
            </button>
            {ageFilters.map(age => (
              <button
                key={age}
                onClick={() => setAgeFilter(ageFilter === age ? null : age)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                  ageFilter === age ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 overflow-y-auto pr-1 pb-20 custom-scrollbar scroll-smooth mt-2">
        
        {/* MODO FILTRO/BUSCA */}
        {(searchQuery.trim() || ageFilter) ? (
          <div className="space-y-4">
            <div className="p-2 text-sm text-gray-500 font-medium flex justify-between items-center">
              <span>Encontramos {filteredRecipes.length} resultados:</span>
              {ageFilter && (
                <span className="text-xs bg-brand-soft/30 text-brand-dark px-2 py-1 rounded-md">
                  Filtro: {ageFilter}
                </span>
              )}
            </div>
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onAutoMark={onAutoRead} 
                onToggle={onToggleRead}
                isRead={readRecipes.has(recipe.id)} 
                isFavorite={favoriteRecipes.has(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
            {filteredRecipes.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>Nenhum conteúdo encontrado com esses filtros.</p>
              </div>
            )}
          </div>
        ) : activeCategory ? (
          // MODO LISTA DE CONTEÚDO (Dentro de uma categoria)
          <div className="space-y-4">
            <div className="bg-brand-bg/50 p-4 rounded-xl border border-brand-soft/30 text-brand-dark text-sm mb-4">
              {content.categories.find(c => c.id === activeCategory)?.description}
            </div>
            {content.categories.find(c => c.id === activeCategory)?.recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onAutoMark={onAutoRead} 
                onToggle={onToggleRead}
                isRead={readRecipes.has(recipe.id)} 
                isFavorite={favoriteRecipes.has(recipe.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          // MODO GRID / QUADRADOS (Menu Principal do Módulo)
          <div className="space-y-6">
            
            {/* Introdução Visual */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-dark p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold mb-2">{moduleTitle}</h3>
                <p className="text-white/90 text-sm max-w-[90%] line-clamp-2">
                  {content.introduction.substring(0, 100)}...
                </p>
              </div>
              <div className="absolute -right-4 -bottom-8 opacity-20">
                {moduleId === 6 ? <ShieldCheck size={120} /> : moduleId === 5 ? <Shield size={120} /> : moduleId === 4 ? <ShieldAlert size={120} /> : <Calendar size={120} />}
              </div>
            </div>

            {/* A GRANDE GRID DE QUADRADOS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Botão de Dicas (Sempre o primeiro) */}
              <div 
                onClick={() => setActiveCategory('intro')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-soft transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 aspect-square group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Info size={24} />
                </div>
                <h4 className="font-bold text-gray-700 text-sm">Comece Aqui</h4>
              </div>

              {/* Categorias Dinâmicas */}
              {content.categories.map((cat) => {
                if (cat.id === 'intro') return null; // Já renderizado acima
                const ageBadge = getAgeBadge(cat.title);
                const total = cat.recipes.length;
                const readCount = cat.recipes.filter(r => readRecipes.has(r.id)).length;
                const progressPercentage = total > 0 ? (readCount / total) * 100 : 0;
                
                return (
                  <div 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-primary/30 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group aspect-square"
                  >
                    {/* Background decorativo */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-bg rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                        {getCategoryIcon(cat.title)}
                      </div>
                      {ageBadge && (
                        <span className="bg-brand-dark text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                          {ageBadge}
                        </span>
                      )}
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-display font-bold text-gray-800 leading-tight mb-1 line-clamp-2 text-sm md:text-base">
                        {cat.title}
                      </h4>
                      
                      {/* Progress Stats */}
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-[10px] text-gray-500 font-medium mb-1">
                          <span>{readCount}/{total} lidas</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-green-500 h-full rounded-full transition-all duration-500" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};