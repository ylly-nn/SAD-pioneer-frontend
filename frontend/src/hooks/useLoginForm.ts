import { useState } from "react";
import { auth } from "../api/authService";
import { useNavigation } from "./useNavigation";
import { tokenService } from "../api/tokenService";

export const useLoginForm = () => {
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { goToUser/*, goToOrganization*/ } = useNavigation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {

      const response = await auth.login(formData);

      tokenService.setTokens(
        response.access_token,
        response.refresh_token
      );

      console.log("Успешный вход:", response);

      goToUser();
      //goToOrganization();

    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка авторизации";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, error, isLoading, handleChange, handleSubmit };
};