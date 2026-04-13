import { useState } from "react";
import { auth } from "../api/authService";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. отправка email
  const sendEmail = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await auth.forgotPassword(email);
      setMessage(res.message);
      setStep("code");
    } catch (err: any) {
      setError(err.response?.data || "Ошибка отправки кода");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. проверка кода
  const verifyCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await auth.verifyResetCode({ email, code });
      setMessage(res.message);
      setStep("password");
    } catch (err: any) {
      setError(err.response?.data || "Неверный код");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. установка нового пароля
  const setPasswordHandler = async () => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await auth.setNewPassword({
        email,
        new_password: password,
      });

      setMessage(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data || "Ошибка смены пароля");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    code,
    password,
    confirmPassword,
    step,
    message,
    error,
    isLoading,

    setEmail,
    setCode,
    setPassword,
    setConfirmPassword,

    sendEmail,
    verifyCode,
    setPasswordHandler,
  };
};