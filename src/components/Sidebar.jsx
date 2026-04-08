/**
 * src/components/Sidebar.jsx
 *
 * MELHORIA 6: Botões de navegação substituídos por <a href="#pagina">.
 *
 * Antes: <button onClick={() => setPage(id)}>
 *   → sem semântica de link, sem ctrl+click, sem acessibilidade de nav
 *
 * Depois: <a href={`#${id}`}>
 *   → ctrl+click abre em nova aba, screen readers anunciam como link,
 *     o hashchange listener no AppContext sincroniza o estado automaticamente,
 *     sem necessidade de chamar setPage() manualmente.
 *
 * onClick ainda fecha o drawer mobile (onClose) via preventDefault + setPage.
 */
import React from 'react';
import Icon       from './Icon';
import { useApp } from '../context/AppContext';
import { NAV_ITEMS } from '../data/constants';

const EXTRA_NAV = [
  { id: 'notificacoes', icon: 'bell',        label: 'Notificações' },
  { id: 'suporte',      icon: 'help-circle', label: 'Suporte'      },
];

// Estilos base de um item de navegação
const navItemBase = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '11px 12px', borderRadius: 10,
  border: '1px solid transparent',
  cursor: 'pointer', textAlign: 'left',
  width: '100%', transition: 'all 0.18s',
  textDecoration: 'none',
};

function NavItem({ id, icon, label, active, badge, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      style={{
        ...navItemBase,
        background: active ? 'var(--gold-dim)' : 'transparent',
        borderColor: active ? 'var(--gold-border)' : 'transparent',
        color: active ? 'var(--gold)' : 'var(--text-muted)',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-2)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <Icon
        name={icon}
        size={17}
        style={{ color: active ? 'var(--gold)' : 'var(--text-muted)', flexShrink: 0 }}
      />
      <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{label}</span>

      {badge > 0 && (
        <span style={{
          background: 'var(--gold)', color: '#0a0a0a',
          fontSize: 9, fontWeight: 900,
          padding: '1px 7px', borderRadius: 99,
          flexShrink: 0,
        }}>
          {badge}
        </span>
      )}
    </a>
  );
}

export default function Sidebar({ open, onClose }) {
  const { page, setPage, cart, user } = useApp();
  const naoLidas = (user?.notificacoes ?? []).filter(n => !n.lida).length;

  // Fecha o drawer mobile sem impedir a navegação por hash
  const handleNavClick = (id) => (e) => {
    e.preventDefault();       // impede o scroll padrão do <a href="#...">
    setPage(id);              // atualiza estado + hash
    onClose?.();              // fecha drawer mobile
  };

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`sidebar-overlay ${open ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${open ? 'open' : ''}`}
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Logo */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <img
            src="/logo.png"
            alt="Lira Sneakers"
            style={{
              width: 40, height: 40, borderRadius: 10,
              objectFit: 'cover', border: '1px solid var(--gold-border)',
            }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div>
            <p className="bebas" style={{ fontSize: 20, letterSpacing: '0.1em', lineHeight: 1 }}>
              <span style={{ color: '#fff' }}>LIRA </span>
              <span className="shimmer-text">SNEAKERS</span>
            </p>
            <p style={{ fontSize: 9, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>
              Sneaker Spa
            </p>
          </div>
        </div>

        {/* Nav principal */}
        <nav
          style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}
          aria-label="Navegação principal"
        >
          <p style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '8px 10px 6px' }}>
            Principal
          </p>

          {NAV_ITEMS.map(n => (
            <NavItem
              key={n.id}
              id={n.id}
              icon={n.icon}
              label={n.label}
              active={page === n.id}
              badge={
                n.id === 'carrinho'  ? cart.length :
                n.id === 'perfil'   ? naoLidas     : 0
              }
              onClick={handleNavClick(n.id)}
            />
          ))}

          <p style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '14px 10px 6px' }}>
            Mais
          </p>

          {EXTRA_NAV.map(n => (
            <NavItem
              key={n.id}
              id={n.id}
              icon={n.icon}
              label={n.label}
              active={page === n.id}
              badge={n.id === 'notificacoes' ? naoLidas : 0}
              onClick={handleNavClick(n.id)}
            />
          ))}
        </nav>

        {/* Usuário na base */}
        {user && (
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <img
              src="/logo.png"
              alt={user.nome}
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-border)', flexShrink: 0 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.nome}
              </p>
              <p style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>
                ⭐ {user.pontos} pts
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
