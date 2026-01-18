import { Module, PDFMaterial, User, BookContent, Recipe, RecipeCategory, ChatContact, ChatMessage } from './types';

export const CURRENT_USER: User = {
  id: 99,
  name: "Ana Paula",
  avatar: "https://picsum.photos/id/64/200/200",
  isOnline: true
};

export const MOCK_MODULES: Module[] = [
  {
    id: 1,
    title: "500 Receitas Para Alimentar Seu Bebê",
    description: "Guia completo de introdução alimentar: 500 receitas nutritivas divididas por fase (6 a 24 meses).",
    thumbnail: "https://i.ibb.co/67qtg3HJ/3.png",
    totalLessons: 500,
    completedLessons: 12,
    isLocked: false
  },
  {
    id: 2,
    title: "50 Receitas de Lanchinhos Saudáveis",
    description: "Sem Açúcar, Sem Complicação - Só Amor e Nutrição. Edição Completa 2026.",
    thumbnail: "https://i.ibb.co/21xnvsRr/1.png",
    totalLessons: 50,
    completedLessons: 0,
    isLocked: false
  },
  {
    id: 3,
    title: "Cardápios Semanais Prontos Mãe",
    description: "Cardápios semanais prontos: 6 semanas de refeições já planejadas. Praticidade e Nutrição.",
    thumbnail: "https://i.ibb.co/DDC72pfy/5.png",
    totalLessons: 42,
    completedLessons: 0,
    isLocked: false
  },
  {
    id: 4,
    title: "Recusa Alimentar Infantil",
    description: "Estratégias comprovadas para quando seu bebê rejeita comida. Neofobia, texturas e comportamento.",
    thumbnail: "https://i.ibb.co/nJ15Fmq/4.png",
    totalLessons: 15,
    completedLessons: 0,
    isLocked: false
  },
  {
    id: 5,
    title: "Guia de Texturas Seguras",
    description: "Introdução alimentar segura de 0-24 meses. Aprenda a evoluir as texturas, fazer testes de segurança e evitar engasgos.",
    thumbnail: "https://i.ibb.co/VWfWDvvd/2.png",
    totalLessons: 20,
    completedLessons: 0,
    isLocked: false
  },
  {
    id: 6,
    title: "Tabela de Alergênicos Completa",
    description: "Protocolos de segurança para introduzir ovo, amendoim, peixe e outros alergênicos sem medo.",
    thumbnail: "https://i.ibb.co/zhW1L3R2/Designsemnome64-ezgif-com-png-to-webp-converter.webp",
    totalLessons: 18,
    completedLessons: 0,
    isLocked: false
  }
];

export const MOCK_PDFS: PDFMaterial[] = [
  { id: 1, title: "Cronograma Alimentar", icon: "📅", downloadUrl: "https://www.ggcheckout.com/checkout/v4/isBq1nncP8Sp0h2dj1Us" },
  { id: 2, title: "Guia de Alergias Alimentares", icon: "📗", downloadUrl: "https://www.ggcheckout.com/checkout/v4/5VUEBMg4kvgSrxOmfB7K" },
  { id: 3, title: "Tabela Nutricional Completa", icon: "📘", downloadUrl: "https://www.ggcheckout.com/checkout/v4/8mTZeD5ACchuBm0VMbEM" },
  { id: 4, title: "Lista de Compras Semanal", icon: "🛒", downloadUrl: "https://www.ggcheckout.com/checkout/v4/KMiYbZklsXrDqD48ClAy" }
];

// DADOS DO CHAT
export const CHAT_CONTACTS: ChatContact[] = [
  {
    id: 1,
    name: "Grupo VIP das Mães 💖",
    avatar: "https://cdn-icons-png.flaticon.com/512/3233/3233483.png",
    lastMessage: "Carla: Alguém já testou a receita de brócolis?",
    lastTime: "10:45",
    unreadCount: 3,
    isGroup: true,
    isOnline: true
  },
  {
    id: 3,
    name: "Avisos da Plataforma",
    avatar: "https://cdn-icons-png.flaticon.com/512/1156/1156949.png",
    lastMessage: "Novo módulo liberado!",
    lastTime: "Segunda",
    unreadCount: 1,
    isGroup: false,
    isOnline: false
  }
];

export const INITIAL_CHAT_MESSAGES: Record<number, ChatMessage[]> = {
  1: [
    { id: 1, senderId: 2, text: "Bom dia meninas! Como estão os bebês hoje?", timestamp: "09:30" },
    { id: 2, senderId: 3, text: "Aqui estamos na luta com o sono rsrs", timestamp: "09:32" },
    { id: 3, senderId: 0, text: "Oi gente! Por aqui a introdução alimentar está indo super bem graças ao guia.", timestamp: "10:00" },
    { id: 4, senderId: 4, text: "Alguém já testou a receita de brócolis do módulo 1? O meu filho amou!", timestamp: "10:45" }
  ],
  3: [
    { id: 201, senderId: 3, text: "Bem-vinda à plataforma! Aproveite os conteúdos.", timestamp: "Segunda", isSystem: true },
    { id: 202, senderId: 3, text: "Novo módulo liberado!", timestamp: "Segunda" }
  ]
};

// --- DATA ENGINE FOR RECIPES (500+ GENERATOR FOR MODULE 1) ---

const INGREDIENTS = {
  proteins: ['Frango', 'Carne Bovina (Patinho)', 'Carne Bovina (Músculo)', 'Tilápia', 'Ovo Cozido', 'Lentilha', 'Feijão Carioca', 'Feijão Preto', 'Grão de Bico', 'Carne Seca (Dessalgada)', 'Fígado', 'Sobrecoxa de Frango'],
  carbs: ['Batata Inglesa', 'Batata Doce', 'Mandioquinha', 'Inhame', 'Mandioca', 'Arroz Branco', 'Arroz Integral', 'Macarrão', 'Aveia', 'Quinoa', 'Milho', 'Fubá'],
  vegetables: ['Cenoura', 'Abóbora', 'Chuchu', 'Brócolis', 'Couve-flor', 'Espinafre', 'Beterraba', 'Vagem', 'Ervilha', 'Abobrinha', 'Berinjela', 'Quiabo', 'Maxixe', 'Tomate', 'Couve'],
  fruits: ['Banana', 'Maçã', 'Pera', 'Mamão', 'Manga', 'Abacate', 'Melancia', 'Melão', 'Ameixa', 'Pêssego', 'Caqui', 'Kiwi'],
  extras: ['Azeite', 'Salsinha', 'Cebolinha', 'Manjericão', 'Leite de Coco', 'Chia', 'Linhaça']
};

const createRecipe = (id: string, title: string, age: string, text: string): Recipe => ({
  id,
  title,
  age,
  time: "25min",
  yields: "2 porções",
  ingredients: text.split('+').map(i => i.trim()),
  preparation: [
    `Prepare os ingredientes: higienize, descasque e corte.`,
    `Cozinhe tudo até ficar macio (no vapor ou água).`,
    age === "6M+" ? "Amasse bem ou peneire para obter textura de purê liso." : 
    age.includes("7M") || age.includes("8M") ? "Amasse com o garfo deixando pequenos gruminhos." : 
    "Corte em pedaços bem pequenos ou desfie."
  ],
  storage: "Congelador 30 dias"
});

const generateRecipes = (startId: number, count: number, age: string, type: 'pure' | 'amassado' | 'picadinho') => {
  const recipes: Recipe[] = [];
  let idCounter = startId;
  for (let p = 0; p < INGREDIENTS.proteins.length; p++) {
    for (let c = 0; c < INGREDIENTS.carbs.length; c++) {
      for (let v = 0; v < INGREDIENTS.vegetables.length; v++) {
        if (recipes.length >= count) break;
        const prot = INGREDIENTS.proteins[p];
        const carb = INGREDIENTS.carbs[c];
        const veg = INGREDIENTS.vegetables[v];
        let title = '';
        if (type === 'pure') title = `Purê de ${carb} com ${veg} e ${prot}`;
        else if (type === 'amassado') title = `Amassadinho de ${carb}, ${prot} e ${veg}`;
        else title = `${prot} Picadinho com ${carb} e ${veg}`;
        recipes.push(createRecipe(`gen_${idCounter}`, title, age, `${prot} + ${carb} + ${veg} + Fio de Azeite`));
        idCounter++;
      }
    }
  }
  return recipes;
};

// --- STATIC TOP RECIPES FOR MODULE 1 (Manually curated) ---
const TOP_RECIPES_6M = [
  { id: "p1", title: "Purê de Batata Doce", age: "6M+", time: "20min", yields: "2p", ingredients: ["Batata Doce", "Água"], preparation: ["Cozinhe e amasse bem."], storage: "Congelador 30d" },
  { id: "p2", title: "Purê de Cenoura com Chuchu", age: "6M+", time: "20min", yields: "2p", ingredients: ["Cenoura", "Chuchu"], preparation: ["Cozinhe e processe."], storage: "Congelador 30d" },
  { id: "p3", title: "Papinha de Abóbora", age: "6M+", time: "25min", yields: "3p", ingredients: ["Abóbora Cabotiá"], preparation: ["Asse a abóbora e amasse."], storage: "Congelador 30d" },
  { id: "p4", title: "Purê de Mandioquinha", age: "6M+", time: "20min", yields: "2p", ingredients: ["Mandioquinha"], preparation: ["Cozinhe até derreter."], storage: "Congelador 30d" },
  { id: "p5", title: "Creme de Inhame com Carne", age: "6M+", time: "35min", yields: "2p", ingredients: ["Inhame", "Carne magra"], preparation: ["Cozinhe juntos, bata a carne com caldo."], storage: "Congelador 30d" },
];

const TOP_RECIPES_FINGER_FOOD = [
  { id: "ff1", title: "Palitos de Cenoura Assada", age: "9M+", time: "30min", yields: "Vários", ingredients: ["Cenoura", "Azeite", "Orégano"], preparation: ["Corte palitos", "Asse 200C até amaciar"], storage: "Geladeira 3d" },
  { id: "ff2", title: "Brócolis 'Árvore'", age: "9M+", time: "10min", yields: "Vários", ingredients: ["Brócolis"], preparation: ["Vapor até talo ficar macio"], storage: "Geladeira 2d" },
  { id: "ff3", title: "Bolinho de Arroz", age: "9M+", time: "30min", yields: "6un", ingredients: ["Arroz", "Ovo", "Cenoura"], preparation: ["Misture, asse bolinhas"], storage: "Congelador 30d" },
  { id: "ff4", title: "Omelete em Tiras", age: "9M+", time: "10min", yields: "1p", ingredients: ["Ovo", "Espinafre"], preparation: ["Faça omelete, corte tiras"], storage: "Imediato" },
  { id: "ff5", title: "Hambúrguer de Carne", age: "9M+", time: "20min", yields: "2un", ingredients: ["Carne moída", "Aveia"], preparation: ["Grelhe bem passado"], storage: "Congelador 30d" },
];

