import styles from "./LoginPage.module.scss";

import { Link } from "react-router-dom";
import { useState } from "react";


import { ROUTES } from "../../../constants/routes";
import { useHandlesLogic } from "../../../hooks/handlesLogic";

const LoginPage = () => {

      const {
    handleHome
  } = useHandlesLogic();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  };



  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Вход</h1>
          <button
            className={styles.close}
            onClick={handleHome}
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
              <label className={styles.label} htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="введите пароль"
                required
                className={styles.input}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
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
            <Link to={ROUTES.ORGANIZATION.REGISTER} className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
