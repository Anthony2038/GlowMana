import { Alert } from 'react-native';

// Use local network IP for mobile devices to access mock server
const API_URL = typeof __DEV__ !== 'undefined' && __DEV__ ? 'http://192.168.0.156:3005' : 'https://example.com';

async function request(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || 'Erro na requisição';
    throw new Error(message);
  }
  return data;
}

export async function login(email, password) {
  try {
    return await request('/auth/login', { email, password });
  } catch (err) {
    // rethrow for UI handling
    throw err;
  }
}

export async function register(name, email, password) {
  try {
    return await request('/auth/register', { name, email, password });
  } catch (err) {
    throw err;
  }
}

export default { login, register };
