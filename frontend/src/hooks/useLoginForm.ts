import { useState, useCallback, useEffect } from "react";
import { auth } from "../api/authService";
import { useNavigation } from "./useNavigation";
import { tokenService } from "../api/tokenService";
import { roleService } from "../services/roleService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { validateLoginForm, isLoginFormValid, type LoginFormErrors } from "../utils/validation";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { goToUser, goToOrganization } = useNavigation();

  useEffect(() => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
  }, [formData.email, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const getFieldError = useCallback((field: keyof LoginFormErrors): string | undefined => {
    return touched[field] ? errors[field] : undefined;
  }, [errors, touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setTouched({
      email: true,
      password: true,
    });

    const role = roleService.getRole();

    if (!role) {
      setError("Не выбрана роль");
      return;
    }

    const validationErrors = validateLoginForm(formData);
    if (!isLoginFormValid(formData, validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await auth.login(formData);

      tokenService.setTokens(response.access_token, response.refresh_token);

      if (from) {
        navigate(from);
        return;
      }

      if (role === "organization") {
        goToOrganization();
      } else {
        goToUser();
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка авторизации";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    formData, 
    error, 
    isLoading, 
    errors,
    touched,
    handleChange, 
    handleBlur,
    handleSubmit,
    getFieldError 
  };
};