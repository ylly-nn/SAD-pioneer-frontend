import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api/authService";
import { ROUTES } from "../constants/routes";
import { roleService } from "../services/roleService";
import { validateRegisterForm, isRegisterFormValid, type RegisterFormErrors } from "../utils/validation";

type TouchedFields = {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validationErrors = validateRegisterForm({
      email: formData.email,
      password: formData.password,
      confirmPassword: confirmPassword,
    });
    setErrors(validationErrors);
  }, [formData.email, formData.password, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirm-password") {
      setConfirmPassword(value);
      setTouched(prev => ({ ...prev, confirmPassword: true }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'email') {
        setTouched(prev => ({ ...prev, email: true }));
      } else if (name === 'password') {
        setTouched(prev => ({ ...prev, password: true }));
      }
    }
  };

  const handleBlur = useCallback((field: keyof TouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const getFieldError = useCallback((field: keyof RegisterFormErrors): string | undefined => {
    if (!touched[field as keyof TouchedFields]) {
      return undefined;
    }
    return errors[field];
  }, [errors, touched]);

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    const role = roleService.getRole();

    if (!role) {
      setError("Не выбрана роль");
      return;
    }

    const validationErrors = validateRegisterForm({
      email: formData.email,
      password: formData.password,
      confirmPassword: confirmPassword,
    });

    if (!isRegisterFormValid(
      { 
        email: formData.email, 
        password: formData.password, 
        confirmPassword: confirmPassword 
      },
      validationErrors
    )) {
      setErrors(validationErrors);
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
      navigate(ROUTES.VERIFY, { state: { email: formData.email } });
    } catch (err: any) {
      const message = err.response?.data?.message || "Ошибка регистрации";
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
    errors,
    touched,
    handleChange,
    handleBlur,
    handleTermsChange,
    handleSubmit,
    getFieldError,
  };
};