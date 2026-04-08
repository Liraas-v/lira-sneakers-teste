/**
 * src/components/TopBar.jsx
 *
 * NOVO componente — header superior visível apenas no mobile (≤768px).
 * No desktop, o AppBar é substituído por um header inline em cada página.
 * Exibe: botão hamburger | título da página | ações contextuais (ex: carrinho).
 */
import React from 'react';
import Icon      from './Icon';
import { useApp } from '../context/AppContext';

const PAGE_TITLES = {
  home:          'Início',
  servicos:      'Serviços',
  carrinho:      'Meu Orçamento',
  fidelidade:    'Lira+',
  perfil:        'Perfil',
  notificacoes:  'Notificações',
  suporte:       'Suporte',
  'meus-pedidos':'Meus Pedidos',
};

export default function TopBar({ onMenuClick }) {
  const { page, setPage, cart } = useApp();

  return (
    <header className="top-bar">
      <button
        onClick={onMenuClick}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 6, display: 'flex' }}
        aria-label="Abrir menu"
      >
        <Icon name="menu" size={22} />
      </button>

      <p className="bebas" style={{ fontSize: 18, letterSpacing: '0.1em', color: 'var(--text)' }}>
        {PAGE_TITLES[page] ?? 'Lira Sneakers'}
      </p>

      {/* Ícone de carrinho no header mobile */}
      <button
        onClick={() => setPage('carrinho')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: cart.length > 0 ? 'var(--gold)' : 'var(--text-muted)',
          position: 'relative', padding: 6, display: 'flex',
        }}
        aria-label="Ver carrinho"
      >
        <Icon name="shopping-cart" size={20} />
        {cart.length > 0 && (
          <span style={{
            position: 'absolute', top: 0, right: 0,
            background: 'var(--gold)', color: '#0a0a0a',
            fontSize: 8, fontWeight: 900,
            width: 14, height: 14, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {cart.length}
          </span>
        )}
      </button>
    </header>
  );
}
