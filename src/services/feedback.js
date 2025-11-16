// src/services/feedback.js
import { API_URL } from './apiConfig';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  
  if (!res.ok) {
    const message = data.message || 'Erro na requisição';
    throw new Error(message);
  }
  
  return data;
}

// Buscar todos os feedbacks visíveis
export async function getFeedbacks() {
  try {
    const feedbacks = await request('/feedbacks?visible=true&_sort=date&_order=desc');
    return feedbacks;
  } catch (err) {
    throw err;
  }
}

// Criar novo feedback
export async function createFeedback(userId, userName, rating, comment) {
  try {
    const feedback = {
      userId,
      userName,
      rating,
      comment,
      date: new Date().toISOString(),
      visible: true
    };

    return await request('/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
  } catch (err) {
    throw err;
  }
}

// Buscar feedbacks de um usuário específico
export async function getUserFeedbacks(userId) {
  try {
    return await request(`/feedbacks?userId=${userId}&_sort=date&_order=desc`);
  } catch (err) {
    throw err;
  }
}

export default { getFeedbacks, createFeedback, getUserFeedbacks };
