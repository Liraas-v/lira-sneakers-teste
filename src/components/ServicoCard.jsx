import React from 'react';
import Icon       from './Icon';
import { useApp } from '../context/AppContext';

export default function ServicoCard({ servico, index }) {
  const { cart, handleAddToCart } = useApp();
  const qty = cart.filter(c => c.id === servico.id).length;
  return (
    <div className="anim-fade-up" style={{ animationDelay: `${index * 0.04}s`, background: 'var(--surface)', border: `1px solid ${qty > 0 ? 'var(--gold-border)' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center', transition: 'border-color 0.2s, box-shadow 0.2s' }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7 }}>{servico.categoria}</span>
        <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', margin: '2px 0 3px', lineHeight: 1.3 }}>{servico.titulo}</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{servico.desc}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
          <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: 14 }}>R$ {servico.preco},00<span style={{ color: 'var(--text-dim)', fontSize: 10, fontWeight: 400 }}>+</span></span>
          <span style={{ color: 'var(--text-dim)', fontSize: 10, fontWeight: 700 }}>+{servico.preco} pts</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {qty > 0 && <span style={{ fontSize: 9, fontWeight: 900, color: 'var(--gold)', background: 'var(--gold-dim)', padding: '2px 8px', borderRadius: 99 }}>{qty}×</span>}
        <button onClick={() => handleAddToCart(servico)} style={{ padding: 11, borderRadius: 10, background: qty > 0 ? 'var(--gold)' : 'var(--surface-3)', border: `1px solid ${qty > 0 ? 'var(--gold)' : 'var(--border)'}`, color: qty > 0 ? '#0a0a0a' : 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s' }} onMouseEnter={e => { if (qty === 0) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = '#0a0a0a'; }}} onMouseLeave={e => { if (qty === 0) { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--gold)'; }}} aria-label={`Adicionar ${servico.titulo}`}>
          <Icon name="plus" size={17} />
        </button>
      </div>
    </div>
  );
}
