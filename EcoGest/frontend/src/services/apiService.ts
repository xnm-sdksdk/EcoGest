import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { useAuthStore } from 'stores/auth';

const api: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      const auth = useAuthStore();
      auth.logout();
      Notify.create({ type: 'negative', message: 'Sessão expirada' });
    } else if (status === 403) {
      Notify.create({ type: 'negative', message: 'Sem permissão' });
    } else if (status && status >= 500) {
      Notify.create({ type: 'negative', message: 'Erro no servidor' });
    } else {
      Notify.create({ type: 'negative', message });
    }

    return Promise.reject(error);
  },
);

export default api;
