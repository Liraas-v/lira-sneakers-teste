import React from 'react';
import Icon          from './Icon';
import { useApp }    from '../context/AppContext';
import { NAV_ITEMS } from '../data/constants';

export default function BottomNav() {
  const { page, setPage, cart } = useApp();
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegação principal">
      {NAV_ITEMS.map(n => {
        const active   = page === n.id;
        const isCart   = n.id === 'carrinho';
        const hasItems = cart.length > 0;
        return (
          <button key={n.id} onClick={() => setPage(n.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: isCart ? 0 : 6, background: 'none', border: 'none', cursor: 'pointer', color: active ? 'var(--gold)' : 'var(--text-dim)', position: 'relative', minWidth: 0, transition: 'color 0.18s' }} aria-label={n.label} aria-current={active ? 'page' : undefined}>
            {isCart ? (
              <div style={{ padding: 12, marginTop: -24, borderRadius: '50%', background: hasItems ? 'var(--gold)' : 'var(--surface-3)', border: '3px solid var(--bg)', color: hasItems ? '#0a0a0a' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                <Icon name="shopping-cart" size={20} />
              </div>
            ) : (
              <Icon name={n.icon} size={19} />
            )}
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: isCart ? 2 : 0 }}>{n.label}</span>
            {isCart && hasItems && (
              <span style={{ position: 'absolute', top: -6, right: 'calc(50% - 18px)', background: 'var(--gold)', color: '#0a0a0a', fontSize: 8, fontWeight: 900, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
