import styles from "./RegisterPage.module.scss";

import { ROUTES } from "../../../constants/routes";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRegisterForm } from "../../../hooks/useRegisterForm";

import { Link } from "react-router-dom";
import { useState } from "react";

import { roleService } from "../../../services/roleService";

const RegisterPage = () => {
  const { goHome } = useNavigation();
  const {
    formData,
    confirmPassword,
    termsAccepted,
    error,
    isLoading,
    handleChange,
    handleTermsChange,
    handleSubmit,
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const role = roleService.getRole();
  if (!role) {
    goHome;
  }

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
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                почта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="введите email"
                required
                className={styles.input}
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
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
                required
                className={styles.input}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirm-password">
                подтвердите пароль
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="повторите пароль"
                required
                className={styles.input}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldCheckbox}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="terms"
                  required
                  className={styles.checkbox}
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.checkboxText}>
                  Принимаю условия{" "}
                  <a
                    href="https://dev.pionner.ru/user-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Политика конфиденциальности (откроется в новой вкладке)"
                  >
                    политики конфиденциальности
                  </a>
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
