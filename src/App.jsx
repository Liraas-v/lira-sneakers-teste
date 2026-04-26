import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Toast from "./components/Toast";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ServicosPage from "./pages/ServicosPage";
import CarrinhoPage from "./pages/CarrinhoPage";
import FidelidadePage from "./pages/FidelidadePage";
import PerfilPage from "./pages/PerfilPage";
import NotificacoesPage from "./pages/NotificacoesPage";
import SuportePage from "./pages/SuportePage";
import MeusPedidosPage from "./pages/MeusPedidosPage";
import AdminPage from "./pages/AdminPage";

const PAGES = {
  home: <HomePage />,
  servicos: <ServicosPage />,
  carrinho: <CarrinhoPage />,
  fidelidade: <FidelidadePage />,
  perfil: <PerfilPage />,
  notificacoes: <NotificacoesPage />,
  suporte: <SuportePage />,
  "meus-pedidos": <MeusPedidosPage />,
  admin: <AdminPage />,
};

function AppShell() {
  const { page, authUser, authLoading, setPage } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [page]);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <p
          className="bebas shimmer-text"
          style={{ fontSize: 36, letterSpacing: "0.15em" }}
        >
          LIRA SNEAKERS
        </p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  return (
    <div className="layout-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main role="main" style={{ flex: 1 }}>
          {PAGES[page] ?? <HomePage />}
        </main>
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
