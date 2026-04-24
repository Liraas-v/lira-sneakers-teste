import { useState, useCallback } from 'react';
import { staticLogin, staticCadastro } from '../lib/auth';

export function useAuth() {
  const [authUser,  setAuthUser]  = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading]                 = useState(false);

  const updateUser = useCallback((updater) => {
    setAuthUser(prev => (prev ? { ...prev, ...updater(prev) } : prev));
  }, []);

  const login = useCallback(async (email, senha) => {
    setAuthError('');
    const { ok, user, error } = await staticLogin(email, senha);
    if (!ok) { setAuthError(error); return false; }
    setAuthUser(user);
    return true;
  }, []);

  const cadastrar = useCallback(async (nome, email, telefone, senha) => {
    setAuthError('');
    const { ok, user, error } = await staticCadastro(nome, email, telefone, senha);
    if (!ok) { setAuthError(error); return false; }
    setAuthUser(user);
    return true;
  }, []);

  const logout     = useCallback(async () => { setAuthUser(null); setAuthError(''); }, []);
  const addPontos  = useCallback((_id, pts) => { updateUser(u => ({ pontos: Math.max(0, u.pontos + pts) })); }, [updateUser]);
  const reloadUser = useCallback(async () => {}, []);

  return { authUser, authError, setAuthError, loading, login, cadastrar, logout, addPontos, updateUser, reloadUser };
}
