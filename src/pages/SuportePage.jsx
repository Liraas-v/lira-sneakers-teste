import React, { useState } from 'react';
import Icon        from '../components/Icon';
import PageHeader  from '../components/PageHeader';
import BottomNav   from '../components/BottomNav';
import { useApp }                    from '../context/AppContext';
import { FAQ_ITEMS, WHATSAPP_NUMBER } from '../data/constants';

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 12, border: `1px solid ${open ? 'rgba(245,200,66,.3)' : 'var(--border)'}`, background: open ? 'rgba(245,200,66,.04)' : 'var(--surface)', transition: 'all 0.2s', animation: `fadeUp 0.3s ${index * 0.04}s ease both`, overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: open ? 'var(--gold)' : 'var(--text)', lineHeight: 1.4 }}>{item.pergunta}</span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} style={{ color: open ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0, marginTop: 2 }} />
      </button>
      {open && (
        <div style={{ padding: '0 18px 16px' }}>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.resposta}</p>
        </div>
      )}
    </div>
  );
}

export default function SuportePage() {
  const { user } = useApp();
  const abrirWhatsApp = (msg) => {
    const texto = msg || `Olá! Sou o(a) ${user?.nome ?? 'cliente'} e preciso de ajuda.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const CANAIS = [
    { icon: 'message-circle', titulo: 'WhatsApp', desc: 'Seg–Dom, 9h–18h · Resposta em até 1h', cor: 'var(--green)', bg: 'var(--green-dim)', border: 'var(--green-border)', msg: `Olá! Sou o(a) ${user?.nome ?? 'cliente'} e preciso de ajuda.` },
    { icon: 'instagram', titulo: 'Instagram', desc: '@lirasneakerslab · DMs abertas', cor: '#e1306c', bg: 'rgba(225,48,108,.08)', border: 'rgba(225,48,108,.25)', url: 'https://instagram.com/lirasneakers' },
    { icon: 'map-pin', titulo: 'Endereço', desc: 'Consultar localização via WhatsApp', cor: 'var(--gold)', bg: 'var(--gold-dim)', border: 'var(--gold-border)', msg: 'Olá! Gostaria de saber o endereço para deixar meu tênis.' },
  ];

  const MENSAGENS_RAPIDAS = [
    ['Orçamento',        `Olá! Gostaria de solicitar um orçamento.`],
    ['Status do pedido', `Olá! Sou o(a) ${user?.nome ?? 'cliente'} e gostaria de saber o status do meu pedido.`],
    ['Reclamação',       'Olá! Gostaria de relatar um problema com meu serviço.'],
    ['Elogio',           'Olá! Gostaria de deixar um elogio sobre o serviço recebido.'],
  ];

  const HORARIOS = [['Segunda a Sexta','8h às 18h'],['Sábado','8h às 18h'],['Domingo','8h às 12h']];

  return (
    <div style={{ paddingBottom: 80 }}>
      <PageHeader title="Suporte" back="perfil" />
      <div className="page-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 22, fontWeight: 900 }}>Perguntas Frequentes</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{FAQ_ITEMS.length} perguntas · clique para expandir</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FAQ_ITEMS.map((item, i) => <FaqItem key={item.id} item={item} index={i} />)}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 22, fontWeight: 900 }}>Falar Conosco</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Escolha o canal de sua preferência</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CANAIS.map((canal, i) => (
                <button key={canal.titulo} onClick={() => canal.url ? window.open(canal.url, '_blank') : abrirWhatsApp(canal.msg)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', background: canal.bg, border: `1px solid ${canal.border}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'transform 0.15s', animation: `fadeUp 0.3s ${i * 0.06}s ease both` }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                  <Icon name={canal.icon} size={22} style={{ color: canal.cor, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 900, color: canal.cor }}>{canal.titulo}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{canal.desc}</p>
                  </div>
                  <Icon name="external-link" size={14} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                </button>
              ))}
              <div className="card" style={{ padding: 18 }}>
                <p style={{ fontSize: 12, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Mensagem rápida</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {MENSAGENS_RAPIDAS.map(([label, msg]) => (
                    <button key={label} onClick={() => abrirWhatsApp(msg)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s', width: '100%', textAlign: 'left' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{label}</span>
                      <Icon name="chevron-right" size={14} style={{ color: 'var(--text-dim)' }} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Icon name="clock" size={14} style={{ color: 'var(--gold)' }} />
                  <p style={{ fontSize: 12, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Horário de atendimento</p>
                </div>
                {HORARIOS.map(([dia, hora]) => (
                  <div key={dia} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dia}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>{hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
