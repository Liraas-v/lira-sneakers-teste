// ── Regras de Fidelidade ──────────────────────────────────
export const POINTS_PER_REAL = 1;

export const TIERS = [
  {
    name: 'Bronze',
    min: 0,
    max: 399,
    icon: '🥉',
    color: '#cd7f32',
    perks: ['5% desconto na próxima limpeza'],
  },
  {
    name: 'Prata',
    min: 400,
    max: 799,
    icon: '🥈',
    color: '#c0c0c0',
    perks: ['10% desconto', 'Frete grátis (coleta)'],
  },
  {
    name: 'Ouro',
    min: 800,
    max: 1599,
    icon: '🥇',
    color: '#fbbf24',
    perks: ['15% desconto', 'Frete grátis', 'Prioridade no agendamento'],
  },
  {
    name: 'Diamante',
    min: 1600,
    max: Infinity,
    icon: '💎',
    color: '#a5f3fc',
    perks: ['20% desconto', 'Frete grátis', 'Atendimento VIP', 'Brinde mensal'],
  },
];

export const REWARDS = [
  { id: 'r1', name: 'Hidratação de Couro Grátis',  points: 200, icon: '🎁' },
  { id: 'r2', name: '10% OFF no próximo serviço',   points: 350, icon: '🏷️' },
  { id: 'r3', name: 'Kit Impermeabilização',         points: 400, icon: '🛡️' },
  { id: 'r4', name: 'Limpeza Completa Grátis',       points: 550, icon: '✨' },
];

export const SERVICOS = [
  { id: 1,  titulo: 'Limpeza Completa',        desc: 'Externa, interna, sola, palmilhas, cadarços e odores.', categoria: 'Limpeza',  preco: 70  },
  { id: 2,  titulo: 'Limpeza Premium (Grife)', desc: 'Cuidado especializado para itens de luxo.',             categoria: 'Limpeza',  preco: 100 },
  { id: 3,  titulo: 'Limpeza de Bonés',        desc: 'Higienização mantendo o formato original.',             categoria: 'Limpeza',  preco: 40  },
  { id: 4,  titulo: 'Pintura Entressola',      desc: 'Restauração da cor da midsole.',                        categoria: 'Pintura',  preco: 90  },
  { id: 5,  titulo: 'Pintura de Cabedal',      desc: 'Renovação completa da cor superior.',                   categoria: 'Pintura',  preco: 100 },
  { id: 6,  titulo: 'Restauração de Camurça',  desc: 'Recuperação de textura e cor.',                         categoria: 'Couro',    preco: 70  },
  { id: 7,  titulo: 'Hidratação de Camurça',   desc: 'Nutrição profunda para suede.',                         categoria: 'Couro',    preco: 50  },
  { id: 8,  titulo: 'Hidratação do Couro',     desc: 'Evita rachaduras e mantém brilho.',                     categoria: 'Couro',    preco: 30  },
  { id: 9,  titulo: 'Colagem',                 desc: 'Reparo estrutural com cola profissional.',              categoria: 'Reparo',   preco: 60  },
  { id: 10, titulo: 'Impermeabilização',       desc: 'Proteção contra líquidos e manchas.',                   categoria: 'Proteção', preco: 35  },
  { id: 11, titulo: 'Taxa de Urgência',        desc: 'Entrega prioritária (verificar disponibilidade).',      categoria: 'Extra',    preco: 30  },
];

export const FAQ_ITEMS = [
  { id: 'f1', pergunta: 'Quanto tempo leva a limpeza completa?',       resposta: 'A limpeza completa leva em média 3 a 5 dias úteis. Temos a opção de urgência com entrega em 24h mediante taxa adicional.' },
  { id: 'f2', pergunta: 'Vocês fazem coleta e entrega?',               resposta: 'Sim! Fazemos coleta e entrega para clientes Prata, Ouro e Diamante. Para clientes Bronze, a coleta tem um valor adicional.' },
  { id: 'f3', pergunta: 'Como funciona o programa de pontos?',         resposta: 'Você ganha 1 ponto por cada R$ 1 gasto. Os pontos podem ser trocados por serviços grátis, descontos e kits exclusivos.' },
  { id: 'f4', pergunta: 'Atendem tênis de grife e luxo?',              resposta: 'Com certeza! Temos um serviço especial "Limpeza Premium (Grife)" com cuidado especializado para Balenciaga, Yeezy, Louis Vuitton e outros.' },
  { id: 'f5', pergunta: 'Os valores mostrados no app são definitivos?', resposta: 'Os valores são estimativas a partir do serviço. O valor final é confirmado após avaliação presencial.' },
  { id: 'f6', pergunta: 'Posso acompanhar meu serviço em andamento?',  resposta: 'Sim! Na aba "Meus Pedidos" do perfil você vê em tempo real cada etapa do seu serviço.' },
];

