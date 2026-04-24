import React, { useState } from 'react';
import Icon        from '../components/Icon';
import PageHeader  from '../components/PageHeader';
import BottomNav   from '../components/BottomNav';
import { useApp }           from '../context/AppContext';
import { WHATSAPP_NUMBER }  from '../data/constants';

const STATUS_CONFIG = {
  em_andamento: { label: 'Em andamento', cor: 'var(--gold)',       bg: 'rgba(245,200,66,.1)',  border: 'rgba(245,200,66,.3)', icon: 'loader-2'    },
  concluido:    { label: 'Pronto!',       cor: 'var(--green)',      bg: 'var(--green-dim)',     border: 'var(--green-border)', icon: 'check-circle' },
  aguardando:   { label: 'Aguardando',   cor: 'var(--text-muted)', bg: 'var(--surface-2)',     border: 'var(--border)',       icon: 'clock'        },
};

function Timeline({ etapas }) {
  return (
    <div style={{ marginTop: 16 }}>
      {etapas.map((etapa, i) => {
        const isLast    = i === etapas.length - 1;
        const isCurrent = etapa.concluida && (isLast || !etapas[i + 1]?.concluida);
        return (
          <div key={etapa.id} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', flexShrink: 0, zIndex: 1, background: etapa.concluida ? (isCurrent ? 'var(--gold)' : 'var(--green)') : 'var(--surface-3)', borderColor: etapa.concluida ? (isCurrent ? 'var(--gold)' : 'var(--green)') : 'var(--border)', boxShadow: isCurrent ? '0 0 12px rgba(245,200,66,.5)' : 'none', transition: 'all 0.3s' }}>
                {etapa.concluida ? (isCurrent ? <Icon name="loader-2" size={11} style={{ color: '#0a0a0a', animation: 'spin 1s linear infinite' }} /> : <Icon name="check" size={11} style={{ color: '#fff' }} />) : <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--border-light)', display: 'block' }} />}
              </div>
              {!isLast && <div style={{ width: 2, flex: 1, minHeight: 20, margin: '3px 0', background: (etapa.concluida && etapas[i + 1]?.concluida) ? 'var(--green)' : 'var(--border)', transition: 'background 0.4s' }} />}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : 14, paddingTop: 2 }}>
              <p style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, color: etapa.concluida ? (isCurrent ? 'var(--gold)' : 'var(--text)') : 'var(--text-dim)' }}>
                {etapa.label}{isCurrent && <span style={{ marginLeft: 8, fontSize: 10, color: 'rgba(245,200,66,.7)', fontWeight: 400 }}>• em progresso</span>}
              </p>
              {etapa.data && <p style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{etapa.data}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PedidoCard({ pedido, index, defaultOpen = false }) {
  const [aberto, setAberto] = useState(defaultOpen);
  const cfg = STATUS_CONFIG[pedido.status] ?? STATUS_CONFIG.aguardando;
  const abrirWpp = () => {
    const msg = `Olá! Gostaria de informações sobre o pedido ${pedido.numero} (${pedido.tenis}).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 16, border: `1px solid ${aberto ? 'var(--border-light)' : 'var(--border)'}`, overflow: 'hidden', animation: `fadeUp 0.3s ${index * 0.07}s ease both`, transition: 'border-color 0.2s' }}>
      <button onClick={() => setAberto(o => !o)} style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }} onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}>
        <span style={{ padding: '4px 10px', borderRadius: 99, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: cfg.cor, background: cfg.bg, border: `1px solid ${cfg.border}`, flexShrink: 0 }}>{cfg.label}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)' }}>{pedido.numero}</p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{pedido.tenis}</p>
        </div>
        <Icon name={aberto ? 'chevron-up' : 'chevron-down'} size={16} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
      </button>
      {aberto && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {(pedido.servicos ?? []).map(s => <span key={s} style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: 'var(--surface-3)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{s}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 4 }}>
            <div><p style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Entrada</p><p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>{pedido.dataPedido}</p></div>
            {pedido.previsao && <div><p style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Previsão</p><p style={{ fontSize: 13, fontWeight: 700, marginTop: 2, color: pedido.status === 'concluido' ? 'var(--green)' : 'var(--gold)' }}>{pedido.previsao}</p></div>}
          </div>
          {(pedido.etapas ?? []).length > 0 && <Timeline etapas={pedido.etapas} />}
          <button onClick={abrirWpp} style={{ marginTop: 12, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 16px', color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.18s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
            <Icon name="message-circle" size={14} style={{ color: 'var(--green)' }} /> Falar sobre este pedido
          </button>
        </div>
      )}
    </div>
  );
}

export default function MeusPedidosPage() {
  const { user, setPage } = useApp();
  const pedidos = user?.pedidosAtivos ?? [];
  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Meus Pedidos" back="perfil" />
      <div className="page-wrap">
        {pedidos.length === 0 ? (
          <div className="card anim-fade-in" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <Icon name="package" size={52} style={{ color: 'var(--text-dim)', opacity: 0.3, marginBottom: 16 }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Nenhum pedido ativo</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 20 }}>Quando você solicitar um serviço, o acompanhamento aparecerá aqui.</p>
            <button className="btn btn-gold" onClick={() => setPage('servicos')}><Icon name="list" size={14} /> Ver serviços</button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>{pedidos.length} {pedidos.length === 1 ? 'pedido' : 'pedidos'} · clique para ver detalhes</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {pedidos.map((pedido, i) => <PedidoCard key={pedido.id} pedido={pedido} index={i} defaultOpen={i === 0} />)}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
