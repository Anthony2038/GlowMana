import { Alert } from 'react-native';

const API_URL = typeof __DEV__ !== 'undefined' && __DEV__ ? 'http://192.168.0.156:3005' : 'https://example.com';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || 'Erro na requisição de notificações';
    throw new Error(message);
  }
  return data;
}

export async function fetchNotifications(query = '') {
  const path = `/notifications${query}`;
  try {
    return await request(path, { method: 'GET' });
  } catch (err) {
    throw err;
  }
}

export async function createNotification(payload) {
  try {
    return await request('/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    Alert.alert('Erro', err.message || 'Não foi possível enviar a notificação');
    throw err;
  }
}

export default { fetchNotifications, createNotification };
