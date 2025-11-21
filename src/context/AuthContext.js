import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/auth';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  updateProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@auth_token');
        const storedUser = await AsyncStorage.getItem('@auth_user');
        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const signIn = async (email, password) => {
    console.log('🔐 AuthContext.signIn chamado com:', { email, passwordLength: password?.length });
    try {
      const res = await authService.login(email, password);
      console.log('📥 Resposta do servidor:', res);
      
      if (res && res.token) {
        console.log('✅ Token recebido, salvando no storage...');
        setToken(res.token);
        setUser(res.user || null);
        await AsyncStorage.setItem('@auth_token', res.token);
        if (res.user) await AsyncStorage.setItem('@auth_user', JSON.stringify(res.user));
        console.log('✅ Login completo! User:', res.user);
      } else {
        console.warn('⚠️ Resposta sem token:', res);
      }
      return res;
    } catch (error) {
      console.error('❌ Erro no signIn:', error);
      throw error;
    }
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@auth_user');
  };

  const signUp = async (name, email, password) => {
    console.log('📝 AuthContext.signUp chamado com:', { name, email, passwordLength: password?.length });
    try {
      const result = await authService.register(name, email, password);
      console.log('✅ AuthContext.signUp retornou:', result);
      return result;
    } catch (error) {
      console.error('❌ AuthContext.signUp erro:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!token) throw new Error('Usuário não autenticado');
    const res = await authService.updateProfile(token, updates);
    if (res && res.user) {
      setUser(res.user);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(res.user));
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, signUp, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