const recipes6m = [...TOP_RECIPES_6M, ...generateRecipes(100, 70, "6M+", 'pure')];
const recipes7m = generateRecipes(200, 80, "7M+", 'amassado');
const recipes8m = generateRecipes(300, 80, "8M+", 'picadinho');
const recipes9m = [...TOP_RECIPES_FINGER_FOOD, ...generateRecipes(400, 70, "9M+", 'picadinho')];
const recipes12m = generateRecipes(500, 100, "12M+", 'picadinho').map(r => ({...r, title: r.title.replace('Picadinho', 'Prato da Família:'), preparation: ["Cozinhe como de costume para a família, mas com pouco sal.", "Sirva em pedaços pequenos."]}));

const recipesSnacks = [
  createRecipe("l1", "Pão de Queijo de Frigideira", "9M+", "Ovo + Tapioca + Queijo"),
  createRecipe("l2", "Bolo de Banana sem Açúcar", "9M+", "Banana + Aveia + Ovo"),
  createRecipe("l3", "Danoninho de Inhame", "9M+", "Inhame + Morango"),
  createRecipe("l4", "Crepioca", "9M+", "Ovo + Tapioca"),
  createRecipe("l5", "Muffin de Legumes", "9M+", "Ovo + Farinha + Legumes"),
  createRecipe("l6", "Cookie de Aveia", "9M+", "Banana + Aveia"),
  createRecipe("l7", "Pão de Batata Doce", "12M+", "Batata Doce + Polvilho"),
  createRecipe("l8", "Vitamina de Frutas", "9M+", "Leite + Fruta"),
  createRecipe("l9", "Biscoito de Polvilho", "12M+", "Polvilho + Ovo + Água"),
  createRecipe("l10", "Salada de Frutas", "6M+", "Frutas da estação"),
  ...generateRecipes(600, 40, "12M+", 'picadinho').map(r => ({...r, title: `Bolinho de ${r.ingredients[1]}`, preparation: ["Misture ingredientes com ovo e farinha.", "Asse em forminhas."]}))
];

const recipesSoups = [
  createRecipe("s1", "Sopa de Feijão com Macarrão", "8M+", "Feijão + Macarrão + Legumes"),
  createRecipe("s2", "Canja de Galinha", "9M+", "Frango + Arroz + Cenoura"),
  createRecipe("s3", "Creme de Espinafre", "9M+", "Espinafre + Batata + Leite"),
  createRecipe("s4", "Sopa Eslava", "12M+", "Beterraba + Carne + Batata"),
  createRecipe("s5", "Sopa de Ervilha", "9M+", "Ervilha + Batata + Azeite"),
  ...generateRecipes(700, 45, "6M+", 'pure').map(r => ({...r, title: r.title.replace('Purê', 'Sopa Creme'), preparation: ["Cozinhe com mais água para ficar líquido.", "Processe."]}))
];

// --- MODULE CONTENT ---

export const MODULE_1_CONTENT: BookContent = {
  introduction: `Este módulo contém 500 receitas organizadas por fase de desenvolvimento. 
  
  Use o menu abaixo para navegar entre as texturas adequadas para cada idade. Lembre-se: cada bebê é único, avance no ritmo dele!`,
  storageTips: [
    "Geladeira: 3 dias (potes fechados)",
    "Freezer: 30 dias (potes ou forminhas)",
    "Descongelar: Na geladeira ou banho-maria"
  ],
  categories: [
    { id: "intro", title: "Comece Aqui", description: "Dicas Iniciais", recipes: [] },
    { id: "6-7m", title: "6-7 Meses: Purês & Papinhas", description: "Textura lisa e pastosa. Introdução de sabores.", recipes: recipes6m },
    { id: "7-8m", title: "7-8 Meses: Amassadinhos", description: "Textura com gruminhos. Estimulo à mastigação.", recipes: recipes7m },
    { id: "8-9m", title: "8-9 Meses: Picadinhos", description: "Pedaços bem pequenos e macios.", recipes: recipes8m },
    { id: "9-12m", title: "9-12 Meses: Finger Foods", description: "Para comer com as mãozinhas (BLW).", recipes: recipes9m },
    { id: "12m", title: "12M+: Refeições em Família", description: "Comida da casa com pouco sal.", recipes: recipes12m },
    { id: "lanches", title: "Lanchinhos & Pães", description: "Café da manhã e lanche da tarde.", recipes: recipesSnacks },
    { id: "sopas", title: "Sopas & Jantares", description: "Opções leves para a noite.", recipes: recipesSoups },
    { id: "doces", title: "Doces Saudáveis (Sem Açúcar)", description: "Sobremesas naturais com frutas.", recipes: INGREDIENTS.fruits.map((f, i) => createRecipe(`d${i}`, `Doce de ${f} Natural`, "6M+", `${f} + Canela`)) }
  ]
};

