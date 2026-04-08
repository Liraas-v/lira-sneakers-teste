import React from 'react';
import { useApp } from '../context/AppContext';

export default function TierCard() {
  const { tier, nextTier, progress, user, setPage } = useApp();

  return (
    <div
      className="card anim-fade-up-1"
      style={{
        background: `radial-gradient(ellipse at 0% 50%, ${tier.color}18 0%, transparent 60%), var(--surface)`,
        borderColor: tier.color + '30',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
            Nível atual
          </p>
          <p className="bebas" style={{ fontSize: 28, color: tier.color, lineHeight: 1 }}>
            {tier.icon} {tier.name}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
            Pontos
          </p>
          <p className="bebas" style={{ fontSize: 36, color: 'var(--gold)', lineHeight: 1 }}>
            {user?.pontos ?? 0}
          </p>
        </div>
      </div>

      {nextTier ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-dim)', fontWeight: 700, marginBottom: 6 }}>
            <span>{tier.icon} {tier.name}</span>
            <span>{nextTier.icon} {nextTier.name} ({nextTier.min} pts)</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>
            Faltam <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{nextTier.min - (user?.pontos ?? 0)} pts</span> para o próximo nível
          </p>
        </div>
      ) : (
        <p style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>💎 Nível máximo alcançado!</p>
      )}

      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tier.perks.map(perk => (
          <span
            key={perk}
            style={{
              fontSize: 10, fontWeight: 700,
              padding: '4px 10px', borderRadius: 99,
              border: `1px solid ${tier.color}40`,
              color: tier.color,
              background: tier.color + '10',
            }}
          >
            ✓ {perk}
          </span>
        ))}
      </div>

      <button
        onClick={() => setPage('fidelidade')}
        style={{
          marginTop: 16, background: 'none', border: 'none',
          color: 'var(--gold)', fontSize: 11, fontWeight: 900,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          cursor: 'pointer', padding: 0,
        }}
      >
        Ver programa completo →
      </button>
    </div>
  );
}
