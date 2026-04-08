/**
 * src/pages/LandingPage.jsx
 *
 * ITEM 1 — Landing page pública.
 * Visível sem login. Contém:
 *   - Navbar com logo + CTA de login
 *   - Hero com proposta de valor + CTA direto para WhatsApp
 *   - Números de impacto (pares, nota, prazo, satisfação)
 *   - Catálogo de serviços com preços e prazos (ITEM 3)
 *   - Seção "Antes e Depois" com placeholders de foto (ITEM 2)
 *   - Depoimentos reais de clientes (ITEM 2)
 *   - Localização e área de atendimento (ITEM 3)
 *   - Footer com links e WhatsApp
 *
 * Para adicionar fotos reais de antes/depois:
 *   Coloque arquivos em /public/antes-depois/ e atualize
 *   o array GALLERY_ITEMS abaixo com os paths corretos.
 */
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import {
  SERVICOS, PRAZOS, DEPOIMENTOS, LOCATION, NUMEROS,
  WHATSAPP_NUMBER,
} from '../data/constants';

// ── Galeria de antes/depois ────────────────────────────────────
// Substitua os objetos com paths reais quando tiver as fotos
// Ex: { antes: '/antes-depois/jordan-antes.jpg', depois: '/antes-depois/jordan-depois.jpg', label: 'Air Jordan 1' }
const GALLERY_ITEMS = [
  { label: 'Air Jordan 1',     servico: 'Limpeza Completa'   },
  { label: 'Yeezy 350',        servico: 'Pintura Entressola' },
  { label: 'New Balance 574',  servico: 'Restauração Camurça'},
  { label: 'Nike Air Max',     servico: 'Impermeabilização'  },
];

// ── Helpers ────────────────────────────────────────────────────
const wppUrl = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const abrirWpp = (msg) =>
  window.open(wppUrl(msg), '_blank');

// ── Sub-componentes ────────────────────────────────────────────