// --- MODULE 2: 50 LANCHINHOS SAUDÁVEIS (UPDATED) ---
export const MODULE_2_CONTENT: BookContent = {
  introduction: `Lanchinho não precisa ser biscoito industrializado ou bolo cheio de açúcar. Sabemos que a rotina materna é corrida, mas a alimentação do seu filho é a base para uma vida saudável. O segredo não é passar horas na cozinha, mas sim fazer escolhas inteligentes.
  
  Estas 50 receitas foram criadas pensando exatamente nisso: serem saudáveis, rápidas e GOSTOSAS.`,
  storageTips: [
    "DICA OURO: MEAL PREP - Não cozinhe todo dia! Tire 2 horas no domingo e prepare 3 ou 4 receitas.",
    "Zero Açúcar: Até os 2 anos, não usamos açúcar adicionado. A doçura vem das frutas.",
    "Sal: Antes de 1 ano, zero sal. Use ervas frescas. Após 1 ano, uma pitada mínima é permitida."
  ],
  categories: [
    {
      id: "intro",
      title: "Comece Aqui & Dicas",
      description: "Como usar este guia, lista de compras e dicas de ouro.",
      recipes: [
        {
            id: "m2_intro_1",
            title: "Como Usar Este Guia",
            age: "Guia",
            time: "Leitura",
            yields: "-",
            storage: "-",
            ingredients: ["Dividido por idade", "Progressão de textura"],
            preparation: ["Um bebê mais velho pode comer receitas das fases anteriores.", "Respeite o desenvolvimento do seu bebê."],
            tip: "Adapte a textura se necessário."
        },
        {
            id: "m2_intro_2",
            title: "Lista de Compras Básica",
            age: "Planejamento",
            time: "Lista",
            yields: "-",
            storage: "-",
            ingredients: ["Bananas Nanica/Prata", "Maçã, Pera, Abacate", "Cenoura, Abóbora, Batata Doce", "Aveia, Polvilho, Fubá", "Ovos, Iogurte Natural"],
            preparation: ["Tenha esses itens na despensa para fazer quase todas as receitas."],
            tip: "Custo estimado de reposição: R$ 100-150"
        }
      ]
    },
    {
      id: "cat1",
      title: "6-9 Meses: Introdução Suave",
      description: "Textura pastosa a amassada. Sabores suaves.",
      recipes: [
        { id: "r1", title: "Papinha de Banana com Aveia", age: "6M+", time: "2 min", yields: "1 porção", ingredients: ["1 banana madura", "1 colher sopa aveia flocos finos", "2 colheres sopa água"], preparation: ["Amasse bem a banana.", "Misture aveia e água até ficar cremoso."], storage: "Imediato", tip: "Rico em Potássio e Fibras.", allergens: ["Glúten (Aveia)"] },
        { id: "r2", title: "Purê de Maçã com Canela", age: "6M+", time: "20 min", yields: "2 porções", ingredients: ["2 maçãs descascadas", "1 pitada canela", "Água"], preparation: ["Pique maçãs.", "Cozinhe em pouca água até amaciar.", "Amasse com garfo.", "Polvilhe canela."], storage: "Congela 30 dias", tip: "Rico em Vitamina C." },
        { id: "r3", title: "Papa de Abóbora com Coco", age: "7M+", time: "20 min", yields: "2 porções", ingredients: ["200g abóbora cozida", "2 colheres leite coco", "Pitada canela"], preparation: ["Cozinhe abóbora vapor.", "Amasse bem.", "Misture leite coco e canela."], storage: "Geladeira 2 dias", tip: "Rico em Vitamina A." },
        { id: "r4", title: "Purê de Pera Cozida", age: "6M+", time: "15 min", yields: "2 porções", ingredients: ["2 peras maduras", "1 cravo da índia"], preparation: ["Descasque/pique peras.", "Cozinhe vapor com cravo.", "Retire cravo e amasse."], storage: "Congela 30 dias", tip: "Ajuda no intestino." },
        { id: "r5", title: "Papinha de Batata Doce", age: "6M+", time: "25 min", yields: "2 porções", ingredients: ["1 batata doce pequena", "1 colher chá óleo coco"], preparation: ["Asse/cozinhe batata com casca.", "Descasque e amasse.", "Misture óleo."], storage: "Geladeira 3 dias", tip: "Energia pura." },
        { id: "r6", title: "Purê de Abacate (Guacamole Baby)", age: "6M+", time: "2 min", yields: "1 porção", ingredients: ["1/2 abacate maduro", "Gotas de limão"], preparation: ["Amasse abacate.", "Pingue limão para não escurecer."], storage: "Imediato", tip: "Gorduras boas para o cérebro." },
        { id: "r7", title: "Papa de Cenoura com Maçã", age: "6M+", time: "20 min", yields: "2 porções", ingredients: ["1 cenoura pequena", "1 maçã pequena"], preparation: ["Descasque e pique ambos.", "Cozinhe vapor até macios.", "Amasse juntos."], storage: "Congela 30 dias", tip: "Sabor adocicado natural." },
        { id: "r8", title: "Purê de Beterraba Doce", age: "7M+", time: "30 min", yields: "2 porções", ingredients: ["1 beterraba média", "1 banana prata"], preparation: ["Cozinhe beterraba até macia.", "Processe ou amasse com banana crua."], storage: "Geladeira 2 dias" },
        { id: "r9", title: "Papinha de Manga Amassada", age: "6M+", time: "2 min", yields: "1 porção", ingredients: ["1/2 manga palmer"], preparation: ["Raspe com colher ou amasse com garfo."], storage: "Imediato", tip: "Textura natural perfeita." },
        { id: "r10", title: "Smoothie de Melancia", age: "8M+", time: "3 min", yields: "1 copo", ingredients: ["1 fatia melancia sem sementes"], preparation: ["Retire sementes.", "Bata liquidificador 10seg.", "Não coar."], storage: "Imediato", tip: "Refrescante." }
      ]
    },
    {
      id: "cat2",
      title: "9-12 Meses: Novas Texturas",
      description: "Finger foods e texturas mais firmes. Início da mastigação.",
      recipes: [
        { id: "r11", title: "Bolinho de Banana Sem Açúcar", age: "9M+", time: "20 min", yields: "6 unid", ingredients: ["2 bananas", "1 ovo", "3 colheres aveia", "Canela"], preparation: ["Amasse bananas.", "Misture tudo.", "Forme bolinhas.", "Asse 180C 15min."], storage: "Congelável", allergens: ["Ovo", "Glúten (Aveia)"] },
        { id: "r12", title: "Panqueca de Aveia e Maçã", age: "9M+", time: "15 min", yields: "2 unid", ingredients: ["1 maçã ralada", "2 ovos", "4 colheres aveia"], preparation: ["Misture tudo.", "Coloque colheradas frigideira untada.", "Doure lados."], storage: "Imediato", allergens: ["Ovo", "Glúten"] },
        { id: "r13", title: "Papinha de Pêra com Aveia", age: "9M+", time: "5 min", yields: "1 porção", ingredients: ["1 pera ralada", "1 colher farelo aveia"], preparation: ["Rale pera ralo grosso.", "Misture aveia para dar textura."], storage: "Imediato", allergens: ["Glúten"] },
        { id: "r14", title: "Mini Pão de Batata Doce", age: "9M+", time: "30 min", yields: "10 unid", ingredients: ["1 xíc batata doce cozida", "1 xíc polvilho doce", "1 colher azeite", "1 ovo"], preparation: ["Misture até soltar mão.", "Bolinhas.", "Asse 180C 20min."], storage: "Imediato", allergens: ["Ovo"] },
        { id: "r15", title: "Bolinha de Tapioca e Banana", age: "9M+", time: "20 min", yields: "8 unid", ingredients: ["1 banana amassada", "3 colheres goma tapioca"], preparation: ["Misture panela fogo baixo até virar massa.", "Esfrie, faça bolinhas."], storage: "Imediato" },
        { id: "r16", title: "Purê Grão-de-Bico com Cenoura", age: "9M+", time: "10 min", yields: "2 porções", ingredients: ["1 xíc grão-de-bico cozido", "1/2 cenoura cozida"], preparation: ["Retire peles grão.", "Processe com cenoura e fio azeite."], storage: "Geladeira 3 dias" },
        { id: "r17", title: "Panquequinha de Abóbora", age: "9M+", time: "15 min", yields: "4 unid", ingredients: ["2 colheres purê abóbora", "1 ovo", "2 colheres farinha aveia"], preparation: ["Misture.", "Frite frigideira untada fogo baixo."], storage: "Imediato", allergens: ["Ovo", "Glúten"] },
        { id: "r18", title: "Papa de Quinoa com Frutas", age: "9M+", time: "20 min", yields: "2 porções", ingredients: ["2 colheres quinoa flocos", "100ml leite coco", "Manga picada"], preparation: ["Cozinhe quinoa no leite coco até engrossar.", "Sirva com manga."], storage: "Imediato" },
        { id: "r19", title: "Bolinho de Maçã Assado", age: "9M+", time: "30 min", yields: "4 unid", ingredients: ["1 maçã picada", "1 ovo", "1/2 xíc farinha aveia", "Fermento"], preparation: ["Misture secos.", "Add ovo e maçã.", "Asse forminhas 180C 20min."], storage: "Congela 30d", allergens: ["Ovo", "Glúten"] },
        { id: "r20", title: "Biscoitinho de Batata Doce", age: "9M+", time: "25 min", yields: "10 unid", ingredients: ["100g batata doce", "1 ovo", "3 colheres farinha aveia"], preparation: ["Amasse batata, misture resto.", "Forme discos.", "Asse 180C 15min."], storage: "Pote 5 dias", allergens: ["Ovo", "Glúten"] }
      ]
    },
    {
      id: "cat3",
      title: "12-18 Meses: Exploradores",
      description: "Sabores mais apurados, pequenas pitadas de sal (opcional).",
      recipes: [
        { id: "r21", title: "Muffin de Cenoura e Coco", age: "12M+", time: "30 min", yields: "6 unid", ingredients: ["1 cenoura ralada", "2 ovos", "4 colheres farinha integral", "3 colheres coco", "Óleo", "Fermento"], preparation: ["Bata líquidos e cenoura.", "Misture secos.", "Asse 180C 20min."], storage: "Congela", allergens: ["Ovo", "Glúten"] },
        { id: "r22", title: "Palitinhos de Queijo Assados", age: "12M+", time: "20 min", yields: "10 unid", ingredients: ["100g queijo minas ralado", "2 colheres farinha integral", "1 ovo"], preparation: ["Misture tudo.", "Forme palitos.", "Asse 180C 12min."], storage: "Imediato", allergens: ["Leite", "Ovo", "Glúten"] },
        { id: "r23", title: "Bolinho de Arroz com Legumes", age: "12M+", time: "20 min", yields: "8 unid", ingredients: ["1 xíc arroz cozido", "1 ovo", "Cenoura ralada", "Cheiro verde"], preparation: ["Misture tudo.", "Bolinhas.", "Asse 15min ou Airfryer 10min."], storage: "Congela", allergens: ["Ovo"] },
        { id: "r24", title: "Panqueca de Banana e Chia", age: "12M+", time: "15 min", yields: "2 unid", ingredients: ["1 banana", "1 ovo", "1 colher sobremesa chia"], preparation: ["Amasse banana, bata com ovo/chia.", "Frite frigideira."], storage: "Imediato", allergens: ["Ovo"] },
        { id: "r25", title: "Muffin de Maçã com Aveia", age: "12M+", time: "30 min", yields: "5 unid", ingredients: ["1 maçã picada", "1 ovo", "1/2 xíc aveia", "1 colher iogurte", "Fermento"], preparation: ["Misture tudo.", "Asse forminhas 180C 20min."], storage: "Congela", allergens: ["Ovo", "Leite", "Glúten"] },
        { id: "r26", title: "Bolinha de Coco com Tâmara", age: "12M+", time: "10 min", yields: "10 unid", ingredients: ["1 xíc tâmaras hidratadas", "1/2 xíc coco ralado"], preparation: ["Processe tâmaras virar pasta.", "Misture coco.", "Enrole."], storage: "Geladeira 5 dias" },
        { id: "r27", title: "Tortinha de Frango Desfiado", age: "12M+", time: "35 min", yields: "2 unid", ingredients: ["1 ovo", "2 colheres farinha aveia", "1 colher iogurte", "Frango desfiado"], preparation: ["Misture massa.", "Metade forminha, recheio, cobre.", "Asse 20min."], storage: "Congela", allergens: ["Ovo", "Leite", "Glúten"] },
        { id: "r28", title: "Palito de Cenoura Assada", age: "12M+", time: "25 min", yields: "Vários", ingredients: ["1 cenoura grande", "Azeite", "Orégano"], preparation: ["Corte palitos grossos.", "Tempere.", "Asse 200C 20min crocante."], storage: "Imediato" },
        { id: "r29", title: "Mini Pizza de Tapioca", age: "12M+", time: "10 min", yields: "1 unid", ingredients: ["Goma tapioca", "Queijo", "Tomate", "Orégano"], preparation: ["Faça disco frigideira.", "Recheie.", "Tampe para derreter."], storage: "Imediato", allergens: ["Leite"] },
        { id: "r30", title: "Pão de Banana Micro-ondas", age: "12M+", time: "5 min", yields: "1 unid", ingredients: ["1 banana", "1 ovo", "2 colheres aveia", "Fermento"], preparation: ["Misture caneca.", "Microondas 2min."], storage: "Imediato", allergens: ["Ovo", "Glúten"] }
      ]
    },
    {
      id: "cat4",
      title: "18-24 Meses: Sabores Complexos",
      description: "Praticamente a alimentação da família, sem açúcar.",
      recipes: [
        { id: "r31", title: "Cookie de Aveia e Pasta Amendoim", age: "18M+", time: "25 min", yields: "8 unid", ingredients: ["1 banana", "2 colheres pasta amendoim", "1 xíc aveia"], preparation: ["Misture tudo.", "Forme cookies.", "Asse 180C 15min."], storage: "Pote 5 dias", allergens: ["Amendoim", "Glúten"] },
        { id: "r32", title: "Brownie de Feijão Preto", age: "18M+", time: "35 min", yields: "1 tabuleiro", ingredients: ["1 xíc feijão preto cozido (sem água/tempero)", "2 ovos", "3 colheres cacau", "2 bananas", "Fermento"], preparation: ["Bata liquidificador.", "Asse 180C 25min."], storage: "Congela", allergens: ["Ovo"] },
        { id: "r33", title: "Muffin de Banana com Cacau", age: "18M+", time: "30 min", yields: "6 unid", ingredients: ["2 bananas", "2 ovos", "1/2 xíc farinha aveia", "2 colheres cacau", "Fermento"], preparation: ["Bata tudo.", "Forminhas.", "Asse 180C 20min."], storage: "Congela", allergens: ["Ovo", "Glúten"] },
        { id: "r34", title: "Bolinho de Beterraba Chocolate", age: "18M+", time: "35 min", yields: "10 unid", ingredients: ["1 beterraba cozida", "2 ovos", "1/2 xíc óleo", "1 xíc farinha integral", "2 colheres cacau"], preparation: ["Bata líquidos/beterraba.", "Misture secos.", "Asse 180C 25min."], storage: "Congela", allergens: ["Ovo", "Glúten"] },
        { id: "r35", title: "Panqueca de Espinafre (Hulk)", age: "18M+", time: "20 min", yields: "4 unid", ingredients: ["1 xíc espinafre", "1 ovo", "1/2 xíc leite", "1/2 xíc farinha trigo"], preparation: ["Bata liquidificador.", "Frite discos.", "Recheie frango/queijo."], storage: "Imediato", allergens: ["Ovo", "Leite", "Glúten"] },
        { id: "r36", title: "Cookie de Aveia e Banana Simples", age: "18M+", time: "20 min", yields: "10 unid", ingredients: ["2 bananas", "1 xíc aveia grossa", "Uva passa"], preparation: ["Misture.", "Colheradas assadeira.", "Asse 15min."], storage: "Pote 3 dias", allergens: ["Glúten"] },
        { id: "r37", title: "Bolinho de Carne Moída", age: "18M+", time: "25 min", yields: "12 unid", ingredients: ["200g carne moída", "1 ovo", "2 colheres aveia", "Temperos"], preparation: ["Misture mão.", "Bolinhas.", "Asse/Airfryer 15min."], storage: "Congela", allergens: ["Ovo", "Glúten"] },
        { id: "r38", title: "Wrap de Tapioca com Frango", age: "18M+", time: "15 min", yields: "1 unid", ingredients: ["2 colheres tapioca", "1 ovo", "Frango desfiado", "Cream cheese"], preparation: ["Bata ovo/tapioca.", "Disco frigideira.", "Recheie/enrole."], storage: "Imediato", allergens: ["Ovo", "Leite"] },
        { id: "r39", title: "Muffin de Cenoura com Passas", age: "18M+", time: "30 min", yields: "6 unid", ingredients: ["Receita base cenoura", "1/2 xíc uvas passas"], preparation: ["Adicione passas na massa para adoçar."], storage: "Congela", allergens: ["Ovo", "Glúten"] },
        { id: "r40", title: "Picolé de Frutas Cremoso", age: "18M+", time: "4h gelo", yields: "4 unid", ingredients: ["1 banana", "100g morango", "100ml iogurte natural"], preparation: ["Bata tudo.", "Forminhas picolé.", "Congele."], storage: "Congelador", allergens: ["Leite"] }
      ]
    },
    {
      id: "cat5",
      title: "Para Toda Família",
      description: "Receitas que rendem mais e agradam a todos.",
      recipes: [
        { id: "r41", title: "Pão de Queijo de Tapioca", age: "Família", time: "40 min", yields: "20 unid", ingredients: ["2 xíc polvilho azedo", "1 xíc leite", "3 colheres óleo", "1 ovo", "100g queijo"], preparation: ["Ferva leite/óleo, escalde polvilho.", "Esfrie, ponha ovo/queijo.", "Bolinhas.", "Asse 25min."], storage: "Congela cru", allergens: ["Leite", "Ovo"] },
        { id: "r42", title: "Bolo de Cenoura (Sem Açúcar)", age: "Família", time: "50 min", yields: "1 bolo", ingredients: ["2 cenouras", "3 ovos", "1/2 xíc óleo", "1 xíc tâmaras", "2 xíc farinha integral", "Fermento"], preparation: ["Bata líquidos/tâmaras.", "Misture farinha.", "Asse 180C 35min."], storage: "3 dias", allergens: ["Ovo", "Glúten"] },
        { id: "r43", title: "Cookie Chocolate com Tâmaras", age: "Família", time: "30 min", yields: "15 unid", ingredients: ["1 xíc pasta tâmaras", "1 ovo", "1/2 xíc óleo coco", "1 xíc farinha aveia", "2 col cacau"], preparation: ["Misture tudo.", "Bolinhas achatadas.", "Asse 15min."], storage: "Pote", allergens: ["Ovo", "Glúten"] },
        { id: "r44", title: "Muffin de Banana e Nozes", age: "Família", time: "30 min", yields: "12 unid", ingredients: ["3 bananas", "2 ovos", "1/3 xíc azeite", "1.5 xíc farinha aveia", "Nozes"], preparation: ["Misture.", "Asse 20min."], storage: "Congela", allergens: ["Ovo", "Glúten", "Nozes"] },
        { id: "r45", title: "Bolo de Maçã com Canela", age: "Família", time: "50 min", yields: "1 bolo", ingredients: ["3 maçãs", "3 ovos", "1 xíc passas", "2 xíc farinha aveia", "Canela"], preparation: ["Bata cascas/ovos/passas.", "Misture farinha/maçã picada.", "Asse 35min."], storage: "3 dias", allergens: ["Ovo", "Glúten"] },
        { id: "r46", title: "Brownie de Abacate", age: "Família", time: "35 min", yields: "1 tabuleiro", ingredients: ["1 abacate", "1/2 xíc cacau", "3 ovos", "1/2 xíc tâmaras", "Bicarbonato"], preparation: ["Processe tudo.", "Asse 180C 25min (cremoso)."], storage: "Geladeira", allergens: ["Ovo"] },
        { id: "r47", title: "Panqueca Americana Integral", age: "Família", time: "20 min", yields: "8 unid", ingredients: ["1 xíc leite", "1 ovo", "1 xíc farinha integral", "Fermento"], preparation: ["Misture (massa grossa).", "Frite discos.", "Sirva frutas."], storage: "Imediato", allergens: ["Leite", "Ovo", "Glúten"] },
        { id: "r48", title: "Barra de Cereal Caseira", age: "Família", time: "2h", yields: "8 barras", ingredients: ["2 xíc aveia", "1 xíc castanhas", "1/2 xíc pasta amendoim", "1/3 xíc mel"], preparation: ["Misture.", "Pressione forma.", "Geladeira 2h.", "Corte."], storage: "Geladeira 7d", allergens: ["Amendoim", "Glúten", "Mel (2a+)"] },
        { id: "r49", title: "Pão Integral Liquidificador", age: "Família", time: "1h", yields: "1 pão", ingredients: ["2 ovos", "1 xíc leite morno", "1/4 xíc azeite", "Fermento bio", "2 xíc farinha integral"], preparation: ["Bata líquidos/fermento.", "Misture farinha.", "Crescer 20min.", "Asse 30min."], storage: "3 dias", allergens: ["Ovo", "Leite", "Glúten"] },
        { id: "r50", title: "Granola Caseira", age: "Família", time: "30 min", yields: "1 pote", ingredients: ["2 xíc aveia", "1/2 xíc coco laminado", "Castanhas", "Óleo coco"], preparation: ["Misture.", "Asse 160C 20min (mexa a cada 5)."], storage: "Pote 15 dias", allergens: ["Glúten", "Castanhas"] }
      ]
    }
  ]
};

