import React, { useState } from 'react';
import Icon       from '../components/Icon';
import { useApp } from '../context/AppContext';

function Field({ label, type = 'text', value, onChange, placeholder, icon }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="input-wrap">
      <label className="input-label">{label}</label>
      <div className="input-field-wrap">
        {icon && <span className="input-icon"><Icon name={icon} size={14} /></span>}
        <input type={isPassword && show ? 'text' : type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`input-field ${icon ? 'has-icon' : ''}`} />
        {isPassword && <button type="button" onClick={() => setShow(s => !s)} className="input-toggle"><Icon name={show ? 'eye-off' : 'eye'} size={14} /></button>}
      </div>
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const { login, authError, setAuthError } = useApp();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !senha) { setAuthError('Preencha todos os campos.'); return; }
    setLoading(true);
    await login(usuario, senha);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field label="Usuário" type="text" value={usuario} onChange={v => { setUsuario(v); setAuthError(''); }} placeholder="admin" icon="user" />
      <Field label="Senha" type="password" value={senha} onChange={v => { setSenha(v); setAuthError(''); }} placeholder="••••••••" icon="lock" />
      {authError && <div className="alert alert-error"><Icon name="alert-circle" size={14} style={{ flexShrink: 0 }} />{authError}</div>}
      <div style={{ background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ fontSize: 10, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Acesso Demo</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Usuário: <strong style={{ color: 'var(--text)' }}>admin</strong> · Senha: <strong style={{ color: 'var(--text)' }}>1234</strong></p>
      </div>
      <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', marginTop: 4 }}>
        {loading ? <><Icon name="loader-2" size={16} className="anim-spin" /> Entrando...</> : <><Icon name="log-in" size={16} /> Entrar</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
        Não tem conta?{' '}
        <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 900, cursor: 'pointer', fontSize: 13 }}>Cadastre-se</button>
      </p>
    </form>
  );
}

function CadastroForm({ onSwitch }) {
  const { cadastrar, authError, setAuthError } = useApp();
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [telefone, setTel]    = useState('');
  const [senha, setSenha]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !email || !telefone || !senha || !confirm) { setAuthError('Preencha todos os campos.'); return; }
    if (senha.length < 4)  { setAuthError('Senha mínima: 4 caracteres.'); return; }
    if (senha !== confirm)  { setAuthError('As senhas não coincidem.'); return; }
    setLoading(true);
    await cadastrar(nome, email, telefone, senha);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Field label="Nome completo" value={nome} onChange={v => { setNome(v); setAuthError(''); }} placeholder="Seu nome" icon="user" />
      <Field label="E-mail" value={email} onChange={v => { setEmail(v); setAuthError(''); }} placeholder="seu@email.com" icon="mail" />
      <Field label="Telefone" value={telefone} onChange={v => { setTel(v); setAuthError(''); }} placeholder="(11) 99999-9999" icon="phone" />
      <Field label="Senha" type="password" value={senha} onChange={v => { setSenha(v); setAuthError(''); }} placeholder="mín. 4 caracteres" icon="lock" />
      <Field label="Confirmar senha" type="password" value={confirm} onChange={v => { setConfirm(v); setAuthError(''); }} placeholder="repita a senha" icon="lock" />
      {authError && <div className="alert alert-error"><Icon name="alert-circle" size={14} style={{ flexShrink: 0 }} />{authError}</div>}
      <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%' }}>
        {loading ? <><Icon name="loader-2" size={16} className="anim-spin" /> Criando conta...</> : <><Icon name="user-plus" size={16} /> Criar conta</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
        Já tem conta?{' '}
        <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 900, cursor: 'pointer', fontSize: 13 }}>Entrar</button>
      </p>
    </form>
  );
}

export default function AuthPage() {
  const [modo, setModo] = useState('login');
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 60% 0%, rgba(245,200,66,0.07) 0%, transparent 60%), var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }} className="anim-scale-in">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.png" alt="Lira Sneakers" className="anim-float" style={{ width: 72, height: 72, borderRadius: 18, objectFit: 'cover', border: '1px solid var(--gold-border)', marginBottom: 12 }} onError={e => { e.target.style.display = 'none'; }} />
          <p className="bebas" style={{ fontSize: 32, letterSpacing: '0.1em' }}><span style={{ color: '#fff' }}>LIRA </span><span className="shimmer-text">SNEAKERS</span></p>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, marginTop: 4 }}>Sneaker Spa · Programa de Fidelidade</p>
        </div>
        <div className="card">
          <div className="tabs-wrap" style={{ marginBottom: 24 }}>
            {[['login','Entrar'],['cadastro','Criar conta']].map(([id, lbl]) => (
              <button key={id} onClick={() => setModo(id)} className={`tab-btn ${modo === id ? 'active' : ''}`}>{lbl}</button>
            ))}
          </div>
          {modo === 'login' ? <LoginForm onSwitch={() => setModo('cadastro')} /> : <CadastroForm onSwitch={() => setModo('login')} />}
        </div>
      </div>
    </div>
  );
}