function Navbar({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'rgba(8,8,8,0.95)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/logo.png"
            alt="Lira Sneakers"
            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--gold-border)' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <span className="bebas" style={{ fontSize: 20, letterSpacing: '0.1em' }}>
            <span style={{ color: '#fff' }}>LIRA </span>
            <span className="shimmer-text">SNEAKERS</span>
          </span>
        </div>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="landing-nav-desktop">
          {[
            ['servicos-section',  'Serviços'],
            ['antes-depois',      'Antes & Depois'],
            ['depoimentos',       'Depoimentos'],
            ['localizacao',       'Localização'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'color 0.2s', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: '8px 16px' }}
            onClick={onLoginClick}
          >
            <Icon name="user" size={14} />
            Entrar
          </button>
          <button
            className="btn btn-gold"
            style={{ fontSize: 12, padding: '8px 16px' }}
            onClick={() => abrirWpp('Olá! Gostaria de solicitar um orçamento para o meu tênis.')}
          >
            <Icon name="message-circle" size={14} />
            Orçamento grátis
          </button>

          {/* Hamburger mobile */}
          <button
            className="landing-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4 }}
            aria-label="Menu"
          >
            <Icon name={menuOpen ? 'chevron-up' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {[
            ['servicos-section', 'Serviços'],
            ['antes-depois',     'Antes & Depois'],
            ['depoimentos',      'Depoimentos'],
            ['localizacao',      'Localização'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', textAlign: 'left',
                color: 'var(--text-muted)', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', padding: '10px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero({ onLoginClick }) {
  return (
    <section style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', alignItems: 'center',
      background: `
        radial-gradient(ellipse at 20% 60%, rgba(245,200,66,0.07) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 20%, rgba(245,200,66,0.04) 0%, transparent 50%),
        var(--bg)
      `,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decoração de fundo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(245,200,66,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px', width: '100%', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">

          {/* Texto */}
          <div>
            <div
              className="anim-fade-up"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                borderRadius: 99, padding: '6px 14px', marginBottom: 20,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
              <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Sneaker Spa Profissional · {LOCATION.cidade}, {LOCATION.estado}
              </span>
            </div>

            <h1
              className="bebas anim-fade-up-1"
              style={{ fontSize: 'clamp(52px, 8vw, 88px)', lineHeight: 0.88, letterSpacing: '0.02em', marginBottom: 20 }}
            >
              SEUS TÊNIS<br />
              <span className="shimmer-text">MERECEM</span><br />
              O MELHOR
            </h1>

            <p className="anim-fade-up-2" style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 440, marginBottom: 32 }}>
              Restauração, limpeza e proteção especializada para seus sneakers.
              Do básico ao luxo — tratamos cada par com o cuidado que ele merece.
            </p>

            <div className="anim-fade-up-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold"
                style={{ fontSize: 14, padding: '14px 28px' }}
                onClick={() => abrirWpp('Olá! Gostaria de solicitar um orçamento para o meu tênis.')}
              >
                <Icon name="message-circle" size={18} />
                Solicitar orçamento grátis
              </button>
              <button
                className="btn btn-ghost"
                style={{ fontSize: 14, padding: '14px 24px' }}
                onClick={onLoginClick}
              >
                <Icon name="award" size={18} />
                Programa de fidelidade
              </button>
            </div>

            <div className="anim-fade-up-4" style={{ display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
              {[
                ['check-circle', 'Orçamento sem compromisso'],
                ['check-circle', 'Coleta e entrega disponível'],
                ['check-circle', 'Garantia de satisfação'],
              ].map(([icon, txt]) => (
                <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name={icon} size={14} style={{ color: 'var(--green)' }} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual lado direito */}
          <div className="hero-visual" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Card principal de destaque */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 24, padding: 32,
              textAlign: 'center',
              boxShadow: 'var(--shadow-gold)',
              position: 'relative',
            }}>
              <img
                src="/logo.png"
                alt="Lira Sneakers"
                className="anim-float"
                style={{ width: 120, height: 120, borderRadius: 24, objectFit: 'cover', border: '2px solid var(--gold-border)', margin: '0 auto 16px' }}
                onError={e => { e.target.style.background = 'var(--surface-3)'; }}
              />
              <p className="bebas" style={{ fontSize: 28, letterSpacing: '0.08em', marginBottom: 4 }}>
                LIRA<span className="shimmer-text"> SNEAKERS</span>
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sneaker Spa Profissional</p>
            </div>

            {/* Cards de números */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {NUMEROS.map(({ valor, label }) => (
                <div
                  key={label}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: '16px 14px', textAlign: 'center',
                  }}
                >
                  <p className="bebas" style={{ fontSize: 28, color: 'var(--gold)', lineHeight: 1 }}>{valor}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecaoServicos({ onLoginClick }) {
  const [filtro, setFiltro] = useState('Todos');
  const categorias = ['Todos', ...new Set(SERVICOS.map(s => s.categoria))];
  const lista = filtro === 'Todos' ? SERVICOS : SERVICOS.filter(s => s.categoria === filtro);

  return (
    <section id="servicos-section" style={{ padding: '80px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Título */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
            O que fazemos
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '0.04em' }}>
            NOSSOS SERVIÇOS
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Preços a partir de — valor final confirmado após avaliação do estado do tênis.
          </p>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {categorias.map(c => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              style={{
                padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer',
                transition: 'all 0.18s', border: '1px solid',
                background: filtro === c ? 'var(--gold)' : 'transparent',
                borderColor: filtro === c ? 'var(--gold)' : 'var(--border)',
                color: filtro === c ? '#0a0a0a' : 'var(--text-muted)',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid de serviços */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 40 }}>
          {lista.map((s, i) => (
            <div
              key={s.id}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '20px 22px',
                transition: 'all 0.2s',
                animation: `fadeUp 0.3s ${i * 0.04}s ease both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{
                  fontSize: 9, fontWeight: 900, color: 'var(--gold)',
                  textTransform: 'uppercase', letterSpacing: '0.15em',
                  background: 'var(--gold-dim)', padding: '3px 8px',
                  borderRadius: 99, border: '1px solid var(--gold-border)',
                }}>
                  {s.categoria}
                </span>
              </div>

              <p style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', marginBottom: 6 }}>
                {s.titulo}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                {s.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)' }}>
                    R$ {s.preco},00<span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 400 }}>+</span>
                  </p>
                  {/* ITEM 3 — Prazo de entrega visível */}
                  {PRAZOS[s.titulo] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                      <Icon name="clock" size={11} style={{ color: 'var(--text-dim)' }} />
                      <span style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600 }}>
                        {PRAZOS[s.titulo]}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-gold"
                  style={{ fontSize: 11, padding: '8px 14px' }}
                  onClick={() => abrirWpp(`Olá! Gostaria de um orçamento para: ${s.titulo} (R$ ${s.preco},00+).`)}
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA fidelidade */}
        <div style={{
          background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
          borderRadius: 20, padding: '28px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: 'var(--gold)', marginBottom: 4 }}>
              ⭐ Programa Lira+ — Ganhe pontos em cada serviço
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              1 ponto por R$ 1 gasto. Acumule e resgate descontos, serviços grátis e muito mais.
            </p>
          </div>
          <button
            className="btn btn-gold"
            style={{ fontSize: 13, padding: '12px 24px', flexShrink: 0 }}
            onClick={onLoginClick}
          >
            <Icon name="award" size={16} />
            Criar conta grátis
          </button>
        </div>
      </div>
    </section>
  );
}

function SecaoAnteDepois() {
  return (
    <section id="antes-depois" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
            Resultados reais
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '0.04em' }}>
            ANTES & DEPOIS
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Cada par tem sua história. A nossa missão é escrever o próximo capítulo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 16, overflow: 'hidden',
                animation: `fadeUp 0.3s ${i * 0.07}s ease both`,
              }}
            >
              {/* Placeholder de foto — substitua por <img> quando tiver as fotos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 180 }}>
                {/* Antes */}
                <div style={{
                  background: 'var(--surface-3)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                  borderRight: '1px solid var(--border)',
                  position: 'relative',
                }}>
                  <Icon name="package" size={28} style={{ color: 'var(--text-dim)', opacity: 0.4 }} />
                  <span style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Antes
                  </span>
                  {/* Instrução para substituição */}
                  <span style={{
                    position: 'absolute', bottom: 6,
                    fontSize: 8, color: 'var(--text-dim)',
                    textAlign: 'center', padding: '0 6px', lineHeight: 1.3,
                  }}>
                    Adicione foto
                  </span>
                </div>
                {/* Depois */}
                <div style={{
                  background: 'rgba(245,200,66,0.04)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                  position: 'relative',
                }}>
                  <Icon name="award" size={28} style={{ color: 'var(--gold)', opacity: 0.5 }} />
                  <span style={{ fontSize: 9, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Depois
                  </span>
                  <span style={{
                    position: 'absolute', bottom: 6,
                    fontSize: 8, color: 'var(--text-dim)',
                    textAlign: 'center', padding: '0 6px', lineHeight: 1.3,
                  }}>
                    Adicione foto
                  </span>
                </div>
              </div>

              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 13, fontWeight: 900, color: 'var(--text)', marginBottom: 3 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>
                  {item.servico}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instrução para substituir fotos */}
        <div style={{
          marginTop: 32, background: 'var(--surface-2)',
          border: '1px dashed var(--border-light)',
          borderRadius: 14, padding: '18px 24px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>
            💡 <strong style={{ color: 'var(--text-muted)' }}>Para adicionar fotos reais:</strong>{' '}
            Coloque os arquivos em <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>/public/antes-depois/</code>{' '}
            e edite o array <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>GALLERY_ITEMS</code>{' '}
            em <code style={{ background: 'var(--surface-3)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>LandingPage.jsx</code>.
          </p>
        </div>

        {/* CTA WhatsApp */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
            Quer ver mais resultados antes de decidir?
          </p>
          <button
            className="btn btn-ghost"
            style={{ fontSize: 13, padding: '12px 24px' }}
            onClick={() => abrirWpp('Olá! Gostaria de ver mais fotos de antes e depois dos trabalhos realizados.')}
          >
            <Icon name="message-circle" size={16} />
            Ver mais no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

function SecaoDepoimentos() {
  return (
    <section id="depoimentos" style={{ padding: '80px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
            O que dizem nossos clientes
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '0.04em' }}>
            DEPOIMENTOS
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {DEPOIMENTOS.map((d, i) => (
            <div
              key={d.id}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 18, padding: '24px 22px',
                display: 'flex', flexDirection: 'column', gap: 16,
                animation: `fadeUp 0.3s ${i * 0.07}s ease both`,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {/* Estrelas */}
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: d.nota }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--gold)', fontSize: 14 }}>★</span>
                ))}
              </div>

              {/* Texto */}
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>
                "{d.texto}"
              </p>

              {/* Autor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--gold)' }}>{d.inicial}</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 900, color: 'var(--text)' }}>{d.nome}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 1 }}>{d.servico} · {d.cidade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota média */}
        <div style={{
          marginTop: 40, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: 'var(--gold)' }}>4.9</span>
            <div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: 'var(--gold)', fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>nota média</p>
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: 'var(--border)' }} />
          <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 260 }}>
            Baseado em avaliações reais de clientes atendidos.
          </p>
        </div>
      </div>
    </section>
  );
}

function SecaoLocalizacao() {
  return (
    <section id="localizacao" style={{ padding: '80px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
            Onde estamos
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: '0.04em' }}>
            LOCALIZAÇÃO & ATENDIMENTO
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }} className="localizacao-grid">

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Área de atendimento */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '24px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Icon name="map-pin" size={18} style={{ color: 'var(--gold)' }} />
                <p style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Área de Atendimento
                </p>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16 }}>
                {LOCATION.descricao}
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--green-dim)', border: '1px solid var(--green-border)',
                borderRadius: 10, padding: '8px 14px',
              }}>
                <Icon name="check-circle" size={14} style={{ color: 'var(--green)' }} />
                <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>
                  {LOCATION.coletaGratis}
                </span>
              </div>
            </div>

            {/* Horários */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '24px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Icon name="clock" size={18} style={{ color: 'var(--gold)' }} />
                <p style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Horário de Atendimento
                </p>
              </div>
              {LOCATION.horarios.map(({ dia, hora }) => (
                <div
                  key={dia}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '9px 0', borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{dia}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>{hora}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA + contato */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Card principal de ação */}
            <div style={{
              background: 'radial-gradient(ellipse at 0% 0%, rgba(245,200,66,0.1) 0%, var(--surface) 60%)',
              border: '1px solid var(--gold-border)',
              borderRadius: 18, padding: '28px 26px',
            }}>
              <p className="bebas" style={{ fontSize: 26, letterSpacing: '0.06em', marginBottom: 8 }}>
                FALE COM A GENTE
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 22 }}>
                Tire dúvidas, solicite um orçamento ou agende a coleta do seu tênis.
                Respondemos em até 1 hora.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  className="btn btn-gold"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: '14px' }}
                  onClick={() => abrirWpp('Olá! Gostaria de solicitar um orçamento.')}
                >
                  <Icon name="message-circle" size={18} />
                  Solicitar orçamento via WhatsApp
                </button>

                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 13, padding: '12px' }}
                  onClick={() => abrirWpp('Olá! Gostaria de saber mais sobre a coleta do meu tênis.')}
                >
                  <Icon name="package" size={16} />
                  Agendar coleta
                </button>
              </div>
            </div>

            {/* Garantia */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 24px' }}>
              <p style={{ fontSize: 13, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                🛡️ Nossa garantia
              </p>
              {[
                'Orçamento sem compromisso antes de iniciar',
                'Confirmação do valor final antes de qualquer serviço',
                'Cuidado especializado em cada tênis, independente da marca',
                'Em caso de insatisfação, conversamos e resolvemos',
              ].map(txt => (
                <div key={txt} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                  <Icon name="check" size={14} style={{ color: 'var(--green)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onLoginClick }) {
  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '48px 24px 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <img
                src="/logo.png"
                alt="Lira Sneakers"
                style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--gold-border)' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <span className="bebas" style={{ fontSize: 18, letterSpacing: '0.1em' }}>
                <span style={{ color: '#fff' }}>LIRA </span>
                <span className="shimmer-text">SNEAKERS</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 280 }}>
              Sneaker Spa profissional em {LOCATION.cidade}, {LOCATION.estado}.
              Restauração, limpeza e proteção para seus tênis favoritos.
            </p>
            <button
              className="btn btn-gold"
              style={{ marginTop: 16, fontSize: 12, padding: '10px 18px' }}
              onClick={() => abrirWpp('Olá! Gostaria de solicitar um orçamento.')}
            >
              <Icon name="message-circle" size={14} />
              Solicitar orçamento
            </button>
          </div>

          {/* Serviços */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14 }}>
              Serviços
            </p>
            {['Limpeza', 'Pintura', 'Couro', 'Proteção', 'Reparo'].map(c => (
              <p key={c} style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{c}</p>
            ))}
          </div>

          {/* Links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14 }}>
              Acesso
            </p>
            {[
              ['Entrar na conta', onLoginClick],
              ['Criar conta', onLoginClick],
              ['Programa Lira+', onLoginClick],
              ['Suporte', () => abrirWpp('Olá! Preciso de ajuda.')],
            ].map(([label, action]) => (
              <button
                key={label}
                onClick={action}
                style={{
                  display: 'block', background: 'none', border: 'none',
                  color: 'var(--text-muted)', fontSize: 13,
                  cursor: 'pointer', marginBottom: 8, padding: 0, textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Lira Sneakers · {LOCATION.cidade}, {LOCATION.estado}
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            Atendimento via WhatsApp · {LOCATION.horarios[0].hora}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Modal de login ─────────────────────────────────────────────
function LoginModal({ onClose, onLogin }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 24, padding: '32px 28px',
          width: '100%', maxWidth: 420,
          animation: 'scaleIn 0.2s ease both',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <p className="bebas" style={{ fontSize: 22, letterSpacing: '0.08em' }}>
            ACESSAR CONTA
          </p>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
            aria-label="Fechar"
          >
            <Icon name="chevron-up" size={20} />
          </button>
        </div>
        {onLogin}
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────
export default function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      <Hero onLoginClick={() => setShowLogin(true)} />
      <SecaoServicos onLoginClick={() => setShowLogin(true)} />
      <SecaoAnteDepois />
      <SecaoDepoimentos />
      <SecaoLocalizacao />
      <Footer onLoginClick={() => setShowLogin(true)} />

      {/* Modal de login sobreposto */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={<AuthInline onSuccess={() => setShowLogin(false)} />}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .landing-nav-desktop { display: none !important; }
          .landing-hamburger   { display: flex !important; }
          .hero-grid           { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual         { order: -1; }
          .localizacao-grid    { grid-template-columns: 1fr !important; }
          .footer-grid         { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Formulário de login inline (para o modal) ──────────────────
function AuthInline({ onSuccess }) {
  const [modo, setModo]       = useState('login');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha]     = useState('');
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [tel, setTel]         = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro]       = useState('');

  const { login, cadastrar } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usuario || !senha) { setErro('Preencha todos os campos.'); return; }
    setLoading(true);
    const ok = await login(usuario, senha);
    setLoading(false);
    if (ok) onSuccess();
    else setErro('Usuário ou senha incorretos.');
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!nome || !email || !tel || !senha) { setErro('Preencha todos os campos.'); return; }
    setLoading(true);
    const ok = await cadastrar(nome, email, tel, senha);
    setLoading(false);
    if (ok) onSuccess();
  };

  const inputStyle = {
    width: '100%', background: 'var(--surface-2)',
    border: '1px solid var(--border)', borderRadius: 10,
    padding: '11px 14px', color: 'var(--text)', fontSize: 13,
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div>
      {/* Tabs */}
      <div className="tabs-wrap" style={{ marginBottom: 20 }}>
        {[['login','Entrar'],['cadastro','Criar conta']].map(([id, lbl]) => (
          <button key={id} onClick={() => { setModo(id); setErro(''); }}
            className={`tab-btn ${modo === id ? 'active' : ''}`}>{lbl}
          </button>
        ))}
      </div>

      {/* Credenciais demo */}
      <div style={{
        background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
        borderRadius: 10, padding: '10px 14px', marginBottom: 16,
      }}>
        <p style={{ fontSize: 10, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
          Acesso demo
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Usuário: <strong style={{ color: 'var(--text)' }}>admin</strong> · Senha: <strong style={{ color: 'var(--text)' }}>1234</strong>
        </p>
      </div>

      {erro && (
        <div className="alert alert-error" style={{ marginBottom: 14, fontSize: 12 }}>
          <Icon name="alert-circle" size={14} />
          {erro}
        </div>
      )}

      {modo === 'login' ? (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inputStyle} placeholder="Usuário" value={usuario}
            onChange={e => { setUsuario(e.target.value); setErro(''); }}
            onFocus={e => { e.target.style.borderColor = 'rgba(245,200,66,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
          />
          <input style={inputStyle} placeholder="Senha" type="password" value={senha}
            onChange={e => { setSenha(e.target.value); setErro(''); }}
            onFocus={e => { e.target.style.borderColor = 'rgba(245,200,66,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
          />
          <button type="submit" className="btn btn-gold" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            {loading ? <><Icon name="loader-2" size={16} style={{ animation: 'spin 1s linear infinite' }} /> Entrando...</> : <><Icon name="log-in" size={16} /> Entrar</>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            ['Nome completo', nome, setNome, 'text'],
            ['E-mail', email, setEmail, 'email'],
            ['Telefone', tel, setTel, 'tel'],
            ['Senha', senha, setSenha, 'password'],
          ].map(([placeholder, val, setter, type]) => (
            <input key={placeholder} style={inputStyle} placeholder={placeholder}
              type={type} value={val}
              onChange={e => { setter(e.target.value); setErro(''); }}
              onFocus={e => { e.target.style.borderColor = 'rgba(245,200,66,0.5)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
            />
          ))}
          <button type="submit" className="btn btn-gold" disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            {loading ? <><Icon name="loader-2" size={16} style={{ animation: 'spin 1s linear infinite' }} /> Criando...</> : <><Icon name="user-plus" size={16} /> Criar conta</>}
          </button>
        </form>
      )}
    </div>
  );
}
