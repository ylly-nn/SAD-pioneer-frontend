import styles from "./LoginPage.module.scss";

import { Link } from "react-router-dom";
import { useState } from "react";

import { ROUTES } from "../../../constants/routes";
import { useNavigation } from "../../../hooks/useNavigation";
import { useLoginForm } from "../../../hooks/useLoginForm";

const LoginPage = () => {

  const { goHome } = useNavigation();
  const { formData, error, isLoading, handleChange, handleSubmit } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Почта
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
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className={styles.forgotPassword}>
                  <Link to={ROUTES.USER.RESET_PASSWORD} className={styles.link}>
                  
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
            <Link to={ROUTES.USER.REGISTER} className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
