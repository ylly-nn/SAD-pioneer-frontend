import { tokenService } from "./tokenService";
import type { AuthResponse } from '../types/auth';
import axios, {AxiosError, type InternalAxiosRequestConfig, type AxiosResponse} from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,

});

axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const plainAxios = axios.create({
  baseURL: API_URL,
});

//Очередь для логики рефреша
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

//Состояния для управления рефрешо
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Функция обработки очереди
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else if (token) {
      item.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Если ошибка не 401 или запрос уже повторялся – просто отклоняем
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Если уже идёт процесс обновления – ставим текущий запрос в очередь
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // Помечаем, что этот запрос уже пробовали обновить
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      //plainAxios, чтобы не попасть в этот же интерцептор
      const response = await plainAxios.post<AuthResponse>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data;
      tokenService.setTokens(access_token, newRefreshToken);

      //Обновление заголовва в оригинальном запросе
      originalRequest.headers.Authorization = `Bearer ${access_token}`;

      //Обработка всех ожидающие запросы из очереди
      processQueue(null, access_token);

      //повторяем оригинальный запрос
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error('Refresh failed:', refreshError);

      
      tokenService.clearTokens();

      //Отклоняем все запросы в очереди с этой ошибкой
      processQueue(refreshError as AxiosError, null);

      //возвращаем на главную страницу
      window.location.href = '/';

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
