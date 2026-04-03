import axiosInstance from "./axios";

import type {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  VerifyRequest,
} from "../types/auth";

// сервис авторизации
export const auth = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post("auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post("auth/register", data);
    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<{ message: string }> => {
    const response = await axiosInstance.post("auth/verify", data);
    return response.data;
  },

  logout: async (data: {
    refresh_token: string;
  }): Promise<{ message: string }> => {
    const response = await axiosInstance.post("auth/logout", data);
    return response.data;
  },

  refresh: async (data: { refresh_token: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post("auth/refresh", data);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post("auth/forgot-password", {
      email,
    });
    return response.data;
  },

  verifyResetCode: async (data: {
    email: string;
    code: string;
  }): Promise<{ message: string }> => {
    const response = await axiosInstance.post("auth/verify-reset-code", data);
    return response.data;
  },

  setNewPassword: async (data: {
    email: string;
    new_password: string;
  }): Promise<{ message: string }> => {
    const response = await axiosInstance.post("auth/set-password", data);
    return response.data;
  },
};
