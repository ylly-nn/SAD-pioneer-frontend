import axiosInstance from './axios';

//импортируем типы для работы 
import type { LoginRequest, AuthResponse } from '../types/user';

//сервис авторизации 
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {

    //эндопинт такой, как описан в доке бекенда
    const response = await axiosInstance.post('auth/login', data);
    return response.data;
  }}
