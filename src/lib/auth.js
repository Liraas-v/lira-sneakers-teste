/**
 * src/lib/auth.js
 *
 * MELHORIA 10: auth.js agora cuida exclusivamente de autenticação.
 * Dados mock movidos para src/data/mockData.js.
 *
 * Credenciais hardcoded: admin / 1234
 *
 * Para reconectar ao Supabase:
 *   import { supabase } from './supabase'
 *   staticLogin  → supabase.auth.signInWithPassword({ email, password })
 *   staticCadastro → supabase.auth.signUp({ email, password, options: { data: { nome, telefone } } })
 */
import { MOCK_USER, buildNewUser } from '../data/mockData';

const delay = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function staticLogin(usuario, senha) {
  await delay();
  if (usuario === 'admin' && senha === '1234') {
    // Retorna cópia profunda para evitar mutação do objeto original
    return { ok: true, user: structuredClone(MOCK_USER), error: '' };
  }
  return { ok: false, user: null, error: 'Usuário ou senha incorretos.' };
}

export async function staticCadastro(nome, email, telefone, senha) {
  await delay(600);
  if (!nome || !email || !telefone || !senha) {
    return { ok: false, error: 'Preencha todos os campos.' };
  }
  return {
    ok:    true,
    user:  buildNewUser({ nome, email, telefone }),
    error: '',
  };
}
