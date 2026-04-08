/**
 * src/App.jsx
 *
 * ITEM 1 — Roteamento público/privado.
 *
 * Antes: visitante não autenticado via direto para AuthPage (login obrigatório).
 * Depois:
 *   - Visitante não autenticado → LandingPage (pública, sem login)
 *   - Login acontece via modal sobreposto na própria landing
 *   - Após autenticação → shell completo com Sidebar + todas as páginas
 *   - Hash '#landing' força a landing mesmo logado (para testes/preview)
 *
 * Fluxo:
 *   / (sem hash)   → LandingPage se não logado | HomePage se logado
 *   /#home         → HomePage (exige login, redireciona para landing se não logado)
 *   /#servicos     → ServicosPage (exige login)
 *   ... etc
 */
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';

import Sidebar      from './components/Sidebar';
import TopBar       from './components/TopBar';
import Toast        from './components/Toast';
import LandingPage  from './pages/LandingPage';

import HomePage         from './pages/HomePage';
import ServicosPage     from './pages/ServicosPage';
import CarrinhoPage     from './pages/CarrinhoPage';
import FidelidadePage   from './pages/FidelidadePage';
import PerfilPage       from './pages/PerfilPage';
import NotificacoesPage from './pages/NotificacoesPage';
import SuportePage      from './pages/SuportePage';
import MeusPedidosPage  from './pages/MeusPedidosPage';

const PAGES = {
  home:           <HomePage />,
  servicos:       <ServicosPage />,
  carrinho:       <CarrinhoPage />,
  fidelidade:     <FidelidadePage />,
  perfil:         <PerfilPage />,
  notificacoes:   <NotificacoesPage />,
  suporte:        <SuportePage />,
  'meus-pedidos': <MeusPedidosPage />,
};

function AppShell() {
  const { page, authUser, authLoading, setPage } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fecha drawer mobile ao trocar de página
  useEffect(() => {
    setSidebarOpen(false);
  }, [page]);

  // Loading
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)',
      }}>
        <p className="bebas shimmer-text" style={{ fontSize: 36, letterSpacing: '0.15em' }}>
          LIRA SNEAKERS
        </p>
      </div>
    );
  }

  // Não autenticado → Landing pública
  if (!authUser) {
    return (
      <>
        <LandingPage />
        <Toast />
      </>
    );
  }

  // Autenticado → shell completo
  return (
    <div className="layout-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} />

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
