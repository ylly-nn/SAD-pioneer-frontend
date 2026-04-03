import { useState } from "react";
import { auth } from "../api/authService";
import { useNavigation } from "./useNavigation";
import { roleService } from "../services/roleService";

export const useVerification = (email: string) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { goToLogin } = useNavigation();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await auth.verify({ email, code });
      console.log("Успех:", response.message);
      const role = roleService.getRole() || "user";
      goToLogin(role);
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка подтверждения");
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
