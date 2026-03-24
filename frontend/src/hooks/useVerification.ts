import { useState } from 'react';
import { authService } from '../api/authService';
import { useNavigation } from "./useNavigation";

export const useVerification = (email: string) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { goToUserLogin } = useNavigation();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.verify({ email, code });
      console.log('Успех:', response.message);
      // Перенаправление на страницу входа с сообщением
      //navigate('/login', { state: { message: 'Регистрация подтверждена, войдите' } });
      goToUserLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка подтверждения');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    code,
    error,
    isLoading,
    handleCodeChange,
    handleSubmit,
  };
};