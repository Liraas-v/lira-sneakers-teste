/**
 * src/context/AppContext.jsx
 *
 * MELHORIAS APLICADAS:
 *
 * [4] updateUser do useAuth substituiu todos os no-ops de reloadUser.
 *     Agora qualquer mutação de estado do usuário é refletida imediatamente.
 *
 * [1] marcarNotificacaoLida / marcarTodasLidas agora atualizam o array
 *     user.notificacoes em memória via updateUser — funcionam de verdade.
 *
 * [2] resgatarRecompensa agora registra o resgate em user.resgates E
 *     desconta os pontos em uma única operação atômica via updateUser,
 *     sem chamar addPontos separadamente (evitava o double-render).
 *
 * [3] confirmarPedido agora:
 *     a) Registra o pedido em user.historico com serviços, total e pts ganhos.
 *     b) Adiciona notificação de confirmação em user.notificacoes.
 *     c) Abre o WhatsApp via tab pré-aberta (antes do await) para evitar
 *        bloqueio de popup do browser — CORREÇÃO DO ITEM 7.
 *     Tudo em uma única chamada updateUser (atômica).
 *
 * [7] window.open movido para ANTES do await — evita bloqueio de popup.
 *     Browsers bloqueiam window.open chamado dentro de promise/async
 *     que não foi iniciada diretamente por interação do usuário.
 */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { POINTS_PER_REAL, WHATSAPP_NUMBER } from '../data/constants';
import { useCart }   from '../hooks/useCart';
import { useToast }  from '../hooks/useToast';
import { useTier }   from '../hooks/useTier';
import { useAuth }   from '../hooks/useAuth';

const AppContext = createContext(null);

// ── Hash routing ─────────────────────────────────────────────
const VALID_PAGES = ['home','servicos','carrinho','fidelidade','perfil','notificacoes','suporte','meus-pedidos'];

function getHashPage() {
  const hash = window.location.hash.replace('#', '').trim();
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export function AppProvider({ children }) {
  const [page, setPageState] = useState(getHashPage);

  const setPage = useCallback((p) => {
    window.location.hash = p;
    setPageState(p);
  }, []);

  useEffect(() => {
    const onHash = () => setPageState(getHashPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // ── Auth ─────────────────────────────────────────────────
  const {
    authUser, authError, setAuthError, loading: authLoading,
    login, cadastrar, logout, updateUser,
  } = useAuth();

  const user = authUser;

  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart();
  const { toast, showToast } = useToast();
  const { tier, nextTier, progress } = useTier(user?.pontos ?? 0);

  // ── Carrinho ─────────────────────────────────────────────
  const handleAddToCart = useCallback((servico) => {
    addToCart(servico);
    showToast(`${servico.titulo} adicionado!`);
  }, [addToCart, showToast]);

  // ── Confirmar pedido [CORREÇÕES 3 + 7] ───────────────────
  const confirmarPedido = useCallback(async () => {
    if (!cart.length || !user) return;

    const pts = Math.floor(cartTotal * POINTS_PER_REAL);

    // [7] Abre a aba ANTES do await para não ser bloqueado como popup
    const msg = [
      'Olá Lira Sneakers! 👟🔥',
      '',
      'Gostaria de um orçamento:',
      ...cart.map(i => `• ${i.titulo} — a partir de R$ ${i.preco},00`),
      '',
      `Estimativa: R$ ${cartTotal},00+`,
      '',
      'Aguardo retorno!',
    ].join('\n');
    const wppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    const tab = window.open('', '_blank'); // abre imediatamente na interação
    tab.location = wppUrl;                 // redireciona após montar a URL

    // [3] Atualização atômica: pontos + histórico + notificação
    const novoHistorico = {
      id:           `h-${Date.now()}`,
      data:         new Date().toLocaleDateString('pt-BR'),
      servicos:     cart.map(i => i.titulo),
      total:        cartTotal,
      pontosGanhos: pts,
    };
    const novaNotif = {
      id:     `n-${Date.now()}`,
      titulo: `+${pts} pontos adicionados! 🎉`,
      corpo:  `Você ganhou ${pts} pontos com seu pedido de R$ ${cartTotal},00.`,
      tipo:   'conquista',
      lida:   false,
      data:   new Date().toLocaleDateString('pt-BR'),
    };

    updateUser(u => ({
      pontos:       Math.max(0, u.pontos + pts),
      historico:    [novoHistorico, ...u.historico],
      notificacoes: [novaNotif,     ...u.notificacoes],
    }));

    clearCart();
    showToast(`+${pts} pontos adicionados! 🎉`);
    setPage('fidelidade');
  }, [cart, cartTotal, user, clearCart, showToast, updateUser, setPage]);

  // ── Resgatar recompensa [CORREÇÃO 2] ─────────────────────
  const resgatarRecompensa = useCallback((recompensa) => {
    if (!user || user.pontos < recompensa.points) {
      showToast('Pontos insuficientes', 'error');
      return;
    }

    const novoResgate = {
      id:     `rg-${Date.now()}`,
      name:   recompensa.name,
      icon:   recompensa.icon,
      points: recompensa.points,
      data:   new Date().toLocaleDateString('pt-BR'),
    };
    const novaNotif = {
      id:     `n-${Date.now()}`,
      titulo: `${recompensa.icon} ${recompensa.name} resgatado!`,
      corpo:  `Você usou ${recompensa.points} pontos para resgatar "${recompensa.name}".`,
      tipo:   'conquista',
      lida:   false,
      data:   new Date().toLocaleDateString('pt-BR'),
    };

    // Operação atômica: desconta pontos + registra resgate + notificação
    updateUser(u => ({
      pontos:       Math.max(0, u.pontos - recompensa.points),
      resgates:     [novoResgate, ...u.resgates],
      notificacoes: [novaNotif,   ...u.notificacoes],
    }));

    showToast(`${recompensa.icon} ${recompensa.name} resgatado!`);
  }, [user, showToast, updateUser]);

  // ── Notificações [CORREÇÃO 1] ────────────────────────────
  const marcarNotificacaoLida = useCallback((notifId) => {
    updateUser(u => ({
      notificacoes: u.notificacoes.map(n =>
        n.id === notifId ? { ...n, lida: true } : n
      ),
    }));
  }, [updateUser]);

  const marcarTodasLidas = useCallback(() => {
    updateUser(u => ({
      notificacoes: u.notificacoes.map(n => ({ ...n, lida: true })),
    }));
  }, [updateUser]);

  // ── Logout ────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    await logout();
    clearCart();
    window.location.hash = '';
    setPageState('home');
  }, [logout, clearCart]);

  const value = {
    authUser, authError, setAuthError, authLoading,
    login, cadastrar, handleLogout,
    page, setPage,
    user,
    cart, cartTotal,
    handleAddToCart, removeFromCart, clearCart, confirmarPedido,
    tier, nextTier, progress,
    resgatarRecompensa,
    marcarNotificacaoLida, marcarTodasLidas,
    toast, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return ctx;
}
