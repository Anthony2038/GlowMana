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
    const res = await authService.login(email, password);
    if (res && res.token) {
      setToken(res.token);
      setUser(res.user || null);
      await AsyncStorage.setItem('@auth_token', res.token);
      if (res.user) await AsyncStorage.setItem('@auth_user', JSON.stringify(res.user));
    }
    return res;
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@auth_user');
  };

  const signUp = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
