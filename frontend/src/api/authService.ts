import axiosInstance from './axios';

import type { LoginRequest, AuthResponse, RegisterRequest, VerifyRequest } from '../types/user';

// сервис авторизации 
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {

    const response = await axiosInstance.post('auth/login', data);
    return response.data;
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('auth/register', data);
    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<{ message: string }> => {
    const response = await axiosInstance.post('auth/verify', data);
    return response.data;
  },

  logout: async (data: { refresh_token: string }): Promise<{ message: string }> => {
    const response = await axiosInstance.post('auth/logout', data);
    return response.data;
  },

  refresh: async (data: { refresh_token: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post('auth/refresh', data);
    return response.data;
  }
}

