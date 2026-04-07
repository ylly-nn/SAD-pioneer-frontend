import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/authService";
import { ROUTES } from "../constants/routes";
import { roleService } from "../services/roleService";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirm-password") {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const role = roleService.getRole();

    if (!role) {
      setError("Не выбрана роль");
      return;
    }


    // Валидация
    if (formData.password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (!termsAccepted) {
      setError("Необходимо принять условия политики конфиденциальности");
      return;
    }

    setIsLoading(true);
    try {

      const response = await auth.register(formData);

      console.log("Успешная регистрация:", response);
      navigate(ROUTES.VERIFY, {state: { email: formData.email },});
      //navigate(ROUTES.USER.VERIFY, { state: { email: formData.email } });
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    confirmPassword,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
  };
};