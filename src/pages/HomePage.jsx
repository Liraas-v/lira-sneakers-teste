import React from 'react';
import TierCard    from '../components/TierCard';
import Icon        from '../components/Icon';
import PageHeader  from '../components/PageHeader';
import BottomNav   from '../components/BottomNav';
import { useApp }   from '../context/AppContext';
import { SERVICOS } from '../data/constants';

const CATEGORIAS = [
  { icon: 'droplets', label: 'Limpeza',  count: SERVICOS.filter(s => s.categoria === 'Limpeza').length },
  { icon: 'palette',  label: 'Pintura',  count: SERVICOS.filter(s => s.categoria === 'Pintura').length },
  { icon: 'layers',   label: 'Couro',    count: SERVICOS.filter(s => s.categoria === 'Couro').length },
  { icon: 'shield',   label: 'Proteção', count: SERVICOS.filter(s => s.categoria === 'Proteção').length },
];

export default function HomePage() {
  const { setPage, handleAddToCart, user } = useApp();
  return (
    <div style={{ paddingBottom: 80 }}>
      {user && (
        <div className="anim-fade-in" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 2 }}>Bem-vindo de volta 👋</p>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)' }}>Olá, <span style={{ color: 'var(--gold)' }}>{user.nome.split(' ')[0]}</span>!</h1>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage('servicos')}><Icon name="list" size={16} /> Ver serviços</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero */}
          <div className="anim-fade-up" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px 32px', background: 'radial-gradient(ellipse at 80% 50%, rgba(245,200,66,0.1) 0%, transparent 65%), var(--surface)', display: 'flex', alignItems: 'center', gap: 24, boxShadow: 'var(--shadow-gold)', position: 'relative', overflow: 'hidden' }}>
            <img src="/logo.png" alt="Lira Sneakers" className="anim-float" style={{ width: 90, height: 90, borderRadius: 20, objectFit: 'cover', border: '1px solid var(--gold-border)', flexShrink: 0 }} onError={e => { e.target.style.display = 'none'; }} />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>Sneaker Spa Profissional</p>
              <h2 className="bebas" style={{ fontSize: 52, lineHeight: 0.9, color: 'var(--text)' }}>THE<br /><span className="shimmer-text">BEST CARE</span></h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10, maxWidth: 280 }}>Restauração, limpeza e proteção para seus sneakers favoritos.</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button className="btn btn-gold" onClick={() => setPage('servicos')}><Icon name="list" size={16} /> Ver serviços</button>
                <button className="btn btn-ghost" onClick={() => setPage('fidelidade')}><Icon name="award" size={16} /> Programa Lira+</button>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div className="anim-fade-up-1">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 className="bebas" style={{ fontSize: 20, letterSpacing: '0.08em' }}>Categorias</h2>
              <button onClick={() => setPage('servicos')} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 12, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ver todos →</button>
            </div>
            <div className="grid-4">
              {CATEGORIAS.map(c => (
                <button key={c.label} onClick={() => setPage('servicos')} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.background = 'var(--gold-dim)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}>
                  <Icon name={c.icon} size={22} style={{ color: 'var(--gold)' }} />
                  <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{c.count} serviços</span>
                </button>
              ))}
            </div>
          </div>

          {/* Destaque */}
          <div className="anim-fade-up-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: 12, background: 'var(--gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>✨</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 900, fontSize: 13, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Mais Popular · Limpeza Completa</p>
              <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13, marginTop: 2 }}>A partir de R$ 70,00</p>
              <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>Externa, interna, sola, palmilhas e cadarços</p>
            </div>
            <button className="btn btn-gold" onClick={() => handleAddToCart(SERVICOS[0])} style={{ flexShrink: 0 }}><Icon name="plus" size={15} /> Adicionar</button>
          </div>
        </div>

        {/* Coluna direita */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <TierCard />
          <div className="card anim-fade-up-2">
            <p style={{ fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, color: 'var(--text)' }}>Como funciona</p>
            {[['1','Escolha serviços','Monte seu orçamento pelo site'],['2','Confirme via WhatsApp','Nossa equipe finaliza o valor'],['3','Ganhe pontos','1 ponto por R$ 1 gasto'],['4','Suba de nível','Desbloqueie benefícios exclusivos']].map(([n, titulo, desc]) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gold)', color: '#0a0a0a', fontWeight: 900, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 12, color: 'var(--text)' }}>{titulo}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