// --- MODULE 3: CARDÁPIOS SEMANAIS (UPDATED) ---
export const MODULE_3_CONTENT: BookContent = {
  introduction: `Chega de ficar horas olhando para a geladeira. Estes cardápios já estão prontos. Você só precisa seguir.
  
  Cada refeição foi pensada estrategicamente para equilibrar nutrição, praticidade no preparo e segurança alimentar. Eliminamos a adivinhação para que você possa focar no que realmente importa: o momento de conexão com seu filho.`,
  storageTips: [
    "DOMINGO DA PAZ: Cozinhe tudo de uma vez em 2h.",
    "Congelador Inteligente: Use potes de vidro ou plástico BPA Free. Etiquete com fita crepe.",
    "Descongelação: Desça o pote do freezer para geladeira na noite anterior (Melhor opção)."
  ],
  categories: [
    {
      id: "intro",
      title: "Guia & Planejamento",
      description: "Comece por aqui: Lista de compras, Dicas de Preparo e Nutrição.",
      recipes: [
        {
          id: "m3_i1", title: "Como Usar Este Guia", age: "Passo a Passo", time: "Leitura", yields: "-", storage: "-",
          ingredients: ["1. Escolha a semana", "2. Leia no domingo", "3. Faça lista", "4. Cozinhe e Congele"],
          preparation: ["Siga o ciclo de 6 semanas.", "Se o bebê não gostar de algo, substitua por similar.", "Prepare o grosso no fim de semana."],
          tip: "Relaxa, o trabalho pesado já foi feito!"
        },
        {
          id: "m3_i2", title: "Lista de Compras (Exemplo Sem 1)", age: "Planejamento", time: "Lista", yields: "-", storage: "-",
          ingredients: ["4 Maçãs", "3 Bananas Prata", "2 Pêras", "1 Abacate Peq", "1 Abóbora Cabotiá", "500g Cenoura", "4 Batatas", "Azeite Extra Virgem"],
          preparation: ["Verifique a despensa antes.", "Foco em produtos da estação reduz custo.", "Carnes/Frango para caldos se desejar."],
          tip: "Custo estimado varia por região."
        },
        {
          id: "m3_i3", title: "Nutrição Garantida", age: "Info", time: "Leitura", yields: "-", storage: "-",
          ingredients: ["Proteína (20-30%)", "Carboidrato (40-50%)", "Vegetais (30%)"],
          preparation: ["Ferro: Carnes escuras e feijões + Vitamina C.", "Cálcio: Iogurte, brócolis, folhas.", "Vitamina A: Vegetais laranjas."],
          tip: "Não precisa de suplemento além do prescrito pelo pediatra."
        },
        {
          id: "m3_i4", title: "Sinais para Mudar Textura", age: "Segurança", time: "Atenção", yields: "-", storage: "-",
          ingredients: ["Esvazia prato fácil", "Não tem ânsia (Gag)", "Mastigação lateral"],
          preparation: ["Se empurra com língua, espere.", "Gag Reflex (ânsia) é normal e proteção, não engasgo.", "Engasgo real é silencioso e roxo."],
          tip: "Avance com confiança."
        }
      ]
    },
    {
      id: "sem1",
      title: "Semana 1 - Iniciando (6 Meses)",
      description: "Textura cremosa/purê liso. 1 refeição por dia.",
      recipes: [
        { id: "s1_1", title: "Purê de Abóbora com Maçã", age: "6M", time: "20 min", yields: "1 porção", ingredients: ["150g abóbora cabotiá", "1 maçã pequena"], preparation: ["Descasque e corte cubos.", "Cozinhe vapor até amaciar.", "Amasse bem com garfo."], storage: "Congela 30d" },
        { id: "s1_2", title: "Purê de Banana (Cru)", age: "6M", time: "2 min", yields: "1 porção", ingredients: ["1 banana prata madura"], preparation: ["Descasque, tire fios.", "Amasse no prato até virar creme."], storage: "Imediato" },
        { id: "s1_3", title: "Purê de Cenoura com Batata", age: "6M", time: "20 min", yields: "1 porção", ingredients: ["1 cenoura média", "1 batata pequena", "Fio azeite"], preparation: ["Cozinhe bem macios.", "Amasse juntos.", "Fio de azeite no prato."], storage: "Congela 30d" },
        { id: "s1_4", title: "Purê de Maçã com Pêra", age: "6M", time: "15 min", yields: "1 porção", ingredients: ["1 maçã gala", "1 pera williams"], preparation: ["Corte cubos.", "Cozinhe com pouquinho de água até desmanchar.", "Amasse tudo."], storage: "Congela 30d" },
        { id: "s1_5", title: "Purê Abóbora com Mandioquinha", age: "6M", time: "20 min", yields: "1 porção", ingredients: ["100g abóbora", "1 mandioquinha"], preparation: ["Cozinhe vapor.", "Amasse bem (textura aveludada)."], storage: "Congela 30d" },
        { id: "s1_6", title: "Purê de Banana com Abacate", age: "6M", time: "2 min", yields: "1 porção", ingredients: ["1/2 banana", "Fatia abacate"], preparation: ["Amasse banana.", "Amasse abacate.", "Misture (gordura boa)."], storage: "Imediato" },
        { id: "s1_7", title: "Papinha Mista", age: "6M", time: "25 min", yields: "1 porção", ingredients: ["1/2 cenoura", "1/2 maçã", "1/2 banana"], preparation: ["Cozinhe cenoura e maçã.", "Amasse.", "Misture com banana crua amassada."], storage: "Congela (cozidos)" }
      ]
    },
    {
      id: "sem2",
      title: "Semana 2 - Evoluindo (7-8 Meses)",
      description: "Textura amassada com garfo (grumos). Introdução Proteínas.",
      recipes: [
        { id: "s2_1", title: "Frango com Batata e Brócolis", age: "7-8M", time: "25 min", yields: "2 porções", ingredients: ["1 filé frango", "1 batata", "Brócolis"], preparation: ["Cozinhe tudo junto.", "Desfie frango muito miúdo.", "Amasse legumes com garfo."], storage: "Congela" },
        { id: "s2_2", title: "Peixe com Cenoura e Chuchu", age: "7-8M", time: "20 min", yields: "2 porções", ingredients: ["Filé tilápia", "Cenoura", "Chuchu"], preparation: ["Cozinhe peixe e legumes.", "Desmanche peixe com dedos (segurança).", "Amasse legumes."], storage: "Congela" },
        { id: "s2_3", title: "Carne Moída com Abóbora", age: "7-8M", time: "25 min", yields: "2 porções", ingredients: ["100g patinho", "200g abóbora", "Couve picada"], preparation: ["Refogue carne soltinha.", "Cozinhe abóbora.", "Refogue couve.", "Misture tudo."], storage: "Congela" },
        { id: "s2_4", title: "Ovo Mexido com Mandioquinha", age: "7-8M", time: "15 min", yields: "1 porção", ingredients: ["1 ovo", "2 mandioquinhas", "Tomate picado"], preparation: ["Cozinhe/amasse mandioquinha.", "Faça ovo mexido bem cozido com tomate.", "Misture."], storage: "Imediato" },
        { id: "s2_5", title: "Feijão Amassado com Arroz", age: "7-8M", time: "30 min", yields: "2 porções", ingredients: ["Feijão cozido", "Arroz papa", "Couve-flor"], preparation: ["Amasse grãos feijão.", "Misture com arroz mole e couve-flor desmanchando."], storage: "Congela" },
        { id: "s2_6", title: "Lentilha com Batata Doce", age: "7-8M", time: "25 min", yields: "2 porções", ingredients: ["Lentilha cozida", "Batata doce"], preparation: ["Cozinhe lentilha bem macia.", "Misture com purê batata doce."], storage: "Congela" },
        { id: "s2_7", title: "Frango com Polenta Mole", age: "7-8M", time: "20 min", yields: "2 porções", ingredients: ["Fubá", "Frango desfiado", "Espinafre"], preparation: ["Faça polenta mole.", "Sirva com ragu de frango e espinafre."], storage: "Congela" }
      ]
    },
    {
      id: "sem3",
      title: "Semana 3 - Progredindo (9-11 Meses)",
      description: "Textura picada (pedacinhos). Estimular mastigação.",
      recipes: [
        { id: "s3_1", title: "Risoto de Frango com Legumes", age: "9M+", time: "25 min", yields: "2 porções", ingredients: ["Arroz", "Frango cubinhos", "Legumes ralados"], preparation: ["Refogue tudo.", "Cozinhe até arroz ficar úmido/macio."], storage: "Congela" },
        { id: "s3_2", title: "Macarrãozinho com Carne", age: "9M+", time: "20 min", yields: "2 porções", ingredients: ["Macarrão letrinha/argola", "Carne moída", "Molho tomate natural"], preparation: ["Cozinhe massa bem mole.", "Misture ao molho com carne."], storage: "Congela" },
        { id: "s3_3", title: "Peixe Desfiado Purê Rústico", age: "9M+", time: "25 min", yields: "2 porções", ingredients: ["Peixe branco", "Mandioca ou Batata"], preparation: ["Asse peixe/desfie.", "Purê com pedacinhos (não liso)."], storage: "Congela" },
        { id: "s3_4", title: "Omelete de Forno Legumes", age: "9M+", time: "20 min", yields: "2 porções", ingredients: ["2 ovos", "Cenoura ralada", "Brócolis picado"], preparation: ["Bata e asse em forminhas.", "Corte em cubos p/ servir."], storage: "Geladeira" },
        { id: "s3_5", title: "Carne de Panela Desfiada", age: "9M+", time: "40 min", yields: "Família", ingredients: ["Músculo/Acém", "Batata cubos"], preparation: ["Pressão até desmanchar.", "Desfie.", "Sirva com batatas cozidas no caldo."], storage: "Congela" },
        { id: "s3_6", title: "Ensopado Grão de Bico", age: "9M+", time: "30 min", yields: "2 porções", ingredients: ["Grão bico cozido (sem pele)", "Frango cubos", "Chuchu"], preparation: ["Refogue tudo até amaciar.", "Tire peles do grão para facilitar."], storage: "Congela" },
        { id: "s3_7", title: "Arroz de Brócolis c/ Frango", age: "9M+", time: "20 min", yields: "2 porções", ingredients: ["Arroz", "Brócolis picadinho", "Frango"], preparation: ["Cozinhe arroz com brócolis (desmancha).", "Sirva com frango picado."], storage: "Congela" }
      ]
    },
    {
      id: "sem4",
      title: "Semana 4 - Independência (12-18 Meses)",
      description: "Pedaços moles (Finger Food). Prato feito.",
      recipes: [
        { id: "s4_1", title: "Cubos de Frango com Purê", age: "12M+", time: "25 min", yields: "Prato", ingredients: ["Peito frango", "Batatas", "Leite"], preparation: ["Corte frango cubos 2cm, refogue.", "Sirva com purê liso (contraste)."], storage: "Congela" },
        { id: "s4_2", title: "Mini Almôndegas de Carne", age: "12M+", time: "30 min", yields: "Vários", ingredients: ["Carne moída", "Aveia", "Temperos"], preparation: ["Faça bolinhas tamanho uva.", "Cozinhe no molho ou asse."], storage: "Congela" },
        { id: "s4_3", title: "Filé de Tilápia Assado", age: "12M+", time: "20 min", yields: "Prato", ingredients: ["Tilápia", "Cenoura palito", "Abobrinha"], preparation: ["Tempere.", "Asse no papel alumínio (papillote) com legumes."], storage: "Imediato" },
        { id: "s4_4", title: "Panqueca Verde (Espinafre)", age: "12M+", time: "20 min", yields: "Panquecas", ingredients: ["Ovo", "Farinha", "Leite", "Espinafre"], preparation: ["Bata massa.", "Frite discos.", "Recheie carne/frango.", "Corte rodelas."], storage: "Congela" },
        { id: "s4_5", title: "Muffin Salgado de Legumes", age: "12M+", time: "25 min", yields: "6 muffins", ingredients: ["Ovo", "Farinha", "Legumes ralados", "Queijo"], preparation: ["Misture, asse.", "Fácil de pegar com a mão."], storage: "Congela" },
        { id: "s4_6", title: "Strogonoff Baby", age: "12M+", time: "20 min", yields: "Prato", ingredients: ["Frango cubos", "Molho tomate", "Iogurte natural"], preparation: ["Refogue frango.", "Add molho.", "Desligue e ponha iogurte (creme)."], storage: "Imediato" },
        { id: "s4_7", title: "Macarrão à Bolonhesa", age: "12M+", time: "15 min", yields: "Prato", ingredients: ["Fusilli (parafuso)", "Carne moída", "Cenoura ralada"], preparation: ["Massa parafuso é fácil de pegar.", "Molho rico em carne e legume."], storage: "Congela" }
      ]
    },
    {
      id: "sem5",
      title: "Semana 5 - Quase Normal (18-24 Meses)",
      description: "Comida da família adaptada (pouco sal). Talheres.",
      recipes: [
        { id: "s5_1", title: "Prato Feito Brasileiro", age: "18M+", time: "30 min", yields: "Família", ingredients: ["Arroz", "Feijão", "Carne moída", "Brócolis"], preparation: ["O clássico.", "Separe do bebê antes de salgar muito."], storage: "Congela" },
        { id: "s5_2", title: "Escondidinho de Frango", age: "18M+", time: "40 min", yields: "Travessa", ingredients: ["Frango desfiado", "Batata doce", "Queijo"], preparation: ["Refogue frango.", "Cubra com purê.", "Gratine."], storage: "Congela" },
        { id: "s5_3", title: "Peixe ao Molho Tomate", age: "18M+", time: "25 min", yields: "Família", ingredients: ["Postas peixe", "Molho tomate", "Arroz"], preparation: ["Cozinhe peixe no molho.", "Sirva sobre arroz (umedece)."], storage: "Congela" },
        { id: "s5_4", title: "Frango Xadrez (Baby)", age: "18M+", time: "25 min", yields: "Família", ingredients: ["Frango cubos", "Pimentão", "Cebola", "Pouco shoyu"], preparation: ["Refogue tudo.", "Engrosse caldo com amido.", "Cuidado com sódio."], storage: "Congela" },
        { id: "s5_5", title: "Carne Panela com Mandioca", age: "18M+", time: "45 min", yields: "Família", ingredients: ["Carne", "Mandioca"], preparation: ["Cozinhe junto para pegar gosto.", "Corte mandioca pequena."], storage: "Congela" },
        { id: "s5_6", title: "Torta Liquidificador Legumes", age: "18M+", time: "40 min", yields: "Assadeira", ingredients: ["Massa base", "Ervilha/Milho/Tomate/Atum"], preparation: ["Bata massa.", "Misture recheio.", "Asse.", "Jantar prático."], storage: "Geladeira" },
        { id: "s5_7", title: "Sobrecoxa Assada c/ Batata", age: "18M+", time: "50 min", yields: "Família", ingredients: ["Sobrecoxa", "Batatas rústicas", "Alecrim"], preparation: ["Asse tudo junto.", "Tire pele frango p/ servir.", "Carne macia."], storage: "Imediato" }
      ]
    },
    {
      id: "sem6",
      title: "Semana 6 - Comida de Família (18-24 Meses)",
      description: "Integração total à mesa.",
      recipes: [
        { id: "s6_1", title: "Macarrão Brócolis e Frango", age: "18M+", time: "20 min", yields: "Família", ingredients: ["Massa", "Brócolis", "Frango", "Alho/Óleo"], preparation: ["Refogue alho.", "Misture tudo.", "Parmesão ralado."], storage: "Imediato" },
        { id: "s6_2", title: "Picadinho Carne com Legumes", age: "18M+", time: "30 min", yields: "Família", ingredients: ["Alcatra tirinhas", "Vagem", "Cenoura", "Chuchu"], preparation: ["Cozinhe carne com legumes até formar molho encorpado."], storage: "Congela" },
        { id: "s6_3", title: "Omelete Completo", age: "18M+", time: "15 min", yields: "Família", ingredients: ["Ovos", "Espinafre", "Tomate", "Queijo"], preparation: ["Frigideira, fogo baixo, tampado.", "Bem cozido por dentro."], storage: "Imediato" },
        { id: "s6_4", title: "Risoto Abóbora Carne Seca", age: "18M+", time: "40 min", yields: "Família", ingredients: ["Arroz arbóreo", "Purê abóbora", "Carne seca (dessalgada/desfiada)"], preparation: ["Cuidado com sal da carne seca (ferva 3x).", "Misture no risoto."], storage: "Imediato" },
        { id: "s6_5", title: "Sopa Feijão com Macarrão", age: "18M+", time: "20 min", yields: "Família", ingredients: ["Caldo feijão batido", "Macarrão conchinha", "Legumes"], preparation: ["Cozinhe massa no caldo.", "Nutritivo."], storage: "Congela" },
        { id: "s6_6", title: "Hambúrguer Caseiro Forno", age: "18M+", time: "25 min", yields: "Vários", ingredients: ["Carne moída", "Cebola", "Salsinha"], preparation: ["Modele.", "Asse.", "Sirva com purê e salada (sem pão ou com pão integral)."], storage: "Congela cru" },
        { id: "s6_7", title: "Peixe no Papillote (Variação)", age: "18M+", time: "25 min", yields: "Família", ingredients: ["Peixe", "Batata em rodelas", "Tomate cereja"], preparation: ["Cama de batatas.", "Peixe em cima.", "Fecha pacote.", "Asse."], storage: "Imediato" }
      ]
    }
  ]
};

