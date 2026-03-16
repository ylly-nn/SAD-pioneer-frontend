import { tokenService } from "./tokenService";
import { authService } from "./authService";

import axios from 'axios';

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


axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) throw error;

        const response = await authService.refresh({
          refresh_token: refreshToken
        });

        tokenService.setTokens(
          response.access_token,
          response.refresh_token
        );

        originalRequest.headers.Authorization =
          `Bearer ${response.access_token}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        tokenService.clearTokens();
        //window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;