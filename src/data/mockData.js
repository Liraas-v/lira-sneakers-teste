/**
 * src/data/mockData.js
 *
 * MELHORIA 10: Dados mock extraídos de lib/auth.js para responsabilidade correta.
 *
 * Antes: MOCK_USER vivia em src/lib/auth.js (arquivo de autenticação)
 *   junto com lógica de login → responsabilidade misturada.
 *
 * Depois: dados de seed ficam aqui, auth.js só lida com autenticação.
 *   Para banco real: este arquivo inteiro é deletado e substituído
 *   por chamadas ao Supabase em useAuth.js.
 */

export const MOCK_USER = {
  id:       'admin-mock-id',
  email:    'admin',
  nome:     'Administrador',
  telefone: '(11) 99999-9999',
  pontos:   750,

  notificacoes: [
    {
      id:     'n1',
      titulo: 'Bem-vindo ao Lira Sneakers! 👟',
      corpo:  'Sua conta foi criada com sucesso. Comece a acumular pontos agora!',
      tipo:   'conquista',
      lida:   false,
      data:   new Date().toLocaleDateString('pt-BR'),
    },
    {
      id:     'n2',
      titulo: '+70 pontos adicionados! 🎉',
      corpo:  'Você ganhou 70 pontos com seu pedido de R$ 70,00.',
      tipo:   'conquista',
      lida:   false,
      data:   new Date().toLocaleDateString('pt-BR'),
    },
  ],

  historico: [
    {
      id:           'h1',
      data:         '10/03/2025',
      servicos:     ['Limpeza Completa'],
      total:        70,
      pontosGanhos: 70,
    },
    {
      id:           'h2',
      data:         '25/03/2025',
      servicos:     ['Pintura Entressola', 'Impermeabilização'],
      total:        125,
      pontosGanhos: 125,
    },
  ],

  resgates: [],

  pedidosAtivos: [
    {
      id:         'p1',
      numero:     '#LS-0042',
      tenis:      'Nike Air Max 90 — Branco',
      servicos:   ['Limpeza Completa'],
      total:      70,
      status:     'em_andamento',
      dataPedido: '28/03/2025',
      previsao:   '02/04/2025',
      etapas: [
        { id: 'e1', label: 'Recebido',             concluida: true,  data: '28/03/2025', ordem: 1 },
        { id: 'e2', label: 'Em limpeza',            concluida: true,  data: '29/03/2025', ordem: 2 },
        { id: 'e3', label: 'Secando / finalizando', concluida: false, data: null,         ordem: 3 },
        { id: 'e4', label: 'Pronto para retirada',  concluida: false, data: null,         ordem: 4 },
      ],
    },
  ],
};

/** Dados de seed para novo cadastro (pontos zerados, sem histórico) */
export function buildNewUser({ nome, email, telefone }) {
  return {
    ...MOCK_USER,
    nome,
    email,
    telefone,
    pontos:   0,
    historico:     [],
    resgates:      [],
    pedidosAtivos: [],
    notificacoes: [
      {
        id:     `n-bv-${Date.now()}`,
        titulo: 'Bem-vindo ao Lira Sneakers! 👟',
        corpo:  'Sua conta foi criada com sucesso. Comece a acumular pontos agora!',
        tipo:   'conquista',
        lida:   false,
        data:   new Date().toLocaleDateString('pt-BR'),
      },
    ],
  };
}
