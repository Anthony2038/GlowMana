// Serviço de autenticação e atualização de perfil
// Detecta automaticamente se está rodando na web (localhost) ou mobile (IP da rede)
import { Platform } from 'react-native';

const API_URL = typeof __DEV__ !== 'undefined' && __DEV__ 
  ? (Platform.OS === 'web' ? 'http://localhost:3001' : 'http://192.168.0.156:3001')
  : 'https://example.com';

async function request(path, body) {
  console.log(`Fazendo requisição para ${API_URL}${path}`);
  console.log('Body:', body);
  
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log('Status da resposta:', res.status);
    
    const data = await res.json().catch(() => ({}));
    console.log('Dados da resposta:', data);
    
    if (!res.ok) {
      const message = data.message || 'Erro na requisição';
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function login(email, password) {
  return await request('/auth/login', { email, password });
}

export async function register(name, email, password) {
  return await request('/auth/register', { name, email, password });
}

export async function updateProfile(token, updates) {
  // updates pode conter name, email, password
  return await request('/auth/update', { token, ...updates });
}

export default { login, register, updateProfile };
