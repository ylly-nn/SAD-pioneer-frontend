import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./NewPasswordPage.module.scss";
import { validatePassword, validateConfirmPassword } from "../../../utils/validation";
import { usePageToast } from "../../../hooks/usePageToast";

const NewPasswordPage = () => {
  usePageToast();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (isPasswordTouched) {
      setPasswordError(validatePassword(value));
      if (confirmPassword || isConfirmPasswordTouched) {
        setConfirmPasswordError(validateConfirmPassword(value, confirmPassword));
      }
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (isConfirmPasswordTouched) {
      setConfirmPasswordError(validateConfirmPassword(password, value));
    }
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordTouched(true);
    setConfirmPasswordError(validateConfirmPassword(password, confirmPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setIsPasswordTouched(true);
    setIsConfirmPasswordTouched(true);

    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);
    
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmError);

    if (passwordError || confirmError) return;

    setIsLoading(true);

    try {
      const res = await fetch("/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Пароль успешно изменен!");
        setTimeout(() => navigate("/user/login"), 2000);
      } else {
        setError(data.message || "Ошибка смены пароля");
      }
    } catch {
      setError("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const isFormValid = password.length > 0 && 
    confirmPassword.length > 0 && 
    !passwordError && 
    !confirmPasswordError;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Новый пароль</h2>
        
        <p className={styles.emailText}>
          Создайте новый пароль для<br />{email}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className={styles.label}>
                Новый пароль <span style={{ color: '#7c415b' }}>*</span>
              </label>
              <button type="button" className={styles.eyeButton} onClick={togglePassword}>
                {showPassword ? "●" : "○"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введите новый пароль (от 8 до 24 символов)"
              className={`${styles.input} ${passwordError && isPasswordTouched ? styles.inputError : ''}`}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {passwordError && isPasswordTouched && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Подтверждение пароля <span style={{ color: '#7c415b' }}>*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Повторите пароль"
              className={`${styles.input} ${confirmPasswordError && isConfirmPasswordTouched ? styles.inputError : ''}`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {confirmPasswordError && isConfirmPasswordTouched && (
              <div className={styles.error}>{confirmPasswordError}</div>
            )}
          </div>

          <button 
            className={styles.submit} 
            type="submit" 
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "Сохранение..." : "Сменить пароль"}
          </button>
        </form>

        {message && <div className={styles.message}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
};

export default NewPasswordPage;