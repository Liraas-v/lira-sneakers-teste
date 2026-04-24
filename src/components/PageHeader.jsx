import React from 'react';
import Icon      from './Icon';
import { useApp } from '../context/AppContext';

export default function PageHeader({ title, back, subtitle, actions }) {
  const { setPage } = useApp();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {back && (
          <button onClick={() => setPage(back)} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 8px', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'border-color 0.18s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-border)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'} aria-label="Voltar">
            <Icon name="arrow-left" size={16} />
          </button>
        )}
        <div>
          <h1 className="bebas" style={{ fontSize: 26, letterSpacing: '0.08em', lineHeight: 1, color: 'var(--text)' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>}
        </div>
      </div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}
