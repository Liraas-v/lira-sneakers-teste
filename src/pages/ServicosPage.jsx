import React, { useState } from 'react';
import ServicoCard from '../components/ServicoCard';
import PageHeader  from '../components/PageHeader';
import BottomNav   from '../components/BottomNav';
import { SERVICOS }   from '../data/constants';

const CATEGORIAS = ['Todos', ...new Set(SERVICOS.map(s => s.categoria))];

export default function ServicosPage() {
  const [filtro, setFiltro] = useState('Todos');
  const lista = filtro === 'Todos' ? SERVICOS : SERVICOS.filter(s => s.categoria === filtro);
  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Serviços" subtitle={`${SERVICOS.length} serviços disponíveis · 1 ponto por R$ 1 gasto`} />
      <div style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18 }}>💡</span>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>1 ponto por R$ 1 gasto · Troque pontos por descontos e brindes exclusivos</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {CATEGORIAS.map(c => {
          const count = c === 'Todos' ? SERVICOS.length : SERVICOS.filter(s => s.categoria === c).length;
          return (
            <button key={c} onClick={() => setFiltro(c)} style={{ padding: '7px 16px', borderRadius: 99, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.18s', background: filtro === c ? 'var(--gold)' : 'var(--surface)', color: filtro === c ? '#0a0a0a' : 'var(--text-muted)', border: `1px solid ${filtro === c ? 'var(--gold)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', gap: 6 }} onMouseEnter={e => { if (filtro !== c) e.currentTarget.style.borderColor = 'var(--gold-border)'; }} onMouseLeave={e => { if (filtro !== c) e.currentTarget.style.borderColor = 'var(--border)'; }}>
              {c}<span style={{ fontSize: 10, background: filtro === c ? 'rgba(0,0,0,0.15)' : 'var(--surface-3)', padding: '1px 6px', borderRadius: 99, color: filtro === c ? '#0a0a0a' : 'var(--text-dim)' }}>{count}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
        {lista.map((servico, i) => <ServicoCard key={servico.id} servico={servico} index={i} />)}
      </div>
      <BottomNav />
    </div>
  );
}
