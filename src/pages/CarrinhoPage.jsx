import React from 'react';
import Icon       from '../components/Icon';
import PageHeader from '../components/PageHeader';
import BottomNav  from '../components/BottomNav';
import { useApp }  from '../context/AppContext';

export default function CarrinhoPage() {
  const { cart, cartTotal, removeFromCart, clearCart, confirmarPedido, nextTier, user, setPage } = useApp();
  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Meu Orçamento" back="servicos" subtitle="Valores a partir de — confirmação via WhatsApp" />
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 64, opacity: 0.2 }}>🛒</div>
          <p style={{ fontWeight: 900, fontSize: 14, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Orçamento vazio</p>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', maxWidth: 280 }}>Adicione serviços para montar seu orçamento e enviá-lo via WhatsApp.</p>
          <button className="btn btn-gold" onClick={() => setPage('servicos')}><Icon name="list" size={16} /> Ver serviços</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700 }}>{cart.length} {cart.length === 1 ? 'serviço' : 'serviços'}</p>
              <button onClick={clearCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Limpar tudo</button>
            </div>
            {cart.map(item => (
              <div key={item.cartId} className="card anim-fade-up" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', textTransform: 'uppercase' }}>{item.titulo}</p>
                  <p style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13, marginTop: 2 }}>R$ {item.preco},00+</p>
                  <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>+{item.preco} pts</p>
                </div>
                <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', transition: 'all 0.18s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red-border)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }} aria-label={`Remover ${item.titulo}`}>
                  <Icon name="trash-2" size={15} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ position: 'sticky', top: 24 }}>
            <div className="card">
              <p style={{ fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Resumo</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimativa total</span>
                  <span style={{ fontWeight: 900 }}>R$ {cartTotal},00+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pontos a ganhar</span>
                  <span style={{ fontWeight: 900, color: 'var(--gold)' }}>+{cartTotal} pts</span>
                </div>
                {nextTier && (
                  <>
                    <div className="divider" />
                    <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                      {Math.max(0, nextTier.min - (user?.pontos ?? 0) - cartTotal) > 0
                        ? `Faltarão ${nextTier.min - (user?.pontos ?? 0) - cartTotal} pts para ${nextTier.icon} ${nextTier.name}`
                        : `🎉 Você alcançará ${nextTier.icon} ${nextTier.name}!`}
                    </p>
                  </>
                )}
              </div>
              <button className="btn btn-gold" onClick={confirmarPedido} style={{ width: '100%', fontSize: 14, padding: '14px 24px' }}>
                <Icon name="message-circle" size={18} /> Solicitar via WhatsApp
              </button>
              <p style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>O valor final é confirmado após avaliação. Nossa equipe responde em até 1h.</p>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