// --- MODULE 4: RECUSA ALIMENTAR (UPDATED) ---
export const MODULE_4_CONTENT: BookContent = {
  introduction: `Se você está lendo isto, provavelmente já chorou porque seu bebê recusou a comida. Aquele momento em que o prato cheio volta para a pia intocado pode ser devastador.
  
  Você não está sozinha. E recusa alimentar é NORMAL. Vamos resolver isso juntas, passo a passo, sem julgamentos. Este módulo contém estratégias comprovadas cientificamente para transformar as refeições.`,
  storageTips: [
    "Recusa NÃO é pirraça. É parte do desenvolvimento.",
    "Bebês precisam de 10-15 exposições para aceitar um novo alimento.",
    "Não force a boca a abrir. Isso cria trauma."
  ],
  categories: [
    {
      id: "motivos",
      title: "Comece Aqui: Entenda os Motivos",
      description: "É ciência, não é pirraça. Descubra o que está acontecendo.",
      recipes: [
        { id: "m4_m1", title: "Motivos Biológicos", age: "Teoria", time: "Leitura", yields: "-", storage: "-", ingredients: ["Neofobia (Medo do novo)", "Dentição", "Saciedade"], preparation: ["O cérebro protege de 'venenos'.", "Pico de recusa: 18-24 meses.", "Respeite o corpo do bebê."], tip: "É passageiro." },
        { id: "m4_m2", title: "Motivos Ambientais", age: "Atenção", time: "Leitura", yields: "-", storage: "-", ingredients: ["Estresse", "Distração (Telas)", "Pressão"], preparation: ["Ambiente tenso corta o apetite (cortisol).", "Telas desconectam o bebê da comida."], tip: "Crie um ambiente de paz." },
        { id: "m4_m3", title: "Normal vs Preocupante", age: "Tabela", time: "Importante", yields: "-", storage: "-", ingredients: ["Normal: Rejeita alguns itens", "Preocupante: Rejeita TUDO"], preparation: ["Normal: Aceita 3-4 grupos, energia alta.", "Preocupante: Perda de peso, engasgo constante, vômito."], tip: "Na dúvida, pediatra." }
      ]
    },
    {
      id: "estrategias",
      title: "As 7 Estratégias de Ouro",
      description: "Técnicas práticas para reverter a recusa.",
      recipes: [
        { id: "m4_e1", title: "#1 Exposição Repetida", age: "A Melhor", time: "Ação", yields: "-", storage: "-", ingredients: ["10 a 15 tentativas", "Paciência"], preparation: ["Ofereça de novo após 3 dias.", "Mude a forma (cru, cozido, assado).", "Não force, só ponha no prato."], tip: "Familiaridade gera aceitação." },
        { id: "m4_e2", title: "#2 Modelagem (Comer Junto)", age: "Exemplo", time: "Ação", yields: "-", storage: "-", ingredients: ["Comer o mesmo alimento", "Sorrir", "Exagerar prazer"], preparation: ["Bebês imitam.", "Sente-se junto e coma brócolis sorrindo.", "Não mostre nojo."], tip: "Se você não come, ele não come." },
        { id: "m4_e3", title: "#3 Apresentação Criativa", age: "Visual", time: "5 min", yields: "-", storage: "-", ingredients: ["Cores", "Formas diferentes", "Prato separado"], preparation: ["Use cortadores de biscoito.", "Separe os alimentos (não misture tudo).", "Crie um prato colorido."], tip: "Comemos com os olhos." },
        { id: "m4_e4", title: "#4 Controle e Autonomia", age: "BLW", time: "Ação", yields: "-", storage: "-", ingredients: ["Deixar pegar com a mão", "Oferecer escolhas"], preparation: ["Não force a colher.", "Pergunte: 'Quer cenoura ou batata?'.", "Deixe ele se sujar."], tip: "Ele quer sentir que manda." },
        { id: "m4_e5", title: "#5 Misturar com Favoritos", age: "Ponte", time: "Preparo", yields: "-", storage: "-", ingredients: ["Alimento novo (10%)", "Alimento amado (90%)"], preparation: ["Misture um pouco de espinafre no purê de batata.", "Aumente a proporção aos poucos."], tip: "Associação positiva." },
        { id: "m4_e6", title: "#6 Ambiente Calmo", age: "Zen", time: "Rotina", yields: "-", storage: "-", ingredients: ["Sem telas", "Sem brinquedos", "Sem brigas"], preparation: ["Desligue a TV.", "Foque na comida e na conversa.", "Música calma ajuda."], tip: "Reduza a ansiedade." },
        { id: "m4_e7", title: "#7 Ajustar Textura", age: "Técnica", time: "Ajuste", yields: "-", storage: "-", ingredients: ["Voltar uma fase", "Teste do dedo"], preparation: ["Se recusa pedaços, volte para amassado.", "Se engasga, a textura está errada."], tip: "Não é retrocesso, é ajuste." }
      ]
    },
    {
      id: "erros",
      title: "Erros Fatais (Pare Agora)",
      description: "Atitudes que pioram a situação sem você perceber.",
      recipes: [
        { id: "m4_err1", title: "Pressão e Força", age: "Erro #1", time: "Pare", yields: "-", storage: "-", ingredients: ["'Abre a boca'", "'Só mais uma'"], preparation: ["Cria trauma e associação negativa.", "Respeite o 'não'."], tip: "Nunca force." },
        { id: "m4_err2", title: "Barganha e Chantagem", age: "Erro #2", time: "Pare", yields: "-", storage: "-", ingredients: ["'Se comer ganha doce'", "'Mamãe fica triste'"], preparation: ["Comida não é moeda de troca.", "Não use emoção para manipular."], tip: "Comer é necessidade fisiológica." },
        { id: "m4_err3", title: "Distração (Telas/Aviãozinho)", age: "Erro #3", time: "Pare", yields: "-", storage: "-", ingredients: ["Tablet na mesa", "Enganar para comer"], preparation: ["Criança come inconsciente.", "Não aprende a mastigar nem saciedade."], tip: "Foco pleno." }
      ]
    },
    {
      id: "plan",
      title: "Plano de Ação: 14 Dias",
      description: "Roteiro prático para reverter a recusa.",
      recipes: [
        { id: "m4_p1", title: "Dias 1-4: Observação e Limpeza", age: "Início", time: "4 dias", yields: "-", storage: "-", ingredients: ["Diário alimentar", "Zero telas", "Zero pressão"], preparation: ["Anote o que ele come.", "Pare de forçar IMEDIATAMENTE.", "Crie rotina de horários."], tip: "Limpe o terreno." },
        { id: "m4_p2", title: "Dias 5-9: Conexão e Modelo", age: "Meio", time: "5 dias", yields: "-", storage: "-", ingredients: ["Comer junto", "Brincar com comida"], preparation: ["Sente-se com ele.", "Deixe ele tocar e cheirar sem compromisso de comer.", "Sorria na mesa."], tip: "Torne a mesa segura." },
        { id: "m4_p3", title: "Dias 10-14: Exposição e Escolha", age: "Fim", time: "5 dias", yields: "-", storage: "-", ingredients: ["2 opções no prato", "Alimento rejeitado de volta"], preparation: ["Ofereça o 'inimigo' de forma diferente (ex: bolinho).", "Dê autonomia total."], tip: "Celebre pequenas vitórias." }
      ]
    },
    {
      id: "age",
      title: "Recusa Por Idade",
      description: "O que esperar e como agir em cada fase.",
      recipes: [
        { id: "m4_a1", title: "6-12 Meses: Adaptação", age: "Bebê", time: "-", yields: "-", storage: "-", ingredients: ["Estranham textura", "Reflexo de GAG"], preparation: ["Tenha paciência.", "Volte a textura se precisar.", "É tudo muito novo."], tip: "Não é manha." },
        { id: "m4_a2", title: "12-18 Meses: O Pico", age: "Difícil", time: "-", yields: "-", storage: "-", ingredients: ["Neofobia (medo)", "Autonomia"], preparation: ["Eles querem fazer sozinhos.", "Rejeitam o que amavam.", "Use a estratégia da Escolha."], tip: "Fase mais desafiadora." },
        { id: "m4_a3", title: "18-24 Meses +", age: "Criança", time: "-", yields: "-", storage: "-", ingredients: ["Seletividade", "Teste de limites"], preparation: ["Envolva no preparo (misturar, lavar).", "Mantenha a rotina firme."], tip: "Melhora com consistência." }
      ]
    },
    {
      id: "checklist",
      title: "Checklist & Dúvidas",
      description: "Ferramentas para acompanhar o progresso.",
      recipes: [
        { id: "m4_chk", title: "Sinais de Melhora", age: "Check", time: "-", yields: "-", storage: "-", ingredients: ["Toca no alimento", "Menos choro na mesa", "Aceita 1 novo por semana"], preparation: ["Se ele cheirou, é vitória.", "Se ele lambeu, é vitória.", "Se comeu um pedaço, é festa!"], tip: "Progresso, não perfeição." },
        { id: "m4_faq", title: "Dúvidas Frequentes", age: "FAQ", time: "-", yields: "-", storage: "-", ingredients: ["Suplementos?", "Substituir refeição?"], preparation: ["Suplemento só com pediatra.", "NUNCA substitua jantar por leite se recusou."], tip: "Não crie maus hábitos." }
      ]
    }
  ]
};

