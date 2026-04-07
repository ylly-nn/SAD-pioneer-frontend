import axios from 'axios';
import { tokenService } from "./tokenService";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// request
axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response (только fallback)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;

    if (url?.includes("auth/login")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      tokenService.clearTokens();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;