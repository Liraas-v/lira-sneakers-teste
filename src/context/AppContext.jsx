import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { POINTS_PER_REAL, WHATSAPP_NUMBER } from "../data/constants";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { useTier } from "../hooks/useTier";
import { useAuth } from "../hooks/useAuth";

const AppContext = createContext(null);

const VALID_PAGES = [
  "home",
  "servicos",
  "carrinho",
  "fidelidade",
  "perfil",
  "notificacoes",
  "suporte",
  "meus-pedidos",
  "admin",
];

function getHashPage() {
  const hash = window.location.hash.replace("#", "").trim();
  return VALID_PAGES.includes(hash) ? hash : "home";
}

export function AppProvider({ children }) {
  const [page, setPageState] = useState(getHashPage);

  const setPage = useCallback((p) => {
    window.location.hash = p;
    setPageState(p);
  }, []);

  useEffect(() => {
    const onHash = () => setPageState(getHashPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const {
    authUser,
    authError,
    setAuthError,
    loading: authLoading,
    login,
    cadastrar,
    logout,
    updateUser,
  } = useAuth();
  const user = authUser;
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart();
  const { toast, showToast } = useToast();
  const { tier, nextTier, progress } = useTier(user?.pontos ?? 0);

  const handleAddToCart = useCallback(
    (servico) => {
      addToCart(servico);
      showToast(`${servico.titulo} adicionado!`);
    },
    [addToCart, showToast],
  );

  const confirmarPedido = useCallback(async () => {
    if (!cart.length || !user) return;
    const pts = Math.floor(cartTotal * POINTS_PER_REAL);
    const msg = [
      "Olá Lira Sneakers! 👟🔥",
      "",
      "Gostaria de um orçamento:",
      ...cart.map((i) => `• ${i.titulo} — a partir de R$ ${i.preco},00`),
      "",
      `Estimativa: R$ ${cartTotal},00+`,
      "",
      "Aguardo retorno!",
    ].join("\n");
    const tab = window.open("", "_blank");
    tab.location = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    updateUser((u) => ({
      pontos: Math.max(0, u.pontos + pts),
      historico: [
        {
          id: `h-${Date.now()}`,
          data: new Date().toLocaleDateString("pt-BR"),
          servicos: cart.map((i) => i.titulo),
          total: cartTotal,
          pontosGanhos: pts,
        },
        ...u.historico,
      ],
      notificacoes: [
        {
          id: `n-${Date.now()}`,
          titulo: `+${pts} pontos adicionados! 🎉`,
          corpo: `Você ganhou ${pts} pontos com seu pedido de R$ ${cartTotal},00.`,
          tipo: "conquista",
          lida: false,
          data: new Date().toLocaleDateString("pt-BR"),
        },
        ...u.notificacoes,
      ],
    }));
    clearCart();
    showToast(`+${pts} pontos adicionados! 🎉`);
    setPage("fidelidade");
  }, [cart, cartTotal, user, clearCart, showToast, updateUser, setPage]);

  const resgatarRecompensa = useCallback(
    (recompensa) => {
      if (!user || user.pontos < recompensa.points) {
        showToast("Pontos insuficientes", "error");
        return;
      }
      updateUser((u) => ({
        pontos: Math.max(0, u.pontos - recompensa.points),
        resgates: [
          {
            id: `rg-${Date.now()}`,
            name: recompensa.name,
            icon: recompensa.icon,
            points: recompensa.points,
            data: new Date().toLocaleDateString("pt-BR"),
          },
          ...u.resgates,
        ],
        notificacoes: [
          {
            id: `n-${Date.now()}`,
            titulo: `${recompensa.icon} ${recompensa.name} resgatado!`,
            corpo: `Você usou ${recompensa.points} pontos.`,
            tipo: "conquista",
            lida: false,
            data: new Date().toLocaleDateString("pt-BR"),
          },
          ...u.notificacoes,
        ],
      }));
      showToast(`${recompensa.icon} ${recompensa.name} resgatado!`);
    },
    [user, showToast, updateUser],
  );

  const marcarNotificacaoLida = useCallback(
    (notifId) => {
      updateUser((u) => ({
        notificacoes: u.notificacoes.map((n) =>
          n.id === notifId ? { ...n, lida: true } : n,
        ),
      }));
    },
    [updateUser],
  );

  const marcarTodasLidas = useCallback(() => {
    updateUser((u) => ({
      notificacoes: u.notificacoes.map((n) => ({ ...n, lida: true })),
    }));
  }, [updateUser]);

  const handleLogout = useCallback(async () => {
    await logout();
    clearCart();
    window.location.hash = "";
    setPageState("home");
  }, [logout, clearCart]);

  const value = {
    authUser,
    authError,
    setAuthError,
    authLoading,
    login,
    cadastrar,
    handleLogout,
    page,
    setPage,
    user,
    cart,
    cartTotal,
    handleAddToCart,
    removeFromCart,
    clearCart,
    confirmarPedido,
    tier,
    nextTier,
    progress,
    resgatarRecompensa,
    marcarNotificacaoLida,
    marcarTodasLidas,
    toast,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de <AppProvider>");
  return ctx;
}