// --- MODULE 5: GUIA DE TEXTURAS (UPDATED) ---
export const MODULE_5_CONTENT: BookContent = {
  introduction: `A introdução alimentar é um dos marcos mais emocionantes, mas também gera ansiedade. "Será que ele vai engasgar?", "Será que está mole o suficiente?".
  
  As texturas não são apenas sobre engolir; são sobre ensinar a boca a trabalhar (mastigação e fala). Este guia elimina o "achismo" da sua cozinha com um roteiro seguro de 0 a 24 meses.`,
  storageTips: [
    "3 Regras de Ouro: Sempre Sentado (90º), Supervisão Constante, Evite Redondos Duros.",
    "Textura não é medo. Textura é progressão.",
    "A boca é um músculo que precisa ser treinado."
  ],
  categories: [
    {
      id: "intro",
      title: "Comece Aqui: Segurança",
      description: "O básico que toda mãe precisa saber antes da primeira colherada.",
      recipes: [
        { id: "m5_i1", title: "Por que Texturas Importam?", age: "Vital", time: "Leitura", yields: "-", storage: "-", ingredients: ["Desenvolvimento da Fala", "Fortalecimento da Mandíbula", "Aceitação de Sabores"], preparation: ["Se ficarmos só no líquido/pastoso, a boca fica 'preguiçosa'.", "Aumenta risco de engasgo tardio."], tip: "Textura é treino." },
        { id: "m5_i2", title: "3 Regras de Ouro", age: "Segurança", time: "Regra", yields: "-", storage: "-", ingredients: ["1. Sempre Sentado (90º)", "2. Supervisão Constante", "3. Evite Redondos Duros"], preparation: ["Nunca alimente reclinado.", "Nunca vire as costas.", "Corte uvas e tomates cereja."], tip: "Prevenção é tudo." },
        { id: "m5_i3", title: "O Que EVITAR (Risco)", age: "Perigo", time: "Atenção", yields: "-", storage: "-", ingredients: ["Pipoca", "Balas Duras", "Castanhas Inteiras", "Uva Inteira", "Salsicha em Rodelas"], preparation: ["Risco altíssimo de aspiração.", "Corte salsicha em 4 (palitos), nunca rodelas."], tip: "Até 4 anos, cuidado redobrado." }
      ]
    },
    {
      id: "6m",
      title: "6 Meses: Primeiros Passos",
      description: "Textura: Amassado Grosso (Papinha Principal).",
      recipes: [
        { id: "m5_6m1", title: "Textura Ideal: 6 Meses", age: "6 Meses", time: "Guia Visual", yields: "-", storage: "-", ingredients: ["Bem cozido", "Amassado com garfo", "Não líquido"], preparation: ["Deve cair da colher lentamente.", "Teste: Esmague com o polegar. Se desfazer fácil, tá ok."], tip: "Aposente o liquidificador." },
        { id: "m5_6m2", title: "Receita: Purê de Abóbora com Maçã", age: "6 Meses", time: "20 min", yields: "2 porções", ingredients: ["1 fatia abóbora cabotiá", "1/2 maçã sem casca"], preparation: ["Cozinhe no vapor até desmanchar.", "Amasse com garfo misturando as duas.", "Se precisar, use um pouco de água do cozimento."], tip: "Textura alaranjada com grumos macios.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "7-8m",
      title: "7-8 Meses: Evoluindo",
      description: "Textura: Grumos Macios (Amassado com Garfo).",
      recipes: [
        { id: "m5_7m1", title: "Textura Ideal: 7-8 Meses", age: "7-8 Meses", time: "Guia Visual", yields: "-", storage: "-", ingredients: ["Menos amassado", "Pedaços visíveis (0,5cm)"], preparation: ["Bebê começa a jogar comida para o lado (gengiva).", "Teste: Pressione com o garfo uma vez. Deve separar."], tip: "Não faça purê liso." },
        { id: "m5_7m2", title: "Receita: Frango com Batata Rústica", age: "7-8 Meses", time: "25 min", yields: "2 porções", ingredients: ["Frango desfiado", "Batata", "Cenoura"], preparation: ["Cozinhe bem.", "Amasse legumes deixando pedaços.", "Misture frango bem picadinho (não processado)."], tip: "Estimula a mastigação.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "9-11m",
      title: "9-11 Meses: O Grande Passo",
      description: "Textura: Picadinho (Cubos Pequenos).",
      recipes: [
        { id: "m5_9m1", title: "Textura Ideal: 9-11 Meses", age: "9-11 Meses", time: "Guia Visual", yields: "-", storage: "-", ingredients: ["Picado na faca", "Cubos de 0,5 a 1cm", "Movimento de pinça"], preparation: ["Pare de amassar.", "O bebê deve pegar com a mão.", "Teste: Esmagável com a língua no céu da boca."], tip: "Fase crítica para não ficar preguiçoso." },
        { id: "m5_9m2", title: "Receita: Risoto de Legumes (Adaptado)", age: "9-11 Meses", time: "30 min", yields: "2 porções", ingredients: ["Arroz bem cozido", "Carne moída", "Vagem picadinha"], preparation: ["Não bata nada.", "O arroz serve de 'liga'.", "O bebê sente os grãos inteiros."], tip: "Soltinho mas úmido.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "12-18m",
      title: "12-18 Meses: Autonomia",
      description: "Textura: Alimentos Inteiros / Pedaços Maiores.",
      recipes: [
        { id: "m5_12m1", title: "Textura Ideal: 12-18 Meses", age: "12M+", time: "Guia Visual", yields: "-", storage: "-", ingredients: ["Pedaços que a criança morde", "Texturas duplas (sopa c/ pedaços)"], preparation: ["Use talheres.", "Ofereça alimentos para segurar (Finger Foods).", "Carnes macias em pedaços."], tip: "Deixe tentar sozinho." },
        { id: "m5_12m2", title: "Receita: Frango Desfiado com Arroz", age: "12M+", time: "25 min", yields: "Prato", ingredients: ["Frango lascas maiores", "Arroz soltinho", "Brócolis 'arvorezinha'"], preparation: ["Separe os alimentos no prato.", "Brócolis inteiro (cozido) para morder.", "Frango em pedaços mastigáveis."], tip: "Visual colorido.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "18-24m",
      title: "18-24 Meses: Transição Final",
      description: "Textura: Comida da Família.",
      recipes: [
        { id: "m5_18m1", title: "Textura Ideal: 18-24 Meses", age: "18M+", time: "Guia Visual", yields: "-", storage: "-", ingredients: ["Tudo da família", "Crocantes", "Fibrosos"], preparation: ["Apenas adapte cortes perigosos (uva, salsicha).", "Evite excesso de sal/açúcar."], tip: "Integração total." },
        { id: "m5_18m2", title: "Receita: Almôndega ao Sugo", age: "18M+", time: "30 min", yields: "Vários", ingredients: ["Carne moída", "Aveia", "Molho tomate"], preparation: ["Faça bolinhas.", "Cozinhe no molho.", "Textura firme fora, macia dentro."], tip: "Ótimo para treinar garfo.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "safety",
      title: "Segurança & Engasgo",
      description: "Diferença vital entre GAG e Engasgo.",
      recipes: [
        { id: "m5_s1", title: "GAG Reflex (Normal)", age: "Proteção", time: "Observe", yields: "-", storage: "-", ingredients: ["Barulhento", "Vermelho", "Tosse", "Olhos lacrimejam"], preparation: ["O bebê devolve a comida.", "É proteção, não perigo.", "AÇÃO: Não intervenha. Mantenha a calma."], tip: "O GAG diminui com a prática." },
        { id: "m5_s2", title: "Engasgo (Perigo)", age: "Emergência", time: "Ação", yields: "-", storage: "-", ingredients: ["Silencioso", "Azul/Pálido", "Sem som/choro"], preparation: ["Bloqueio total da via aérea.", "AÇÃO: Manobra de Heimlich imediata. Ligue 192."], tip: "Faça um curso de primeiros socorros." }
      ]
    },
    {
      id: "errors",
      title: "Erros Comuns & FAQ",
      description: "O que não fazer e dúvidas frequentes.",
      recipes: [
        { id: "m5_e1", title: "Erro: Liquidificar Tudo", age: "Erro", time: "Evite", yields: "-", storage: "-", ingredients: ["Medo de engasgo", "Pressa"], preparation: ["Não ensina a mastigar.", "Causa recusa alimentar futura.", "CORREÇÃO: Use o garfo."], tip: "Doe o liquidificador." },
        { id: "m5_e2", title: "Erro: Pular Etapas", age: "Erro", time: "Evite", yields: "-", storage: "-", ingredients: ["Dar pedaço duro cedo demais"], preparation: ["Causa susto e engasgo.", "Siga a progressão: Amassado -> Picado -> Pedaço."], tip: "Respeite o tempo." },
        { id: "m5_faq1", title: "Posso dar comida congelada?", age: "FAQ", time: "Sim", yields: "-", storage: "-", ingredients: ["Prático", "Seguro"], preparation: ["Congele logo após preparo.", "Descongele na geladeira.", "Evite microondas (pontos quentes)."], tip: "Facilita a vida." }
      ]
    }
  ]
};

// --- MODULE 6: TABELA DE ALERGÊNICOS (UPDATED) ---

export const MODULE_6_CONTENT: BookContent = {
  introduction: "Alergênicos não são 'proibidos'. São alimentos que precisam de cuidado, carinho e observação. Este guia foi criado para substituir o medo pela informação.",
  storageTips: [
    "REGRA DE OURO: Um alimento novo por vez.",
    "Aguarde 3 a 5 dias entre novos alérgenos.",
    "Nunca ofereça no jantar (para observar reações)."
  ],
  categories: [
    {
      id: "conceitos",
      title: "Entenda Antes de Começar",
      description: "O básico sobre alergias e segurança.",
      recipes: [
        { id: "c1", title: "O Que São Alergênicos?", age: "Conceito", time: "Leitura", yields: "-", storage: "-", ingredients: ["Sistema Imune", "Proteínas"], preparation: ["O corpo identifica proteína como invasor.", "Não é culpa da mãe. Alergia envolve o sistema imune (risco de vida), Intolerância envolve o digestivo (desconforto)."], tip: "Informação é poder." },
        { id: "c2", title: "Top 8 Alergênicos", age: "Incidência", time: "Lista", yields: "-", storage: "-", ingredients: ["Amendoim", "Ovo", "Peixe", "Leite", "Trigo", "Soja", "Morango/Frutas Vermelhas", "Gergelim"], preparation: ["Estes 8 grupos são responsáveis por 90% das alergias.", "Foco neles."], tip: "Introduza cedo (janela imunológica)." }
      ]
    },
    {
      id: "regras",
      title: "Regras de Ouro & Segurança",
      description: "Protocolos essenciais para evitar problemas.",
      recipes: [
        { id: "r1", title: "A Regra dos 3 Dias", age: "Vital", time: "Protocolo", yields: "-", storage: "-", ingredients: ["1 Alimento Novo", "Manhã ou Almoço"], preparation: ["Escolha um. Ofereça de manhã. Observe por 2-4 horas.", "Aguarde 3 a 5 dias antes de introduzir outro novo.", "Se der reação, você sabe qual foi."], tip: "Nunca no jantar (sono esconde reação)." },
        { id: "r2", title: "Histórico Familiar", age: "Risco", time: "-", yields: "-", storage: "-", ingredients: ["Pais alérgicos = 60-80% risco"], preparation: ["Se houver histórico, introduza mais lentamente (espere 5-7 dias).", "Nunca introduza se o bebê estiver com eczema atacado."], tip: "Converse com o pediatra." }
      ]
    },
    {
      id: "alimentos",
      title: "Guia Prático: Alimento por Alimento",
      description: "Como preparar Amendoim, Ovo, Peixe, etc. com segurança.",
      recipes: [
        { id: "a1", title: "Amendoim e Castanhas", age: "6-12M (com cuidado)", time: "Risco Alto", yields: "-", storage: "-", ingredients: ["Pasta Integral", "Sem pedaços"], preparation: ["Dilua a pasta em água ou leite materno até virar um molho ralo.", "Misture na fruta.", "NUNCA inteiro (risco fatal de engasgo)."], tip: "Introdução oportuna pode prevenir alergia." },
        { id: "a2", title: "Ovos (Clara e Gema)", age: "Gema 6M+ / Clara 8M+", time: "Moderado", yields: "-", storage: "-", ingredients: ["Gema (Mais segura)", "Clara (Mais alergênica)"], preparation: ["Gema bem cozida (dura) amassada.", "Clara só depois de tolerar bem a gema.", "Nunca mole (salmonela)."], tip: "Rico em ferro." },
        { id: "a3", title: "Peixe", age: "8M+", time: "Moderado", yields: "-", storage: "-", ingredients: ["Peixe Branco (Tilápia)", "Sem Espinha"], preparation: ["Cozinhe muito bem no vapor/água.", "Desfie minunciosamente com as mãos (sentir espinhas).", "Misture no purê."], tip: "Evite peixe cru ou mariscos." },
        { id: "a4", title: "Leite de Vaca", age: "6M+ (Culinário)", time: "Risco Alto", yields: "-", storage: "-", ingredients: ["Como Ingrediente (Cozido)", "Bebida (Só 1 ano+)"], preparation: ["Antes de 1 ano: só em bolos/molhos cozidos (calor quebra proteína).", "Bebida pura: só após 1 ano."], tip: "Diferente de fórmula." },
        { id: "a5", title: "Trigo (Glúten)", age: "6-7M+", time: "Baixo", yields: "-", storage: "-", ingredients: ["Pão", "Macarrão"], preparation: ["Pedaço de pão para chupar.", "Macarrão bem cozido.", "Se houver histórico de doença celíaca, fale com médico."], tip: "Observe inchaço abdominal." },
        { id: "a6", title: "Morango e Frutas Vermelhas", age: "8-9M+", time: "Baixo", yields: "-", storage: "-", ingredients: ["Bem higienizado", "Amassado"], preparation: ["Vermelhidão ao redor da boca pode ser acidez, não alergia.", "Pode causar 'bolinhas' no tronco."], tip: "Prefira orgânicos." },
        { id: "a7", title: "Alergênicos Secundários", age: "Vários", time: "-", yields: "-", storage: "-", ingredients: ["Soja (Tofu)", "Kiwi", "Abacaxi", "Mel (PROIBIDO)"], preparation: ["Mel é proibido antes de 2 anos (Botulismo).", "Frutas ácidas podem assar a boca."], tip: "Cuidado com sementes." }
      ]
    },
    {
      id: "sintomas",
      title: "Identificando Reações (SOS)",
      description: "Saiba diferenciar leve de grave e agir rápido.",
      recipes: [
        { id: "s1", title: "Tabela de Sintomas", age: "Observar", time: "Imediato", yields: "-", storage: "-", ingredients: ["Leve: Coceira, Urticária local", "Grave: Inchaço língua, Rouquidão, Vômito jato"], preparation: ["Imediato (até 2h): Risco de anafilaxia.", "Tardio (até 48h): Diarreia, sangue, cólica."], tip: "Reação respiratória é gravíssima." },
        { id: "s2", title: "Plano de Ação", age: "Emergência", time: "Agora", yields: "-", storage: "-", ingredients: ["1. Mantenha a calma", "2. Retire o alimento", "3. Ligue 192 (se grave)"], preparation: ["Se vomitar, deite de lado.", "Não dê água se tiver dificuldade de respirar.", "Tire foto para o médico."], tip: "Tenha antialérgico em casa (se prescrito)." }
      ]
    },
    {
      id: "receitas",
      title: "Receitas de Teste (Dia 1)",
      description: "Receitas seguras do PDF para a primeira exposição.",
      recipes: [
        { id: "rec1", title: "Papinha Cremosa de Gema (Ovo)", age: "Teste", time: "15min", yields: "1 colher", ingredients: ["1 gema dura", "Azeite/Leite materno"], preparation: ["Cozinhe ovo 12min.", "Separe a gema.", "Amasse com azeite até virar pasta."], tip: "Teste ovo.", storage: "Imediato" },
        { id: "rec2", title: "Mingauzinho de Aveia e Trigo", age: "Teste", time: "10min", yields: "1 colher", ingredients: ["Aveia", "Farinha Trigo", "Água/Leite"], preparation: ["Cozinhe tudo até engrossar bem."], tip: "Teste glúten.", storage: "Imediato" },
        { id: "rec3", title: "Pasta de Banana e Amendoim", age: "Teste", time: "5min", yields: "Pontinha", ingredients: ["Banana", "Pasta Amendoim Integral"], preparation: ["Dilua pasta em água (molho ralo).", "Misture na banana amassada."], tip: "Teste amendoim.", storage: "Imediato" },
        { id: "rec4", title: "Escondidinho de Tilápia", age: "Teste", time: "20min", yields: "2 colheres", ingredients: ["30g Tilápia", "1 Batata"], preparation: ["Cozinhe e desfie o peixe com os dedos (sem espinha).", "Misture com purê de batata."], tip: "Teste peixe.", storage: "Congelador 30d" }
      ]
    },
    {
      id: "extra",
      title: "Ferramentas",
      description: "Checklist para garantir segurança.",
      recipes: [
        { id: "chk", title: "Checklist de Segurança", age: "Guia", time: "-", yields: "-", storage: "-", ingredients: ["Bebê saudável?", "É de manhã?", "Tenho 3 dias livre?", "Tenho médico salvo?"], preparation: ["Marque tudo antes de oferecer."], tip: "Segurança em primeiro lugar." }
      ]
    }
  ]
};

// Ranking System Constants (removido para limpeza, mas mantendo tipos se necessário)
export const LEVELS = [];
export const getLevelInfo = (points: number = 0) => ({ badge: "🌟", name: "Membro" });
export const ONLINE_USERS: User[] = [];
export const MOCK_LIVE_USERS: User[] = [];