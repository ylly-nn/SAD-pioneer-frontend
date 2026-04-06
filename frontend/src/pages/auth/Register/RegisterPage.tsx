import styles from "./RegisterPage.module.scss";

import { ROUTES } from "../../../constants/routes";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRegisterForm } from "../../../hooks/useRegisterForm";

import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const { goHome } = useNavigation();
  const {
    formData,
    confirmPassword,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleBlur,
    handleTermsChange,
    handleSubmit,
    getFieldError,
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePassword = () => setShowPassword(!showPassword);

  const emailError = getFieldError('email');
  const passwordError = getFieldError('password');
  const confirmPasswordError = getFieldError('confirmPassword');

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Регистрация</h1>
          <button
            className={styles.close}
            onClick={goHome}
            aria-label="Закрыть"
          >
            x
          </button>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={emailError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="email">
                почта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="введите email"
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
              />
              {emailError && <div className={styles.error}>{emailError}</div>}
            </div>

            <div className={passwordError ? styles.fieldWithError : styles.field}>
              <div className={styles.b}>
                <label className={styles.label} htmlFor="password">
                  пароль
                </label>
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={togglePassword}
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showPassword ? "●" : "○"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="введите пароль"
                className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
              />
              {passwordError && <div className={styles.error}>{passwordError}</div>}
            </div>

            <div className={confirmPasswordError ? styles.fieldWithError : styles.field}>
              <label className={styles.label} htmlFor="confirm-password">
                подтвердите пароль
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="повторите пароль"
                className={`${styles.input} ${confirmPasswordError ? styles.inputError : ''}`}
                autoComplete="off"
                value={confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
              />
              {confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}
            </div>

            <div className={styles.fieldCheckbox}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  className={styles.checkbox}
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>
                  принимаю условия политики конфиденциальности
                </span>
              </label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading}
            >
              {isLoading ? "получение кода..." : "получить код"}
            </button>
          </form>

          <p className={styles.footer}>
            уже есть аккаунт?
            <Link to={ROUTES.LOGIN} className={styles.link}>
              войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;