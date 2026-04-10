import styles from "./LoginPage.module.scss";

import { Link } from "react-router-dom";
import { useState } from "react";

import { ROUTES } from "../../../constants/routes";
import { useNavigation } from "../../../hooks/useNavigation";
import { useLoginForm } from "../../../hooks/useLoginForm";

const LoginPage = () => {

  const { goHome } = useNavigation();
  const { 
    formData, 
    error, 
    isLoading, 
    handleChange, 
    handleBlur,
    handleSubmit, 
    getFieldError 
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleSubmit(e);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход</h1>
          <button
            className={styles.close}
            onClick={goHome}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.formContainer}>
          <form 
            className={styles.form} 
            onSubmit={handleFormSubmit}
            noValidate  
          >
            <div className={emailError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="email">
                Почта
              </label>
              <input
                id="email"
                name="email"
                type="text" 
                placeholder="введите email"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
              />
              {emailError && <div className={styles.error}>{emailError}</div>}
            </div>

            <div className={passwordError ? styles.fieldWithError : styles.field}>
              
                <label className={styles.label} htmlFor="password">
                  пароль
                </label>

                <div className={styles.inputWrapper}>
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePassword}
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showPassword ? "◉" : "◎"}
                </button>
              
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="введите пароль"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
              />
              </div>
              {passwordError && <div className={styles.error}>{passwordError}</div>}
              <div className={styles.forgotPassword}>
                  <Link to={ROUTES.RESET_PASSWORD} className={styles.link}>
                  Забыли пароль?
                  </Link>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </button>
          </form>

          <p className={styles.footer}>
            Ещё нет аккаунта?{" "}
            <Link to={ROUTES.REGISTER} className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;