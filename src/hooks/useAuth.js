/**
 * src/hooks/useAuth.js
 *
 * MELHORIA 4: Expõe `updateUser` — função genérica para atualizar
 * qualquer campo do usuário em memória sem depender de reloadUser (no-op).
 *
 * Antes: addPontos atualizava pontos, mas resgates/notificações/histórico
 *   nunca eram refletidos no estado → funcionalidades quebradas.
 *
 * Depois: qualquer parte do app pode chamar updateUser(fn) onde fn recebe
 *   o usuário atual e retorna o novo — imutável, previsível, sem no-ops.
 */
import { useState, useCallback } from 'react';
import { staticLogin, staticCadastro } from '../lib/auth';

export function useAuth() {
  const [authUser,  setAuthUser]  = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading]                 = useState(false);

  // ── Atualização genérica de qualquer campo do usuário ────
  // Recebe um updater (fn: user → user) e aplica imutavelmente.
  // É a única fonte de verdade para mutações de estado do usuário.
  const updateUser = useCallback((updater) => {
    setAuthUser(prev => (prev ? { ...prev, ...updater(prev) } : prev));
  }, []);

  // ── Login ─────────────────────────────────────────────────
  const login = useCallback(async (email, senha) => {
    setAuthError('');
    const { ok, user, error } = await staticLogin(email, senha);
    if (!ok) { setAuthError(error); return false; }
    setAuthUser(user);
    return true;
  }, []);

  // ── Cadastro ──────────────────────────────────────────────
  const cadastrar = useCallback(async (nome, email, telefone, senha) => {
    setAuthError('');
    const { ok, user, error } = await staticCadastro(nome, email, telefone, senha);
    if (!ok) { setAuthError(error); return false; }
    setAuthUser(user);
    return true;
  }, []);

  // ── Logout ────────────────────────────────────────────────
  const logout = useCallback(async () => {
    setAuthUser(null);
    setAuthError('');
  }, []);

  // ── Adicionar / subtrair pontos ───────────────────────────
  // Mantido para compatibilidade, agora usa updateUser internamente.
  const addPontos = useCallback((_userId, pts) => {
    updateUser(u => ({ pontos: Math.max(0, u.pontos + pts) }));
  }, [updateUser]);

  // ── reloadUser: mantido na API pública (no-op nesta versão)
  // Para banco real: busca dados frescos do Supabase.
  const reloadUser = useCallback(async () => {}, []);

  return {
    authUser,
    authError,
    setAuthError,
    loading,
    login,
    cadastrar,
    logout,
    addPontos,
    updateUser,   // ← novo — usado pelo AppContext
    reloadUser,
  };
}
