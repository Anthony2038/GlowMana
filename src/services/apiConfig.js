// Configuração central da API
// ALTERE A PORTA AQUI conforme necessário (3001, 3005, etc)

const DEV_IP = '192.168.0.156'; // IP da sua máquina na rede local
const DEV_PORT = 3005; // ⚠️ PORTA DO SERVIDOR MOCK - AJUSTE CONFORME NECESSÁRIO

export const API_URL = typeof __DEV__ !== 'undefined' && __DEV__
  ? `http://${DEV_IP}:${DEV_PORT}`
  : 'https://example.com';

export function getApiUrl() {
  return API_URL;
}

// Utilitário para mostrar a URL atual (pode ser usado em logs)
export function logCurrentApiUrl() {
  // eslint-disable-next-line no-console
  console.log('[API] Base URL:', API_URL);
}