export const NAV_ITEMS = [
  { id: 'home',       icon: 'home',          label: 'Início'   },
  { id: 'servicos',   icon: 'list',          label: 'Serviços' },
  { id: 'carrinho',   icon: 'shopping-cart', label: 'Orçamento'},
  { id: 'fidelidade', icon: 'award',         label: 'Pontos'   },
  { id: 'perfil',     icon: 'user',          label: 'Perfil'   },
];

export const WHATSAPP_NUMBER = '5511930733933';

// ── Prazo de entrega por serviço (item 3 — exibido nos cards) ──
export const PRAZOS = {
  'Limpeza Completa':        '3 a 5 dias úteis',
  'Limpeza Premium (Grife)': '5 a 7 dias úteis',
  'Limpeza de Bonés':        '2 a 3 dias úteis',
  'Pintura Entressola':      '5 a 7 dias úteis',
  'Pintura de Cabedal':      '7 a 10 dias úteis',
  'Restauração de Camurça':  '5 a 7 dias úteis',
  'Hidratação de Camurça':   '2 a 3 dias úteis',
  'Hidratação do Couro':     '2 a 3 dias úteis',
  'Colagem':                 '3 a 5 dias úteis',
  'Impermeabilização':       '1 a 2 dias úteis',
  'Taxa de Urgência':        '24 horas',
};

// ── Depoimentos reais (item 2 — landing page) ──────────────────
// Substitua por depoimentos reais dos seus clientes
export const DEPOIMENTOS = [
  {
    id: 'd1',
    nome: 'Lucas M.',
    cidade: 'São Paulo, SP',
    texto: 'Mandei meu Air Jordan 1 que estava todo manchado. Voltou como se fosse novo. Valeu cada centavo.',
    servico: 'Limpeza Completa',
    nota: 5,
    inicial: 'L',
  },
  {
    id: 'd2',
    nome: 'Fernanda R.',
    cidade: 'Santo André, SP',
    texto: 'Yeezy 350 com a entressola amarelada. Depois da pintura ficou perfeito. Atendimento rápido e muito cuidado.',
    servico: 'Pintura Entressola',
    nota: 5,
    inicial: 'F',
  },
  {
    id: 'd3',
    nome: 'Gabriel S.',
    cidade: 'São Bernardo, SP',
    texto: 'Impermeabilizei dois pares antes do inverno. Processo rápido, só 2 dias. Recomendo demais.',
    servico: 'Impermeabilização',
    nota: 5,
    inicial: 'G',
  },
  {
    id: 'd4',
    nome: 'Camila T.',
    cidade: 'São Paulo, SP',
    texto: 'Meu New Balance de camurça parecia perdido. A restauração salvou o tênis. Nota 10.',
    servico: 'Restauração de Camurça',
    nota: 5,
    inicial: 'C',
  },
];

// ── Localização e área de atendimento (item 3) ─────────────────
// Edite com os dados reais do seu negócio
export const LOCATION = {
  cidade:      'São Paulo',
  estado:      'SP',
  bairro:      'Vila Nova Cachoeirinha',
  descricao:   'Atendemos São Paulo e Regiões. Coleta e entrega disponível para clientes Ouro e Diamante.',
  coletaGratis:'Coleta grátis a partir do nível Ouro',
  raio:        'São Paulo e Regiões',
  horarios: [
    { dia: 'Segunda a Sexta', hora: '8h às 18h' },
    { dia: 'Sábado',          hora: '8h às 18h' },
    { dia: 'Domingo',         hora: '8h às 12h' },
  ],
  googleMaps: 'https://www.bing.com/maps/search?mepi=57%7E%7EEmbedded%7ELargeMapLink&ty=18&v=2&sV=1&qpvt=av+parada+pinto+737&FORM=MIRE&q=Av+Parada+Pinto%2C+737%2C+Cachoeirinha%2C+S%C3%A3o+Paulo+-+SP%2C+02611-000&ppois=-23.468914_-46.66318_Av+Parada+Pinto%2C+737%2C+Cachoeirinha%2C+S%C3%A3o+Paulo+-+SP%2C+02611-000_%7E&cp=-23.468914%7E-46.663180&lvl=11&style=r', // substitua pelo link real
};

// ── Números de impacto (landing page) ─────────────────────────
// Atualize com dados reais
export const NUMEROS = [
  { valor: '500+',  label: 'Pares restaurados'  },
  { valor: '4.9★',  label: 'Nota média'         },
  { valor: '3 dias', label: 'Prazo médio'        },
  { valor: '100%',  label: 'Satisfação garantida'},
];
